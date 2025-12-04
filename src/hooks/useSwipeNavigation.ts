import { useEffect, TouchEvent, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const routes = ['/', '/experience', '/education', '/projects', '/certifications', '/features', '/contact'];

export const useSwipeNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 100;

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    const currentIndex = routes.indexOf(location.pathname);

    if (isLeftSwipe && currentIndex < routes.length - 1) {
      navigate(routes[currentIndex + 1]);
    } else if (isRightSwipe && currentIndex > 0) {
      navigate(routes[currentIndex - 1]);
    }
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
};
