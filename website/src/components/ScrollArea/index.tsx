import { cn } from '@site/src/utils/twUtils';
import { useLayoutEffect, useRef, useState } from 'react';
import GenericScrollArea, {
  type ScrollBarProps,
} from 'react-perfect-scrollbar';

export interface ScrollAreaProps extends ScrollBarProps {
  noControls?: boolean;
  scrollHint?: boolean;
}

export default function ScrollArea({
  children,
  className,
  noControls,
  scrollHint = false,
  ...props
} : ScrollAreaProps) {
  const containerRef = useRef<HTMLElement>(null);
  const scrollbarRef = useRef<GenericScrollArea>(null);
  const observeRef = useRef<HTMLDivElement>(null);

  const {
    suppressScrollX = false,
    suppressScrollY = false,
  } = props.options ?? {};

  const [hitXStart, setHitXStart] = useState(true);
  const [hitXEnd, setHitXEnd] = useState(true);
  const [hitYStart, setHitYStart] = useState(true);
  const [hitYEnd, setHitYEnd] = useState(true);

  const updateScrollHint = () => {
    const el = containerRef.current;

    if (el) {
      setHitXStart(el.scrollLeft === 0);
      setHitXEnd(Math.ceil(el.scrollLeft + el.clientWidth) >= Math.ceil(el.scrollWidth));

      setHitYStart(el.scrollTop === 0);
      setHitYEnd(Math.ceil(el.scrollTop + el.clientHeight) >= Math.ceil(el.scrollHeight));
    }
  };

  // Fire on mounted
  useLayoutEffect(() => {
    updateScrollHint()
    scrollbarRef.current?.updateScroll();
  }, []);

  useLayoutEffect(() => {
    if (window.ResizeObserver && observeRef.current) {
      const observer = new ResizeObserver(() => {
        scrollbarRef.current.updateScroll();
        updateScrollHint();
      });

      observer.observe(observeRef.current);

      return () => observer.disconnect();
    }
  }, []);

  return (
    <div className={cn(
      'size-full',
      className,
      'scroll-area relative',
    )}>
      {scrollHint && !suppressScrollX && (
        <>
          <div inert className={cn("ps__scroll-hint-x-start", !hitXStart && 'ps__scroll-hint--active')} />
          <div inert className={cn("ps__scroll-hint-x-end", !hitXEnd && 'ps__scroll-hint--active')} />
        </>
      )}

      {scrollHint && !suppressScrollY && (
        <>
          <div inert className={cn("ps__scroll-hint-y-start", !hitYStart && 'ps__scroll-hint--active')} />
          <div inert className={cn("ps__scroll-hint-y-end", !hitYEnd && 'ps__scroll-hint--active')} />
        </>
      )}

      <GenericScrollArea
        ref={scrollbarRef}
        containerRef={(ref) => {
          containerRef.current = ref;
        }}
        className={cn(
          noControls && 'ps--no-controls',
          // Just in case, className overrides overflow-hidden
          'size-full !overflow-hidden',
        )}
        {...props}

        onScroll={(evt) => {
          setHitXStart(false);
          setHitXEnd(false);
          setHitYStart(false);
          setHitYEnd(false);

          props.onScroll?.(evt);
          updateScrollHint();
        }}
        onXReachStart={(el) => {
          setHitXStart(true);
          props.onXReachStart?.(el);
        }}
        onXReachEnd={(el) => {
          setHitXEnd(true);
          props.onXReachEnd?.(el);
        }}
        onYReachStart={(el) => {
          setHitYStart(true);
          props.onYReachStart?.(el);
        }}
        onYReachEnd={(el) => {
          setHitYEnd(true);
          props.onYReachEnd?.(el);
        }}
      >
        <div ref={observeRef}>
          {children}
        </div>
      </GenericScrollArea>
    </div>
  );
};