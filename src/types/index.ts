export type UserRole = 'patient' | 'caregiver';

export type TextSize = 'normal' | 'large' | 'xlarge';

export type ConfidenceLevel = 'Certain' | 'Possibly' | 'Unknown';

export type UIState = 'idle' | 'listening' | 'thinking' | 'speaking' | 'waiting_confirmation' | 'emergency' | 'handoff';

export interface SummaryLine {
  id: string; // e.g. "L1", "L2"
  text: string;
  category: 'diagnosis' | 'medication' | 'lifestyle' | 'restriction' | 'followup' | 'emergency';
}

export interface Prescription {
  id: string;
  medicine_name: string;
  dose_text: string;
  timing_text: string;
  instructions: string;
  source_line_id?: string;
  status: 'active' | 'completed';
  prescribed_date: string;
}

export interface MedicationReminder {
  id: string;
  medicine_name: string;
  dose_text: string;
  timing_text: string;
  time: string; // "08:00 AM"
  taken: boolean;
  snoozed: boolean;
  due_now?: boolean;
}

export interface ChatMessage {
  id: string;
  speaker: 'user' | 'assistant';
  text: string;
  timestamp: string;
  source_line?: string;
  cited_line_ids?: string[];
  confidence_badge?: ConfidenceLevel;
  confidence?: number;
  audio_url?: string;
  ui_state?: UIState;
  echo_back?: string;
  pending_action?: {
    type: 'reminder' | 'appointment';
    details: string;
  };
  is_emergency?: boolean;
}

export interface LinkedCaregiver {
  id: string;
  name: string;
  role: string;
  linked_at: string;
  status: 'active' | 'pending';
}

export interface EmergencyContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
  isPrimary?: boolean;
}

export interface EmergencyAlert {
  id: string;
  patient_id: string;
  transcript_excerpt: string;
  timestamp: string;
  action_taken: string;
  handled: boolean;
  handled_at?: string;
}

export interface ReviewQueueItem {
  id: string;
  question: string;
  attempted_answer: string;
  reason: string;
  clinician_note: string | null;
  status: 'pending' | 'resolved';
  created_at: string;
}

export interface Appointment {
  id: string;
  doctor_name: string;
  specialty: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending';
}

export interface HealthRecord {
  id: string;
  title: string;
  date: string;
  time: string;
  category: 'Lab Result' | 'Prescription' | 'Report';
  status: 'Normal' | 'Low' | 'High';
  icon: 'vial' | 'lungs' | 'vitamin' | 'ecg' | 'pill';
}

export interface RecoveryData {
  healthScore: number;
  waterIntake: {
    current: number;
    goal: number;
    unit: string;
  };
  sleepDuration: {
    hours: number;
    minutes: number;
    status: string;
  };
  walkingMinutes: {
    current: number;
    goal: number;
    status: string;
  };
  dietCompliance: {
    status: string;
    description: string;
  };
}
