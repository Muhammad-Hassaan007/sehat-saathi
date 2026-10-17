import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Pill, 
  TestTube2, 
  Activity, 
  Heart, 
  Calendar,
  Trash2,
  CheckCircle2
} from 'lucide-react';
import type { HealthRecord, Prescription, MedicationReminder } from '../types';

interface RecordsScreenProps {
  records: HealthRecord[];
  prescriptions: Prescription[];
  reminders: MedicationReminder[];
  onAddPrescription: (newRx: Omit<Prescription, 'id' | 'prescribed_date' | 'status'>) => void;
  onRemovePrescription: (id: string) => void;
  onAcknowledgeReminder: (id: string) => void;
}

export const RecordsScreen: React.FC<RecordsScreenProps> = ({
  records,
  prescriptions,
  reminders,
  onAddPrescription,
  onRemovePrescription,
  onAcknowledgeReminder
}) => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Prescription' | 'Lab Result' | 'Report'>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMedName, setNewMedName] = useState("");
  const [newDose, setNewDose] = useState("");
  const [newTiming, setNewTiming] = useState("");
  const [newInstructions, setNewInstructions] = useState("");

  const categories = ['All', 'Lab Result', 'Prescription', 'Report'] as const;

  const filteredRecords = activeCategory === 'All' 
    ? records 
    : records.filter(r => r.category === activeCategory);

  const handleCreatePrescription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedName || !newDose) return;

    onAddPrescription({
      medicine_name: newMedName,
      dose_text: newDose,
      timing_text: newTiming || "Once daily with water",
      instructions: newInstructions || "Take as instructed by caregiver"
    });

    setNewMedName("");
    setNewDose("");
    setNewTiming("");
    setNewInstructions("");
    setShowAddModal(false);
  };

  const getRecordIcon = (iconType: string) => {
    switch (iconType) {
      case 'vial':
        return <TestTube2 className="w-5 h-5 text-pink-500" />;
      case 'lungs':
        return <Activity className="w-5 h-5 text-teal-600" />;
      case 'vitamin':
        return <span className="font-black text-brand-600 text-sm">D</span>;
      case 'ecg':
        return <Heart className="w-5 h-5 text-pink-500" />;
      default:
        return <FileText className="w-5 h-5 text-slate-500" />;
    }
  };

  const getRecordBg = (iconType: string) => {
    switch (iconType) {
      case 'vial': return 'bg-pink-50';
      case 'lungs': return 'bg-teal-50';
      case 'vitamin': return 'bg-emerald-50';
      case 'ecg': return 'bg-pink-50';
      default: return 'bg-slate-50';
    }
  };

  return (
    <div className="space-y-5 pb-24 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Health Records</h2>
          <p className="text-xs text-slate-500 font-medium">Prescriptions & Diagnostic Tests</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="h-9 px-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Rx</span>
        </button>
      </div>

      {/* Filter Tabs (Matches Figma Screen 4) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                isSelected
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-emerald-100/80'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Prescriptions Section (UX Screen 9) */}
      {(activeCategory === 'All' || activeCategory === 'Prescription') && (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <Pill className="w-4 h-4 text-brand-600" />
              <span>Current Prescriptions ({prescriptions.length})</span>
            </h3>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
              Auto-Synced
            </span>
          </div>

          <div className="space-y-2.5">
            {prescriptions.map((rx) => (
              <div
                key={rx.id}
                className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-card flex items-start justify-between"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-200 text-brand-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Pill className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-slate-900 leading-tight">
                        {rx.medicine_name}
                      </h4>
                      <span className="px-2 py-0.5 rounded-full bg-brand-100 text-brand-800 font-extrabold text-[10px]">
                        {rx.dose_text}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium mt-1">
                      {rx.timing_text}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {rx.instructions}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onRemovePrescription(rx.id)}
                  title="Remove Prescription"
                  className="p-1.5 text-slate-300 hover:text-red-500 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Active Medication Reminders Sub-section */}
          <div className="pt-2">
            <h4 className="text-xs font-bold text-slate-700 mb-2 px-1">
              Active Daily Reminders
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {reminders.map(rem => (
                <div key={rem.id} className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-800">{rem.medicine_name}</span>
                    <span className="text-slate-400 block">{rem.time}</span>
                  </div>
                  {rem.taken ? (
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Taken
                    </span>
                  ) : (
                    <button
                      onClick={() => onAcknowledgeReminder(rem.id)}
                      className="px-2 py-1 bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold rounded-md"
                    >
                      Mark Taken
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Lab Results & Diagnostics Section (Matches Figma Screen 4 Cards) */}
      {(activeCategory === 'All' || activeCategory === 'Lab Result' || activeCategory === 'Report') && (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold text-slate-800">
              Lab Tests & Reports
            </h3>
            <span className="text-xs text-slate-400">Hospital Verified</span>
          </div>

          <div className="space-y-2.5">
            {filteredRecords.map((rec) => (
              <div
                key={rec.id}
                className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-card flex items-center justify-between transition-all hover:border-emerald-300"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-11 h-11 rounded-2xl ${getRecordBg(rec.icon)} flex items-center justify-center shrink-0`}>
                    {getRecordIcon(rec.icon)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">
                      {rec.title}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mt-1">
                      <Calendar className="w-3 h-3" />
                      <span>{rec.date} • {rec.time}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    rec.status === 'Normal' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {rec.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Prescription Modal (UX Screen 9) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-emerald-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center">
                  <Pill className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Add New Prescription</h3>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePrescription} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Medicine Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Atorvastatin, Metformin"
                  value={newMedName}
                  onChange={(e) => setNewMedName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Dosage
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 20mg, 1 tablet"
                  value={newDose}
                  onChange={(e) => setNewDose(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Schedule / Timing
                </label>
                <input
                  type="text"
                  placeholder="e.g. Once daily at bedtime"
                  value={newTiming}
                  onChange={(e) => setNewTiming(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Special Instructions
                </label>
                <input
                  type="text"
                  placeholder="e.g. Take with a glass of water after dinner"
                  value={newInstructions}
                  onChange={(e) => setNewInstructions(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl text-slate-600 font-bold text-xs hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md shadow-brand-500/25 flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Save & Index</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
