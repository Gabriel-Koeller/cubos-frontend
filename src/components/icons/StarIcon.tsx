import React from 'react';
import type { IconProps } from './types';

export const StarIcon: React.FC<IconProps & { filled?: boolean; strokeWidth?: number | string }> = ({
  size = 24,
  color = 'currentColor',
  className = '',
  title = 'Avaliação',
  filled = false,
  strokeWidth = 2,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? color : 'none'}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={title}
      role="img"
      {...props}
    >
      <polygon 
        points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
        stroke={filled ? 'none' : color}
        strokeWidth={filled ? 0 : strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}; 