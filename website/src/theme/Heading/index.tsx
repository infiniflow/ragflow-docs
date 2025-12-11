import React, { type ReactNode } from 'react';
import { translate } from '@docusaurus/Translate';
import { useAnchorTargetClassName } from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import type { Props } from '@theme/Heading';
import { cn } from '@site/src/utils/twUtils';

export default function Heading({ as: As, id, ...props }: Props): ReactNode {
  const brokenLinks = useBrokenLinks();
  const anchorTargetClassName = useAnchorTargetClassName(id);

  if (As === 'h1' || !id) {
    return <As {...props} id={undefined} />;
  }

  brokenLinks.collectAnchor(id);

  const anchorTitle = translate(
    {
      id: 'theme.common.headingLinkTitle',
      message: 'Direct link to {heading}',
      description: 'Title for link to heading',
    },
    {
      heading: typeof props.children === 'string' ? props.children : id,
    },
  );

  return (
    <As
      {...props}
      id={id}
      className={cn('anchor', anchorTargetClassName, props.className)}
    >
      {props.children}

      <Link
        className="hash-link"
        to={`#${id}`}
        aria-label={anchorTitle}
        title={anchorTitle}
        translate="no"
      />
    </As>
  );
}
