type GradientPosition = 'top' | 'right' | 'bottom' | 'left' | 'top-right' | 'bottom-right' | 'bottom-left' | 'top-left';

interface Props extends
Omit<React.SVGAttributes<SVGLinearGradientElement>, 'from' | 'to'> {
  from?: GradientPosition;
  to?: GradientPosition;
}

const GRADIENT_POSITION_MAP: Record<GradientPosition, [number, number]> = {
  'top': [.5, 0],
  'right': [1, .5],
  'bottom': [.5, 1],
  'left': [0, .5],
  'top-left': [0, 0],
  'top-right': [1, 0],
  'bottom-right': [1, 1],
  'bottom-left': [0, 1],
};

export default function SvgLinearGradient({
  children,
  x1: _x1,
  y1: _y1,
  x2: _x2,
  y2: _y2,
  from: _from,
  to: _to = 'bottom',
  ...restProps
}: Props) {

  let [x2, y2] = typeof _to === 'string'
    ? GRADIENT_POSITION_MAP[_to]
    : _to;

  let [x1, y1] = _from
    ? typeof _from === 'string'
      ? GRADIENT_POSITION_MAP[_from]
      : _from
    : [1 - x2, 1 - y2];

  return (
    <linearGradient
      x1={x1} y1={y1}
      x2={x2} y2={y2}
      {...restProps}
    >
      {children}
    </linearGradient>
  );
}