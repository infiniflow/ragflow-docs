import React, { type ReactNode } from 'react';
import Translate from '@docusaurus/Translate';
import type { Props } from '@theme/Admonition/Type/Note';
import AdmonitionLayout from '@theme/Admonition/Layout';
import IconNote from '@theme/Admonition/Icon/Note';
import { cn } from '@site/src/utils/twUtils';

const defaultProps = {
  icon: <IconNote />,
  title: (
    <Translate
      id="theme.admonition.note"
      description="The default label used for the Note admonition (:::note)"
    >
      note
    </Translate>
  ),
};

export default function AdmonitionTypeNote(props: Props): ReactNode {
  return (
    <AdmonitionLayout
      {...defaultProps}
      {...props}
      className={cn('border-warning', props.className)}
      headerClassName="text-warning"
    >
      {props.children}
    </AdmonitionLayout>
  );
}
