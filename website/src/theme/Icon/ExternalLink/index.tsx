import React, { type ReactNode } from 'react';
import { translate } from '@docusaurus/Translate';
import type { Props } from '@theme/Icon/ExternalLink';
import Icon from '@site/src/components/Icon';

export default function IconExternalLink({
  className,
}: Props): ReactNode {
  return (
    <span
      className="
        icon size-auto align-[-.1ex]
        inline-flex items-center justify-center aspect-square ml-[.35em]
        text-[.85rem] p-px relative leading-[0] after:content-['_']
        after:absolute after:inset-0 after:rounded after:bg-current after:opacity-20
      "
    >
      <Icon
        icon="LucideArrowUpRight"
        className={className}
        aria-label={translate({
          id: 'theme.IconExternalLink.ariaLabel',
          message: '(opens in new tab)',
          description: 'The ARIA label for the external link icon',
        })}
      />
    </span>
  );
}
