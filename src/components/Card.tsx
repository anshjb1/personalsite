import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'white' | 'soft';
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, variant = 'white', className = '' }) => {
  const bgClass = variant === 'soft' ? 'bg-[#F6F6F6]' : 'bg-white';
  return (
    <div
      className={`border border-[#E8E8E8] rounded-[14px] p-4 md:p-6 ${bgClass} ${className}`}
    >
      {children}
    </div>
  );
};
