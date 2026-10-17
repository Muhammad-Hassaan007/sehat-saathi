import { useState, useEffect, useRef } from 'react';
import { 
  Wifi, 
  Battery, 
  Maximize2, 
  Minimize2,
  ArrowLeft
} from 'lucide-react';
import { HealthifyLandingPage } from './pages/HealthifyLandingPage';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import type { NavTab } from './components/BottomNav';
import { HomeScreen } from './screens/HomeScreen';
import { OverviewScreen } from './screens/OverviewScreen';
import { AssistantScreen } from './screens/AssistantScreen';
import { RecordsScreen } from './screens/RecordsScreen';
import { CaregiverDashboard } from './screens/CaregiverDashboard';
import { EmergencyModal } from './components/EmergencyModal';
import { FamilyPairingModal } from './components/FamilyPairingModal';
import { ConfirmActionModal } from './components/ConfirmActionModal';
import { ReminderAlertModal } from './components/ReminderAlertModal';
import { UpdateWalkModal } from './components/UpdateWalkModal';
import { ProfileModal } from './components/ProfileModal';
import type { 
  UserRole, 
  UIState, 
  ChatMessage, 
  MedicationReminder, 
  Prescription, 
  LinkedCaregiver, 
  EmergencyAlert, 
  ReviewQueueItem,
  EmergencyContact 
} from './types';
import { 
  INITIAL_DISCHARGE_SUMMARY, 
  INITIAL_PRESCRIPTIONS, 
  INITIAL_REMINDERS, 
  INITIAL_RECOVERY, 
  INITIAL_HEALTH_RECORDS, 
  INITIAL_APPOINTMENTS,
  INITIAL_LINKED_CAREGIVERS,
  INITIAL_EMERGENCY_CONTACTS,
  processTurn
} from './services/healthData';
import { 
  createSpeechRecognizer, 
  speakAloud, 
  stopSpeaking
} from './services/audioService';
import type { SpeechRecognitionController } from './services/audioService';

