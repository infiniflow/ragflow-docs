import useLinearGradient, { GradientPosition } from "@site/src/utils/useLinearGradient";

interface Props extends Omit<React.SVGAttributes<SVGFilterElement>, 'to' | 'from'> {
  id?: string;
  stdDeviation?: number;
  stdDeviationMax?: number;
  duration?: number;
  animate?: React.ReactElement<React.JSX.IntrinsicElements['animate']>;
  from?: GradientPosition;
  to?: GradientPosition;
  strength?: number | string;
  extrude?: number | string;
};

export default function SvgBreathingGlowFilter({
  from,
  to = 'bottom',
  stdDeviation = 4,
  stdDeviationMax = 10,
  duration = 5000,
  strength = .5,
  extrude: _extrude = 1,
  animate,
  ...restProps
}: Props) {
  const dataBreathGlowGradient = useLinearGradient({
    stops: [[0, '#42b6ff'], [1, '#2be8aa']],
    from,
    to,
  });

  const extrude = Number(_extrude);
  const morphRadius = Math.abs(extrude);
  const morphMode = extrude >= 0 ? 'dilate' : 'erode';

  return (
    <filter
      x="-100%" y="-100%"
      width="300%" height="300%"
      filterUnits="objectBoundingBox"
      primitiveUnits="userSpaceOnUse"
      {...restProps}
    >
      <feImage
        href={dataBreathGlowGradient}
        preserveAspectRatio="xMidYMid slice"
        result="gradient"
      />

      <feMorphology
        in="SourceGraphic"
        operator={morphMode}
        radius={morphRadius}
      />

      <feComposite
        in="gradient"
        operator="atop"
      />

      <feGaussianBlur
        stdDeviation={stdDeviation}
      >
        {animate ?? (
          <animate
          attributeName="stdDeviation"
          values={`${stdDeviation};${stdDeviationMax};${stdDeviation}`}
          dur={`${duration}ms`}
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0;0.5;1"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
        />)}
      </feGaussianBlur>

      <feComponentTransfer>
        <feFuncA type="linear" slope={strength} />
      </feComponentTransfer>

      <feMerge>
        <feMergeNode in="blurred" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  );
}