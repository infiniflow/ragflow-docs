import React, { type ReactNode } from 'react';
import { useCodeBlockContext } from '@docusaurus/theme-common/internal';
import Container from '@theme/CodeBlock/Container';
import Title from '@theme/CodeBlock/Title';
import Content from '@theme/CodeBlock/Content';
import type { Props } from '@theme/CodeBlock/Layout';
import Buttons from '@theme/CodeBlock/Buttons';

import { cn } from '@site/src/utils/twUtils';

export default function CodeBlockLayout({ className }: Props): ReactNode {
  const {metadata} = useCodeBlockContext();
  return (
    <Container
      as="div"
      className={cn(
        'bg-surface rounded-md',
        className,
        metadata.className,
      )}
    >
      {metadata.title && (
        <div
          className="
            border-0 border-b border-solid border-component
            px-4 py-3 text-sm text-medium
          "
        >
          <Title>{metadata.title}</Title>
        </div>
      )}

      <div className="relative [direction:ltr]">
        <Content />
        <Buttons />
      </div>
    </Container>
  );
}
