import React, { type ReactNode } from 'react';
import Container from '@theme/CodeBlock/Container';
import type { Props } from '@theme/CodeBlock/Content/Element';

import { cn } from '@site/src/utils/twUtils';

// TODO Docusaurus v4: move this component at the root?
// This component only handles a rare edge-case: <pre><MyComp/></pre> in MDX
// <pre> tags in markdown map to CodeBlocks. They may contain JSX children.
// When children is not a simple string, we just return a styled block without
// actually highlighting.
export default function CodeBlockJSX({children, className}: Props): ReactNode {
  return (
    <Container
      as="pre"
      tabIndex={0}
      className={cn('p-0', 'thin-scrollbar', className)}
    >
      <code className={cn('float-left min-w-full p-4 font-[inherit] print:whitespace-pre-wrap')}>{children}</code>
    </Container>
  );
}
