import type { ReactNode } from 'react';

import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

// import Icon from '@site/src/components/Icon';
import { cn } from '@site/src/utils/twUtils';

import styles from './index.module.scss';

import IndexHeroBgAnimation from './_animations/IndexHeroBgAnimation';

import FxEdgeInnerLightEffect from '@site/src/utils/visual-effects/FxEdgeInnerLightEffect';
import FxGradientText from '@site/src/utils/visual-effects/FxGradientText';
import FxGlowEffect from '@site/src/utils/visual-effects/FxGlowEffect';
import FxPolkaDotsBackgroundEffect from '@site/src/utils/visual-effects/FxPolkaDotsBackgroundEffect';

import IndexFeatureEtlAnimation from './_animations/IndexFeatureEtlAnimation';
import IndexFeatureHybridSearchAnimation from './_animations/IndexFeatureHybridSearchAnimation';
import IndexFeatureUnifiedAgentAnimation from './_animations/IndexFeatureUnifiedAgentAnimation';
import IndexSolutionEquityInvestmentResearchAnimation from './_animations/IndexSolutionEquityInvestmentResearchAnimation';

import IndexTestimonials from './_components/IndexTestimonials';
import IndexPricingPlans from './_components/IndexPricingPlans';
import IndexSolutionLegalPrecedentAnalysisAnimation from './_animations/IndexSolutionLegalPrecedentAnalysisAnimation';

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}
      wrapperClassName={styles.page}
    >
      <div className="text-standard text-sm mobile:text-base">
        {/* Hero */}
        <header
          className="
            relative flex justify-center items-center
            min-h-max
            py-8 mobile:py-12 desktop:py-20
            text-center text-lg desktop:text-2xl
          "
        >
          <IndexHeroBgAnimation
            key="fxHeroBgEffect"
            aria-hidden="true"
          />

          <div className="container max-desktop:px-page">
            <h1 className="
              mx-auto text-center text-hero font-bold
              drop-shadow-[0_0_2em_rgb(var(--ragflow-theme-white))] text-pretty
              mb-4 mobile:mb-8 desktop:mb-12"
            >
              <FxGradientText
                preset="text"
              >
                Build a superior context layer for
              </FxGradientText>
              <span>{' '}</span>
              <FxGradientText
                className="whitespace-nowrap"
                preset="primary"
                direction="right"
              >
                AI agents
              </FxGradientText>
            </h1>

            <p>
              Empower your AI agents through the leading open-source RAG engine,
              <br className="max-desktop:hidden" aria-hidden /> delivering reliable context and an integrated agent platform, built for enterprise.
            </p>

            <FxGlowEffect
              className="mobile:mt-6 desktop:mt-12"
              as={Link}
              to="https://demo.ragflow.io/"
            >
              <button
                className={cn(styles.btn, 'px-9 py-3 rounded-lg')}
              >
                Try demo
              </button>
            </FxGlowEffect>
          </div>
        </header>

        {/* Main content */}
        <div className="relative overflow-hidden">
          <main className="container max-desktop:px-page space-y-48">
            {/* Features */}
            <section
              className="max-desktop:space-y-6 desktop:grid desktop:grid-cols-2 desktop:gap-6"
              aria-label="Features"
            >
              <article className={cn('flex flex-col', styles.card)}>
                <header>
                  <h2 id="feature-1">
                    <FxGradientText
                      preset="primary"
                      direction="right"
                    >
                      ETL for AI data
                    </FxGradientText>
                  </h2>
                </header>

                <p>
                  Harness our built-in ingestion pipeline to cleanse and process multi-format data,
                  structuring it into rich semantic representations for superior retrieval.
                </p>

                <IndexFeatureEtlAnimation
                  key="animation"
                  className="w-full max-h-[280px] aspect-video"
                  role="figure"
                  aria-labelledby="feature-1"
                />
              </article>

              <article className={cn('flex flex-col', styles.card)}>
                <header>
                  <h2 id="feature-2">
                    <FxGradientText
                      preset="primary"
                      direction="right"
                    >
                      High-precision hybrid search
                    </FxGradientText>
                  </h2>

                </header>

                <p>
                  Combine vector search, BM25, and custom scoring with advanced re-ranking
                  to deliver unmatched answer accuracy and context relevance.
                </p>

                <IndexFeatureHybridSearchAnimation
                  key="animation"
                  className=" w-full max-h-[280px] aspect-video"
                  role="figure"
                  aria-labelledby="feature-2"
                />
              </article>

              <article className={cn('desktop:col-span-2', styles.card)}>
                <header>
                  <h2 id="feature-3">
                    <span className={styles.primaryGradientText}>
                      Unified AI agent orchestration
                    </span>
                  </h2>
                </header>

                <p>
                  Build powerful agents in an all-in-one platform, seamlessly integrating RAG, tools, and MCPs within visual workflows.
                </p>

                <IndexFeatureUnifiedAgentAnimation
                  key="animation"
                  className="w-full max-h-[280px] aspect-video"
                  role="figure"
                  aria-labelledby="feature-3"
                />
              </article>
            </section>

            {/* Solutions */}
            <section
              className="space-y-12"
              aria-label="Solutions"
            >
              <header>
                <h1
                  id="solutions"
                  className="mb-24 text-center"
                >
                  <FxGradientText
                    preset="primary"
                    direction="right"
                  >
                    Smart solutions for every industry
                  </FxGradientText>
                </h1>
              </header>

              <article className="flex flex-col desktop:flex-row gap-8 desktop:gap-16">
                <div>
                  <header>
                    <h2 id="solution-1">
                      <FxGradientText
                        preset="primary info"
                        direction="right"
                      >
                        Equity investment research
                      </FxGradientText>
                    </h2>
                  </header>

                  <p>
                    This workflow automates company data collection and consolidates financial metrics with research insights. Enables advanced stock analysis through autonomous planning and multi-agent orchestration.
                  </p>

                  <p className="mb-0">
                    It starts by identifying stock tickers from user queries, then aggregates insights from external authoritative sources and internal records. Ultimately, these qualitative insights are combined with financial metrics to yield a complete investment report.
                  </p>
                </div>

                <FxPolkaDotsBackgroundEffect
                  className={cn(
                    styles.card,
                    'p-2 flex-none desktop:w-3/5 w-full desktop:max-h-[480px] aspect-video',
                  )}
                >
                  <IndexSolutionEquityInvestmentResearchAnimation
                    key="animation"
                    className="size-full"
                    role="figure"
                    aria-labelledby="solution-1"
                  />
                </FxPolkaDotsBackgroundEffect>
              </article>

              <article className="flex flex-col desktop:flex-row gap-8 desktop:gap-16">
                <div>
                  <header>
                    <h2 id="solution-2">
                      <FxGradientText
                        preset="primary info"
                        direction="right"
                      >
                        Legal precedent analysis
                      </FxGradientText>
                    </h2>
                  </header>

                  <p>
                    This workflow provides structured precedent analysis by examining similar legal cases across public sources and internal datasets.
                  </p>

                  <p className="mb-0">
                    Upon case input, key attributes—such as jurisdiction and legal issues—are automatically extracted to formulate search queries and retrieve comparable precedents. The results are then consolidated into a structured analysis reflecting how similar cases were resolved.
                    This workflow automates company data collection and consolidates financial metrics with research insights. Enables advanced stock analysis through autonomous planning and multi-agent orchestration.
                  </p>
                </div>

                <FxPolkaDotsBackgroundEffect
                  className={cn(
                    styles.card,
                    'p-2 flex-none desktop:w-3/5 w-full desktop:max-h-[480px] aspect-video',
                  )}
                >
                  <IndexSolutionLegalPrecedentAnalysisAnimation
                    key="animation"
                    className="size-full"
                    role="figure"
                    aria-labelledby="solution-2"
                  />
                </FxPolkaDotsBackgroundEffect>
              </article>
            </section>

            {/* Testimonials */}
            {/* <section
              aria-label="Here's what people are saying about RAGFlow"
            >
              <h1 className="mb-24 text-center">
                <FxGradientText
                  preset="primary"
                  direction="right"
                >
                  Here’s what people are saying about RAGFlow
                </FxGradientText>
              </h1>

              <IndexTestimonials />
            </section> */}

            {/* Pricing plans*/}
            {/* <section aria-label="Scale Your Business">
              <h1 className="mb-24 text-center">
                <FxGradientText
                  preset="primary"
                  direction="right"
                >
                  Scale Your Business
                </FxGradientText>
              </h1>

              <IndexPricingPlans />
            </section> */}

            {/* Try demo */}
            <section
              className="!my-64 text-center"
              aria-labelledby="start-building"
            >
              <header>
                <h1 id="start-building">
                  <FxGradientText
                    preset="primary"
                    direction="right"
                  >
                    Start building
                  </FxGradientText>
                </h1>
              </header>

              <div className="mt-16 flex justify-center items-center gap-8">
                <FxGlowEffect
                  as={Link}
                  to="https://demo.ragflow.io/"
                >
                  <button className={styles.btn}>
                    Try demo
                  </button>
                </FxGlowEffect>

                <Link
                  className={cn(styles.btn, 'bg-standard')}
                  href="https://github.com/infiniflow/ragflow"
                >
                  <span>Github</span>
                </Link>
              </div>
            </section>
          </main>

          <FxEdgeInnerLightEffect className="w-full min-w-[960px] h-[800px] left-1/2 -translate-x-1/2 bottom-0" />
        </div>
      </div>
    </Layout>
  );
}
