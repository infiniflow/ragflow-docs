import { ThemeClassNames } from '@docusaurus/theme-common';
import LinkItem from '@theme/Footer/LinkItem';
import type { Props } from '@theme/Footer/Links/MultiColumn';

import { cn } from '@site/src/utils/twUtils';

type ColumnType = Props['columns'][number];
type ColumnItemType = ColumnType['items'][number];

function ColumnLinkItem({ item }: {item: ColumnItemType}) {
  return item.html ? (
    <li
      className={item.className}
      // Developer provided the HTML, so assume it's safe.
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: item.html }}
    />
  ) : (
    <li key={item.href ?? item.to}>
      <LinkItem item={item} />
    </li>
  );
}

function Column({ column: { className, title, items }}: { column: ColumnType }) {
  return (
    <div
      className={cn(
        ThemeClassNames.layout.footer.column,
        'desktop:flex-1 text-sm',
        className,
      )}
    >
      <div className="text-standard font-semibold mb-6">{title}</div>
      <ul className="list-none p-0 m-0 flex flex-col grow space-y-4">
        {items.map((item, i) => (
          <ColumnLinkItem key={i} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default function FooterLinksMultiColumn({ columns }: Props) {
  return (
    <div className="flex flex-col mobile:flex-row justify-between gap-16 desktop:gap-16">
      {columns.map((column, i) => (
        <Column key={i} column={column} />
      ))}
    </div>
  );
}
