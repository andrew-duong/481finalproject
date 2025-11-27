import LoginPageRegisterParent from '../../imports/LoginPageRegisterParent';
import { Screen } from '../../App';

interface RegisterScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function RegisterScreen({ onNavigate }: RegisterScreenProps) {
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // Check for back arrow
    if (target.closest('[data-name="arrow-left"]')) {
      e.preventDefault();
      onNavigate('landing');
      return;
    }
    
    // Check for Register button
    if (target.textContent?.includes('Register') && target.closest('[data-name="Button"]')) {
      e.preventDefault();
      onNavigate('home');
      return;
    }
    
    // Check for Login link
    if (target.textContent?.includes('Login')) {
      e.preventDefault();
      onNavigate('login');
      return;
    }
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <LoginPageRegisterParent />
    </div>
  );
}
