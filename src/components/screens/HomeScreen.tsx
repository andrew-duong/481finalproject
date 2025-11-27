import HomePageParent from '../../imports/HomePageParent';
import { Screen } from '../../App';

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // Check for menu icon
    if (target.closest('[data-name="Menu"]')) {
      e.preventDefault();
      onNavigate('home-logout');
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
    
    // Check for Payments tab
    if (target.textContent?.includes('Payments') || target.closest('[data-name="dollar-sign"]')) {
      e.preventDefault();
      onNavigate('payments1');
      return;
    }
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <HomePageParent />
    </div>
  );
}
