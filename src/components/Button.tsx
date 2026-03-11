import React from 'react';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'accent' | 'secondary';
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  href,
  onClick,
  variant = 'primary',
  children,
  className = '',
}) => {
  const baseStyles = `
    inline-flex items-center justify-center px-6 py-3 rounded-full font-bold
    transition-all duration-200 text-sm font-[850]
    focus:outline-none focus:ring-2 focus:ring-offset-2
  `;

  const variants = {
    primary: 'bg-[#0B0B0B] text-white hover:bg-opacity-90',
    accent: 'bg-gradient-to-r from-[#0B3D2E] to-[#1E5EFF] text-white hover:opacity-90',
    secondary: 'bg-white text-[#0B0B0B] border-2 border-[#0B0B0B] hover:bg-[#F6F6F6]',
  };

  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
};
