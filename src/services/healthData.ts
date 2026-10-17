import type { 
  SummaryLine, 
  Prescription, 
  MedicationReminder, 
  HealthRecord, 
  RecoveryData, 
  ChatMessage, 
  LinkedCaregiver, 
  EmergencyContact,
  ReviewQueueItem,
  Appointment
} from '../types';

export const INITIAL_DISCHARGE_SUMMARY: SummaryLine[] = [
  {
    id: "L1",
    category: "diagnosis",
    text: "Patient Alex, age 72, was successfully discharged following treatment for mild hypertension and type 2 diabetes."
  },
  {
    id: "L2",
    category: "medication",
    text: "Take Metformin 500mg orally twice daily, in the morning after breakfast and at night after dinner."
  },
  {
    id: "L3",
    category: "medication",
    text: "Take Lisinopril 10mg orally once daily every morning at 8:00 AM with a full glass of water."
  },
  {
    id: "L4",
    category: "medication",
    text: "Take Aspirin 75mg once daily with dinner for cardiovascular protection."
  },
  {
    id: "L5",
    category: "lifestyle",
    text: "Follow a low-sodium, heart-healthy diabetic diet and drink at least 1.8 liters of water daily."
  },
  {
    id: "L6",
    category: "restriction",
    text: "Engage in light 20-minute daily walking; do not lift objects heavier than 10 pounds for two weeks."
  },
  {
    id: "L7",
    category: "followup",
    text: "Record resting blood pressure with your home cuff and check fasting blood glucose daily before breakfast."
  },
  {
    id: "L8",
    category: "followup",
    text: "Follow-up outpatient appointment is scheduled with Dr. Sarah Khan on Wednesday, August 25 at 10:30 AM."
  },
  {
    id: "L9",
    category: "emergency",
    text: "Seek immediate emergency attention or call 911 if you experience chest pain, severe breathlessness, fainting, or sudden numbness."
  }
];

export const INITIAL_PRESCRIPTIONS: Prescription[] = [
  {
    id: "rx-1",
    medicine_name: "Metformin",
    dose_text: "500mg",
    timing_text: "Twice daily after meals",
    instructions: "Take once after morning breakfast and once after dinner.",
    source_line_id: "L2",
    status: "active",
    prescribed_date: "15 Aug 2027"
  },
  {
    id: "rx-2",
    medicine_name: "Lisinopril",
    dose_text: "10mg",
    timing_text: "Once daily in the morning (8:00 AM)",
    instructions: "Take with water to control blood pressure.",
    source_line_id: "L3",
    status: "active",
    prescribed_date: "15 Aug 2027"
  },
  {
    id: "rx-3",
    medicine_name: "Aspirin",
    dose_text: "75mg",
    timing_text: "Once daily with dinner",
    instructions: "For heart and cardiovascular protection.",
    source_line_id: "L4",
    status: "active",
    prescribed_date: "15 Aug 2027"
  }
];

export const INITIAL_REMINDERS: MedicationReminder[] = [
  {
    id: "rem-1",
    medicine_name: "Lisinopril",
    dose_text: "10mg",
    timing_text: "Morning with water",
    time: "08:00 AM",
    taken: true,
    snoozed: false
  },
  {
    id: "rem-2",
    medicine_name: "Metformin",
    dose_text: "500mg",
    timing_text: "After breakfast",
    time: "09:00 AM",
    taken: true,
    snoozed: false
  },
  {
    id: "rem-3",
    medicine_name: "Aspirin",
    dose_text: "75mg",
    timing_text: "With evening dinner",
    time: "07:30 PM",
    taken: false,
    snoozed: false,
    due_now: true
  }
];

// Recovery and daily discharge compliance (No fake sensor hardware required)
export const INITIAL_RECOVERY: RecoveryData = {
  healthScore: 85,
  waterIntake: {
    current: 1.8,
    goal: 2.0,
    unit: "L"
  },
  sleepDuration: {
    hours: 7,
    minutes: 28,
    status: "Restful"
  },
  walkingMinutes: {
    current: 20,
    goal: 20,
    status: "Completed"
  },
  dietCompliance: {
    status: "Good",
    description: "Low-sodium diabetic plan followed"
  }
};

