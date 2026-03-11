interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'accent' | 'secondary';
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit';
}

export const Button: React.FC<ButtonProps> = ({
  href,
  onClick,
  variant = 'primary',
  children,
  className = '',
  type = 'button',
}) => {
  const base = 'inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-bold transition-all duration-150';

  const variants = {
    primary: 'bg-ink text-white hover:bg-ink/90',
    accent: 'bg-gradient-to-r from-pine to-blue text-white hover:opacity-90',
    secondary: 'bg-white text-ink border border-ink hover:bg-soft',
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return <a href={href} className={classes}>{children}</a>;
  }

  return <button type={type} onClick={onClick} className={classes}>{children}</button>;
};
