import React, { type ReactNode } from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import PaginatorNavLink from '@theme/PaginatorNavLink';
import type { Props } from '@theme/DocPaginator';
import { cn } from '@site/src/utils/twUtils';

export default function DocPaginator(props: Props): ReactNode {
  const {className, previous, next} = props;
  return (
    <nav
      className={cn(
        className,
        'pagination-nav grid grid-cols-2 gap-8 mt-24'
      )}
      aria-label={translate({
        id: 'theme.docs.paginator.navAriaLabel',
        message: 'Docs pages',
        description: 'The ARIA label for the docs pagination',
      })}>
      {previous && (
        <PaginatorNavLink
          {...previous}
          subLabel={
            <Translate
              id="theme.docs.paginator.previous"
              description="The label used to navigate to the previous doc">
              Previous
            </Translate>
          }
        />
      )}
      {next && (
        <PaginatorNavLink
          {...next}
          subLabel={
            <Translate
              id="theme.docs.paginator.next"
              description="The label used to navigate to the next doc">
              Next
            </Translate>
          }
          isNext
        />
      )}
    </nav>
  );
}
