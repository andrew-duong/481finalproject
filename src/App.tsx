import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Bell, FileText, CreditCard, Home, Menu, X, ChevronRight, ChevronDown, Download } from 'lucide-react';
import Icon from './imports/Icon';
import BackButton from './imports/BackButton';
import personLogo from "figma:asset/6832ab5189a31fc3a5769ff92b4f840a164ed71a.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import StaffApp from './StaffApp';
import { Logo } from './components/Logo';
import SignatureCanvas from 'react-signature-canvas';

// Helpers to safely parse/normalize dates coming from different event/form shapes
const safeEventDate = (event: any): Date | null => {
  if (!event) return null;
  const maybe = event.dateObj ?? event.date ?? null;
  if (!maybe) return null;
  const d = maybe instanceof Date ? maybe : new Date(maybe);
  return isNaN(d.getTime()) ? null : d;
};

const safeDueDate = (form: any): Date | null => {
  if (!form) return null;
  const maybe = form.dueDateObj ?? form.dueDate ?? null;
  if (!maybe) return null;
  const d = maybe instanceof Date ? maybe : new Date(maybe);
  return isNaN(d.getTime()) ? null : d;
};

type Screen = 
  | 'landing' 
  | 'login' 
  | 'register' 
  | 'forgot-password'
  | 'staff-login'
  | 'home' 
  | 'events' 
  | 'event-details'
  | 'my-children'
  | 'daily-activity' 
  | 'activity-details'
  | 'forms' 
  | 'form-view'
  | 'payments';

