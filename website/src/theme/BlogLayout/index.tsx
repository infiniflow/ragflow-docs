import Layout from '@theme/Layout';
import type { Props } from '@theme/BlogLayout';

import BlogSidebar from '@theme/BlogSidebar';
import BackToTopButton from '@theme/BackToTopButton';

import { cn } from '@site/src/utils/twUtils';

export default function BlogLayout(props: Props) {
  const {
    sidebar,
    toc,
    children,
    ...layoutProps
  } = props;

  return (
    <Layout {...layoutProps}>
      <div className="flex flex-row size-full">
        <BlogSidebar sidebar={sidebar} />

        <div className="blog container flex flex-row w-0 flex-1 px-page pt-4 pb-8">
          <div className={cn(
            'w-full xl:w-3/4',
            !toc && 'mr-auto'
          )}>
            <main className="blog-content">
              {children}
            </main>
          </div>

          {toc && <div className="xl:w-1/4 max-xl:hidden">{toc}</div>}
        </div>
      </div>

      <BackToTopButton />
    </Layout>
  );
}
