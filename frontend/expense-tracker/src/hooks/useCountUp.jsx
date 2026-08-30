import { useEffect, useState } from 'react';

export const useCountUp = (endValue = 0, duration = 900) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const target = typeof endValue === 'number' ? endValue : parseFloat(endValue) || 0;

    if (prefersReducedMotion || duration <= 0 || target === 0) {
      setCount(target);
      return;
    }

    let startTime = null;
    let animationFrameId = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Ease-out quad formula
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      setCount(easeOutProgress * target);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [endValue, duration]);

  return count;
};
