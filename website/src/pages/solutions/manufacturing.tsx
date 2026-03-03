import Layout from '@theme/Layout';

import Icon from '@site/src/components/Icon';

import FxGradientText from '@site/src/utils/visual-effects/FxGradientText';
import FxEdgeInnerLightEffect from '@site/src/utils/visual-effects/FxEdgeInnerLightEffect';
import FxSpotlightEffect from '@site/src/utils/visual-effects/FxSpotlight';
import FxRecolorIcon from '@site/src/utils/visual-effects/FxRecolorIcon';

import { cn } from '@site/src/utils/twUtils';

import IMG_BANNER from '@site/src/assets/img/solutions/manufacturing/banner.png';

import IMG_1 from '@site/src/assets/img/solutions/manufacturing/1.png';
import IMG_2 from '@site/src/assets/img/solutions/manufacturing/2.png';
import IMG_3 from '@site/src/assets/img/solutions/manufacturing/3.png';
import IMG_4 from '@site/src/assets/img/solutions/manufacturing/4.png';

import styles from './index.module.scss';
import commonStyles from '../index.module.scss';

const FEATURES = [
  {
    image: IMG_1,
    title: 'Unify manuals and work orders',
    items: [
      'Ingest SOPs, work instructions, equipment manuals, and work order data',
      'Identify parts, alarm codes, parameters, and step-by-step procedures',
      'Extract defect types and acceptance criteria from quality reports',
    ],
  },
  {
    image: IMG_2,
    title: 'Ops and quality closed loop',
    items: [
      'Cover alerts, incident handling, and process changes end to end, then generate work orders and analysis conclusions',
      'Turn team experience into reusable operational and quality knowledge',
    ],
  },
  {
    image: IMG_3,
    title: 'Troubleshooting with traceability',
    items: [
      'Jump to the right manual section by alarm code, component, or station',
      'Ground every recommendation in the original manual or work order text',
      'Compare similar historical incidents to see what worked and what did not',
    ],
  },
  {
    image: IMG_4,
    title: 'Line knowledge accumulation',
    items: [
      'Build equipment profiles and summarize recurring failures and effective fixes',
      'Capture handover risks and critical steps for shift teams',
    ],
  },
];

const USE_CASES = [
  {
    icon: 'RagEquipment',
    title: 'Equipment troubleshooting assistant',
    description: 'Input an alarm code and get step-by-step checks and cautions with citations.'
  },
  {
    icon: 'RagQuality',
    title: 'Quality exception analysis',
    description: 'Summarize defect descriptions and data, then draft corrective actions with an evidence.',
  },
  {
    icon: 'RagProcess',
    title: 'Process change review',
    description: 'Pull SOPs and ECNs, then list impacted steps and key risks.',
  },
  {
    icon: 'RagIncoming',
    title: 'Incoming inspection for suppliers',
    description: 'Check specs against inspection criteria and recommend deviation handling.',
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
              Convert work orders and manuals into on-site resolution playbooks
            </FxGradientText>
          </h1>

          <p className="text-xl xl:text-2xl xl:!leading-loose">
            For plant managers, equipment owners, and engineers, connect manuals, work orders,
            and quality reports to reduce downtime, rework, and information gaps on the shop floor.
          </p>
        </header>

        <main className="mt-12 relative">
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