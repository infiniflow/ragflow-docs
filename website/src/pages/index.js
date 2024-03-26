import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";

import styles from "./index.module.css";

function HomepageHeader() {
  return (
    <header className={clsx(styles.heroBanner)}>
      <div className="container">
        <div className={styles.title}>
          Build Generative AI into your business
        </div>
        <p className={styles.subtitle}>
          Retrieval-Augmented Generation engine to unleash your full potential
        </p>
        <div className={styles.buttons}>
          <Link to="https://demo.ragflow.io" className={styles.mainButton}>
            Try RagFlow
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
      className={styles.mainSection}
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
