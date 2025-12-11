import React, { type ReactNode } from 'react';
import Translate from '@docusaurus/Translate';
import type { Props } from '@theme/Admonition/Type/Warning';
import AdmonitionLayout from '@theme/Admonition/Layout';
import IconWarning from '@theme/Admonition/Icon/Warning';
import { cn } from '@site/src/utils/twUtils';

const defaultProps = {
  icon: <IconWarning />,
  title: (
    <Translate
      id="theme.admonition.warning"
      description="The default label used for the Warning admonition (:::warning)">
      warning
    </Translate>
  ),
};

export default function AdmonitionTypeWarning(props: Props): ReactNode {
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
