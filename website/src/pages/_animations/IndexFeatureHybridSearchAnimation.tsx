import { cn } from "@site/src/utils/twUtils";
import useReducedMotion from "@site/src/utils/useReducedMotion";
import { useEffect, useId, useRef } from "react";

import Icon from "@site/src/components/Icon";
import VectorIcon from "@site/src/assets/svg/vector.svg";
import FullTextIcon from "@site/src/assets/svg/fulltext.svg";
import TensorIcon from "@site/src/assets/svg/tensor.svg";

import SvgRecolorLinearGradientFilter from "../_fx/SvgRecolorLinearGradientFilter";
import SvgGlowFilter from "../_fx/SvgGlowFilter";
import SvgSpotlightFilter from "../_fx/SvgSpotlightFilter";
import SvgLinearGradient from "../_fx/SvgLinearGradient";
import {
  DASH_ARRAY,
  DASH_OFFSET_DURATION,
} from "./constants";

const MAGNIFIER_MOTION_DURATION = 4;
const MAGNIFIER_BG_PATTERN_DURATION = 2;
const QUESTION_DOT_MOTION_DURATION = 7.5;
const QUESTION_DOT_SCALE_UP_DURATION = 0.3;
const SIDE_DOT_MOTION_DURATION = 10.5;
const MIDDLE_DOT_MOTION_DURATION = 5;
const SIDE_STAR_MOTION_DURATION = 14;
const MIDDLE_STAR_MOTION_DURATION = 10;

const MAGNIFIER_LINKED_DOTS = [
  { cx: -6, cy: -17, r: 2.5 },    // dot 1
  { cx: 16, cy: -24, r: 2.5 },    // dot 2
  { cx: 0, cy: 9, r: 3 },       // dot 3
  { cx: 23, cy: -1, r: 6 },     // dot 4
  { cx: 4, cy: 23, r: 4 },    // dot 5
  { cx: -20, cy: 10, r: 7 },    // dot 6
];

const GRADIENT_STOPS = [0x00beb4, 0x01c48d] as [number, number];
const MAX_OFFSET = 6; // max pixels dot can deviate from initial pos

// Helper function to get gradient color based on Y position
// Interpolates between top color and bottom color
const getGradientColor = (
  stops: [number, number],
  position: number,
) => {
  const t = Math.max(0, Math.min(1, position));
  const [from, to] = stops;
  const r1 = (from & 0xff0000) >> 16, g1 = (from & 0xff00) >> 8, b1 = from & 0xff;
  const r2 = (to & 0xff0000) >> 16, g2 = (to & 0xff00) >> 8, b2 = to & 0xff;
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  return `rgb(${r} ${g} ${b})`;
};