export default function App() {
  const [appMode, setAppMode] = useState<'parent' | 'staff'>('parent');
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [selectedChild, setSelectedChild] = useState('Rob');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [selectedForm, setSelectedForm] = useState<any>(null);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [loggedInParentId, setLoggedInParentId] = useState<string | null>(null);

  // Parent accounts - one per parentId
  const parentAccounts = [
    { parentId: 'p1', email: 'darren@sunnyview.com', password: 'cpsc481' },
    { parentId: 'p2', email: 'lindsay@sunnyview.com', password: 'cpsc481' },
    { parentId: 'p3', email: 'george@sunnyview.com', password: 'cpsc481' },
    { parentId: 'p4', email: 'sofia@sunnyview.com', password: 'cpsc481' },
    { parentId: 'p5', email: 'joanne@sunnyview.com', password: 'cpsc481' },
    { parentId: 'p6', email: 'paula@sunnyview.com', password: 'cpsc481' },
  ];

  const handleStaffLogout = () => {
    setAppMode('parent');
    setCurrentScreen('landing');
  };

  const handleParentLogin = (parentId: string) => {
    setLoggedInParentId(parentId);
  };

  const handleParentLogout = () => {
    setLoggedInParentId(null);
    setCurrentScreen('landing');
  };

  // Canonical shared children list used by both Parent and Staff apps
  const children = [
    {
      childId: "c1",
      parentId: "p1",
      name: "Noah Bennett",
      age: 4,
      allergies: "None",
      medical: "N/A",
      contact: "(888)-888-8888"
    },
    {
      childId: "c2",
      parentId: "p1",
      name: "Lucas Carter",
      age: 3,
      allergies: "Peanuts",
      medical: "N/A",
      contact: "(888)-888-8888"
    },
    {
      childId: "c3",
      parentId: "p2",
      name: "Ava Martinez",
      age: 5,
      allergies: "None",
      medical: "N/A",
      contact: "(888)-888-8888"
    },
    {
      childId: "c4",
      parentId: "p3",
      name: "Alex James",
      age: 5,
      allergies: "None",
      medical: "N/A",
      contact: "(888)-888-8888"
    },
    {
      childId: "c5",
      parentId: "p3",
      name: "Amy James",
      age: 4,
      allergies: "None",
      medical: "N/A",
      contact: "(888)-888-8888"
    },
    {
      childId: "c6",
      parentId: "p3",
      name: "Rob James",
      age: 6,
      allergies: "None",
      medical: "N/A",
      contact: "(888)-888-8888"
    },
    {
      childId: "c7",
      parentId: "p4",
      name: "Sofia Patel",
      age: 4,
      allergies: "Dairy",
      medical: "N/A",
      contact: "(888)-888-8888"
    },
    {
      childId: "c8",
      parentId: "p5",
      name: "Emma Parker",
      age: 3,
      allergies: "None",
      medical: "N/A",
      contact: "(888)-888-8888"
    },
    {
      childId: "c9",
      parentId: "p6",
      name: "Liam Thompson",
      age: 4,
      allergies: "None",
      medical: "Asthma",
      contact: "(888)-888-8888"
    }
  ];

  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Drumheller Field Trip',
      location: 'Royal Tyrrell Museum, Drumheller, AB',
      date: new Date(2025, 10, 7),
      startTime: '08:00am',
      endTime: '03:30pm',
      description: 'Visit the Royal Tyrrell Museum to explore dinosaur fossils and exhibits.',
      notes: 'Please pack a lunch, water, and comfortable walking shoes.',
      children: ['c1', 'c3', 'c6'],
      hasForm: true
    },
    {
      id: 2,
      title: 'Calgary Zoo Visit',
      location: 'Calgary Zoo, Calgary, AB',
      date: new Date(2025, 10, 14),
      startTime: '09:00am',
      endTime: '02:00pm',
      description: 'A day at the Calgary Zoo to learn about animals and conservation.',
      notes: 'Bring a water bottle and hat.',
      children: ['c2', 'c4'],
      hasForm: true
    },
    {
      id: 3,
      title: 'Telus Spark Science Center',
      location: 'TELUS Spark, Calgary, AB',
      date: new Date(2025, 10, 21),
      startTime: '10:00am',
      endTime: '03:00pm',
      description: 'Interactive science exhibits and workshops.',
      notes: 'Permission form required.',
      children: ['c5'],
      hasForm: true
    },
    {
      id: 4,
      title: 'Holiday Concert',
      location: 'Community Hall',
      date: new Date(2025, 11, 15),
      startTime: '06:00pm',
      endTime: '07:30pm',
      description: 'Annual holiday concert with songs and performances.',
      notes: 'Parents invited.',
      children: ['c6', 'c7'],
      hasForm: true
    },
    {
      id: 5,
      title: 'Winter Party',
      location: 'Sunnyview Daycare',
      date: new Date(2025, 11, 20),
      startTime: '01:00pm',
      endTime: '03:00pm',
      description: 'Indoor activities and treats to celebrate the season.',
      notes: 'Wear warm clothing.',
      children: ['c1', 'c2', 'c3', 'c4'],
      hasForm: true
    },
    {
      id: 6,
      title: 'Calgary Zoo Field Trip',
      location: 'Calgary Zoo, Calgary, AB',
      date: new Date(2025, 11, 12),
      startTime: '09:00am',
      endTime: '02:00pm',
      description: 'A day at the Calgary Zoo to learn about animals and conservation.',
      notes: 'Bring a water bottle and hat.',
      children: ['c6'],
      hasForm: true
    },
    {
      id: 7,
      title: 'Telus Spark Field Trip',
      location: 'TELUS Spark, Calgary, AB',
      date: new Date(2026, 0, 3),
      startTime: '10:00am',
      endTime: '03:00pm',
      description: 'Interactive science exhibits and workshops.',
      notes: 'Permission form required.',
      children: ['c6'],
      hasForm: true
    },
    {
      id: 8,
      title: 'Science Fair',
      location: 'Community Center',
      date: new Date(2025, 10, 15),
      startTime: '02:00pm',
      endTime: '05:00pm',
      description: 'Annual science fair with student projects.',
      notes: 'Bring your project by 1:00 PM.',
      children: ['c8'],
      hasForm: true
    },
    {
      id: 9,
      title: 'Art Gallery Visit',
      location: 'Local Art Gallery',
      date: new Date(2025, 11, 5),
      startTime: '10:00am',
      endTime: '12:00pm',
      description: 'Visit the local art gallery to explore various art exhibits.',
      notes: 'Meet at the main entrance.',
      children: ['c8'],
      hasForm: true
    }
  ]);

  

  // Activities/logs state - shared between parent and staff views
  const [activities, setActivities] = useState<any[]>([]);
  React.useEffect(() => {
    if (activities.length === 0) {
      setActivities([
        { 
          id: 1, 
          activityName: 'Nap Time', 
          startTime: '12:00pm', 
          endTime: '1:00pm',
          startHour: '12',
          startMinute: '00',
          startPeriod: 'PM',
          endHour: '01',
          endMinute: '00',
          endPeriod: 'PM',
          notes: 'All children rested well',
          children: [
            { childId: 'c6', name: 'Rob James', selected: true, behavioralNote: 'Woke up after 30 minutes' },
            { childId: 'c8', name: 'Emma Parker', selected: true, behavioralNote: 'Very calm and relaxed' },
            { childId: 'c9', name: 'Liam Thompson', selected: true, behavioralNote: '' },
          ]
        },
        { 
          id: 2, 
          activityName: 'Lunch', 
          startTime: '11:00am', 
          endTime: '12:00pm',
          startHour: '11',
          startMinute: '00',
          startPeriod: 'AM',
          endHour: '12',
          endMinute: '00',
          endPeriod: 'PM',
          notes: 'Served pasta and vegetables',
          children: [
            { childId: 'c6', name: 'Rob James', selected: true, behavioralNote: 'Good table manners' },
            { childId: 'c8', name: 'Emma Parker', selected: true, behavioralNote: '' },
            { childId: 'c9', name: 'Liam Thompson', selected: true, behavioralNote: 'Spilled water but cleaned up nicely' },
          ]
        },
      ]);
    }
  }, [activities.length]);

  const [allForms, setAllForms] = useState([
    // Event-linked forms (include parent fields for staff view)
    { id: 'f1', title: 'Drumheller Field Trip Permission Form', eventId: 1, childId: 'c1', dueDate: new Date('2025-11-05'), status: 'outstanding', parentName: '', emergencyContact: '', notes: '', signature: '' },
    { id: 'f2', title: 'Drumheller Field Trip Permission Form', eventId: 1, childId: 'c3', dueDate: new Date('2025-11-05'), status: 'pending', parentName: '', emergencyContact: '', notes: '', signature: '' },
    { id: 'f3', title: 'Drumheller Field Trip Permission Form', eventId: 1, childId: 'c6', dueDate: new Date('2025-11-05'), status: 'completed', parentName: '', emergencyContact: '', notes: '', signature: '' },
    { id: 'f4', title: 'Calgary Zoo Visit Permission Form', eventId: 2, childId: 'c2', dueDate: new Date('2025-11-12'), status: 'outstanding', parentName: '', emergencyContact: '', notes: '', signature: '' },
    { id: 'f5', title: 'Calgary Zoo Visit Permission Form', eventId: 2, childId: 'c4', dueDate: new Date('2025-11-12'), status: 'pending', parentName: '', emergencyContact: '', notes: '', signature: '' },
    { id: 'f6', title: 'Telus Spark Science Center Permission Form', eventId: 3, childId: 'c5', dueDate: new Date('2025-11-19'), status: 'outstanding', parentName: '', emergencyContact: '', notes: '', signature: '' },
    { id: 'f7', title: 'Holiday Concert Participation Form', eventId: 4, childId: 'c6', dueDate: new Date('2025-12-01'), status: 'pending', parentName: '', emergencyContact: '', notes: '', signature: '' },
    { id: 'f8', title: 'Holiday Concert Participation Form', eventId: 4, childId: 'c7', dueDate: new Date('2025-12-01'), status: 'completed', parentName: '', emergencyContact: '', notes: '', signature: '' },
    { id: 'f9', title: 'Winter Party Permission Form', eventId: 5, childId: 'c1', dueDate: new Date('2025-12-15'), status: 'outstanding', parentName: '', emergencyContact: '', notes: '', signature: '' },
    { id: 'f10', title: 'Winter Party Permission Form', eventId: 5, childId: 'c2', dueDate: new Date('2025-12-15'), status: 'pending', parentName: '', emergencyContact: '', notes: '', signature: '' },
    { id: 'f11', title: 'Winter Party Permission Form', eventId: 5, childId: 'c3', dueDate: new Date('2025-12-15'), status: 'completed', parentName: '', emergencyContact: '', notes: '', signature: '' },
    { id: 'f12', title: 'Winter Party Permission Form', eventId: 5, childId: 'c4', dueDate: new Date('2025-12-15'), status: 'pending', parentName: '', emergencyContact: '', notes: '', signature: '' },
    { id: 'f13', title: 'Calgary Zoo Field Trip Permission Form', eventId: 6, childId: 'c6', dueDate: new Date('2025-12-10'), status: 'outstanding', parentName: '', emergencyContact: '', notes: '', signature: '' },
    { id: 'f14', title: 'Telus Spark Field Trip Permission Form', eventId: 7, childId: 'c6', dueDate: new Date('2025-12-23'), status: 'pending', parentName: '', emergencyContact: '', notes: '', signature: '' },
    { id: 'f15', title: 'Science Fair Permission Form', eventId: 8, childId: 'c8', dueDate: new Date('2025-11-10'), status: 'completed', parentName: '', emergencyContact: '', notes: '', signature: '' },
    { id: 'f16', title: 'Art Gallery Visit Permission Form', eventId: 9, childId: 'c8', dueDate: new Date('2025-11-28'), status: 'outstanding', parentName: '', emergencyContact: '', notes: '', signature: '' },
  ]);


  // Sort forms: outstanding -> pending -> completed (by due date within each status)
  const forms = [...allForms].sort((a, b) => {
    // Status priority: outstanding (0) -> pending (1) -> completed (2)
    const statusPriority: { [key: string]: number } = { outstanding: 0, pending: 1, completed: 2 };
    const priorityDiff = (statusPriority[a.status] ?? 999) - (statusPriority[b.status] ?? 999);
    if (priorityDiff !== 0) return priorityDiff;
    // Within same status, sort by due date
    return (a.dueDate?.getTime() ?? 0) - (b.dueDate?.getTime() ?? 0);
  });

  const [allPayments, setAllPayments] = useState([
    // Tuition payments (eventId: null) - due on the 1st of each month
    { paymentId: 'p1', childId: 'c6', amount: 850.00, description: 'Monthly Tuition - November 2025', status: 'outstanding', eventId: null, dueDate: new Date('2025-11-01') },
    { paymentId: 'p2', childId: 'c8', amount: 850.00, description: 'Monthly Tuition - November 2025', status: 'outstanding', eventId: null, dueDate: new Date('2025-11-01') },
    { paymentId: 'p3', childId: 'c3', amount: 850.00, description: 'Monthly Tuition - November 2025', status: 'outstanding', eventId: null, dueDate: new Date('2025-11-01') },
    { paymentId: 'p4', childId: 'c7', amount: 850.00, description: 'Monthly Tuition - November 2025', status: 'outstanding', eventId: null, dueDate: new Date('2025-11-01') },
    
    // Event-related fees (due same day as form)
    { paymentId: 'p5', childId: 'c1', amount: 35.00, description: 'Drumheller Field Trip Fee', status: 'outstanding', eventId: 1, dueDate: new Date('2025-11-05') },
    { paymentId: 'p6', childId: 'c3', amount: 35.00, description: 'Drumheller Field Trip Fee', status: 'pending', eventId: 1, dueDate: new Date('2025-11-05') },
    { paymentId: 'p7', childId: 'c6', amount: 35.00, description: 'Drumheller Field Trip Fee', status: 'completed', eventId: 1, dueDate: new Date('2025-11-05') },
    { paymentId: 'p8', childId: 'c2', amount: 25.00, description: 'Calgary Zoo Visit Fee', status: 'outstanding', eventId: 2, dueDate: new Date('2025-11-12') },
    { paymentId: 'p9', childId: 'c4', amount: 25.00, description: 'Calgary Zoo Visit Fee', status: 'pending', eventId: 2, dueDate: new Date('2025-11-12') },
    { paymentId: 'p10', childId: 'c5', amount: 30.00, description: 'Telus Spark Science Center Fee', status: 'outstanding', eventId: 3, dueDate: new Date('2025-11-19') },
    { paymentId: 'p11', childId: 'c6', amount: 25.00, description: 'Holiday Concert Fee', status: 'pending', eventId: 4, dueDate: new Date('2025-12-01') },
    { paymentId: 'p12', childId: 'c7', amount: 25.00, description: 'Holiday Concert Fee', status: 'completed', eventId: 4, dueDate: new Date('2025-12-01') },
    { paymentId: 'p13', childId: 'c1', amount: 20.00, description: 'Winter Party Fee', status: 'outstanding', eventId: 5, dueDate: new Date('2025-12-15') },
    { paymentId: 'p14', childId: 'c2', amount: 20.00, description: 'Winter Party Fee', status: 'pending', eventId: 5, dueDate: new Date('2025-12-15') },
    { paymentId: 'p15', childId: 'c3', amount: 20.00, description: 'Winter Party Fee', status: 'completed', eventId: 5, dueDate: new Date('2025-12-15') },
    { paymentId: 'p16', childId: 'c4', amount: 20.00, description: 'Winter Party Fee', status: 'pending', eventId: 5, dueDate: new Date('2025-12-15') },
  ]);

  // Sort payments: outstanding -> pending -> completed (by description within each status)
  const payments = [...allPayments].sort((a, b) => {
    const statusPriority: { [key: string]: number } = { outstanding: 0, pending: 1, completed: 2 };
    const priorityDiff = (statusPriority[a.status] ?? 999) - (statusPriority[b.status] ?? 999);
    if (priorityDiff !== 0) return priorityDiff;
    return (a.description ?? '').localeCompare(b.description ?? '');
  });

  const navigate = (screen: Screen, data?: any) => {
    setCurrentScreen(screen);
    if (screen === 'event-details') {
      if (data?.event) {
        setSelectedEvent(data.event);
        if (data.childName) setSelectedChild(data.childName);
      } else {
        setSelectedEvent(data);
      }
    }
    if (screen === 'activity-details') setSelectedActivity(data);
    if (screen === 'form-view') setSelectedForm(data);
    if (screen === 'daily-activity' && data) setSelectedChild(data);
    if (screen === 'payments') setSelectedPayment(data || null);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <LandingScreen onNavigate={navigate} onStaffMode={() => navigate('login')} />;
      case 'login':
        return <LoginScreen onNavigate={navigate} parentAccounts={parentAccounts} onLogin={handleParentLogin} onStaffLogin={() => setAppMode('staff')} />;
      case 'register':
        return <RegisterScreen onNavigate={navigate} />;
      case 'forgot-password':
        return <ForgotPasswordScreen onNavigate={navigate} />;

      case 'home':
        return <HomeScreen onNavigate={navigate} events={events} children={children} loggedInParentId={loggedInParentId} onLogout={handleParentLogout} />;
      case 'events':
        return <EventsScreen events={events} children={children} onNavigate={navigate} loggedInParentId={loggedInParentId} onLogout={handleParentLogout} />;
      case 'event-details':
        return <EventDetailsScreen event={selectedEvent} forms={forms} payments={payments} selectedChild={selectedChild} children={children} onNavigate={navigate} />
      case 'my-children':
        return <MyChildrenScreen onNavigate={navigate} childrenList={children} loggedInParentId={loggedInParentId} onLogout={handleParentLogout} />;
      case 'daily-activity':
        return <DailyActivityScreen activities={activities} selectedChild={selectedChild} onNavigate={navigate} children={children} />;
      case 'activity-details':
        return <ActivityDetailsScreen activity={selectedActivity} onNavigate={navigate} />;
      case 'forms':
        return <FormsScreen forms={forms} children={children} onNavigate={navigate} loggedInParentId={loggedInParentId} onLogout={handleParentLogout} />;
      case 'form-view':
        return <FormViewScreen form={selectedForm} onNavigate={navigate} allForms={allForms} setAllForms={setAllForms} />;
      case 'payments':
        return <PaymentsScreen onNavigate={navigate} payments={payments} children={children} allPayments={allPayments} setAllPayments={setAllPayments} loggedInParentId={loggedInParentId} onLogout={handleParentLogout} selectedPaymentFromNav={selectedPayment} />;
      default:
        return <LandingScreen onNavigate={navigate} />;
    }
  };

  // If in staff mode, render StaffApp and pass canonical children list
  if (appMode === 'staff') {
    return <StaffApp onLogout={handleStaffLogout} childrenList={children} events={events} setEvents={setEvents} forms={forms} setForms={setAllForms} payments={payments} setPayments={setAllPayments} activities={activities} setActivities={setActivities} />;
  }

  return (
    <div className="min-h-screen bg-white">
      {renderScreen()}
    </div>
  );
}

