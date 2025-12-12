import { useId } from "react";

import { cn } from "@site/src/utils/twUtils";
import useLinearGradient from "@site/src/utils/useLinearGradient";
import Icon from "@site/src/components/Icon";

import SvgSpotlightFilter from "../_fx/SvgSpotlightFilter";
import SvgBreathingGlowFilter from "../_fx/SvgBreathingGlowFilter";
import SvgGlowFilter from "../_fx/SvgGlowFilter";
import SvgRecolorLinearGradientFilter from "../_fx/SvgRecolorLinearGradientFilter";
import {
  DASH_ARRAY,
  DASH_OFFSET_DURATION,
} from "./constants";

const COG_ROTATE_DURATION = 15;
const SIDE_STAR_MOTION_DURATION = 22;
const MIDDLE_STAR_MOTION_DURATION = 16;
const BALL_TO_DATASET_MOTION_DURATION = 9.5;
const BALL_FADE_OUT_DURATION = 7.5;
const DATASET_ZAP_DURATION = 4;

function IndexFeatureEtlAnimation({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const id = useId();

  const shapeBox = `${id}ShapeBox`;
  const shapeStar = `${id}ShapeStar`;
  const shapeDot = `${id}ShapeBall`;
  const filterGreyGradient = `${id}FilterGreyGradient`;
  const filterGlow = `${id}FilterGlow`;
  const filterGlowBlurBreathing = `${id}FilterGlowBlurBreathing`;
  const filterTopSpotlight = `${id}FilterTopSpotlight`;
  const filterDatasetZap = `${id}FilterDatasetZap`;
  const gradientGrey = `${id}GradientGrey`;
  const gradientCog = `${id}GradientCog`;
  const gradientBoxGlow = `${id}GradientBoxGlow`;
  const gradientConnector = `${id}GradientConnector`;
  const gradientConnectorReversed = `${id}GradientConnectorReversed`;
  const gradientConnectorVanishing = `${id}GradientConnectorVanishing`;
  const mpathImages = `${id}MpathImages`;
  const mpathDocuments = `${id}MpathDocuments`;
  const mpathDataSources = `${id}MpathDataSources`;
  const mpathDest = `${id}MpathDest`;
  const mpathRest = `${id}MpathRest`;

  const animStar1 = `${id}AnimStar1`;
  const animStar2 = `${id}AnimStar2`;
  const animStar3 = `${id}AnimStar3`;
  const animBallToRest = `${id}AnimBallToRest`;

  return (
    <div className={cn('ragflow-animation-root', className)}>
      <svg
        className="block size-full"
        viewBox="-310 -75 610 160"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
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

          <circle id={shapeDot}
            cx="0" cy="0" r="4"
            filter={`url(#${filterGlow})`}
          />

          <path
            id={shapeStar}
            d="M-11 0 q12 2 11 -11 q-2 12 11 11 q-12 -2 -11 11 q2 -12 -11 -11z"
            filter={`url(#${filterGlow})`}
          />

          <linearGradient id={gradientGrey} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="white" />
            <stop offset="1" stopColor="#666666" />
          </linearGradient>

          <linearGradient id={gradientCog} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#00beb4" />
            <stop offset="1" stopColor="#37f4a7" />
          </linearGradient>

          <linearGradient id={gradientBoxGlow} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#42b6ff" />
            <stop offset="1" stopColor="#2be8aa" />
          </linearGradient>

          <linearGradient id={gradientConnector}>
            <stop stopColor="transparent" />
            <stop offset=".25" stopColor="rgb(var(--ragflow-color-primary) / 0.5)" />
            <stop offset="1" stopColor="rgb(var(--ragflow-color-primary))" />
          </linearGradient>

          <linearGradient id={gradientConnectorReversed}>
            <stop stopColor="rgb(var(--ragflow-color-primary))" />
            <stop offset=".75" stopColor="rgb(var(--ragflow-color-primary) / 0.5)" />
            <stop offset="1" stopColor="transparent" />
          </linearGradient>

          <linearGradient id={gradientConnectorVanishing}>
            <stop offset=".5" stopColor="rgb(var(--ragflow-theme-black) / .5)" />
            <stop offset="1" stopColor="transparent" />
          </linearGradient>

          <SvgRecolorLinearGradientFilter id={filterGreyGradient} to="bottom">
            <stop offset="0" stopColor="white" />
            <stop offset="1" stopColor="#666666" />
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
                dur="5"
                repeatCount="indefinite"
                calcMode="spline"
                keyTimes="0;0.5;1"
                keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
              />
            )}
          />

          <SvgBreathingGlowFilter id={filterGlowBlurBreathing} />
          <SvgGlowFilter id={filterGlow}
            colorMatrix="
              5 0 0 0 .2
              0 5 0 0 .2
              0 0 5 0 .2
              0 0 0 .5 0"
          />

          <filter id={filterDatasetZap}
            x="-100" y="-100"
            width="300" height="300"
          >
            <feColorMatrix
              type="matrix"
              values="
                0 0 0 0 0
                0 0 0 0 .74
                0 0 0 0 .7
                0 0 0 1 0"
              result="colored"
            />

            <feMorphology
              in="colored"
              operator="dilate"
              radius="1"
              result="dilated"
            />

            <feGaussianBlur
              in="dilated"
              stdDeviation="2"
              result="blurred"
            />

            <feComposite
              in="blurred"
              in2="SourceGraphic"
              operator="arithmetic"
              k1="0" k2="0" k3="1" k4="0"
            >
              <animate
                attributeName="k2"
                values="0;1;0;0"
                dur={DATASET_ZAP_DURATION}
                begin={`${animBallToRest}.begin`}
                keyTimes="0;0.02;0.66;1"
              />
            </feComposite>
          </filter>
        </defs>

        {/* Connectors */}
        <g
          strokeWidth="1"
          strokeDasharray={DASH_ARRAY}
        >
          <g stroke={`url(#${gradientConnector})`}>
            <path
              id={mpathImages}
              d="M0 0 h-115 a10 10 0 0 1 -10 -10 v-80 a10 10 0 0 0 -10 -10 h-100"
            />

            <path
              id={mpathDocuments}
              d="M0 -0.01 v0.01 h-235"
            />

            <path
              id={mpathDataSources}
              d="M0 0 h-115 0 a10 10 0 0 0 -10 10 v80 a10 10 0 0 1 -10 10 h-100"
            />

            <animate
              attributeName="stroke-dashoffset"
              values="0%;100%"
              dur={DASH_OFFSET_DURATION}
              repeatCount="indefinite"
            />
          </g>

          <g>
            <path
              id={mpathDest}
              d="M0 0 h90 a10 10 0 0 0 10 -10 v-20 a10 10 0 0 1 10 -10 h70"
              stroke={`url(#${gradientConnectorReversed})`}
            />

            <path
              id={mpathRest}
              d="M180,-40 h55 a10 10 0 0 1 10 10 v20 a10 10 0 0 0 10 10 h35"
              stroke={`url(#${gradientConnectorVanishing})`}
            />

            <animate
              attributeName="stroke-dashoffset"
              values="100%;0%"
              dur={DASH_OFFSET_DURATION}
              repeatCount="indefinite"
            />
          </g>
        </g>

        {/* Animating objects */}
        <g>
          <g fill="rgb(var(--ragflow-color-primary))">
            <use href={`#${shapeStar}`}>
              <animateMotion
                id={animStar1}
                dur={SIDE_STAR_MOTION_DURATION}
                begin={`5;${animStar1}.end+6`}
                keyTimes="0;1"
                keyPoints="1;0"
              >
                <mpath href={`#${mpathImages}`} />
              </animateMotion>

              <animate
                attributeName="fill-opacity"
                values="0;1"
                dur="5"
                begin={`${animStar1}.begin`}
                calcMode="paced"
              />
            </use>

            <use href={`#${shapeStar}`}>
              <animateMotion
                id={animStar2}
                dur={MIDDLE_STAR_MOTION_DURATION}
                begin={`0;${animStar2}.end+5`}
                keyTimes="0;1"
                keyPoints="1;0"
              >
                <mpath href={`#${mpathDocuments}`} />
              </animateMotion>

              <animate
                attributeName="fill-opacity"
                values="0;1"
                dur="5"
                begin={`${animStar2}.begin`}
                calcMode="paced"
              />
            </use>

            <use href={`#${shapeStar}`}>
              <animateMotion
                id={animStar3}
                dur={SIDE_STAR_MOTION_DURATION}
                begin={`14;${animStar3}.end+4`}
                keyTimes="0;1"
                keyPoints="1;0"
              >
                <mpath href={`#${mpathDataSources}`} />
              </animateMotion>

              <animate
                attributeName="fill-opacity"
                values="0;1"
                dur="5"
                begin={`${animStar3}.begin`}
                calcMode="paced"
              />
            </use>

            <use href={`#${shapeDot}`}>
              <animateMotion
                dur={BALL_TO_DATASET_MOTION_DURATION}
                begin={`${animStar1}.end`}
              >
                <mpath href={`#${mpathDest}`} />
              </animateMotion>
            </use>

            <use href={`#${shapeDot}`}>
              <animateMotion
                dur={BALL_TO_DATASET_MOTION_DURATION}
                begin={`${animStar2}.end`}
              >
                <mpath href={`#${mpathDest}`} />
              </animateMotion>
            </use>

            <use href={`#${shapeDot}`}>
              <animateMotion
                dur={BALL_TO_DATASET_MOTION_DURATION}
                begin={`${animStar3}.end`}
              >
                <mpath href={`#${mpathDest}`} />
              </animateMotion>
            </use>
          </g>

          <use href={`#${shapeDot}`} fill="rgb(var(--ragflow-color-secondary))">
            <animateMotion
              id={animBallToRest}
              dur={BALL_FADE_OUT_DURATION}
              begin={`5;${animBallToRest}.end+5`}
            >
              <mpath href={`#${mpathRest}`} />
            </animateMotion>

            <animate
              attributeName="fill-opacity"
              values="1;1;0"
              dur={BALL_FADE_OUT_DURATION}
              begin={`5;${animBallToRest}.end+5`}
            />
          </use>
        </g>

        {/* Sources */}
        <g>
          <g transform="translate(-250, -100)">
            <foreignObject
              width="25" height="25"
              filter={`url(#${filterGreyGradient})`}
              transform="translate(-12, -15)"
            >
              <Icon icon="LucideFileImage" className="size-[24px]" />
            </foreignObject>

            <text
              className="text-xs text-disabled"
              y="24"
              textAnchor="middle"
            >
              Images
            </text>
          </g>

          <g transform="translate(-250, 0)">
            <foreignObject
              width="25" height="25"
              filter={`url(#${filterGreyGradient})`}
              transform="translate(-12, -15)"
            >
              <Icon icon="LucideFolderKanban" className="size-[24px]" />
            </foreignObject>

            <text
              className="text-xs text-disabled"
              y="24"
              textAnchor="middle"
            >
              Documents
            </text>
          </g>

          <g transform="translate(-250, 100)">
            <foreignObject
              width="25" height="25"
              filter={`url(#${filterGreyGradient})`}
              transform="translate(-12, -15)"
            >
              <Icon icon="LucideServer" className="size-[24px]" />
            </foreignObject>

            <text
              className="text-xs text-disabled"
              y="24"
              textAnchor="middle"
            >
              Data sources
            </text>
          </g>
        </g>

        {/* Cog group */}
        <g>
          <g filter={`url(#${filterGlowBlurBreathing})`}>
            <use href={`#${shapeBox}`} />
          </g>

          <g
            transform="translate(-12.5, 10)"
            stroke={`url(#${gradientGrey})`}
          >
            <g>
              <path
                strokeWidth="2"
                d="
                  M4.8543 -22.186
                  C1.6559 -22.8861 -1.6562 -22.8861 -4.8548 -22.186
                  C-5.5041 -20.6218 -5.8953 -18.9626 -6.0129 -17.273
                  C-8.1914 -16.5149 -10.2068 -15.3513 -11.9527 -13.8438
                  C-13.4747 -14.5867 -15.1072 -15.0775 -16.7865 -15.2973
                  C-18.9919 -12.8773 -20.6479 -10.0089 -21.641 -6.889
                  C-20.6111 -5.5444 -19.3698 -4.3761 -17.9654 -3.4295
                  C-18.3979 -1.1637 -18.3979 1.1635 -17.9654 3.4292
                  C-19.3697 4.3759 -20.6109 5.5443 -21.641 6.8887
                  C-20.6479 10.0087 -18.9919 12.877 -16.7865 15.297
                  C-15.1072 15.0772 -13.4747 14.5863 -11.9527 13.8435
                  C-10.2067 15.351 -8.1914 16.5146 -6.0129 17.2728
                  C-5.8952 18.9623 -5.5041 20.6216 -4.8548 22.1858
                  C-1.6562 22.8855 1.6558 22.8855 4.8543 22.1858
                  C5.5037 20.6216 5.8949 18.9624 6.0126 17.2728
                  C8.1911 16.5143 10.2065 15.3507 11.9525 13.8433
                  C13.4745 14.5862 15.1069 15.0771 16.7862 15.2968
                  C18.9916 12.8768 20.6476 10.0085 21.6406 6.8885
                  C20.6107 5.5441 19.3694 4.3757 17.965 3.429
                  C18.3976 1.1633 18.3976 -1.1639 17.965 -3.4297
                  C19.3694 -4.3763 20.6108 -5.5446 21.6406 -6.8892
                  C20.6476 -10.0091 18.9916 -12.8775 16.7862 -15.2975
                  C15.1069 -15.0778 13.4745 -14.5869 11.9525 -13.844
                  C10.2065 -15.3515 8.1911 -16.515 6.0126 -17.2732
                  C5.8949 -18.9628 5.5037 -20.622 4.8543 -22.186
                  Z"
              />

              <g stroke={`url(#${gradientCog})`}>
                <circle cx="0" cy="0" r="11.86645" />
                <circle cx="0" cy="0" r="9.4426" />
              </g>

              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0 0 0;360 0 0"
                dur={COG_ROTATE_DURATION}
                repeatCount="indefinite"
              />
            </g>

            <g transform="translate(35.908, 0)">
              <path
                strokeOpacity="0.6"
                d="
                  M9.60955 -10.54545
                  C8.08915 -11.93075 6.28735 -12.97095 4.32755 -13.59495
                  C3.48295 -12.94785 2.74895 -12.16805 2.15405 -11.28585
                  C0.73075 -11.55755 -0.73115 -11.55755 -2.15445 -11.28585
                  C-2.74925 -12.16805 -3.48325 -12.94785 -4.32785 -13.59495
                  C-6.28775 -12.97095 -8.08955 -11.93075 -9.60995 -10.54545
                  C-9.47195 -9.49045 -9.16345 -8.46485 -8.69675 -7.50865
                  C-9.64385 -6.41175 -10.37485 -5.14575 -10.85135 -3.77715
                  C-11.91265 -3.70305 -12.95495 -3.45725 -13.93765 -3.04945
                  C-14.37725 -1.04005 -14.37725 1.04055 -13.93765 3.04995
                  C-12.95495 3.45775 -11.91265 3.70355 -10.85135 3.77765
                  C-10.37485 5.14615 -9.64385 6.41225 -8.69675 7.50915
                  C-9.16345 8.46525 -9.47195 9.49095 -9.60995 10.54595
                  C-8.08955 11.93125 -6.28775 12.97145 -4.32785 13.59545
                  C-3.48315 12.94835 -2.74915 12.16855 -2.15445 11.28635
                  C-0.73085 11.55795 0.73095 11.55795 2.15455 11.28635
                  C2.74925 12.16855 3.48325 12.94835 4.32795 13.59545
                  C6.28775 12.97145 8.08955 11.93125 9.60995 10.54595
                  C9.47195 9.49095 9.16345 8.46525 8.69675 7.50915
                  C9.64385 6.41225 10.37485 5.14615 10.85135 3.77765
                  C11.91265 3.70355 12.95495 3.45775 13.93765 3.04995
                  C14.37725 1.04055 14.37725 -1.04005 13.93765 -3.04945
                  C12.95495 -3.45725 11.91265 -3.70305 10.85135 -3.77715
                  C10.37485 -5.14575 9.64385 -6.41175 8.69675 -7.50865
                  C9.16345 -8.46485 9.47195 -9.49045 9.60955 -10.54545
                  Z
                  M-6 0 a6 6 0 0 1 12 0 a6 6 0 0 1 -12 0 z
                "
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="0 0 0;-360 0 0"
                  dur={COG_ROTATE_DURATION}
                  repeatCount="indefinite"
                />
              </path>
            </g>

            <g transform="translate(17.893, -30.513)">
              <path
                strokeOpacity="0.4"
                d="
                  M12.8987 2.8224
                  C13.3057 0.9629 13.3057 -0.9626 12.8987 -2.8221
                  C11.9893 -3.1997 11.0247 -3.4272 10.0424 -3.4957
                  C9.60155 -4.7622 8.9251 -5.9339 8.0486 -6.9489
                  C8.4805 -7.8338 8.766 -8.78286 8.8936 -9.75916
                  C7.4866 -11.0414 5.8189 -12.0042 4.0052 -12.5816
                  C3.2236 -11.9828 2.5443 -11.2611 1.9938 -10.4447
                  C0.6765 -10.6931 -0.6765 -10.6931 -1.9938 -10.4447
                  C-2.5443 -11.2611 -3.2236 -11.9828 -4.0052 -12.5816
                  C-5.8191 -12.0042 -7.4866 -11.0414 -8.8936 -9.75916
                  C-8.7658 -8.78289 -8.4804 -7.8338 -8.0487 -6.9489
                  C-8.925  -5.9338 -9.60135 -4.7622 -10.0424 -3.4957
                  C-11.0246 -3.4271 -11.9892 -3.1996 -12.8986 -2.8221
                  C-13.3053 -0.9626 -13.3053 0.9629 -12.8986 2.8224
                  C-11.9892 3.2 -11.0246 3.4274 -10.0424 3.4957
                  C-9.6014 4.7622 -8.925 5.9339 -8.0487 6.9486
                  C-8.4804 7.8334 -8.7658 8.7825 -8.8936 9.7588
                  C-7.4866 11.041  -5.8191 12.004  -4.0052 12.5813
                  C-3.2236 11.9826  -2.5443 11.2609  -1.9938 10.4445
                  C-0.6765 10.6929  0.6765 10.6929  1.9938 10.4445
                  C2.5443 11.2609  3.2236 11.9826  4.0052 12.5813
                  C5.8189 12.004  7.4867 11.041  8.8936 9.7588
                  C8.766 8.7825  8.4805 7.8334  8.0487 6.9486
                  C8.9252 5.9339  9.6016 4.7622  10.0424 3.4957
                  C11.0247 3.4274  11.9893 3.2  12.8987 2.8224
                  Z
                  M-5 0 a5 5 0 0 1 10 0 a5 5 0 0 1 -10 0 z
                "
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="0 0 0;-360 0 0"
                  dur={COG_ROTATE_DURATION}
                  repeatCount="indefinite"
                />
              </path>
            </g>
          </g>
        </g>

        {/* Dataset */}
        <g transform="translate(180, -40)">
          <g>
            <g filter={`url(#${filterTopSpotlight})`}>
              <use
                href={`#${shapeBox}`}
                transform="scale(.6)"
              />
            </g>
          </g>

          {/* Cannot replace with <Icon /> because it partially applied with filter */}
          <path
            className="stroke-1.5"
            transform="translate(-12.5, -20)"
            stroke={`url(#${gradientGrey})`}
            d="M3 5 a9 3 0 1 0 18 0 a9 3 0 1 0 -18 0 M3 5V19 A9 3 0 0 0 15 21.84 M21 5V8 M3 12 A9 3 0 0 0 14.59 14.87"
          />

          <path
            className="stroke-1.5"
            transform="translate(-12.5, -20)"
            stroke={`url(#${gradientGrey})`}
            d="M21 12L18 17H22L19 22"
            filter={`url(#${filterDatasetZap})`}
          />

          <text
            className="text-xs text-disabled"
            y="15"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            Dataset
          </text>
        </g>
      </svg>
    </div>
  );
}

export default IndexFeatureEtlAnimation;