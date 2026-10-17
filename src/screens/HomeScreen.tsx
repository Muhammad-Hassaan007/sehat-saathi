import React from 'react';
import { 
  Search, 
  Mic, 
  Droplet, 
  Sparkles, 
  FileText, 
  ScanLine, 
  Stethoscope, 
  CheckCircle, 
  Pill,
  Heart,
  Footprints,
  Edit3
} from 'lucide-react';
import type { MedicationReminder, RecoveryData } from '../types';

interface HomeScreenProps {
  recovery: RecoveryData;
  reminders: MedicationReminder[];
  onStartVoice: () => void;
  isListening: boolean;
  onNavigateTab: (tab: 'overview' | 'assistant' | 'records') => void;
  onAcknowledgeReminder: (id: string) => void;
  onOpenDueReminder: (reminder: MedicationReminder) => void;
  onOpenUpdateWalk: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  recovery,
  reminders,
  onStartVoice,
  isListening,
  onNavigateTab,
  onAcknowledgeReminder,
  onOpenDueReminder,
  onOpenUpdateWalk
}) => {
  const pendingReminder = reminders.find(r => !r.taken);
  const takenCount = reminders.filter(r => r.taken).length;
  const isWalkGoalMet = recovery.walkingMinutes.current >= recovery.walkingMinutes.goal;

  return (
    <div className="space-y-5 pb-24 animate-fadeIn">
      {/* Greeting Headline */}
      <div className="pt-1 px-1">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
          How are you feeling right now today?
        </h2>
      </div>

      {/* Single Clean Search & Voice Input Bar (Exact match to demo picture) */}
      <div 
        onClick={() => onNavigateTab('assistant')}
        className="cursor-pointer bg-white rounded-2xl p-2 pl-4 pr-2 shadow-sm border border-emerald-100/90 flex items-center justify-between transition-all hover:border-emerald-300 group"
      >
        <div className="flex items-center gap-3 text-slate-400 group-hover:text-slate-600">
          <Search className="w-5 h-5 text-emerald-600" />
          <span className="text-sm font-medium text-slate-500">Ask anything about your health</span>
        </div>

        {/* Single primary voice trigger button on home screen */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onStartVoice();
          }}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
            isListening 
              ? 'bg-red-500 text-white animate-pulse' 
              : 'bg-brand-500 hover:bg-brand-600 text-white shadow-xs'
          }`}
          aria-label="Tap to speak"
          title="Tap to speak"
        >
          <Mic className="w-5 h-5" />
        </button>
      </div>

      {/* Daily Health Score Card (Matches Demo Screen 1) */}
      <div className="bg-white rounded-3xl p-5 shadow-card border border-emerald-100/70 flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <span>Daily Health Score</span>
            <span className="w-4 h-4 rounded-full bg-slate-100 text-[10px] flex items-center justify-center text-slate-400">ℹ</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-slate-900">{recovery.healthScore}</span>
            <span className="text-base font-semibold text-slate-400">/100</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Good Condition</span>
          </div>
        </div>

        {/* Circular Progress Gauge */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          <svg className="w-20 h-20 transform -rotate-90">
            <circle
              cx="40"
              cy="40"
              r="32"
              stroke="#E2F2E5"
              strokeWidth="7"
              fill="transparent"
            />
            <circle
              cx="40"
              cy="40"
              r="32"
              stroke="#489D54"
              strokeWidth="7"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 32}`}
              strokeDashoffset={`${2 * Math.PI * 32 * (1 - recovery.healthScore / 100)}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-brand-600">
            <Heart className="w-6 h-6 fill-brand-500 text-brand-500" />
          </div>
        </div>
      </div>

      {/* Quick Action Grid (4 Green Pastel Cards - Matches Demo Screen 1) */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-sm font-bold text-slate-800">Quick Action</h3>
          <button 
            onClick={() => onNavigateTab('overview')}
            className="text-xs font-semibold text-brand-600 hover:text-brand-700"
          >
            See All
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2.5">
          {/* Action 1: Symptom Checker */}
          <button 
            onClick={() => onNavigateTab('assistant')}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-brand-50/80 hover:bg-brand-100 border border-brand-200/50 transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-100 group-hover:bg-brand-200 text-brand-700 flex items-center justify-center mb-1.5 transition-colors">
              <Stethoscope className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-700 leading-tight">Symptom Checker</span>
          </button>

          {/* Action 2: AI Chat */}
          <button 
            onClick={() => onNavigateTab('assistant')}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-brand-50/80 hover:bg-brand-100 border border-brand-200/50 transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-100 group-hover:bg-brand-200 text-brand-700 flex items-center justify-center mb-1.5 transition-colors">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-700 leading-tight">AI Chat</span>
          </button>

          {/* Action 3: Scan & Analyze */}
          <button 
            onClick={() => onNavigateTab('records')}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-brand-50/80 hover:bg-brand-100 border border-brand-200/50 transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-100 group-hover:bg-brand-200 text-brand-700 flex items-center justify-center mb-1.5 transition-colors">
              <ScanLine className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-700 leading-tight">Scan & Analyze</span>
          </button>

          {/* Action 4: Health Record */}
          <button 
            onClick={() => onNavigateTab('records')}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-brand-50/80 hover:bg-brand-100 border border-brand-200/50 transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-100 group-hover:bg-brand-200 text-brand-700 flex items-center justify-center mb-1.5 transition-colors">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-700 leading-tight">Health Record</span>
          </button>
        </div>
      </div>

      {/* Today's Recovery Summary: Replaced Sleep with Caretaker-Updateable Walk! */}
      <div>
        <div className="flex items-center justify-between mb-2.5 px-1">
          <h3 className="text-sm font-bold text-slate-800">Today's Summary</h3>
          <button 
            onClick={() => onNavigateTab('overview')}
            className="text-xs font-semibold text-brand-600 hover:text-brand-700"
          >
            See All
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {/* Metric 1: Medication Adherence */}
          <div className="bg-white rounded-2xl p-3.5 border border-emerald-100 shadow-xs flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
              <Pill className="w-3.5 h-3.5 text-emerald-600" />
              <span>Medicines</span>
            </div>
            <div className="mt-2">
              <span className="text-xl font-black text-slate-900">{takenCount}/{reminders.length}</span>
              <span className="text-[11px] text-emerald-600 font-bold ml-1">Taken</span>
            </div>
          </div>

          {/* Metric 2: Walking Target (Replaced Sleep - Caretaker / Patient Updateable) */}
          <div 
            onClick={onOpenUpdateWalk}
            className="cursor-pointer bg-white hover:bg-brand-50/40 rounded-2xl p-3.5 border border-emerald-100 shadow-xs flex flex-col justify-between transition-all group hover:border-brand-300"
            title="Tap to update walking minutes"
          >
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
              <div className="flex items-center gap-1.5">
                <Footprints className="w-3.5 h-3.5 text-emerald-600 group-hover:scale-110 transition-transform" />
                <span>Walk</span>
              </div>
              <span className="text-[9px] text-brand-700 bg-brand-50 group-hover:bg-brand-100 px-1 py-0.5 rounded-sm font-bold flex items-center gap-0.5">
                <Edit3 className="w-2.5 h-2.5" />
                <span>Log</span>
              </span>
            </div>
            <div className="mt-2">
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-slate-900">{recovery.walkingMinutes.current}</span>
                <span className="text-xs text-slate-400">/{recovery.walkingMinutes.goal}m</span>
              </div>
              <span className={`text-[10px] font-bold block ${isWalkGoalMet ? 'text-emerald-600' : 'text-amber-600'}`}>
                {isWalkGoalMet ? 'Goal Done' : `${recovery.walkingMinutes.goal - recovery.walkingMinutes.current}m left`}
              </span>
            </div>
          </div>

          {/* Metric 3: Water Intake */}
          <div className="bg-white rounded-2xl p-3.5 border border-emerald-100 shadow-xs flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
              <Droplet className="w-3.5 h-3.5 text-sky-500" />
              <span>Water</span>
            </div>
            <div className="mt-2">
              <span className="text-xl font-black text-slate-900">{recovery.waterIntake.current}</span>
              <span className="text-xs text-slate-400 ml-1">{recovery.waterIntake.unit}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Medication Reminder Active Pill Banner */}
      {pendingReminder && (
        <div 
          onClick={() => onOpenDueReminder(pendingReminder)}
          className="cursor-pointer bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-4 shadow-md flex items-center justify-between transition-transform hover:scale-[1.01]"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Pill className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">
                Reminder Due ({pendingReminder.time})
              </span>
              <h4 className="text-sm font-bold leading-tight">
                {pendingReminder.medicine_name} {pendingReminder.dose_text}
              </h4>
              <p className="text-xs text-emerald-100">{pendingReminder.timing_text}</p>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAcknowledgeReminder(pendingReminder.id);
            }}
            className="px-3 py-1.5 bg-white text-emerald-800 text-xs font-bold rounded-xl hover:bg-emerald-50 shadow-xs flex items-center gap-1 shrink-0"
          >
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Taken</span>
          </button>
        </div>
      )}
    </div>
  );
};
