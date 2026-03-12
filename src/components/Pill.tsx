import React from 'react';

interface PillProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'pine' | 'blue';
}

export const Pill: React.FC<PillProps> = ({ children, className = '', variant = 'default' }) => {
  const variants = {
    default: 'border-line text-ink bg-white hover:border-pine hover:text-pine hover:bg-soft',
    pine: 'border-pine/30 text-pine bg-pine/5',
    blue: 'border-blue/30 text-blue bg-blue/5',
  };

  return (
    <span
      className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-[11.5px] font-[600] border transition-all duration-150 ${variants[variant]} ${className}`}
      style={{ letterSpacing: '-0.01em' }}
    >
      {children}
    </span>
  );
};
