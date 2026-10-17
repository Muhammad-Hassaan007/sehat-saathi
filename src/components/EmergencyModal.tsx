import React, { useState } from 'react';
import { PhoneCall, ShieldAlert, Plus, Trash2, X, User, HeartHandshake } from 'lucide-react';
import type { EmergencyContact } from '../types';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  contacts: EmergencyContact[];
  onAddContact: (contact: Omit<EmergencyContact, 'id'>) => void;
  onRemoveContact: (id: string) => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  contacts,
  onAddContact,
  onRemoveContact
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [phone, setPhone] = useState("");

  if (!isOpen) return null;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    onAddContact({
      name: name.trim(),
      relation: relation.trim() || "Emergency Contact",
      phone: phone.trim(),
      isPrimary: false
    });

    setName("");
    setRelation("");
    setPhone("");
    setShowAddForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-red-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight">Emergency Contacts</h2>
              <p className="text-xs text-red-100 font-medium">Tap any number below to dial immediately</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contacts List */}
        <div className="p-5 space-y-4 overflow-y-auto no-scrollbar">
          {/* Priority 911 Direct Call Card */}
          <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-4 flex items-center justify-between shadow-xs">
            <div>
              <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider">
                Immediate Emergency
              </span>
              <h3 className="text-lg font-black text-red-950 mt-1">911 Emergency</h3>
              <p className="text-xs text-red-700 font-medium">Ambulance, Police, Rescue</p>
            </div>

            <a
              href="tel:911"
              className="px-4 py-3 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-extrabold text-sm rounded-xl flex items-center gap-1.5 shadow-md shadow-red-600/30 transition-all shrink-0"
            >
              <PhoneCall className="w-4 h-4 animate-pulse" />
              <span>Call 911</span>
            </a>
          </div>

          {/* Saved Contacts Section */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between px-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Your Saved Emergency Contacts ({contacts.filter(c => !c.isPrimary).length})
              </h4>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{showAddForm ? 'Cancel' : 'Add Contact'}</span>
              </button>
            </div>

            {/* Add Contact Inline Form */}
            {showAddForm && (
              <form onSubmit={handleAddSubmit} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <h5 className="text-xs font-bold text-slate-800">New Emergency Contact</h5>
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Full Name (e.g. John, Dr. Miller)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Relation (e.g. Son, Daughter, Neighbor, Doctor)"
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number (e.g. +1 555-0192)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-brand-500"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold shadow-xs"
                  >
                    Save Contact
                  </button>
                </div>
              </form>
            )}

            {/* List of custom emergency contacts */}
            {contacts.filter(c => !c.isPrimary).length === 0 ? (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
                No personal emergency contacts added yet. Tap "+ Add Contact" above.
              </div>
            ) : (
              contacts.filter(c => !c.isPrimary).map(contact => (
                <div
                  key={contact.id}
                  className="p-3.5 bg-white border border-slate-200 rounded-2xl flex items-center justify-between shadow-xs hover:border-emerald-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-brand-600 flex items-center justify-center shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-tight">
                        {contact.name}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">{contact.relation}</p>
                      <p className="text-xs text-brand-800 font-semibold">{contact.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <a
                      href={`tel:${contact.phone}`}
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1 shadow-xs transition-colors"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </a>
                    <button
                      onClick={() => onRemoveContact(contact.id)}
                      className="p-2 text-slate-300 hover:text-red-500 rounded-lg transition-colors"
                      title="Remove contact"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <HeartHandshake className="w-4 h-4 text-emerald-600" />
            <span>Emergency lines dial directly</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-xl text-xs font-bold text-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
