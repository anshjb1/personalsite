interface CardProps {
  children: React.ReactNode;
  variant?: 'white' | 'soft';
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, variant = 'white', className = '' }) => {
  const bg = variant === 'soft' ? 'bg-soft' : 'bg-white';
  return (
    <div className={`border border-line rounded-card p-5 md:p-6 ${bg} ${className}`}>
      {children}
    </div>
  );
};
