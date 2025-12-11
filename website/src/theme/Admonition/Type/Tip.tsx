import React, { type ReactNode } from 'react';
import Translate from '@docusaurus/Translate';
import type { Props } from '@theme/Admonition/Type/Tip';
import AdmonitionLayout from '@theme/Admonition/Layout';
import IconTip from '@theme/Admonition/Icon/Tip';
import { cn } from '@site/src/utils/twUtils';

const defaultProps = {
  icon: <IconTip />,
  title: (
    <Translate
      id="theme.admonition.tip"
      description="The default label used for the Tip admonition (:::tip)"
    >
      tip
    </Translate>
  ),
};

export default function AdmonitionTypeTip(props: Props): ReactNode {
  return (
    <AdmonitionLayout
      {...defaultProps}
      {...props}
      className={cn('border-success', props.className)}
      headerClassName="text-success"
    >
      {props.children}
    </AdmonitionLayout>
  );
}
