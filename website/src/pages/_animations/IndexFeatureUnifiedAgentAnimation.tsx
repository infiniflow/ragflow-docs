import { useId } from "react";

import Icon from "@site/src/components/Icon";
import { cn } from "@site/src/utils/twUtils";

import SvgBreathingGlowFilter from "@site/src/utils/visual-effects/SvgBreathingGlowFilter";
import SvgRecolorLinearGradientFilter from "@site/src/utils/visual-effects/SvgRecolorLinearGradientFilter";

import SvgSpotlightFilter from "@site/src/utils/visual-effects/SvgSpotlightFilter";
import SvgLinearGradient from "@site/src/utils/visual-effects/SvgLinearGradient";
import SvgGlowFilter from "@site/src/utils/visual-effects/SvgGlowFilter";
import SvgForeignIcon from "@site/src/utils/visual-effects/SvgForeignIcon";

import AiModelsIcon from "@site/src/assets/svg/aimodels.svg";

import {
  DASH_ARRAY,
  DASH_OFFSET_DURATION,
  DASH_PULSE_ARRAY,
  DASH_PULSE_OFFSET_DURATION,
} from "./constants";

export default function IndexFeatureUnifiedAgentAnimation({ className, ...restProps }: React.HTMLAttributes<HTMLDivElement>) {
  const id = useId();

  const shapeBox = `${id}ShapeSecondaryBox`;
  const shapeStar = `${id}ShapeStar`;

  const gradientConnectorFadeLeft = `${id}GradientConnector`;
  const gradientConnectorFadeRight = `${id}GradientConnectorReversed`;
  const gradientConnectorFadeBottom = `${id}GradientConnectorFadeBottom`;

  const filterPrimaryGradient = `${id}FilterPrimaryGradient`;
  const filterGreyGradient = `${id}FilterGreyGradient`;
  const filterGlow = `${id}FilterGlow`;
  const filterHardGlow = `${id}FilterHardGlow`;
  const filterGlowBlurBreathing = `${id}FilterGlowBlurBreathing`;
  const filterTopSpotlight = `${id}FilterTopSpotlight`;

  const mpathMcp = `${id}MpathMcp`;
  const mpathIngestionPipeline = `${id}MpathIngestionPipeline`;
  const mpathModels = `${id}MpathModels`;
  const mpathRetrieval = `${id}MpathRetrieval`;
  const mpathDataset = `${id}MpathDataset`;
  const mpathWebSearch = `${id}MpathWebSearch`;
  const mpathChat = `${id}MpathChat`;

  const animPulse = `${id}AnimPulse`;

  return (
    <div
      className={cn('ragflow-animation-root', className)}
      {...restProps}
    >
      <svg
        className="block size-full"
        viewBox="-300 -140 600 310"
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
            fill="rgb(var(--ragflow-bg-standard))"
            stroke="var(--ragflow-border-component)"
            strokeWidth="var(--ragflow-global-border-width)"
            vectorEffect="non-scaling-stroke"
          />

          <path id={shapeStar}
            d="M-8 0 q12 2 11 -11 q-2 12 11 11 q-12 -2 -11 11 q2 -12 -11 -11z"
            filter={`url(#${filterGlow})`}
          />

          <path
            id={mpathMcp}
            d="M0 -25 h-130 a10 10 0 0 1 -10 -10 v-55 a10 10 0 0 0 -10 -10 h-125"
          />

          <path
            id={mpathIngestionPipeline}
            d="M0 0 h-200 v0.01"
          />

          <path
            id={mpathModels}
            d="M0 40h-100a10 10 0 0 0 -10 10v70a10 10 0 0 1 -10 10h-80"
          />

          <path
            id={mpathRetrieval}
            d="M0 0 v120 a10 10 0 0 0 10 10 h0.01"
          />

          <path
            id={mpathDataset}
            d="M0 35 h110 a10 10 0 0 1 10 10 v75 a10 10 0 0 0 10 10 h100"
          />

          <path
            id={mpathWebSearch}
            d="M0 -10 h240 v0.01"
          />

          <path
            id={mpathChat}
            d="M30 0v-60a10 10 0 0 1 10 -10 h90a10 10 0 0 0 10 -10v-10a10 10 0 0 1 10 -10h60"
          />

          <SvgLinearGradient id={gradientConnectorFadeLeft} to="left">
            <stop stopColor="rgb(var(--ragflow-color-primary))" />
            <stop offset=".75" stopColor="rgb(var(--ragflow-color-primary) / 0.5)" />
            <stop offset="1" stopColor="transparent" />
          </SvgLinearGradient>

          <SvgLinearGradient id={gradientConnectorFadeRight} to="right">
            <stop stopColor="rgb(var(--ragflow-color-primary))" />
            <stop offset=".75" stopColor="rgb(var(--ragflow-color-primary) / 0.5)" />
            <stop offset="1" stopColor="transparent" />
          </SvgLinearGradient>

          <SvgLinearGradient id={gradientConnectorFadeBottom} to="bottom">
            <stop stopColor="rgb(var(--ragflow-color-primary))" />
            <stop offset=".5" stopColor="rgb(var(--ragflow-color-primary) / 0.5)" />
            <stop offset="1" stopColor="transparent" />
          </SvgLinearGradient>

          <SvgRecolorLinearGradientFilter id={filterPrimaryGradient} to="bottom">
            <stop stopColor="rgb(var(--ragflow-color-primary))" />
            <stop offset="1" stopColor="#01c48d" />
          </SvgRecolorLinearGradientFilter>

          <SvgRecolorLinearGradientFilter id={filterGreyGradient} to="bottom">
            <stop offset="0" stopColor="white" />
            <stop offset="1" stopColor="#666" />
          </SvgRecolorLinearGradientFilter>

          <SvgSpotlightFilter id={filterTopSpotlight}
            lightingColor="rgb(47 236 168)"
            x="0" y="-80" z="200"
            pointsAtX="0" pointsAtY="-85" pointsAtZ="0"
            limitingConeAngle="15"
            stdDeviation="10"
            animateSpotlight={(
              <animate
                attributeName="z"
                values="150;170;150"
                dur="5s"
                repeatCount="indefinite"
                calcMode="spline"
                keyTimes="0;0.5;1"
                keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
              />
            )}
          />

          <SvgGlowFilter id={filterGlow} />
          <SvgGlowFilter id={filterHardGlow}
            extrude="2"
            colorMatrix="
              0 0 0 0 1
              0 0 0 0 1
              0 0 0 0 1
              0 0 0 1 0"
          />

          <SvgBreathingGlowFilter id={filterGlowBlurBreathing} />
        </defs>

        {/* Connectors */}
        <g strokeWidth="1">
          <use href={`#${mpathMcp}`}
            stroke={`url(#${gradientConnectorFadeLeft})`}
          />

          <use href={`#${mpathIngestionPipeline}`}
            stroke={`url(#${gradientConnectorFadeLeft})`}
            strokeDasharray={DASH_ARRAY}
          >
            <animate
              attributeName="stroke-dashoffset"
              values="100%;0%"
              dur={DASH_OFFSET_DURATION}
              repeatCount="indefinite"
            />
          </use>

          <use href={`#${mpathModels}`}
            stroke={`url(#${gradientConnectorFadeLeft})`}
          />

          <use href={`#${mpathRetrieval}`}
            stroke={`url(#${gradientConnectorFadeBottom})`}
          />

          <use href={`#${mpathDataset}`}
            stroke={`url(#${gradientConnectorFadeRight})`}
          />

          <use href={`#${mpathWebSearch}`}
            stroke={`url(#${gradientConnectorFadeRight})`}
            strokeDasharray={DASH_ARRAY}
          >
            <animate
              attributeName="stroke-dashoffset"
              values="100%;0%"
              dur={DASH_OFFSET_DURATION}
              repeatCount="indefinite"
            />
          </use>

          <use href={`#${mpathChat}`}
            stroke={`url(#${gradientConnectorFadeRight})`}
          />
        </g>

        {/* Animating objects */}
        <g>
          <g
            strokeDasharray={DASH_PULSE_ARRAY}
            strokeDashoffset="100%"
            filter={`url(#${filterHardGlow})`}
          >
            <use href={`#${mpathRetrieval}`}
              stroke={`url(#${gradientConnectorFadeBottom})`}
            >
              <animate
                id={animPulse}
                attributeName="stroke-dashoffset"
                values="100%; 0%"
                dur={DASH_PULSE_OFFSET_DURATION}
                begin={`0;${animPulse}.end+5`}
              />
            </use>

            <use href={`#${mpathMcp}`}
              stroke={`url(#${gradientConnectorFadeLeft})`}
            >
              <animate
                attributeName="stroke-dashoffset"
                values="100%; 0%"
                dur={DASH_PULSE_OFFSET_DURATION}
                begin={`${animPulse}.begin+.3`}
              />
            </use>

            <use href={`#${mpathIngestionPipeline}`}
              stroke={`url(#${gradientConnectorFadeLeft})`}
            >
              <animate
                attributeName="stroke-dashoffset"
                values="100%; 0%"
                dur={DASH_PULSE_OFFSET_DURATION}
                begin={`${animPulse}.begin`}
              />
            </use>

            <use href={`#${mpathModels}`}
              stroke={`url(#${gradientConnectorFadeLeft})`}
            >
              <animate
                attributeName="stroke-dashoffset"
                values="100%; 0%"
                dur={DASH_PULSE_OFFSET_DURATION}
                begin={`${animPulse}.begin+.2`}
              />
            </use>

            <use href={`#${mpathDataset}`}
              stroke={`url(#${gradientConnectorFadeRight})`}
            >
              <animate
                attributeName="stroke-dashoffset"
                values="100%; 0%"
                dur={DASH_PULSE_OFFSET_DURATION}
                begin={`${animPulse}.begin+.35`}
              />
            </use>

            <use href={`#${mpathWebSearch}`}
              stroke={`url(#${gradientConnectorFadeRight})`}
            >
              <animate
                attributeName="stroke-dashoffset"
                values="100%; 0%"
                dur={DASH_PULSE_OFFSET_DURATION}
                begin={`${animPulse}.begin+.1`}
              />
            </use>

            <use href={`#${mpathChat}`}
              stroke={`url(#${gradientConnectorFadeRight})`}
            >
              <animate
                attributeName="stroke-dashoffset"
                values="100%; 0%"
                dur={DASH_PULSE_OFFSET_DURATION}
                begin={`${animPulse}.begin+.22`}
              />
            </use>
          </g>
        </g>

        {/* Core agent */}
        <g>
          <g filter={`url(#${filterGlowBlurBreathing})`}>
            <use href={`#${shapeBox}`} />
          </g>

          <SvgForeignIcon
            icon="RagAiAgent"
            size={64}
            x="-32" y="-32"
            filter={`url(#${filterPrimaryGradient})`}
          />
        </g>

        {/* Tools */}
        <g>
          <g transform="translate(-270, -100)">
            <g filter={`url(#${filterTopSpotlight})`}>
              <use
                href={`#${shapeBox}`}
                transform="scale(.6)"
              />
            </g>

            <foreignObject
              width="28" height="28"
              filter={`url(#${filterGreyGradient})`}
              transform="translate(-12, -20)"
            >
              <Icon className="size-[24px]" icon="SiModelcontextprotocol" />
            </foreignObject>

            <text
              className="text-xs text-disabled"
              y="18"
              textAnchor="middle"
            >
              MCP
            </text>
          </g>

          <g transform="translate(-230, 0)">
            <g filter={`url(#${filterTopSpotlight})`}>
              <use
                href={`#${shapeBox}`}
                transform="scale(1.22, .6)"
              />
            </g>

            <foreignObject
              width="28" height="28"
              filter={`url(#${filterGreyGradient})`}
              transform="translate(-12, -20)"
            >
              <Icon className="size-[24px]" icon="LucideRoute" />
            </foreignObject>

            <text
              className="text-xs text-disabled"
              y="18"
              textAnchor="middle"
            >
              Ingestion pipeline
            </text>
          </g>

          <g transform="translate(-200, 130)">
            <g filter={`url(#${filterTopSpotlight})`}>
              <use
                href={`#${shapeBox}`}
                transform="scale(.6, .6)"
              />
            </g>

            <foreignObject
              width="28" height="28"
              filter={`url(#${filterGreyGradient})`}
              transform="translate(-12, -20)"
            >
              <AiModelsIcon className="size-[24px]" />
            </foreignObject>

            <text
              className="text-xs text-disabled"
              y="20"
              textAnchor="middle"
            >
              Models
            </text>
          </g>

          <g transform="translate(0, 130)">
            <g filter={`url(#${filterTopSpotlight})`}>
              <use
                href={`#${shapeBox}`}
                transform="scale(.7, .6)"
              />
            </g>

            <foreignObject
              width="28" height="28"
              filter={`url(#${filterGreyGradient})`}
              transform="translate(-12, -20)"
            >
              <Icon className="size-[24px]" icon="LucideFolderSearch" />
            </foreignObject>

            <text
              className="text-xs text-disabled"
              y="20"
              textAnchor="middle"
            >
              Retrieval
            </text>
          </g>

          <g transform="translate(220, 120)">
            <g filter={`url(#${filterTopSpotlight})`}>
              <use
                href={`#${shapeBox}`}
                transform="scale(.6, .6)"
              />
            </g>

            <foreignObject
              width="28" height="28"
              filter={`url(#${filterGreyGradient})`}
              transform="translate(-12, -20)"
            >
              <Icon className="size-[24px]" icon="LucideDatabaseZap" />
            </foreignObject>

            <text
              className="text-xs text-disabled"
              y="20"
              textAnchor="middle"
            >
              Dataset
            </text>
          </g>

          <g transform="translate(240, -10)">
            <g filter={`url(#${filterTopSpotlight})`}>
              <use
                href={`#${shapeBox}`}
                transform="scale(.85, .6)"
              />
            </g>

            <foreignObject
              width="28" height="28"
              filter={`url(#${filterGreyGradient})`}
              transform="translate(-12, -20)"
            >
              <div className="relative size-[24px]">
                <Icon className="block m-0 size-[24px]" icon="LucideMonitor" />
                <Icon className="block m-0 absolute top-[5px] left-1/2 size-[10px] -translate-x-1/2 stroke-[3]" icon="LucideSearch" />
              </div>
            </foreignObject>

            <text
              className="text-xs text-disabled"
              y="20"
              textAnchor="middle"
            >
              Web search
            </text>
          </g>

          <g transform="translate(210, -100)">
            <g filter={`url(#${filterTopSpotlight})`}>
              <use
                href={`#${shapeBox}`}
                transform="scale(.6, .6)"
              />
            </g>

            <foreignObject
              width="28" height="28"
              filter={`url(#${filterGreyGradient})`}
              transform="translate(-12, -20)"
            >
              <Icon className="size-[24px]" icon="LucideMessagesSquare" />
            </foreignObject>

            <text
              className="text-xs text-disabled"
              y="20"
              textAnchor="middle"
            >
              Chat
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}