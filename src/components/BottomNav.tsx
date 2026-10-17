import React from 'react';
import { Home, LayoutGrid, MessageSquare, FolderGit2, ShieldCheck } from 'lucide-react';
import type { UserRole } from '../types';

export type NavTab = 'home' | 'overview' | 'assistant' | 'records' | 'caregiver';

interface BottomNavProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  role: UserRole;
  pendingReviewCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  role,
  pendingReviewCount = 0
}) => {
  return (
    <nav className="fixed bottom-3 inset-x-0 mx-auto max-w-sm px-4 z-40 pointer-events-none">
      <div className="bg-white/95 backdrop-blur-md rounded-full shadow-lg border border-emerald-100 p-1.5 flex items-center justify-around pointer-events-auto">
        {/* Tab 1: Home */}
        <button
          onClick={() => onSelectTab('home')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-all duration-200 ${
            currentTab === 'home'
              ? 'bg-brand-500 text-white font-bold shadow-md shadow-brand-500/25'
              : 'text-slate-500 hover:text-slate-800'
          }`}
          aria-label="Home Tab"
        >
          <Home className="w-5 h-5" />
          {currentTab === 'home' && <span className="text-xs font-semibold">Home</span>}
        </button>

        {/* Tab 2: Health Overview */}
        <button
          onClick={() => onSelectTab('overview')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-all duration-200 ${
            currentTab === 'overview'
              ? 'bg-brand-500 text-white font-bold shadow-md shadow-brand-500/25'
              : 'text-slate-500 hover:text-slate-800'
          }`}
          aria-label="Health Overview Tab"
        >
          <LayoutGrid className="w-5 h-5" />
          {currentTab === 'overview' && <span className="text-xs font-semibold">Overview</span>}
        </button>

        {/* Tab 3: AI Assistant / Voice Q&A */}
        <button
          onClick={() => onSelectTab('assistant')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-all duration-200 ${
            currentTab === 'assistant'
              ? 'bg-brand-500 text-white font-bold shadow-md shadow-brand-500/25'
              : 'text-slate-500 hover:text-slate-800'
          }`}
          aria-label="AI Voice Assistant Tab"
        >
          <MessageSquare className="w-5 h-5" />
          {currentTab === 'assistant' && <span className="text-xs font-semibold">AI Voice</span>}
        </button>

        {/* Tab 4: Health Records & Prescriptions */}
        <button
          onClick={() => onSelectTab('records')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-all duration-200 ${
            currentTab === 'records'
              ? 'bg-brand-500 text-white font-bold shadow-md shadow-brand-500/25'
              : 'text-slate-500 hover:text-slate-800'
          }`}
          aria-label="Health Records Tab"
        >
          <FolderGit2 className="w-5 h-5" />
          {currentTab === 'records' && <span className="text-xs font-semibold">Records</span>}
        </button>

        {/* Tab 5: Caregiver Hub (if role is caregiver or available) */}
        {role === 'caregiver' && (
          <button
            onClick={() => onSelectTab('caregiver')}
            className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-all duration-200 ${
              currentTab === 'caregiver'
                ? 'bg-brand-700 text-white font-bold shadow-md'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            aria-label="Caregiver Dashboard Tab"
          >
            <ShieldCheck className="w-5 h-5" />
            {currentTab === 'caregiver' && <span className="text-xs font-semibold">Caregiver</span>}
            {pendingReviewCount > 0 && currentTab !== 'caregiver' && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full"></span>
            )}
          </button>
        )}
      </div>
    </nav>
  );
};
