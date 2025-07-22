import React from 'react';
import type { IconWithStrokeProps } from './types';

export const SearchIcon: React.FC<IconWithStrokeProps> = ({
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
  className = '',
  title = 'Buscar',
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
      <circle 
        cx="11" 
        cy="11" 
        r="8" 
        stroke={color} 
        strokeWidth={strokeWidth}
      />
      <path 
        d="m21 21-4.35-4.35" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}; 