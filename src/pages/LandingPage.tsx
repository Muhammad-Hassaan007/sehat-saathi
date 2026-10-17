import React, { useState } from 'react';
import { 
  Heart, 
  PhoneCall, 
  Calendar, 
  Sparkles, 
  Mic, 
  Pill, 
  Footprints, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Award, 
  Star, 
  ChevronRight, 
  ShieldAlert,
  Menu,
  X
} from 'lucide-react';

interface LandingPageProps {
  onLaunchApp: (role?: 'patient' | 'caregiver') => void;
  onOpenConsultation?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLaunchApp,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingDept, setBookingDept] = useState("Cardiology Recovery");
  const [bookingDate, setBookingDate] = useState("2027-08-25");
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const programs = [
    {
      icon: <Heart className="w-6 h-6 text-rose-500" />,
      title: "Cardiovascular & Post-Discharge Care",
      desc: "Comprehensive rehabilitation plans for hypertension, post-infarction care, and cardiology follow-up.",
      badge: "Clinical Care"
    },
    {
      icon: <Footprints className="w-6 h-6 text-emerald-600" />,
      title: "Mobility & Daily Walk Rehabilitation",
      desc: "Structured daily walking regimens with caregiver logging and physician-prescribed movement limits.",
      badge: "Physical Rehab"
    },
    {
      icon: <Mic className="w-6 h-6 text-brand-600" />,
      title: "Voice-First Discharge Instruction AI",
      desc: "100% grounded in hospital discharge paperwork with instant audio echo-back and sentence highlighting.",
      badge: "AI Powered"
    },
    {
      icon: <Pill className="w-6 h-6 text-amber-500" />,
      title: "Medication Adherence & Prescriptions",
      desc: "Caregiver remote prescription syncing with automated audio reminders and adherence tracking.",
      badge: "Pharmacy Sync"
    },
    {
      icon: <Users className="w-6 h-6 text-teal-600" />,
      title: "Patient-Controlled Family Pairing",
      desc: "Secure 8-digit single-use pairing keys granting family caregivers transparent, revocable dashboard access.",
      badge: "Caregiver Hub"
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-red-500" />,
      title: "Deterministic Emergency Escalation",
      desc: "Automatic detection of acute symptoms (chest pain, stroke) with 1-tap 911 dialing and caregiver alerts.",
      badge: "24/7 Safety"
    }
  ];

  const doctors = [
    {
      name: "Dr. Sarah Khan, MD",
      specialty: "Chief of Cardiology & Post-Discharge Care",
      hospital: "Central Heart Institute",
      experience: "16+ Years Experience",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&h=300&q=80",
      rating: "4.95 (142 reviews)"
    },
    {
      name: "Dr. Tariq Mahmood, PT",
      specialty: "Senior Rehabilitation & Mobility Specialist",
      hospital: "Metropolitan Rehab Center",
      experience: "12+ Years Experience",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&h=300&q=80",
      rating: "4.92 (98 reviews)"
    },
    {
      name: "Dr. Elena Vance, MD",
      specialty: "Geriatric Medicine & Chronic Recovery",
      hospital: "St. Jude Senior Health",
      experience: "14+ Years Experience",
      image: "https://images.unsplash.com/photo-1594824813511-28564e9a0378?auto=format&fit=crop&w=300&h=300&q=80",
      rating: "4.98 (210 reviews)"
    }
  ];

  const faqs = [
    {
      q: "How does the Voice Assistant verify discharge instructions?",
      a: "Every answer is strictly grounded in the patient's verified hospital discharge summary lines (L1 to L9). If an instruction is not explicitly written in the medical summary, the AI performs an honest handoff to clinicians rather than guessing."
    },
    {
      q: "Can caregivers update medication and walking logs remotely?",
      a: "Yes! Family caregivers link securely using a 1-time patient-generated 8-character pairing code. Once linked, caregivers can view adherence, record walking exercise, and add new prescriptions remotely."
    },
    {
      q: "Does this require special biometric hardware or external sensors?",
      a: "No special external hardware is needed. Sehat Saathi focuses on actionable discharge recovery goals, manual home cuff logs, and voice interaction accessible on any standard smartphone browser."
    },
    {
      q: "What happens if a patient mentions acute chest pain or emergency symptoms?",
      a: "The system immediately triggers the high-contrast Emergency view, provides one-tap 911 dialing, and automatically dispatches an emergency notification to all linked family caregivers."
    }
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
    setTimeout(() => setBookingSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] text-slate-800 font-sans selection:bg-brand-200">
      {/* 1. Top Clinical Notification Bar */}
      <div className="bg-[#102A24] text-emerald-200 text-xs py-2 px-4 border-b border-emerald-900/50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Accredited Post-Discharge Healthcare & Recovery Network</span>
            <span className="hidden md:inline text-emerald-700">|</span>
            <span className="hidden md:inline">24/7 Clinical Support</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-semibold text-emerald-100">
            <a href="tel:911" className="text-red-300 hover:text-red-200 font-bold flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-red-400" />
              <span>Emergency Hotline: 911</span>
            </a>
            <span className="text-emerald-700">|</span>
            <button 
              onClick={() => onLaunchApp('caregiver')}
              className="text-emerald-300 hover:text-white underline transition-colors"
            >
              Doctor & Caregiver Hub
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100/80 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 to-emerald-500 text-white flex items-center justify-center shadow-md shadow-brand-500/20">
              <Heart className="w-6 h-6 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black text-slate-900 tracking-tight">Sehat Saathi</span>
                <span className="px-1.5 py-0.5 rounded-sm bg-brand-100 text-brand-800 text-[10px] font-extrabold uppercase">
                  Clinic
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Rehabilitation & Recovery Portal</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-600">
            <a href="#programs" className="hover:text-brand-600 transition-colors">Recovery Programs</a>
            <a href="#specialists" className="hover:text-brand-600 transition-colors">Our Specialists</a>
            <a href="#how-it-works" className="hover:text-brand-600 transition-colors">How It Works</a>
            <a href="#booking" className="hover:text-brand-600 transition-colors">Consultations</a>
            <a href="#faq" className="hover:text-brand-600 transition-colors">FAQ</a>
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={() => onLaunchApp('caregiver')}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Doctor Hub
            </button>

            <button
              onClick={() => onLaunchApp('patient')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-emerald-600 hover:from-brand-600 hover:to-emerald-700 text-white text-xs font-black shadow-md shadow-brand-500/25 flex items-center gap-1.5 transition-all transform active:scale-95"
            >
              <span>Launch Patient App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-emerald-100 p-4 space-y-3 shadow-lg">
            <a href="#programs" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-bold text-slate-700 py-1">Recovery Programs</a>
            <a href="#specialists" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-bold text-slate-700 py-1">Our Specialists</a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-bold text-slate-700 py-1">How It Works</a>
            <a href="#booking" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-bold text-slate-700 py-1">Book Consultation</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-bold text-slate-700 py-1">FAQ</a>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLaunchApp('patient');
                }}
                className="w-full py-3 bg-brand-500 text-white rounded-xl font-bold text-sm text-center"
              >
                Launch Patient App
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLaunchApp('caregiver');
                }}
                className="w-full py-3 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm text-center"
              >
                Open Doctor & Caregiver Hub
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 3. Hero Section (Rehab Clinic Aesthetic) */}
      <section className="relative pt-12 pb-20 overflow-hidden bg-gradient-to-b from-white via-emerald-50/30 to-[#F8FAF8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-bold shadow-xs">
                <Award className="w-4 h-4 text-brand-600" />
                <span>Specialized Post-Discharge & Rehabilitation Center</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
                Compassionate Recovery, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-emerald-600 to-teal-700">
                  Grounded in Medical Truth.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                Helping elderly patients safely transition from hospital to home with 1-tap voice discharge instructions, caregiver coordination, and verified recovery tracking.
              </p>

              {/* Primary Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => onLaunchApp('patient')}
                  className="w-full sm:w-auto px-7 py-4 bg-gradient-to-r from-brand-500 to-emerald-600 hover:from-brand-600 hover:to-emerald-700 text-white rounded-2xl font-black text-sm shadow-xl shadow-brand-500/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Launch Patient Companion App</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#booking"
                  className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 rounded-2xl font-bold text-sm shadow-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Calendar className="w-4 h-4 text-brand-600" />
                  <span>Book Clinic Consultation</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-emerald-100 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-semibold">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>100% Discharge Grounded</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Single-Tap Voice AI</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Caregiver Synchronized</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Phone Preview Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[340px]">
                {/* Decorative background glow */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-brand-300/40 to-teal-200/30 rounded-[50px] blur-2xl"></div>

                {/* Simulated Phone Frame */}
                <div className="relative bg-white rounded-[40px] p-3 shadow-2xl border-[6px] border-slate-900/90 overflow-hidden">
                  {/* Phone Notch */}
                  <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto mb-2"></div>

                  {/* App Preview Card Inside */}
                  <div className="bg-[#EBF3ED] rounded-[28px] p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img 
                          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&h=80&q=80" 
                          alt="Alex" 
                          className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-500"
                        />
                        <div>
                          <span className="text-[10px] text-slate-500 font-bold block">Patient View</span>
                          <span className="text-xs font-black text-slate-900">Alex Jenkins (72)</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 bg-red-600 text-white text-[9px] font-black rounded-md">
                        Emergency
                      </span>
                    </div>

                    {/* Search bar with mic */}
                    <div className="bg-white rounded-xl p-2 px-3 border border-emerald-100 flex items-center justify-between shadow-xs">
                      <span className="text-[11px] text-slate-400 font-medium">When should I take Metformin?</span>
                      <div className="w-6 h-6 rounded-lg bg-brand-500 text-white flex items-center justify-center">
                        <Mic className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Grounded AI Answer card */}
                    <div className="bg-white rounded-2xl p-3 border border-emerald-200 shadow-sm space-y-1.5">
                      <div className="flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Certain • Verified in Discharge Line L2</span>
                      </div>
                      <p className="text-xs text-slate-800 font-semibold leading-relaxed">
                        "Take Metformin 500mg twice daily: once after breakfast and once after dinner."
                      </p>
                    </div>

                    {/* Recovery summary pills */}
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                        <span className="text-[9px] text-slate-400 font-bold block">Daily Walk (L6)</span>
                        <span className="text-sm font-black text-slate-900">20 / 20 min</span>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                        <span className="text-[9px] text-slate-400 font-bold block">Medications</span>
                        <span className="text-sm font-black text-emerald-600">3/3 Taken</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onLaunchApp('patient')}
                      className="w-full py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                    >
                      Open Full Live App
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Instant Consultation Booking Bar (Inspired by CMSMasters Rehab Clinic) */}
      <section id="booking" className="max-w-5xl mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-100">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                Clinic Consultation & Scheduling
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                Schedule Follow-up with Rehab Specialists
              </h3>
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
              Immediate Slot Confirmation
            </span>
          </div>

          {bookingSubmitted ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center text-sm font-bold text-emerald-900 animate-fadeIn">
              ✓ Consultation slot reserved with Dr. Sarah Khan for {bookingDate}. A confirmation has been synced to the patient's schedule.
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Department</label>
                <select 
                  value={bookingDept}
                  onChange={(e) => setBookingDept(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-brand-500"
                >
                  <option>Cardiology Recovery</option>
                  <option>Mobility & Physical Rehab</option>
                  <option>Geriatric Chronic Care</option>
                  <option>Post-Discharge Medication Review</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Specialist</label>
                <select className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-brand-500">
                  <option>Dr. Sarah Khan, MD (Cardiologist)</option>
                  <option>Dr. Tariq Mahmood, PT (Rehab)</option>
                  <option>Dr. Elena Vance, MD (Geriatrics)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Preferred Date</label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full h-10 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-black shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Confirm Slot</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 5. Rehabilitation & Recovery Programs Grid */}
      <section id="programs" className="py-20 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200/60">
            Clinical Programs
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Specialized Care Designed Around The Patient
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Bridging hospital discharge instructions with daily home recovery routines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((prog, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-emerald-100/90 shadow-card hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 group-hover:bg-brand-50 flex items-center justify-center transition-colors">
                    {prog.icon}
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wide text-brand-800 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-100">
                    {prog.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-700 transition-colors">
                  {prog.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                  {prog.desc}
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-600">
                <span>View Program Details</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Clinical Specialists / Doctors Section */}
      <section id="specialists" className="py-20 bg-white border-y border-emerald-100/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-brand-700">
                Our Medical Board
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
                Supervised by Board-Certified Clinicians
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md font-medium">
              Every discharge instruction is reviewed and verified by practicing cardiologists, rehabilitation therapists, and geriatricians.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {doctors.map((doc, idx) => (
              <div
                key={idx}
                className="bg-[#F8FAF8] rounded-3xl p-5 border border-emerald-100 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-slate-200">
                    <img 
                      src={doc.image} 
                      alt={doc.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-black text-slate-800 flex items-center gap-1 shadow-xs">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span>{doc.rating}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-black text-slate-900 leading-tight">
                      {doc.name}
                    </h3>
                    <p className="text-xs font-bold text-brand-700 mt-1">
                      {doc.specialty}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {doc.hospital} • {doc.experience}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between">
                  <a
                    href="#booking"
                    className="w-full py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 text-center transition-colors"
                  >
                    Schedule Consultation
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. How Sehat Saathi Works (3 Steps) */}
      <section id="how-it-works" className="py-20 max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <span className="text-xs font-black uppercase tracking-widest text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200/60">
          Workflow
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3 mb-14">
          How Post-Discharge Care Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-card text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto text-xl font-black">
              1
            </div>
            <h3 className="text-base font-bold text-slate-900">Hospital Discharge Indexed</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Medical instructions, prescribed medications, and mobility limits are assigned unique line numbers (L1-L9) for 100% grounding.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-card text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto text-xl font-black">
              2
            </div>
            <h3 className="text-base font-bold text-slate-900">One-Tap Voice Assistant</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              The patient presses the microphone button and asks any question in everyday words to hear calm, slow-spoken verified answers.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-card text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto text-xl font-black">
              3
            </div>
            <h3 className="text-base font-bold text-slate-900">Family & Clinician Synced</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Family members link via single-use keys to monitor medication adherence, review doctor questions, and log daily walking.
            </p>
          </div>
        </div>
      </section>

      {/* 8. FAQ Accordion Section */}
      <section id="faq" className="py-20 bg-emerald-50/40 border-t border-emerald-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-brand-700">
              Common Questions
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-xs space-y-2">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-800 text-xs flex items-center justify-center font-bold">?</span>
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-7 font-medium">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Final Call to Action Banner */}
      <section className="py-16 bg-gradient-to-r from-[#102A24] via-brand-900 to-[#102A24] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-extrabold uppercase rounded-full border border-emerald-400/30">
            Open Access PWA
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight max-w-xl mx-auto">
            Ready to Begin Safe Home Recovery?
          </h2>
          <p className="text-sm text-emerald-100 max-w-lg mx-auto font-medium">
            Launch the standalone mobile application now to test the patient voice companion or log in as a caregiver.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onLaunchApp('patient')}
              className="w-full sm:w-auto px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-brand-500/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <span>Launch Patient Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onLaunchApp('caregiver')}
              className="w-full sm:w-auto px-7 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold text-sm border border-white/20 transition-colors"
            >
              <span>Open Doctor & Caregiver Hub</span>
            </button>
          </div>
        </div>
      </section>

      {/* 10. Footer */}
      <footer className="bg-[#0C1D19] text-slate-400 text-xs py-12 border-t border-emerald-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-black text-base">
              <Heart className="w-5 h-5 text-brand-500 fill-brand-500" />
              <span>Sehat Saathi Clinic</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Post-discharge patient recovery companion and caregiver coordination platform.
            </p>
          </div>

          <div>
            <h5 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">Quick Access</h5>
            <ul className="space-y-2">
              <li><button onClick={() => onLaunchApp('patient')} className="hover:text-white transition-colors">Patient Portal</button></li>
              <li><button onClick={() => onLaunchApp('caregiver')} className="hover:text-white transition-colors">Caregiver Hub</button></li>
              <li><a href="#booking" className="hover:text-white transition-colors">Book Consultation</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors">Clinical Programs</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">Clinical Departments</h5>
            <ul className="space-y-2">
              <li>Cardiology Follow-Up</li>
              <li>Mobility & Walking Therapy</li>
              <li>Pharmacy & Adherence Review</li>
              <li>Geriatric Care</li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">Emergency Line</h5>
            <p className="text-slate-300 font-bold mb-1">National Emergency: 911</p>
            <p className="text-slate-400 text-[11px] mb-2">Clinic Desk: +1 (800) 456-SEHAT</p>
            <p className="text-slate-500 text-[10px]">
              Disclaimer: This app assists with hospital discharge instructions. In acute emergencies, always call 911 immediately.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 border-t border-emerald-900/60 text-center text-slate-500 text-[11px]">
          © 2027 Sehat Saathi Rehabilitation & Healthcare Clinic. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
