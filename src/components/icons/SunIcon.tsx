import React from 'react';
import type { IconWithStrokeProps } from './types';

export const SunIcon: React.FC<IconWithStrokeProps> = ({
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
  className = '',
  title = 'Modo claro',
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
        cx="12" 
        cy="12" 
        r="4" 
        fill={color}
      />
      <path 
        d="M12 5V3" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round"
      />
      <path 
        d="M12 21V19" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round"
      />
      <path 
        d="M16.95 7.04996L18.3643 5.63574" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round"
      />
      <path 
        d="M5.63608 18.3644L7.05029 16.9502" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round"
      />
      <path 
        d="M19 12L21 12" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round"
      />
      <path 
        d="M3 12L5 12" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round"
      />
      <path 
        d="M16.95 16.95L18.3643 18.3643" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round"
      />
      <path 
        d="M5.63608 5.63559L7.05029 7.0498" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round"
      />
    </svg>
  );
}; 