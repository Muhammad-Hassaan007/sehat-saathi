import React, { useState, useRef, useEffect } from 'react';
import { 
  Mic, 
  Send, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle,
  Snail,
  Plus,
  Loader2,
  FileCheck2,
  ThumbsUp,
  ThumbsDown,
  Copy
} from 'lucide-react';
import type { ChatMessage, UIState } from '../types';
import { speakAloud, stopSpeaking } from '../services/audioService';

interface AssistantScreenProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isListening: boolean;
  onToggleVoice: () => void;
  uiState: UIState;
  transcript: string;
}

export const AssistantScreen: React.FC<AssistantScreenProps> = ({
  messages,
  onSendMessage,
  isListening,
  onToggleVoice,
  uiState,
  transcript
}) => {
  const [inputText, setInputText] = useState("");
  const [speechRate, setSpeechRate] = useState<number>(0.85); // UX-12: default slow setting
  const [activeSentenceIndex, setActiveSentenceIndex] = useState<number>(-1);
  const [isSpeakingAloud, setIsSpeakingAloud] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, uiState, transcript]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  const handlePlayAudio = (text: string) => {
    setIsSpeakingAloud(true);
    setActiveSentenceIndex(0);
    speakAloud(
      text,
      speechRate,
      () => setIsSpeakingAloud(true),
      () => {
        setIsSpeakingAloud(false);
        setActiveSentenceIndex(-1);
      },
      (idx) => setActiveSentenceIndex(idx)
    );
  };

  const cycleSpeechRate = () => {
    const rates = [0.75, 0.85, 1.0];
    const currentIdx = rates.indexOf(speechRate);
    const nextRate = rates[(currentIdx + 1) % rates.length];
    setSpeechRate(nextRate);
  };

  const sampleQuestions = [
    "When should I take Metformin?",
    "What is my Lisinopril dose?",
    "Can I do walking exercise?",
    "When is my doctor appointment?"
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-h-[700px] animate-fadeIn">
      {/* Top Bar with Speed & Audio Control */}
      <div className="py-2 px-1 flex items-center justify-between border-b border-emerald-100/60 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800">AI Health Assistant</h2>
            <p className="text-[11px] text-emerald-700 font-medium">Grounded in Hospital Summary</p>
          </div>
        </div>

        {/* Audio Playback Speed Toggle (UX-12) */}
        <button
          onClick={cycleSpeechRate}
          title="Adjust speech rate (0.75x, 0.85x, 1.0x)"
          className="h-8 px-2.5 bg-white hover:bg-slate-50 border border-emerald-200 rounded-full text-xs font-bold text-brand-700 flex items-center gap-1 shadow-xs transition-colors"
        >
          <Snail className="w-3.5 h-3.5" />
          <span>{speechRate}x Speed</span>
        </button>
      </div>

      {/* State Cue Banner (UX-19) */}
      {uiState !== 'idle' && (
        <div className="mt-2 py-1.5 px-3 rounded-xl flex items-center justify-between text-xs font-bold transition-all shadow-xs">
          {uiState === 'listening' && (
            <div className="w-full bg-blue-50 text-blue-700 border border-blue-200 rounded-xl p-2 flex items-center gap-2 animate-pulse">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping"></span>
              <span>I am listening to your voice... (Tap mic to finish)</span>
            </div>
          )}
          {uiState === 'thinking' && (
            <div className="w-full bg-amber-50 text-amber-700 border border-amber-200 rounded-xl p-2 flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-600" />
              <span>I am thinking and verifying your discharge summary...</span>
            </div>
          )}
          {uiState === 'speaking' && (
            <div className="w-full bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl p-2 flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-emerald-600 animate-bounce" />
              <span>Speaking answer aloud...</span>
            </div>
          )}
          {uiState === 'waiting_confirmation' && (
            <div className="w-full bg-purple-50 text-purple-800 border border-purple-200 rounded-xl p-2 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-purple-600" />
              <span>Waiting for your voice or button confirmation...</span>
            </div>
          )}
        </div>
      )}

      {/* Live transcript preview while listening */}
      {isListening && transcript && (
        <div className="mt-2 p-3 bg-blue-50/90 border border-blue-200 rounded-2xl text-xs text-blue-900 font-semibold italic">
          "{transcript}..."
        </div>
      )}

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto no-scrollbar py-4 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.speaker === 'user';

          if (isUser) {
            return (
              <div key={msg.id} className="flex justify-end">
                <div className="max-w-[85%] bg-brand-500 text-white rounded-3xl rounded-br-xs px-4 py-3 shadow-sm">
                  <p className="text-sm font-semibold leading-relaxed">{msg.text}</p>
                  <span className="text-[10px] text-emerald-100 font-medium block text-right mt-1">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          }

          // AI Message Card (Matches Figma Screen 3 + UX-12/13/16)
          return (
            <div key={msg.id} className="flex items-start gap-2.5 justify-start">
              <div className="w-8 h-8 rounded-full bg-brand-50 border border-brand-200 text-brand-600 flex items-center justify-center shrink-0 mt-1">
                <Sparkles className="w-4 h-4" />
              </div>

              <div className="max-w-[90%] bg-white rounded-3xl rounded-tl-xs p-4 shadow-card border border-emerald-100/80 space-y-3">
                {/* Confidence Badge (UX-16) */}
                {msg.confidence_badge && (
                  <div className="flex items-center gap-1.5">
                    {msg.confidence_badge === 'Certain' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Certain (Verified in Discharge Summary)
                      </span>
                    )}
                    {msg.confidence_badge === 'Possibly' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                        <AlertCircle className="w-3 h-3 text-amber-600" />
                        Possibly
                      </span>
                    )}
                    {msg.confidence_badge === 'Unknown' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                        <HelpCircle className="w-3 h-3 text-slate-500" />
                        Not in Summary (Honest Handoff)
                      </span>
                    )}
                  </div>
                )}

                {/* Primary Answer Text (Sentence Highlight UX-13) */}
                <div className="text-slate-800 text-sm font-semibold leading-relaxed">
                  {msg.text.split(/(?<=[.!?])\s+/).map((sentence, sIdx) => (
                    <span
                      key={sIdx}
                      className={
                        activeSentenceIndex === sIdx
                          ? 'bg-brand-200 text-brand-950 px-1 rounded transition-colors duration-200 font-bold'
                          : ''
                      }
                    >
                      {sentence}{" "}
                    </span>
                  ))}
                </div>

                {/* Grounding Source Line Card (UX-16) */}
                {msg.source_line && (
                  <div className="bg-brand-50/70 border border-brand-200/80 rounded-2xl p-3 flex items-start gap-2">
                    <FileCheck2 className="w-4 h-4 text-brand-700 shrink-0 mt-0.5" />
                    <p className="text-xs text-brand-900 font-medium leading-normal">
                      {msg.source_line}
                    </p>
                  </div>
                )}

                {/* Audio Controls & Feedback Actions (UX-12 + Figma) */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePlayAudio(msg.text)}
                      className="px-2.5 py-1 bg-brand-50 hover:bg-brand-100 text-brand-700 rounded-full text-xs font-bold flex items-center gap-1 transition-colors"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{isSpeakingAloud ? 'Replay' : 'Listen'}</span>
                    </button>
                    {isSpeakingAloud && (
                      <button
                        onClick={stopSpeaking}
                        className="p-1 text-slate-400 hover:text-slate-600"
                      >
                        <VolumeX className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-slate-400">
                    <button className="hover:text-slate-600" title="Copy text">
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button className="hover:text-emerald-600" title="Helpful">
                      <ThumbsUp className="w-3.5 h-3.5" />
                    </button>
                    <button className="hover:text-red-500" title="Not helpful">
                      <ThumbsDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      {/* Suggested Quick Questions Pills */}
      <div className="py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
        {sampleQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => onSendMessage(q)}
            className="px-3 py-1.5 bg-white hover:bg-brand-50 border border-emerald-200/80 rounded-full text-xs font-semibold text-slate-700 whitespace-nowrap shadow-xs transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Bottom Input Bar (Matches Figma Screen 3 + UX-11 Typed Fallback) */}
      <div className="pt-2 pb-1 shrink-0">
        <div className="bg-white rounded-full p-2 pl-3 shadow-md border border-emerald-200 flex items-center gap-2">
          <button
            onClick={() => onSendMessage(sampleQuestions[0])}
            className="w-8 h-8 rounded-full bg-brand-50 text-brand-700 hover:bg-brand-100 flex items-center justify-center shrink-0"
            title="Quick suggestions"
          >
            <Plus className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden font-medium"
          />

          <button
            onClick={onToggleVoice}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              isListening
                ? 'bg-red-500 text-white animate-pulse'
                : 'text-slate-500 hover:text-brand-600 hover:bg-brand-50'
            }`}
            title="Voice input (Tremor accommodating single tap UX-10)"
          >
            <Mic className="w-5 h-5" />
          </button>

          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              inputText.trim()
                ? 'bg-brand-500 text-white hover:bg-brand-600 shadow-xs'
                : 'bg-slate-100 text-slate-300'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
