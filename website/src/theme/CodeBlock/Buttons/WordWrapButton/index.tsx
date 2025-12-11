import React, { type ReactNode } from 'react';
import { translate } from '@docusaurus/Translate';
import { useCodeBlockContext } from '@docusaurus/theme-common/internal';
import Button from '@theme/CodeBlock/Buttons/Button';
import type { Props } from '@theme/CodeBlock/Buttons/WordWrapButton';
import IconWordWrap from '@theme/Icon/WordWrap';

import { cn } from '@site/src/utils/twUtils';

export default function WordWrapButton({className}: Props): ReactNode {
  const { wordWrap } = useCodeBlockContext();

  const canShowButton = wordWrap.isEnabled || wordWrap.isCodeScrollable;
  if (!canShowButton) {
    return false;
  }

  const title = translate({
    id: 'theme.CodeBlock.wordWrapToggle',
    message: 'Toggle word wrap',
    description:
      'The title attribute for toggle word wrapping button of code block lines',
  });

  return (
    <Button
      onClick={() => wordWrap.toggle()}
      className={cn(
        className,
        wordWrap.isEnabled && 'text-primary border-primary bg-primary/20',
      )}
      aria-checked={wordWrap.isEnabled ? 'true' : 'false'}
      aria-label={title}
      title={title}
    >
      <IconWordWrap aria-hidden="true" />
    </Button>
  );
}
