import { useId, useLayoutEffect } from "react";

import { cn } from "@site/src/utils/twUtils";
import SvgBreathingGlowFilter from "@site/src/utils/visual-effects/SvgBreathingGlowFilter";
import SvgForeignIcon from "@site/src/utils/visual-effects/SvgForeignIcon";
import SvgRecolorLinearGradientFilter from "@site/src/utils/visual-effects/SvgRecolorLinearGradientFilter";

import SvgSpotlightFilter from "@site/src/utils/visual-effects/SvgSpotlightFilter";

import {
  SerialAnimationGroup,
  ParallelAnimationGroup,
} from "@site/src/utils/AnimationGroup";

import {
  PRIMARY_COLOR,
  BORDER_COLOR,
  DISABLED_COLOR,
  SECONDARY_COLOR,
  DASH_ARRAY,
} from "./constants";
import Icon from "@site/src/components/Icon";

export default function IndexSolutionEquityInvestmentResearchAnimation({ className, ...restProps }: React.HTMLAttributes<HTMLDivElement>) {
  const id = useId();

  const shapeBox = `${id}ShapeBox`;
  const shapeRectangle = `${id}ShapeRectangle`;
  const shapeDot = `${id}ShapeDot`;
  const shapeArrow = `${id}ShapeArrow`;

  const shapeConditionIcon = `${id}ShapeConditionIcon`;
  const shapeSearchAgent = `${id}ShapeSearchAgent`;
  const shapeSearchAgentIcon = `${id}ShapeSearchAgentIcon`;
  const shapeSearchAgentText = `${id}ShapeSearchAgentText`;
  const shapeAnalyzeAgent = `${id}ShapeAnalyzeAgent`;
  const shapeAnalyzeAgentIcon = `${id}ShapeAnalyzeAgentIcon`;
  const shapeAnalyzeAgentText = `${id}ShapeAnalyzeAgentText`;
  const shapeReportAgent = `${id}ShapeReportAgent`;
  const shapeReportAgentIcon = `${id}ShapeReportAgentIcon`;
  const shapeReportAgentText = `${id}ShapeReportAgentText`;
  const shapeReportIcon = `${id}ShapeReportIcon`;

  const pathStartToSearchAgent = `${id}PathStartToSearchAgent`;
  const pathSearchAgentToCondition = `${id}PathSearchAgentToCondition`;
  const pathConditionToHttp = `${id}PathConditionToHttp`;
  const pathHttpToCode = `${id}PathHttpToCode`;
  const pathCodeToEnd = `${id}PathCodeToEnd`;
  const pathConditionToAnalyzeAgent = `${id}PathConditionToAnalyzeAgent`;
  const pathAnalyzeAgentToReportAgent = `${id}PathAnalyzeAgentToReportAgent`;
  const pathReportAgentToEnd = `${id}PathReportAgentToEnd`;

  const patternDotGrid = `${id}PatternDotGrid`;

  const markerDot = `${id}MarkerDot`;
  const markerDotColored = `${id}MarkerBigDot`;
  const markerArrow = `${id}MarkerArrow`;
  const markerArrowColored = `${id}MarkerArrowColored`;

  const filterSpotlight = `${id}FilterSpotlight`;
  const filterGlowBlurBreathing = `${id}FilterGlowBlurBreathing`;
  const filterRecolorPrimaryGradient = `${id}FilterRecolorPrimaryGradient`;
  const filterRecolorGreyGradient = `${id}FilterRecolorGreyGradient`;

  useLayoutEffect(() => {
    const elShapeConditionIcon = document.getElementById(shapeConditionIcon);
    const elShapeSearchAgent = document.getElementById(shapeSearchAgent);
    const elShapeSearchAgentIcon = document.getElementById(shapeSearchAgentIcon);
    const elShapeSearchAgentText = document.getElementById(shapeSearchAgentText);
    const elShapeAnalyzeAgent = document.getElementById(shapeAnalyzeAgent);
    const elShapeAnalyzeAgentIcon = document.getElementById(shapeAnalyzeAgentIcon);
    const elShapeAnalyzeAgentText = document.getElementById(shapeAnalyzeAgentText);
    const elShapeReportAgent = document.getElementById(shapeReportAgent);
    const elShapeReportAgentIcon = document.getElementById(shapeReportAgentIcon);
    const elShapeReportAgentText = document.getElementById(shapeReportAgentText);
    const elPathStartToSearchAgent = document.getElementById(pathStartToSearchAgent);
    const elPathSearchAgentToCondition = document.getElementById(pathSearchAgentToCondition);
    const elPathConditionToHttp = document.getElementById(pathConditionToHttp);
    const elPathHttpToCode = document.getElementById(pathHttpToCode);
    const elPathCodeToEnd = document.getElementById(pathCodeToEnd);
    const elPathConditionToAnalyzeAgent = document.getElementById(pathConditionToAnalyzeAgent);
    const elPathAnalyzeAgentToReportAgent = document.getElementById(pathAnalyzeAgentToReportAgent);
    const elPathReportAgentToEnd = document.getElementById(pathReportAgentToEnd);
    const elShapeReportIcon = document.getElementById(shapeReportIcon);

    const kfConnector = {
      stroke: [BORDER_COLOR, PRIMARY_COLOR],
      offset: [0, 1],
      easing: 'steps(2, jump-none)',
    };

    const kfConnectorArrow = {
      ...kfConnector,
      markerEnd: [`url(#${markerArrow})`, `url(#${markerArrowColored})`],
    };

    const kfConnectorDot = {
      ...kfConnector,
      markerStart: [`url(#${markerDot})`, `url(#${markerDotColored})`],
    };

    const kfConnectorDotArrow = {
      ...kfConnectorDot,
      ...kfConnectorArrow,
    };

    const kfBreathingFilter = {
      filter: ['none', `url(#${filterGlowBlurBreathing})`],
      easing: 'steps(2, jump-none)',
    };

    const kfConditionIconFilter = {
      transform: ['scaleX(1)', 'scaleX(-1)', 'scale(1)'],
      easing: 'ease-in-out',
    };

    const kfAgentIconColor = {
      filter: ['none', `url(#${filterRecolorPrimaryGradient})`],
      easing: 'steps(2, jump-none)',
    };

    const kfAgentTextColor = {
      color: [DISABLED_COLOR, SECONDARY_COLOR],
      easing: 'steps(2, jump-none)',
    };

    const kfReportIcon = {
      filter: ['none', `url(#${filterRecolorPrimaryGradient})`],
      strokeDashoffset: ['0%', '240%'],
      easing: 'ease-in-out',
    };

    const duration = 3000;
    const endDelay = 1000;

    const animGroup = new SerialAnimationGroup([
      new SerialAnimationGroup([
        new ParallelAnimationGroup([
          {
            element: elPathStartToSearchAgent,
            keyframes: kfConnectorDot,
          },
          {
            element: elShapeSearchAgent,
            keyframes: kfBreathingFilter,
          },
          {
            element: elShapeSearchAgentIcon,
            keyframes: kfAgentIconColor,
          },
          {
            element: elShapeSearchAgentText,
            keyframes: kfAgentTextColor,
          },
        ], { id: 'ToSearchAgent', duration }),
        {
          element: elPathSearchAgentToCondition,
          keyframes: kfConnectorDot,
          duration,
        },
        {
          element: elShapeConditionIcon,
          keyframes: kfConditionIconFilter,
          duration: 500,
          delay: endDelay,
        },
        new ParallelAnimationGroup([
          {
            element: elPathConditionToAnalyzeAgent,
            keyframes: kfConnectorDot,
          },
          {
            element: elShapeAnalyzeAgentText,
            keyframes: kfAgentTextColor,
          },
          {
            element: elShapeAnalyzeAgent,
            keyframes: kfBreathingFilter,
          },
          {
            element: elShapeAnalyzeAgentIcon,
            keyframes: kfAgentIconColor,
          },
        ], { id: 'ToAnalyzerAgent', duration, endDelay }),
        new ParallelAnimationGroup([
          {
            element: elPathAnalyzeAgentToReportAgent,
            keyframes: kfConnectorDot,
          },
          {
            element: elShapeReportAgent,
            keyframes: kfBreathingFilter,
          },
          {
            element: elShapeReportAgentIcon,
            keyframes: kfAgentIconColor,
          },
          {
            element: elShapeReportAgentText,
            keyframes: kfAgentTextColor,
          },
        ], { id: 'ToReportAgent', duration, endDelay }),
        new ParallelAnimationGroup([
          {
            element: elPathReportAgentToEnd,
            keyframes: kfConnectorDotArrow,
          },
          {
            element: elShapeReportIcon,
            keyframes: kfReportIcon,
            delay: duration / 2,
            duration,
            endDelay,
          },
        ], { id: 'ToEnd', duration }),
      ], { id: 'MiddleRoute', fill: 'none', endDelay }),

      new SerialAnimationGroup([
        new ParallelAnimationGroup([
          {
            element: elPathStartToSearchAgent,
            keyframes: kfConnectorDot,
          },
          {
            element: elShapeSearchAgent,
            keyframes: kfBreathingFilter,
          },
          {
            element: elShapeSearchAgentIcon,
            keyframes: kfAgentIconColor,
          },
          {
            element: elShapeSearchAgentText,
            keyframes: kfAgentTextColor,
          },
        ], { id: 'toSearchAgent', duration }),
        {
          element: elPathSearchAgentToCondition,
          keyframes: kfConnectorDot,
          duration,
        },
        {
          element: elShapeConditionIcon,
          keyframes: kfConditionIconFilter,
          duration: 500,
          delay: endDelay,
        },
        {
          element: elPathConditionToHttp,
          keyframes: kfConnectorDot,
          id: 'ToHttp',
        },
        {
          element: elPathHttpToCode,
          keyframes: kfConnector,
          id: 'ToCode',
        },
        new ParallelAnimationGroup([
          {
            element: elPathCodeToEnd,
            keyframes: kfConnectorArrow,
          },
          {
            element: elShapeReportIcon,
            keyframes: kfReportIcon,
            delay: duration / 2,
            duration,
            endDelay,
          },
        ]),
      ], { id: 'TopRoute', fill: 'none', duration, endDelay }),
    ], { iterations: Infinity, duration });

    animGroup.play();

    return () => {
      animGroup.cancel();
    };
  }, []);

  return (
    <div
      className={cn('ragflow-animation-root', className)}
      {...restProps}
    >
      <svg
        className="block size-full"
        viewBox="-490 -250 910 525"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      >
        <defs>
          <rect
            id={shapeBox}
            x="-50" y="-50"
            width="100" height="100"
            rx="6" ry="6"
          />

          <rect
            id={shapeRectangle}
            x="-80" y="-30"
            width="160" height="60"
            rx="6" ry="6"
          />

          <circle
            id={shapeDot}
            cx="0" cy="0" r="5"
          />

          <pattern id={patternDotGrid}
            x="0" y="20"
            width="20" height="20"
            viewBox="-50 -50 100 100"
            patternUnits="userSpaceOnUse"
            preserveAspectRatio="xMidYMid meet"
          >
            <circle cx="0" cy="0" r="7" fill="var(--ragflow-border-component)" />
          </pattern>

          <marker id={markerDot}
            viewBox="-5 -5 10 10"
            markerUnits="userSpaceOnUse"
            markerWidth="4" markerHeight="4"
            orient="auto-start-reverse"
          >
            <use
              href={`#${shapeDot}`}
              fill={DISABLED_COLOR}
            />
          </marker>

          <marker id={markerDotColored}
            viewBox="-5 -5 10 10"
            markerUnits="userSpaceOnUse"
            markerWidth="8" markerHeight="8"
            orient="auto-start-reverse"
          >
            <use href={`#${shapeDot}`}
              fill={PRIMARY_COLOR}
            />
          </marker>

          <path id={shapeArrow}
            d="M-5 -5 l10 5 l-10 5 z"
          />

          <marker id={markerArrow}
            viewBox="-5 -5 10 10"
            markerUnits="userSpaceOnUse"
            markerWidth="4" markerHeight="4"
            orient="auto-start-reverse"
          >
            <use href={`#${shapeArrow}`}
              fill={DISABLED_COLOR}
            />
          </marker>

          <marker id={markerArrowColored}
            viewBox="-5 -5 10 10"
            markerUnits="userSpaceOnUse"
            markerWidth="8" markerHeight="8"
            orient="auto-start-reverse"
          >
            <use href={`#${shapeArrow}`}
              fill={PRIMARY_COLOR}
            />
          </marker>

          <SvgSpotlightFilter id={filterSpotlight}
            lightingColor="rgb(47 236 168)"
            x="0" y="-95" z="100"
            pointsAtX="0" pointsAtY="-100" pointsAtZ="0"
            limitingConeAngle="20"
            stdDeviation="16"
            animateSpotlight={(
              <animate
                attributeName="z"
                values="60;90;60"
                dur="5"
                repeatCount="indefinite"
                calcMode="spline"
                keyTimes="0;0.5;1"
                keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
              />
            )}
          />

          <SvgRecolorLinearGradientFilter id={filterRecolorPrimaryGradient} to="bottom">
            <stop offset="0" stopColor="rgb(var(--ragflow-color-primary))" />
            <stop offset="1" stopColor="#01c48d" />
          </SvgRecolorLinearGradientFilter>

          <SvgRecolorLinearGradientFilter id={filterRecolorGreyGradient} to="bottom">
            <stop offset="0" stopColor="white" />
            <stop offset="1" stopColor="#666" />
          </SvgRecolorLinearGradientFilter>

          <SvgBreathingGlowFilter id={filterGlowBlurBreathing} to="bottom-right" />
        </defs>

        {/* Nodes */}
        <g>
          {/* Start */}
          <g transform="translate(-450, 0)">
            <use
              href={`#${shapeBox}`}
              fill="rgb(var(--ragflow-bg-standard))"
              stroke="var(--ragflow-border-component)"
              strokeWidth="var(--ragflow-global-border-width)"
              transform="scale(.5)"
            />

            <SvgForeignIcon
              icon="LucideHousePlus"
              size={24}
              filter={`url(#${filterRecolorGreyGradient})`}
            />
          </g>

          {/* Search agent */}
          <g transform="translate(-300, 0)">
            <g id={shapeSearchAgent}>
              <use href={`#${shapeRectangle}`}
                fill="rgb(var(--ragflow-bg-standard))"
                stroke="var(--ragflow-border-component)"
                strokeWidth="var(--ragflow-global-border-width)"
              />
            </g>

            <g className="text-disabled">
              <SvgForeignIcon
                id={shapeSearchAgentIcon}
                icon="RagAiAgent"
                size={32}
                x="-68"
              />

              <text
                id={shapeSearchAgentText}
                className="text-sm"
                x="-32" y="5"
              >
                Search agent
              </text>
            </g>
          </g>

          {/* Web search */}
          <g transform="translate(-300, 100)">
            <use href={`#${shapeBox}`}
              fill="rgb(var(--ragflow-bg-standard))"
              stroke="var(--ragflow-border-component)"
              strokeWidth="var(--ragflow-global-border-width)"
              transform="scale(1, .6)"
            />

            <SvgForeignIcon
              size={24}
              y="-22"
              filter={`url(#${filterRecolorGreyGradient})`}
            >
              <div className="relative size-[24px]">
                <Icon className="block m-0 size-[24px]" icon="LucideMonitor" />
                <Icon className="block m-0 absolute top-[5px] left-1/2 size-[10px] -translate-x-1/2 stroke-[3]" icon="LucideSearch" />
              </div>
            </SvgForeignIcon>

            <text
              className="text-sm text-disabled"
              y="22"
              textAnchor="middle"
            >
              Web search
            </text>
          </g>

          {/* Condition */}
          <g transform="translate(-130, 0)">
            <use href={`#${shapeBox}`}
              fill="rgb(var(--ragflow-bg-standard))"
              stroke="var(--ragflow-border-component)"
              strokeWidth="var(--ragflow-global-border-width)"
              transform="scale(1, .75)"
            />

            <SvgForeignIcon
              id={shapeConditionIcon}
              icon="LucideSplit"
              size={24}
              y="-22"
              filter={`url(#${filterRecolorGreyGradient})`}
            >
            </SvgForeignIcon>

            <text
              className="text-sm text-disabled"
              y="22"
              textAnchor="middle"
            >
              Condition
            </text>
          </g>

          {/* HTTP */}
          <g transform="translate(20, -150)">
            <use href={`#${shapeBox}`}
              filter={`url(#${filterSpotlight})`}
              fill="rgb(var(--ragflow-bg-standard))"
              stroke="var(--ragflow-border-component)"
              strokeWidth="var(--ragflow-global-border-width)"
              transform="scale(.6, .65)"
            />

            <SvgForeignIcon
              icon="RagHTTP"
              size={24}
              y="-22"
              filter={`url(#${filterRecolorGreyGradient})`}
            />

            <text
              className="text-sm text-disabled"
              y="22"
              textAnchor="middle"
            >
              HTTP
            </text>
          </g>

          {/* Code */}
          <g transform="translate(130, -150)">
            <use href={`#${shapeBox}`}
              filter={`url(#${filterSpotlight})`}
              fill="rgb(var(--ragflow-bg-standard))"
              stroke="var(--ragflow-border-component)"
              strokeWidth="var(--ragflow-global-border-width)"
              transform="scale(.6, .65)"
            />

            <SvgForeignIcon
              icon="LucideCodeXml"
              size={24}
              y="-22"
              filter={`url(#${filterRecolorGreyGradient})`}
            />

            <text
              className="text-sm text-disabled"
              y="22"
              textAnchor="middle"
            >
              Code
            </text>
          </g>

          {/* End (Report) */}
          <g transform="translate(280, -150)">
            <g>
              <use href={`#${shapeBox}`}
                fill="rgb(var(--ragflow-bg-standard))"
                stroke="var(--ragflow-border-component)"
                strokeWidth="var(--ragflow-global-border-width)"
                transform="scale(1, 1.2)"
              />
            </g>

            <SvgForeignIcon
              iconClassName="text-disabled"
              iconId={shapeReportIcon}
              icon="LucideChartNoAxesCombined"
              strokeDasharray="120% 120%"
              size={64}
              y="-44"
            />

            <text
              className="text-sm text-disabled"
              y="38"
              textAnchor="middle"
            >
              Report
            </text>
          </g>

          {/* Analyze agent */}
          <g transform="translate(70, 0)">
            <g id={shapeAnalyzeAgent}>
              <use href={`#${shapeRectangle}`}
                fill="rgb(var(--ragflow-bg-standard))"
                stroke="var(--ragflow-border-component)"
                strokeWidth="var(--ragflow-global-border-width)"
              />
            </g>

            <g className="text-disabled">
              <SvgForeignIcon
                id={shapeAnalyzeAgentIcon}
                icon="RagAiAgent"
                size={32}
                x="-68"
              />

              <text
                id={shapeAnalyzeAgentText}
                className="text-sm"
                x="-32" y="5"
              >
                Analyze agent
              </text>
            </g>
          </g>

          {/* MCP */}
          <g transform="translate(30, 100)">
            <use href={`#${shapeBox}`}
              filter={`url(#${filterSpotlight})`}
              fill="rgb(var(--ragflow-bg-standard))"
              stroke="var(--ragflow-border-component)"
              strokeWidth="var(--ragflow-global-border-width)"
              transform="scale(.6, .65)"
            />

            <SvgForeignIcon
              icon="SiModelcontextprotocol"
              size={24}
              y="-22"
              filter={`url(#${filterRecolorGreyGradient})`}
            />

            <text
              className="text-sm text-disabled"
              y="22"
              textAnchor="middle"
            >
              MCP
            </text>
          </g>

          {/* Subagent */}
          <g transform="translate(130, 100)">
            <use href={`#${shapeBox}`}
              fill="rgb(var(--ragflow-bg-standard))"
              stroke="var(--ragflow-border-component)"
              strokeWidth="var(--ragflow-global-border-width)"
              transform="scale(.9, .65)"
            />

            <SvgForeignIcon
              icon="RagAiAgent"
              size={24}
              y="-22"
              filter={`url(#${filterRecolorGreyGradient})`}
            />

            <text
              className="text-sm text-disabled"
              y="22"
              textAnchor="middle"
            >
              Subagent
            </text>
          </g>

          {/* Retrieval */}
          <g transform="translate(130, 200)">
            <use href={`#${shapeBox}`}
              filter={`url(#${filterSpotlight})`}
              fill="rgb(var(--ragflow-bg-standard))"
              stroke="var(--ragflow-border-component)"
              strokeWidth="var(--ragflow-global-border-width)"
              transform="scale(.9, .65)"
            />

            <SvgForeignIcon
              icon="LucideFolderSearch"
              size={24}
              y="-22"
              filter={`url(#${filterRecolorGreyGradient})`}
            />

            <text
              className="text-sm text-disabled"
              y="22"
              textAnchor="middle"
            >
              Retrieval
            </text>
          </g>

          {/* Report agent */}
          <g transform="translate(280, 0)">
            <g id={shapeReportAgent}>
              <use href={`#${shapeRectangle}`}
                fill="rgb(var(--ragflow-bg-standard))"
                stroke="var(--ragflow-border-component)"
                strokeWidth="var(--ragflow-global-border-width)"
              />
            </g>

            <g className="text-disabled">
              <SvgForeignIcon
                id={shapeReportAgentIcon}
                icon="RagAiAgent"
                size={32}
                x="-68"
              />

              <text
                id={shapeReportAgentText}
                className="text-sm"
                x="-32" y="5"
              >
                Report agent
              </text>
            </g>
          </g>
        </g>

        {/* Connectors */}
        <g
          stroke="var(--ragflow-border-standard)"
          strokeWidth="1"
        >
          {/* Start -> Search agent */}
          <path
            id={pathStartToSearchAgent}
            d="M-425 0 v0.01 h45"
            markerStart={`url(#${markerDot})`}
          />

          {/* Tavily -> Search agent */}
          <path
            d="M-300 70 h0.01 v-40"
          />

          {/* Search agent -> Condition */}
          <path
            id={pathSearchAgentToCondition}
            d="M-220 0 v0.01 h40"
            markerStart={`url(#${markerDot})`}
          />

          {/* Condition -> HTTP */}
          <path
            id={pathConditionToHttp}
            d="M-80 -20 h25 a10 10 0 0 0 10 -10 v-110 a10 10 0 0 1 10 -10 h25"
            markerStart={`url(#${markerDot})`}
            strokeDasharray={DASH_ARRAY}
          />

          {/* HTTP -> Code */}
          <path
            id={pathHttpToCode}
            d="M50 -150 v0.01 h50"
            strokeDasharray={DASH_ARRAY}
          />

          {/* Code -> End (Report) */}
          <path
            id={pathCodeToEnd}
            d="M160 -150 h15 a10 10 0 0 0 10 -10 v-20 a10 10 0 0 1 10 -10 h35"
            markerEnd={`url(#${markerArrow})`}
            strokeDasharray={DASH_ARRAY}
          />

          {/* Condition -> Analyze agent */}
          <path
            id={pathConditionToAnalyzeAgent}
            d="M-80 0 v0.01 h70"
            markerStart={`url(#${markerDot})`}
          />

          {/* MCP -> Analyze agent */}
          <path
            d="M30 67 h0.01 v-37"
          />

          {/* Retrieval -> Subagent */}
          <path
            d="M130 167 h0.01 v-34"
          />

          {/* Subagent -> Analyze agent */}
          <path
            d="M130 67 h0.01 v-37"
          />

          {/* Analyze agent -> Report agent */}
          <path
            id={pathAnalyzeAgentToReportAgent}
            d="M150 0 v0.01 h50"
            markerStart={`url(#${markerDot})`}
          />

          {/* Report agent -> End (Report) */}
          <path
            id={pathReportAgentToEnd}
            d="M360 0 h30 a10 10 0 0 0 10 -10 v-170 a10 10 0 0 0 -10 -10 h-60"
            markerStart={`url(#${markerDot})`}
            markerEnd={`url(#${markerArrow})`}
          />
        </g>
      </svg>
    </div>
  );
}
