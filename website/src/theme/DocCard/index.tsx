import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {
  useDocById,
  findFirstSidebarItemLink,
} from '@docusaurus/plugin-content-docs/client';
import { usePluralForm } from '@docusaurus/theme-common';
import isInternalUrl from '@docusaurus/isInternalUrl';
import { translate } from '@docusaurus/Translate';
import { cn } from '@site/src/utils/twUtils';

import type {Props} from '@theme/DocCard';
import Heading from '@theme/Heading';
import type {
  PropSidebarItemCategory,
  PropSidebarItemLink,
} from '@docusaurus/plugin-content-docs';

import Icon from '@site/src/components/Icon';

function useCategoryItemsPlural() {
  const { selectMessage } = usePluralForm();
  return (count: number) =>
    selectMessage(
      count,
      translate(
        {
          message: '1 item|{count} items',
          id: 'theme.docs.DocCard.categoryDescription.plurals',
          description:
            'The default description for a category card in the generated index about how many items this category includes',
        },
        {count},
      ),
    );
}

function CardContainer({
  className,
  href,
  children,
}: {
  className?: string;
  href: string;
  children: ReactNode;
}): ReactNode {
  return (
    <Link
      href={href}
      className={cn(
        'doc-card',
        'relative block p-6 overflow-hidden rounded-md transition-colors',
        '!text-standard border border-solid border-component',
        'hover:border-standard focus:border-standard',
        'before:content-[""] before:absolute before:inset-0 before:transition-opacity',
        'before:bg-gradient-to-r before:from-transparent before:to-theme-black/5',
        'before:opacity-0 hover:before:opacity-100 focus-visible:before:opacity-100',
        className,
      )}
    >
      {children}
    </Link>
  );
}

function CardLayout({
  className,
  href,
  icon,
  title,
  description,
}: {
  className?: string;
  href: string;
  icon: ReactNode;
  title: string;
  description?: string;
}): ReactNode {
  return (
    <CardContainer
      href={href}
      className={cn(
        'h-full',
        className,
      )}
    >
      <div className="mb-4 text-3xl leading-none">{icon}</div>

      <Heading
        as="h3"
        className={cn('mt-0 mb-2 text-ellipsis overflow-hidden whitespace-nowrap')}
        title={title}
      >
        {title}
      </Heading>

      {description && (
        <p
          className={cn('mb-0 text-sm text-secondary line-clamp-2')}
          title={description}>
          {description}
        </p>
      )}
    </CardContainer>
  );
}

function CardCategory({item}: {item: PropSidebarItemCategory}): ReactNode {
  const href = findFirstSidebarItemLink(item);
  const categoryItemsPlural = useCategoryItemsPlural();

  // Unexpected: categories that don't have a link have been filtered upfront
  if (!href) {
    return null;
  }

  return (
    <CardLayout
      className={item.className}
      href={href}
      icon={(
        <Icon icon={item.customProps?.categoryCardIcon as any}>
          <Icon icon="LucideBox" />
        </Icon>
      )}
      title={item.label}
      description={item.description ?? categoryItemsPlural(item.items.length)}
    />
  );
}

function CardLink({ item }: { item: PropSidebarItemLink }): ReactNode {
  const icon = isInternalUrl(item.href)
    ? (
      <Icon icon={item.customProps?.categoryCardIcon as any}>
        <Icon icon="LucideFile" />
      </Icon>
    )
    : <Icon icon="LucideLink" />;

  const doc = useDocById(item.docId ?? undefined);

  return (
    <CardLayout
      className={item.className}
      href={item.href}
      icon={icon}
      title={item.label}
      description={item.description ?? doc?.description}
    />
  );
}

export default function DocCard({ item }: Props): ReactNode {
  switch (item.type) {
    case 'link':
      return <CardLink item={item} />;
    case 'category':
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}
