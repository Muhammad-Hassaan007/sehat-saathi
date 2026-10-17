# Sehat Saathi (English-only Edition) — Accessible Healthcare & Discharge PWA

A voice-first, highly accessible Progressive Web App (PWA) designed for elderly patients (age 60+) and family caregivers. Grounded strictly in hospital discharge summaries, featuring a clean mobile UX/UI inspired by the design mockup.

---

## 🌟 Key Highlights & Design Alignment

This frontend faithfully implements the aesthetic shown in the demo mockup while fulfilling every requirement from the **Sehat Saathi Software Requirements Specification (SRS v1.1)** and Master Prompt:

| Feature / UI Element | Design Mockup Reference | SRS & Master Prompt Implementation |
|---|---|---|
| **Home Screen** | Screen 1: Welcome Header, Search & Mic, Health Score (85/100), Quick Actions, Today's Summary | **UX-01 / UX-10**: Big 120px+ tremor-accommodating voice microphone button, daily health score gauge, quick action cards, and active medication reminders. |
| **Health Overview** | Screen 2: Calendar week strip, Heart Rate (89 bpm), BP (110/80), Respiration (16 br/min), Calories | **UX-16**: Interactive SVG sparklines and live waveform charts, plus the complete indexed Hospital Discharge Summary (`L1` to `L9`). |
| **AI Assistant / Voice Q&A** | Screen 3: Sparkle avatar, green user bubbles, recommendation cards | **UX-12, UX-13, UX-16, UX-19**: Live browser Speech Recognition & Text-to-Speech, synchronized sentence-highlighted captions, grounding badges (`Certain`, `Possibly`, `Unknown`), audio speed controls (0.75x, 0.85x, 1.0x). |
| **Health Records & Prescriptions** | Screen 4: Category filter pills (All, Prescription, Lab Result, Report), Diagnostic test cards | **Screen 9**: Add/Manage Prescriptions with auto-sync into discharge summary lines and medication reminders; lab test status cards. |
| **Caregiver Dashboard** | Dual Role Access | **UX-35 - UX-38**: Today's status summary, high-priority emergency alerts with "Mark as Handled", clinician review queue with doctor's notes input, and adherence tracking. |

---

## 🛡️ Accessibility & Safety First

1. **Elderly Tremor-Accommodating Voice Control (`UX-01`, `UX-10`)**:
   - Single tap starts listening; single tap (or 2.2 seconds of detected silence) stops recording.
   - Live speech recognition supported via Web Speech API (`SpeechRecognition`).
   - Browser Speech Synthesis (`speechSynthesis`) with adjustable playback speed (`0.75x`, `0.85x`, `1.0x`).
2. **Text Sizing & High Contrast Controls (`UX-02`, `UX-04`)**:
   - One-tap text size switcher in the top bar: **Normal** (24px base), **Large** (28px), and **Extra Large** (34px), persisted in `localStorage`.
   - WCAG AAA 7:1 High Contrast mode toggle.
3. **Grounding & Honest Handoff (`UX-16`, `UX-28`)**:
   - Every answer displays its source line: *"Your discharge summary says: [L2: Prescribed Metformin...]"*.
   - If a question is outside the hospital records, the AI never guesses or makes up advice; it performs an honest handoff and logs the query in the Clinician Review Queue.
4. **Confirm-Before-Act Echo-Back (`UX-14`, `UX-15`)**:
   - Any write action (e.g. setting a reminder) triggers a confirmation modal: *"I heard: [details]. Is that correct?"* with massive `[ Yes ]` and `[ No ]` buttons. Polite "No" handling returns cleanly without an error message.
5. **Full-Screen Emergency Takeover & Siren (`UX-17`, `UX-27`)**:
   - When a red-flag phrase is spoken or typed (*"chest pain"*, *"pain in my heart"*, *"can't breathe"*, *"fainting"*), the app instantly launches the emergency view.
   - Plays a **100% client-side synthesized emergency siren** using the Web Audio API (700Hz–1100Hz oscillating sawtooth wave).
   - Large 70px `[ Call 911 Now ]` button with immediate caregiver dispatch notification.
6. **Patient-Controlled Caregiver Pairing (`UX-40`, `UX-41`, `UX-42`)**:
   - Generates a single-use 8-hex character code (`A3F9 - 7C21`) in giant monospaced text.
   - 10-minute countdown timer.
   - `[ Read Aloud ]` button speaks the key character by character for elderly patients.
   - Incoming consent prompt: *"Sarah would like to link with you. Is that okay?"* with `[ Approve ]` / `[ Decline ]`.
   - Immediate link revocation (`UX-44`).

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm

### Installation & Run

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

Open your browser at:
```
http://localhost:5173/
```

### Production Build

```bash
npm run build
```

---

## 📱 Mobile Frame & Desktop Modes

- **Mobile Frame View**: Centers the app in a realistic mobile device frame complete with a clock (`18:30`), camera punch-hole, and status indicators matching the Figma design mockup.
- **Full-Screen View**: Allows expanding the app to take up the full viewport on tablets, desktops, or actual mobile device screens.
- **Role Switcher**: Click the **"Switch Role"** button in the header or top bar to toggle between **Patient Portal** and **Caregiver Hub**.
