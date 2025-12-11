import React, {type ReactNode} from 'react';
import TOCItems from '@theme/TOCItems';
import type {Props} from '@theme/TOCInline';

export default function TOCInline({
  toc,
  minHeadingLevel,
  maxHeadingLevel,
}: Props): ReactNode {
  return (
    <div className="table-of-contents-inline">
      <TOCItems
        toc={toc}
        minHeadingLevel={minHeadingLevel}
        maxHeadingLevel={maxHeadingLevel}
        className="table-of-contents"
        linkClassName={null}
      />
    </div>
  );
}
