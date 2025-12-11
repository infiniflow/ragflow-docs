import { useWindowSize } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemContent from '@theme/DocItem/Content';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import ContentVisibility from '@theme/ContentVisibility';
import type { Props } from '@theme/DocItem/Layout';

import { cn } from '@site/src/utils/twUtils';

/**
 * Decide if the toc should be rendered, on mobile or desktop viewports
 */
function useDocTOC() {
  const { frontMatter, toc } = useDoc();
  const windowSize = useWindowSize();

  const hidden = frontMatter.hide_table_of_contents;
  const canRender = !hidden && toc.length > 0;

  const mobile = canRender ? <DocItemTOCMobile /> : undefined;

  const desktop =
    canRender && (windowSize === 'desktop' || windowSize === 'ssr') ? (
      <DocItemTOCDesktop />
    ) : undefined;

  return {
    hidden,
    mobile,
    desktop,
  };
}

export default function DocItemLayout({children}: Props) {
  const docTOC = useDocTOC();
  const { metadata } = useDoc();

  return (
    <div className="flex flex-row">
      <div className={cn('doc-content flex-1 max-w-full', !docTOC.hidden && 'xl:max-w-[75%]')}>
        <ContentVisibility metadata={metadata} />
        <DocVersionBanner />

        <div>
          <article>
            <DocBreadcrumbs />
            {/* <DocVersionBadge /> */}
            {docTOC.mobile}
            <DocItemContent>{children}</DocItemContent>
            <DocItemFooter />
          </article>

          <DocItemPaginator />
        </div>
      </div>

      {docTOC.desktop && <div className="w-[25%] max-xl:hidden">{docTOC.desktop}</div>}
    </div>
  );
}
