import React, { type ReactNode } from 'react';
import Translate from '@docusaurus/Translate';
import type { Props } from '@theme/Admonition/Type/Info';
import AdmonitionLayout from '@theme/Admonition/Layout';
import IconInfo from '@theme/Admonition/Icon/Info';
import { cn } from '@site/src/utils/twUtils';

const defaultProps = {
  icon: <IconInfo />,
  title: (
    <Translate
      id="theme.admonition.info"
      description="The default label used for the Info admonition (:::info)">
      info
    </Translate>
  ),
};

export default function AdmonitionTypeInfo(props: Props): ReactNode {
  return (
    <AdmonitionLayout
      {...defaultProps}
      {...props}
      className={cn('border-info', props.className)}
      headerClassName="text-info"
    >
      {props.children}
    </AdmonitionLayout>
  );
}
