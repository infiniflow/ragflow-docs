import React, { type ComponentProps, type ReactNode } from 'react';
import { ThemeClassNames, usePrismTheme } from '@docusaurus/theme-common';
import { getPrismCssVariables } from '@docusaurus/theme-common/internal';
import { cn } from '@site/src/utils/twUtils';

export default function CodeBlockContainer<T extends 'div' |'pre'>({
  as: As,
  ...props
}: { as: T } & ComponentProps<T>): ReactNode {
  return (
    <As
      // Polymorphic components are hard to type, without `oneOf` generics
      {...(props as any)}
      className={cn(
        props.className,
        'group/code-block rounded-md',
        ThemeClassNames.common.codeBlock,
      )}
    />
  );
}
