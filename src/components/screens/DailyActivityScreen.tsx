import DailyActivityParent from '../../imports/DailyActivityParent';
import { Screen } from '../../App';

interface DailyActivityScreenProps {
  onNavigate: (screen: Screen, data?: any) => void;
}

export function DailyActivityScreen({ onNavigate }: DailyActivityScreenProps) {
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // Check for back arrow
    if (target.closest('[data-name="arrow-left"]')) {
      e.preventDefault();
      onNavigate('home');
      return;
    }
    
    // Check for child cards
    if (target.closest('[data-name="ChildCard1"]')) {
      e.preventDefault();
      onNavigate('rob-activity', { child: 'Rob' });
      return;
    }
    
    if (target.closest('[data-name="ChildCard2"]')) {
      e.preventDefault();
      onNavigate('rob-activity', { child: 'Anna' });
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
      <DailyActivityParent />
    </div>
  );
}
