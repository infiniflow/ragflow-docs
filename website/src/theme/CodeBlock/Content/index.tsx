import React, { type ComponentProps, type ReactNode } from 'react';
import { useCodeBlockContext } from '@docusaurus/theme-common/internal';
import { usePrismTheme } from '@docusaurus/theme-common';
import { Highlight } from 'prism-react-renderer';
import type { Props } from '@theme/CodeBlock/Content';
import Line from '@theme/CodeBlock/Line';
import { cn } from '@site/src/utils/twUtils';

// TODO Docusaurus v4: remove useless forwardRef
const Pre = React.forwardRef<HTMLPreElement, ComponentProps<'pre'>>(
  (props, ref) => {
    return (
      <pre
        ref={ref}
        /* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */
        tabIndex={0}
        {...props}
        className={cn(props.className, 'm-0 p-0 thin-scrollbar')}
      />
    );
  },
);

function Code(props: ComponentProps<'code'>) {
  const { metadata } = useCodeBlockContext();

  return (
    <code
      {...props}
      className={cn(
        props.className,
        'float-left min-w-full print:whitespace-pre-wrap',
        metadata.lineNumbersStart != null && 'has-line-number table p-0',
      )}
      style={{
        ...props.style,
        counterReset:
          metadata.lineNumbersStart === undefined
            ? undefined
            : `line-count ${metadata.lineNumbersStart - 1}`,
      }}
    />
  );
}

export default function CodeBlockContent({
  className: classNameProp,
}: Props): ReactNode {
  const { metadata, wordWrap } = useCodeBlockContext();
  const prismTheme = usePrismTheme();
  const { code, language, lineNumbersStart, lineClassNames } = metadata;

  return (
    <Highlight theme={prismTheme} code={code} language={language}>
      {({className, style, tokens: lines, getLineProps, getTokenProps}) => (
        <Pre
          ref={wordWrap.codeBlockRef}
          className={cn(classNameProp, className)}
        >
          <Code>
            {lines.map((line, i) => (
              <Line
                key={i}
                line={line}
                getLineProps={getLineProps}
                getTokenProps={getTokenProps}
                classNames={lineClassNames[i]}
                showLineNumbers={lineNumbersStart !== undefined}
              />
            ))}
          </Code>
        </Pre>
      )}
    </Highlight>
  );
}
