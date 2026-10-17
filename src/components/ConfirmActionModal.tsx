import React from 'react';
import { HelpCircle, Check, X } from 'lucide-react';

interface ConfirmActionModalProps {
  isOpen: boolean;
  echoBackText: string;
  onConfirm: () => void;
  onReject: () => void;
}

export const ConfirmActionModal: React.FC<ConfirmActionModalProps> = ({
  isOpen,
  echoBackText,
  onConfirm,
  onReject
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border-2 border-emerald-500 overflow-hidden">
        {/* Header */}
        <div className="bg-emerald-600 text-white p-5 text-center">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <HelpCircle className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-xl font-bold">Please Confirm</h2>
          <p className="text-emerald-100 text-xs">Verify details before proceeding (UX-14)</p>
        </div>

        {/* Content */}
        <div className="p-6 text-center space-y-4">
          <p className="text-sm font-medium text-slate-500">I heard:</p>
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
            <p className="text-base font-bold text-emerald-950 leading-relaxed">
              "{echoBackText}"
            </p>
          </div>
          <p className="text-sm font-semibold text-slate-700">
            Is that correct?
          </p>

          {/* Action Buttons (UX-14, UX-15) */}
          <div className="grid grid-cols-2 gap-3 pt-3">
            <button
              onClick={onConfirm}
              className="h-14 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all"
            >
              <Check className="w-5 h-5" />
              <span>Yes, correct</span>
            </button>

            <button
              onClick={onReject}
              className="h-14 bg-slate-100 hover:bg-slate-200 active:scale-98 text-slate-700 rounded-2xl font-bold text-sm flex items-center justify-center gap-1.5 transition-all"
            >
              <X className="w-5 h-5 text-red-500" />
              <span>No, say again</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
