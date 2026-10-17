import React from 'react';
import { Pill, CheckCircle, Clock } from 'lucide-react';
import type { MedicationReminder } from '../types';

interface ReminderAlertModalProps {
  isOpen: boolean;
  reminder: MedicationReminder | null;
  onAcknowledge: (id: string) => void;
  onSnooze: (id: string) => void;
}

export const ReminderAlertModal: React.FC<ReminderAlertModalProps> = ({
  isOpen,
  reminder,
  onAcknowledge,
  onSnooze
}) => {
  if (!isOpen || !reminder) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border-2 border-emerald-500 overflow-hidden animate-bounce-subtle">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Pill className="w-9 h-9 text-white animate-pulse" />
          </div>
          <span className="text-xs uppercase tracking-widest font-bold text-emerald-100">
            Medication Reminder Due
          </span>
          <h2 className="text-2xl font-black mt-1">
            {reminder.medicine_name} {reminder.dose_text}
          </h2>
        </div>

        {/* Details */}
        <div className="p-6 text-center space-y-4">
          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
            <p className="text-sm font-semibold text-emerald-900">
              Scheduled Time: <strong>{reminder.time}</strong>
            </p>
            <p className="text-xs text-emerald-700 mt-1">
              Instructions: {reminder.timing_text}
            </p>
          </div>

          <p className="text-xs text-slate-500 font-medium">
            Acknowledging this records today's adherence for your family caregiver dashboard.
          </p>

          {/* Action Buttons (UX-30: min 56px height) */}
          <div className="space-y-2.5 pt-2">
            <button
              onClick={() => onAcknowledge(reminder.id)}
              className="w-full h-15 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all"
            >
              <CheckCircle className="w-6 h-6" />
              <span>I have taken my medicine</span>
            </button>

            <button
              onClick={() => onSnooze(reminder.id)}
              className="w-full h-13 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all"
            >
              <Clock className="w-4 h-4 text-slate-500" />
              <span>Snooze (15 minutes)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
