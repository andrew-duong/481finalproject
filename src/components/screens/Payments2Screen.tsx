import Payments2Parents from '../../imports/Payments2Parents';
import { Screen } from '../../App';

interface Payments2ScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function Payments2Screen({ onNavigate }: Payments2ScreenProps) {
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // Check for back arrow
    if (target.closest('[data-name="arrow-left"]')) {
      e.preventDefault();
      onNavigate('payments1');
      return;
    }
    
    // Check for Pay Now button
    if (target.textContent?.includes('Pay Now')) {
      e.preventDefault();
      onNavigate('payments3');
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
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <Payments2Parents />
    </div>
  );
}
