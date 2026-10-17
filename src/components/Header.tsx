import React from 'react';
import { 
  Users, 
  Sun, 
  Moon, 
  ShieldAlert,
  Repeat
} from 'lucide-react';
import type { UserRole } from '../types';

interface HeaderProps {
  role: UserRole;
  onOpenProfile: () => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
  onOpenEmergency: () => void;
  onOpenFamily: () => void;
  linkedCaregiversCount: number;
  openAlertsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  role,
  onOpenProfile,
  highContrast,
  onToggleHighContrast,
  onOpenEmergency,
  onOpenFamily,
  linkedCaregiversCount,
  openAlertsCount
}) => {
  return (
    <header className="px-4 py-3 bg-white/95 backdrop-blur-md sticky top-0 z-30 border-b border-emerald-100 flex items-center justify-between shadow-xs">
      {/* Left: User Avatar (Tappable to open profile & switch portal) */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenProfile}
          title="Tap photo to view profile and switch portals"
          className="relative group focus:outline-hidden"
          aria-label="User Profile and Portal Switcher"
        >
          <img 
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80" 
            alt="Alex Profile"
            className="w-11 h-11 rounded-full object-cover ring-2 ring-brand-500/40 group-hover:ring-brand-500 transition-all shadow-xs"
          />
          {/* Subtle Portal Switch Badge directly on Avatar */}
          <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-brand-600 group-hover:bg-brand-700 text-white rounded-full flex items-center justify-center border-2 border-white shadow-xs transition-transform group-hover:scale-110">
            <Repeat className="w-2.5 h-2.5" />
          </span>
        </button>

        <div>
          <span className="text-[11px] font-bold text-brand-700 tracking-wide uppercase block">
            {role === 'patient' ? 'Patient Portal' : 'Doctor / Caregiver Hub'}
          </span>
          <h1 className="text-base font-bold text-slate-800 leading-tight">
            {role === 'patient' ? 'Alex Jenkins (72)' : 'Dr. Sarah (Clinician)'}
          </h1>
        </div>
      </div>

      {/* Right: Accessibility Controls & Emergency Button */}
      <div className="flex items-center gap-1.5">
        {/* High Contrast Mode Toggle */}
        <button
          onClick={onToggleHighContrast}
          title="Toggle High Contrast Mode"
          aria-label="High contrast mode"
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
            highContrast ? 'bg-black text-yellow-300 ring-2 ring-yellow-400' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          {highContrast ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Family Pairing Control */}
        <button
          onClick={onOpenFamily}
          title="Manage Linked Family & Pairing"
          aria-label="Family and caregiver pairing"
          className="relative w-9 h-9 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 flex items-center justify-center transition-colors border border-brand-200/60"
        >
          <Users className="w-4 h-4" />
          {linkedCaregiversCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
              {linkedCaregiversCount}
            </span>
          )}
        </button>

        {/* Clean Emergency Button */}
        <button
          onClick={onOpenEmergency}
          title="Emergency Contacts & Dialing"
          aria-label="Emergency"
          className="relative h-9 px-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1 shadow-md shadow-red-500/20 active:scale-95 transition-all"
        >
          <ShieldAlert className="w-4 h-4 text-white" />
          <span>Emergency</span>
          {openAlertsCount > 0 && (
            <span className="w-2 h-2 rounded-full bg-yellow-300 animate-ping absolute -top-1 -right-1"></span>
          )}
        </button>
      </div>
    </header>
  );
};
