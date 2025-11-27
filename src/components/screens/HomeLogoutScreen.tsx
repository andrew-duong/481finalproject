import HomePageLogoutParents from '../../imports/HomePageLogoutParents';
import { Screen } from '../../App';

interface HomeLogoutScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function HomeLogoutScreen({ onNavigate }: HomeLogoutScreenProps) {
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // Check for close menu
    if (target.closest('[data-name="Group6801"]') || target.closest('[data-name="x"]')) {
      e.preventDefault();
      onNavigate('home');
      return;
    }
    
    // Check for Logout button
    if (target.textContent?.includes('Log out')) {
      e.preventDefault();
      onNavigate('landing');
      return;
    }
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <HomePageLogoutParents />
    </div>
  );
}
