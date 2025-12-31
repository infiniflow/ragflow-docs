import { useBox } from "@site/src/utils/AnimatableFlow/useBox";
import { cn } from "@site/src/utils/twUtils";

export default function IndexSolutionLegalPrecedentAnalysisAnimation({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const startShape = useBox({
    x: -450, y: 0,
    width: 50, height: 50,
    r: 6,
    solid: true,
    outlined: true,
    icon: {
      icon: 'LucideHousePlus',
      size: 24,
    },
  });

  return (
    <div className={cn('ragflow-animation-root', className)}>
      <svg
        className="block size-full"
        viewBox="-490 -250 910 525"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      >
        <defs></defs>

        {/* Nodes */}
        <g>
          {startShape.element}
        </g>
      </svg>
    </div>
  );
}