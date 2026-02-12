import { DateTime } from "luxon";
import { zip } from "lodash-es";
import { Children, Fragment, isValidElement } from "react";
import type { MDXProps } from "mdx/types";

import type {
  GlobalPluginData as DocsPluginData,
  GlobalDoc,
} from "@docusaurus/plugin-content-docs/client";

import Translate from "@docusaurus/Translate";
import { usePluginData } from "@docusaurus/useGlobalData";

import Layout from "@theme/Layout";
import _MDXComponents from "@theme/MDXComponents";
import BackToTopButton from "@theme/BackToTopButton";

import { cn } from "@site/src/utils/twUtils";
// @ts-ignore
import ChangelogContent, { toc as _toc } from "./_changelog.mdx";
import styles from "./changelog.module.scss";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

// Only keep level 2 items
const toc: {
  id: string;
  value: string;
  level: number;
  releaseDate?: DateTime;
}[] = _toc
  .filter((item) => item.level === 2)
  .map((t) => ({
    ...t,
    releaseDate: null,
  }));

const MDXComponents = {
  ..._MDXComponents,
  a: function MDXAnchor(
    props: React.ComponentPropsWithoutRef<typeof _MDXComponents.a>,
  ) {
    const docs = usePluginData(
      "docusaurus-plugin-content-docs",
    ) as DocsPluginData;
    const isAbsoluteUrl = URL.canParse(props.href);

    if (isAbsoluteUrl) {
      return <_MDXComponents.a {...props} />;
    }

    // const url = new URL(props.href, "dummy://");
    let url;
    try {
      url = new URL(props.href, "dummy://");
    } catch (error) {
      console.error("Invalid URL:", error, url);
      return <span {...props} />;
    }
    const docId = url.pathname.replace(/\.mdx?/i, "").slice(1);

    let doc: GlobalDoc = null;

    // Try to find the document in all versions
    // (Maybe only current version?)
    for (const version of docs.versions) {
      if (
        (doc = version.docs.find(
          (doc) => doc.id === docId || `/${doc.id}` === docId,
        ))
      ) {
        break;
      }
    }

    // Found
    if (doc) {
      const resolvedHref = `${doc.path}${url.hash ? `#${url.hash}` : ""}${url.search ? `?${url.search}` : ""}`;
      return <_MDXComponents.a {...props} href={resolvedHref} />;
    }

    // Broken link, render plain
    return <span {...props} />;
  },
  h2: function MDXHeading2({
    className,
    ...props
  }: React.ComponentPropsWithoutRef<typeof _MDXComponents.h2>) {
    return (
      <_MDXComponents.h2
        {...props}
        className={cn(className, styles.versionHeading)}
      />
    );
  },
};

type ChildProps = { children: ChildElement | ChildElement[] };
type ChildElement = React.ReactElement<ChildProps>;

function useChangelogContent(
  component: (props: MDXProps) => React.ReactElement<ChildProps>,
): React.ReactNode {
  const root = component({ components: MDXComponents });
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();

  const contentNodes = Children.toArray(root.props.children).filter(
    isValidElement<ChildProps>,
  );
  const idxFirstH2 = contentNodes.findIndex(
    (node) => node.type === MDXComponents.h2,
  );
  const mainDescriptions = contentNodes.slice(1, idxFirstH2);
  const idxAllH2 = contentNodes
    .map((node, i) => (node.type === MDXComponents.h2 ? i : null))
    .filter(Boolean);
  const versionSections = idxAllH2.reduce((sections, idx, iArr, arr) => {
    const section = contentNodes.slice(
      idx,
      arr[iArr + 1] ?? contentNodes.length,
    );

    const dateString = (section[1].props.children as unknown as string)
      .replace(/released on /i, "")
      .slice(0, -1);
    toc[iArr].releaseDate = DateTime.fromMillis(Date.parse(dateString));

    return [...sections, section];
  }, []);

  const zippedSections = zip(toc, versionSections);

  return (
    <>
      <header className="mb-16">
        <MDXComponents.h1>
          <Translate
            id="changelog.title"
            description="The title of the changelog page"
          >
            Changelog
          </Translate>
        </MDXComponents.h1>

        {mainDescriptions}
      </header>

      <ol className="clean-list mt-12 m-0 p-0 grid grid-cols-1 desktop:grid-cols-[auto_1fr] gap-x-36">
        {zippedSections.map(([toc, section], i) => (
          <li key={toc.id} className={styles.versionItem}>
            <div className={styles.versionTimeline}>
              <time
                className={styles.dot}
                dateTime={toc.releaseDate.toISODate()}
              >
                <span>
                  {toc.releaseDate.toFormat("DD", { locale: currentLocale })}
                </span>
              </time>
            </div>

            <div className={styles.versionContent}>{section}</div>
          </li>
        ))}
      </ol>
    </>
  );
}

export default function Changelog() {
  const content = useChangelogContent(ChangelogContent);

  return (
    <Layout
      title="Changelog"
      description="Key features, improvements and bug fixes in the latest releases."
    >
      <div className="container pt-8 pb-32">
        <article className={cn("markdown", styles.changelog)}>
          {content}
        </article>
      </div>

      <BackToTopButton />
    </Layout>
  );
}
