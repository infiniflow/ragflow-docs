import Layout from "@theme/Layout";

import Icon from "@site/src/components/Icon";

import FxGradientText from "@site/src/utils/visual-effects/FxGradientText";
import FxEdgeInnerLightEffect from "@site/src/utils/visual-effects/FxEdgeInnerLightEffect";
import FxSpotlightEffect from "@site/src/utils/visual-effects/FxSpotlight";
import FxRecolorIcon from "@site/src/utils/visual-effects/FxRecolorIcon";

import { cn } from "@site/src/utils/twUtils";

import IMG_BANNER from "@site/src/assets/img/solutions/finance/banner.png";

import IMG_1 from "@site/src/assets/img/solutions/finance/1.png";
import IMG_2 from "@site/src/assets/img/solutions/finance/2.png";
import IMG_3 from "@site/src/assets/img/solutions/finance/3.png";
import IMG_4 from "@site/src/assets/img/solutions/finance/4.png";

import styles from "./index.module.scss";
import commonStyles from "../index.module.scss";

const FEATURES = [
  {
    image: IMG_1,
    title: "Connect analysis with operations",
    items: [
      "A one-stop solution for cleansing and extracting multimodal data including reports, contracts and recordings.",
      "Auto-recognize financial document layouts to produce traceable knowledge chunks.",
    ],
  },
  {
    image: IMG_2,
    title: "Decision-ready industry insights",
    items: [
      "Combine entity extraction with semantic and context-aware structures to locate and interpret statutes from massive reports, cases and contracts.",
      "Each response cites its source, enabling one-click navigation to the original paragraph or clause.",
    ],
  },
  {
    image: IMG_3,
    title: "Research and risk workflows",
    items: [
      "Integrate natively with mainstream financial data sources to support research and decision-making.",
      "Agent execution is transparent from data retrieval through to analytical conclusions, building trust in every response.",
    ],
  },
  {
    image: IMG_4,
    title: "Granular access control",
    items: [
      "Real-time document-level ACLs enable fine-tuned control, ensuring users' access to data is precisely scoped to their organizational privileges.",
      "Implement granular, multi-level isolation (tenant, department, role and project-level), enforcing strict static and dynamic security boundaries.",
    ],
  },
];

const USE_CASES = [
  {
    icon: "RagResearch",
    title: "Research assistant",
    description: `A query "Analyze NVDA recent quarter AI revenue" triggers retrieval from internal reports, external research and raw data, culminating in an AI-generated citeable brief.`,
  },
  {
    icon: "RagSales",
    title: "Sales compliance assistant",
    description:
      "Check sales scripts and product recommendations against regulatory and institutional rules in real-time to reduce sales compliance risks.",
  },
  {
    icon: "RagPost",
    title: "Post-investment tracking assistant",
    description:
      "RTrack portfolio companies' finance, operations and risk signals, then generate traceable reports to support informed decision-making.",
  },
  {
    icon: "RagCompliance",
    title: "Compliance and audit assistant",
    description:
      "Consolidate regulatory documents and internal rules, enabling auditors to quickly locate compliance evidence.",
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
          <div
            className="absolute -z-10 inset-0 top-36 h-full min-w-full"
            inert
          >
            <img
              role="presentation"
              src={IMG_BANNER}
              className="opacity-100 object-contain size-auto h-full"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-bg-standard/80 to-transparent" />
          </div>

          <h1 className="mb-8 xl:mb-12 text-4xl">
            <FxGradientText preset="primary" direction="right">
              Convert diverse financial data into informed decisions
            </FxGradientText>
          </h1>

          <p className="text-xl xl:text-2xl xl:!leading-loose">
            Tailor financial scenarios with multimodal data parsing and
            traceable techniques to de-risk investments, streamline business
            operations and enhance your competitive position.
          </p>
        </header>

        <main className="mt-12 relative z-10">
          <FxSpotlightEffect className="w-[200%] min-w-[960px] h-[520px] left-1/2 -translate-x-1/2 top-8 -translate-y-1/2 opacity-10" />

          <div className="space-y-48">
            <div className="flex flex-col gap-20 xl:grid xl:grid-cols-2 xl:gap-y-28">
              {FEATURES.map((feature) => (
                <article key={feature.title} className="flex gap-4">
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
                        <FxGradientText preset="primary" direction="right">
                          {feature.title}
                        </FxGradientText>
                      </h2>
                    </header>

                    <ul className="text-sm leading-6">
                      {feature.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>

            <section aria-labelledby="use-cases">
              <header className="text-center mb-32">
                <h1 id="use-cases" className="text-5xl">
                  <FxGradientText preset="primary" direction="right">
                    Use cases
                  </FxGradientText>
                </h1>
              </header>

              <div className="grid grid-cols-1 gap-12 xl:grid-cols-2 xl:gap-20 xl:px-36">
                {USE_CASES.map(({ icon, ...useCase }) => (
                  <article
                    key={useCase.title}
                    className={cn(commonStyles.card, "bg-transparent")}
                  >
                    <header>
                      <h2 className="flex flex-col gap-4 text-base font-medium">
                        <FxRecolorIcon
                          to="bottom"
                          stops={[
                            [0, "#fff"],
                            [1, "#888"],
                          ]}
                        >
                          <Icon
                            icon={icon as any}
                            className="size-12 text-[3rem] stroke-1"
                          />
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
