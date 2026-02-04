import { cn } from "@site/src/utils/twUtils";

import { useId } from "react";
import { BG_STANDARD, BORDER_COLOR, BORDER_WIDTH, DISABLED_COLOR, PRIMARY_COLOR } from "./constants";
import SvgRecolorLinearGradientFilter from "@site/src/utils/visual-effects/SvgRecolorLinearGradientFilter";
import SvgBreathingGlowFilter from "@site/src/utils/visual-effects/SvgBreathingGlowFilter";
import SvgForeignIcon from "@site/src/utils/visual-effects/SvgForeignIcon";
import SvgSpotlightFilter from "@site/src/utils/visual-effects/SvgSpotlightFilter";

export default function IndexSolutionManufacturingMaintenanceSupportAnimation({ className, ...restProps }: React.HTMLAttributes<HTMLDivElement>) {
  const id = useId();

  const shapeDot = `${id}ShapeDot`;
  const shapeArrow = `${id}ShapeArrow`;
  const markerDot = `${id}MarkerDot`;
  const markerArrow = `${id}MarkerArrow`;
  const markerDotColored = `${id}MarkerDotColored`;
  const markerArrowColored = `${id}MarkerArrowColored`;

  const filterGlowBlurBreathing = `${id}FilterGlowBlurBreathing`;
  const filterRecolorPrimaryGradient = `${id}FilterRecolorPrimaryGradient`;
  const filterRecolorGreyGradient = `${id}FilterRecolorGreyGradient`;
  const filterSpotlight = `${id}FilterSpotlight`;

  return (
    <div
      className={cn('ragflow-animation-root', className)}
      {...restProps}
    >
      <svg
        className="block size-full text-sm"
        viewBox="-480 -250 900 500"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      >
        <defs>
          <circle
            id={shapeDot}
            cx="0" cy="0" r="5"
          />

          <path id={shapeArrow}
            d="M-5 -5 l10 5 l-10 5 z"
          />

          <marker id={markerDot}
            viewBox="-5 -5 10 10"
            markerUnits="userSpaceOnUse"
            markerWidth="4" markerHeight="4"
            orient="auto-start-reverse"
          >
            <use href={`#${shapeDot}`} fill={DISABLED_COLOR} />
          </marker>

          <marker id={markerDotColored}
            viewBox="-5 -5 10 10"
            markerUnits="userSpaceOnUse"
            markerWidth="8" markerHeight="8"
            orient="auto-start-reverse"
          >
            <use href={`#${shapeDot}`} fill={PRIMARY_COLOR} />
          </marker>

          <marker id={markerArrow}
            viewBox="-5 -5 10 10"
            markerUnits="userSpaceOnUse"
            markerWidth="4" markerHeight="4"
            orient="auto-start-reverse"
          >
            <use href={`#${shapeArrow}`} fill={DISABLED_COLOR} />
          </marker>

          <marker id={markerArrowColored}
            viewBox="-5 -5 10 10"
            markerUnits="userSpaceOnUse"
            markerWidth="8" markerHeight="8"
            orient="auto-start-reverse"
          >
            <use href={`#${shapeArrow}`} fill={PRIMARY_COLOR} />
          </marker>

          <SvgRecolorLinearGradientFilter id={filterRecolorPrimaryGradient} to="bottom">
            <stop offset="0" stopColor="rgb(var(--ragflow-color-primary))" />
            <stop offset="1" stopColor="#01c48d" />
          </SvgRecolorLinearGradientFilter>

          <SvgRecolorLinearGradientFilter id={filterRecolorGreyGradient} to="bottom">
            <stop offset="0" stopColor="white" />
            <stop offset="1" stopColor="#666" />
          </SvgRecolorLinearGradientFilter>

          <SvgBreathingGlowFilter id={filterGlowBlurBreathing} to="bottom-right" />

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
        </defs>

        {/* Nodes */}
        <g>
          {/* Start */}
          <g transform="translate(-425, 0)">
            <rect
              x="-25" y="-25"
              rx="6" ry="6"
              width="50" height="50"
              fill={BG_STANDARD}
              stroke={BORDER_COLOR}
              strokeWidth={BORDER_WIDTH}
            />

            <SvgForeignIcon
              icon="LucideHousePlus"
              size={24}
              filter={`url(#${filterRecolorGreyGradient})`}
            />
          </g>

          {/* Clarify agent */}
          <g transform="translate(-310, 0)">
            <rect
              x="-55" y="-35"
              rx="6" ry="6"
              width="110" height="70"
              fill={BG_STANDARD}
              stroke={BORDER_COLOR}
              strokeWidth={BORDER_WIDTH}
            />

            <g className="text-disabled">
              <SvgForeignIcon
                icon="RagAiAgent"
                size={32}
                y="-24"
                filter={`url(#${filterRecolorGreyGradient})`}
              />

              <text
                y="12"
                textAnchor="middle"
                dominantBaseline="hanging"
              >
                Clarify agent
              </text>
            </g>
          </g>

          {/* Retrieval */}
          <g transform="translate(-185, 0)">
            <rect
              x="-32" y="-30"
              rx="6" ry="6"
              width="135" height="60"
              fill={BG_STANDARD}
              stroke={BORDER_COLOR}
              strokeWidth={BORDER_WIDTH}
            />

            <g className="text-disabled">
              <SvgForeignIcon
                icon="LucideFolderSearch"
                size={32}
                filter={`url(#${filterRecolorPrimaryGradient})`}
              />

              <text
                x="24"
                dominantBaseline="middle"
              >
                Retrieval
              </text>
            </g>
          </g>

          {/* HTTP */}
          <g transform="translate(0, -130)">
            <rect
              x="-30" y="-37"
              rx="6" ry="6"
              width="60" height="74"
              fill={BG_STANDARD}
              stroke={BORDER_COLOR}
              strokeWidth={BORDER_WIDTH}
              filter={`url(#${filterSpotlight})`}
            />

            <SvgForeignIcon
              icon="RagHTTP"
              size={24}
              y="-22"
              filter={`url(#${filterRecolorGreyGradient})`}
            />

            <text
              className="text-disabled"
              y="22"
              textAnchor="middle"
            >
              HTTP
            </text>
          </g>

          {/* Reference agent */}
          <g transform="translate(97, -130)">
            <rect
              x="-32" y="-30"
              rx="6" ry="6"
              width="190" height="60"
              fill={BG_STANDARD}
              stroke={BORDER_COLOR}
              strokeWidth={BORDER_WIDTH}
            />

            <g className="text-disabled">
              <SvgForeignIcon
                icon="RagAiAgent"
                size={32}
                filter={`url(#${filterRecolorPrimaryGradient})`}
              />

              <text
                x="24"
                dominantBaseline="middle"
              >
                Reference agent
              </text>
            </g>
          </g>

          {/* Instruct agent */}
          <g transform="translate(2, 130)">
            <rect
              x="-32" y="-30"
              rx="6" ry="6"
              width="175" height="60"
              fill={BG_STANDARD}
              stroke={BORDER_COLOR}
              strokeWidth={BORDER_WIDTH}
            />

            <g className="text-disabled">
              <SvgForeignIcon
                icon="RagAiAgent"
                size={32}
                filter={`url(#${filterRecolorPrimaryGradient})`}
              />

              <text
                x="24"
                dominantBaseline="middle"
              >
                Instruct agent
              </text>
            </g>
          </g>

          {/* Message (End) */}
          <g transform="translate(345, 0)">
            <rect
              x="-40" y="-30"
              rx="6" ry="6"
              width="80" height="60"
              fill={BG_STANDARD}
              stroke={BORDER_COLOR}
              strokeWidth={BORDER_WIDTH}
            />

            <g className="text-disabled text-sm">
              <SvgForeignIcon
                icon="LucideMessageSquareReply"
                size={24}
                y="-20"
                filter={`url(#${filterRecolorGreyGradient})`}
              />

              <text
                y="8"
                textAnchor="middle"
                dominantBaseline="hanging"
              >
                Message
              </text>
            </g>
          </g>
        </g>

        {/* Connectors */}
        <g
          stroke={BORDER_COLOR}
          strokeWidth="1"
        >
          {/* Start -> Clarify agent */}
          <path
            d="M-400 0 v.01 v-.01 h35"
            stroke={BORDER_COLOR}
            markerStart={`url(#${markerDot})`}
          />

          {/* Clarify agent -> Retrieval */}
          <path
            d="M-255 0 v.01 v-.01 h37"
            stroke={PRIMARY_COLOR}
            markerStart={`url(#${markerDotColored})`}
          />

          {/* Retrieval -> HTTP */}
          <path
            d="M-82 0 h12 a10 10 0 0 0 10 -10 v-110 a10 10 0 0 1 10 -10 h20"
            stroke={PRIMARY_COLOR}
            markerStart={`url(#${markerDotColored})`}
          />

          {/* HTTP -> Reference agent */}
          <path
            d="M30 -130 v.01 v-.01 h35"
            stroke={PRIMARY_COLOR}
            markerStart={`url(#${markerDotColored})`}
          />

          {/* Reference agent -> Message */}
          <path
            d="M255 -130 h20 a10 10 0 0 1 10 10 v110 a10 10 0 0 0 10 10 h10"
            stroke={PRIMARY_COLOR}
            markerStart={`url(#${markerDotColored})`}
            markerEnd={`url(#${markerArrowColored})`}
          />

          {/* Retrieval -> Instruct agent */}
          <path
            d="M-82 0 h12 a10 10 0 0 1 10 10 v110 a10 10 0 0 0 10 10 h20"
            stroke={PRIMARY_COLOR}
            markerStart={`url(#${markerDotColored})`}
          />

          {/* Instruct agent -> Message */}
          <path
            d="M145 130 h130 a10 10 0 0 0 10 -10 v-110 a10 10 0 0 1 10 -10 h10"
            stroke={PRIMARY_COLOR}
            markerStart={`url(#${markerDotColored})`}
            markerEnd={`url(#${markerArrowColored})`}
          />
        </g>
      </svg>
    </div>
  );
}