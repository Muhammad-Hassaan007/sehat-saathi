import { useState, useEffect } from 'react';
import { 
  Heart, 
  ArrowRight, 
  Mic, 
  ShieldCheck, 
  Users, 
  QrCode, 
  ChevronUp, 
  X, 
  Globe, 
  Smartphone,
  Menu,
  CheckCircle2,
  AlertTriangle,
  Bell,
  Calendar,
  PhoneCall,
  FileText,
  Sparkles,
  ChevronRight,
  Lock,
  Download,
  Share2,
  Monitor
} from 'lucide-react';

interface HealthifyLandingPageProps {
  onLaunchApp: (role?: 'patient' | 'caregiver') => void;
}

export function HealthifyLandingPage({
  onLaunchApp
}: HealthifyLandingPageProps) {
  // Mobile navigation drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Download / Install Modal State
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  // Floating question widget & modal
  const [showQuestionWidget, setShowQuestionWidget] = useState(true);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [sampleQuery, setSampleQuery] = useState("Should I take my blood thinner (Aspirin) in the morning or evening?");
  const [queryAnswer, setQueryAnswer] = useState<string | null>(null);

  // Floating scroll-to-top button state
  const [showScrollTop, setShowScrollTop] = useState(false);

  // QR Code modal state
  const [showQRModal, setShowQRModal] = useState(false);

  // Active showcase tab for product previews
  const [activeShowcaseIndex, setActiveShowcaseIndex] = useState(0);

  // Active experience tab: 'patient' | 'caregiver'
  const [experienceTab, setExperienceTab] = useState<'patient' | 'caregiver'>('patient');

  // Deferred prompt for PWA install
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // Listen for native PWA beforeinstallprompt
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleTriggerInstall = (role: 'patient' | 'caregiver' = 'patient') => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      deferredPrompt.userChoice.then((choice: any) => {
        if (choice.outcome === 'accepted') {
          setDeferredPrompt(null);
        }
      });
    }
    // Launch app directly into target role
    onLaunchApp(role);
    setShowDownloadModal(false);
  };

  // Scroll to top tracking
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSimulateQuestion = (q: string) => {
    setSampleQuery(q);
    if (q.includes("Aspirin") || q.includes("blood thinner")) {
      setQueryAnswer("✅ CITED FROM DISCHARGE LINE 14: Take Aspirin 75mg once daily in the morning with breakfast and water. Do not take on an empty stomach.");
    } else if (q.includes("walk") || q.includes("exercise")) {
      setQueryAnswer("✅ CITED FROM DISCHARGE LINE 08: Daily light walking for 20 minutes is recommended. Avoid strenuous uphill stairs.");
    } else {
      setQueryAnswer("⚠️ HONEST HANDOFF (UX-28): This inquiry is not found in your hospital discharge summary. We have flagged this question and notified your doctor and designated caregiver.");
    }
  };

  // 6 Core Features (Strictly Green Palette)
  const features = [
    {
      id: "voice",
      title: "1. Voice-First Assistance",
      subtitle: "Hands-Free Spoken Interaction",
      desc: "Patients can ask questions naturally using voice or text about their saved hospital discharge instructions. Built with clear speech synthesis and tremor-tolerant tap controls.",
      icon: Mic,
      color: "bg-emerald-50 text-[#234E35] border-emerald-200",
      pill: "Accessible Voice STT/TTS"
    },
    {
      id: "reminders",
      title: "2. Medicine Reminders",
      subtitle: "Audible Schedule Verifications",
      desc: "Patients can review saved medication instructions and audibly confirm reminder details with clear spoken prompts and high-contrast visual cues.",
      icon: Bell,
      color: "bg-emerald-50 text-[#234E35] border-emerald-200",
      pill: "Audible Confirmations"
    },
    {
      id: "appointments",
      title: "3. Appointment Booking",
      subtitle: "Safe Confirmation Workflow",
      desc: "Patients can request hospital follow-up visits through a confirmation-based workflow that requires explicit patient consent before scheduling.",
      icon: Calendar,
      color: "bg-emerald-50 text-[#234E35] border-emerald-200",
      pill: "Two-Step Consent"
    },
    {
      id: "emergency",
      title: "4. Emergency Caregiver Messaging",
      subtitle: "Direct Emergency Fan-Out",
      desc: "Patients can trigger direct emergency calls to 911 and designated family caregivers immediately without disorienting sirens or complex menus.",
      icon: PhoneCall,
      color: "bg-emerald-50 text-[#234E35] border-emerald-200",
      pill: "Direct 911 & Family Dial"
    },
    {
      id: "dashboard",
      title: "5. Caregiver Dashboard",
      subtitle: "Real-Time Tele-Care Coordination",
      desc: "Caregivers and relatives can monitor recovery progress, verify daily walking goals, review clinician notes, and manage prescriptions remotely.",
      icon: Users,
      color: "bg-emerald-50 text-[#234E35] border-emerald-200",
      pill: "Caregiver & Doctor Hub"
    },
    {
      id: "grounding",
      title: "6. Grounded Answers",
      subtitle: "Strict Verification Protocol",
      desc: "Every answer is strictly grounded in the patient's verified hospital discharge summary. Missing or uncertain information is flagged immediately for human clinical review.",
      icon: ShieldCheck,
      color: "bg-emerald-50 text-[#234E35] border-[#234E35]/30",
      pill: "Zero Hallucination Guarantee"
    }
  ];

  // Showcase Previews
  const showcaseScreens = [
    {
      title: "Patient Home Screen",
      subtitle: "Voice-First Daily Recovery & Medication Bar",
      desc: "Clean single voice search bar matching clinical ergonomics, daily health score recovery ring, caretaker walk tracker, and tap-to-dial emergency button.",
      badge: "Patient Portal",
      highlights: ["Single Voice Bar", "Caretaker Walk Card", "Verified Meds", "Direct Emergency Call"]
    },
    {
      title: "AI Voice Assistant",
      subtitle: "Live Captions & Certainty Badges",
      desc: "Provides spoken and written answers with word-by-word synchronized captions, verbatim line citations from doctor instructions, and tremor-safe microphone controls.",
      badge: "Clinical Grounding",
      highlights: ["Spoken Voice & Text", "Line 14 Citations", "Live Speech Synthesis", "Certainty Rating"]
    },
    {
      title: "Discharge Q&A & Honest Handoff",
      subtitle: "Never Guessing Beyond Doctor's Notes",
      desc: "When a question exceeds saved hospital instructions, the assistant explicitly alerts the patient and logs the query to the caregiver triage queue.",
      badge: "Safety Standard",
      highlights: ["Zero Hallucinations", "Clinical Triage Queue", "Doctor Review Notes", "Audit Trail"]
    },
    {
      title: "Medicine Reminder & Confirmations",
      subtitle: "Two-Way Spoken Action Verification",
      desc: "Ensures elderly patients never miss dosages. Audio alert announces medication name, dosage instructions, and awaits patient confirmation.",
      badge: "Adherence Protocol",
      highlights: ["Spoken Prompt", "Tap or Speak 'Taken'", "Snooze Protection", "Caregiver Notification"]
    },
    {
      title: "Emergency Contacts System",
      subtitle: "Instant Dial to 911 & Designated Family",
      desc: "Clean modal with direct-dial emergency services and saved family contacts (Son Tariq, Dr. Ayesha) with quick contact addition.",
      badge: "Emergency Safety",
      highlights: ["Direct 911 Call", "One-Tap Family Dial", "Add Relatives", "No Jarring Alarms"]
    },
    {
      title: "Caregiver & Doctor Dashboard",
      subtitle: "Real-Time Tele-Care Coordination",
      desc: "Allows family members and visiting nurses to verify patient status, resolve unanswered questions, and update daily walking exercises.",
      badge: "Caregiver Hub",
      highlights: ["Live Status Badges", "Resolve Queue", "Remote Rx Manager", "Walking Log Updater"]
    }
  ];

  // How It Works Steps
  const steps = [
    {
      step: "01",
      title: "Save Discharge Instructions",
      subtitle: "Hospital Records Ingestion",
      desc: "The hospital discharge summary, prescribed medications, dosages, and postoperative restrictions are securely loaded into the patient's personal record."
    },
    {
      step: "02",
      title: "Ask a Question via Voice or Text",
      subtitle: "Natural Spoken Interaction",
      desc: "Patients tap the large microphone button and speak naturally in English. No complex typing or confusing menus required."
    },
    {
      step: "03",
      title: "Review Grounded Answer",
      subtitle: "Verified Line Citations",
      desc: "The system cites verbatim doctor notes with an explicit 'Certain' confidence badge and synchronized audio playback."
    },
    {
      step: "04",
      title: "Confirm Reminders or Requests",
      subtitle: "Explicit Action Consent",
      desc: "Important actions—like scheduling medicine reminders or appointment visits—require an explicit spoken or tapped confirmation."
    },
    {
      step: "05",
      title: "Notify Caregivers & Family",
      subtitle: "Automated Clinical Handoff",
      desc: "If any red-flag symptom is detected or an instruction is missing, the designated caregiver receives an immediate real-time alert."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C231A] font-sans selection:bg-[#EBF3ED] selection:text-[#234E35] relative overflow-x-hidden">
      
      {/* =========================================================================
          SECTION A: HEADER AND NAVIGATION (All Green Theme)
          ========================================================================= */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E1D5] shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-5 lg:py-6 flex items-center justify-between">
          
          {/* Brand Logo with Generous Spacing */}
          <a href="#hero" className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-full bg-[#234E35] flex items-center justify-center text-white shadow-lg shadow-[#234E35]/25 transition-transform group-hover:scale-105 shrink-0">
              <Heart className="w-6 h-6 fill-white" />
            </div>
            <div>
              <span className="font-serif text-2xl sm:text-3xl font-black tracking-tight text-[#1C231A] block leading-tight">
                Sehat Saathi
              </span>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#234E35] block pt-0.5">
                Voice-First Healthcare Companion
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-9 xl:gap-11 text-xs font-black uppercase tracking-widest text-[#3E4A42]">
            <a href="#hero" className="hover:text-[#234E35] transition-colors py-1.5 border-b-2 border-transparent hover:border-[#234E35]">Home</a>
            <a href="#features" className="hover:text-[#234E35] transition-colors py-1.5 border-b-2 border-transparent hover:border-[#234E35]">Features</a>
            <a href="#how-it-works" className="hover:text-[#234E35] transition-colors py-1.5 border-b-2 border-transparent hover:border-[#234E35]">How It Works</a>
            <a href="#showcase" className="hover:text-[#234E35] transition-colors py-1.5 border-b-2 border-transparent hover:border-[#234E35]">Showcase</a>
            <a href="#caregivers" className="hover:text-[#234E35] transition-colors py-1.5 border-b-2 border-transparent hover:border-[#234E35]">For Caregivers</a>
            <a href="#safety" className="hover:text-[#234E35] transition-colors py-1.5 border-b-2 border-transparent hover:border-[#234E35]">Safety & Trust</a>
            <a href="#contact" className="hover:text-[#234E35] transition-colors py-1.5 border-b-2 border-transparent hover:border-[#234E35]">Contact</a>
          </nav>

          {/* Action CTAs: Download App & Doctor Hub */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={() => onLaunchApp('caregiver')}
              className="px-5 py-2.5 rounded-full border-2 border-[#234E35] text-[#234E35] text-xs font-black uppercase tracking-wider hover:bg-[#234E35]/10 transition-colors"
            >
              Doctor Hub
            </button>
            <button
              onClick={() => setShowDownloadModal(true)}
              className="px-7 py-3 rounded-full bg-[#234E35] hover:bg-[#183825] text-white text-xs font-black uppercase tracking-wider shadow-md shadow-[#234E35]/30 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download App</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-3 rounded-xl bg-white border border-[#E8E1D5] text-[#1C231A] hover:bg-[#F0EBE1] transition-colors shadow-xs"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF7F2] border-b border-[#E8E1D5] px-6 py-6 space-y-4 shadow-2xl">
            <nav className="flex flex-col space-y-3.5 text-sm font-black uppercase tracking-wider text-[#3E4A42]">
              <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#234E35]">Home</a>
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#234E35]">Features</a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#234E35]">How It Works</a>
              <a href="#showcase" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#234E35]">Showcase</a>
              <a href="#caregivers" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#234E35]">For Caregivers</a>
              <a href="#safety" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#234E35]">Safety & Trust</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#234E35]">Contact</a>
            </nav>
            <div className="pt-4 border-t border-[#E8E1D5] flex flex-col gap-3">
              <button
                onClick={() => { setMobileMenuOpen(false); setShowDownloadModal(true); }}
                className="w-full py-3.5 rounded-full bg-[#234E35] text-white text-xs font-black uppercase tracking-wider text-center shadow-md flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Patient App</span>
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onLaunchApp('caregiver'); }}
                className="w-full py-3.5 rounded-full border-2 border-[#234E35] text-[#234E35] text-xs font-black uppercase tracking-wider text-center"
              >
                Caregiver & Doctor Hub
              </button>
            </div>
          </div>
        )}
      </header>

      {/* =========================================================================
          SECTION B: HERO SECTION (Headline: Your Health Partner in Darker Green)
          ========================================================================= */}
      <section id="hero" className="relative px-4 sm:px-8 lg:px-12 pt-4 pb-14 lg:pb-24">
        
        <div className="relative rounded-[36px] sm:rounded-[52px] lg:rounded-[64px] overflow-hidden min-h-[640px] lg:min-h-[760px] flex items-center bg-[#F0EBE1] shadow-2xl border border-[#E8E1D5]">
          
          {/* Smiling Woman Photo from Healthify */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              src="/images/smiling-girl-clean.png" 
              alt="Healthy recovering individual smiling in kitchen - Sehat Saathi" 
              className="absolute right-0 top-0 w-full lg:w-[60%] h-full object-cover object-right-top filter brightness-[1.02] contrast-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/95 lg:via-[#FAF7F2]/45 to-transparent"></div>
          </div>

          {/* Left Asymmetrical White Hero Card */}
          <div className="relative z-10 m-4 sm:m-8 lg:m-16 max-w-xl bg-white rounded-tl-[60px] sm:rounded-tl-[90px] rounded-br-[60px] sm:rounded-br-[90px] rounded-tr-[28px] rounded-bl-[28px] p-8 sm:p-14 lg:p-16 shadow-2xl space-y-6 border border-[#EFE9DF]">
            
            {/* Brand Tag in Green */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF3ED] text-[#234E35] border border-[#C8E4CF] text-xs font-black uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-[#234E35]" />
              <span>SEHAT SAATHI</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[54px] font-bold leading-[1.14] text-[#1C231A] tracking-tight">
              Healthcare Support <br />
              <span className="text-[#234E35] italic font-extrabold">
                Your Health Partner.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#3E4A42] font-semibold leading-relaxed">
              A voice-first healthcare companion helping elderly patients understand their discharge instructions, manage medicine reminders, and stay connected with their caregivers.
            </p>

            {/* Primary & Secondary CTAs (All Green) */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              <button
                onClick={() => setShowDownloadModal(true)}
                className="px-8 py-4 rounded-full bg-[#234E35] hover:bg-[#183825] text-white text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-2.5 shadow-xl shadow-[#234E35]/30 transition-all transform hover:-translate-y-0.5 active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Download App</span>
                <span className="text-sm">📲</span>
              </button>

              <a
                href="#how-it-works"
                className="px-7 py-4 rounded-full bg-white hover:bg-[#FAF7F2] border-2 border-[#234E35] text-[#234E35] text-xs sm:text-sm font-black uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <span>See How It Works</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            {/* Hero Live Voice Demo Preview Snippet */}
            <div className="pt-4 border-t border-[#F0EBE1]">
              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#F7F4EE] border border-[#E8E1D5]">
                <div className="w-10 h-10 rounded-full bg-[#234E35] text-white flex items-center justify-center shrink-0 animate-pulse">
                  <Mic className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-[11px] uppercase font-black text-[#234E35] tracking-wider">Voice Prompt Demonstration</div>
                  <div className="text-sm font-bold text-[#1C231A]">"Should I take my Aspirin in the morning with food?"</div>
                </div>
              </div>
            </div>

          </div>

          {/* Floating Live Badges on the Right (Overlay on Smiling Woman) */}
          <div className="hidden lg:flex absolute bottom-12 right-12 z-10 flex-col gap-3.5">
            <div className="px-6 py-3.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl border border-[#E8E1D5] flex items-center gap-3.5 transform hover:scale-105 transition-transform">
              <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-ping"></div>
              <div>
                <div className="text-xs font-extrabold text-[#1C231A]">100% Grounded in Doctor Notes</div>
                <div className="text-[11px] font-bold text-[#234E35]">Zero Hallucination Safety Guarantee</div>
              </div>
            </div>

            <div className="px-6 py-3.5 rounded-2xl bg-[#234E35] text-white shadow-2xl flex items-center gap-3.5 transform hover:scale-105 transition-transform border border-emerald-900/40">
              <Users className="w-5 h-5" />
              <div>
                <div className="text-xs font-extrabold">Caregiver Relay Active</div>
                <div className="text-[11px] font-semibold text-white/90">Syncs with Family & Visiting Clinicians</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          HEALTHIFY 5-BADGE CAPABILITY STRIP (Monochromatic Green Palette)
          ========================================================================= */}
      <section className="bg-white py-12 px-6 lg:px-14 border-y border-[#E8E1D5] shadow-xs">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 text-center items-center">
          
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF3ED] flex items-center justify-center text-[#234E35] shadow-xs border border-emerald-200">
              <ShieldCheck className="w-6 h-6 text-[#234E35]" />
            </div>
            <h4 className="text-sm font-extrabold text-[#1C231A] leading-tight">100% Grounded AI</h4>
            <p className="text-xs text-[#525E56] font-semibold">Verified in hospital notes</p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF3ED] flex items-center justify-center text-[#234E35] shadow-xs border border-emerald-200">
              <Mic className="w-6 h-6 text-[#234E35]" />
            </div>
            <h4 className="text-sm font-extrabold text-[#1C231A] leading-tight">Hands-Free STT/TTS</h4>
            <p className="text-xs text-[#525E56] font-semibold">Natural voice interaction</p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF3ED] flex items-center justify-center text-[#234E35] shadow-xs border border-emerald-200">
              <Users className="w-6 h-6 text-[#234E35]" />
            </div>
            <h4 className="text-sm font-extrabold text-[#1C231A] leading-tight">Caregiver Pairing</h4>
            <p className="text-xs text-[#525E56] font-semibold">Real-time alerts & triage</p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF3ED] flex items-center justify-center text-[#234E35] shadow-xs border border-emerald-200">
              <Smartphone className="w-6 h-6 text-[#234E35]" />
            </div>
            <h4 className="text-sm font-extrabold text-[#1C231A] leading-tight">Installable PWA</h4>
            <p className="text-xs text-[#525E56] font-semibold">iOS, Android & Desktop</p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF3ED] flex items-center justify-center text-[#234E35] shadow-xs border border-emerald-200">
              <Globe className="w-6 h-6 text-[#234E35]" />
            </div>
            <h4 className="text-sm font-extrabold text-[#1C231A] leading-tight">Accessible Design</h4>
            <p className="text-xs text-[#525E56] font-semibold">High-contrast touch targets</p>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION C: FEATURES SECTION (All-Green Theme)
          ========================================================================= */}
      <section id="features" className="py-24 px-6 lg:px-14 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3.5">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-[#234E35] block">
            CORE CAPABILITIES
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-[46px] text-[#1C231A] font-bold leading-tight tracking-tight">
            Designed for Safe Recovery & Family Confidence
          </h2>
          <p className="text-base sm:text-lg text-[#3E4A42] font-semibold leading-relaxed">
            Every feature is engineered to simplify complex hospital discharge instructions, eliminate medication mistakes, and keep family caregivers effortlessly informed.
          </p>
        </div>

        {/* 6 Features Grid (All in Coordinated Green Styles) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div 
                key={feat.id}
                className="bg-white rounded-3xl p-8 border border-[#E8E1D5] shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 ${feat.color}`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full bg-[#EBF3ED] text-[#234E35] border border-emerald-200">
                      {feat.pill}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#1C231A] group-hover:text-[#234E35] transition-colors leading-snug">
                      {feat.title}
                    </h3>
                    <div className="text-xs font-extrabold text-[#234E35] pt-1">{feat.subtitle}</div>
                  </div>

                  <p className="text-sm font-semibold text-[#4A554E] leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-[#F0EBE1] flex items-center justify-between text-xs font-black uppercase tracking-wider text-[#234E35]">
                  <span>Explore Workflow</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION D: PRODUCT SHOWCASE (Watermark '3' Strictly Behind in Green, All-Green Cards)
          ========================================================================= */}
      <section id="showcase" className="py-24 px-6 lg:px-14 bg-[#F2F7F4] border-y border-[#E8E1D5] relative overflow-hidden">
        
        {/* Giant Watermark Numeral "3" STRICTLY BEHIND THE TEXT (z-0, Translucent Green) */}
        <div 
          className="absolute top-2 left-1/2 -translate-x-1/2 z-0 pointer-events-none select-none"
          aria-hidden="true"
        >
          <span 
            className="font-serif font-black text-[220px] sm:text-[340px] leading-none block"
            style={{ color: 'rgba(35, 78, 53, 0.08)' }}
          >
            3
          </span>
        </div>

        {/* Content Container (z-10 ensures text sits comfortably IN FRONT of the watermark) */}
        <div className="max-w-7xl mx-auto relative z-10 space-y-16">
          
          {/* Header with High-Contrast Text */}
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#234E35] block">
              POST-DISCHARGE PLATFORM
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-[46px] text-[#1C231A] font-bold leading-tight tracking-tight">
              The Complete Solution with Dedicated Patient & Caregiver Portals
            </h2>
            <p className="text-base sm:text-lg font-semibold text-[#3E4A42] leading-relaxed">
              Seamless interaction whether you are an elderly patient recovering safely at home or a caregiver monitoring recovery remotely.
            </p>
          </div>

          {/* Interactive Screen Selector Pill Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto">
            {showcaseScreens.map((screen, idx) => (
              <button
                key={screen.title}
                onClick={() => setActiveShowcaseIndex(idx)}
                className={`px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all ${
                  activeShowcaseIndex === idx 
                    ? 'bg-[#234E35] text-white shadow-md scale-105' 
                    : 'bg-white text-[#4A554E] hover:bg-[#FAF7F2] border border-[#E8E1D5]'
                }`}
              >
                {screen.title}
              </button>
            ))}
          </div>

          {/* Showcase Spotlight Card */}
          <div className="bg-white rounded-[36px] sm:rounded-[52px] p-8 sm:p-14 border border-[#E8E1D5] shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Screen Details */}
              <div className="lg:col-span-5 space-y-5">
                <span className="px-4 py-1.5 rounded-full bg-[#EBF3ED] text-[#234E35] text-xs font-black uppercase tracking-wider inline-block">
                  {showcaseScreens[activeShowcaseIndex].badge}
                </span>

                <h3 className="font-serif text-3xl sm:text-4xl text-[#1C231A] font-bold leading-tight">
                  {showcaseScreens[activeShowcaseIndex].title}
                </h3>

                <h4 className="text-sm sm:text-base font-extrabold text-[#234E35]">
                  {showcaseScreens[activeShowcaseIndex].subtitle}
                </h4>

                <p className="text-sm sm:text-base font-semibold text-[#4A554E] leading-relaxed">
                  {showcaseScreens[activeShowcaseIndex].desc}
                </p>

                {/* Bullet Highlights */}
                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  {showcaseScreens[activeShowcaseIndex].highlights.map(hl => (
                    <div key={hl} className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1C231A]">
                      <CheckCircle2 className="w-4 h-4 text-[#234E35] shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>

                {/* Download / Test Button */}
                <div className="pt-4">
                  <button
                    onClick={() => setShowDownloadModal(true)}
                    className="px-7 py-3.5 rounded-full bg-[#234E35] hover:bg-[#183825] text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download App to Test</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: Realistic Mockup Display */}
              <div className="lg:col-span-7 flex justify-center">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#1C231A] max-w-sm sm:max-w-md w-full bg-[#FAF7F2]">
                  <img 
                    src="/images/sehat-mobile-mockups.png" 
                    alt="Sehat Saathi mobile interface screenshot" 
                    className="w-full h-auto object-cover"
                  />
                  <div className="p-4 bg-white/95 border-t border-[#E8E1D5] flex items-center justify-between text-xs">
                    <span className="font-black text-[#1C231A]">Interactive PWA View</span>
                    <span className="text-[#234E35] font-extrabold flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                      Active Live Session
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Asymmetrical Layout Pair (Both in Forest Green Style) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
            
            {/* Left Editorial Card: Doctor Quote & QR Code */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-8 sm:p-12 border border-[#E8E1D5] shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-full bg-[#EBF3ED] text-[#234E35] flex items-center justify-center font-serif text-3xl font-bold">
                  “
                </div>
                <p className="font-serif text-xl sm:text-2xl text-[#1C231A] font-semibold italic leading-relaxed">
                  Post-discharge non-adherence and missed warning signs cause over 40% of preventable readmissions. Sehat Saathi provides clear, grounded spoken reassurance right when patients need it at home.
                </p>
                <div className="pt-2">
                  <div className="text-sm font-extrabold text-[#1C231A]">Dr. Ayesha Malik, MD</div>
                  <div className="text-xs font-bold text-[#525E56]">Department of Cardiology & Post-Op Recovery</div>
                </div>
              </div>

              {/* QR Code Quick Scan Card */}
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] flex items-center justify-between">
                <div>
                  <div className="text-sm font-extrabold text-[#1C231A]">Scan on Your Mobile Device</div>
                  <div className="text-xs font-semibold text-[#525E56]">Instant PWA access without App Store friction</div>
                </div>
                <button
                  onClick={() => setShowQRModal(true)}
                  className="p-3 rounded-xl bg-white border border-[#E8E1D5] text-[#1C231A] hover:bg-[#EBF3ED] hover:text-[#234E35] transition-colors"
                  title="View QR Code"
                >
                  <QrCode className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Right Card: Deep Forest Emerald Green (#1E432F) */}
            <div className="lg:col-span-6 bg-[#1E432F] text-white rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col justify-between space-y-6 border border-emerald-950/40">
              <div className="space-y-4">
                <span className="text-xs font-black uppercase tracking-widest bg-white/15 px-3.5 py-1.5 rounded-full inline-block text-emerald-100">
                  TRUSTED CARE
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold leading-tight text-white">
                  Start Your Safe Recovery Journey With Total Confidence
                </h3>
                <p className="text-sm sm:text-base font-medium text-emerald-100/90 leading-relaxed">
                  Helping over 1,400+ elderly recovery patients and designated family caregivers avoid confusing paper discharge jargon with verified spoken guidance.
                </p>
              </div>

              <div className="pt-4 border-t border-white/20 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-800 border-2 border-emerald-600 flex items-center justify-center font-bold text-xs text-white">AM</div>
                    <div className="w-10 h-10 rounded-full bg-emerald-700 border-2 border-emerald-600 flex items-center justify-center font-bold text-xs text-white">TR</div>
                    <div className="w-10 h-10 rounded-full bg-emerald-600 border-2 border-emerald-600 flex items-center justify-center font-bold text-xs text-white">FK</div>
                  </div>
                  <div className="text-sm font-extrabold text-white">1,400+ Families Enrolled</div>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-bold font-serif leading-none text-white">4.9 / 5.0</div>
                  <div className="text-xs font-semibold text-emerald-200">Clinical Feedback Score</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION E: HOW IT WORKS (All-Green Theme)
          ========================================================================= */}
      <section id="how-it-works" className="py-24 px-6 lg:px-14 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3.5">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-[#234E35] block">
            HOW IT WORKS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-[46px] text-[#1C231A] font-bold leading-tight tracking-tight">
            The Safe 5-Step Patient Recovery Journey
          </h2>
          <p className="text-base sm:text-lg font-semibold text-[#3E4A42] leading-relaxed">
            A simple, verified path from hospital discharge to full recovery at home.
          </p>
        </div>

        {/* 5 Steps Linear Chain */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {steps.map((st) => (
            <div 
              key={st.step}
              className="bg-white rounded-3xl p-6 border border-[#E8E1D5] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-4 relative"
            >
              <div className="space-y-3">
                <span className="font-serif text-4xl sm:text-5xl font-black text-[#234E35]/35 block leading-none">
                  {st.step}
                </span>
                <h3 className="font-serif text-lg font-bold text-[#1C231A] leading-snug">
                  {st.title}
                </h3>
                <div className="text-xs font-extrabold text-[#234E35]">{st.subtitle}</div>
                <p className="text-xs sm:text-sm font-semibold text-[#4A554E] leading-relaxed">
                  {st.desc}
                </p>
              </div>

              <div className="pt-3 text-[11px] font-black uppercase tracking-wider text-[#234E35] border-t border-[#F0EBE1]">
                Step {st.step} Verified
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION F: PATIENT & CAREGIVER EXPERIENCE (All-Green Theme)
          ========================================================================= */}
      <section id="caregivers" className="py-24 px-6 lg:px-14 bg-white border-y border-[#E8E1D5]">
        <div className="max-w-7xl mx-auto space-y-14">
          
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#234E35] block">
              TWO TAILORED EXPERIENCES
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-[46px] text-[#1C231A] font-bold leading-tight tracking-tight">
              Empowering the Patient. Relieving the Caregiver.
            </h2>
            <p className="text-base sm:text-lg font-semibold text-[#3E4A42] leading-relaxed">
              Explore how Sehat Saathi seamlessly bridges the communication gap between elderly patients and their relatives.
            </p>
          </div>

          {/* Experience Switcher Pills */}
          <div className="flex justify-center">
            <div className="p-1.5 rounded-full bg-[#FAF7F2] border-2 border-[#E8E1D5] inline-flex gap-2">
              <button
                onClick={() => setExperienceTab('patient')}
                className={`px-8 py-3 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider transition-all ${
                  experienceTab === 'patient'
                    ? 'bg-[#234E35] text-white shadow-md'
                    : 'text-[#4A554E] hover:text-[#1C231A]'
                }`}
              >
                Patient Experience
              </button>
              <button
                onClick={() => setExperienceTab('caregiver')}
                className={`px-8 py-3 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider transition-all ${
                  experienceTab === 'caregiver'
                    ? 'bg-[#234E35] text-white shadow-md'
                    : 'text-[#4A554E] hover:text-[#1C231A]'
                }`}
              >
                Caregiver Experience
              </button>
            </div>
          </div>

          {/* Dual Experience Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {experienceTab === 'patient' ? (
              <>
                <div className="space-y-6">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-[#EBF3ED] text-[#234E35] text-xs font-black uppercase tracking-wider">
                    For Elderly & Recovering Individuals
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#1C231A] font-bold leading-tight">
                    Hands-Free, Stress-Free Healthcare Guidance
                  </h3>
                  <p className="text-base font-semibold text-[#4A554E] leading-relaxed">
                    Designed specifically for seniors who struggle with complex smartphone keyboards or small fonts. Simply tap the large microphone and talk like you're speaking with a caring family doctor.
                  </p>
                  
                  <ul className="space-y-3.5">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#234E35] flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-sm sm:text-base font-semibold text-[#1C231A]"><strong>Large, Accessible Buttons:</strong> Tremor-accommodating tap targets exceeding 48px touch guidelines.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#234E35] flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-sm sm:text-base font-semibold text-[#1C231A]"><strong>Microphone Interaction:</strong> Speech recognition with synchronized sentence-highlighted captions.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#234E35] flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-sm sm:text-base font-semibold text-[#1C231A]"><strong>Clear Confirmation Messages:</strong> Spoken verification before any medicine reminder or appointment is saved.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#234E35] flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-sm sm:text-base font-semibold text-[#1C231A]"><strong>Direct Emergency Access:</strong> Instant single-tap direct call to 911 and designated family members.</span>
                    </li>
                  </ul>

                  <button
                    onClick={() => setShowDownloadModal(true)}
                    className="px-8 py-3.5 rounded-full bg-[#234E35] text-white text-xs font-black uppercase tracking-wider shadow-md hover:bg-[#183825] transition-all flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Patient App</span>
                  </button>
                </div>

                <div className="bg-[#FAF7F2] rounded-3xl p-8 sm:p-10 border border-[#E8E1D5] space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E8E1D5]">
                    <span className="text-sm font-extrabold text-[#1C231A]">Sample Voice Interaction</span>
                    <span className="text-xs font-bold text-[#234E35]">Live Audio Feedback</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-[#E8E1D5] space-y-1.5">
                    <div className="text-[11px] font-black uppercase tracking-wider text-[#6B756E]">PATIENT SPOKE:</div>
                    <div className="text-base font-bold text-[#1C231A]">"Can I start walking daily after my heart surgery?"</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#EBF3ED] border border-[#C8E4CF] space-y-2">
                    <div className="text-[11px] font-black uppercase tracking-wider text-[#234E35] flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>ASSISTANT (CITED DISCHARGE LINE 08):</span>
                    </div>
                    <div className="text-sm sm:text-base font-semibold text-[#1C231A] leading-relaxed">
                      "Yes, absolutely. According to Line 08 of your discharge instructions, you should do light walking for 20 minutes daily. Avoid strenuous uphill stairs."
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-6">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-[#EBF3ED] text-[#234E35] text-xs font-black uppercase tracking-wider">
                    For Sons, Daughters & Visiting Nurses
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#1C231A] font-bold leading-tight">
                    Complete Peace of Mind, Wherever You Are
                  </h3>
                  <p className="text-base font-semibold text-[#4A554E] leading-relaxed">
                    Working or living apart shouldn't mean worrying about missed doses or worsening symptoms. Caregivers receive instant updates, resolve ungrounded clinical questions, and log daily recovery milestones.
                  </p>
                  
                  <ul className="space-y-3.5">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#234E35] flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-sm sm:text-base font-semibold text-[#1C231A]"><strong>Patient Health Overview:</strong> Live score tracking adherence to medication and exercise regimens.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#234E35] flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-sm sm:text-base font-semibold text-[#1C231A]"><strong>Alerts Requiring Review:</strong> Immediate fan-out notifications when patients ask ungrounded queries.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#234E35] flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-sm sm:text-base font-semibold text-[#1C231A]"><strong>Caregiver Walk Updating:</strong> Caretakers can easily record and increment daily 20-min walking goals.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#234E35] flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-sm sm:text-base font-semibold text-[#1C231A]"><strong>Relevant Activity History:</strong> Complete audit trail of taken medicines and physician follow-ups.</span>
                    </li>
                  </ul>

                  <button
                    onClick={() => onLaunchApp('caregiver')}
                    className="px-8 py-3.5 rounded-full bg-[#234E35] text-white text-xs font-black uppercase tracking-wider shadow-md hover:bg-[#183825] transition-all"
                  >
                    Open Caregiver Dashboard
                  </button>
                </div>

                <div className="bg-[#FAF7F2] rounded-3xl p-8 sm:p-10 border border-[#E8E1D5] space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E8E1D5]">
                    <span className="text-sm font-extrabold text-[#1C231A]">Caregiver Alert Queue</span>
                    <span className="text-xs font-black text-[#234E35]">1 Item Pending</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-emerald-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black uppercase text-[#234E35] bg-[#EBF3ED] px-2.5 py-0.5 rounded-full">Honest Handoff</span>
                      <span className="text-xs font-semibold text-[#6B756E]">5m ago</span>
                    </div>
                    <div className="text-sm font-bold text-[#1C231A]">Patient asked about dietary supplements (Zinc & Omega 3)</div>
                    <div className="text-xs font-semibold text-[#4A554E]">Not mentioned in doctor discharge summary. Clinician review requested.</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-sm font-bold text-emerald-800 flex items-center justify-between">
                    <span>Morning Walking Exercise</span>
                    <span className="font-extrabold">20 / 20 min (Logged)</span>
                  </div>
                </div>
              </>
            )}

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION G: SAFETY AND TRUST (Healthcare Principles & Transparent Disclaimer)
          ========================================================================= */}
      <section id="safety" className="py-24 px-6 lg:px-14 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3.5">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-[#234E35] block">
            CLINICAL SAFETY PRINCIPLES
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-[46px] text-[#1C231A] font-bold leading-tight tracking-tight">
            Safety Above Everything Else
          </h2>
          <p className="text-base sm:text-lg font-semibold text-[#3E4A42] leading-relaxed">
            We follow strict medical safety boundaries to ensure patients receive reliable, verified discharge guidance without synthetic AI hallucinations.
          </p>
        </div>

        {/* 4 Pillars of Safety */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          <div className="bg-white rounded-3xl p-7 border border-[#E8E1D5] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF3ED] text-[#234E35] flex items-center justify-center font-bold">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1C231A]">
              Grounded in Records
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-[#4A554E] leading-relaxed">
              Every single response references verified lines from the hospital discharge summary. No random medical advice from untrusted web forums.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-[#E8E1D5] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF3ED] text-[#234E35] flex items-center justify-center font-bold">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1C231A]">
              Flagged for Review
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-[#4A554E] leading-relaxed">
              If an instruction is not clearly present in the record, the AI never fabricates answers. It flags the query for doctor and family review.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-[#E8E1D5] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF3ED] text-[#234E35] flex items-center justify-center font-bold">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1C231A]">
              Action Confirmation
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-[#4A554E] leading-relaxed">
              Medicine reminders and appointments are never created silently. The user must audibly or visually confirm each request.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-[#E8E1D5] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF3ED] text-[#234E35] flex items-center justify-center font-bold">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1C231A]">
              Emergency Escalation
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-[#4A554E] leading-relaxed">
              Recognized red-flag symptoms (severe chest pain, shortness of breath) immediately trigger direct dialing to 911 and designated family.
            </p>
          </div>

        </div>

        {/* Clear Medical Disclaimer Notice */}
        <div className="p-8 rounded-3xl bg-[#FAF7F2] border-2 border-[#E8E1D5] max-w-4xl mx-auto flex items-start gap-5 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#234E35] flex items-center justify-center shrink-0 mt-1">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#1C231A]">
              Transparent Healthcare Disclaimer
            </h4>
            <p className="text-xs sm:text-sm font-semibold text-[#3E4A42] leading-relaxed">
              <strong>Sehat Saathi does not diagnose medical conditions or independently prescribe or alter medication doses.</strong> It is designed solely as an accessible, voice-first comprehension and adherence tool for saved discharge instructions provided by licensed healthcare practitioners. In case of an emergency, always call 911 or visit the nearest hospital.
            </p>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION H: FINAL CALL TO ACTION (All-Green Theme)
          ========================================================================= */}
      <section className="py-24 px-6 lg:px-14 bg-[#F2F7F4] relative overflow-hidden">
        <div className="max-w-5xl mx-auto space-y-14">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#234E35] block">
              GET STARTED TODAY
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-[52px] text-[#1C231A] font-bold leading-tight tracking-tight">
              Helping Families Care With Greater Confidence.
            </h2>
            <p className="text-base sm:text-lg font-semibold text-[#3E4A42] leading-relaxed">
              Making healthcare instructions easier to understand and helping families stay connected when support matters most.
            </p>

            {/* CTA with Scribble Arrow in Green */}
            <div className="pt-8 relative inline-flex flex-col items-center">
              <div className="hidden sm:block absolute -top-8 -left-32 font-handwriting text-3xl sm:text-4xl font-bold text-[#234E35] rotate-[-8deg] select-none pointer-events-none">
                Give it a try! ↗
              </div>

              <button
                onClick={() => setShowDownloadModal(true)}
                className="px-10 py-4 rounded-full bg-[#234E35] hover:bg-[#183825] text-white text-sm font-black uppercase tracking-wider shadow-2xl shadow-[#234E35]/35 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center gap-2.5"
              >
                <Download className="w-5 h-5" />
                <span>Download Sehat Saathi</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 100% Medical Grounding Guarantee Banner */}
          <div className="rounded-tl-[50px] sm:rounded-tl-[70px] rounded-br-[50px] sm:rounded-br-[70px] rounded-tr-[24px] rounded-bl-[24px] bg-[#1E432F] text-white p-8 sm:p-14 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-emerald-950/40">
            <div className="flex items-center gap-6">
              <div className="w-18 h-18 rounded-full border-2 border-emerald-300/40 flex items-center justify-center shrink-0 text-white font-serif text-3xl font-black">
                100%
              </div>
              <div className="space-y-1.5">
                <h4 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                  Medical Grounding Guarantee
                </h4>
                <p className="text-xs sm:text-sm font-semibold text-emerald-100 max-w-md leading-relaxed">
                  Zero hallucinations. Every voice answer links directly to verified discharge papers, with automated clinician notification.
                </p>
              </div>
            </div>

            <div className="text-right">
              <button
                onClick={() => onLaunchApp('caregiver')}
                className="px-7 py-3.5 rounded-full bg-white text-[#1E432F] text-xs sm:text-sm font-black uppercase tracking-wider hover:bg-emerald-50 transition-colors shadow-md"
              >
                Review Clinician Portal
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION I: COMPREHENSIVE FOOTER
          ========================================================================= */}
      <footer id="contact" className="bg-[#10241A] text-white pt-20 pb-14 px-6 lg:px-14 border-t border-emerald-950">
        <div className="max-w-7xl mx-auto space-y-14">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            
            {/* Col 1: Brand & Mission */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#234E35] flex items-center justify-center text-white">
                  <Heart className="w-4 h-4 fill-white" />
                </div>
                <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Sehat Saathi
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-sm">
                Empowering elderly patients with accessible, voice-first hospital discharge comprehension in natural spoken English, while giving family caregivers reliable oversight.
              </p>
              <div className="flex items-center gap-3 pt-2 text-xs font-bold text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Active Server Deployment • PWA 2.0</span>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-black uppercase tracking-widest text-[#234E35]">
                Navigation
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm font-semibold text-slate-300">
                <li><a href="#hero" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#showcase" className="hover:text-white transition-colors">Showcase</a></li>
                <li><a href="#caregivers" className="hover:text-white transition-colors">For Caregivers</a></li>
              </ul>
            </div>

            {/* Col 3: Applications & Portals */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-black uppercase tracking-widest text-[#234E35]">
                Applications
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm font-semibold text-slate-300">
                <li>
                  <button onClick={() => setShowDownloadModal(true)} className="hover:text-white transition-colors text-left flex items-center gap-1.5">
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PWA App</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => onLaunchApp('caregiver')} className="hover:text-white transition-colors text-left">
                    Caregiver Triage Dashboard
                  </button>
                </li>
                <li>
                  <button onClick={() => setShowQRModal(true)} className="hover:text-white transition-colors text-left">
                    Install PWA on Phone
                  </button>
                </li>
                <li>
                  <button onClick={() => setShowQuestionModal(true)} className="hover:text-white transition-colors text-left">
                    Interactive Q&A Simulator
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Safety & Emergency */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-black uppercase tracking-widest text-emerald-400">
                Emergency Support
              </h4>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="text-xs font-black text-rose-400">IMMEDIATE MEDICAL EMERGENCIES</div>
                <div className="text-xs font-semibold text-slate-300 leading-relaxed">Call 911 or your local emergency rescue immediately.</div>
                <div className="text-xs font-black text-white pt-1">Ambulance: 911</div>
              </div>
            </div>

          </div>

          {/* Bottom Bar: Copyright, Legal & Back to Top */}
          <div className="pt-8 border-t border-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-400">
            <div>
              © 2026 Sehat Saathi. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <a href="#safety" className="hover:text-slate-200 transition-colors">Privacy Policy</a>
              <a href="#safety" className="hover:text-slate-200 transition-colors">Terms of Use</a>
              <a href="#safety" className="hover:text-slate-200 transition-colors">Healthcare Disclaimer</a>
            </div>
          </div>

        </div>
      </footer>

      {/* =========================================================================
          INTERACTIVE DOWNLOAD APP MODAL
          ========================================================================= */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#E8E1D5] animate-scale-up">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#F0EBE1]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#234E35] text-white flex items-center justify-center shadow-md">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1C231A]">
                    Download & Install
                  </h3>
                  <p className="text-xs font-semibold text-[#234E35]">Sehat Saathi PWA Healthcare App</p>
                </div>
              </div>
              <button
                onClick={() => setShowDownloadModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-xs sm:text-sm font-semibold text-[#4A554E] leading-relaxed">
                Sehat Saathi is a Progressive Web App (PWA). You can install it directly onto your home screen without going through an App Store, allowing instant offline voice guidance.
              </p>

              {/* 3 OS Installation Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] text-left space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#1C231A]">
                    <Smartphone className="w-4 h-4 text-[#234E35]" />
                    <span>Android</span>
                  </div>
                  <p className="text-[11px] font-medium text-[#4A554E] leading-tight">
                    Tap menu <strong>(⋮)</strong> and select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] text-left space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#1C231A]">
                    <Share2 className="w-4 h-4 text-[#234E35]" />
                    <span>iPhone / iOS</span>
                  </div>
                  <p className="text-[11px] font-medium text-[#4A554E] leading-tight">
                    Tap Share <strong>(↑)</strong> in Safari and select <strong>"Add to Home Screen"</strong>.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] text-left space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#1C231A]">
                    <Monitor className="w-4 h-4 text-[#234E35]" />
                    <span>PC / Mac</span>
                  </div>
                  <p className="text-[11px] font-medium text-[#4A554E] leading-tight">
                    Click the install icon <strong>(⊕)</strong> in your browser address bar.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => handleTriggerInstall('patient')}
                className="w-full py-3.5 rounded-full bg-[#234E35] hover:bg-[#183825] text-white text-xs sm:text-sm font-black uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download / Install Patient App Now</span>
              </button>

              <button
                onClick={() => handleTriggerInstall('caregiver')}
                className="w-full py-3 rounded-full border-2 border-[#234E35] text-[#234E35] text-xs font-black uppercase tracking-wider hover:bg-[#234E35]/10 transition-colors"
              >
                Download for Doctor & Caregiver Portal
              </button>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          INTERACTIVE FLOATING WIDGETS (All Green)
          ========================================================================= */}

      {/* 1. Floating "Ask a Question" Widget (Bottom-Left in Green) */}
      {showQuestionWidget && (
        <div className="fixed bottom-6 left-6 z-40 bg-white rounded-2xl shadow-2xl border border-[#E8E1D5] p-4 max-w-xs animate-bounce-subtle">
          <div className="flex items-start justify-between gap-2 pb-2">
            <span className="text-xs font-extrabold text-[#1C231A]">
              Have questions? Feel free to ask here!
            </span>
            <button
              onClick={() => setShowQuestionWidget(false)}
              className="text-slate-400 hover:text-slate-600 p-0.5"
              aria-label="Close question helper"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => setShowQuestionModal(true)}
            className="w-full py-2.5 rounded-xl bg-[#234E35] hover:bg-[#183825] text-white text-xs font-black uppercase tracking-wider text-center shadow-md transition-all active:scale-95"
          >
            Ask a Question
          </button>
        </div>
      )}

      {/* 2. Scroll to Top Floating Button (Bottom-Right in Green) */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-[#234E35] hover:bg-[#183825] text-white shadow-xl transition-all transform hover:-translate-y-1 active:scale-90"
          aria-label="Scroll back to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* 3. Interactive "Ask a Question" Modal */}
      {showQuestionModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#E8E1D5] animate-scale-up">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#F0EBE1]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#234E35] text-white flex items-center justify-center">
                  <Mic className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1C231A]">
                  Discharge Q&A Simulator
                </h3>
              </div>
              <button
                onClick={() => { setShowQuestionModal(false); setQueryAnswer(null); }}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5">
              <label className="text-xs font-black text-[#4A554E] uppercase tracking-wider block">
                Choose a sample question or test your query:
              </label>

              {/* Active Query Display */}
              <div className="p-3.5 bg-[#F0EBE1] rounded-xl border border-[#E8E1D5] text-xs sm:text-sm font-bold text-[#1C231A] flex items-center justify-between">
                <span>Active Query: "{sampleQuery}"</span>
                <span className="text-[10px] text-[#234E35] font-black uppercase">Ready</span>
              </div>
              
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => handleSimulateQuestion("Should I take my blood thinner (Aspirin) in the morning or evening?")}
                  className="text-left p-3.5 rounded-xl bg-[#FAF7F2] hover:bg-[#EBF3ED] text-xs sm:text-sm font-bold text-[#1C231A] border border-[#E8E1D5] transition-colors"
                >
                  "Should I take my blood thinner (Aspirin) in the morning or evening?"
                </button>
                <button
                  onClick={() => handleSimulateQuestion("Can I start daily walking after my discharge?")}
                  className="text-left p-3.5 rounded-xl bg-[#FAF7F2] hover:bg-[#EBF3ED] text-xs sm:text-sm font-bold text-[#1C231A] border border-[#E8E1D5] transition-colors"
                >
                  "Can I start daily walking after my discharge?"
                </button>
                <button
                  onClick={() => handleSimulateQuestion("Can I take zinc and calcium supplements without consulting my doctor?")}
                  className="text-left p-3.5 rounded-xl bg-[#FAF7F2] hover:bg-[#EBF3ED] text-xs sm:text-sm font-bold text-[#1C231A] border border-[#E8E1D5] transition-colors"
                >
                  "Can I take zinc and calcium supplements without consulting my doctor?" (Triggers Honest Handoff)
                </button>
              </div>
            </div>

            {/* Answer Display */}
            {queryAnswer && (
              <div className="p-4 rounded-2xl bg-[#EBF3ED] border border-[#C8E4CF] text-xs sm:text-sm font-semibold text-[#1C231A] leading-relaxed">
                {queryAnswer}
              </div>
            )}

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => { setShowQuestionModal(false); setShowDownloadModal(true); }}
                className="w-full py-3.5 rounded-full bg-[#234E35] hover:bg-[#183825] text-white text-xs font-black uppercase tracking-wider shadow-md text-center flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download App to Experience Live Voice</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 4. QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-[#E8E1D5]">
            <div className="flex justify-end">
              <button onClick={() => setShowQRModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="w-16 h-16 rounded-full bg-[#EBF3ED] text-[#234E35] flex items-center justify-center mx-auto">
              <QrCode className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1C231A]">
              Test on Mobile Device
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-[#4A554E] leading-relaxed">
              Open your smartphone camera and scan below or navigate to your local network address:
            </p>
            <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E8E1D5] font-mono text-xs font-bold text-[#234E35]">
              http://192.168.100.6:5173/
            </div>
            <button
              onClick={() => setShowQRModal(false)}
              className="w-full py-3 rounded-full bg-[#234E35] text-white text-xs font-black uppercase tracking-wider"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
