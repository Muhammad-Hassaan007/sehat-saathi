import React, { useState } from 'react';
import { 
  Droplet, 
  Calendar as CalendarIcon, 
  FileCheck2,
  Footprints,
  CheckCircle2,
  Salad,
  Plus,
  ClipboardList
} from 'lucide-react';
import type { RecoveryData, SummaryLine } from '../types';

interface OverviewScreenProps {
  recovery: RecoveryData;
  dischargeLines: SummaryLine[];
}

interface ManualLog {
  id: string;
  type: string;
  value: string;
  time: string;
  device: string;
  status: string;
}

export const OverviewScreen: React.FC<OverviewScreenProps> = ({
  recovery,
  dischargeLines
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(18);
  const [showLogModal, setShowLogModal] = useState(false);
  const [logType, setLogType] = useState("Blood Pressure");
  const [logValue, setLogValue] = useState("");

  const [manualLogs, setManualLogs] = useState<ManualLog[]>([
    {
      id: "log-1",
      type: "Blood Pressure (Home Cuff)",
      value: "110/80 mmHg",
      time: "08:15 AM",
      device: "Manual Home Arm Cuff",
      status: "Normal"
    },
    {
      id: "log-2",
      type: "Fasting Blood Glucose",
      value: "104 mg/dL",
      time: "08:00 AM",
      device: "Home Glucometer",
      status: "Normal"
    }
  ]);

  const daysOfWeek = [
    { day: "Mon", date: 16 },
    { day: "Tue", date: 17 },
    { day: "Wed", date: 18 },
    { day: "Thu", date: 19 },
    { day: "Fri", date: 20 },
    { day: "Sat", date: 21 },
    { day: "Sun", date: 22 }
  ];

  const handleAddManualLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!logValue.trim()) return;

    setManualLogs(prev => [
      {
        id: `log-${Date.now()}`,
        type: logType,
        value: logValue.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        device: "Self-Reported Entry",
        status: "Recorded"
      },
      ...prev
    ]);

    setLogValue("");
    setShowLogModal(false);
  };

  return (
    <div className="space-y-5 pb-24 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Health Overview</h2>
          <p className="text-xs text-slate-500 font-medium">Daily Recovery & Discharge Logs</p>
        </div>

        {/* Month Selector Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-emerald-100 shadow-xs text-xs font-bold text-slate-700">
          <CalendarIcon className="w-3.5 h-3.5 text-brand-600" />
          <span>August, 2027</span>
        </div>
      </div>

      {/* Week Calendar Strip (Matches Demo Screen 2) */}
      <div className="flex items-center justify-between gap-1.5 overflow-x-auto no-scrollbar py-1">
        {daysOfWeek.map((item) => {
          const isSelected = item.date === selectedDay;
          return (
            <button
              key={item.date}
              onClick={() => setSelectedDay(item.date)}
              className={`flex-1 min-w-[46px] py-3 rounded-2xl flex flex-col items-center justify-center transition-all ${
                isSelected
                  ? 'bg-brand-500 text-white font-bold shadow-md shadow-brand-500/30 scale-105'
                  : 'bg-white text-slate-600 hover:bg-brand-50/60 border border-emerald-100/60 font-medium'
              }`}
            >
              <span className={`text-[11px] ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                {item.day}
              </span>
              <span className="text-base font-black mt-0.5">{item.date}</span>
              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white mt-1"></span>}
            </button>
          );
        })}
      </div>

      {/* Discharge Recovery Compliance Cards (Real patient targets) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-slate-800">Recovery Goals (Discharge Plan)</h3>
          <span className="text-xs font-semibold text-emerald-600">On Track</span>
        </div>

        {/* 1. Daily Walking Exercise Goal (Line L6) */}
        <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-card flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-brand-600 flex items-center justify-center">
              <Footprints className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold">Light Walking (Discharge L6)</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-slate-900">{recovery.walkingMinutes.current}</span>
                <span className="text-xs text-slate-400">/ {recovery.walkingMinutes.goal} min</span>
              </div>
            </div>
          </div>

          <div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Goal Met</span>
            </span>
          </div>
        </div>

        {/* 2. Hydration Water Target (Line L5) */}
        <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-card flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Droplet className="w-6 h-6 fill-teal-500" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold">Water Intake (Discharge L5)</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-slate-900">{recovery.waterIntake.current}</span>
                <span className="text-xs text-slate-400">/ {recovery.waterIntake.goal} Liters</span>
              </div>
            </div>
          </div>

          <div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              90% of Goal
            </span>
          </div>
        </div>

        {/* 3. Diabetic Diet Compliance (Line L5) */}
        <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-card flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Salad className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold">Diet Compliance (Discharge L5)</span>
              <div className="text-sm font-bold text-slate-900 mt-0.5">
                Low-Sodium Diabetic Diet
              </div>
            </div>
          </div>

          <div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              Followed
            </span>
          </div>
        </div>
      </div>

      {/* Manual Home Cuff & Glucometer Logs (Transparent & Realistic) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <ClipboardList className="w-4 h-4 text-brand-600" />
              <span>Home Cuff & Glucometer Logs</span>
            </h3>
            <p className="text-[11px] text-slate-400">Recorded by patient or caregiver at home</p>
          </div>

          <button
            onClick={() => setShowLogModal(true)}
            className="h-8 px-2.5 bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-bold rounded-xl flex items-center gap-1 transition-colors border border-brand-200/60"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Log</span>
          </button>
        </div>

        <div className="space-y-2">
          {manualLogs.map(log => (
            <div key={log.id} className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800">{log.type}</h4>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-lg font-black text-slate-900">{log.value}</span>
                  <span className="text-[11px] text-slate-400">at {log.time}</span>
                </div>
                <p className="text-[10px] text-slate-400">{log.device}</p>
              </div>

              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                {log.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Discharge Summary Reference Grounding Sheet */}
      <div className="bg-brand-50/70 rounded-3xl p-5 border border-brand-200">
        <div className="flex items-center gap-2 mb-2">
          <FileCheck2 className="w-5 h-5 text-brand-700" />
          <h3 className="text-sm font-bold text-slate-800">Hospital Discharge Summary Lines</h3>
        </div>
        <p className="text-xs text-slate-600 mb-3 font-medium">
          Source of truth used by the AI voice assistant for every question:
        </p>

        <div className="space-y-2 max-h-56 overflow-y-auto no-scrollbar">
          {dischargeLines.map(line => (
            <div 
              key={line.id} 
              className="bg-white p-3 rounded-xl border border-brand-100 shadow-xs flex items-start gap-2.5"
            >
              <span className="px-1.5 py-0.5 rounded-md bg-brand-100 text-brand-800 font-mono text-[11px] font-bold shrink-0 mt-0.5">
                {line.id}
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {line.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Add Manual Home Reading Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-emerald-200">
            <h3 className="text-base font-bold text-slate-900 mb-3">Record Home Reading</h3>
            <form onSubmit={handleAddManualLog} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Measurement Type</label>
                <select
                  value={logType}
                  onChange={(e) => setLogType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-hidden"
                >
                  <option value="Blood Pressure (Home Cuff)">Blood Pressure (Home Arm Cuff)</option>
                  <option value="Fasting Blood Glucose">Fasting Blood Glucose (Glucometer)</option>
                  <option value="Resting Pulse Rate">Resting Pulse Rate</option>
                  <option value="Body Weight">Body Weight</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Reading Value</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 118/78 mmHg or 105 mg/dL"
                  value={logValue}
                  onChange={(e) => setLogValue(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold shadow-xs"
                >
                  Save Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
