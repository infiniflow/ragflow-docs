import Layout from '@theme/Layout';

import Icon from '@site/src/components/Icon';

import FxGradientText from '@site/src/utils/visual-effects/FxGradientText';
import FxEdgeInnerLightEffect from '@site/src/utils/visual-effects/FxEdgeInnerLightEffect';
import FxSpotlightEffect from '@site/src/utils/visual-effects/FxSpotlight';
import FxRecolorIcon from '@site/src/utils/visual-effects/FxRecolorIcon';

import { cn } from '@site/src/utils/twUtils';

import IMG_BANNER from '@site/src/assets/img/solutions/legal/banner.png';

import IMG_1 from '@site/src/assets/img/solutions/legal/1.png';
import IMG_2 from '@site/src/assets/img/solutions/legal/2.png';

import styles from './index.module.scss';
import commonStyles from '../index.module.scss';

const FEATURES = [
  {
    image: IMG_1,
    title: 'Contract and dossier understanding',
    items: [
      'Parse clause structure, key obligations, and risk hotspots',
      'Extract parties, key dates and terms, breach triggers, and dispute resolution elements',
      'Build an evidence timeline and an indexed exhibit list from case materials',
    ],
  },
  {
    image: IMG_2,
    title: 'Argument-ready retrieval',
    items: [
      'Locate the exact source text by clause, issue, or party',
      'Attach relevant statutes and precedents to each conclusion',
      'Support validation by highlighting missing support and surfacing counterexamples',
    ],
  },
];

const USE_CASES = [
  {
    icon: 'RagContract',
    title: 'Contract risk review assistant',
    description: (<>
      Users can ask questions such as “Analyze NVIDIA’s AI-related revenue changes over the past three quarters.”<br />
      The agent automatically retrieves internal and public research reports, generates comparison tables and insights, and provides full source references.
    </>),
  },
  {
    icon: 'RagQA',
    title: 'Compliance & Risk Control Q&A',
    description: (<>
      New employees or sales staff can ask questions like “Can leveraged products be recommended to retail investors?”<br />
      The agent responds strictly based on internal compliance manuals, citing specific clauses and policies.
    </>),
  },
  {
    icon: 'RagLitigation',
    title: 'Post-Investment Monitoring',
    description: (<>
      A dedicated knowledge base is built for portfolio companies.<br />
      The agent generates quarterly business summaries and highlights key operational and risk signals.
    </>),
  },
  {
    icon: 'RagClause',
    title: 'Regulatory Change Tracking',
    description: (<>
      New regulatory documents are synchronized into the knowledge base.<br />
      The agent can answer questions such as “Which regulatory changes last month impact our cross-border business?” and list relevant clauses and implications.
    </>),
  },
];

export default function PageAdvancedStockResearch() {
  return (
    <Layout
      title="Advanced Stock Research"
      description="Advanced Stock Research"
      wrapperClassName={styles.page}
    >
      <div className="relative container max-desktop:px-page text-standard text-sm mobile:text-base pb-64">
        <header className="relative py-36 text-center">
          <div className="absolute -z-10 inset-0 top-36 h-full min-w-full" inert>
            <img
              role="presentation"
              src={IMG_BANNER}
              className="opacity-20 object-contain size-auto h-full"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-bg-standard/80 to-transparent" />
          </div>

          <h1 className="mb-8 xl:mb-12 text-4xl">
            <FxGradientText
              preset="primary"
              direction="right"
            >
              Turn contracts and case files into defensible conclusions
            </FxGradientText>
          </h1>

          <p className="text-xl xl:text-2xl xl:!leading-loose">
            For law firms and in-house legal teams, unify contracts, due diligence materials, and statutes or case law to produce review outcomes that are verifiable, citeable, and ready to deliver.
          </p>
        </header>

        <main className="mt-12 relative xl:px-36">
          <FxSpotlightEffect
            className="w-[200%] min-w-[960px] h-[520px] left-1/2 -translate-x-1/2 top-8 -translate-y-1/2 opacity-10"
          />

          <div className="space-y-48">
            <div className="flex flex-col gap-20 xl:gap-y-28">
              {FEATURES.map((feature) => (
                <article
                  key={feature.title}
                  className="flex gap-16 odd:flex-row-reverse"
                >
                  <div className="w-44 desktop:w-48 xl:w-1/4 flex-none hidden md:block">
                    <img
                      className="w-full object-contain object-center aspect-1"
                      src={feature.image}
                      role="presentation"
                    />
                  </div>

                  <div className="flex-1">
                    <header>
                      <h2 className="text-2xl xl:text-3xl">
                        <FxGradientText
                          preset="primary"
                          direction="right"
                        >
                          {feature.title}
                        </FxGradientText>
                      </h2>
                    </header>


                    <ul className="text-base leading-7 xl:text-lg xl:leading-9">
                      {feature.items.map((item) => (
                        <li key={item}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>

            <section aria-labelledby="use-cases">
              <header className="text-center mb-32">
                <h1 id="use-cases">
                  <FxGradientText
                    preset="primary"
                    direction="right"
                  >
                    Use cases
                  </FxGradientText>
                </h1>
              </header>

              <div className="grid grid-cols-1 gap-12 xl:grid-cols-2 xl:gap-20">
                {USE_CASES.map(({ icon, ...useCase }) => (
                  <article
                    key={useCase.title}
                    className={cn(commonStyles.card, 'bg-transparent')}
                  >
                    <header>
                      <h2 className="flex flex-col gap-4 text-xl font-medium">
                        <FxRecolorIcon
                          to="bottom"
                          stops={[[0, '#fff'], [1, '#888']]}
                        >
                          <Icon icon={icon as any} className="size-12 text-[3rem] stroke-1" />
                        </FxRecolorIcon>

                        <span>{useCase.title}</span>
                      </h2>
                    </header>

                    <p className="text-sm">{useCase.description}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </main>

        <FxEdgeInnerLightEffect
          position="bottom"
          className="absolute w-[150%] min-w-[960px] h-[600px] left-1/2 bottom-0 -translate-x-1/2"
        />
      </div>
    </Layout>
  );
}