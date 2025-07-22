import React from 'react';
import type { IconWithStrokeProps } from './types';

export const LogoutIcon: React.FC<IconWithStrokeProps> = ({
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
  className = '',
  title = 'Sair',
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={title}
      role="img"
      {...props}
    >
      <path 
        d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline 
        points="16,17 21,12 16,7" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line 
        x1="21" 
        y1="12" 
        x2="9" 
        y2="12" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}; 