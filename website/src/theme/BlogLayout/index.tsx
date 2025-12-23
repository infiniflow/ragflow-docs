import Layout from '@theme/Layout';
import BlogSidebar from '@theme/BlogSidebar';
import BlogListPaginator from '@theme/BlogListPaginator';

import type { Props } from '@theme/BlogLayout';

import { cn } from '@site/src/utils/twUtils';
import { partition } from 'lodash-es';
import { Children, isValidElement } from 'react';

export default function BlogLayout(props: Props) {
  const {
    sidebar,
    toc,
    children: _children,
    ...layoutProps
  } = props;

  const [children, paginator] = partition(
    Children.toArray(_children),
    (child) => isValidElement(child) && child.type === BlogListPaginator
  );

  return (
    <Layout {...layoutProps}>
      <div className="flex flex-row size-full">
        <BlogSidebar sidebar={sidebar} />

        <div className="blog container flex flex-row w-0 flex-1 px-page pt-4 pb-8">
          <div className={cn(
            'w-full xl:w-3/4',
            !toc && 'mx-auto',
          )}>
            <main className="blog-content">
              {children}
            </main>

            {paginator}
          </div>

          {toc && <div className="w-1/4 max-xl:hidden">{toc}</div>}
        </div>
      </div>
    </Layout>
  );
}
