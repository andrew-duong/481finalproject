import { ReactNode, MouseEvent } from 'react';

interface ScreenWrapperProps {
  children: ReactNode;
  onNavigate: (screen: string, data?: any) => void;
}

export function ScreenWrapper({ children, onNavigate }: ScreenWrapperProps) {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const button = target.closest('[data-nav]');
    
    if (button) {
      e.preventDefault();
      e.stopPropagation();
      const navTo = button.getAttribute('data-nav');
      const navData = button.getAttribute('data-nav-data');
      
      if (navTo) {
        onNavigate(navTo, navData ? JSON.parse(navData) : undefined);
      }
    }
  };

  return (
    <div onClick={handleClick}>
      {children}
    </div>
  );
}
