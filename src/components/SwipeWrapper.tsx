import React from 'react';
import { useSwipeNavigation } from '../hooks/useSwipeNavigation';

interface SwipeWrapperProps {
  children: React.ReactNode;
}

const SwipeWrapper: React.FC<SwipeWrapperProps> = ({ children }) => {
  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipeNavigation();

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="min-h-screen"
    >
      {children}
    </div>
  );
};

export default SwipeWrapper;
