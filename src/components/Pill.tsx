interface PillProps {
  children: React.ReactNode;
  className?: string;
}

export const Pill: React.FC<PillProps> = ({ children, className = '' }) => {
  return (
    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border border-line text-muted ${className}`}>
      {children}
    </span>
  );
};
