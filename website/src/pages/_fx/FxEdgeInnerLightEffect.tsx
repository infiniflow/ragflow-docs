import { cn } from "@site/src/utils/twUtils";
import { useId } from "react";

const POSITION_TRANSFORM = {
  top: 'translate(0, 0)',
  bottom: 'translate(0, 200) rotate(180)',
  left: 'translate(-100, 100) rotate(-90)',
  right: 'translate(100, 100) rotate(90)',
};

interface Props {
  className?: string;
  style?: React.CSSProperties;
  position?: keyof typeof POSITION_TRANSFORM;
}

function FxEdgeInnerLightEffect({
  className,
  style,
  position = 'bottom',
}: Props) {
  const id = useId();

  const filterInnerBlur = `${id}FilterInnerBlur`;
  const filterOuterBlur = `${id}FilterOuterBlur`;

  return (
    <div
      className={cn(
        className,
        'ragflow-fx-root',
        'absolute -z-10 overflow-hidden'
      )}
      style={style}
      inert
    >
      <svg
        className="block size-full"
        viewBox="-100 0 200 200"
        preserveAspectRatio="none"
      >
        <defs>
          <filter
            id={filterInnerBlur}
            x="-100%" y="-100%"
            width="300%" height="300%"
          >
            <feGaussianBlur stdDeviation="5" />
          </filter>

          <filter
            id={filterOuterBlur}
            x="-100%" y="-100%"
            width="300%" height="300%"
          >
            <feGaussianBlur stdDeviation="20" />
          </filter>
        </defs>

        <g
          transform={POSITION_TRANSFORM[position]}
          fill="rgba(var(--ragflow-color-primary))"
        >
          <ellipse
            cx="0"
            cy="-6"
            rx="45"
            ry="8"
            filter={`url(#${filterInnerBlur})`}
          />

          <circle
            cx="0"
            cy="-50"
            r="55"
            filter={`url(#${filterOuterBlur})`}
          />
        </g>
      </svg>
    </div>
  );
}

export default FxEdgeInnerLightEffect;