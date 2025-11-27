import React, { useState, useRef } from 'react';
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

  const handleStaffLogout = () => {
    setAppMode('parent');
    setCurrentScreen('landing');
  };

  // Sample data
  const children = [
    { id: 1, name: 'Rob' },
    { id: 2, name: 'Emma' },
  ];

  const events = [
    { id: 1, title: 'Drumheller Field Trip', date: 'November 7, 2025', dateObj: new Date(2025, 10, 7), child: 'Rob' },
    { id: 2, title: 'Calgary Zoo Field Trip', date: 'December 12, 2025', dateObj: new Date(2025, 11, 12), child: 'Rob' },
    { id: 3, title: 'Telus Spark Field Trip', date: 'January 3, 2026', dateObj: new Date(2026, 0, 3), child: 'Rob' },
    { id: 4, title: 'Science Fair', date: 'November 15, 2025', dateObj: new Date(2025, 10, 15), child: 'Emma' },
    { id: 5, title: 'Art Gallery Visit', date: 'December 5, 2025', dateObj: new Date(2025, 11, 5), child: 'Emma' },
  ];

  const activities = [
    { 
      id: 1, 
      date: 'Nov 3', 
      title: 'Morning Activities', 
      child: 'Rob', 
      timeStart: '9:00 AM',
      timeEnd: '10:30 AM',
      notes: 'Rob had a great time building with blocks and listening to stories about dinosaurs.',
      behavioralNotes: 'Rob shared well with others and followed instructions during activities.'
    },
    { 
      id: 2, 
      date: 'Nov 2', 
      title: 'Afternoon Snack', 
      child: 'Rob', 
      timeStart: '2:30 PM',
      timeEnd: '3:00 PM',
      notes: 'Rob ate well and asked for seconds!',
      behavioralNotes: 'Rob used good manners and cleaned up after himself.'
    },
    { 
      id: 3, 
      date: 'Nov 1', 
      title: 'Outdoor Play', 
      child: 'Rob', 
      timeStart: '10:30 AM',
      timeEnd: '11:30 AM',
      notes: 'Rob enjoyed the slide and playing with friends.',
      behavioralNotes: 'Rob took turns on equipment and was kind to classmates.'
    },
  ];

  const allForms = [
    { id: 1, title: 'Drumheller Field Trip Permission Form', dueDate: 'Nov 5, 2025', dueDateObj: new Date('2025-11-05'), status: 'pending', child: 'Rob' },
    { id: 2, title: 'Emergency Contact Update', dueDate: 'Nov 10, 2025', dueDateObj: new Date('2025-11-10'), status: 'pending', child: 'Rob' },
    { id: 3, title: 'Calgary Zoo Field Trip Permission Form', dueDate: 'Dec 10, 2025', dueDateObj: new Date('2025-12-10'), status: 'pending', child: 'Rob' },
    { id: 4, title: 'Telus Spark Field Trip Permission Form', dueDate: 'Dec 30, 2025', dueDateObj: new Date('2025-12-30'), status: 'pending', child: 'Rob' },
    { id: 5, title: 'Medical Information Update', dueDate: 'Completed', dueDateObj: new Date('2025-10-15'), status: 'completed', child: 'Rob' },
    { id: 6, title: 'Science Fair Permission Form', dueDate: 'Nov 12, 2025', dueDateObj: new Date('2025-11-12'), status: 'pending', child: 'Emma' },
    { id: 7, title: 'Art Gallery Permission Form', dueDate: 'Dec 2, 2025', dueDateObj: new Date('2025-12-02'), status: 'pending', child: 'Emma' },
  ];

  // Sort forms: pending first (by earliest due date), then completed
  const forms = allForms.sort((a, b) => {
    // If statuses are different, pending comes first
    if (a.status !== b.status) {
      return a.status === 'pending' ? -1 : 1;
    }
    // If both have same status, sort by due date
    return a.dueDateObj.getTime() - b.dueDateObj.getTime();
  });

  const payments = [
    { id: 1, name: 'Monthly Tuition - Rob', amount: '$850.00', dueDate: 'November 30, 2025', description: 'Monthly tuition payment for Rob', child: 'Rob' },
    { id: 2, name: 'Activity Fee', amount: '$50.00', dueDate: 'November 15, 2025', description: 'Activity fee for special programs and materials', child: 'Rob' },
    { id: 3, name: 'Drumheller Field Trip Fee', amount: '$35.00', dueDate: 'November 7, 2025', description: 'Field trip to Drumheller Royal Tyrrell Museum', child: 'Rob' },
    { id: 4, name: 'Monthly Tuition - Emma', amount: '$850.00', dueDate: 'November 30, 2025', description: 'Monthly tuition payment for Emma', child: 'Emma' },
    { id: 5, name: 'Art Supplies Fee', amount: '$25.00', dueDate: 'November 20, 2025', description: 'Art supplies fee for creative activities', child: 'Emma' },
  ];

  const navigate = (screen: Screen, data?: any) => {
    setCurrentScreen(screen);
    if (screen === 'event-details') setSelectedEvent(data);
    if (screen === 'activity-details') setSelectedActivity(data);
    if (screen === 'form-view') setSelectedForm(data);
    if (screen === 'daily-activity' && data) setSelectedChild(data);
    if (screen === 'payments') setSelectedPayment(data || null);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <LandingScreen onNavigate={navigate} onStaffMode={() => navigate('staff-login')} />;
      case 'login':
        return <LoginScreen onNavigate={navigate} />;
      case 'register':
        return <RegisterScreen onNavigate={navigate} />;
      case 'forgot-password':
        return <ForgotPasswordScreen onNavigate={navigate} />;
      case 'staff-login':
        return <StaffLoginScreen onNavigate={navigate} onStaffLogin={() => setAppMode('staff')} />;
      case 'home':
        return <HomeScreen onNavigate={navigate} events={events} children={children} />;
      case 'events':
        return <EventsScreen events={events} children={children} onNavigate={navigate} />;
      case 'event-details':
        return <EventDetailsScreen event={selectedEvent} forms={forms} payments={payments} onNavigate={navigate} />;
      case 'my-children':
        return <MyChildrenScreen onNavigate={navigate} />;
      case 'daily-activity':
        return <DailyActivityScreen activities={activities} selectedChild={selectedChild} onNavigate={navigate} />;
      case 'activity-details':
        return <ActivityDetailsScreen activity={selectedActivity} onNavigate={navigate} />;
      case 'forms':
        return <FormsScreen forms={forms} children={children} onNavigate={navigate} />;
      case 'form-view':
        return <FormViewScreen form={selectedForm} onNavigate={navigate} />;
      case 'payments':
        return <PaymentsScreen onNavigate={navigate} paymentData={selectedPayment} payments={payments} children={children} />;
      default:
        return <LandingScreen onNavigate={navigate} />;
    }
  };

  // If in staff mode, render StaffApp
  if (appMode === 'staff') {
    return <StaffApp onLogout={handleStaffLogout} />;
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
            className="w-full bg-[#BF6A02] hover:bg-[#A55A02] text-white py-4 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg"
            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '22px' }}
          >
            Parent Login
          </button>
          
          <button
            onClick={() => onNavigate('register')}
            className="w-full bg-[#BF6A02] hover:bg-[#A55A02] text-white py-4 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg"
            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '22px' }}
          >
            Register
          </button>

          <button
            onClick={() => onStaffMode && onStaffMode()}
            className="w-full bg-[#155323] hover:bg-[#0f3d1a] text-white py-4 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg"
            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '22px' }}
          >
            Staff Login
          </button>
        </div>
      </div>
    </div>
  );
}

