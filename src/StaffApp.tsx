import React, { useState } from 'react';
import { Home, CheckSquare, User, Calendar, Menu, X, ChevronDown, ChevronRight, DollarSign, FileText } from 'lucide-react';
import { Logo } from './components/Logo';

type StaffScreen = 'staff-home' | 'staff-log' | 'staff-class-list' | 'staff-events' | 'staff-event-details' | 'staff-attendance' | 'staff-add-event' | 'staff-edit-event' | 'staff-view-logs' | 'staff-edit-log' | 'staff-forms' | 'staff-form-detail' | 'staff-fees' | 'staff-add-fee';

type Child = {
  childId: string;
  parentId: string;
  name: string;
  age: number;
  allergies: string;
  medical: string;
  contact: string;
};

// Staff Bottom Navigation Component
function StaffBottomNav({ current, onNavigate }: { current: string; onNavigate: (screen: StaffScreen) => void }) {
  const navItems = [
    { id: 'staff-home', label: 'Home', icon: Home, screen: 'staff-home' as StaffScreen },
    { id: 'staff-log', label: 'Log', icon: CheckSquare, screen: 'staff-log' as StaffScreen },
    { id: 'staff-class-list', label: 'Class List', icon: User, screen: 'staff-class-list' as StaffScreen },
    { id: 'staff-events', label: 'Events', icon: Calendar, screen: 'staff-events' as StaffScreen },
    { id: 'staff-forms', label: 'Forms', icon: FileText, screen: 'staff-forms' as StaffScreen },
    { id: 'staff-fees', label: 'Fees', icon: DollarSign, screen: 'staff-fees' as StaffScreen },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#8AA991]">
      <div className="flex justify-around items-center py-2 max-w-6xl mx-auto">
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

// Staff Home Screen - Shows all events
function StaffHomeScreen({ onNavigate, events, onLogout }: { onNavigate: (screen: StaffScreen, data?: any) => void; events: any[]; onLogout?: () => void }) {
  const [showMenu, setShowMenu] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 11)); // November 11, 2025

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getEventsForMonth = () => {
    return events.filter(event => {
      const eventMonth = event.date.getMonth();
      const eventYear = event.date.getFullYear();
      return eventMonth === month && eventYear === year;
    });
  };

  const hasEventOnDate = (day: number) => {
    return events.some(event => 
      event.date.getDate() === day && 
      event.date.getMonth() === month && 
      event.date.getFullYear() === year
    );
  };

  const eventsThisMonth = getEventsForMonth();

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
              <button 
                onClick={onLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
              >
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
              {monthNames[month]}
            </h2>
            <div className="flex gap-2">
              <button 
                onClick={previousMonth}
                className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
              >
                &lt;
              </button>
              <button 
                onClick={nextMonth}
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
            
            {Array.from({ length: startingDayOfWeek }).map((_, index) => (
              <div key={`empty-${index}`} />
            ))}
            
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const isToday = day === 11 && month === 10 && year === 2025;
              const hasEvent = hasEventOnDate(day);
              
              return (
                <div
                  key={day}
                  className={`text-center py-3 rounded-lg cursor-pointer relative ${
                    isToday ? 'bg-[#155323] text-white font-bold' : 'hover:bg-gray-100'
                  }`}
                >
                  {day}
                  {hasEvent && (
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
          
          {eventsThisMonth.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No events scheduled for this month</p>
          ) : (
            <div className="space-y-2">
              {eventsThisMonth.map(event => (
                <div
                  key={event.id}
                  className="flex items-center justify-between bg-[#f2f3f7] rounded-xl p-4 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-[#BF6A02] text-white rounded-lg px-3 py-2 text-center min-w-[60px]">
                      <div className="text-xs">
                        {event.date.toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                      <div className="text-xl font-bold">
                        {event.date.getDate()}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold">{event.title}</h4>
                      <p className="text-sm text-gray-600">{event.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                      <p className="text-xs text-gray-500">Attendees: {event.children ? event.children.length : 0}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('staff-event-details', event)}
                    className="text-[#155323] hover:text-[#0d3a18] transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <StaffBottomNav current="staff-home" onNavigate={onNavigate} />
    </div>
  );
}

// Staff Log Activity Screen
function StaffLogScreen({ onNavigate, onAddLog, onLogout, childrenList }: { onNavigate: (screen: StaffScreen) => void; onAddLog: (logData: any) => void; onLogout?: () => void; childrenList: Child[] }) {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedChildren, setSelectedChildren] = useState<string[]>([]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  // canonical list of all child names for this screen
  const allChildren = childrenList.map((c: any) => c.name);

  

  const [activityType, setActivityType] = useState('');
  const [startHour, setStartHour] = useState('00');
  const [startMinute, setStartMinute] = useState('00');
  const [startPeriod, setStartPeriod] = useState('AM');
  const [endHour, setEndHour] = useState('00');
  const [endMinute, setEndMinute] = useState('00');
  const [endPeriod, setEndPeriod] = useState('PM');
  const [notes, setNotes] = useState('');
  const [behavioralNotes, setBehavioralNotes] = useState<{ childId: string; note: string }[]>([]);
  const [showChildrenDropdown, setShowChildrenDropdown] = useState(false);
  const [showBehavioralChildDropdown, setShowBehavioralChildDropdown] = useState(false);

  const handleChildSelection = (child: string, checked: boolean) => {
    if (checked) {
      setSelectedChildren([...selectedChildren, child]);
    } else {
      setSelectedChildren((prev: string[]) => prev.filter((c: string) => c !== child));
      // Remove behavioral notes for this child if they exist
      setBehavioralNotes((notes: any[]) => notes.filter((note: any) => note.childId !== child));
    }
  };

  const allChildrenSelected = selectedChildren.length === childrenList.length;
  const someChildrenSelected = selectedChildren.length > 0 && !allChildrenSelected;

  const toggleSelectAllChildren = () => {
    if (allChildrenSelected) {
      setSelectedChildren([]);
      setBehavioralNotes([]);
    } else {
      setSelectedChildren(childrenList.map((c: any) => c.name));
    }
  };

  const addBehavioralNote = (childId: string) => {
    setBehavioralNotes([...behavioralNotes, { childId, note: '' }]);
    setShowBehavioralChildDropdown(false);
  };

  const updateBehavioralNote = (index: number, note: string) => {
    const newNotes = [...behavioralNotes];
    newNotes[index].note = note;
    setBehavioralNotes(newNotes);
  };

  const removeBehavioralNote = (index: number) => {
    setBehavioralNotes((notes: any[]) => notes.filter((_: any, i: number) => i !== index));
  };

  const availableChildrenForNotes = selectedChildren.filter(
    (childName: string) => !behavioralNotes.some((note: any) => note.childId === childName)
  );

  const handleSubmit = () => {
    const errors: string[] = [];
    if (selectedChildren.length === 0) {
      errors.push('Please select at least one child');
    }
    if (!activityType.trim()) {
      errors.push('Please enter an activity name');
    }
    if (!startHour || !startMinute) {
      errors.push('Please enter a start time');
    }
    if (!endHour || !endMinute) {
      errors.push('Please enter an end time');
    }
    if (!notes.trim()) {
      errors.push('Please enter general notes');
    }
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors([]);

    // Format time strings
    const startTime = `${startHour}:${startMinute}${startPeriod.toLowerCase()}`;
    const endTime = `${endHour}:${endMinute}${endPeriod.toLowerCase()}`;

    // Create children array with canonical childrenList and their behavioral notes
    const childrenData = childrenList.map((child: any) => {
      const isSelected = selectedChildren.includes(child.name);
      const noteObj = behavioralNotes.find((n: any) => n.childId === child.name);
      return {
        childId: child.id ?? child.childId,
        name: child.name,
        selected: isSelected,
        behavioralNote: noteObj ? noteObj.note : ''
      };
    });

    // Create log object
    const newLog = {
      activityName: activityType,
      startTime,
      endTime,
      startHour,
      startMinute,
      startPeriod,
      endHour,
      endMinute,
      endPeriod,
      notes,
      children: childrenData
    };

    // Add the log and navigate to view logs
    onAddLog(newLog);
    onNavigate('staff-view-logs');
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
              <button 
                onClick={onLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
              >
                Logout
              </button>
            </div>
          )}

          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-2"></div>
            <div className="col-span-8 bg-[rgba(191,106,2,0.19)] rounded-2xl p-4 text-center">
              <h1 className="text-2xl text-[#bf6a02]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                Log Activity
              </h1>
            </div>
            <div className="col-span-2"></div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 md:p-8">
        <div className="space-y-6">
          {/* Validation Errors */}
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
          {/* Select Children */}
          <div className="relative">
            <button
              onClick={() => setShowChildrenDropdown(!showChildrenDropdown)}
              className="w-full bg-[#155323] hover:bg-[#0f3d1a] text-white px-6 py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              <span>Select Children</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {showChildrenDropdown && (
              <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-64 overflow-y-auto">
                {/* Select All / Deselect All */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
                  <button
                    onClick={toggleSelectAllChildren}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors shrink-0 ${
                      allChildrenSelected ? 'bg-[#2c2c2c] border-[#2c2c2c]' : 'bg-white border-gray-400'
                    }`}
                  >
                    {allChildrenSelected && (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 16 16">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l3 3 7-7" />
                      </svg>
                    )}
                    {someChildrenSelected && (
                      <div className="w-3 h-0.5 bg-[#2c2c2c]" />
                    )}
                  </button>
                  <span className="text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                    {allChildrenSelected ? 'Deselect All' : 'Select All'}
                  </span>
                </div>
                
                {childrenList.map((child: any) => (
                  <div key={child.name} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer" onClick={() => handleChildSelection(child.name, !selectedChildren.includes(child.name))}>
                    <button
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors shrink-0 ${
                        selectedChildren.includes(child.name) ? 'bg-[#2c2c2c] border-[#2c2c2c]' : 'bg-white border-gray-400'
                      }`}
                    >
                      {selectedChildren.includes(child.name) && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 16 16">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l3 3 7-7" />
                        </svg>
                      )}
                    </button>
                    <span className="text-sm">{child.name}</span>
                  </div>
                ))}
              </div>
            )}
            {selectedChildren.length > 0 && (
              <div className="mt-2 text-sm text-gray-600">
                Selected: {selectedChildren.join(', ')}
              </div>
            )}
          </div>

          {/* Activity Type */}
          <div className="space-y-2">
            <label className="text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Activity Name</label>
            <input
              type="text"
              value={activityType}
              onChange={(e) => setActivityType(e.target.value)}
              placeholder="Enter activity name"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>

          {/* Start Time */}
          <div className="space-y-2">
            <label className="text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Start Time</label>
            <div className="flex items-center gap-2">
              <select
                value={startHour}
                onChange={(e) => setStartHour(e.target.value)}
                className="w-16 px-2 py-2 border border-gray-300 rounded-lg text-center"
              >
                {Array.from({ length: 12 }, (_, i) => {
                  const hour = String(i + 1).padStart(2, '0');
                  return <option key={hour} value={hour}>{hour}</option>;
                })}
              </select>
              <span className="text-lg">:</span>
              <select
                value={startMinute}
                onChange={(e) => setStartMinute(e.target.value)}
                className="w-16 px-2 py-2 border border-gray-300 rounded-lg text-center"
              >
                {Array.from({ length: 60 }, (_, i) => {
                  const minute = String(i).padStart(2, '0');
                  return <option key={minute} value={minute}>{minute}</option>;
                })}
              </select>
              <div className="flex gap-1">
                <button
                  onClick={() => setStartPeriod('AM')}
                  className={`px-3 py-2 rounded text-xs ${startPeriod === 'AM' ? 'bg-[#2196f3] text-white' : 'bg-gray-200'}`}
                >
                  AM
                </button>
                <button
                  onClick={() => setStartPeriod('PM')}
                  className={`px-3 py-2 rounded text-xs ${startPeriod === 'PM' ? 'bg-[#2196f3] text-white' : 'bg-gray-200'}`}
                >
                  PM
                </button>
              </div>
            </div>
          </div>

          {/* End Time */}
          <div className="space-y-2">
            <label className="text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>End Time</label>
            <div className="flex items-center gap-2">
              <select
                value={endHour}
                onChange={(e) => setEndHour(e.target.value)}
                className="w-16 px-2 py-2 border border-gray-300 rounded-lg text-center"
              >
                {Array.from({ length: 12 }, (_, i) => {
                  const hour = String(i + 1).padStart(2, '0');
                  return <option key={hour} value={hour}>{hour}</option>;
                })}
              </select>
              <span className="text-lg">:</span>
              <select
                value={endMinute}
                onChange={(e) => setEndMinute(e.target.value)}
                className="w-16 px-2 py-2 border border-gray-300 rounded-lg text-center"
              >
                {Array.from({ length: 60 }, (_, i) => {
                  const minute = String(i).padStart(2, '0');
                  return <option key={minute} value={minute}>{minute}</option>;
                })}
              </select>
              <div className="flex gap-1">
                <button
                  onClick={() => setEndPeriod('AM')}
                  className={`px-3 py-2 rounded text-xs ${endPeriod === 'AM' ? 'bg-[#2196f3] text-white' : 'bg-gray-200'}`}
                >
                  AM
                </button>
                <button
                  onClick={() => setEndPeriod('PM')}
                  className={`px-3 py-2 rounded text-xs ${endPeriod === 'PM' ? 'bg-[#2196f3] text-white' : 'bg-gray-200'}`}
                >
                  PM
                </button>
              </div>
            </div>
          </div>

          {/* General Notes */}
          <div className="space-y-2">
            <label className="text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>General Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes for this activity..."
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-xl resize-none"
            />
          </div>

          {/* Behavioral Notes Section */}
          {selectedChildren.length > 0 && (
            <div className="space-y-4 border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  Behavioral Notes
                </h3>
                {availableChildrenForNotes.length > 0 && (
                  <div className="relative">
                    <button
                      onClick={() => setShowBehavioralChildDropdown(!showBehavioralChildDropdown)}
                      className="w-8 h-8 flex items-center justify-center bg-[#155323] hover:bg-[#0f3d1a] text-white rounded-full transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                    {showBehavioralChildDropdown && (
                      <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-64 overflow-y-auto">
                          {availableChildrenForNotes.map((childName: string) => {
                            return (
                              <button
                                key={childName}
                                onClick={() => addBehavioralNote(childName)}
                                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                              >
                                {childName}
                              </button>
                            );
                          })}
                        </div>
                    )}
                  </div>
                )}
              </div>

              {behavioralNotes.length > 0 ? (
                <div className="space-y-4">
                  {behavioralNotes.map((note, index) => {
                    const childName = note.childId;
                    return (
                    <div key={index} className="space-y-2 p-4 bg-gray-50 rounded-xl relative">
                      <div className="flex items-center justify-between">
                        <label className="text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                          {childName}
                        </label>
                        <button
                          onClick={() => removeBehavioralNote(index)}
                          className="text-red-600 hover:text-red-700 p-1"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <textarea
                        value={note.note}
                        onChange={(e) => updateBehavioralNote(index, e.target.value)}
                        placeholder={`Add behavioral notes for ${childName}...`}
                        className="w-full h-24 px-4 py-3 border border-gray-300 rounded-xl resize-none text-sm"
                      />
                    </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">
                  Click the + button to add behavioral notes for specific children
                </p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center">
            <button 
              onClick={handleSubmit}
              className="bg-[#155323] hover:bg-[#0f3d1a] text-white px-12 py-3 rounded-xl transition-colors"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              Submit
            </button>
          </div>

          {/* View Logs Button */}
          <div className="flex justify-center">
            <button 
              onClick={() => onNavigate('staff-view-logs')}
              className="bg-[#BF6A02] hover:bg-[#A55A02] text-white px-12 py-3 rounded-xl transition-colors"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              View Logs
            </button>
          </div>
        </div>
      </div>

      <StaffBottomNav current="staff-log" onNavigate={onNavigate} />
    </div>
  );
}

// Staff Attendance Screen (accessed from Class List)
function StaffAttendanceScreen({ onNavigate, attendance, setAttendance, onLogout, childrenList }: { 
  onNavigate: (screen: StaffScreen) => void;
  attendance: { [key: string]: boolean };
  setAttendance: (attendance: { [key: string]: boolean }) => void;
  onLogout?: () => void;
  childrenList: Child[];
}) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleAttendance = (childId: string) => {
    setAttendance({ ...attendance, [childId]: !attendance[childId] });
  };

  const students = childrenList;

  const allChecked = students.every(student => attendance[student.childId]);
  const someChecked = students.some(student => attendance[student.childId]) && !allChecked;

  const toggleSelectAll = () => {
    const newAttendance: { [key: string]: boolean } = {};
    const newValue = !allChecked;
    students.forEach(student => {
      newAttendance[student.childId] = newValue;
    });
    setAttendance(newAttendance);
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
              <button 
                onClick={onLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
              >
                Logout
              </button>
            </div>
          )}

          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-2 flex justify-start">
              <button 
                onClick={() => onNavigate('staff-class-list')}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            <div className="col-span-8 bg-[rgba(191,106,2,0.19)] rounded-2xl p-4 text-center">
              <h1 className="text-2xl text-[#bf6a02]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                Attendance
              </h1>
            </div>
            <div className="col-span-2"></div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="bg-white rounded-2xl p-6 space-y-4">
          {/* Select All / Deselect All */}
          <div className="flex items-center gap-3 p-2 border-b-2 border-gray-200 pb-4">
            <button
              onClick={toggleSelectAll}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                allChecked ? 'bg-[#2c2c2c] border-[#2c2c2c]' : 'bg-white border-gray-400'
              }`}
            >
              {allChecked && (
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 16 16">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l3 3 7-7" />
                </svg>
              )}
              {someChecked && (
                <div className="w-3 h-0.5 bg-[#2c2c2c]" />
              )}
            </button>
            <span className="text-[#1e1e1e]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              {allChecked ? 'Deselect All' : 'Select All'}
            </span>
          </div>

                  {students.map(student => (
                    <div key={student.childId} className="flex items-center gap-3 p-2">
                      <button
                        onClick={() => toggleAttendance(student.childId)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          attendance[student.childId] ? 'bg-[#2c2c2c] border-[#2c2c2c]' : 'bg-white border-gray-400'
                        }`}
                      >
                        {attendance[student.childId] && (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 16 16">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l3 3 7-7" />
                          </svg>
                        )}
                      </button>
                      <span className="text-[#1e1e1e]" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {student.name}
                      </span>
                    </div>
                  ))}

          <div className="flex justify-center pt-6">
            <button 
              onClick={() => onNavigate('staff-class-list')}
              className="bg-[#155323] hover:bg-[#0f3d1a] text-white px-8 py-3 rounded-xl transition-colors"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      <StaffBottomNav current="staff-class-list" onNavigate={onNavigate} />
    </div>
  );
}

