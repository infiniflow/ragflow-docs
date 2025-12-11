import React, { type ComponentProps, type ReactNode } from 'react';
import {
  useCurrentSidebarSiblings,
  filterDocCardListItems,
} from '@docusaurus/plugin-content-docs/client';
import DocCard from '@theme/DocCard';
import type { Props } from '@theme/DocCardList';
import { cn } from '@site/src/utils/twUtils';

declare module '@theme/DocCardList' {
  export interface Props {
    columns?: number;
  }
}

function DocCardListForCurrentSidebarCategory({
  className,
  columns,
}: Props) {
  const items = useCurrentSidebarSiblings();
  return <DocCardList items={items} className={className} columns={columns} />;
}

function DocCardListItem({
  item,
}: {
  item: ComponentProps<typeof DocCard>['item'];
}) {
  return (
    <article className="h-full">
      <DocCard item={item} />
    </article>
  );
}

export default function DocCardList(props: Props): ReactNode {
  const {
    items,
    className,
    columns = 2,
  } = props;

  if (!items) {
    return <DocCardListForCurrentSidebarCategory {...props} />;
  }

  const filteredItems = filterDocCardListItems(items);

  return (
    <section
      className={cn(
        'w-full grid gap-8',
        'max-sm:!grid-cols-1',
        'max-2xl:!grid-cols-2',
        className,
      )}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
      }}
    >
      {filteredItems.map((item, index) => (
        <DocCardListItem key={index} item={item} />
      ))}
    </section>
  );
}
