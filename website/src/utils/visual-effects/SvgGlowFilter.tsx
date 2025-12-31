interface Props extends React.SVGAttributes<SVGFilterElement> {
  extrude?: string | number;
  colorMatrix?: string | false;
}

export default function SvgGlowFilter({
  extrude = 1,
  stdDeviation = 4,
  colorMatrix = '5 0 0 0 .2 0 5 0 0 .2 0 0 5 0 .2 0 0 0 .5 0',
  ...restProps
}: Props) {
  const _extrude = typeof extrude === 'number' ? extrude : Number(extrude);
  const morphRadius = Math.abs(_extrude);
  const morphOperator = _extrude >= 0 ? 'dilate' : 'erode';

  return (
    <filter
      x="-100%" y="-100%"
      width="300%" height="300%"
      filterUnits="objectBoundingBox"
      primitiveUnits="userSpaceOnUse"
      {...restProps}
    >
      {_extrude !== 0 && (
        <feMorphology
          in="SourceGraphic"
          operator={morphOperator}
          radius={morphRadius}
        />
      )}

      <feGaussianBlur
        stdDeviation={stdDeviation}
      />

      {colorMatrix && (
        <feColorMatrix
          type="matrix"
          values={colorMatrix}
        />
      )}

      <feBlend
        in2="SourceGraphic"
        mode="lighten"
      />
    </filter>
  );
}