export const INITIAL_HEALTH_RECORDS: HealthRecord[] = [
  {
    id: "rec-1",
    title: "Blood Test Report",
    date: "19 May 2027",
    time: "2:30 PM",
    category: "Lab Result",
    status: "Normal",
    icon: "vial"
  },
  {
    id: "rec-2",
    title: "X-ray Chest",
    date: "24 May 2027",
    time: "1:30 PM",
    category: "Report",
    status: "Normal",
    icon: "lungs"
  },
  {
    id: "rec-3",
    title: "Vitamin D Test",
    date: "29 May 2027",
    time: "3:30 PM",
    category: "Lab Result",
    status: "Low",
    icon: "vitamin"
  },
  {
    id: "rec-4",
    title: "ECG Report",
    date: "29 May 2027",
    time: "3:30 PM",
    category: "Report",
    status: "Normal",
    icon: "ecg"
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: "apt-1",
    doctor_name: "Dr. Sarah Khan",
    specialty: "Cardiology Follow-up",
    date: "Wednesday, August 25, 2027",
    time: "10:30 AM",
    status: "confirmed"
  }
];

export const INITIAL_LINKED_CAREGIVERS: LinkedCaregiver[] = [
  {
    id: "cg-1",
    name: "Sarah (Daughter)",
    role: "Family Caregiver",
    linked_at: "Aug 15, 2027",
    status: "active"
  }
];

export const INITIAL_EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: "emg-911",
    name: "National Emergency Services",
    relation: "Police / Ambulance / Fire",
    phone: "911",
    isPrimary: true
  },
  {
    id: "emg-1",
    name: "Sarah",
    relation: "Daughter (Primary Caregiver)",
    phone: "+1 (555) 234-5678",
    isPrimary: false
  },
  {
    id: "emg-2",
    name: "Dr. Sarah Khan",
    relation: "Cardiologist (Clinic)",
    phone: "+1 (555) 890-1234",
    isPrimary: false
  }
];

