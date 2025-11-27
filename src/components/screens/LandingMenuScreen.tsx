import LandingPageMenu from '../../imports/LandingPageMenu';
import { Screen } from '../../App';

interface LandingMenuScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function LandingMenuScreen({ onNavigate }: LandingMenuScreenProps) {
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // Check for close menu (clicking outside or close button)
    if (target.closest('[data-name="Group6801"]') || target.closest('[data-name="Vector"]')) {
      e.preventDefault();
      onNavigate('landing');
      return;
    }
    
    // Check for Login button
    if (target.textContent?.includes('Login') && target.closest('[data-name="Login Button"]')) {
      e.preventDefault();
      onNavigate('login');
      return;
    }
    
    // Check for Register button
    if (target.textContent?.includes('Register') && target.closest('[data-name="Register Button"]')) {
      e.preventDefault();
      onNavigate('register');
      return;
    }
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <LandingPageMenu />
    </div>
  );
}
