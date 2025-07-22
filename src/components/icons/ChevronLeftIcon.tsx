import React from 'react';
import type { IconWithStrokeProps } from './types';

export const ChevronLeftIcon: React.FC<IconWithStrokeProps> = ({
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
  className = '',
  title = 'Voltar',
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
        d="m15 18-6-6 6-6" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}; 