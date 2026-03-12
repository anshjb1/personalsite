import React from 'react';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'accent' | 'secondary' | 'ghost';
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  href,
  onClick,
  variant = 'primary',
  children,
  className = '',
  type = 'button',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-5 py-2.5 text-[13px]',
    lg: 'px-7 py-3.5 text-[14px]',
  };

  const variants = {
    primary: 'bg-ink text-white hover:opacity-85',
    accent: 'text-white hover:opacity-90',
    secondary: 'bg-white text-ink border border-ink hover:bg-soft',
    ghost: 'bg-white/10 text-white border border-white/30 hover:bg-white/20',
  };

  const base = `inline-flex items-center justify-center gap-1.5 rounded-full font-bold transition-all duration-150 cursor-pointer ${sizeClasses[size]} ${variants[variant]} ${className}`;

  const accentStyle = variant === 'accent' ? { background: 'linear-gradient(135deg, #0B3D2E 0%, #1E5EFF 100%)' } : {};

  if (href) {
    return (
      <a href={href} className={base} style={accentStyle}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={base} style={accentStyle}>
      {children}
    </button>
  );
};
