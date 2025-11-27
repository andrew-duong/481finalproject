import RobActivityParent from '../../imports/RobActivityParent';
import { Screen } from '../../App';

interface RobActivityScreenProps {
  onNavigate: (screen: Screen) => void;
  childName?: string;
}

export function RobActivityScreen({ onNavigate, childName = 'Rob' }: RobActivityScreenProps) {
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // Check for back arrow
    if (target.closest('[data-name="arrow-left"]')) {
      e.preventDefault();
      onNavigate('daily-activity');
      return;
    }
    
    // Check for activity cards
    if (target.closest('[data-name="Activity1"]') || target.closest('[data-name="Activity2"]') || target.closest('[data-name="Activity3"]')) {
      e.preventDefault();
      onNavigate('rob-activity-details');
      return;
    }
    
    // Check for Home tab
    if (target.textContent?.includes('Home') || target.closest('[data-name="house"]')) {
      e.preventDefault();
      onNavigate('home');
      return;
    }
    
    // Check for Events tab
    if (target.textContent?.includes('Events') || target.closest('[data-name="calendar-days"]')) {
      e.preventDefault();
      onNavigate('events');
      return;
    }
    
    // Check for Daily Activity tab - go back to list
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
      <RobActivityParent />
    </div>
  );
}
