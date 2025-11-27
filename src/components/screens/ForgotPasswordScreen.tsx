import LoginPageForgotPassParent from '../../imports/LoginPageForgotPassParent';
import { Screen } from '../../App';

interface ForgotPasswordScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function ForgotPasswordScreen({ onNavigate }: ForgotPasswordScreenProps) {
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // Check for back arrow
    if (target.closest('[data-name="arrow-left"]')) {
      e.preventDefault();
      onNavigate('login');
      return;
    }
    
    // Check for Send button
    if (target.textContent?.includes('Send') && target.closest('[data-name="Button"]')) {
      e.preventDefault();
      onNavigate('login');
      return;
    }
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <LoginPageForgotPassParent />
    </div>
  );
}
