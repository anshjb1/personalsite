import React from 'react';

interface PillProps {
  children: React.ReactNode;
  className?: string;
}

export const Pill: React.FC<PillProps> = ({ children, className = '' }) => {
  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold
      border border-[#E8E8E8] text-[#5F5F5F] ${className}`}
    >
      {children}
    </span>
  );
};
