import React, { type ReactNode } from 'react';
import Translate from '@docusaurus/Translate';
import type { Props } from '@theme/Admonition/Type/Danger';
import AdmonitionLayout from '@theme/Admonition/Layout';
import IconDanger from '@theme/Admonition/Icon/Danger';
import { cn } from '@site/src/utils/twUtils';

const defaultProps = {
  icon: <IconDanger />,
  title: (
    <Translate
      id="theme.admonition.danger"
      description="The default label used for the Danger admonition (:::danger)"
    >
      important
    </Translate>
  ),
};

export default function AdmonitionTypeDanger(props: Props): ReactNode {
  return (
    <AdmonitionLayout
      {...defaultProps}
      {...props}
      className={cn('border-danger', props.className)}
      headerClassName="text-danger"
    >
      {props.children}
    </AdmonitionLayout>
  );
}
