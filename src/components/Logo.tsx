import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
  showWordmark?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 36, className = '', showWordmark = true }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
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
      {showWordmark && (
        <div>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#0B0B0B', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
            Ansh Bhatt
          </div>
          <div style={{ fontSize: '10px', fontWeight: 500, color: '#5F5F5F', letterSpacing: '0.05em', textTransform: 'uppercase', lineHeight: 1.2 }}>
            Startup Consultant
          </div>
        </div>
      )}
    </div>
  );
};
