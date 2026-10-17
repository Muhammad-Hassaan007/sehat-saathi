import React from 'react';
import { 
  User, 
  Stethoscope, 
  Check, 
  X, 
  Building2, 
  Calendar,
  Users
} from 'lucide-react';
import type { UserRole } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: UserRole;
  onSelectRole: (role: UserRole) => void;
  linkedCaregiverName?: string;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  role,
  onSelectRole,
  linkedCaregiverName = "Sarah (Daughter)"
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden">
        {/* Header with Avatar */}
        <div className="bg-gradient-to-r from-brand-600 to-emerald-700 text-white p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative inline-block mx-auto mb-2">
            <img 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&h=160&q=80" 
              alt="Alex Jenkins"
              className="w-20 h-20 rounded-full object-cover ring-4 ring-white/30 shadow-lg mx-auto"
            />
            <span className="absolute bottom-0 right-1 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full"></span>
          </div>

          <h3 className="text-xl font-black text-white">Alex Jenkins</h3>
          <p className="text-xs text-emerald-100 font-medium">Age 72 • Patient ID: #SS-84920</p>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Patient Details Card */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-1.5 font-semibold">
                <Building2 className="w-3.5 h-3.5 text-brand-600" />
                <span>Hospital</span>
              </span>
              <span className="font-bold text-slate-800">City General Hospital</span>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-1.5 font-semibold">
                <Calendar className="w-3.5 h-3.5 text-brand-600" />
                <span>Discharge Date</span>
              </span>
              <span className="font-bold text-slate-800">15 August 2027</span>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-1.5 font-semibold">
                <Users className="w-3.5 h-3.5 text-brand-600" />
                <span>Primary Caregiver</span>
              </span>
              <span className="font-bold text-emerald-700">{linkedCaregiverName}</span>
            </div>
          </div>

          {/* Portal Switcher Section (Requested by user) */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2 px-1">
              Select Active Portal
            </span>

            <div className="space-y-2">
              {/* Option 1: Patient Portal */}
              <button
                onClick={() => {
                  onSelectRole('patient');
                  onClose();
                }}
                className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  role === 'patient'
                    ? 'bg-brand-50/80 border-brand-500 ring-2 ring-brand-500/20 shadow-xs'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    role === 'patient' ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">Patient Portal</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Voice assistant, medicines & discharge summary</p>
                  </div>
                </div>

                {role === 'patient' && (
                  <div className="w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </button>

              {/* Option 2: Doctor / Caregiver Portal */}
              <button
                onClick={() => {
                  onSelectRole('caregiver');
                  onClose();
                }}
                className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  role === 'caregiver'
                    ? 'bg-brand-50/80 border-brand-500 ring-2 ring-brand-500/20 shadow-xs'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    role === 'caregiver' ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">Doctor & Caregiver Hub</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Monitoring alerts, review queue & logs</p>
                  </div>
                </div>

                {role === 'caregiver' && (
                  <div className="w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </button>
            </div>
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
