import React, { useState } from 'react';
import { Footprints, Check, X, Plus, Minus, UserCheck } from 'lucide-react';

interface UpdateWalkModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMinutes: number;
  goalMinutes: number;
  onSaveMinutes: (minutes: number) => void;
}

export const UpdateWalkModal: React.FC<UpdateWalkModalProps> = ({
  isOpen,
  onClose,
  currentMinutes,
  goalMinutes,
  onSaveMinutes
}) => {
  const [minutes, setMinutes] = useState(currentMinutes);

  if (!isOpen) return null;

  const quickPresets = [10, 15, 20, 25, 30];

  const handleSave = () => {
    onSaveMinutes(Math.max(0, minutes));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-600 to-emerald-600 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
              <Footprints className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold leading-tight">Update Today's Walk</h2>
              <p className="text-xs text-emerald-100">Caretaker & Patient Activity Log</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 text-center">
          <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-3.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
              Discharge Instruction (Line L6)
            </span>
            <p className="text-xs text-emerald-950 font-semibold mt-0.5">
              "Engage in light 20-minute daily walking as tolerated."
            </p>
          </div>

          {/* Stepper Control */}
          <div className="flex items-center justify-center gap-4 py-2">
            <button
              onClick={() => setMinutes(prev => Math.max(0, prev - 5))}
              className="w-12 h-12 rounded-2xl bg-slate-100 hover:bg-slate-200 active:scale-95 flex items-center justify-center text-slate-700 transition-all"
              aria-label="Decrease 5 minutes"
            >
              <Minus className="w-5 h-5" />
            </button>

            <div className="min-w-[120px]">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-black text-slate-900">{minutes}</span>
                <span className="text-sm font-bold text-slate-500">min</span>
              </div>
              <span className={`text-[11px] font-bold ${minutes >= goalMinutes ? 'text-emerald-600' : 'text-amber-600'}`}>
                {minutes >= goalMinutes ? 'Goal Achieved! 🎉' : `${goalMinutes - minutes} min remaining`}
              </span>
            </div>

            <button
              onClick={() => setMinutes(prev => prev + 5)}
              className="w-12 h-12 rounded-2xl bg-brand-50 hover:bg-brand-100 active:scale-95 flex items-center justify-center text-brand-700 transition-all border border-brand-200/60"
              aria-label="Increase 5 minutes"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Quick presets */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 block mb-2 uppercase tracking-wide">
              Quick Select
            </span>
            <div className="flex items-center justify-center gap-2">
              {quickPresets.map(val => (
                <button
                  key={val}
                  onClick={() => setMinutes(val)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    minutes === val
                      ? 'bg-brand-500 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {val}m
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 pt-1">
            <UserCheck className="w-4 h-4 text-emerald-600" />
            <span>Updated by Caretaker (Sarah)</span>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={onClose}
              className="h-11 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-xs text-slate-700 transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="h-11 rounded-xl bg-brand-500 hover:bg-brand-600 active:scale-95 font-bold text-xs text-white shadow-md shadow-brand-500/25 flex items-center justify-center gap-1.5 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>Save Walk</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
