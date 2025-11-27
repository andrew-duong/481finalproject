import LandingPage1 from '../../imports/LandingPage1';
import { Screen } from '../../App';

interface LandingScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function LandingScreen({ onNavigate }: LandingScreenProps) {
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    
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
    
    // Check for Menu icon
    if (target.closest('[data-name="Menu"]')) {
      e.preventDefault();
      onNavigate('landing-menu');
      return;
    }
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <LandingPage1 />
    </div>
  );
}
