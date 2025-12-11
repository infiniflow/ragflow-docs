import type { ReactNode } from 'react';

import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

// import Icon from '@site/src/components/Icon';
import { cn } from '@site/src/utils/twUtils';

import styles from './index.module.scss';

import IndexHeroBgAnimation from './_animations/IndexHeroBgAnimation';

import FxEdgeLightEffect from './_fx/FxEdgeLightEffect';
import FxGlowEffect from './_fx/FxGlowEffect';

import IndexFeatureEtlAnimation from './_animations/IndexFeatureEtlAnimation';
import IndexFeatureHybridSearchAnimation from './_animations/IndexFeatureHybridSearchAnimation';
import IndexFeatureUnifiedAgentAnimation from './_animations/IndexFeatureUnifiedAgentAnimation';
import IndexSolutionAdvancedStockResearchAnimation from './_animations/IndexSolutionAdvancedStockResearchAnimation';

import IndexTestimonials from './_components/IndexTestimonials';
import IndexPricingPlans from './_components/IndexPricingPlans';

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.title}
      description="The AI-powered RAG solution"
      wrapperClassName={styles.page}
    >
      <div className="text-standard">
        {/* Hero */}
        <header
          className="
            relative flex justify-center items-center min-h-[800px] h-[75vh] py-32
            text-center text-[1.25rem] desktop:text-[1.5rem]
          "
        >
          <IndexHeroBgAnimation
            key="fxHeroBgEffect"
            aria-hidden="true"
          />

          <div className="container max-desktop:px-page">
            <h1 className="
              mx-auto text-center text-[4rem] desktop:text-[6rem] font-bold
              drop-shadow-[0_0_25px_rgb(var(--ragflow-theme-white))] text-pretty"
            >
              <span className={styles.heroTitleTextGradient}>
                Build superior context layer for&nbsp;
              </span>
              <span className={cn(styles.primaryGradientText, 'whitespace-nowrap')}>AI Agents</span>
            </h1>

            <p>
              Empower Your AI Agents through the leading open-source RAG engine, <br className="max-desktop:hidden" /> delivering reliable context and an integrated agent platform, built for enterprise
            </p>

            <Link to="https://demo.ragflow.io/">
              <FxGlowEffect className="mt-16">
                <button
                  className={cn(styles.btn, 'px-9 py-3 rounded-lg')}
                >
                  Try demo
                </button>
              </FxGlowEffect>
            </Link>
          </div>
        </header>

        {/* Main content */}
        <article className="relative pt-28 overflow-hidden">
          <main className="container max-desktop:px-page space-y-48">
            {/* Features */}
            <div className="max-desktop:space-y-6 desktop:grid desktop:grid-cols-2 desktop:gap-6">
              <section
                className={cn('flex flex-col', styles.card)}
                aria-label="ETL for AI data"
              >
                <h2>
                  <span className={styles.primaryGradientText}>
                    ETL for AI data
                  </span>
                </h2>

                <p>
                  Harness our built-in ingestion pipeline to cleanse and process multi-format data,
                  structuring it into rich semantic representations for superior retrieval.
                </p>

                <IndexFeatureEtlAnimation key="animation" className="mt-auto w-full max-h-[280px] aspect-video"/>
              </section>

              <section
                className={cn('flex flex-col', styles.card)}
                aria-label="High-Precision hybrid search"
              >
                <h2>
                  <span className={styles.primaryGradientText}>
                    High-Precision hybrid search
                  </span>
                </h2>

                <p>
                  Combine vector search, BM25, and custom scoring with advanced reranking
                  to deliver unmatched answer accuracy and context relevance.
                </p>

                <IndexFeatureHybridSearchAnimation key="animation" className="mt-auto w-full max-h-[280px] aspect-video"/>
              </section>

              <section
                className={cn('desktop:col-span-2', styles.card)}
                aria-label="Unified AI agent orchestration"
              >
                <h2>
                  <span className={styles.primaryGradientText}>
                    Unified AI agent orchestration
                  </span>
                </h2>

                <p>
                  Build powerful agents in an all-in-one platform, seamlessly integrating RAG,
                  Tools, and MCPs within visual workflows.
                </p>

                <IndexFeatureUnifiedAgentAnimation key="animation" className="w-full max-h-[280px] aspect-video"/>
              </section>
            </div>

            {/* Solutions */}
            <section aria-label="Smart solutions for every industry">
              <h1 className="mb-24 text-center">
                <span className={styles.primaryGradientText}>Smart solutions for every industry</span>
              </h1>

              <div>
                <section
                  className="flex flex-col desktop:flex-row gap-16"
                  aria-label="Advanced stock research"
                >
                  <div>
                    <h2>
                      <span className={styles.primaryInfoGradientText}>
                      Advanced stock research
                      </span>
                    </h2>

                    <p className="mb-16">
                      It automatically gathers company data, consolidates financial metrics and research insights It automatically gathers company data, consolidates It automatically gathers company data, consolidates financial metrics and research insights
                    </p>

                    <FxGlowEffect>
                      <button className={styles.btn}>
                        Try demo
                      </button>
                    </FxGlowEffect>
                  </div>

                  <div className={cn(
                    styles.card,
                    styles.bgPolka,
                    'p-2 flex-none desktop:w-3/5 max-h-[480px] aspect-video',
                  )}>
                    <IndexSolutionAdvancedStockResearchAnimation
                      key="animation"
                      className="size-full"
                    />
                  </div>
                </section>
              </div>
            </section>

            {/* Testimonials */}
            {/* <section
              aria-label="Here's what people are saying about RAGFlow"
            >
              <h1 className="mb-24 text-center">
                <span className={styles.primaryGradientText}>Here’s what people are saying about RAGFlow</span>
              </h1>

              <IndexTestimonials />
            </section> */}

            {/* Pricing plans*/}
            {/* <section aria-label="Scale Your Business">
              <h1 className="mb-24 text-center">
                <span className={styles.primaryGradientText}>Scale Your Business</span>
              </h1>

              <IndexPricingPlans />
            </section> */}

            {/* Try demo */}
            <section
              aria-label="Start building"
              className="!my-64 text-center"
            >
              <h1>
                <span className={styles.primaryGradientText}>Start building</span>
              </h1>

              <div className="mt-16 flex justify-center items-center gap-8">
                <Link to="https://demo.ragflow.io/">
                  <FxGlowEffect>
                    <button className={styles.btn}>
                      Try demo
                    </button>
                  </FxGlowEffect>
                </Link>

                <Link
                  className={cn(styles.btn, 'bg-standard')}
                  href="https://github.com/infiniflow/ragflow"
                >
                  <span>Github</span>
                </Link>
              </div>
            </section>
          </main>

          <FxEdgeLightEffect className="w-full min-w-[960px] h-[800px] left-1/2 -translate-x-1/2 bottom-0" />
        </article>
      </div>
    </Layout>
  );
}
