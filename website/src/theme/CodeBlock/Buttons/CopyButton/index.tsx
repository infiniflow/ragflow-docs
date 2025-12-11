import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  type ReactNode,
} from 'react';;
import { translate } from '@docusaurus/Translate';
import { useCodeBlockContext } from '@docusaurus/theme-common/internal';
import Button from '@theme/CodeBlock/Buttons/Button';
import type { Props } from '@theme/CodeBlock/Buttons/CopyButton';
import IconCopy from '@theme/Icon/Copy';
import IconSuccess from '@theme/Icon/Success';

import { cn } from '@site/src/utils/twUtils';
import ClipboardJS from 'clipboard';

function title() {
  return translate({
    id: 'theme.CodeBlock.copy',
    message: 'Copy',
    description: 'The copy button label on code blocks',
  });
}

function ariaLabel(isCopied: boolean) {
  return isCopied
    ? translate({
        id: 'theme.CodeBlock.copied',
        message: 'Copied',
        description: 'The copied button label on code blocks',
      })
    : translate({
        id: 'theme.CodeBlock.copyButtonAriaLabel',
        message: 'Copy code to clipboard',
        description: 'The ARIA label for copy code blocks button',
      });
}

function useCopyButton(triggerRef: React.RefObject<HTMLElement>) {
  const {
    metadata: { code },
  } = useCodeBlockContext();

  const [isCopied, setIsCopied] = useState(false);
  const copyTimeout = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (triggerRef.current) {
      const clipboard = new ClipboardJS(triggerRef.current, {
        text: () => code,
      });

      clipboard.on('success', () => {
        setIsCopied(true);
        copyTimeout.current = window.setTimeout(() => {
          setIsCopied(false);
        }, 1000);
      });

      return () => {
        clipboard.destroy();
      }
    }
  }, [triggerRef, code]);

  // const copyCode = useCallback(() => {
  //   if (triggerRef.current) {
  //     const el = triggerRef.current;

  //     const clipboard = new ClipboardJS(el, {
  //       text: () => code,
  //     });

  //   }

  //   if (!navigator.clipboard) {
  //     return;
  //   }

  //   navigator.clipboard.writeText(code).then(() => {
  //   });
  // }, [code]);

  useEffect(() => () => window.clearTimeout(copyTimeout.current), []);

  return { isCopied };
}

export default function CopyButton({className}: Props): ReactNode {
  const targetRef = useRef<HTMLButtonElement>(null);

  const { isCopied } = useCopyButton(targetRef);

  return (
    <Button
      ref={targetRef}
      aria-label={ariaLabel(isCopied)}
      title={title()}
      className={cn(
        className,
        'group-hover/code-block:opacity-100 opacity-0 transition-opacity',
        isCopied && 'text-primary border-success bg-success/20',
      )}
    >
      <span className="relative size-full" aria-hidden="true">
        <IconCopy className={cn(
          'm-0 block absolute top-1/2 left-1/2 transition-all',
          '-translate-x-1/2 -translate-y-1/2',
          isCopied && 'opacity-0 scale-50',
        )}/>

        <IconSuccess className={cn(
          'm-0 block text-success absolute top-1/2 left-1/2 transition-all opacity-0',
          '-translate-x-1/2 -translate-y-1/2 scale-50',
          isCopied && 'opacity-100 scale-100 delay-75',
        )} />
      </span>
    </Button>
  );
}
