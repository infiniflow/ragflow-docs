import { useEffect } from 'react';
import { useLocation } from '@docusaurus/router';

import useReducedMotion from '@site/src/utils/useReducedMotion';

import '@site/src/lib/polyfill';

export default function Root({ children }) {
  const pathname = useLocation();
  const shouldReduceMotion = useReducedMotion();

  useEffect(
    () => {
      const svgElements = document.body.querySelectorAll<SVGSVGElement>('svg:has(animate, animateTransform, animateMotion)');

      // Pause SVG SMIL animations when matches media query "(prefers-reduced-motion: reduce)"
      // This takes precedence over the IntersectionObserver
      svgElements.forEach((svg) => {
        shouldReduceMotion
          ? svg.pauseAnimations()
          : svg.unpauseAnimations();
      });

      // If not reduced motion, start observing SVG elements for SMIL animations
      if (!shouldReduceMotion && Reflect.has(window, 'IntersectionObserver')) {
        const observer = new IntersectionObserver((entries) => {
          for (const entry of entries) {
            const { isIntersecting } = entry;
            const target = entry.target as SVGSVGElement;

            isIntersecting
              ? target.unpauseAnimations()
              : target.pauseAnimations();
          }
        });

        svgElements.forEach((svg) => observer.observe(svg));

        return () => observer.disconnect();
      }
    },
    // Regather SVG elements on every pathname change
    [pathname, shouldReduceMotion],
  );

  return children;
}