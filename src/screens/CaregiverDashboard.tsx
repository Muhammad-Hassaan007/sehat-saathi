import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  HelpCircle, 
  Calendar, 
  Pill, 
  Send, 
  Check,
  Footprints,
  Plus,
  CheckCircle2
} from 'lucide-react';
import type { EmergencyAlert, ReviewQueueItem, MedicationReminder, Appointment } from '../types';

interface CaregiverDashboardProps {
  alerts: EmergencyAlert[];
  reviewQueue: ReviewQueueItem[];
  reminders: MedicationReminder[];
  appointments: Appointment[];
  walkingMinutes: { current: number; goal: number };
  onUpdateWalk: (minutes: number) => void;
  onMarkAlertHandled: (id: string) => void;
  onSubmitReviewNote: (id: string, note: string) => void;
}

export const CaregiverDashboard: React.FC<CaregiverDashboardProps> = ({
  alerts,
  reviewQueue,
  reminders,
  appointments,
  walkingMinutes,
  onUpdateWalk,
  onMarkAlertHandled,
  onSubmitReviewNote
}) => {
  const [notesState, setNotesState] = useState<Record<string, string>>({});

  const takenCount = reminders.filter(r => r.taken).length;
  const activeAlerts = alerts.filter(a => !a.handled);

  const handleNoteChange = (id: string, val: string) => {
    setNotesState(prev => ({ ...prev, [id]: val }));
  };

  const handleNoteSubmit = (id: string) => {
    const note = notesState[id];
    if (!note || !note.trim()) return;
    onSubmitReviewNote(id, note.trim());
    setNotesState(prev => ({ ...prev, [id]: "" }));
  };

  return (
    <div className="space-y-5 pb-24 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-brand-700 to-emerald-800 text-white rounded-3xl p-5 shadow-soft">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-white/20">
              <ShieldCheck className="w-5 h-5 text-white" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
              Caregiver & Clinician Dashboard (UX-35)
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 text-xs font-bold border border-emerald-400/30">
            Live Link Active
          </span>
        </div>

        <h2 className="text-2xl font-black">Alex Jenkins (72)</h2>
        <p className="text-xs text-emerald-100 mt-0.5 font-medium">
          Monitoring: Blood Pressure Stabilization & Diabetes Discharge
        </p>

        {/* Status Metrics Bar */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-emerald-600/60 text-center">
          <div>
            <span className="text-[10px] text-emerald-200 font-bold block uppercase">Red-Flag Alerts</span>
            <span className={`text-lg font-black ${activeAlerts.length > 0 ? 'text-red-300 animate-pulse' : 'text-white'}`}>
              {activeAlerts.length}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-emerald-200 font-bold block uppercase">Review Queue</span>
            <span className="text-lg font-black text-white">
              {reviewQueue.filter(r => r.status === 'pending').length}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-emerald-200 font-bold block uppercase">Doses Taken</span>
            <span className="text-lg font-black text-emerald-300">
              {takenCount} / {reminders.length}
            </span>
          </div>
        </div>
      </div>

      {/* Caregiver Daily Walking Update Card */}
      <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-card space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <Footprints className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Patient Daily Walking (Discharge L6)</h3>
              <p className="text-[11px] text-slate-400">Target: 20 minutes daily light walking</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xl font-black text-slate-900">{walkingMinutes.current}</span>
            <span className="text-xs text-slate-400 font-bold"> / {walkingMinutes.goal} min</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div 
            className="bg-brand-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, (walkingMinutes.current / walkingMinutes.goal) * 100)}%` }}
          ></div>
        </div>

        {/* Quick Update Buttons for Caretaker */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs font-semibold text-slate-500">Caretaker Quick Log:</span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onUpdateWalk(walkingMinutes.current + 5)}
              className="px-2.5 py-1 bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-bold rounded-lg flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> 5m
            </button>
            <button
              onClick={() => onUpdateWalk(walkingMinutes.current + 10)}
              className="px-2.5 py-1 bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-bold rounded-lg flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> 10m
            </button>
            <button
              onClick={() => onUpdateWalk(20)}
              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg flex items-center gap-1 shadow-xs"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> 20m Goal
            </button>
          </div>
        </div>
      </div>

      {/* Section 2: High-Priority Emergency Alerts (UX-36) */}
      {alerts.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 text-red-600">
              <AlertTriangle className="w-4 h-4" />
              <span>Emergency Red-Flag Alerts ({activeAlerts.length} Active)</span>
            </h3>
          </div>

          <div className="space-y-2">
            {alerts.map(alert => (
              <div 
                key={alert.id}
                className={`p-4 rounded-2xl border transition-all ${
                  alert.handled 
                    ? 'bg-slate-50 border-slate-200 opacity-60' 
                    : 'bg-red-50 border-red-300 shadow-md shadow-red-500/10'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider">
                      HIGH PRIORITY
                    </span>
                    <span className="text-xs text-slate-500 font-semibold ml-2">
                      {alert.timestamp}
                    </span>
                    <p className="text-sm font-black text-red-950 mt-2">
                      Patient said: "{alert.transcript_excerpt}"
                    </p>
                    <p className="text-xs text-red-800 font-medium mt-1">
                      Action Taken: {alert.action_taken}
                    </p>
                  </div>

                  {!alert.handled ? (
                    <button
                      onClick={() => onMarkAlertHandled(alert.id)}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shrink-0 shadow-xs"
                    >
                      Mark Handled
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <Check className="w-4 h-4" /> Handled
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section 3: Clinician Review Queue (UX-37) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-amber-500" />
            <span>Clinician Review Queue ({reviewQueue.length})</span>
          </h3>
          <span className="text-xs text-slate-400">Unanswered Questions</span>
        </div>

        <div className="space-y-2.5">
          {reviewQueue.map(item => (
            <div 
              key={item.id}
              className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-card space-y-3"
            >
              <div>
                <span className="text-[10px] font-bold uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  Patient Question
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-1">
                  "{item.question}"
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Reason: {item.reason}
                </p>
              </div>

              {item.clinician_note ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase block">Doctor's Instruction</span>
                  <p className="text-xs font-semibold text-emerald-950 mt-0.5">{item.clinician_note}</p>
                </div>
              ) : (
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={notesState[item.id] || ""}
                    onChange={(e) => handleNoteChange(item.id, e.target.value)}
                    placeholder="Type doctor's instructions for patient..."
                    className="flex-1 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium focus:outline-hidden focus:ring-1 focus:ring-brand-500"
                  />
                  <button
                    onClick={() => handleNoteSubmit(item.id)}
                    className="px-3 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold flex items-center gap-1"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: Today's Medication Adherence (UX-30) */}
      <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-card space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
            <Pill className="w-4 h-4 text-brand-600" />
            <span>Medication Adherence Today</span>
          </h3>
          <span className="text-xs font-bold text-emerald-700">
            {reminders.length > 0 ? Math.round((takenCount / reminders.length) * 100) : 100}% Adherent
          </span>
        </div>

        <div className="space-y-2">
          {reminders.map(rem => (
            <div 
              key={rem.id}
              className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between"
            >
              <div>
                <h4 className="text-xs font-bold text-slate-800">
                  {rem.medicine_name} {rem.dose_text}
                </h4>
                <p className="text-[11px] text-slate-500">{rem.time} • {rem.timing_text}</p>
              </div>

              <div>
                {rem.taken ? (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Taken
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" /> Pending
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 5: Upcoming Appointments */}
      <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-card">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5 mb-3">
          <Calendar className="w-4 h-4 text-brand-600" />
          <span>Scheduled Appointments</span>
        </h3>

        {appointments.map(apt => (
          <div key={apt.id} className="p-3.5 bg-emerald-50/70 border border-emerald-200/70 rounded-2xl flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-900">{apt.doctor_name}</h4>
              <p className="text-xs text-emerald-800 font-medium">{apt.specialty}</p>
              <p className="text-[11px] text-slate-500 mt-1">{apt.date} at {apt.time}</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-brand-500 text-white text-xs font-bold">
              Confirmed
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