// Staff Class List Screen
function StaffClassListScreen({ onNavigate, attendance, onLogout, childrenList }: { onNavigate: (screen: StaffScreen) => void; attendance: { [key: string]: boolean }; onLogout?: () => void; childrenList: Child[] }) {
  const [showMenu, setShowMenu] = useState(false);
  const students = childrenList;

return (
  <div className="min-h-screen bg-white pb-20 font-[Inter]">
    {/* Top Bar */}
    <div className="bg-white border-b border-gray-200 p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Logo + Menu */}
        <div className="flex justify-between items-center mb-6">
          <Logo size="small" />
          <button onClick={() => setShowMenu(!showMenu)}>
            {showMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Dropdown Menu */}
        {showMenu && (
          <div className="mb-4 space-y-2">
            <button
              onClick={onLogout}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
            >
              Logout
            </button>
          </div>
        )}

        {/* Page Title */}
        <div className="grid grid-cols-12 gap-4 items-center mb-4">
          <div className="col-span-2"></div>
          <div className="col-span-8 bg-[rgba(191,106,2,0.19)] rounded-2xl p-4 text-center">
            <h1 className="text-2xl text-[#bf6a02]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              Class List
            </h1>
          </div>
          <div className="col-span-2"></div>
        </div>

        {/* Attendance Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => onNavigate("staff-attendance")}
            className="bg-[#155323] hover:bg-[#0f3d1a] text-white px-6 py-3 rounded-xl transition-colors font-semibold"
          >
            Attendance
          </button>
        </div>
      </div>
    </div>

    {/* Main Content */}
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-2xl overflow-hidden">

        {/* Header Row */}
        <div className="bg-[rgba(191,106,2,0.2)] px-4 py-3">
          <div className="grid grid-cols-4 gap-4">
            <span className="text-sm font-bold">Name</span>
            <span className="text-sm font-bold">Parental Contact</span>
            <span className="text-sm font-bold">Medical Notes</span>
            <span className="text-sm font-bold text-center">Present Today</span>
          </div>
        </div>

        {/* Student Rows */}
        {students.map((student, index) => (
          <div
            key={student.childId}
            className={`px-4 py-4 border-b border-gray-100 ${
              index % 2 === 0 ? "bg-[#fef7ff]" : "bg-white"
            }`}
          >
            <div className="grid grid-cols-4 gap-4 items-center">
              
              <span className="text-sm text-[#49454f]">{student.name}</span>
              <span className="text-sm text-[#49454f]">{student.contact}</span>
              <span className="text-sm text-[#49454f]">{student.medical}</span>

              {/* Attendance */}
              <div className="flex justify-center">
                {attendance[student.childId] ? (
                  <span className="text-green-600 flex items-center gap-1">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm">Yes</span>
                  </span>
                ) : (
                  <span className="text-red-600 text-sm">No</span>
                )}
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>

    {/* Bottom Navigation */}
    <StaffBottomNav current="staff-class-list" onNavigate={onNavigate} />
  </div>
  );

}

// Staff Events Screen
function StaffEventsScreen({ events, onNavigate, onLogout }: { events: any[]; onNavigate: (screen: StaffScreen, data?: any) => void; onLogout?: () => void }) {
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
              <button 
                onClick={onLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
              >
                Logout
              </button>
            </div>
          )}

          <div className="grid grid-cols-12 gap-4 items-center mb-4">
            <div className="col-span-2"></div>
            <div className="col-span-8 bg-[rgba(191,106,2,0.19)] rounded-2xl p-4 text-center">
              <h1 className="text-2xl text-[#bf6a02]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                Upcoming Events
              </h1>
            </div>
            <div className="col-span-2"></div>
          </div>

          <div className="flex justify-end">
            <button 
              onClick={() => onNavigate('staff-add-event')}
              className="bg-[#155323] text-white px-6 py-3 rounded-xl hover:bg-[#0d3a18] transition-all"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              + Add Event
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="space-y-4">
          {events.map(event => (
            <div
              key={event.id}
              className="bg-[#f2f3f7] rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center">
                  <div className="flex-1">
                  <h3 className="text-xl mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                    {event.title}
                  </h3>
                  <p className="text-gray-600">
                    {event.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                  <p className="text-sm text-gray-500">Attendees: {event.children ? event.children.length : 0}</p>
                </div>
                <button
                  onClick={() => onNavigate('staff-event-details', event)}
                  className="bg-[#155323] text-white px-6 py-3 rounded-xl hover:bg-[#0d3a18] transition-all ml-4"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <StaffBottomNav current="staff-events" onNavigate={onNavigate} />
    </div>
  );
}

// Staff Event Details Screen
function StaffEventDetailsScreen({ event, onNavigate, onLogout, childrenList }: { event: any; onNavigate: (screen: StaffScreen, data?: any) => void; onLogout?: () => void; childrenList: Child[] }) {
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
              <button 
                onClick={onLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
              >
                Logout
              </button>
            </div>
          )}

          <div className="grid grid-cols-12 gap-4 items-center mb-4">
            <div className="col-span-1 flex justify-start">
              <button 
                onClick={() => onNavigate('staff-events')}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            <div className="col-span-10 bg-[rgba(191,106,2,0.19)] rounded-2xl p-4 text-center">
              <h1 className="text-2xl text-[#bf6a02]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                {event?.title}
              </h1>
            </div>
            <div className="col-span-1"></div>
          </div>

          <div className="flex justify-end gap-3 mb-4">
            <button 
              onClick={() => {
                if (confirm('Are you sure you want to delete this event?')) {
                  onNavigate('staff-events');
                }
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition-colors"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              Delete Event
            </button>
            <button 
              onClick={() => onNavigate('staff-edit-event', event)}
              className="bg-[#155323] text-white px-6 py-3 rounded-xl hover:bg-[#0d3a18] transition-all"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              Edit Event
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="bg-[#f2f3f7] rounded-2xl p-6 md:p-8">
          <div className="mb-6">
            <h3 className="text-xl mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              Location:
            </h3>
            <p className="text-[#0088ff] text-lg">
              {event?.location || 'Location not specified'}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              Date:
            </h3>
            <p className="text-gray-600 text-lg">
              {event?.date ? event.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Date not set'}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              Duration:
            </h3>
            <p className="text-gray-600 text-lg">
              {event?.startTime && event?.endTime ? `${event.startTime}-${event.endTime}` : 'Duration not set'}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              Description:
            </h3>
            <p className="text-gray-600">
              {event?.description || 'No description provided.'}
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              Notes:
            </h3>
            <p className="text-gray-600">
              {event?.notes || 'No notes.'}
            </p>
          </div>
          {event?.children && event.children.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                Attendees:
              </h3>
              <ul className="list-disc list-inside">
                {event.children.map((id: string) => {
                  const name = childrenList.find(c => c.childId === id)?.name || id;
                  return (
                    <li key={id} className="text-gray-700">{name}</li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>

      <StaffBottomNav current="staff-events" onNavigate={onNavigate} />
    </div>
  );
}

// Staff Add/Edit Event Screen
function StaffAddEditEventScreen({ event, onNavigate, mode, onAddEvent, onUpdateEvent, onLogout, childrenList }: { event?: any; onNavigate: (screen: StaffScreen, data?: any) => void; mode: 'add' | 'edit'; onAddEvent: (eventData: any) => void; onUpdateEvent?: (eventData: any) => void; onLogout?: () => void; childrenList: Child[] }) {
  const [showMenu, setShowMenu] = useState(false);
  const [title, setTitle] = useState(event?.title || '');
  const [location, setLocation] = useState(mode === 'edit' ? '1500 N Dinosaur Trail, Drumheller, AB T0J 0Y0' : '');
  const [selectedDate, setSelectedDate] = useState<Date | null>(mode === 'edit' && event?.date ? event.date : null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [startHour, setStartHour] = useState('08');
  const [startMinute, setStartMinute] = useState('00');
  const [startPeriod, setStartPeriod] = useState('AM');
  const [endHour, setEndHour] = useState('03');
  const [endMinute, setEndMinute] = useState('30');
  const [endPeriod, setEndPeriod] = useState('PM');
  const [description, setDescription] = useState(mode === 'edit' ? 'Get ready for a roaring adventure! Sunnyview daycare will be visiting the Royal Tyrrell Museum in Drumheller to explore real dinosaur fossils, interactive exhibits, and hands-on discovery zones. Children will learn about prehistoric creatures and enjoy a fun-filled day of exploration and curiosity.' : '');
  const [notes, setNotes] = useState(mode === 'edit' ? 'Please pack a lunch, water bottle, and comfortable walking shoes!' : '');
  const [formFile, setFormFile] = useState<File | null>(null);
  const [removeForm, setRemoveForm] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(mode === 'edit' && event?.date ? event.date : new Date());
  const [showChildrenDropdown, setShowChildrenDropdown] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const allChildren = childrenList;

  const [selectedChildren, setSelectedChildren] = useState<string[]>(() => {
    // When editing an event, convert any provided child identifiers (names or ids) to childId
    if (mode === 'edit' && event?.children) {
      return event.children.map((ch: any) => {
        const found = childrenList.find(c => c.childId === ch || c.name === ch);
        return found ? found.childId : String(ch);
      });
    }
    return [];
  });

  const handleChildSelection = (childId: string, checked: boolean) => {
    if (checked) {
      setSelectedChildren((prev: string[]) => Array.from(new Set([...prev, childId])));
    } else {
      setSelectedChildren((prev: string[]) => prev.filter((c: string) => c !== childId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedChildren(childrenList.map(c => c.childId));
    } else {
      setSelectedChildren([]);
    }
  };

  const allChildrenSelected = selectedChildren.length === allChildren.length;
  const someChildrenSelected = selectedChildren.length > 0 && !allChildrenSelected;

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateSelect = (day: number) => {
    const selected = new Date(year, month, day);
    setSelectedDate(selected);
    setShowCalendar(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormFile(e.target.files[0]);
    }
  };

  const handleCreateEvent = () => {
    const errors: string[] = [];

    // Validate all required fields
    if (!title.trim()) {
      errors.push('Please enter an event title');
    }
    if (!location.trim()) {
      errors.push('Please enter a location');
    }
    if (!selectedDate) {
      errors.push('Please select a date for the event');
    }
    if (!startHour || !startMinute) {
      errors.push('Please enter a start time');
    }
    if (!endHour || !endMinute) {
      errors.push('Please enter an end time');
    }
    if (selectedChildren.length === 0) {
      errors.push('Please select at least one child');
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Clear errors
    setValidationErrors([]);

    // Create event object
    const newEvent = {
      title: title.trim(),
      date: selectedDate,
      location: location.trim(),
      startTime: `${startHour}:${startMinute}${startPeriod.toLowerCase()}`,
      endTime: `${endHour}:${endMinute}${endPeriod.toLowerCase()}`,
      description: description.trim(),
      notes: notes.trim(),
      formFile: formFile?.name || null,
      children: selectedChildren
    };

    // Add the event and navigate to events screen
    onAddEvent(newEvent);
    onNavigate('staff-events');
  };

  const handleSaveChanges = () => {
    const errors: string[] = [];

    // Validate all required fields
    if (!title.trim()) {
      errors.push('Please enter an event title');
    }
    if (!location.trim()) {
      errors.push('Please enter a location');
    }
    if (!selectedDate) {
      errors.push('Please select a date for the event');
    }
    if (!startHour || !startMinute) {
      errors.push('Please enter a start time');
    }
    if (!endHour || !endMinute) {
      errors.push('Please enter an end time');
    }
    if (selectedChildren.length === 0) {
      errors.push('Please select at least one child');
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Clear errors
    setValidationErrors([]);

    // Build updated event object (preserve original id if available)
    const updatedEvent = {
      id: event?.id,
      title: title.trim(),
      date: selectedDate,
      location: location.trim(),
      startTime: `${startHour}:${startMinute}${startPeriod.toLowerCase()}`,
      endTime: `${endHour}:${endMinute}${endPeriod.toLowerCase()}`,
      description: description.trim(),
      // If user removed the form during edit, clear it; otherwise prefer newly uploaded file, else keep existing
      notes: notes.trim(),
      formFile: removeForm ? null : (formFile ? formFile.name : (event?.formFile || null)),
      hasForm: removeForm ? false : (formFile ? true : (event?.hasForm || false)),
      children: selectedChildren
    };

    if (onUpdateEvent) {
      onUpdateEvent(updatedEvent);
    }
    // Navigate back to event details
    onNavigate('staff-event-details', updatedEvent);
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
              <button 
                onClick={onLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
              >
                Logout
              </button>
            </div>
          )}

          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-2 flex justify-start">
              <button 
                onClick={() => mode === 'edit' ? onNavigate('staff-event-details', event) : onNavigate('staff-events')}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            <div className="col-span-8 bg-[rgba(191,106,2,0.19)] rounded-2xl p-4 text-center">
              <h1 className="text-2xl text-[#bf6a02]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                {mode === 'add' ? 'Add Event' : 'Edit Event'}
              </h1>
            </div>
            <div className="col-span-2"></div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 md:p-8">
        <div className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
              Event Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title for Event"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Event location"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>

          {/* Date with Calendar Picker */}
          <div className="space-y-2">
            <label className="text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
              Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <button
                onClick={() => setShowCalendar(!showCalendar)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-left flex items-center justify-between"
              >
                <span className={selectedDate ? 'text-black' : 'text-gray-400'}>
                  {selectedDate 
                    ? selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                    : 'Select date'}
                </span>
                <Calendar className="w-5 h-5 text-gray-400" />
              </button>

              {showCalendar && (
                <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <button onClick={previousMonth} className="p-2 hover:bg-gray-100 rounded">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <h3 className="text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                      {monthNames[month]} {year}
                    </h3>
                    <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                      <div key={idx} className="text-center text-gray-600 text-xs py-1">
                        {day}
                      </div>
                    ))}
                    
                    {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                      <div key={`empty-${index}`} />
                    ))}
                    
                    {Array.from({ length: daysInMonth }).map((_, index) => {
                      const day = index + 1;
                      const isSelected = selectedDate && 
                        selectedDate.getDate() === day && 
                        selectedDate.getMonth() === month && 
                        selectedDate.getFullYear() === year;
                      
                      return (
                        <button
                          key={day}
                          onClick={() => handleDateSelect(day)}
                          className={`aspect-square flex items-center justify-center rounded-lg text-sm ${
                            isSelected ? 'bg-[#155323] text-white' : 'hover:bg-gray-100'
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Duration - Start Time */}
          <div className="space-y-2">
            <label className="text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
              Start Time <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <select
                value={startHour}
                onChange={(e) => setStartHour(e.target.value)}
                className="w-16 px-2 py-2 border border-gray-300 rounded-lg text-center"
              >
                {Array.from({ length: 12 }, (_, i) => {
                  const hour = String(i + 1).padStart(2, '0');
                  return <option key={hour} value={hour}>{hour}</option>;
                })}
              </select>
              <span className="text-lg">:</span>
              <select
                value={startMinute}
                onChange={(e) => setStartMinute(e.target.value)}
                className="w-16 px-2 py-2 border border-gray-300 rounded-lg text-center"
              >
                {Array.from({ length: 60 }, (_, i) => {
                  const minute = String(i).padStart(2, '0');
                  return <option key={minute} value={minute}>{minute}</option>;
                })}
              </select>
              <div className="flex gap-1">
                <button
                  onClick={() => setStartPeriod('AM')}
                  className={`px-3 py-2 rounded text-xs ${startPeriod === 'AM' ? 'bg-[#2196f3] text-white' : 'bg-gray-200'}`}
                >
                  AM
                </button>
                <button
                  onClick={() => setStartPeriod('PM')}
                  className={`px-3 py-2 rounded text-xs ${startPeriod === 'PM' ? 'bg-[#2196f3] text-white' : 'bg-gray-200'}`}
                >
                  PM
                </button>
              </div>
            </div>
          </div>

          {/* Duration - End Time */}
          <div className="space-y-2">
            <label className="text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
              End Time <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <select
                value={endHour}
                onChange={(e) => setEndHour(e.target.value)}
                className="w-16 px-2 py-2 border border-gray-300 rounded-lg text-center"
              >
                {Array.from({ length: 12 }, (_, i) => {
                  const hour = String(i + 1).padStart(2, '0');
                  return <option key={hour} value={hour}>{hour}</option>;
                })}
              </select>
              <span className="text-lg">:</span>
              <select
                value={endMinute}
                onChange={(e) => setEndMinute(e.target.value)}
                className="w-16 px-2 py-2 border border-gray-300 rounded-lg text-center"
              >
                {Array.from({ length: 60 }, (_, i) => {
                  const minute = String(i).padStart(2, '0');
                  return <option key={minute} value={minute}>{minute}</option>;
                })}
              </select>
              <div className="flex gap-1">
                <button
                  onClick={() => setEndPeriod('AM')}
                  className={`px-3 py-2 rounded text-xs ${endPeriod === 'AM' ? 'bg-[#2196f3] text-white' : 'bg-gray-200'}`}
                >
                  AM
                </button>
                <button
                  onClick={() => setEndPeriod('PM')}
                  className={`px-3 py-2 rounded text-xs ${endPeriod === 'PM' ? 'bg-[#2196f3] text-white' : 'bg-gray-200'}`}
                >
                  PM
                </button>
              </div>
            </div>
          </div>

          {/* Children Selection */}
          <div className="space-y-2">
            <label className="text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
              Select Children <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <button
                onClick={() => setShowChildrenDropdown(!showChildrenDropdown)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl flex justify-between items-center bg-white"
              >
                <span className="text-gray-600">
                  {selectedChildren.length === 0
                    ? 'Select children'
                    : `${selectedChildren.length} child(ren) selected`}
                </span>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </button>

              {showChildrenDropdown && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-xl shadow-lg max-h-80 overflow-y-auto">
                  <div className="p-3 border-b border-gray-200 bg-gray-50">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={allChildrenSelected}
                        ref={(input) => {
                          if (input) {
                            input.indeterminate = someChildrenSelected;
                          }
                        }}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300"
                      />
                      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                        Select All
                      </span>
                    </label>
                  </div>
                  {allChildren.map((child) => (
                    <div key={child.childId} className="p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedChildren.includes(child.childId)}
                          onChange={(e) => handleChildSelection(child.childId, e.target.checked)}
                          className="w-5 h-5 rounded border-gray-300"
                        />
                        <span>{child.name}</span>
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {selectedChildren.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedChildren.map((id) => {
                  const childName = childrenList.find(c => c.childId === id)?.name || id;
                  return (
                  <div
                    key={id}
                    className="bg-[#155323] text-white px-3 py-1 rounded-lg text-sm flex items-center gap-2"
                  >
                    <span>{childName}</span>
                    <button
                      onClick={() => handleChildSelection(id, false)}
                      className="hover:bg-white/20 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description for event"
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-xl resize-none"
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label className="text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes for Event"
              className="w-full h-24 px-4 py-3 border border-gray-300 rounded-xl resize-none"
            />
          </div>

          {/* Form Upload / Download (editing) */}
          <div className="space-y-2">
            <label className="text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
              Form (if applicable)
            </label>
            {mode === 'edit' && (event?.formFile || event?.hasForm) && !removeForm ? (
              <div className="rounded-xl p-4 border bg-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <svg className="w-8 h-8 text-[#155323]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold">{event?.formFile || 'Attached Form'}</p>
                    <p className="text-xs text-gray-500">A form is attached to this event</p>
                  </div>
                </div>
                  <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert('PDF download would start here')}
                    className="bg-[#BF6A02] hover:bg-[#A55A02] text-white px-4 py-2 rounded-lg"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Remove the attached form from this event?')) {
                        // Immediately switch the UI to the uploader so the user can optionally upload a new file
                        setRemoveForm(true);
                        setFormFile(null);
                      }
                    }}
                    className="bg-[#ed3241] hover:bg-[#d42635] text-white px-4 py-2 rounded-lg"
                  >
                    Remove Form
                  </button>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6">
                <input
                  type="file"
                  id="form-upload"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                />
                <label
                  htmlFor="form-upload"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  {formFile ? (
                    <div className="flex items-center gap-2">
                      <svg className="w-8 h-8 text-[#155323]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <div>
                        <p className="text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                          {formFile.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Click to change file
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-sm text-gray-600 mb-1">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, or DOCX
                      </p>
                    </div>
                  )}
                </label>
              </div>
            )}
          </div>

          {/* Validation Errors */}
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

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center pt-4">
            <button
              onClick={() => mode === 'edit' ? onNavigate('staff-event-details', event) : onNavigate('staff-events')}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-12 py-3 rounded-xl transition-colors"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              Cancel
            </button>
            <button 
              onClick={mode === 'add' ? handleCreateEvent : handleSaveChanges}
              className="bg-[#155323] hover:bg-[#0f3d1a] text-white px-12 py-3 rounded-xl transition-colors whitespace-nowrap"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              {mode === 'add' ? 'Create Event' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      <StaffBottomNav current="staff-events" onNavigate={onNavigate} />
    </div>
  );
}

// Staff View Logs Screen
function StaffViewLogsScreen({ onNavigate, activities, onLogout }: { onNavigate: (screen: StaffScreen, data?: any) => void; activities: any[]; onLogout?: () => void }) {
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
              <button 
                onClick={onLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
              >
                Logout
              </button>
            </div>
          )}

          <div className="grid grid-cols-12 gap-4 items-center mb-4">
            <div className="col-span-2 flex justify-start">
              <button 
                onClick={() => onNavigate('staff-log')}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            <div className="col-span-8 bg-[rgba(191,106,2,0.19)] rounded-2xl p-4 text-center">
              <h1 className="text-2xl text-[#bf6a02]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                Logged Activities
              </h1>
            </div>
            <div className="col-span-2"></div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="space-y-4">
          {activities.map((log: any) => (
            <div
              key={log.id}
              className="bg-[#f2f3f7] rounded-xl p-6"
            >
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <h3 className="text-lg mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                    {log.activityName}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {log.startTime} - {log.endTime}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this activity?')) {
                        // Delete activity logic here
                      }
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => onNavigate('staff-edit-log', log)}
                    className="bg-[#155323] text-white px-6 py-3 rounded-xl hover:bg-[#0d3a18] transition-all"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button 
            onClick={() => onNavigate('staff-log')}
            className="bg-[#155323] hover:bg-[#0f3d1a] text-white px-8 py-3 rounded-xl transition-colors"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
          >
            +Add Log
          </button>
        </div>
      </div>

      <StaffBottomNav current="staff-log" onNavigate={onNavigate} />
    </div>
  );
}

// Staff Edit Log Screen
function StaffEditLogScreen({ onNavigate, log, onLogout, childrenList }: { onNavigate: (screen: StaffScreen) => void; log: any; onLogout?: () => void; childrenList: Child[] }) {
  const [showMenu, setShowMenu] = useState(false);
  const [activityName, setActivityName] = useState(log?.activityName || '');
  const [startHour, setStartHour] = useState(log?.startHour || '12');
  const [startMinute, setStartMinute] = useState(log?.startMinute || '00');
  const [startPeriod, setStartPeriod] = useState(log?.startPeriod || 'PM');
  const [endHour, setEndHour] = useState(log?.endHour || '01');
  const [endMinute, setEndMinute] = useState(log?.endMinute || '00');
  const [endPeriod, setEndPeriod] = useState(log?.endPeriod || 'PM');
  const [notes, setNotes] = useState(log?.notes || '');
  
  // Initialize selected children from canonical childrenList (use names for editing logs)
  const allChildren = childrenList.map((c: any) => c.name);
  const initialSelectedChildren: string[] = Array.isArray(log?.children)
    ? log.children
        .filter((c: any) => (typeof c === 'string' ? true : !!c.selected))
        .map((c: any) => (typeof c === 'string' ? c : (c.name ?? '')))
        .filter((name: string) => !!name)
    : [];
  const [selectedChildren, setSelectedChildren] = useState<string[]>(initialSelectedChildren);
  const initialBehavioralNotes: { child: string; note: string }[] = Array.isArray(log?.children)
    ? log.children
        .filter((c: any) => typeof c !== 'string' && !!c.selected && !!c.behavioralNote)
        .map((c: any) => ({ child: c.name, note: c.behavioralNote }))
    : [];
  const [behavioralNotes, setBehavioralNotes] = useState<{ child: string; note: string }[]>(initialBehavioralNotes);

  // Sync state when log prop changes (navigate sets selectedLog after mount)
  React.useEffect(() => {
    if (log && Array.isArray(log.children)) {
      const sel = log.children
        .filter((c: any) => (typeof c === 'string' ? true : !!c.selected))
        .map((c: any) => (typeof c === 'string' ? c : (c.name ?? '')))
        .filter((name: string) => !!name);
      setSelectedChildren(sel);

      const notes = log.children
        .filter((c: any) => typeof c !== 'string' && !!c.selected && !!c.behavioralNote)
        .map((c: any) => ({ child: c.name, note: c.behavioralNote }));
      setBehavioralNotes(notes);
    }
  }, [log]);
  const [showChildrenDropdown, setShowChildrenDropdown] = useState(false);
  const [showBehavioralChildDropdown, setShowBehavioralChildDropdown] = useState(false);

  const handleChildSelection = (child: string, checked: boolean) => {
    if (checked) {
      setSelectedChildren([...selectedChildren, child]);
    } else {
      setSelectedChildren(selectedChildren.filter(c => c !== child));
      // Remove behavioral notes for this child if they exist
      setBehavioralNotes(behavioralNotes.filter(note => note.child !== child));
    }
  };

  const allChildrenSelected = selectedChildren.length === allChildren.length;
  const someChildrenSelected = selectedChildren.length > 0 && !allChildrenSelected;

  const toggleSelectAllChildren = () => {
    if (allChildrenSelected) {
      setSelectedChildren([]);
      setBehavioralNotes([]);
    } else {
      setSelectedChildren([...allChildren]);
    }
  };

  const addBehavioralNote = (child: string) => {
    setBehavioralNotes([...behavioralNotes, { child, note: '' }]);
    setShowBehavioralChildDropdown(false);
  };

  const updateBehavioralNote = (index: number, note: string) => {
    const newNotes = [...behavioralNotes];
    newNotes[index].note = note;
    setBehavioralNotes(newNotes);
  };

  const removeBehavioralNote = (index: number) => {
    setBehavioralNotes(behavioralNotes.filter((_, i) => i !== index));
  };

  const availableChildrenForNotes = selectedChildren.filter(
    child => !behavioralNotes.some(note => note.child === child)
  );

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
              <button 
                onClick={onLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
              >
                Logout
              </button>
            </div>
          )}

          <div className="grid grid-cols-12 gap-4 items-center mb-4">
            <div className="col-span-2 flex justify-start">
              <button 
                onClick={() => onNavigate('staff-view-logs')}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            <div className="col-span-8 bg-[rgba(191,106,2,0.19)] rounded-2xl p-4 text-center">
              <h1 className="text-2xl text-[#bf6a02]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                Edit Activity
              </h1>
            </div>
            <div className="col-span-2"></div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 md:p-8">
        <div className="space-y-6">
          {/* Activity Name */}
          <div className="space-y-2">
            <label className="text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Activity Name</label>
            <input
              type="text"
              value={activityName}
              onChange={(e) => setActivityName(e.target.value)}
              placeholder="Enter activity name"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>

          {/* Start Time */}
          <div className="space-y-2">
            <label className="text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Start Time</label>
            <div className="flex items-center gap-2">
              <select
                value={startHour}
                onChange={(e) => setStartHour(e.target.value)}
                className="w-16 px-2 py-2 border border-gray-300 rounded-lg text-center"
              >
                {Array.from({ length: 12 }, (_, i) => {
                  const hour = String(i + 1).padStart(2, '0');
                  return <option key={hour} value={hour}>{hour}</option>;
                })}
              </select>
              <span className="text-lg">:</span>
              <select
                value={startMinute}
                onChange={(e) => setStartMinute(e.target.value)}
                className="w-16 px-2 py-2 border border-gray-300 rounded-lg text-center"
              >
                {Array.from({ length: 60 }, (_, i) => {
                  const minute = String(i).padStart(2, '0');
                  return <option key={minute} value={minute}>{minute}</option>;
                })}
              </select>
              <div className="flex gap-1">
                <button
                  onClick={() => setStartPeriod('AM')}
                  className={`px-3 py-2 rounded text-xs ${startPeriod === 'AM' ? 'bg-[#2196f3] text-white' : 'bg-gray-200'}`}
                >
                  AM
                </button>
                <button
                  onClick={() => setStartPeriod('PM')}
                  className={`px-3 py-2 rounded text-xs ${startPeriod === 'PM' ? 'bg-[#2196f3] text-white' : 'bg-gray-200'}`}
                >
                  PM
                </button>
              </div>
            </div>
          </div>

          {/* End Time */}
          <div className="space-y-2">
            <label className="text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>End Time</label>
            <div className="flex items-center gap-2">
              <select
                value={endHour}
                onChange={(e) => setEndHour(e.target.value)}
                className="w-16 px-2 py-2 border border-gray-300 rounded-lg text-center"
              >
                {Array.from({ length: 12 }, (_, i) => {
                  const hour = String(i + 1).padStart(2, '0');
                  return <option key={hour} value={hour}>{hour}</option>;
                })}
              </select>
              <span className="text-lg">:</span>
              <select
                value={endMinute}
                onChange={(e) => setEndMinute(e.target.value)}
                className="w-16 px-2 py-2 border border-gray-300 rounded-lg text-center"
              >
                {Array.from({ length: 60 }, (_, i) => {
                  const minute = String(i).padStart(2, '0');
                  return <option key={minute} value={minute}>{minute}</option>;
                })}
              </select>
              <div className="flex gap-1">
                <button
                  onClick={() => setEndPeriod('AM')}
                  className={`px-3 py-2 rounded text-xs ${endPeriod === 'AM' ? 'bg-[#2196f3] text-white' : 'bg-gray-200'}`}
                >
                  AM
                </button>
                <button
                  onClick={() => setEndPeriod('PM')}
                  className={`px-3 py-2 rounded text-xs ${endPeriod === 'PM' ? 'bg-[#2196f3] text-white' : 'bg-gray-200'}`}
                >
                  PM
                </button>
              </div>
            </div>
          </div>

          {/* Select Children */}
          <div className="relative">
            <button
              onClick={() => setShowChildrenDropdown(!showChildrenDropdown)}
              className="w-full bg-[#155323] hover:bg-[#0f3d1a] text-white px-6 py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              <span>Select Children</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {showChildrenDropdown && (
              <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-64 overflow-y-auto">
                {/* Select All / Deselect All */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
                  <button
                    onClick={toggleSelectAllChildren}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors shrink-0 ${
                      allChildrenSelected ? 'bg-[#2c2c2c] border-[#2c2c2c]' : 'bg-white border-gray-400'
                    }`}
                  >
                    {allChildrenSelected && (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 16 16">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l3 3 7-7" />
                      </svg>
                    )}
                    {someChildrenSelected && (
                      <div className="w-3 h-0.5 bg-[#2c2c2c]" />
                    )}
                  </button>
                  <span className="text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                    {allChildrenSelected ? 'Deselect All' : 'Select All'}
                  </span>
                </div>
                
                {childrenList.map(child => (
                  <div key={child.childId} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer" onClick={() => handleChildSelection(child.name, !selectedChildren.includes(child.name))}>
                    <button
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors shrink-0 ${
                        selectedChildren.includes(child.name) ? 'bg-[#2c2c2c] border-[#2c2c2c]' : 'bg-white border-gray-400'
                      }`}
                    >
                      {selectedChildren.includes(child.name) && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 16 16">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l3 3 7-7" />
                        </svg>
                      )}
                    </button>
                    <span className="text-sm">{child.name}</span>
                  </div>
                ))}
              </div>
            )}
            {selectedChildren.length > 0 && (
              <div className="mt-2 text-sm text-gray-600">
                Selected: {selectedChildren.join(', ')}
              </div>
            )}
          </div>

          {/* General Notes */}
          <div className="space-y-2">
            <label className="text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>General Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes for this activity..."
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-xl resize-none"
            />
          </div>

          {/* Behavioral Notes Section */}
          {selectedChildren.length > 0 && (
            <div className="space-y-4 border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  Behavioral Notes
                </h3>
                {availableChildrenForNotes.length > 0 && (
                  <div className="relative">
                    <button
                      onClick={() => setShowBehavioralChildDropdown(!showBehavioralChildDropdown)}
                      className="w-8 h-8 flex items-center justify-center bg-[#155323] hover:bg-[#0f3d1a] text-white rounded-full transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                    {showBehavioralChildDropdown && (
                      <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-64 overflow-y-auto">
                        {availableChildrenForNotes.map(child => (
                          <button
                            key={child}
                            onClick={() => addBehavioralNote(child)}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                          >
                            {child}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {behavioralNotes.length > 0 ? (
                <div className="space-y-4">
                  {behavioralNotes.map((note, index) => (
                    <div key={index} className="space-y-2 p-4 bg-gray-50 rounded-xl relative">
                      <div className="flex items-center justify-between">
                        <label className="text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                          {note.child}
                        </label>
                        <button
                          onClick={() => removeBehavioralNote(index)}
                          className="text-red-600 hover:text-red-700 p-1"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <textarea
                        value={note.note}
                        onChange={(e) => updateBehavioralNote(index, e.target.value)}
                        placeholder={`Add behavioral notes for ${note.child}...`}
                        className="w-full h-24 px-4 py-3 border border-gray-300 rounded-xl resize-none text-sm"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">
                  Click the + button to add behavioral notes for specific children
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center pt-4">
            <button
              onClick={() => onNavigate('staff-view-logs')}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-12 py-3 rounded-xl transition-colors"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              Cancel
            </button>
            <button 
              onClick={() => onNavigate('staff-view-logs')}
              className="bg-[#155323] hover:bg-[#0f3d1a] text-white px-12 py-3 rounded-xl transition-colors whitespace-nowrap"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <StaffBottomNav current="staff-log" onNavigate={onNavigate} />
    </div>
  );
}

// Staff Forms Screen
function StaffFormsScreen({ onNavigate, onLogout, forms, childrenList }: { onNavigate: (screen: StaffScreen, data?: any) => void; onLogout?: () => void; forms: any[]; childrenList: Child[] }) {
  const [showMenu, setShowMenu] = useState(false);

  // Group forms by their status and create a parent-form structure for display
  const formsByStatus = forms.reduce((acc: any, form: any) => {
    const status = form.status || 'pending';
    if (!acc[status]) {
      acc[status] = [];
    }
    
    // Find the child info for this form
    const child = childrenList.find((c: any) => c.childId === form.childId);
    
    // Check if we already have a parent entry for this form
    const existingParentEntry = acc[status].find((f: any) => f.id === form.id);
    if (!existingParentEntry) {
      acc[status].push({
        id: form.id,
        parentName: child?.name || 'Unknown',
        formCount: 1,
        status: status,
        submittedForms: [{
          id: form.id,
          title: form.title,
          parentGuardianName: child?.name || 'Unknown',
          contactNumber: child?.contact || 'N/A',
          emergencyContact: 'N/A',
          additionalNotes: '',
          signature: 'Pending',
          submittedDate: form.dueDate ? new Date(form.dueDate).toLocaleDateString() : 'N/A',
          formData: form
        }]
      });
    }
    return acc;
  }, {});

  const pendingForms = formsByStatus['pending'] || [];
  const completedForms = formsByStatus['completed'] || [];
  const outstandingForms = formsByStatus['outstanding'] || [];

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
              <button 
                onClick={onLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
              >
                Logout
              </button>
            </div>
          )}

          <div className="grid grid-cols-12 gap-4 items-center mb-4">
            <div className="col-span-2"></div>
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
        {/* Outstanding Forms Section */}
        {outstandingForms.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl mb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              Outstanding Forms
            </h2>
            <div className="space-y-4">
              {outstandingForms.map((form: any) => (
                <div
                  key={form.id}
                  onClick={() => onNavigate('staff-form-detail', form)}
                  className="bg-[#f2f3f7] rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-[#ef4444]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[rgba(110,190,127,0.43)] flex items-center justify-center">
                      <User className="w-6 h-6 text-[#155323]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1f2024]" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {form.parentName}
                      </p>
                      <p className="text-sm text-[#71727a]">Outstanding — {form.submittedForms?.[0]?.title || ''}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pending Forms Section */}
        {pendingForms.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl mb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              Pending Forms
            </h2>
            <div className="space-y-4">
              {pendingForms.map((form: any) => (
                <div
                  key={form.id}
                  onClick={() => onNavigate('staff-form-detail', form)}
                  className="bg-[#f2f3f7] rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-[#eab308]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[rgba(110,190,127,0.43)] flex items-center justify-center">
                      <User className="w-6 h-6 text-[#155323]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1f2024]" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {form.parentName}
                      </p>
                      <p className="text-sm text-[#71727a]">Pending Review — {form.submittedForms?.[0]?.title || ''}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completed Forms Section */}
        {completedForms.length > 0 && (
          <div>
            <h2 className="text-xl mb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              Completed Forms
            </h2>
            <div className="space-y-4">
              {completedForms.map((form: any) => (
                <div
                  key={form.id}
                  onClick={() => onNavigate('staff-form-detail', form)}
                  className="bg-[#f2f3f7] rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[rgba(110,190,127,0.43)] flex items-center justify-center">
                        <User className="w-6 h-6 text-[#155323]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#1f2024]" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {form.parentName}
                        </p>
                        <p className="text-sm text-[#71727a]">Completed — {form.submittedForms?.[0]?.title || ''}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <StaffBottomNav current="staff-forms" onNavigate={onNavigate} />
    </div>
  );
}

// Staff Form Detail Screen
function StaffFormDetailScreen({ form, onNavigate, onLogout, forms, setForms }: { form: any; onNavigate: (screen: StaffScreen) => void; onLogout?: () => void; forms: any[]; setForms?: (forms: any[]) => void }) {
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
              <button 
                onClick={onLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
              >
                Logout
              </button>
            </div>
          )}

          <div className="grid grid-cols-12 gap-4 items-center mb-4">
            <div className="col-span-2 flex justify-start">
              <button 
                onClick={() => onNavigate('staff-forms')}
                className="w-[30px] h-[29px] hover:opacity-80 transition-opacity"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            <div className="col-span-8 bg-[rgba(191,106,2,0.19)] rounded-2xl p-4 text-center">
              <h1 className="text-2xl text-[#bf6a02]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                {(
                  // Support both grouped form entries and raw form objects
                  (form && (form.title || form.formData?.title || form.submittedForms?.[0]?.title)) ||
                  'Permission Form'
                )}
              </h1>
            </div>
            <div className="col-span-2"></div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="space-y-6">
          {form ? (
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <div className="space-y-6">

                {/* Form Document Section */}
                <div className="bg-[#f2f3f7] rounded-xl p-6">
                  <h3
                    className="text-lg mb-3"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                  >
                    Form Document
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Download a copy of this form for your records
                  </p>

                  <button
                    onClick={() => alert("PDF download would start here")}
                    className="flex items-center gap-2 bg-[#BF6A02] hover:bg-[#A55A02] text-white py-3 px-6 rounded-lg transition-all shadow-md"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Download PDF
                  </button>
                </div>

                {/* Parent Name */}
                <div>
                  <label
                    className="block text-sm mb-2"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                  >
                    Parent/Guardian Name
                  </label>
                  <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700">
                    {form.parentName}
                  </div>
                </div>

                {/* Emergency Contact */}
                <div>
                  <label
                    className="block text-sm mb-2"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                  >
                    Emergency Contact
                  </label>
                  <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700">
                    {form.emergencyContact}
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label
                    className="block text-sm mb-2"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                  >
                    Additional Notes
                  </label>

                  <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg min-h-[100px]">
                    <p className={form.notes ? "text-gray-700" : "text-gray-400"}>
                      {form.notes || "Any additional information..."}
                    </p>
                  </div>
                </div>

                {/* E-Signature */}
                <div>
                  <label
                    className="block text-sm mb-2"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                  >
                    E-Signature *
                  </label>
                  <p className="text-xs text-gray-600 mb-2">
                    Parent signature below
                  </p>

                  <div className="border-2 border-gray-300 rounded-lg p-6 bg-white">
                    <p
                      className="text-2xl italic text-gray-800"
                      style={{ fontFamily: "Brush Script MT, cursive" }}
                    >
                      {form.signature}
                    </p>
                  </div>
                </div>

                {/* Approve / Reject - Only show for pending forms */}
                {(form.status === 'pending' || form.formData?.status === 'pending') && (
                  <div className="flex justify-center mt-6 gap-4">
                    <button
                      onClick={() => {
                        if (typeof setForms === 'function') {
                          setForms(forms.map((f: any) => f.id === form.id ? { ...f, status: 'completed' } : f));
                        }
                        alert(`Form "${form.title}" approved.`);
                        onNavigate('staff-forms');
                      }}
                      className="bg-[#155323] hover:bg-[#0f3d1a] text-white px-8 py-3 rounded-xl transition-colors"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Reject this form and send back to outstanding?`)) {
                          if (typeof setForms === 'function') {
                            setForms(forms.map((f: any) => f.id === form.id ? { ...f, status: 'outstanding' } : f));
                          }
                          alert(`Form "${form.title}" rejected.`);
                          onNavigate('staff-forms');
                        }
                      }}
                      className="bg-[#ed3241] hover:bg-[#d42635] text-white px-8 py-3 rounded-xl transition-colors"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>


      <StaffBottomNav current="staff-forms" onNavigate={onNavigate} />
    </div>
  );
}

// Staff Fees Screen
function StaffFeesScreen({ onNavigate, onLogout, payments, childrenList }: { onNavigate: (screen: StaffScreen, data?: any) => void; onLogout?: () => void; payments: any[]; childrenList: Child[] }) {
  const [showMenu, setShowMenu] = useState(false);
  const [expandedChildren, setExpandedChildren] = useState<string[]>([]);

  // Group payments by child and compute totals
  const childPaymentMap = childrenList.reduce((acc, child) => {
    const childPayments = payments.filter(p => p.childId === child.childId);
    const outstanding = childPayments.filter(p => p.status === 'outstanding').reduce((sum, p) => sum + (p.amount || 0), 0);
    const pending = childPayments.filter(p => p.status === 'pending').reduce((sum, p) => sum + (p.amount || 0), 0);
    const total = outstanding + pending;
    const status = outstanding > 0 ? 'outstanding' : pending > 0 ? 'pending' : 'paid';
    
    acc[child.childId] = {
      name: child.name,
      outstanding,
      pending,
      total,
      status,
      childPayments
    };
    return acc;
  }, {} as any);

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
              <button 
                onClick={onLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
              >
                Logout
              </button>
            </div>
          )}

          <div className="grid grid-cols-12 gap-4 items-center mb-4">
            <div className="col-span-2"></div>
            <div className="col-span-8 bg-[rgba(191,106,2,0.19)] rounded-2xl p-4 text-center">
              <h1 className="text-2xl text-[#bf6a02]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                Fees
              </h1>
            </div>
            <div className="col-span-2"></div>
          </div>

          <div className="flex justify-end">
            <button 
              onClick={() => onNavigate('staff-add-fee')}
              className="bg-[#155323] text-white px-6 py-3 rounded-xl hover:bg-[#0d3a18] transition-all"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              + Add Fee
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="space-y-3">
          {childrenList.map(child => {
            const paymentData = childPaymentMap[child.childId];
            if (!paymentData) return null;
            return (
              <div
                key={child.childId}
                className="rounded-xl p-4 border-l-4 bg-[#f2f3f7] border-[#ef4444]"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                      {paymentData.name}
                    </h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>Outstanding: <span className="font-semibold text-[#ef4444]">${paymentData.outstanding.toFixed(2)}</span></p>
                      <p>Pending: <span className="font-semibold text-[#eab308]">${paymentData.pending.toFixed(2)}</span></p>
                      <p className="pt-1 border-t border-gray-300" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                        Total: ${paymentData.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setExpandedChildren(prev => prev.includes(child.childId) ? prev.filter(id => id !== child.childId) : [...prev, child.childId]);
                      }}
                      className="px-3 py-1 rounded-lg border hover:bg-gray-100 text-sm"
                    >
                      {expandedChildren.includes(child.childId) ? 'Hide Details' : 'View Details'}
                    </button>
                  </div>
                </div>
                {expandedChildren.includes(child.childId) && (
                  <div className="mt-4 bg-white border border-gray-100 rounded-lg p-3">
                    {paymentData.childPayments.length === 0 ? (
                      <p className="text-sm text-gray-500">No payments for this child.</p>
                    ) : (
                      <div className="space-y-2">
                        {paymentData.childPayments.map((p: any) => (
                          <div key={p.paymentId} className="flex justify-between items-center px-2 py-2 rounded hover:bg-gray-50">
                            <div>
                              <div className="text-sm font-medium">{p.description || 'Fee'}</div>
                              <div className="text-xs text-gray-500">
                                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold`} style={{
                          backgroundColor: p.status === 'completed' ? '#10b981' : p.status === 'pending' ? '#eab308' : '#ef4444',
                          color: 'white'
                        }}>
                                  {p.status === 'completed' ? 'Paid' : p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-sm font-semibold">${(p.amount || 0).toFixed(2)}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <StaffBottomNav current="staff-fees" onNavigate={onNavigate} />
    </div>
  );
}

// Staff Add Fee Screen
function StaffAddFeeScreen({ onNavigate, onLogout, childrenList, payments, setPayments, events }: { onNavigate: (screen: StaffScreen) => void; onLogout?: () => void; childrenList: Child[]; payments: any[]; setPayments?: (payments: any[]) => void; events: any[] }) {
  const [showMenu, setShowMenu] = useState(false);
  const [feeType, setFeeType] = useState<'tuition' | 'event'>('event');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [status, setStatus] = useState<'outstanding' | 'pending' | 'completed'>('outstanding');
  const [showChildrenDropdown, setShowChildrenDropdown] = useState(false);

  const [selectedChildren, setSelectedChildren] = useState<string[]>([]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleChildSelection = (childId: string, checked: boolean) => {
    if (checked) {
      setSelectedChildren([...selectedChildren, childId]);
    } else {
      setSelectedChildren(selectedChildren.filter(c => c !== childId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedChildren(childrenList.map(c => c.childId));
    } else {
      setSelectedChildren([]);
    }
  };

  const allChildrenSelected = selectedChildren.length === childrenList.length;
  const someChildrenSelected = selectedChildren.length > 0 && !allChildrenSelected;

  // When an event is selected, auto-select its associated children
  React.useEffect(() => {
    if (feeType === 'event' && selectedEventId) {
      const ev = events.find((e: any) => e.id === selectedEventId);
      if (ev && Array.isArray(ev.children)) {
        setSelectedChildren(ev.children.slice());
      } else {
        setSelectedChildren([]);
      }
    } else if (feeType === 'tuition') {
      // For tuition, default to no selection
      setSelectedChildren([]);
    }
  }, [selectedEventId, feeType]);

  const handleSubmit = () => {
    const errors: string[] = [];

    // Validate amount
    if (!amount || parseFloat(amount) <= 0) {
      errors.push('Please enter a valid amount greater than $0');
    }

    // Validate event selection if on event tab
    if (feeType === 'event' && !selectedEventId) {
      errors.push('Please select an event');
    }

    // Validate description
    if (!description.trim()) {
      errors.push('Please enter a description');
    }

    // Validate at least one child selected
    if (selectedChildren.length === 0) {
      errors.push('Please select at least one child');
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Clear errors and proceed
    setValidationErrors([]);

    // Create new payment records for each selected child
    if (typeof setPayments === 'function') {
      const prevPayments: any[] = Array.isArray(payments) ? payments : [];
      const maxId = prevPayments.reduce((max: number, p: any) => {
          const m = p.paymentId && p.paymentId.toString().startsWith('p') ? parseInt(p.paymentId.toString().slice(1)) : 0;
          return Math.max(max, isNaN(m) ? 0 : m);
        }, 0);
      let nextId = maxId + 1;

        const newPayments = selectedChildren.map((childId: string) => ({
          paymentId: `p${nextId++}`,
          childId,
          amount: parseFloat(amount),
          description,
          status,
          eventId: feeType === 'event' ? selectedEventId : null
        }));

      const next = prevPayments.concat(newPayments);
      setPayments(next);
    }

    alert(`Fee of $${amount} added to ${selectedChildren.length} child(ren)`);
    onNavigate('staff-fees');
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
              <button 
                onClick={onLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
              >
                Logout
              </button>
            </div>
          )}

          <div className="grid grid-cols-12 gap-4 items-center mb-4">
            <div className="col-span-1 flex justify-start">
              <button 
                onClick={() => onNavigate('staff-fees')}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            <div className="col-span-10 bg-[rgba(191,106,2,0.19)] rounded-2xl p-4 text-center">
              <h1 className="text-2xl text-[#bf6a02]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                Add Fee
              </h1>
            </div>
            <div className="col-span-1"></div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="space-y-6">
          {/* Fee Type Selection */}
          <div className="space-y-2">
            <label className="text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
              Fee Type
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => setFeeType('event')}
                className={`flex-1 px-6 py-3 rounded-xl border-2 transition-colors ${
                  feeType === 'event'
                    ? 'border-[#155323] bg-[#155323] text-white'
                    : 'border-gray-300 bg-white text-gray-700'
                }`}
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                Event
              </button>
              <button
                onClick={() => setFeeType('tuition')}
                className={`flex-1 px-6 py-3 rounded-xl border-2 transition-colors ${
                  feeType === 'tuition'
                    ? 'border-[#155323] bg-[#155323] text-white'
                    : 'border-gray-300 bg-white text-gray-700'
                }`}
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                Tuition
              </button>
            </div>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <label className="text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
              Amount ($) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              min="0"
              step="0.01"
            />
          </div>

          {feeType === 'event' && (
            <div className="space-y-2">
              <label className="text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                Select Event <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedEventId || ''}
                onChange={(e) => setSelectedEventId(e.target.value ? parseInt(e.target.value) : null)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              >
                <option value="">-- Select an event --</option>
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Status */}
          <div className="space-y-2">
            <label className="text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'outstanding' | 'pending' | 'completed')}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            >
              <option value="outstanding">Outstanding</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
              Description <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={feeType === 'event' ? 'e.g., Drumheller Field Trip' : 'e.g., December Tuition'}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>

          {/* Children Selection */}
          <div className="space-y-2">
            <label className="text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
              Select Children <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <button
                onClick={() => setShowChildrenDropdown(!showChildrenDropdown)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl flex justify-between items-center bg-white"
              >
                <span className="text-gray-600">
                  {selectedChildren.length === 0
                    ? 'Select children'
                    : `${selectedChildren.length} child(ren) selected`}
                </span>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </button>

              {showChildrenDropdown && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-xl shadow-lg max-h-80 overflow-y-auto">
                  <div className="p-3 border-b border-gray-200 bg-gray-50">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={allChildrenSelected}
                        ref={(input) => {
                          if (input) {
                            input.indeterminate = someChildrenSelected;
                          }
                        }}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300"
                      />
                      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                        Select All
                      </span>
                    </label>
                  </div>
                  {childrenList.map((child) => (
                    <div key={child.childId} className="p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedChildren.includes(child.childId)}
                          onChange={(e) => handleChildSelection(child.childId, e.target.checked)}
                          className="w-5 h-5 rounded border-gray-300"
                        />
                        <span>{child.name}</span>
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {selectedChildren.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedChildren.map((childId) => {
                  const childName = childrenList.find(c => c.childId === childId)?.name || childId;
                  return (
                  <div
                    key={childId}
                    className="bg-[#155323] text-white px-3 py-1 rounded-lg text-sm flex items-center gap-2"
                  >
                    <span>{childName}</span>
                    <button
                      onClick={() => handleChildSelection(childId, false)}
                      className="hover:bg-white/20 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Validation Errors */}
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

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center pt-4">
            <button
              onClick={() => onNavigate('staff-fees')}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-12 py-3 rounded-xl transition-colors"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              className="bg-[#155323] hover:bg-[#0f3d1a] text-white px-12 py-3 rounded-xl transition-colors"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              Add Fee
            </button>
          </div>
        </div>
      </div>

      <StaffBottomNav current="staff-fees" onNavigate={onNavigate} />
    </div>
  );
}

// Main Staff App Component
export default function StaffApp({ onLogout, childrenList, events, setEvents, forms, setForms, payments, setPayments, activities, setActivities }: { onLogout?: () => void; childrenList: Child[]; events: any[]; setEvents: (events: any[]) => void; forms: any[]; setForms?: (forms: any[]) => void; payments: any[]; setPayments?: (payments: any[]) => void; activities: any[]; setActivities: (activities: any[]) => void }) {
  const [currentScreen, setCurrentScreen] = useState<StaffScreen>('staff-home');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [selectedForm, setSelectedForm] = useState<any>(null);
  const [attendance, setAttendance] = useState(
    Object.fromEntries(childrenList.map(c => [c.childId, false])) as { [key: string]: boolean }
  );

// Initialize activities with sample data if empty
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
      { childId: 'c1', name: 'Noah Bennett', selected: true, behavioralNote: 'Slept peacefully for the full hour' },
      { childId: 'c2', name: 'Lucas Carter', selected: true, behavioralNote: 'Had difficulty settling down initially' },
      { childId: 'c3', name: 'Ava Martinez', selected: true, behavioralNote: 'Fell asleep quickly' },
      { childId: 'c4', name: 'Alex James', selected: true, behavioralNote: '' },
      { childId: 'c5', name: 'Amy James', selected: true, behavioralNote: '' },
      { childId: 'c6', name: 'Rob James', selected: true, behavioralNote: 'Woke up after 30 minutes' },
      { childId: 'c7', name: 'Sofia Patel', selected: true, behavioralNote: '' },
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
      { childId: 'c1', name: 'Noah Bennett', selected: true, behavioralNote: 'Ate everything on plate' },
      { childId: 'c2', name: 'Lucas Carter', selected: true, behavioralNote: 'Did not like vegetables' },
      { childId: 'c3', name: 'Ava Martinez', selected: true, behavioralNote: 'Asked for seconds' },
      { childId: 'c4', name: 'Alex James', selected: true, behavioralNote: '' },
      { childId: 'c5', name: 'Amy James', selected: true, behavioralNote: '' },
      { childId: 'c6', name: 'Rob James', selected: true, behavioralNote: 'Good table manners' },
      { childId: 'c7', name: 'Sofia Patel', selected: true, behavioralNote: '' },
      { childId: 'c8', name: 'Emma Parker', selected: true, behavioralNote: '' },
      { childId: 'c9', name: 'Liam Thompson', selected: true, behavioralNote: 'Spilled water but cleaned up nicely' },
    ]
  },
  { 
    id: 3, 
    activityName: 'Story Time', 
    startTime: '10:00am', 
    endTime: '11:00am',
    startHour: '10',
    startMinute: '00',
    startPeriod: 'AM',
    endHour: '11',
    endMinute: '00',
    endPeriod: 'AM',
    notes: 'Read "The Very Hungry Caterpillar"',
    children: [
      { childId: 'c1', name: 'Noah Bennett', selected: true, behavioralNote: 'Very engaged, answered questions' },
      { childId: 'c2', name: 'Lucas Carter', selected: true, behavioralNote: '' },
      { childId: 'c3', name: 'Ava Martinez', selected: true, behavioralNote: 'Loved the pictures' },
      { childId: 'c4', name: 'Alex James', selected: true, behavioralNote: '' },
      { childId: 'c5', name: 'Amy James', selected: true, behavioralNote: '' },
      { childId: 'c6', name: 'Rob James', selected: true, behavioralNote: '' },
      { childId: 'c7', name: 'Sofia Patel', selected: true, behavioralNote: 'Asked to read it again' },
      { childId: 'c8', name: 'Emma Parker', selected: true, behavioralNote: '' },
      { childId: 'c9', name: 'Liam Thompson', selected: true, behavioralNote: 'Sat quietly and listened' },
    ]
  },
  { 
    id: 4, 
    activityName: 'Morning Circle Time', 
    startTime: '09:00am', 
    endTime: '09:30am',
    startHour: '09',
    startMinute: '00',
    startPeriod: 'AM',
    endHour: '09',
    endMinute: '30',
    endPeriod: 'AM',
    notes: 'Sang songs and shared weekend stories',
    children: [
      { childId: 'c1', name: 'Noah Bennett', selected: true, behavioralNote: 'Shared about visiting the zoo' },
      { childId: 'c2', name: 'Lucas Carter', selected: true, behavioralNote: '' },
      { childId: 'c3', name: 'Ava Martinez', selected: true, behavioralNote: 'Led a song' },
      { childId: 'c4', name: 'Alex James', selected: true, behavioralNote: '' },
      { childId: 'c5', name: 'Amy James', selected: true, behavioralNote: '' },
      { childId: 'c6', name: 'Rob James', selected: true, behavioralNote: '' },
      { childId: 'c7', name: 'Sofia Patel', selected: true, behavioralNote: '' },
      { childId: 'c8', name: 'Emma Parker', selected: true, behavioralNote: '' },
      { childId: 'c9', name: 'Liam Thompson', selected: true, behavioralNote: 'Very enthusiastic singing' },
    ]
  },
  { 
    id: 5, 
    activityName: 'Outdoor Play', 
    startTime: '02:00pm', 
    endTime: '03:00pm',
    startHour: '02',
    startMinute: '00',
    startPeriod: 'PM',
    endHour: '03',
    endMinute: '00',
    endPeriod: 'PM',
    notes: 'Children played on the playground equipment',
    children: [
      { childId: 'c1', name: 'Noah Bennett', selected: true, behavioralNote: 'Loved the swings' },
      { childId: 'c2', name: 'Lucas Carter', selected: true, behavioralNote: '' },
      { childId: 'c3', name: 'Ava Martinez', selected: true, behavioralNote: 'Great at climbing' },
      { childId: 'c4', name: 'Alex James', selected: true, behavioralNote: '' },
      { childId: 'c5', name: 'Amy James', selected: true, behavioralNote: 'Played nicely with others' },
      { childId: 'c6', name: 'Rob James', selected: true, behavioralNote: 'Enjoyed the slide' },
      { childId: 'c7', name: 'Sofia Patel', selected: true, behavioralNote: '' },
      { childId: 'c8', name: 'Emma Parker', selected: true, behavioralNote: '' },
      { childId: 'c9', name: 'Liam Thompson', selected: true, behavioralNote: 'Shared toys well' },
    ]
  },
  { 
    id: 6, 
    activityName: 'Snack Time', 
    startTime: '09:30am', 
    endTime: '10:00am',
    startHour: '09',
    startMinute: '30',
    startPeriod: 'AM',
    endHour: '10',
    endMinute: '00',
    endPeriod: 'AM',
    notes: 'Apple slices and crackers served',
    children: [
      { childId: 'c1', name: 'Noah Bennett', selected: true, behavioralNote: '' },
      { childId: 'c2', name: 'Lucas Carter', selected: true, behavioralNote: 'Loved the apples' },
      { childId: 'c3', name: 'Ava Martinez', selected: true, behavioralNote: '' },
      { childId: 'c4', name: 'Alex James', selected: true, behavioralNote: '' },
      { childId: 'c5', name: 'Amy James', selected: true, behavioralNote: '' },
      { childId: 'c6', name: 'Rob James', selected: true, behavioralNote: 'Asked for seconds' },
      { childId: 'c7', name: 'Sofia Patel', selected: true, behavioralNote: '' },
      { childId: 'c8', name: 'Emma Parker', selected: true, behavioralNote: '' },
      { childId: 'c9', name: 'Liam Thompson', selected: true, behavioralNote: '' },
    ]
  },
  { 
    id: 7, 
    activityName: 'Art and Crafts', 
    startTime: '01:00pm', 
    endTime: '02:00pm',
    startHour: '01',
    startMinute: '00',
    startPeriod: 'PM',
    endHour: '02',
    endMinute: '00',
    endPeriod: 'PM',
    notes: 'Made paper plate animals',
    children: [
      { childId: 'c1', name: 'Noah Bennett', selected: true, behavioralNote: 'Created a colorful lion' },
      { childId: 'c2', name: 'Lucas Carter', selected: true, behavioralNote: '' },
      { childId: 'c3', name: 'Ava Martinez', selected: true, behavioralNote: 'Very creative design' },
      { childId: 'c4', name: 'Alex James', selected: true, behavioralNote: '' },
      { childId: 'c5', name: 'Amy James', selected: true, behavioralNote: 'Made a butterfly' },
      { childId: 'c6', name: 'Rob James', selected: true, behavioralNote: '' },
      { childId: 'c7', name: 'Sofia Patel', selected: true, behavioralNote: '' },
      { childId: 'c8', name: 'Emma Parker', selected: true, behavioralNote: 'Excellent cutting skills' },
      { childId: 'c9', name: 'Liam Thompson', selected: true, behavioralNote: '' },
    ]
  },
]);
  }
}, [activities.length, setActivities]);

  const [selectedLog, setSelectedLog] = useState<any>(null);

  const addActivity = (logData: any) => {
    const newLog = {
      id: activities.length + 1,
      ...logData
    };
    setActivities([newLog, ...activities]);
  };

  const addEvent = (eventData: any) => {
    const newEvent = {
      id: events.length + 1,
      ...eventData,
      hasForm: eventData.hasForm ?? false
    };
    const nextEvents = [...events, newEvent].sort((a: any, b: any) => a.date.getTime() - b.date.getTime());
    setEvents(nextEvents);

    // create forms for the children of the new event only if event.hasForm is true and setter provided
    if (typeof setForms === 'function' && newEvent.hasForm && Array.isArray(newEvent.children) && newEvent.children.length > 0) {
      {
        const prevForms: any[] = Array.isArray(forms) ? forms : [];
        const maxId = prevForms.reduce((max: number, f: any) => {
          const m = f.id && f.id.toString().startsWith('f') ? parseInt(f.id.toString().slice(1)) : 0;
          return Math.max(max, isNaN(m) ? 0 : m);
        }, 0);
        let nextId = maxId + 1;
        const newForms = newEvent.children.map((childId: string) => ({
          id: `f${nextId++}`,
          title: `${newEvent.title} Permission Form`,
          eventId: newEvent.id,
          childId,
          dueDate: newEvent.date || new Date(),
          status: 'outstanding',
          parentName: '',
          emergencyContact: '',
          notes: '',
          signature: ''
        }));
        const nextForms = prevForms.concat(newForms);
        setForms && setForms(nextForms);
      }
    }
  };

  const updateEvent = (updatedEvent: any) => {
    // capture previous event for computing diffs
    const prevEvent = events.find((e) => e.id === updatedEvent.id);

    // preserve hasForm if not explicitly provided in update
    const eventToSave = {
      ...updatedEvent,
      hasForm: updatedEvent.hasForm !== undefined ? updatedEvent.hasForm : prevEvent?.hasForm ?? false
    };

    {
      const merged = events.map((e: any) => e.id === updatedEvent.id ? { ...e, ...eventToSave } : e);
      const nextEvents = merged.sort((a: any, b: any) => a.date.getTime() - b.date.getTime());
      setEvents(nextEvents);
    }
    setSelectedEvent(eventToSave);

    // synchronize forms when children list changes (only if event.hasForm is true)
    if (typeof setForms === 'function' && prevEvent && eventToSave.hasForm) {
      const prevChildren: string[] = prevEvent.children || [];
      const newChildren: string[] = eventToSave.children || [];

      const added = newChildren.filter((c) => !prevChildren.includes(c));
      const removed = prevChildren.filter((c) => !newChildren.includes(c));

      {
        let nextForms = [...(Array.isArray(forms) ? forms : [])];

        // remove forms for removed children for this event
        if (removed.length > 0) {
          nextForms = nextForms.filter((f) => !(f.eventId === updatedEvent.id && removed.includes(f.childId)));
        }

        // add forms for newly added children
        if (added.length > 0) {
          const maxId = nextForms.reduce((max, f) => {
            const m = f.id && f.id.toString().startsWith('f') ? parseInt(f.id.toString().slice(1)) : 0;
            return Math.max(max, isNaN(m) ? 0 : m);
          }, 0);
          let nextId = maxId + 1;

          const newForms = added.map((childId) => ({
            id: `f${nextId++}`,
            title: `${eventToSave.title} Permission Form`,
            eventId: updatedEvent.id,
            childId,
            dueDate: eventToSave.date || new Date(),
            status: 'outstanding',
            parentName: '',
            emergencyContact: '',
            notes: '',
            signature: ''
          }));

          nextForms = nextForms.concat(newForms);
        }

        setForms && setForms(nextForms);
      }
    }
    // If the event previously had a form but now does not, remove all form entries for this event
    if (typeof setForms === 'function' && prevEvent && prevEvent.hasForm && !eventToSave.hasForm) {
      const prevForms = Array.isArray(forms) ? forms : [];
      const filtered = prevForms.filter((f: any) => f.eventId !== updatedEvent.id);
      setForms && setForms(filtered);
    }
  };

  const navigate = (screen: StaffScreen, data?: any) => {
    setCurrentScreen(screen);
    if (screen === 'staff-event-details' || screen === 'staff-edit-event') setSelectedEvent(data);
    if (screen === 'staff-edit-log') setSelectedLog(data);
    if (screen === 'staff-form-detail') setSelectedForm(data);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'staff-home':
        return <StaffHomeScreen onNavigate={navigate} events={events} onLogout={onLogout} />;
      case 'staff-log':
        return <StaffLogScreen onNavigate={navigate} onAddLog={addActivity} onLogout={onLogout} childrenList={childrenList} />;
      case 'staff-class-list':
        return <StaffClassListScreen onNavigate={navigate} attendance={attendance} onLogout={onLogout} childrenList={childrenList} />;
      case 'staff-attendance':
        return <StaffAttendanceScreen onNavigate={navigate} attendance={attendance} setAttendance={setAttendance} onLogout={onLogout} childrenList={childrenList} />;
      case 'staff-events':
        return <StaffEventsScreen events={events} onNavigate={navigate} onLogout={onLogout} />;
      case 'staff-event-details':
        return <StaffEventDetailsScreen event={selectedEvent} onNavigate={navigate} onLogout={onLogout} childrenList={childrenList} />;
      case 'staff-add-event':
        return <StaffAddEditEventScreen onNavigate={navigate} mode="add" onAddEvent={addEvent} onLogout={onLogout} childrenList={childrenList} />;
      case 'staff-edit-event':
        return <StaffAddEditEventScreen event={selectedEvent} onNavigate={navigate} mode="edit" onAddEvent={addEvent} onUpdateEvent={updateEvent} onLogout={onLogout} childrenList={childrenList} />;
      case 'staff-view-logs':
        return <StaffViewLogsScreen onNavigate={navigate} activities={activities} onLogout={onLogout} />;
      case 'staff-edit-log':
        return <StaffEditLogScreen onNavigate={navigate} log={selectedLog} onLogout={onLogout} childrenList={childrenList} />;
      case 'staff-forms':
        return <StaffFormsScreen onNavigate={navigate} onLogout={onLogout} forms={forms} childrenList={childrenList} />;
      case 'staff-form-detail':
        return <StaffFormDetailScreen form={selectedForm} onNavigate={navigate} onLogout={onLogout} forms={forms} setForms={setForms} />;
      case 'staff-fees':
        return <StaffFeesScreen onNavigate={navigate} onLogout={onLogout} payments={payments} childrenList={childrenList} />;
      case 'staff-add-fee':
        return <StaffAddFeeScreen onNavigate={navigate} onLogout={onLogout} childrenList={childrenList} payments={payments} setPayments={setPayments} events={events} />;
      default:
        return <StaffHomeScreen onNavigate={navigate} events={events} onLogout={onLogout} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {renderScreen()}
    </div>
  );
}
