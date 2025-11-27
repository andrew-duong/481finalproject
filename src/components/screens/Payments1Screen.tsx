import Payments1Parents from '../../imports/Payments1Parents';
import { Screen } from '../../App';

interface Payments1ScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function Payments1Screen({ onNavigate }: Payments1ScreenProps) {
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // Check for back arrow
    if (target.closest('[data-name="arrow-left"]')) {
      e.preventDefault();
      onNavigate('home');
      return;
    }
    
    // Check for payment cards or Pay Now buttons
    if (target.closest('[data-name="Payment1"]') || target.closest('[data-name="Payment2"]') || target.closest('[data-name="Payment3"]')) {
      e.preventDefault();
      onNavigate('payments2');
      return;
    }
    
    if (target.textContent?.includes('Pay Now')) {
      e.preventDefault();
      onNavigate('payments2');
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
      <Payments1Parents />
    </div>
  );
}