// Login Screen
function LoginScreen({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
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
          Login
        </h2>

        <div className="space-y-4">
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

// Staff Login Screen
function StaffLoginScreen({ onNavigate, onStaffLogin }: { onNavigate: (screen: Screen) => void; onStaffLogin: () => void }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // In a real app, validate credentials here
    onStaffLogin();
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
          Staff Login
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155323]"
              placeholder="staff.email@sunnyview.com"
            />
          </div>

          <div>
            <label className="block text-sm mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155323]"
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
            className="w-full bg-[#155323] hover:bg-[#0f3d1a] text-white py-4 px-6 rounded-lg transition-all shadow-lg"
            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '22px' }}
          >
            Login as Staff
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
function HomeScreen({ onNavigate, events, children }: { onNavigate: (screen: Screen, data?: any) => void; events: any[]; children: any[] }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showMenu, setShowMenu] = useState(false);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Filter events for current month
  const eventsInMonth = events.filter(event => {
    const eventDate = event.dateObj;
    return eventDate.getMonth() === currentMonth.getMonth() && 
           eventDate.getFullYear() === currentMonth.getFullYear();
  });

  // Get event dates as day numbers
  const eventDays = eventsInMonth.map(event => event.dateObj.getDate());

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
              onClick={() => onNavigate('landing')}
              className="hidden md:block text-gray-600 hover:text-gray-900"
            >
              Logout
            </button>
          </div>

          {showMenu && (
            <div className="md:hidden mt-4 space-y-2">
              <button onClick={() => onNavigate('landing')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded">
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
              {children.map(child => {
                const childEvents = eventsInMonth.filter(event => event.child === child.name);
                if (childEvents.length === 0) return null;
                
                return (
                  <div key={child.id}>
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
                                {event.dateObj.toLocaleDateString('en-US', { month: 'short' })}
                              </div>
                              <div className="text-xl font-bold">
                                {event.dateObj.getDate()}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold">{event.title}</h4>
                              <p className="text-sm text-gray-600">{event.date}</p>
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
function EventsScreen({ events, children, onNavigate }: { events: any[]; children: any[]; onNavigate: (screen: Screen, data?: any) => void }) {
  const [showMenu, setShowMenu] = useState(false);

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
        <Tabs defaultValue={children[0]?.name} className="w-full">
          <TabsList className="grid w-full mb-6" style={{ gridTemplateColumns: `repeat(${children.length}, minmax(0, 1fr))` }}>
            {children.map((child) => (
              <TabsTrigger key={child.id} value={child.name} className="data-[state=active]:bg-[#155323] data-[state=active]:text-white">
                {child.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {children.map((child) => (
            <TabsContent key={child.id} value={child.name}>
              <div className="space-y-4">
                {events.filter(event => event.child === child.name).map(event => (
                  <div key={event.id} className="bg-[#f2f3f7] rounded-2xl p-6 flex justify-between items-center hover:shadow-lg transition-all">
                    <div>
                      <h3 className="text-lg mb-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-600">{event.date}</p>
                    </div>
                    <button
                      onClick={() => onNavigate('event-details', event)}
                      className="bg-[#155323] text-white px-6 py-3 rounded-xl hover:bg-[#0d3a18] transition-all"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                    >
                      Details
                    </button>
                  </div>
                ))}
                {events.filter(event => event.child === child.name).length === 0 && (
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
function EventDetailsScreen({ event, forms, payments, onNavigate }: { event: any; forms: any[]; payments: any[]; onNavigate: (screen: Screen, data?: any) => void }) {
  const [showMenu, setShowMenu] = useState(false);
  
  // Find the corresponding form for this event
  const eventForm = event ? forms.find(form => 
    form.title.toLowerCase().includes(event.title.toLowerCase().split(' ')[0]) // Match by first word (Drumheller, Calgary, Telus)
  ) : null;

  // Find the corresponding payment for this event
  const eventPayment = event ? payments.find(payment => 
    payment.name.toLowerCase().includes(event.title.toLowerCase().split(' ')[0]) // Match by first word (Drumheller, Calgary, Telus)
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
              1500 N Dinosaur Trail, Drumheller, AB T0J 0Y0
            </p>
          </div>

          {/* Date */}
          <div className="mb-6">
            <h3 className="text-xl mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              Date:
            </h3>
            <p className="text-gray-600 text-lg">
              November 7, 2025
            </p>
          </div>

          {/* Duration */}
          <div className="mb-6">
            <h3 className="text-xl mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              Duration:
            </h3>
            <p className="text-gray-600 text-lg">
              8:00am-3:30pm
            </p>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-xl mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              Description:
            </h3>
            <p className="text-gray-600">
              Get ready for a roaring adventure! Sunnyview daycare will be visiting the Royal Tyrrell Museum in Drumheller to explore real dinosaur fossils, interactive exhibits, and hands-on discovery zones. Children will learn about prehistoric creatures and enjoy a fun-filled day of exploration and curiosity.
            </p>
          </div>

          {/* Notes */}
          <div className="mb-8">
            <h3 className="text-xl mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              Notes:
            </h3>
            <p className="text-gray-600">
              Please pack a lunch, water bottle, and comfortable walking shoes!
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => eventForm ? onNavigate('form-view', eventForm) : onNavigate('forms')}
              className="bg-[rgba(191,106,2,0.76)] hover:bg-[rgba(191,106,2,0.9)] text-white rounded-xl transition-all flex items-center justify-center"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, width: '101px', height: '42px' }}
            >
              Form
            </button>
            <button
              onClick={() => eventPayment ? onNavigate('payments', eventPayment) : onNavigate('payments')}
              className="bg-[#009951] hover:bg-[#007a40] text-white rounded-xl transition-all flex items-center justify-center"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, width: '101px', height: '42px' }}
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// My Children Screen
function MyChildrenScreen({ onNavigate }: { onNavigate: (screen: Screen, data?: any) => void }) {
  const [showMenu, setShowMenu] = useState(false);
  
  const children = [
    { id: 1, name: 'Rob', age: 4, classroom: 'Sunflowers', newLogs: 3 },
    { id: 2, name: 'Emma', age: 3, classroom: 'Butterflies', newLogs: 0 },
    { id: 3, name: 'Liam', age: 5, classroom: 'Rainbows', newLogs: 1 },
  ];

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
              key={child.id} 
              onClick={() => onNavigate('daily-activity', child.name)}
              className="bg-gradient-to-br from-[#155323] to-[#0d3a18] text-white rounded-3xl p-8 hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl">
                    👶
                    {child.newLogs > 0 && (
                      <div className="absolute -top-1 -right-1 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center text-white text-sm" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                        {child.newLogs}
                      </div>
                    )}
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
function DailyActivityScreen({ activities, selectedChild, onNavigate }: { activities: any[]; selectedChild: string; onNavigate: (screen: Screen, data?: any) => void }) {
  const [showMenu, setShowMenu] = useState(false);

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
          
          <p className="text-gray-600 mt-4 text-center">Viewing activities for {selectedChild}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <Accordion type="single" collapsible className="space-y-4">
          {activities.map((activity, index) => (
            <AccordionItem key={activity.id} value={`item-${activity.id}`} className="bg-[#f2f3f7] rounded-2xl border-none">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex justify-between items-start w-full pr-4">
                  <div className="text-left">
                    <div className="inline-block bg-[#BF6A02] text-white px-3 py-1 rounded-full text-sm mb-2">
                      {activity.date}
                    </div>
                    <h3 className="text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                      {activity.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{activity.timeStart} - {activity.timeEnd}</p>
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
                    <p className="text-gray-700">{activity.behavioralNotes}</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
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
function FormsScreen({ forms, children, onNavigate }: { forms: any[]; children: any[]; onNavigate: (screen: Screen, data?: any) => void }) {
  const [showMenu, setShowMenu] = useState(false);

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
        <Tabs defaultValue={children[0]?.name} className="w-full">
          <TabsList className="grid w-full mb-6" style={{ gridTemplateColumns: `repeat(${children.length}, minmax(0, 1fr))` }}>
            {children.map((child) => (
              <TabsTrigger key={child.id} value={child.name} className="data-[state=active]:bg-[#155323] data-[state=active]:text-white">
                {child.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {children.map((child) => (
            <TabsContent key={child.id} value={child.name}>
              <div className="space-y-4">
                {forms.filter(form => form.child === child.name).map(form => (
                  <div key={form.id} className={`rounded-2xl p-6 flex justify-between items-center hover:shadow-lg transition-all ${
                    form.status === 'completed' ? 'bg-green-50' : 'bg-[#f2f3f7]'
                  }`}>
                    <div className="flex-1">
                      <h3 className="text-lg mb-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                        {form.title}
                      </h3>
                      <p className="text-sm text-gray-600">Due: {form.dueDate}</p>
                      {form.status === 'completed' && (
                        <span className="inline-block mt-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs">
                          Completed
                        </span>
                      )}
                    </div>
                    <div className="w-24 flex-shrink-0 ml-4">
                      {form.status === 'pending' && (
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
                {forms.filter(form => form.child === child.name).length === 0 && (
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
function FormViewScreen({ form, onNavigate }: { form: any; onNavigate: (screen: Screen) => void }) {
  const [isConsentChecked, setIsConsentChecked] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const signatureRef = useRef<SignatureCanvas>(null);

  const handleClearSignature = () => {
    signatureRef.current?.clear();
  };

  const handleDownloadPDF = () => {
    // Mock PDF download - in a real app, this would generate and download a PDF
    alert('PDF download would start here. In a real application, this would generate a PDF of the form.');
  };

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
                Parent/Guardian Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF6A02]"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                Contact Number
              </label>
              <input
                type="tel"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF6A02]"
                placeholder="(555) 555-5555"
              />
            </div>

            <div>
              <label className="block text-sm mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                Emergency Contact
              </label>
              <input
                type="tel"
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
                I consent to the information provided and understand the terms and conditions.
              </label>
            </div>

            <button
              onClick={() => onNavigate('forms')}
              className="w-full bg-[#155323] text-white py-4 px-6 rounded-xl hover:bg-[#0d3a18] transition-all shadow-lg"
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '18px' }}
            >
              Submit Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Payments Screen
function PaymentsScreen({ onNavigate, paymentData, payments, children }: { onNavigate: (screen: Screen, data?: any) => void; paymentData?: any; payments: any[]; children: any[] }) {
  const [step, setStep] = useState(paymentData ? 2 : 1);
  const [selectedPayment, setSelectedPayment] = useState(paymentData || null);
  const [showMenu, setShowMenu] = useState(false);

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
          <Tabs defaultValue={children[0]?.name} className="w-full">
            <TabsList className="grid w-full mb-6" style={{ gridTemplateColumns: `repeat(${children.length}, minmax(0, 1fr))` }}>
              {children.map((child) => (
                <TabsTrigger key={child.id} value={child.name} className="data-[state=active]:bg-[#155323] data-[state=active]:text-white">
                  {child.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {children.map((child) => (
              <TabsContent key={child.id} value={child.name}>
                <div className="space-y-4">
                  {payments.filter(payment => payment.child === child.name).map(payment => (
                    <div key={payment.id} className="bg-white rounded-3xl shadow-lg p-8">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                            {payment.name}
                          </h3>
                          <p className="text-2xl font-semibold text-[#BF6A02] mb-2">{payment.amount}</p>
                          <p className="text-sm text-gray-600">Due: {payment.dueDate}</p>
                        </div>
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
                      </div>
                    </div>
                  ))}
                  {payments.filter(payment => payment.child === child.name).length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      No payments due for {child.name}
                    </div>
                  )}
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
                  <span className="text-gray-600">Fee:</span>
                  <span className="font-semibold">{selectedPayment.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="text-xl font-semibold text-[#BF6A02]">{selectedPayment.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Due Date:</span>
                  <span className="font-semibold">{selectedPayment.dueDate}</span>
                </div>
                <div className="pt-2 border-t border-gray-300">
                  <p className="text-sm text-gray-600">{selectedPayment.description}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                  Cardholder Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF6A02]"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                  Card Number
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF6A02]"
                  placeholder="1234 5678 9012 3456"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF6A02]"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                    CVV
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF6A02]"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(3)}
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
