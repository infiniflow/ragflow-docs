import { useId } from "react";
import SvgGlowFilter from "../_fx/SvgGlowFilter";

export default function IndexHeroBgAnimation() {
  const id = useId();

  const shapeStarWithTail = `${id}ShapeStarWithTail`;
  const gradientTail = `${id}GradientTail`;
  const patternGrid = `${id}PatternGrid`;
  const filterGlow = `${id}FilterGlow`;
  const animStar1 = `${id}AnimStar1`;
  const animStar2 = `${id}AnimStar2`;
  const animStar3 = `${id}AnimStar3`;
  const animStar4 = `${id}AnimStar4`;

  return (
    <div
      className="ragflow-fx-root absolute inset-0 -z-10 overflow-hidden"
      inert
    >
      <div
        className="
          z-[1] absolute -inset-x-[8em] -inset-y-[4em]
          shadow-[inset_0_0_20em_10em] shadow-bg-standard"
      />

      <svg
        key="heroBgEffect"
        className="size-full"
        viewBox="0 0 1500 800"
        preserveAspectRatio="xMidYMid slice"
        vectorEffect="non-scaling-stroke"
      >
        <defs>
          <g id={shapeStarWithTail}>
            <rect
              fill={`url(#${gradientTail})`}
              x="-300" y="-.5"
              width="300" height="1"
            />

            <path
              filter={`url(#${filterGlow})`}
              fill="#79e7e1"
              d="
                M-12 0
                q 12.5    .5  12 -12
                q  -.5  12.5  12  12
                q-12.5   -.5 -12  12
                q   .5 -12.5 -12 -12
                z"
            />
          </g>

          <SvgGlowFilter id={filterGlow} colorMatrix={false} />

          <linearGradient id={gradientTail}>
            <stop offset="0%" stopColor="transparent" />
            <stop offset="100%" stopColor="#79e7e1" />
          </linearGradient>

          <pattern id={patternGrid}
            x="-50" y="-50"
            width="100" height="100"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="m0 0 h100 v100"
              fill="transparent"
              stroke="rgba(var(--ragflow-theme-black))"
              strokeWidth="var(--ragflow-global-border-width)"
            />
          </pattern>
        </defs>

        <g>
          <rect
            x="0" y="0"
            width="1500" height="800"
            fill={`url(#${patternGrid})`}
            fillOpacity="0.5"
          />
        </g>

        <g>
          <use href={`#${shapeStarWithTail}`} transform="translate(-50, 350)">
            <animate
              id={animStar1}
              attributeName="x"
              values="-300; 2500"
              begin={`0;${animStar1}.end+10`}
              dur="22"
            />
          </use>

          <use href={`#${shapeStarWithTail}`} transform="translate(-50, 550)">
            <animate
              id={animStar2}
              attributeName="x"
              values="-500; 2400"
              begin={`14; ${animStar2}.end+9`}
              dur="21"
            />
          </use>

          <use href={`#${shapeStarWithTail}`} transform="translate(450, 0) rotate(90)">
            <animate
              id={animStar3}
              attributeName="x"
              values="-100; 1400"
              begin={`6; ${animStar3}.end+7`}
              dur="15"
            />
          </use>

          <use href={`#${shapeStarWithTail}`} transform="translate(1050, 800) rotate(-90)">
            <animate
              id={animStar4}
              attributeName="x"
              values="-100; 1400"
              begin={`10; ${animStar4}.end+8`}
              dur="14"
            />
          </use>
        </g>
      </svg>
    </div>
  );
}