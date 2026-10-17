import React, { useState, useEffect } from 'react';
import { Users, Volume2, RefreshCw, X, Check, Trash2, KeyRound, Clock, ShieldCheck } from 'lucide-react';
import type { LinkedCaregiver } from '../types';
import { readPairingKeyAloud, stopSpeaking } from '../services/audioService';

interface FamilyPairingModalProps {
  isOpen: boolean;
  onClose: () => void;
  linkedCaregivers: LinkedCaregiver[];
  onRemoveCaregiver: (id: string) => void;
  onApproveCaregiver: (name: string) => void;
}

export const FamilyPairingModal: React.FC<FamilyPairingModalProps> = ({
  isOpen,
  onClose,
  linkedCaregivers,
  onRemoveCaregiver,
  onApproveCaregiver
}) => {
  const [pairingKey, setPairingKey] = useState("A3F9 - 7C21");
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [showPendingConsent, setShowPendingConsent] = useState(false);
  const pendingCaregiverName = "Sarah (Daughter)";

  // Countdown timer (UX-41)
  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  // Generate random 8-hex key
  const handleGenerateNewKey = () => {
    const chars = "ABCDEF0123456789";
    let p1 = "";
    let p2 = "";
    for (let i = 0; i < 4; i++) p1 += chars.charAt(Math.floor(Math.random() * chars.length));
    for (let i = 0; i < 4; i++) p2 += chars.charAt(Math.floor(Math.random() * chars.length));
    setPairingKey(`${p1} - ${p2}`);
    setTimeLeft(600);
  };

  const handleReadAloud = () => {
    setIsReadingAloud(true);
    readPairingKeyAloud(pairingKey, () => {
      setIsReadingAloud(false);
    });
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-brand-600 to-emerald-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold leading-tight">Family & Caregiver Access</h2>
              <p className="text-xs text-emerald-100">Patient-controlled one-time pairing (UX-40)</p>
            </div>
          </div>
          <button
            onClick={() => {
              stopSpeaking();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="p-5 space-y-6 overflow-y-auto no-scrollbar">
          {/* Pending Consent Banner (UX-42) */}
          {showPendingConsent && (
            <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-2xl animate-pulse">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-amber-900">
                    Consent Request Received
                  </h3>
                  <p className="text-xs text-amber-800 mt-0.5 font-medium">
                    "{pendingCaregiverName} entered your code and would like to link with you. Is that okay?"
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => {
                        onApproveCaregiver(pendingCaregiverName);
                        setShowPendingConsent(false);
                      }}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg flex items-center gap-1 shadow-xs"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => setShowPendingConsent(false)}
                      className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-lg"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Key Generator Card (UX-41) */}
          <div className="bg-brand-50/70 border border-brand-200 rounded-2xl p-4 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-800 flex items-center justify-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5" />
              Your 1-Time Pairing Key
            </span>

            {/* Giant Monospaced 8-Char Code */}
            <div className="mt-2 py-3 px-4 bg-white rounded-xl border border-brand-200 shadow-inner">
              <span className="font-mono text-3xl font-black tracking-widest text-brand-900 select-all">
                {pairingKey}
              </span>
            </div>

            {/* Countdown validity bar */}
            <div className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-500">
              <Clock className="w-3.5 h-3.5 text-brand-600" />
              <span>Valid for: <strong className="text-slate-800">{formatTime(timeLeft)}</strong> (10 min TTL)</span>
            </div>

            {/* Key Actions */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <button
                onClick={handleReadAloud}
                className="h-11 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl font-bold text-xs text-slate-700 flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <Volume2 className={`w-4 h-4 ${isReadingAloud ? 'text-brand-600 animate-bounce' : 'text-slate-500'}`} />
                <span>{isReadingAloud ? 'Reading...' : 'Read Aloud'}</span>
              </button>

              <button
                onClick={handleGenerateNewKey}
                className="h-11 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl font-bold text-xs text-slate-700 flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                <span>New Key</span>
              </button>
            </div>

            {/* Demo Helper: Simulate Caregiver redemption */}
            <div className="mt-3 pt-3 border-t border-brand-200/60">
              <button
                onClick={() => setShowPendingConsent(true)}
                className="text-[11px] font-semibold text-brand-700 hover:underline"
              >
                + Simulate Caregiver Entering This Code
              </button>
            </div>
          </div>

          {/* Linked Caregivers List (UX-40) */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
              Active Connected Caregivers ({linkedCaregivers.length})
            </h3>

            {linkedCaregivers.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
                No family members linked yet. Share the code above with your caregiver.
              </div>
            ) : (
              <div className="space-y-2">
                {linkedCaregivers.map(cg => (
                  <div
                    key={cg.id}
                    className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between shadow-xs"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{cg.name}</h4>
                      <p className="text-xs text-slate-500">{cg.role} • Linked on {cg.linked_at}</p>
                    </div>
                    <button
                      onClick={() => onRemoveCaregiver(cg.id)}
                      title="Revoke access immediately (UX-44)"
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-500">
            Caregivers can only view your data with your explicit consent. You can revoke access at any time.
          </p>
        </div>
      </div>
    </div>
  );
};
