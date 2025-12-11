import React, {type ReactNode} from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

import CopyButton from '@theme/CodeBlock/Buttons/CopyButton';
import WordWrapButton from '@theme/CodeBlock/Buttons/WordWrapButton';
import type {Props} from '@theme/CodeBlock/Buttons';

import styles from './styles.module.css';
import { cn } from '@site/src/utils/twUtils';

// Code block buttons are not server-rendered on purpose
// Adding them to the initial HTML is useless and expensive (due to JSX SVG)
// They are hidden by default and require React  to become interactive
export default function CodeBlockButtons({className}: Props): ReactNode {
  return (
    <BrowserOnly>
      {() => (
        <div className={cn(
          'absolute right-2 top-2 flex gap-2',
          className,
        )}>
          <WordWrapButton />
          <CopyButton />
        </div>
      )}
    </BrowserOnly>
  );
}
