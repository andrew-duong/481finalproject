import EventsParents from '../../imports/EventsParents';
import { Screen } from '../../App';

interface EventsScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function EventsScreen({ onNavigate }: EventsScreenProps) {
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // Check for back arrow
    if (target.closest('[data-name="arrow-left"]')) {
      e.preventDefault();
      onNavigate('home');
      return;
    }
    
    // Check for event card click
    if (target.closest('[data-name="Event1"]') || target.closest('[data-name="Event2"]') || target.closest('[data-name="Event3"]')) {
      e.preventDefault();
      onNavigate('event-details');
      return;
    }
    
    // Check for Home tab
    if (target.textContent?.includes('Home') || target.closest('[data-name="house"]')) {
      e.preventDefault();
      onNavigate('home');
      return;
    }
    
    // Check for Daily Activity tab
    if (target.textContent?.includes('Daily Activity') || target.closest('[data-name="clipboard-list"]')) {
      e.preventDefault();
      onNavigate('daily-activity');
      return;
    }
    
    // Check for Forms tab
    if (target.textContent?.includes('Forms') || target.closest('[data-name="square-pen"]')) {
      e.preventDefault();
      onNavigate('forms');
      return;
    }
    
    // Check for Payments tab
    if (target.textContent?.includes('Payments') || target.closest('[data-name="dollar-sign"]')) {
      e.preventDefault();
      onNavigate('payments1');
      return;
    }
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <EventsParents />
    </div>
  );
}
