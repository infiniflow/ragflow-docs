import Layout from '@theme/Layout';

import Icon from '@site/src/components/Icon';

import FxGradientText from '@site/src/utils/visual-effects/FxGradientText';
import FxEdgeInnerLightEffect from '@site/src/utils/visual-effects/FxEdgeInnerLightEffect';
import FxSpotlightEffect from '@site/src/utils/visual-effects/FxSpotlight';
import FxRecolorIcon from '@site/src/utils/visual-effects/FxRecolorIcon';

import { cn } from '@site/src/utils/twUtils';

import IMG_BANNER from '@site/src/assets/img/solutions/education/banner.png';

import IMG_1 from '@site/src/assets/img/solutions/education/1.png';
import IMG_2 from '@site/src/assets/img/solutions/education/2.png';
import IMG_3 from '@site/src/assets/img/solutions/education/3.png';
import IMG_4 from '@site/src/assets/img/solutions/education/4.png';

import styles from './index.module.scss';
import commonStyles from '../index.module.scss';

const FEATURES = [
  {
    image: IMG_1,
    title: 'Courseware understanding',
    items: [
      'Parse textbook and handout structure and map knowledge concepts',
      'Extract tested skills, question types, common misconceptions, and explanations',
      'Turn class recordings into key points and lesson handout drafts',
    ],
  },
  {
    image: IMG_2,
    title: 'Explainability with citations',
    items: [
      'Tie answers to textbook chapters and curriculum standards',
      'Provide step-by-step reasoning with references',
      'Explain why an answer is wrong and how to fix it with root cause feedback',
    ],
  },
  {
    image: IMG_3,
    title: 'Prep to teaching quality review',
    items: [
      'Support the workflow from lesson prep to in-class delivery for faster, higher-quality teaching',
      'Grade assignments and analyze mistakes to continuously improve learning outcomes',
    ],
  },
  {
    image: IMG_4,
    title: 'Student insights and school dataset',
    items: [
      'Build student profiles covering weaknesses, mastery levels, and practice preferences',
      'Maintain a school knowledge base covering policies, procedures, and FAQs',
    ],
  },
];

const USE_CASES = [
  {
    icon: 'RagLesson',
    title: 'Lesson prep assistant',
    description: 'Input a chapter and generate lesson structure, board notes, and practice sets.'
  },
  {
    icon: 'RagHomework',
    title: 'Homework review assistant',
    description: 'Cluster error patterns and output leveled, personalized feedback and exercises.',
  },
  {
    icon: 'RagPersonalized',
    title: 'Personalized practice',
    description: 'Recommend similar questions based on wrong answers and explain key thinking steps.',
  },
  {
    icon: 'RagAcademic',
    title: 'Academic affairs Q&A',
    description: 'Answer process questions quickly with policy sources attached.',
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
              Build personalized courseware and learning paths
            </FxGradientText>
          </h1>

          <p className="text-xl xl:text-2xl xl:!leading-loose">
            For education teams, unify courseware, question banks, and classroom content to improve lesson prep efficiency, feedback quality, and personalized learning outcomes.
          </p>
        </header>

        <main className="mt-12 relative z-10">
          <FxSpotlightEffect
            className="w-[200%] min-w-[960px] h-[520px] left-1/2 -translate-x-1/2 top-8 -translate-y-1/2 opacity-10"
          />

          <div className="space-y-48">
            <div className="flex flex-col gap-20 xl:grid xl:grid-cols-2 xl:gap-y-28">
              {FEATURES.map((feature) => (
                <article
                  key={feature.title}
                  className="flex gap-4"
                >
                  <div className="w-44 desktop:w-48 xl:w-1/3 flex-none hidden md:block">
                    <img
                      className="w-full object-contain object-center aspect-1"
                      src={feature.image}
                      role="presentation"
                    />
                  </div>

                  <div className="flex-1">
                    <header>
                      <h2 className="text-xl">
                        <FxGradientText
                          preset="primary"
                          direction="right"
                        >
                          {feature.title}
                        </FxGradientText>
                      </h2>
                    </header>


                    <ul className="text-sm leading-6">
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
                <h1 id="use-cases" className="text-5xl">
                  <FxGradientText
                    preset="primary"
                    direction="right"
                  >
                    Use cases
                  </FxGradientText>
                </h1>
              </header>

              <div className="grid grid-cols-1 gap-12 xl:grid-cols-2 xl:gap-20 xl:px-36">
                {USE_CASES.map(({ icon, ...useCase }) => (
                  <article
                    key={useCase.title}
                    className={cn(commonStyles.card, 'bg-transparent')}
                  >
                    <header>
                      <h2 className="flex flex-col gap-4 text-base font-medium">
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