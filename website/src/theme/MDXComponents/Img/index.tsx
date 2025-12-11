import { useState } from 'react';
import type { Props } from '@theme/MDXComponents/Img';

import Icon from '@site/src/components/Icon';
import { cn } from '@site/src/utils/twUtils';

export default function MDXImg(props: Props) {
  const [state, setState] = useState<'pending' | 'loaded' | 'error'>('pending');

  return (
    <span
      className={cn(
        props.className,
        'img max-w-full my-2 only:my-0',
        state === 'loaded' ? 'inline-block' : 'block',
        state === 'pending' && 'text-center',
        state === 'error' && 'text-center text-disabled',
      )}
      inert={state === 'error'}
    >
      <img
        decoding="async"
        loading="lazy"
        onLoad={() => setState('loaded')}
        onError={() => setState('error')}
        className={cn(state === 'error' && 'opacity-0 size-0')}
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
