import React, { type ReactNode } from 'react';
import { PageMetadata, ThemeClassNames } from '@docusaurus/theme-common';
import { useCurrentSidebarCategory } from '@docusaurus/plugin-content-docs/client';
import useBaseUrl from '@docusaurus/useBaseUrl';
import DocCardList from '@theme/DocCardList';
import DocPaginator from '@theme/DocPaginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import Heading from '@theme/Heading';
import type { Props } from '@theme/DocCategoryGeneratedIndexPage';
import { cn } from '@site/src/utils/twUtils';

function DocCategoryGeneratedIndexPageMetadata({
  categoryGeneratedIndex,
}: Props): ReactNode {
  return (
    <PageMetadata
      title={categoryGeneratedIndex.title}
      description={categoryGeneratedIndex.description}
      keywords={categoryGeneratedIndex.keywords}
      // TODO `require` this?
      image={useBaseUrl(categoryGeneratedIndex.image)}
    />
  );
}

function DocCategoryGeneratedIndexPageContent({
  categoryGeneratedIndex,
}: Props): ReactNode {
  const category = useCurrentSidebarCategory();

  return (
    <div className="desktop:max-w-[75%]">
      <DocVersionBanner />
      <DocBreadcrumbs />

      <div className={cn(
        ThemeClassNames.docs.docMarkdown,
        'markdown',
      )}>
        <header>
          <Heading as="h1">
            {categoryGeneratedIndex.title}
          </Heading>
          {categoryGeneratedIndex.description && (
            <p>{categoryGeneratedIndex.description}</p>
          )}
        </header>

        <article className="mt-8">
          <DocCardList
            items={category.items}
            className={category.className}
            columns={category.customProps?.columns as number}
          />
        </article>
      </div>

      <DocPaginator
        previous={categoryGeneratedIndex.navigation.previous}
        next={categoryGeneratedIndex.navigation.next}
      />
    </div>
  );
}

export default function DocCategoryGeneratedIndexPage(props: Props): ReactNode {
  return (
    <>
      <DocCategoryGeneratedIndexPageMetadata {...props} />
      <DocCategoryGeneratedIndexPageContent {...props} />
    </>
  );
}
