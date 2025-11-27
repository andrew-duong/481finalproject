import FormViewParent from '../../imports/FormViewParent';
import { Screen } from '../../App';

interface FormViewScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function FormViewScreen({ onNavigate }: FormViewScreenProps) {
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // Check for back arrow
    if (target.closest('[data-name="arrow-left"]')) {
      e.preventDefault();
      onNavigate('forms');
      return;
    }
    
    // Check for Submit button
    if (target.textContent?.includes('Submit')) {
      e.preventDefault();
      onNavigate('forms');
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
    
    // Check for Payments tab
    if (target.textContent?.includes('Payments') || target.closest('[data-name="dollar-sign"]')) {
      e.preventDefault();
      onNavigate('payments1');
      return;
    }
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <FormViewParent />
    </div>
  );
}
