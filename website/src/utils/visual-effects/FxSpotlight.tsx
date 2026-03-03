import { cn } from "@site/src/utils/twUtils";
import { useId } from "react";

interface Props {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
}

function FxSpotlightEffect({
  className,
  style,
  color = 'rgba(var(--ragflow-color-primary))',
}: Props) {
  const id = useId();

  const filterBlur = `${id}FilterBlur`;

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
        viewBox="-100 -100 200 200"
        preserveAspectRatio="none"
      >
        <defs>
          <filter
            id={filterBlur}
            x="-100%" y="-100%"
            width="300%" height="300%"
          >
            <feGaussianBlur stdDeviation="20" />
          </filter>
        </defs>

        <g
          fill={color}
        >
          <circle
            cx="0"
            cy="0"
            r="50"
            filter={`url(#${filterBlur})`}
          />
        </g>
      </svg>
    </div>
  );
}

export default FxSpotlightEffect;