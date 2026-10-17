// Web Audio API 100% Client-Side Emergency Siren (Section 5.2 of SRS/Master Prompt)
let activeSirenStopper: (() => void) | null = null;

export function playEmergencySiren(): () => void {
  // Silence any existing siren first
  if (activeSirenStopper) {
    activeSirenStopper();
    activeSirenStopper = null;
  }

  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return () => {};

    const audioCtx = new AudioContextClass();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sawtooth';
    gain.gain.setValueAtTime(0.7, audioCtx.currentTime);

    // Oscillate frequency between 700Hz and 1100Hz like an ambulance siren
    let high = false;
    const interval = setInterval(() => {
      if (audioCtx.state === 'closed') {
        clearInterval(interval);
        return;
      }
      osc.frequency.setValueAtTime(high ? 700 : 1100, audioCtx.currentTime);
      high = !high;
    }, 400);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();

    const stopFn = () => {
      clearInterval(interval);
      try {
        osc.stop();
        audioCtx.close();
      } catch {
        // ignore already closed
      }
      if (activeSirenStopper === stopFn) {
        activeSirenStopper = null;
      }
    };

    activeSirenStopper = stopFn;
    return stopFn;
  } catch (err) {
    console.warn("Web Audio API siren error:", err);
    return () => {};
  }
}

export function stopEmergencySiren() {
  if (activeSirenStopper) {
    activeSirenStopper();
    activeSirenStopper = null;
  }
}

// Browser Text-To-Speech (SpeechSynthesis)
export function speakAloud(
  text: string, 
  rate: number = 0.85, 
  onStart?: () => void,
  onEnd?: () => void,
  onSentenceChange?: (sentenceIndex: number) => void
): () => void {
  if (!('speechSynthesis' in window)) {
    console.warn("SpeechSynthesis not supported");
    if (onEnd) onEnd();
    return () => {};
  }

  window.speechSynthesis.cancel();

  const cleanText = text.replace(/[*_#]/g, '');
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = rate; // Supports UX-12 slow speech setting (0.75x, 0.85x, 1.0x)
  utterance.pitch = 1.0;

  // Prefer English natural voices
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  if (onStart) utterance.onstart = () => onStart();
  if (onEnd) utterance.onend = () => onEnd();
  utterance.onerror = () => {
    if (onEnd) onEnd();
  };

  // UX-13: Highlight sentences in captions
  const sentences = cleanText.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [cleanText];
  let accumulatedLength = 0;
  const sentenceBoundaries = sentences.map(s => {
    const start = accumulatedLength;
    accumulatedLength += s.length;
    return { start, end: accumulatedLength };
  });

  utterance.onboundary = (event) => {
    if (event.name === 'sentence' || event.name === 'word') {
      const charIndex = event.charIndex;
      const activeIdx = sentenceBoundaries.findIndex(b => charIndex >= b.start && charIndex < b.end);
      if (activeIdx !== -1 && onSentenceChange) {
        onSentenceChange(activeIdx);
      }
    }
  };

  window.speechSynthesis.speak(utterance);

  return () => {
    window.speechSynthesis.cancel();
  };
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

// Read aloud pairing key character by character (UX-41)
export function readPairingKeyAloud(key: string, onEnd?: () => void) {
  const characters = key.split('');
  const spokenParts = characters.map(char => {
    if (char === '-') return 'dash';
    if (char === ' ') return 'space';
    return char.toUpperCase();
  });
  
  const formattedSpoken = spokenParts.join(' , ');
  return speakAloud(`Your pairing code is: ${formattedSpoken}. Repeat: ${formattedSpoken}`, 0.75, undefined, onEnd);
}

// Browser Speech-To-Text (SpeechRecognition)
export interface SpeechRecognitionController {
  start: () => void;
  stop: () => void;
  isSupported: boolean;
}

export function createSpeechRecognizer(
  onResult: (transcript: string) => void,
  onError: (error: string) => void,
  onStateChange: (listening: boolean) => void
): SpeechRecognitionController {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognitionClass) {
    return {
      start: () => onError("Microphone speech recognition is not supported in this browser. Please use the typed input."),
      stop: () => {},
      isSupported: false
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognition = new SpeechRecognitionClass();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  let finalTranscript = '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let silenceTimeout: any = null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recognition.onresult = (event: any) => {
    let interim = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        interim += event.results[i][0].transcript;
      }
    }

    const currentText = finalTranscript || interim;
    onResult(currentText);

    // UX-10: Detected silence after about 2 seconds stops it
    if (silenceTimeout) clearTimeout(silenceTimeout);
    silenceTimeout = setTimeout(() => {
      try {
        recognition.stop();
      } catch {
        // ignore
      }
    }, 2200);
  };

  recognition.onstart = () => {
    finalTranscript = '';
    onStateChange(true);
  };

  recognition.onend = () => {
    if (silenceTimeout) clearTimeout(silenceTimeout);
    onStateChange(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recognition.onerror = (event: any) => {
    if (silenceTimeout) clearTimeout(silenceTimeout);
    onStateChange(false);
    if (event.error !== 'no-speech') {
      onError(event.error);
    }
  };

  return {
    start: () => {
      try {
        recognition.start();
      } catch {
        // might already be started
      }
    },
    stop: () => {
      if (silenceTimeout) clearTimeout(silenceTimeout);
      try {
        recognition.stop();
      } catch {
        // ignore
      }
    },
    isSupported: true
  };
}
