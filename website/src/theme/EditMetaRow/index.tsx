import React, { type ReactNode } from 'react';
import EditThisPage from '@theme/EditThisPage';
import type { Props } from '@theme/EditMetaRow';

import LastUpdated from '@theme/LastUpdated';
import { cn } from '@site/src/utils/twUtils';

export default function EditMetaRow({
  className,
  editUrl,
  lastUpdatedAt,
  lastUpdatedBy,
}: Props): ReactNode {
  return (
    <div className={cn('desktop:flex', className)}>
      <div className="print:hidden">
        {editUrl && <EditThisPage editUrl={editUrl} />}
      </div>

      <div className="italic desktop:text-right mt-1">
        {(lastUpdatedAt || lastUpdatedBy) && (
          <LastUpdated
            lastUpdatedAt={lastUpdatedAt}
            lastUpdatedBy={lastUpdatedBy}
          />
        )}
      </div>
    </div>
  );
}
