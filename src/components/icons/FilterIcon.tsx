import React from 'react';
import type { IconWithStrokeProps } from './types';

export const FilterIcon: React.FC<IconWithStrokeProps> = ({
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
  className = '',
  title = 'Filtros',
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
        d="M5 12L5 4" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round"
      />
      <path 
        d="M19 20L19 18" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round"
      />
      <path 
        d="M5 20L5 16" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round"
      />
      <path 
        d="M19 12L19 4" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round"
      />
      <path 
        d="M12 7L12 4" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round"
      />
      <path 
        d="M12 20L12 12" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round"
      />
      <circle 
        cx="5" 
        cy="14" 
        r="2" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round"
      />
      <circle 
        cx="12" 
        cy="9" 
        r="2" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round"
      />
      <circle 
        cx="19" 
        cy="15" 
        r="2" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round"
      />
    </svg>
  );
}; 