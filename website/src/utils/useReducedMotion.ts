import { useEffect, useState } from "react";

// One time check to see if the user has reduced motion
export function shouldReduceMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    setReducedMotion(mediaQuery.matches);

    const handleMediaChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  return reducedMotion;
}