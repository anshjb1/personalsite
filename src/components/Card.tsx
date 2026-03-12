import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'white' | 'soft';
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, variant = 'white', className = '', hover = true }) => {
  const bg = variant === 'soft' ? 'bg-soft' : 'bg-white';
  const hoverClass = hover ? 'hover:border-[#d0d0d0] hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)]' : '';
  return (
    <div className={`border border-line rounded-[14px] p-7 ${bg} transition-all duration-200 ${hoverClass} ${className}`}>
      {children}
    </div>
  );
};
