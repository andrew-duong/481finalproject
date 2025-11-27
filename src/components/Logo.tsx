import React from 'react';
import Icon from '../imports/Icon';

export function Logo({ size = 'small' }: { size?: 'small' | 'large' }) {
  if (size === 'large') {
    return (
      <div className="relative inline-block">
        <div className="w-12 h-12 absolute -top-4 -left-4">
          <Icon />
        </div>
        <h1 className="text-4xl md:text-5xl relative" style={{ fontFamily: 'Angkor, cursive', color: '#000000', position: 'relative', zIndex: 1 }}>
          SUNNYVIEW DAYCARE
        </h1>
      </div>
    );
  }
  
  return (
    <div className="relative inline-block">
      <div className="w-8 h-8 absolute -top-3 -left-3">
        <Icon />
      </div>
      <h1 className="text-2xl md:text-3xl relative whitespace-nowrap" style={{ fontFamily: 'Angkor, cursive', color: '#000000', position: 'relative', zIndex: 1 }}>
        SUNNYVIEW DAYCARE
      </h1>
    </div>
  );
}