// Deterministic Red-Flag Patterns (FR-12, UX-27)
const RED_FLAG_PATTERNS = [
  /chest\s*pain/i,
  /pain\s*in\s*(my\s*)?(heart|chest)/i,
  /heart\s*pain/i,
  /heart\s*attack/i,
  /can('?t|not)\s*breathe/i,
  /short(ness)?\s*of\s*breath/i,
  /breathless/i,
  /faint(ed|ing)?/i,
  /unconscious/i,
  /stroke/i,
  /numb(ness)?\s*in\s*(my\s*)?arm/i,
  /bleeding\s*heavily/i,
  /severe\s*bleeding/i,
  /dil\s*m(e|ain)\s*dard/i,
  /seen(e|a)\s*m(e|ain)\s*dard/i,
  /saans\s*(ruk|phool)/i
];

export function isRedFlagPhrase(text: string): boolean {
  return RED_FLAG_PATTERNS.some(regex => regex.test(text));
}

// AI Turn Orchestrator & Grounding Simulation
export function processTurn(
  query: string,
  dischargeLines: SummaryLine[]
): {
  message: ChatMessage;
  isRedFlag: boolean;
  handoffItem?: ReviewQueueItem;
  pendingAction?: { type: 'reminder' | 'appointment'; details: string };
} {
  const trimmed = query.trim();

  // 1. Red Flag Emergency Check (Deterministic FR-12)
  if (isRedFlagPhrase(trimmed)) {
    return {
      isRedFlag: true,
      message: {
        id: `msg-${Date.now()}`,
        speaker: 'assistant',
        text: "Critical symptom detected. Please call 911 or one of your emergency contacts immediately.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source_line: "Discharge Line L9: Seek immediate emergency attention (call 911) for acute chest pain or breathlessness.",
        cited_line_ids: ["L9"],
        confidence_badge: "Certain",
        confidence: 0.99,
        is_emergency: true,
        ui_state: 'emergency'
      }
    };
  }

  const lower = trimmed.toLowerCase();

  // 2. Reminder / Schedule intent
  if (lower.includes("remind") || lower.includes("take metformin") || lower.includes("take pill") || lower.includes("set reminder")) {
    const details = "Take Metformin 500mg in the morning after breakfast and night after dinner.";
    return {
      isRedFlag: false,
      pendingAction: {
        type: 'reminder',
        details
      },
      message: {
        id: `msg-${Date.now()}`,
        speaker: 'assistant',
        text: `I heard you would like to set a reminder for: ${details}. Is that correct?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        echo_back: `Reminder: ${details}`,
        source_line: "Your discharge summary says: Take Metformin 500mg orally twice daily (L2).",
        cited_line_ids: ["L2"],
        confidence_badge: "Certain",
        confidence: 0.95,
        ui_state: 'waiting_confirmation'
      }
    };
  }

  // 3. Appointment intent
  if (lower.includes("appointment") || lower.includes("doctor") || lower.includes("sarah khan") || lower.includes("visit clinic")) {
    const aptLine = dischargeLines.find(l => l.id === "L8") || dischargeLines[7];
    return {
      isRedFlag: false,
      message: {
        id: `msg-${Date.now()}`,
        speaker: 'assistant',
        text: "Your follow-up clinic appointment is scheduled with cardiologist Dr. Sarah Khan on Wednesday, August 25 at 10:30 AM.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source_line: `Your discharge summary says: ${aptLine.text}`,
        cited_line_ids: ["L8"],
        confidence_badge: "Certain",
        confidence: 0.98,
        ui_state: 'speaking'
      }
    };
  }

  // 4. Grounded Medications
  if (lower.includes("metformin")) {
    const line = dischargeLines.find(l => l.id === "L2") || dischargeLines[1];
    return {
      isRedFlag: false,
      message: {
        id: `msg-${Date.now()}`,
        speaker: 'assistant',
        text: "You should take Metformin 500mg twice daily: once in the morning after breakfast, and once at night after dinner.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source_line: `Your discharge summary says: ${line.text}`,
        cited_line_ids: ["L2"],
        confidence_badge: "Certain",
        confidence: 0.99,
        ui_state: 'speaking'
      }
    };
  }

  if (lower.includes("lisinopril") || lower.includes("blood pressure pill") || lower.includes("morning pill")) {
    const line = dischargeLines.find(l => l.id === "L3") || dischargeLines[2];
    return {
      isRedFlag: false,
      message: {
        id: `msg-${Date.now()}`,
        speaker: 'assistant',
        text: "Your morning blood pressure medication is Lisinopril 10mg. Take it once daily every morning at 8:00 AM with water.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source_line: `Your discharge summary says: ${line.text}`,
        cited_line_ids: ["L3"],
        confidence_badge: "Certain",
        confidence: 0.99,
        ui_state: 'speaking'
      }
    };
  }

  if (lower.includes("aspirin") || lower.includes("blood thinner") || lower.includes("heart pill")) {
    const line = dischargeLines.find(l => l.id === "L4") || dischargeLines[3];
    return {
      isRedFlag: false,
      message: {
        id: `msg-${Date.now()}`,
        speaker: 'assistant',
        text: "Take Aspirin 75mg once daily with your evening dinner to protect your heart.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source_line: `Your discharge summary says: ${line.text}`,
        cited_line_ids: ["L4"],
        confidence_badge: "Certain",
        confidence: 0.98,
        ui_state: 'speaking'
      }
    };
  }

  if (lower.includes("water") || lower.includes("drink") || lower.includes("diet") || lower.includes("food")) {
    const line = dischargeLines.find(l => l.id === "L5") || dischargeLines[4];
    return {
      isRedFlag: false,
      message: {
        id: `msg-${Date.now()}`,
        speaker: 'assistant',
        text: "Please follow a low-sodium, heart-healthy diabetic diet and make sure to drink at least 1.8 liters of clean water every day.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source_line: `Your discharge summary says: ${line.text}`,
        cited_line_ids: ["L5"],
        confidence_badge: "Certain",
        confidence: 0.96,
        ui_state: 'speaking'
      }
    };
  }

  if (lower.includes("walk") || lower.includes("exercise") || lower.includes("lift") || lower.includes("activity")) {
    const line = dischargeLines.find(l => l.id === "L6") || dischargeLines[5];
    return {
      isRedFlag: false,
      message: {
        id: `msg-${Date.now()}`,
        speaker: 'assistant',
        text: "You can do light walking for 20 minutes each day. Do not lift heavy objects over 10 pounds for the next two weeks.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source_line: `Your discharge summary says: ${line.text}`,
        cited_line_ids: ["L6"],
        confidence_badge: "Certain",
        confidence: 0.95,
        ui_state: 'speaking'
      }
    };
  }

  // 5. Honest Handoff (UX-28, FR-14)
  const handoffItem: ReviewQueueItem = {
    id: `rev-${Date.now()}`,
    question: trimmed,
    attempted_answer: "Information not present in hospital discharge summary.",
    reason: "Query outside scope of synthetic discharge summary.",
    clinician_note: null,
    status: 'pending',
    created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  return {
    isRedFlag: false,
    handoffItem,
    message: {
      id: `msg-${Date.now()}`,
      speaker: 'assistant',
      text: "This specific information is not in your discharge summary. I have made a note so your doctor or family can review it and guide you.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source_line: "Discharge Summary Verification: Not found in patient records.",
      confidence_badge: "Unknown",
      confidence: 0.3,
      ui_state: 'handoff'
    }
  };
}
