import React, { type ReactNode } from 'react';
import { translate } from '@docusaurus/Translate';
import type { Props } from '@theme/Icon/ExternalLink';
import Icon from '@site/src/components/Icon';
import { cn } from '@site/src/utils/twUtils';

export default function IconExternalLink({
  className,
}: Props): ReactNode {
  return (
    <span
      className="
        icon size-[1.15em] align-baseline ml-[.25em]
        inline-flex items-center justify-center
        text-[.85rem] relative leading-[0] after:content-['_']
        after:absolute after:inset-0 after:rounded after:bg-current after:opacity-20
      "
    >
      <Icon
        icon="LucideArrowUpRight"
        className={cn(className, 'stroke-[2]')}
        aria-label={translate({
          id: 'theme.IconExternalLink.ariaLabel',
          message: '(opens in new tab)',
          description: 'The ARIA label for the external link icon',
        })}
      />
    </span>
  );
}