// Logo Component is now imported from ./components/Logo

// Landing Screen
function LandingScreen({ onNavigate, onStaffMode }: { onNavigate: (screen: Screen) => void; onStaffMode?: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <div className="w-12 h-12 absolute -top-4 -left-4">
              <Icon />
            </div>
            <h1 className="text-4xl md:text-5xl relative" style={{ fontFamily: 'Angkor, cursive', color: '#000000', position: 'relative', zIndex: 1 }}>
              SUNNYVIEW DAYCARE
            </h1>
          </div>
          <img src={personLogo} alt="Person" className="w-32 h-32 mx-auto mb-6" />
        </div>

        <div className="space-y-4">
          <button
            onClick={() => onNavigate('login')}
            className="w-full bg-[#155323] hover:bg-[#0f3d1a] text-white py-4 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg"
            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '22px' }}
          >
            Login
          </button>
          
          <button
            onClick={() => onNavigate('register')}
            className="w-full bg-[#BF6A02] hover:bg-[#A55A02] text-white py-4 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg"
            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '22px' }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

// Login Screen
// Staff credentials
const STAFF_CREDENTIALS = [
  { email: 'alice@sunnyview.com', password: 'cpsc481' },
  { email: 'bob@sunnyview.com', password: 'cpsc481' },
  { email: 'carol@sunnyview.com', password: 'cpsc481' },
];

