import Payments3Parents from '../../imports/Payments3Parents';
import { Screen } from '../../App';

interface Payments3ScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function Payments3Screen({ onNavigate }: Payments3ScreenProps) {
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // Check for back arrow
    if (target.closest('[data-name="arrow-left"]')) {
      e.preventDefault();
      onNavigate('payments2');
      return;
    }
    
    // Check for payment method options
    if (target.closest('[data-name="Option1"]') || target.closest('[data-name="Option2"]')) {
      // Could navigate to a payment confirmation or success screen
      // For now, go back to payments list
      e.preventDefault();
      setTimeout(() => onNavigate('payments1'), 500);
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
      <Payments3Parents />
    </div>
  );
}
