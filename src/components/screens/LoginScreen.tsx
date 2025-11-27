import LoginPageParent from '../../imports/LoginPageParent';
import { Screen } from '../../App';

interface LoginScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function LoginScreen({ onNavigate }: LoginScreenProps) {
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // Check for back arrow
    if (target.closest('[data-name="arrow-left"]')) {
      e.preventDefault();
      onNavigate('landing');
      return;
    }
    
    // Check for Login button
    if (target.textContent?.includes('Login') && target.closest('[data-name="Button"]')) {
      e.preventDefault();
      onNavigate('home');
      return;
    }
    
    // Check for Forgot Password
    if (target.textContent?.includes('Forgot Password')) {
      e.preventDefault();
      onNavigate('forgot-password');
      return;
    }
    
    // Check for Register link
    if (target.textContent?.includes('Register')) {
      e.preventDefault();
      onNavigate('register');
      return;
    }
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <LoginPageParent />
    </div>
  );
}