function LoginScreen({ onNavigate, parentAccounts, onLogin, onStaffLogin }: { onNavigate: (screen: Screen) => void; parentAccounts: any[]; onLogin: (parentId: string) => void; onStaffLogin: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleLogin = () => {
    const errors: string[] = [];
    if (!email.trim()) errors.push('Email is required');
    if (!password) errors.push('Password is required');
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors([]);

    // Check if staff
    const staffAccount = STAFF_CREDENTIALS.find(acc => acc.email === email && acc.password === password);
    if (staffAccount) {
      onStaffLogin();
      return;
    }

    // Check if parent
    const parentAccount = parentAccounts.find(acc => acc.email === email && acc.password === password);
    if (parentAccount) {
      onLogin(parentAccount.parentId);
      onNavigate('home');
      return;
    }

    setValidationErrors(['Invalid email or password']);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8">
        <div className="mb-6">
          <button 
            onClick={() => onNavigate('landing')}
            className="w-[30px] h-[29px] hover:opacity-80 transition-opacity"
          >
            <BackButton />
          </button>
        </div>

        {/* Branding on top */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            <div className="w-12 h-12 absolute -top-4 -left-4">
              <Icon />
            </div>
            <h1 className="text-4xl md:text-5xl relative" style={{ fontFamily: 'Angkor, cursive', color: '#000000', position: 'relative', zIndex: 1 }}>
              SUNNYVIEW DAYCARE
            </h1>
          </div>
          <img src={personLogo} alt="Person" className="w-32 h-32 mx-auto mb-6" />
        </div>

        <h2 className="text-4xl mb-8" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: '#191d21' }}>
          Login
        </h2>

        <div className="space-y-4">
          {validationErrors.length > 0 && (
            <div className="bg-red-50 border border-red-300 rounded-xl p-4">
              <h3 className="text-red-800 font-semibold mb-2">Please fix the following errors:</h3>
              <ul className="list-disc list-inside text-red-700 space-y-1">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <label className="block text-sm mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF6A02]"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF6A02]"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center gap-3 pl-3">
            <button
              onClick={() => setShowPassword(!showPassword)}
              className={`w-4 h-4 rounded border-2 border-[#155323] flex items-center justify-center transition-all ${
                showPassword ? 'bg-[#155323]' : 'bg-transparent'
              }`}
            >
              {showPassword && (
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <label className="text-xs text-gray-600 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              Show Password
            </label>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-[#191d21] hover:bg-[#2a2e32] text-white py-4 px-6 rounded-lg transition-all shadow-lg"
            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '22px' }}
          >
            Login
          </button>

          <button
            onClick={() => onNavigate('forgot-password')}
            className="w-full text-[#BF6A02] hover:underline text-center py-2"
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
}

// Register Screen
function RegisterScreen({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8">
        <div className="mb-6">
          <button 
            onClick={() => onNavigate('landing')}
            className="w-[30px] h-[29px] hover:opacity-80 transition-opacity"
          >
            <BackButton />
          </button>
        </div>

        {/* Branding on top */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            <div className="w-12 h-12 absolute -top-4 -left-4">
              <Icon />
            </div>
            <h1 className="text-4xl md:text-5xl relative" style={{ fontFamily: 'Angkor, cursive', color: '#000000', position: 'relative', zIndex: 1 }}>
              SUNNYVIEW DAYCARE
            </h1>
          </div>
          <img src={personLogo} alt="Person" className="w-32 h-32 mx-auto mb-6" />
        </div>

        <h2 className="text-4xl mb-8" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: '#191d21' }}>
          Register
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF6A02]"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF6A02]"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF6A02]"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF6A02]"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center gap-3 pl-3">
            <button
              onClick={() => setShowPassword(!showPassword)}
              className={`w-4 h-4 rounded border-2 border-[#155323] flex items-center justify-center transition-all ${
                showPassword ? 'bg-[#155323]' : 'bg-transparent'
              }`}
            >
              {showPassword && (
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <label className="text-xs text-gray-600 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              Show Password
            </label>
          </div>

          <button
            onClick={() => onNavigate('home')}
            className="w-full bg-[#191d21] hover:bg-[#2a2e32] text-white py-4 px-6 rounded-lg transition-all shadow-lg"
            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '22px' }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

// Forgot Password Screen
function ForgotPasswordScreen({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8">
        <div className="mb-6">
          <button 
            onClick={() => onNavigate('login')}
            className="w-[30px] h-[29px] hover:opacity-80 transition-opacity"
          >
            <BackButton />
          </button>
        </div>

        {/* Branding on top */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            <div className="w-12 h-12 absolute -top-4 -left-4">
              <Icon />
            </div>
            <h1 className="text-4xl md:text-5xl relative" style={{ fontFamily: 'Angkor, cursive', color: '#000000', position: 'relative', zIndex: 1 }}>
              SUNNYVIEW DAYCARE
            </h1>
          </div>
          <img src={personLogo} alt="Person" className="w-32 h-32 mx-auto mb-6" />
        </div>

        <h2 className="text-4xl mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: '#191d21' }}>
          Forgot Password
        </h2>
        <p className="text-gray-600 mb-8">Enter your email to reset your password</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF6A02]"
              placeholder="your.email@example.com"
            />
          </div>

          <button
            onClick={() => onNavigate('login')}
            className="w-full bg-[#191d21] hover:bg-[#2a2e32] text-white py-4 px-6 rounded-lg transition-all shadow-lg"
            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '22px' }}
          >
            Send Reset Link
          </button>
        </div>
      </div>
    </div>
  );
}

// Home Screen
function HomeScreen({ onNavigate, events, children, loggedInParentId, onLogout }: { onNavigate: (screen: Screen, data?: any) => void; events: any[]; children: any[]; loggedInParentId: string | null; onLogout: () => void }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showMenu, setShowMenu] = useState(false);

  // Filter children by logged-in parent
  const myChildren = loggedInParentId ? children.filter(child => child.parentId === loggedInParentId) : [];

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Filter events for current month (use safe parsing)
  const eventsInMonth = events.filter(event => {
    const d = safeEventDate(event);
    return d && d.getMonth() === currentMonth.getMonth() && d.getFullYear() === currentMonth.getFullYear();
  });

  // Get event dates as day numbers (safe)
  const eventDays = eventsInMonth
    .map(event => safeEventDate(event)?.getDate())
    .filter((n): n is number => typeof n === 'number');

  // Check if a day has an event
  const hasEvent = (day: number) => eventDays.includes(day);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center">
            <Logo size="small" />
            <button onClick={() => setShowMenu(!showMenu)} className="md:hidden">
              {showMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <button 
              onClick={onLogout}
              className="hidden md:block text-gray-600 hover:text-gray-900"
            >
              Logout
            </button>
          </div>

          {showMenu && (
            <div className="md:hidden mt-4 space-y-2">
              <button onClick={onLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Calendar */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
              {monthName}
            </h2>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
              >
                &lt;
              </button>
              <button 
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
              >
                &gt;
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                {day}
              </div>
            ))}
            
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const today = new Date();
              const isToday = day === today.getDate() && 
                             currentMonth.getMonth() === today.getMonth() && 
                             currentMonth.getFullYear() === today.getFullYear();
              const dayHasEvent = hasEvent(day);
              return (
                <div
                  key={day}
                  className={`text-center py-3 rounded-lg cursor-pointer relative ${
                    isToday 
                      ? 'bg-[#155323] text-white font-bold' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {day}
                  {dayHasEvent && (
                    <div className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full ${
                      isToday ? 'bg-white' : 'bg-[#BF6A02]'
                    }`}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Events for this month */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl mb-6" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
            Events This Month
          </h2>
          
          {eventsInMonth.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No events scheduled for this month</p>
          ) : (
            <div className="space-y-6">
              {myChildren.map(child => {
                const childEvents = eventsInMonth.filter((event: any) => event.children && event.children.includes(child.childId));
                if (childEvents.length === 0) return null;
                
                return (
                  <div key={child.childId}>
                    <h3 className="text-lg mb-3 text-[#155323]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                      {child.name}
                    </h3>
                    <div className="space-y-2">
                      {childEvents.map(event => (
                        <div 
                          key={event.id} 
                          className="flex items-center justify-between bg-[#f2f3f7] rounded-xl p-4 hover:shadow-md transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <div className="bg-[#BF6A02] text-white rounded-lg px-3 py-2 text-center min-w-[60px]">
                                <div className="text-xs">
                                  {(() => {
                                    const d = safeEventDate(event);
                                    return d ? d.toLocaleDateString('en-US', { month: 'short' }) : '';
                                  })()}
                                </div>
                                <div className="text-xl font-bold">
                                  {(() => {
                                    const d = safeEventDate(event);
                                    return d ? d.getDate() : '';
                                  })()}
                                </div>
                            </div>
                            <div>
                              <h4 className="font-semibold">{event.title}</h4>
                              <p className="text-sm text-gray-600">
                                {(() => {
                                  const d = safeEventDate(event);
                                  return d ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
                                })()}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              onNavigate('event-details', event);
                            }}
                            className="text-[#155323] hover:text-[#0d3a18] transition-colors"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav current="home" onNavigate={onNavigate} />
    </div>
  );
}

// Events Screen
function EventsScreen({ events, children, onNavigate, loggedInParentId, onLogout }: { events: any[]; children: any[]; onNavigate: (screen: Screen, data?: any) => void; loggedInParentId: string | null; onLogout: () => void }) {
  const [showMenu, setShowMenu] = useState(false);

  // Filter children by logged-in parent
  const myChildren = loggedInParentId ? children.filter(child => child.parentId === loggedInParentId) : [];

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="bg-white border-b border-gray-200 p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Logo size="small" />
            <button onClick={() => setShowMenu(!showMenu)}>
              {showMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {showMenu && (
            <div className="mb-4 space-y-2">
              <button onClick={onLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded">
                Logout
              </button>
            </div>
          )}

          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-2 flex justify-start">
              <button 
                onClick={() => onNavigate('home')}
                className="w-[30px] h-[29px] hover:opacity-80 transition-opacity"
              >
                <BackButton />
              </button>
            </div>
            <div className="col-span-8 bg-[rgba(191,106,2,0.19)] rounded-2xl p-4 text-center">
              <h1 className="text-2xl text-[#bf6a02]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                Upcoming Events
              </h1>
            </div>
            <div className="col-span-2"></div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <Tabs defaultValue={myChildren[0]?.name} className="w-full">
          <TabsList className="grid w-full mb-6" style={{ gridTemplateColumns: `repeat(${myChildren.length}, minmax(0, 1fr))` }}>
            {myChildren.map((child) => (
              <TabsTrigger key={child.childId} value={child.name} className="data-[state=active]:bg-[#155323] data-[state=active]:text-white">
                {child.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {myChildren.map((child) => (
            <TabsContent key={child.childId} value={child.name}>
              <div className="space-y-4">
                {events.filter((event: any) => event.children && event.children.includes(child.childId)).map(event => (
                  <div key={event.id} className="bg-[#f2f3f7] rounded-2xl p-6 flex justify-between items-center hover:shadow-lg transition-all">
                    <div>
                      <h3 className="text-lg mb-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {(() => {
                          const d = safeEventDate(event);
                          return d ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
                        })()}
                      </p>
                    </div>
                    <button
                      onClick={() => onNavigate('event-details', { event, childName: child.name })}
                      className="bg-[#155323] text-white px-6 py-3 rounded-xl hover:bg-[#0d3a18] transition-all"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                    >
                      Details
                    </button>
                  </div>
                ))}
                {events.filter((event: any) => event.children && event.children.includes(child.childId)).length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    No upcoming events for {child.name}
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <BottomNav current="events" onNavigate={onNavigate} />
    </div>
  );
}

// Event Details Screen
function EventDetailsScreen({ event, forms, payments, selectedChild, children, onNavigate }: { event: any; forms: any[]; payments: any[]; selectedChild: string; children: any[]; onNavigate: (screen: Screen, data?: any) => void }) {
  const [showMenu, setShowMenu] = useState(false);
  
  // Find the child object for the selected child
  const child = children.find(c => c.name === selectedChild);
  
  // Find the corresponding form for this event and child with outstanding status
  const eventForm = event && child ? forms.find(form => 
    form.eventId === event.id && form.childId === child.childId && form.status === 'outstanding'
  ) : null;

  // Find the corresponding payment for this event and child with outstanding status
  const eventPayment = event && child ? payments.find((payment: any) => 
    payment.eventId === event.id && payment.childId === child.childId && payment.status === 'outstanding'
  ) : null;

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white border-b border-gray-200 p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Logo size="small" />
            <button onClick={() => setShowMenu(!showMenu)}>
              {showMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {showMenu && (
            <div className="mb-4 space-y-2">
              <button onClick={() => onNavigate('landing')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded">
                Logout
              </button>
            </div>
          )}

          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-2 flex justify-start">
              <button 
                onClick={() => onNavigate('events')}
                className="w-[30px] h-[29px] hover:opacity-80 transition-opacity"
              >
                <BackButton />
              </button>
            </div>
            <div className="col-span-8 bg-[rgba(191,106,2,0.19)] rounded-2xl p-4 text-center">
              <h1 className="text-2xl text-[#bf6a02]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                {event?.title}
              </h1>
            </div>
            <div className="col-span-2"></div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="bg-[#f2f3f7] rounded-2xl p-6 md:p-8">
          {/* Location */}
          <div className="mb-6">
            <h3 className="text-xl mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              Location:
            </h3>
            <p className="text-[#0088ff] text-lg">
              {event?.location || 'Location not specified'}
            </p>
          </div>

          {/* Date */}
          <div className="mb-6">
            <h3 className="text-xl mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              Date:
            </h3>
            <p className="text-gray-600 text-lg">
              {(() => {
                const d = safeEventDate(event);
                return d ? d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) : 'Date not specified';
              })()}
            </p>
          </div>

          {/* Duration */}
          <div className="mb-6">
            <h3 className="text-xl mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              Duration:
            </h3>
            <p className="text-gray-600 text-lg">
              {event?.startTime && event?.endTime ? `${event.startTime}-${event.endTime}` : 'Duration not specified'}
            </p>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-xl mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              Description:
            </h3>
            <p className="text-gray-600">
              {event?.description || 'No description provided.'}
            </p>
          </div>

          {/* Notes */}
          <div className="mb-8">
            <h3 className="text-xl mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              Notes:
            </h3>
            <p className="text-gray-600">
              {event?.notes || 'No notes.'}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-center">
            {eventForm && (
              <button
                onClick={() => onNavigate('form-view', eventForm)}
                className="bg-[rgba(191,106,2,0.76)] hover:bg-[rgba(191,106,2,0.9)] text-white rounded-xl transition-all flex items-center justify-center"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, width: '101px', height: '42px' }}
              >
                Form
              </button>
            )}
            {eventPayment && (
              <button
                onClick={() => onNavigate('payments', eventPayment)}
                className="bg-[#009951] hover:bg-[#007a40] text-white rounded-xl transition-all flex items-center justify-center"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, width: '101px', height: '42px' }}
              >
                Pay Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// My Children Screen
function MyChildrenScreen({ onNavigate, childrenList, loggedInParentId, onLogout }: { onNavigate: (screen: Screen, data?: any) => void; childrenList: any[]; loggedInParentId: string | null; onLogout: () => void }) {
  const [showMenu, setShowMenu] = useState(false);
  
  // Filter children by logged-in parent's parentId
  const children = loggedInParentId 
    ? childrenList.filter(child => child.parentId === loggedInParentId)
    : [];

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="bg-white border-b border-gray-200 p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Logo size="small" />
            <button onClick={() => setShowMenu(!showMenu)}>
              {showMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {showMenu && (
            <div className="mb-4 space-y-2">
              <button onClick={onLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded">
                Logout
              </button>
            </div>
          )}

          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-2 flex justify-start">
              <button 
                onClick={() => onNavigate('home')}
                className="w-[30px] h-[29px] hover:opacity-80 transition-opacity"
              >
                <BackButton />
              </button>
            </div>
            <div className="col-span-8 bg-[rgba(191,106,2,0.19)] rounded-2xl p-4 text-center">
              <h1 className="text-2xl text-[#bf6a02]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                My Children
              </h1>
            </div>
            <div className="col-span-2"></div>
          </div>
          
          <p className="text-gray-600 mt-4 text-center">Select a child to view their daily activities</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {children.map(child => (
            <div 
              key={child.childId} 
              onClick={() => onNavigate('daily-activity', child.childId)}
              className="bg-gradient-to-br from-[#155323] to-[#0d3a18] text-white rounded-3xl p-8 hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl">
                    👶
                  </div>
                  <h2 className="text-3xl" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                    {child.name}
                  </h2>
                </div>
                <ChevronRight className="w-8 h-8" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav current="activity" onNavigate={onNavigate} />
    </div>
  );
}

// Daily Activity Screen
function DailyActivityScreen({ activities, selectedChild, onNavigate, children }: { activities: any[]; selectedChild: string; onNavigate: (screen: Screen, data?: any) => void; children: any[] }) {
  const [showMenu, setShowMenu] = useState(false);

  // Look up the child's name
  const child = children.find(c => c.childId === selectedChild);
  const childName = child?.name || 'Child';

  // Filter activities where the selected child participated (selectedChild is now childId)
  const childActivities = (Array.isArray(activities) ? activities : []).filter((a: any) =>
    Array.isArray(a.children) && a.children.some((c: any) => c.childId === selectedChild && c.selected)
  );

  const getBehavioralNote = (a: any) => {
    const entry = Array.isArray(a.children) ? a.children.find((c: any) => c.childId === selectedChild) : null;
    return entry?.behavioralNote || '';
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="bg-white border-b border-gray-200 p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Logo size="small" />
            <button onClick={() => setShowMenu(!showMenu)}>
              {showMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {showMenu && (
            <div className="mb-4 space-y-2">
              <button onClick={() => onNavigate('landing')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded">
                Logout
              </button>
            </div>
          )}

          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-2 flex justify-start">
              <button 
                onClick={() => onNavigate('my-children')}
                className="w-[30px] h-[29px] hover:opacity-80 transition-opacity"
              >
                <BackButton />
              </button>
            </div>
            <div className="col-span-8 bg-[rgba(191,106,2,0.19)] rounded-2xl p-4 text-center">
              <h1 className="text-2xl text-[#bf6a02]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                Daily Activity
              </h1>
            </div>
            <div className="col-span-2"></div>
          </div>
          
          <p className="text-gray-600 mt-4 text-center">Viewing activities for {childName}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {childActivities.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">There are no activities for {childName}</p>
          </div>
        ) : (
          <Accordion type="single" collapsible className="space-y-4">
          {childActivities.map((activity: any) => (
            <AccordionItem key={activity.id} value={`item-${activity.id}`} className="bg-[#f2f3f7] rounded-2xl border-none">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex justify-between items-start w-full pr-4">
                  <div className="text-left">
                    <h3 className="text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                      {activity.activityName}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{activity.startTime} - {activity.endTime}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-4 pt-2">
                  <div>
                    <h4 className="text-base mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>Notes</h4>
                    <p className="text-gray-700">{activity.notes}</p>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <h4 className="text-base mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>Behavioral Notes</h4>
                    <p className="text-gray-700">{getBehavioralNote(activity) || 'None'}</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        )}
      </div>

      <BottomNav current="activity" onNavigate={onNavigate} />
    </div>
  );
}

// Activity Details Screen
function ActivityDetailsScreen({ activity, onNavigate }: { activity: any; onNavigate: (screen: Screen) => void }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white border-b border-gray-200 p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <button 
              onClick={() => onNavigate('daily-activity')}
              className="w-[30px] h-[29px] hover:opacity-80 transition-opacity flex-shrink-0"
            >
              <BackButton />
            </button>
            <Logo size="small" />
          </div>
          <h1 className="text-3xl md:text-4xl" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
            {activity?.title}
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <div className="mb-6">
            <h3 className="text-xl mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>Date & Time</h3>
            <p className="text-gray-600 text-lg">{activity?.date} at {activity?.time}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>Description</h3>
            <p className="text-gray-600 text-lg">{activity?.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>Notes</h3>
            <p className="text-gray-600">
              {activity?.title.includes('Morning') && 'Rob had a great time building with blocks and listening to stories about dinosaurs.'}
              {activity?.title.includes('Snack') && 'Rob ate well and asked for seconds!'}
              {activity?.title.includes('Outdoor') && 'Rob enjoyed the slide and playing with friends.'}
            </p>
          </div>

          <div className="bg-[#f2f3f7] rounded-xl p-4">
            <h3 className="text-lg mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>Behavioral Notes</h3>
            <p className="text-gray-600">
              {activity?.title.includes('Morning') && 'Rob shared well with others and followed instructions during activities.'}
              {activity?.title.includes('Snack') && 'Rob used good manners and cleaned up after himself.'}
              {activity?.title.includes('Outdoor') && 'Rob took turns on equipment and was kind to classmates.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Forms Screen
function FormsScreen({ forms, children, onNavigate, loggedInParentId, onLogout }: { forms: any[]; children: any[]; onNavigate: (screen: Screen, data?: any) => void; loggedInParentId: string | null; onLogout: () => void }) {
  const [showMenu, setShowMenu] = useState(false);

  // Filter children by logged-in parent
  const myChildren = loggedInParentId ? children.filter(child => child.parentId === loggedInParentId) : [];

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="bg-white border-b border-gray-200 p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Logo size="small" />
            <button onClick={() => setShowMenu(!showMenu)}>
              {showMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {showMenu && (
            <div className="mb-4 space-y-2">
              <button onClick={onLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded">
                Logout
              </button>
            </div>
          )}

          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-2 flex justify-start">
              <button 
                onClick={() => onNavigate('home')}
                className="w-[30px] h-[29px] hover:opacity-80 transition-opacity"
              >
                <BackButton />
              </button>
            </div>
            <div className="col-span-8 bg-[rgba(191,106,2,0.19)] rounded-2xl p-4 text-center">
              <h1 className="text-2xl text-[#bf6a02]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                Forms
              </h1>
            </div>
            <div className="col-span-2"></div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <Tabs defaultValue={myChildren[0]?.name} className="w-full">
          <TabsList className="grid w-full mb-6" style={{ gridTemplateColumns: `repeat(${myChildren.length}, minmax(0, 1fr))` }}>
            {myChildren.map((child) => (
              <TabsTrigger key={child.childId} value={child.name} className="data-[state=active]:bg-[#155323] data-[state=active]:text-white">
                {child.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {myChildren.map((child) => (
            <TabsContent key={child.childId} value={child.name}>
              <div className="space-y-4">
                {forms.filter(form => form.childId === child.childId).map(form => (
                  <div key={form.id} className={`rounded-2xl p-6 flex justify-between items-center hover:shadow-lg transition-all ${
                    form.status === 'completed' ? 'bg-green-50' : form.status === 'pending' ? 'bg-yellow-50' : 'bg-[#f2f3f7]'
                  }`}>
                    <div className="flex-1">
                      <h3 className="text-lg mb-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                        {form.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Due: {form.dueDate ? form.dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                      </p>
                      <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold`}
                        style={{
                          backgroundColor: form.status === 'completed' ? '#10b981' : form.status === 'pending' ? '#eab308' : '#ef4444',
                          color: 'white'
                        }}>
                        {form.status.charAt(0).toUpperCase() + form.status.slice(1)}
                      </span>
                    </div>
                    <div className="w-24 flex-shrink-0 ml-4">
                      {form.status === 'outstanding' && (
                        <button
                          onClick={() => onNavigate('form-view', form)}
                          className="w-full bg-[#155323] text-white rounded-xl hover:bg-[#0d3a18] transition-all whitespace-nowrap flex items-center justify-center"
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, height: '42px' }}
                        >
                          Fill Out
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {forms.filter(form => form.childId === child.childId).length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    No forms for {child.name}
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <BottomNav current="forms" onNavigate={onNavigate} />
    </div>
  );
}

// Form View Screen
function FormViewScreen({ form, onNavigate, allForms, setAllForms }: { form: any; onNavigate: (screen: Screen) => void; allForms: any[]; setAllForms: (forms: any[]) => void }) {
  const [isConsentChecked, setIsConsentChecked] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const signatureRef = useRef<SignatureCanvas>(null);
  const [parentName, setParentName] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [notes, setNotes] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showSuccessPage, setShowSuccessPage] = useState(false);

  useEffect(() => {
    if (form) {
      setParentName(form.parentName ?? '');
      setEmergencyContact(form.emergencyContact ?? '');
      setNotes(form.notes ?? '');
    }
  }, [form]);

  const handleClearSignature = () => {
    signatureRef.current?.clear();
  };

  const handleDownloadPDF = () => {
    // Mock PDF download - in a real app, this would generate and download a PDF
    alert('PDF download would start here. In a real application, this would generate a PDF of the form.');
  };

  return (
    <div className="min-h-screen bg-white">
      {showSuccessPage ? (
        // Success Page
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-lg p-8 text-center max-w-md w-full">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-3xl mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: '#155323' }}>
              Form Submitted Successfully!
            </h2>
            
            <p className="text-gray-600 mb-6">Your form has been submitted and is now pending review. We'll notify you once it has been processed.</p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left space-y-2">
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Form</p>
                <p className="font-semibold">{form?.title}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Parent/Guardian</p>
                <p className="font-semibold">{parentName}</p>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2">
                <p className="text-sm text-gray-600">Status</p>
                <p className="font-semibold text-[#eab308]">Pending Review</p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('forms')}
              className="w-full bg-[#155323] text-white py-4 px-6 rounded-xl hover:bg-[#0d3a18] transition-all shadow-lg"
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '18px' }}
            >
              Return to Forms
            </button>
          </div>
        </div>
      ) : (
        <>
      <div className="bg-white border-b border-gray-200 p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Logo size="small" />
            <button onClick={() => setShowMenu(!showMenu)}>
              {showMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {showMenu && (
            <div className="mb-4 space-y-2">
              <button onClick={() => onNavigate('landing')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded">
                Logout
              </button>
            </div>
          )}

          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-2 flex justify-start">
              <button 
                onClick={() => onNavigate('forms')}
                className="w-[30px] h-[29px] hover:opacity-80 transition-opacity"
              >
                <BackButton />
              </button>
            </div>
            <div className="col-span-8 bg-[rgba(191,106,2,0.19)] rounded-2xl p-4 text-center">
              <h1 className="text-2xl text-[#bf6a02]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                {form?.title}
              </h1>
            </div>
            <div className="col-span-2"></div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <div className="space-y-6">
            {/* Download PDF Section */}
            <div className="bg-[#f2f3f7] rounded-xl p-6">
              <h3 className="text-lg mb-3" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                Form Document
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Download a copy of this form for your records
              </p>
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 bg-[#BF6A02] hover:bg-[#A55A02] text-white py-3 px-6 rounded-lg transition-all shadow-md"
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
              >
                <Download className="w-5 h-5" />
                Download PDF
              </button>
            </div>

            <div>
              <label className="block text-sm mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                Parent/Guardian Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF6A02]"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                Emergency Contact <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF6A02]"
                placeholder="(555) 555-5555"
              />
            </div>

            <div>
              <label className="block text-sm mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                Additional Notes
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF6A02]"
                rows={4}
                placeholder="Any additional information..."
              />
            </div>

            {/* E-Signature Section */}
            <div>
              <label className="block text-sm mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                E-Signature *
              </label>
              <p className="text-xs text-gray-600 mb-2">
                Please sign in the box below using your finger or mouse
              </p>
              <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
                <SignatureCanvas
                  ref={signatureRef}
                  canvasProps={{
                    className: 'w-full h-40 bg-white',
                    style: { touchAction: 'none' }
                  }}
                  backgroundColor="white"
                />
              </div>
              <button
                onClick={handleClearSignature}
                className="mt-2 text-sm text-[#BF6A02] hover:text-[#A55A02] transition-colors"
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}
              >
                Clear Signature
              </button>
            </div>

            <div className="flex items-start gap-3 pl-3">
              <button
                onClick={() => setIsConsentChecked(!isConsentChecked)}
                className={`w-5 h-5 flex-shrink-0 rounded border-2 border-[#155323] flex items-center justify-center transition-all ${
                  isConsentChecked ? 'bg-[#155323]' : 'bg-transparent'
                }`}
              >
                {isConsentChecked && (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
              <label 
                className="text-sm text-gray-600 cursor-pointer flex-1"
                onClick={() => setIsConsentChecked(!isConsentChecked)}
              >
                I consent to the information provided and understand the terms and conditions. <span className="text-red-500">*</span>
              </label>
            </div>
            {validationErrors.length > 0 && (
              <div className="bg-red-50 border border-red-300 rounded-lg p-4">
                <p className="text-sm font-semibold text-red-800 mb-2">Please correct the following errors:</p>
                <ul className="list-disc list-inside space-y-1">
                  {validationErrors.map((error, index) => (
                    <li key={index} className="text-sm text-red-700">{error}</li>
                  ))}
                </ul>
              </div>
            )}
            <button
              onClick={() => {
                // Validate required fields
                const errors: string[] = [];
                
                if (!parentName.trim()) {
                  errors.push('Parent/Guardian Name is required');
                }
                
                if (!emergencyContact.trim()) {
                  errors.push('Emergency Contact is required');
                }
                
                // Check if signature canvas is empty
                const hasSignature = signatureRef.current && !signatureRef.current.isEmpty();
                if (!hasSignature) {
                  errors.push('E-Signature is required');
                }
                
                if (!isConsentChecked) {
                  errors.push('You must consent to the terms and conditions');
                }
                
                // If there are validation errors, display them and don't submit
                if (errors.length > 0) {
                  setValidationErrors(errors);
                  return;
                }
                
                // Clear any previous validation errors
                setValidationErrors([]);
                
                // Capture signature as data URL (if present)
                const signatureData = signatureRef.current && !signatureRef.current.isEmpty()
                  ? signatureRef.current.toDataURL('image/png')
                  : '';

                // Update form with parent fields and set status to pending
                const updatedForms = allForms.map(f => 
                  f.id === form.id ? { ...f, status: 'pending', parentName, emergencyContact, notes, signature: signatureData } : f
                );
                setAllForms(updatedForms);
                
                // Show success page
                setShowSuccessPage(true);
              }}
              className="w-full bg-[#155323] text-white py-4 px-6 rounded-xl hover:bg-[#0d3a18] transition-all shadow-lg"
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '18px' }}
            >
              Submit Form
            </button>
          </div>
        </div>
      </div>
      </>
      )}
    </div>
  );
}

// Payments Screen
function PaymentsScreen({ onNavigate, payments, children, allPayments, setAllPayments, loggedInParentId, onLogout, selectedPaymentFromNav }: { onNavigate: (screen: Screen, data?: any) => void; payments: any[]; children: any[]; allPayments: any[]; setAllPayments: (payments: any[]) => void; loggedInParentId: string | null; onLogout: () => void; selectedPaymentFromNav?: any }) {
  const [step, setStep] = useState(1);
    // Auto-navigate to step 2 if a payment was passed via navigation
    useEffect(() => {
      if (selectedPaymentFromNav) {
        setSelectedPayment(selectedPaymentFromNav);
        setStep(2);
      }
    }, [selectedPaymentFromNav]);

  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Filter children by logged-in parent
  const myChildren = loggedInParentId ? children.filter(child => child.parentId === loggedInParentId) : [];

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="bg-white border-b border-gray-200 p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Logo size="small" />
            <button onClick={() => setShowMenu(!showMenu)}>
              {showMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {showMenu && (
            <div className="mb-4 space-y-2">
              <button onClick={onLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded">
                Logout
              </button>
            </div>
          )}

          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-2 flex justify-start">
              <button 
                onClick={() => onNavigate('home')}
                className="w-[30px] h-[29px] hover:opacity-80 transition-opacity"
              >
                <BackButton />
              </button>
            </div>
            <div className="col-span-8 bg-[rgba(191,106,2,0.19)] rounded-2xl p-4 text-center">
              <h1 className="text-2xl text-[#bf6a02]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                Payments
              </h1>
            </div>
            <div className="col-span-2"></div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {step === 1 && (
          <Tabs defaultValue={myChildren[0]?.name} className="w-full">
            <TabsList className="grid w-full mb-6" style={{ gridTemplateColumns: `repeat(${myChildren.length}, minmax(0, 1fr))` }}>
              {myChildren.map((child) => (
                <TabsTrigger key={child.childId} value={child.name} className="data-[state=active]:bg-[#155323] data-[state=active]:text-white">
                  {child.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {myChildren.map((child) => (
              <TabsContent key={child.childId} value={child.name}>
                <div className="space-y-4">
                  {payments.filter(payment => payment.childId === child.childId).map(payment => (
                    <div key={payment.paymentId} className={`rounded-xl p-6 hover:shadow-md transition-shadow border-l-4 ${
                      payment.status === 'outstanding' ? 'bg-[#f2f3f7] border-[#ef4444]' :
                      payment.status === 'pending' ? 'bg-white border-[#eab308]' :
                      'bg-green-50 border-green-500'
                    }`}>
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                            {payment.description}
                          </h3>
                          <p className="text-2xl font-semibold text-[#BF6A02] mb-2">${payment.amount.toFixed(2)}</p>
                          <p className="text-sm text-gray-600 mb-2">Due: {payment.dueDate ? payment.dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}</p>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold`}
                            style={{
                              backgroundColor: payment.status === 'completed' ? '#10b981' : payment.status === 'pending' ? '#eab308' : '#ef4444',
                              color: 'white'
                            }}>
                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                          </span>
                        </div>
                        {payment.status === 'outstanding' && (
                          <button
                            onClick={() => {
                              setSelectedPayment(payment);
                              setStep(2);
                            }}
                            className="bg-[#155323] text-white py-3 px-6 rounded-xl hover:bg-[#0d3a18] transition-all whitespace-nowrap flex items-center justify-center"
                            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                          >
                            Pay Now
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}

        {step === 2 && selectedPayment && (
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl mb-6" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
              Payment Information
            </h2>

            {/* Payment Summary */}
            <div className="bg-[#f2f3f7] rounded-xl p-6 mb-6">
              <h3 className="text-lg mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                Payment Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Description:</span>
                  <span className="font-semibold">{selectedPayment.description}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="text-xl font-semibold text-[#BF6A02]">${selectedPayment.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-semibold">{selectedPayment.status}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                  Cardholder Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF6A02]"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                  Card Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF6A02]"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                    Expiry Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF6A02]"
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                    CVV <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF6A02]"
                    placeholder="123"
                    maxLength={4}
                  />
                </div>
              </div>
            </div>

            {validationErrors.length > 0 && (
              <div className="bg-red-50 border border-red-300 rounded-lg p-4 mb-4">
                <p className="text-sm font-semibold text-red-800 mb-2">Please correct the following errors:</p>
                <ul className="list-disc list-inside space-y-1">
                  {validationErrors.map((error, index) => (
                    <li key={index} className="text-sm text-red-700">{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={() => {
                // Validate all fields
                const errors: string[] = [];
                
                if (!cardholderName.trim()) {
                  errors.push('Cardholder Name is required');
                }
                
                if (!cardNumber.trim()) {
                  errors.push('Card Number is required');
                } else if (cardNumber.replace(/\s/g, '').length < 13) {
                  errors.push('Card Number must be at least 13 digits');
                }
                
                if (!expiryDate.trim()) {
                  errors.push('Expiry Date is required');
                } else if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
                  errors.push('Expiry Date must be in MM/YY format');
                }
                
                if (!cvv.trim()) {
                  errors.push('CVV is required');
                } else if (cvv.length < 3) {
                  errors.push('CVV must be at least 3 digits');
                }
                
                // If there are validation errors, display them and don't submit
                if (errors.length > 0) {
                  setValidationErrors(errors);
                  return;
                }
                
                // Clear validation errors
                setValidationErrors([]);
                
                // Update payment status to pending
                const updatedPayments = allPayments.map(p =>
                  p.paymentId === selectedPayment.paymentId ? { ...p, status: 'pending' } : p
                );
                setAllPayments(updatedPayments);
                setStep(3);
              }}
              className="w-full bg-[#155323] text-white py-4 px-6 rounded-xl hover:bg-[#0d3a18] transition-all shadow-lg"
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '18px' }}
            >
              Complete Payment
            </button>
          </div>
        )}

        {step === 3 && selectedPayment && (
          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-3xl mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: '#155323' }}>
              Payment Successful!
            </h2>
            
            <p className="text-gray-600 mb-6">Your payment of {selectedPayment.amount} for {selectedPayment.name} has been processed successfully.</p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left space-y-2">
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Fee Name</p>
                <p className="font-semibold">{selectedPayment.name}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Amount Paid</p>
                <p className="font-semibold text-[#155323]">{selectedPayment.amount}</p>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2">
                <p className="text-sm text-gray-600">Transaction ID</p>
                <p className="font-semibold">TXN-2025-110301</p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('home')}
              className="w-full bg-[#155323] text-white py-4 px-6 rounded-xl hover:bg-[#0d3a18] transition-all shadow-lg"
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '18px' }}
            >
              Return to Home
            </button>
          </div>
        )}
      </div>

      <BottomNav current="payments" onNavigate={onNavigate} />
    </div>
  );
}

// Bottom Navigation Component
function BottomNav({ current, onNavigate }: { current: string; onNavigate: (screen: Screen) => void }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home, screen: 'home' as Screen },
    { id: 'events', label: 'Events', icon: Calendar, screen: 'events' as Screen },
    { id: 'activity', label: 'Activity', icon: Bell, screen: 'my-children' as Screen },
    { id: 'forms', label: 'Forms', icon: FileText, screen: 'forms' as Screen },
    { id: 'payments', label: 'Pay', icon: CreditCard, screen: 'payments' as Screen },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#8AA991]">
      <div className="flex justify-around items-center py-2">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = current === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.screen)}
              className={`flex flex-col items-center p-2 ${
                isActive ? 'text-white' : 'text-black'
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
