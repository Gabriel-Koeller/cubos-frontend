import React from 'react';
import type { IconWithStrokeProps } from './types';

export const FilterIcon: React.FC<IconWithStrokeProps> = ({
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
  className = '',
  title,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-hidden={!title}
      {...props}
    >
      {title && <title>{title}</title>}
      <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3" />
    </svg>
  );
}; 