function IndexFeatureHybridSearchAnimation({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const dotsRef = useRef([]);

  // Initialize canvas, do this only once
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    // Initialize dot positions from DOTS constant
    // Transform SVG coordinates to canvas coordinates
    dotsRef.current = MAGNIFIER_LINKED_DOTS.map((dot) => ({
      initialX: centerX + dot.cx,
      initialY: centerY + dot.cy,
      x: centerX + dot.cx,
      y: centerY + dot.cy,
      r: dot.r,
      // Give a random velocity for subtle movement
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
    }));
  }, []);

  // Animate the canvas, do this on every frame
  // respecting reduced motion setting
  useEffect(() => {
    if (!canvasRef.current) return;

    const dots = dotsRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;

    const width = canvas.width;
    const height = canvas.height;

    let animationFrameId: number;

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Update dot positions with subtle random movement around their initial positions
      dots.forEach((dot) => {
        // Add subtle random movement
        dot.vx += (Math.random() - 0.5) * 0.02;
        dot.vy += (Math.random() - 0.5) * 0.02;

        // Dampen velocity to keep movement subtle
        dot.vx *= 0.98;
        dot.vy *= 0.98;

        // Update position
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Restrict movement to within a max distance from initial position
        const dxInit = dot.x - dot.initialX;
        const dyInit = dot.y - dot.initialY;
        const offsetFromInit = Math.sqrt(dxInit * dxInit + dyInit * dyInit);

        if (offsetFromInit > MAX_OFFSET) {
          // Calculate angle away from initial position
          const angle = Math.atan2(dyInit, dxInit);
          // Clamp position to the circle around the initial pos
          dot.x = dot.initialX + Math.cos(angle) * MAX_OFFSET;
          dot.y = dot.initialY + Math.sin(angle) * MAX_OFFSET;
          // Reflect velocity to keep it inside local region
          const normalX = Math.cos(angle);
          const normalY = Math.sin(angle);
          const dotProduct = dot.vx * normalX + dot.vy * normalY;
          dot.vx -= 2 * dotProduct * normalX;
          dot.vy -= 2 * dotProduct * normalY;
          dot.vx *= 0.7;
          dot.vy *= 0.7;
        }
      });

      // Draw connection lines between each pair of dots
      ctx.lineWidth = 1.5;

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          if (i === 3 && j === 5) {
            continue;
          }

          const dot1 = dots[i];
          const dot2 = dots[j];

          // Create a gradient for each line based on vertical position
          const lineGradient = ctx.createLinearGradient(
            dot1.x, dot1.y,
            dot2.x, dot2.y
          );

          lineGradient.addColorStop(0, getGradientColor(GRADIENT_STOPS, dot1.y / height));
          lineGradient.addColorStop(1, getGradientColor(GRADIENT_STOPS, dot2.y / height));

          ctx.beginPath();
          ctx.moveTo(dot1.x, dot1.y);
          ctx.lineTo(dot2.x, dot2.y);
          ctx.strokeStyle = lineGradient;
          ctx.stroke();
        }
      }

      // Draw dots
      dots.forEach(dot => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fillStyle = getGradientColor(GRADIENT_STOPS, dot.y / height);
        ctx.fill();
      });

      // Request next frame if not reduced motion
      if (!shouldReduceMotion) {
        animationFrameId = window.requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [shouldReduceMotion]);

  const id = useId();

  const shapeBox = `${id}ShapeBox`;
  const shapeDot = `${id}ShapeDot`;
  const shapeStar = `${id}ShapeStar`;
  const shapeMagnifierCircle = `${id}ShapeMagnifierCircle`;

  const patternGrid = `${id}PatternGrid`;

  const gradientMagnifier = `${id}GradientMagnifier`;
  const gradientConnectorFadeLeft = `${id}GradientConnector`;
  const gradientConnectorFadeRight = `${id}GradientConnectorReversed`;
  const gradientConnectorGreyFadeLeft = `${id}GradientConnectorAppearing`;

  const filterGreyGradient = `${id}FilterGreyGradient`;
  const filterGooey = `${id}FilterGooey`;
  const filterGlow = `${id}FilterGlow`;
  const filterSpotLight1 = `${id}FilterSpotLight`;
  const filterSpotLight2 = `${id}FilterSpotLight2`;
  const filterSpotLight3 = `${id}FilterSpotLight3`;

  const mpathQuestion = `${id}MpathQuestion`;
  const mpathMagnifier = `${id}MpathMagnifierCircle`;
  const mpathVectorIn = `${id}MpathVectorIn`;
  const mpathVectorOut = `${id}MpathVectorOut`;
  const mpathFullTextIn = `${id}MpathFullTextIn`;
  const mpathFullTextOut = `${id}MpathFullTextOut`;
  const mpathTensorIn = `${id}MpathTensorIn`;
  const mpathTensorOut = `${id}MpathTensorOut`;

  const animQuestionDot1 = `${id}AnimQuestionDot1`;
  const animQuestionDot2 = `${id}AnimQuestionDot2`;
  const animQuestionDot3 = `${id}AnimQuestionDot3`;
  const animDotMotion1 = `${id}AnimDotMotion1`;
  const animDotMotion2 = `${id}AnimDotMotion2`;
  const animDotMotion3 = `${id}AnimDotMotion3`;

  const maskMagnifierCircle = `${id}MaskMagnifierCircle`;

  return (
    <div className={cn('ragflow-animation-root', className)}>
      <svg
        className="block size-full"
        viewBox="-285 -75 570 150"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <defs>
          <rect
            id={shapeBox}
            x="-24" y="-24"
            width="48" height="48"
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

          <path id={shapeStar}
            d="M-12 0 q12 2 11 -11 q-2 12 11 11 q-12 -2 -11 11 q2 -12 -11 -11z"
            filter={`url(#${filterGlow})`}
          />

          <path id={mpathMagnifier}
            d="M 0 0 c-8 -1 0 -8 0 0 s8 1 0 0z"
          />

          <SvgLinearGradient id={gradientMagnifier} to="bottom">
            <stop stopColor="#00beb4" />
            <stop offset="1" stopColor="#01c48d" />
          </SvgLinearGradient>

          <SvgLinearGradient id={gradientConnectorGreyFadeLeft} to="left">
            <stop offset=".75" stopColor="rgb(var(--ragflow-theme-black) / 0.5)" />
            <stop offset="1" stopColor="transparent" />
          </SvgLinearGradient>

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

          <pattern id={patternGrid}
            x="0" y="0"
            width="10" height="10"
            patternUnits="userSpaceOnUse"
          >
            <rect x="0" y="0" width="10" height="10" fill="rgb(var(--ragflow-bg-standard))" />
            <path d="M0 0 L10 0 L10 10 L0 10 Z" stroke="var(--ragflow-border-standard)" strokeWidth="1" />

            <animateTransform
              attributeName="patternTransform"
              type="translate"
              values="0 0; 10 10"
              dur={MAGNIFIER_BG_PATTERN_DURATION}
              repeatCount="indefinite"
              additive="sum"
            />
          </pattern>

          <filter id={filterGooey}
            x="-50%" y="-50%"
            width="200%" height="200%"
          >
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="1"
              result="blur"
            />

            <feColorMatrix
              in="blur"
              type="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 18 -7"
              result="goo"
            />

            <feComposite
              in="SourceGraphic"
              in2="goo"
              operator="atop"
              result="composited"
            />

            <feGaussianBlur
              in="composited"
              stdDeviation="2"
              result="blurred"
            />

            <feMerge>
              <feMergeNode in="blurred" />
              <feMergeNode in="composited" />
            </feMerge>
          </filter>

          <SvgGlowFilter id={filterGlow} />

          <SvgRecolorLinearGradientFilter id={filterGreyGradient} to="bottom">
            <stop offset="0" stopColor="white" />
            <stop offset="1" stopColor="#666666" />
          </SvgRecolorLinearGradientFilter>

          <SvgSpotlightFilter id={filterSpotLight1}
            specularConstant="0.1"
            x="20" y="0" z="7"
            pointsAtX="-10" pointsAtY="0" pointsAtZ="0"
            limitingConeAngle="25"
            lightingColor="rgb(47 236 168)"
            animateLighting={(
              <animate
                attributeName="specularConstant"
                values="0.1; 1; 0.1"
                dur="3"
                begin={`${animDotMotion1}.end`}
                calcMode="spline"
                keyTimes="0;0.1;1"
                keySplines="0.5 1 0.5 1;0.5 0 0.7 0.5"
              />
            )}
          />

          <SvgSpotlightFilter id={filterSpotLight2}
            specularConstant="0.1"
            x="20" y="0" z="7"
            pointsAtX="-10" pointsAtY="0" pointsAtZ="0"
            limitingConeAngle="25"
            lightingColor="rgb(47 236 168)"
            animateLighting={(
              <animate
                attributeName="specularConstant"
                values="0.1; 1; 0.1"
                dur="3"
                begin={`${animDotMotion2}.end`}
                calcMode="spline"
                keyTimes="0;0.1;1"
                keySplines="0.5 1 0.5 1;0.5 0 0.7 0.5"
              />
            )}
          />

          <SvgSpotlightFilter id={filterSpotLight3}
            specularConstant="0.1"
            x="20" y="0" z="7"
            pointsAtX="-10" pointsAtY="0" pointsAtZ="0"
            limitingConeAngle="25"
            lightingColor="rgb(47 236 168)"
            animateLighting={(
              <animate
                attributeName="specularConstant"
                values="0.1; 1; 0.1"
                dur="3"
                begin={`${animDotMotion3}.end`}
                calcMode="spline"
                keyTimes="0;0.1;1"
                keySplines="0.5 1 0.5 1;0.5 0 0.7 0.5"
              />
            )}
          />
        </defs>

        {/* Connectors */}
        <g
          strokeDasharray={DASH_ARRAY}
          strokeWidth="1"
        >
          <path id={mpathQuestion} d="M-215 0 l100 0" />

          <g>
            <path
              d="M-250 0 l150 0 v0.01"
              stroke={`url(#${gradientConnectorGreyFadeLeft})`}
            />

            <g stroke={`url(#${gradientConnectorFadeRight})`}>
              <path id={mpathVectorIn} d="M-100 0 v-70 a10 10 0 0 1 10 -10 h70" />
              <path id={mpathFullTextIn} d="M-100 0 h80 v0.01" />
              <path id={mpathTensorIn} d="M-100 0 v70 a10 10 0 0 0 10 10 h70" />
            </g>

            <animate
              attributeName="stroke-dashoffset"
              values="100%; 0%"
              dur={DASH_OFFSET_DURATION}
              repeatCount="indefinite"
            />
          </g>

          <g stroke={`url(#${gradientConnectorFadeLeft})`}>
            <path id={mpathVectorOut} d="M250 0 h-70 a10 10 0 0 1 -10 -10 v-60 a10 10 0 0 0 -10 -10 h-60" />
            <path id={mpathFullTextOut} d="M250 0 h-150 v-0.01" />
            <path id={mpathTensorOut} d="M250 0 h-70 a10 10 0 0 0 -10 10 v60 a10 10 0 0 1 -10 10 h-60" />

            <animate
              attributeName="stroke-dashoffset"
              values="0%; 100%"
              dur={DASH_OFFSET_DURATION}
              repeatCount="indefinite"
            />
          </g>
        </g>

        {/* Animating objects */}
        <g>
          {/* Question -> Magnifier */}
          <g fill="rgb(var(--ragflow-theme-black))">
            <use href={`#${shapeDot}`}>
              <animateMotion
                id={animQuestionDot1}
                dur={QUESTION_DOT_MOTION_DURATION}
                begin={`0;${animQuestionDot1}.end+15`}
                keyPoints="0;0;1"
                keyTimes={`0;${.05 + QUESTION_DOT_SCALE_UP_DURATION / QUESTION_DOT_MOTION_DURATION};1`}
              >
                <mpath href={`#${mpathQuestion}`} />
              </animateMotion>

              <animateTransform
                attributeName="transform"
                type="scale"
                values="0;1"
                dur={QUESTION_DOT_SCALE_UP_DURATION}
                begin={`${animQuestionDot1}.begin`}
              >
              </animateTransform>
            </use>

            <use href={`#${shapeDot}`}>
              <animateMotion
                id={animQuestionDot2}
                dur={QUESTION_DOT_MOTION_DURATION}
                begin={`5;${animQuestionDot2}.end+16`}
                keyPoints="0;0;1"
                keyTimes={`0;${.05 + QUESTION_DOT_SCALE_UP_DURATION / QUESTION_DOT_MOTION_DURATION};1`}
              >
                <mpath href={`#${mpathQuestion}`} />
              </animateMotion>

              <animateTransform
                attributeName="transform"
                type="scale"
                values="0;1"
                dur={QUESTION_DOT_SCALE_UP_DURATION}
                begin={`${animQuestionDot2}.begin`}
              >
              </animateTransform>
            </use>

            <use href={`#${shapeDot}`}>
              <animateMotion
                id={animQuestionDot3}
                dur={QUESTION_DOT_MOTION_DURATION}
                begin={`10;${animQuestionDot3}.end+14`}
                keyPoints="0;0;1"
                keyTimes={`0;${.05 + QUESTION_DOT_SCALE_UP_DURATION / QUESTION_DOT_MOTION_DURATION};1`}
              >
                <mpath href={`#${mpathQuestion}`} />
              </animateMotion>

              <animateTransform
                attributeName="transform"
                type="scale"
                values="0; 1"
                dur={QUESTION_DOT_SCALE_UP_DURATION}
                begin={`${animQuestionDot3}.begin`}
              >
              </animateTransform>
            </use>
          </g>

          <g fill="rgb(var(--ragflow-color-primary))">
            {/* Magnifier -> Vector -> Answer */}
            <g>
              <use href={`#${shapeDot}`}>
                <animateMotion
                  id={animDotMotion1}
                  dur={SIDE_DOT_MOTION_DURATION}
                  begin={`${animQuestionDot1}.end+1`}
                >
                  <mpath href={`#${mpathVectorIn}`} />
                </animateMotion>
              </use>

              <use href={`#${shapeStar}`}>
                <animateMotion
                  dur={SIDE_STAR_MOTION_DURATION}
                  begin={`${animDotMotion1}.end+1`}
                  keyTimes="0;1"
                  keyPoints="1;0"

                >
                  <mpath href={`#${mpathVectorOut}`} />
                </animateMotion>
              </use>
            </g>

            {/* Magnifier -> Full-text -> Answer */}
            <g>
              <use href={`#${shapeDot}`}>
                <animateMotion
                  id={animDotMotion2}
                  dur={MIDDLE_DOT_MOTION_DURATION}
                  begin={`${animQuestionDot2}.end+1`}
                >
                  <mpath href={`#${mpathFullTextIn}`} />
                </animateMotion>
              </use>

              <use href={`#${shapeStar}`}>
                <animateMotion
                  dur={MIDDLE_STAR_MOTION_DURATION}
                  begin={`${animDotMotion2}.end+1`}
                  keyTimes="0;1"
                  keyPoints="1;0"

                >
                  <mpath href={`#${mpathFullTextOut}`} />
                </animateMotion>
              </use>
            </g>

            {/* Magnifier -> Tensor -> Answer */}
            <g>
              <use href={`#${shapeDot}`}>
                <animateMotion
                  id={animDotMotion3}
                  dur={SIDE_DOT_MOTION_DURATION}
                  begin={`${animQuestionDot3}.end+1`}
                >
                  <mpath href={`#${mpathTensorIn}`} />
                </animateMotion>
              </use>

              <use href={`#${shapeStar}`}>
                <animateMotion
                  dur={SIDE_STAR_MOTION_DURATION}
                  begin={`${animDotMotion3}.end+1`}
                  keyTimes="0;1"
                  keyPoints="1;0"

                >
                  <mpath href={`#${mpathTensorOut}`} />
                </animateMotion>
              </use>
            </g>
          </g>
        </g>

        {/* Question */}
        <g transform="translate(-250, 0)">
          <use href={`#${shapeBox}`} />

          <foreignObject
            width="24" height="24"
            filter={`url(#${filterGreyGradient})`}
            transform="translate(-12, -12)"
          >
            <Icon icon="LucideMessageCircleQuestion" className="size-[24px]" />
          </foreignObject>
        </g>

        {/* Magnifier */}
        <g transform="translate(-100, 0)">
          <rect
            fill={`url(#${patternGrid})`}
            x="-100" y="-100"
            width="200" height="200"
            mask={`url(#${maskMagnifierCircle})`}
          />

          <g
            strokeWidth="2"
            stroke={`url(#${gradientMagnifier})`}
            filter={`url(#${filterGlow})`}
          >
            <circle id={shapeMagnifierCircle} cx="0" cy="0" r="38" />

            <line x1="26.87" y1="26.87" x2="42" y2="42" />

            <defs>
              <mask id={maskMagnifierCircle}>
                <use
                  href={`#${shapeMagnifierCircle}`}
                  fill="white"
                >
                  <animateMotion
                    dur={MAGNIFIER_MOTION_DURATION}
                    repeatCount="indefinite"
                  >
                    <mpath href={`#${mpathMagnifier}`} />
                  </animateMotion>
                </use>
              </mask>
            </defs>

            <animateMotion
              dur={MAGNIFIER_MOTION_DURATION}
              repeatCount="indefinite"
            >
              <mpath href={`#${mpathMagnifier}`} />
            </animateMotion>
          </g>

          <g
            filter={`url(#${filterGooey})`}
            mask={`url(#${maskMagnifierCircle})`}
          >
            <foreignObject x="-38" y="-38" width="76" height="76">
              <canvas ref={canvasRef} width="76" height="76" />
            </foreignObject>
          </g>
        </g>

        {/* Engines */}
        <g transform="translate(-30, 0)">
          <g transform="translate(0, -80)">
            <g filter={`url(#${filterSpotLight1})`}>
              <use
                href={`#${shapeBox}`}
                transform="translate(72, 0) scale(3, 1)"
              />
            </g>

            {/* gradient applied */}
            <foreignObject
              x="16" y="-14"
              width="28" height="28"
            >
              <VectorIcon className="size-[28px]" />
            </foreignObject>

            <text
              className="text-sm text-secondary"
              x="56" y="5"
            >
              Vector
            </text>
          </g>

          <g>
            <g filter={`url(#${filterSpotLight2})`}>
              <use
                href={`#${shapeBox}`}
                transform="translate(72, 0) scale(3, 1)"
              />
            </g>

            <foreignObject
              x="14" y="-14"
              width="28" height="28"
            >
              <FullTextIcon className="size-[28px]" />
            </foreignObject>

            <text
              className="text-sm text-secondary"
              x="56" y="5"
            >
              Full-text
            </text>
          </g>

          <g transform="translate(0, 80)">
            <g filter={`url(#${filterSpotLight3})`}>
              <use
                href={`#${shapeBox}`}
                transform="translate(72, 0) scale(3, 1)"
              />
            </g>

            <foreignObject
              x="14" y="-14"
              width="28" height="28"
            >
              <TensorIcon className="size-[28px]" />
            </foreignObject>

            <text
              className="text-sm text-secondary"
              x="56" y="5"
            >
              Tensor
            </text>
          </g>
        </g>

        {/* Answer */}
        <g transform="translate(250, 0)">
          <use href={`#${shapeBox}`} />

          <foreignObject
            width="24" height="24"
            filter={`url(#${filterGreyGradient})`}
            transform="translate(-12, -12)"
          >
            <Icon icon="LucideMessageCircleMore" className="size-[24px]" />
          </foreignObject>
        </g>
      </svg>
    </div>
  );
}

export default IndexFeatureHybridSearchAnimation;