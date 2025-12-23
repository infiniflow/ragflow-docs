import { useLayoutEffect, useRef, useState } from 'react';
import type { Props } from '@theme/MDXComponents/Img';

import Icon from '@site/src/components/Icon';
import { cn } from '@site/src/utils/twUtils';

export default function MDXImg({ className, ...props }: Props) {
  const [state, setState] = useState<'pending' | 'loaded' | 'error'>('pending');
  const imgRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const imgEl = imgRef.current;

    if (imgEl && imgEl.complete) {
      imgEl.dispatchEvent(new Event('load'));
    }
  }, []);

  return (
    <span
      className={cn(
        'w-full',
        className,
        'img my-2 only:my-0',
        state === 'loaded' ? 'inline-block' : 'block',
        state === 'pending' && 'text-center',
        state === 'error' && 'text-center text-disabled',
      )}
      inert={state === 'error'}
    >
      <img
        ref={imgRef}
        decoding="async"
        loading="lazy"
        onLoad={() => setState('loaded')}
        onError={() => setState('error')}
        className={cn(
          'w-full',
          state === 'error' && 'opacity-0 size-0',
        )}
        {...props}
      />

      {state === 'pending' && <Icon icon="LucideLoader2" className="animate-spin" />}
      {state === 'error' && (
        <span>
          <Icon icon="LucideImageOff" className="mr-1" />
          {props.alt}
        </span>
      )}
    </span>
  );
}
