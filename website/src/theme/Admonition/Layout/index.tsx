import React, { type ReactNode } from 'react';
import { ThemeClassNames } from '@docusaurus/theme-common';

import type { Props } from '@theme/Admonition/Layout';
import { cn } from '@site/src/utils/twUtils';

declare module '@theme/Admonition/Layout' {
  interface Props {
    headerClassName?: string;
  }
}

function AdmonitionContainer({
  type,
  className,
  children,
}: Pick<Props, 'type' | 'className'> & {children: ReactNode}) {
  return (
    <div
      className={cn(
        ThemeClassNames.common.admonition,
        ThemeClassNames.common.admonitionType(type),
        'px-4 py-3 rounded bg-surface',
        'border-0 border-l-4 border-solid',
        className,
      )}>
      {children}
    </div>
  );
}

function AdmonitionHeading({icon, title, className}: Pick<Props, 'icon' | 'title' | 'className'>) {
  return (
    <div className={cn(
      'font-medium text-h5 capitalize [&:not(:last-child)]:mb-2 [&>code]:normal-case',
      className,
    )}>
      <span className="mr-1.5">
        {icon}
      </span>
      {title}
    </div>
  );
}

function AdmonitionContent({children}: Pick<Props, 'children'>) {
  return children ? (
    <div className="[&>:last-child]:mb-0">{children}</div>
  ) : null;
}

export default function AdmonitionLayout(props: Props): ReactNode {
  const {type, icon, title, children, className, headerClassName} = props;
  return (
    <AdmonitionContainer type={type} className={className}>
      {title || icon ? <AdmonitionHeading title={title} icon={icon} className={headerClassName} /> : null}
      <AdmonitionContent>{children}</AdmonitionContent>
    </AdmonitionContainer>
  );
}