export function App() {
  // View Mode: 'landing' (CMSMasters Rehab Clinic Website) or 'app' (Interactive PWA)
  const [viewMode, setViewMode] = useState<'landing' | 'app'>('landing');

  // Device Role: 'patient' or 'caregiver'
  const [role, setRole] = useState<UserRole>(() => {
    return (localStorage.getItem('sehat_user_role') as UserRole) || 'patient';
  });

  // Current Screen Tab
  const [currentTab, setCurrentTab] = useState<NavTab>('home');

  // Accessibility State
  const [highContrast, setHighContrast] = useState<boolean>(() => {
    return localStorage.getItem('sehat_high_contrast') === 'true';
  });

  // Presentation View: Mobile Frame vs Full Screen
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(true);

  // Application Data States
  const [dischargeLines, setDischargeLines] = useState(INITIAL_DISCHARGE_SUMMARY);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(INITIAL_PRESCRIPTIONS);
  const [reminders, setReminders] = useState<MedicationReminder[]>(INITIAL_REMINDERS);
  const [recovery, setRecovery] = useState(INITIAL_RECOVERY);
  const [records] = useState(INITIAL_HEALTH_RECORDS);
  const [appointments] = useState(INITIAL_APPOINTMENTS);
  const [linkedCaregivers, setLinkedCaregivers] = useState<LinkedCaregiver[]>(INITIAL_LINKED_CAREGIVERS);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>(() => {
    const saved = localStorage.getItem('sehat_emergency_contacts');
    return saved ? JSON.parse(saved) : INITIAL_EMERGENCY_CONTACTS;
  });

  // Caregiver Monitoring States
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([]);
  const [reviewQueue, setReviewQueue] = useState<ReviewQueueItem[]>([
    {
      id: "rev-init",
      question: "Can I drink mango shake with dinner?",
      attempted_answer: "Information not present in hospital discharge summary.",
      reason: "Diet item outside hospital discharge record.",
      clinician_note: null,
      status: 'pending',
      created_at: "18:15 PM"
    }
  ]);

  // Voice & Chat State
  const [uiState, setUiState] = useState<UIState>('idle');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [liveTranscript, setLiveTranscript] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      speaker: 'assistant',
      text: "Hello Alex! I am your Sehat Saathi health assistant. You can tap the microphone button in the search bar anytime to ask about your medicines, dosage, diet, or doctor visits.",
      timestamp: "18:30 PM",
      source_line: "Hospital Discharge Summary verified and loaded.",
      confidence_badge: "Certain",
      confidence: 1.0,
      ui_state: 'speaking'
    }
  ]);

  // Modals & Overlays
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState<boolean>(false);
  const [showFamilyModal, setShowFamilyModal] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [showUpdateWalkModal, setShowUpdateWalkModal] = useState<boolean>(false);
  const [pendingConfirmAction, setPendingConfirmAction] = useState<{ details: string; action: () => void } | null>(null);
  const [dueReminderAlert, setDueReminderAlert] = useState<MedicationReminder | null>(null);

  const speechControllerRef = useRef<SpeechRecognitionController | null>(null);

  // Save settings in localStorage
  useEffect(() => {
    localStorage.setItem('sehat_user_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('sehat_high_contrast', String(highContrast));
  }, [highContrast]);

  useEffect(() => {
    localStorage.setItem('sehat_emergency_contacts', JSON.stringify(emergencyContacts));
  }, [emergencyContacts]);

  // Check for any medication reminder due on launch
  useEffect(() => {
    const due = reminders.find(r => r.due_now && !r.taken);
    if (due) {
      const timer = setTimeout(() => {
        setDueReminderAlert(due);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Initialize Speech Recognition
  useEffect(() => {
    const controller = createSpeechRecognizer(
      (transcript) => {
        setLiveTranscript(transcript);
      },
      (error) => {
        console.warn("Speech error:", error);
        setIsListening(false);
        setUiState('idle');
      },
      (listening) => {
        setIsListening(listening);
        if (listening) {
          setUiState('listening');
        } else {
          if (liveTranscript.trim()) {
            handleProcessUserQuery(liveTranscript.trim());
            setLiveTranscript("");
          } else {
            setUiState('idle');
          }
        }
      }
    );

    speechControllerRef.current = controller;
  }, [liveTranscript, dischargeLines]);

  // Toggle Voice Recognition
  const handleToggleVoice = () => {
    if (isListening) {
      speechControllerRef.current?.stop();
    } else {
      stopSpeaking();
      setCurrentTab('assistant');
      setLiveTranscript("");
      speechControllerRef.current?.start();
    }
  };

  // Turn Processing Logic
  const handleProcessUserQuery = (queryText: string) => {
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      speaker: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);

    setUiState('thinking');

    setTimeout(() => {
      const result = processTurn(queryText, dischargeLines);

      // Handle Red-Flag Emergency (FR-12)
      if (result.isRedFlag) {
        setUiState('emergency');
        setShowEmergencyModal(true);

        const newAlert: EmergencyAlert = {
          id: `alert-${Date.now()}`,
          patient_id: "pat_alex_72",
          transcript_excerpt: queryText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          action_taken: "Emergency contacts view presented to patient; Caregiver alerted.",
          handled: false
        };
        setAlerts(prev => [newAlert, ...prev]);

        setMessages(prev => [...prev, result.message]);
        return;
      }

      // Handle Confirm-Before-Act (UX-14, UX-15)
      if (result.pendingAction) {
        setUiState('waiting_confirmation');
        setMessages(prev => [...prev, result.message]);
        setPendingConfirmAction({
          details: result.pendingAction.details,
          action: () => {
            const newReminder: MedicationReminder = {
              id: `rem-${Date.now()}`,
              medicine_name: "Metformin",
              dose_text: "500mg",
              timing_text: "Twice daily after meals",
              time: "08:30 AM",
              taken: false,
              snoozed: false
            };
            setReminders(prev => [...prev, newReminder]);
            
            const confirmedMsg: ChatMessage = {
              id: `msg-${Date.now()}`,
              speaker: 'assistant',
              text: "Done! Your medication reminder has been saved and confirmed.",
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              confidence_badge: "Certain",
              confidence: 1.0,
              ui_state: 'speaking'
            };
            setMessages(prev => [...prev, confirmedMsg]);
            speakAloud(confirmedMsg.text);
            setShowConfirmModal(false);
            setUiState('idle');
          }
        });
        setShowConfirmModal(true);
        speakAloud(result.message.text);
        return;
      }

      // Handle Honest Handoff (UX-28, UX-37)
      if (result.handoffItem) {
        setReviewQueue(prev => [result.handoffItem!, ...prev]);
      }

      // Standard Grounded Answer
      setUiState('speaking');
      setMessages(prev => [...prev, result.message]);
      speakAloud(result.message.text, 0.85, () => {}, () => {
        setUiState('idle');
      });
    }, 450);
  };

  // Add Prescription
  const handleAddPrescription = (newRx: Omit<Prescription, 'id' | 'prescribed_date' | 'status'>) => {
    const rxId = `rx-${Date.now()}`;
    const nextLineId = `L${dischargeLines.length + 1}`;

    const created: Prescription = {
      ...newRx,
      id: rxId,
      source_line_id: nextLineId,
      status: 'active',
      prescribed_date: "Today"
    };

    setPrescriptions(prev => [created, ...prev]);

    // Index into Discharge Summary lines
    setDischargeLines(prev => [
      ...prev,
      {
        id: nextLineId,
        category: 'medication',
        text: `Prescribed ${newRx.medicine_name} ${newRx.dose_text}: ${newRx.timing_text}. ${newRx.instructions}`
      }
    ]);

    // Generate active reminder
    setReminders(prev => [
      ...prev,
      {
        id: `rem-${Date.now()}`,
        medicine_name: newRx.medicine_name,
        dose_text: newRx.dose_text,
        timing_text: newRx.timing_text,
        time: "08:00 PM",
        taken: false,
        snoozed: false
      }
    ]);
  };

  const handleRemovePrescription = (id: string) => {
    setPrescriptions(prev => prev.filter(r => r.id !== id));
  };

  // Medication Reminder Handlers
  const handleAcknowledgeReminder = (id: string) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, taken: true, due_now: false } : r));
    setDueReminderAlert(null);
  };

  const handleSnoozeReminder = (id: string) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, snoozed: true, due_now: false } : r));
    setDueReminderAlert(null);
  };

  // Emergency Contact Handlers
  const handleAddEmergencyContact = (contact: Omit<EmergencyContact, 'id'>) => {
    const newContact: EmergencyContact = {
      ...contact,
      id: `emg-${Date.now()}`
    };
    setEmergencyContacts(prev => [...prev, newContact]);
  };

  const handleRemoveEmergencyContact = (id: string) => {
    setEmergencyContacts(prev => prev.filter(c => c.id !== id));
  };

  // Caretaker Walk Updater
  const handleUpdateWalk = (minutes: number) => {
    setRecovery(prev => {
      const isMet = minutes >= prev.walkingMinutes.goal;
      return {
        ...prev,
        healthScore: isMet ? Math.min(100, Math.max(prev.healthScore, 88)) : prev.healthScore,
        walkingMinutes: {
          ...prev.walkingMinutes,
          current: minutes,
          status: isMet ? 'Completed' : 'In Progress'
        }
      };
    });
  };

  // Caregiver Hub Actions
  const handleMarkAlertHandled = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, handled: true, handled_at: "Just now" } : a));
  };

  const handleSubmitReviewNote = (id: string, note: string) => {
    setReviewQueue(prev => prev.map(item => item.id === id ? { ...item, clinician_note: note, status: 'resolved' } : item));
  };

  // If in Landing Page mode, render the Rehab Clinic Landing Page
  if (viewMode === 'landing') {
    return (
      <HealthifyLandingPage
        onLaunchApp={(targetRole) => {
          if (targetRole) setRole(targetRole);
          setViewMode('app');
        }}
      />
    );
  }

  // App View Mode
  return (
    <div className={`min-h-screen ${highContrast ? 'high-contrast-mode bg-white' : 'bg-[#EBF3ED]'} text-slate-800 flex flex-col items-center justify-start p-0 sm:p-4 md:p-6 transition-colors duration-200`}>
      {/* Top Floating Control Bar */}
      <div className="w-full max-w-5xl mb-3 flex items-center justify-between px-3 py-2 bg-white/90 backdrop-blur-md rounded-2xl border border-emerald-200/80 shadow-xs text-xs font-semibold">
        {/* Back to Landing Page Button */}
        <button
          onClick={() => setViewMode('landing')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl transition-colors font-bold border border-emerald-200/70"
          title="Return to the Clinic Landing Page"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Clinic Website</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMobileFrame(!isMobileFrame)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-brand-50 hover:bg-brand-100 text-brand-700 rounded-lg transition-colors font-bold"
          >
            {isMobileFrame ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
            <span>{isMobileFrame ? 'Full-Screen' : 'Phone Frame'}</span>
          </button>

          <button
            onClick={() => setRole(role === 'patient' ? 'caregiver' : 'patient')}
            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-bold shadow-xs"
          >
            <span>Portal: {role === 'patient' ? 'Patient' : 'Doctor Hub'}</span>
          </button>
        </div>
      </div>

      {/* Main Container: Mobile Frame OR Full-Width View */}
      <div 
        className={`w-full transition-all duration-300 ${
          isMobileFrame 
            ? 'max-w-[412px] min-h-[840px] bg-white sm:rounded-[44px] shadow-2xl sm:border-[8px] sm:border-slate-800/90 relative overflow-hidden flex flex-col' 
            : 'max-w-2xl bg-white rounded-3xl shadow-xl border border-emerald-100 overflow-hidden flex flex-col'
        }`}
      >
        {/* Mobile Phone Top Notch / Status Bar */}
        {isMobileFrame && (
          <div className="pt-2 px-6 flex items-center justify-between text-slate-800 text-xs font-bold shrink-0 select-none z-30 bg-white">
            <span>18:30</span>
            <div className="w-4 h-4 bg-slate-900 rounded-full mx-auto -mt-0.5"></div>
            <div className="flex items-center gap-1.5 text-slate-700">
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4" />
            </div>
          </div>
        )}

        {/* Global Accessible Header */}
        <Header
          role={role}
          onOpenProfile={() => setShowProfileModal(true)}
          highContrast={highContrast}
          onToggleHighContrast={() => setHighContrast(!highContrast)}
          onOpenEmergency={() => setShowEmergencyModal(true)}
          onOpenFamily={() => setShowFamilyModal(true)}
          linkedCaregiversCount={linkedCaregivers.length}
          openAlertsCount={alerts.filter(a => !a.handled).length}
        />

        {/* Dynamic Screen Content */}
        <main className="flex-1 p-4 overflow-y-auto no-scrollbar relative">
          {currentTab === 'home' && (
            <HomeScreen
              recovery={recovery}
              reminders={reminders}
              onStartVoice={handleToggleVoice}
              isListening={isListening}
              onNavigateTab={(tab) => setCurrentTab(tab)}
              onAcknowledgeReminder={handleAcknowledgeReminder}
              onOpenDueReminder={(r) => setDueReminderAlert(r)}
              onOpenUpdateWalk={() => setShowUpdateWalkModal(true)}
            />
          )}

          {currentTab === 'overview' && (
            <OverviewScreen
              recovery={recovery}
              dischargeLines={dischargeLines}
            />
          )}

          {currentTab === 'assistant' && (
            <AssistantScreen
              messages={messages}
              onSendMessage={handleProcessUserQuery}
              isListening={isListening}
              onToggleVoice={handleToggleVoice}
              uiState={uiState}
              transcript={liveTranscript}
            />
          )}

          {currentTab === 'records' && (
            <RecordsScreen
              records={records}
              prescriptions={prescriptions}
              reminders={reminders}
              onAddPrescription={handleAddPrescription}
              onRemovePrescription={handleRemovePrescription}
              onAcknowledgeReminder={handleAcknowledgeReminder}
            />
          )}

          {currentTab === 'caregiver' && (
            <CaregiverDashboard
              alerts={alerts}
              reviewQueue={reviewQueue}
              reminders={reminders}
              appointments={appointments}
              walkingMinutes={recovery.walkingMinutes}
              onUpdateWalk={handleUpdateWalk}
              onMarkAlertHandled={handleMarkAlertHandled}
              onSubmitReviewNote={handleSubmitReviewNote}
            />
          )}
        </main>

        {/* Bottom Navigation Pill Bar */}
        <BottomNav
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          role={role}
          pendingReviewCount={reviewQueue.filter(r => r.status === 'pending').length}
        />
      </div>

      {/* Profile & Portal Switcher Modal */}
      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        role={role}
        onSelectRole={(newRole) => setRole(newRole)}
        linkedCaregiverName={linkedCaregivers[0]?.name}
      />

      {/* Global Interactive Modals */}
      <EmergencyModal
        isOpen={showEmergencyModal}
        onClose={() => {
          setShowEmergencyModal(false);
          setUiState('idle');
        }}
        contacts={emergencyContacts}
        onAddContact={handleAddEmergencyContact}
        onRemoveContact={handleRemoveEmergencyContact}
      />

      <FamilyPairingModal
        isOpen={showFamilyModal}
        onClose={() => setShowFamilyModal(false)}
        linkedCaregivers={linkedCaregivers}
        onRemoveCaregiver={(id) => setLinkedCaregivers(prev => prev.filter(c => c.id !== id))}
        onApproveCaregiver={(name) => {
          setLinkedCaregivers(prev => [
            ...prev,
            {
              id: `cg-${Date.now()}`,
              name,
              role: "Family Caregiver",
              linked_at: "Just now",
              status: "active"
            }
          ]);
        }}
      />

      <ConfirmActionModal
        isOpen={showConfirmModal}
        echoBackText={pendingConfirmAction?.details || ""}
        onConfirm={() => {
          if (pendingConfirmAction) pendingConfirmAction.action();
        }}
        onReject={() => {
          setShowConfirmModal(false);
          setPendingConfirmAction(null);
          setUiState('idle');
          const cancelMsg: ChatMessage = {
            id: `msg-${Date.now()}`,
            speaker: 'assistant',
            text: "All right, please say it again.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            ui_state: 'idle'
          };
          setMessages(prev => [...prev, cancelMsg]);
          speakAloud("All right, please say it again.");
        }}
      />

      <ReminderAlertModal
        isOpen={!!dueReminderAlert}
        reminder={dueReminderAlert}
        onAcknowledge={handleAcknowledgeReminder}
        onSnooze={handleSnoozeReminder}
      />

      <UpdateWalkModal
        isOpen={showUpdateWalkModal}
        onClose={() => setShowUpdateWalkModal(false)}
        currentMinutes={recovery.walkingMinutes.current}
        goalMinutes={recovery.walkingMinutes.goal}
        onSaveMinutes={handleUpdateWalk}
      />
    </div>
  );
}

export default App;
