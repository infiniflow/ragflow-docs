import React, { type ReactNode } from 'react';
import LineToken from '@theme/CodeBlock/Line/Token';
import type { Props } from '@theme/CodeBlock/Line';

import { cn } from '@site/src/utils/twUtils';

type Token = Props['line'][number];

// Replaces '\n' by ''
// Historical code, not sure why we even need this :/
function fixLineBreak(line: Token[]) {
  const singleLineBreakToken =
    line.length === 1 && line[0]!.content === '\n' ? line[0] : undefined;

  if (singleLineBreakToken) {
    return [{...singleLineBreakToken, content: ''}];
  }

  return line;
}

export default function CodeBlockLine({
  line: lineProp,
  classNames,
  showLineNumbers,
  getLineProps,
  getTokenProps,
}: Props): ReactNode {
  const line = fixLineBreak(lineProp);

  const lineProps = getLineProps({
    line,
    className: cn(
      classNames,
      showLineNumbers && 'table-row [counter-increment:line-count]',
    ),
  });

  const lineTokens = line.map((token, key) => {
    const tokenProps = getTokenProps({token});
    return (
      <LineToken key={key} {...tokenProps} line={line} token={token}>
        {tokenProps.children}
      </LineToken>
    );
  });

  return (
    <span {...lineProps}>
      {showLineNumbers ? (
        <>
          <span
            className="
              line-number
              table-cell text-right w-[1%] sticky left-0
              px-6 overflow-wrap-normal
              before:content-[counter(line-count)] before:text-standard/40
            "
          />
          <span className="pr-4">{lineTokens}</span>
        </>
      ) : (
        lineTokens
      )}
      <br />
    </span>
  );
}
