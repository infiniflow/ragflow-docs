import React, { type ReactNode } from 'react';
import type { Props } from '@theme/CodeBlock/Buttons/Button';
import { cn } from '@site/src/utils/twUtils';

export default function CodeBlockButton({
  className,
  ...props
}: Props): ReactNode {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        'size-8 flex justify-center items-center bg-surface border border-component',
        'border border-solid border-component backdrop-blur-sm',
        'rounded-md p-1 line-height-0 opacity-0',
        'group-hover/code-block:opacity-100',
        'group-focus-within/code-block:opacity-100',
        className,
      )}
    />
  );
}
