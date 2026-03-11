import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 40, className = '' }) => {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="32,6 54,18 32,30 10,18" fill="#1E5EFF" />
      <polygon points="10,18 32,30 32,58 10,46" fill="#0B3D2E" />
      <polygon points="54,18 32,30 32,58 54,46" fill="#082B21" />
      <polyline
        points="32,6 54,18 54,46 32,58 10,46 10,18"
        fill="none"
        stroke="rgba(0,0,0,0.22)"
        strokeWidth="2"
      />
    </svg>
  );
};
