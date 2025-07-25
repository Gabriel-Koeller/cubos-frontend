import React from "react";
import type { IconWithStrokeProps } from "./types";

export const SearchIcon: React.FC<IconWithStrokeProps> = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 1.5,
  className = "",
  title,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      role="img"
      aria-hidden={!title}
      {...props}
    >
      {title && <title>{title}</title>}

      {/* Círculo principal da lupa */}
      <circle
        cx="10.5"
        cy="10.5"
        r="7.5"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />

      {/* Cabo da lupa */}
      <line
        x1="16.5"
        y1="16.5"
        x2="21"
        y2="21"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};
