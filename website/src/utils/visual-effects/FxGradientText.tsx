type DirectionHorizontal = 'left' | 'right';
type DirectionVertical = 'top' | 'bottom';
type Direction = DirectionHorizontal | DirectionVertical | `${DirectionHorizontal} ${DirectionVertical}` | `${DirectionVertical} ${DirectionHorizontal}`;

const DIRECTIONS: Direction[] = [
  'left',
  'right',
  'top',
  'bottom',
  'left top',
  'left bottom',
  'right top',
  'right bottom',
  'top left',
  'top right',
  'bottom left',
  'bottom right',
];

type Props = React.HTMLAttributes<HTMLSpanElement> & {
  from?: string;
  via?: string;
  to?: string;
  direction?: Direction | number;
  preset?: 'primary' | 'text' | 'primary info',
}

const PRESET_GRADIENT_MAP: Record<Props['preset'], [string?, string?, string?]> = {
  'primary': [
    'rgb(var(--ragflow-color-primary))',
    null,
    '#42ffa4',
  ],
  'primary info': [
    'rgb(var(--ragflow-color-primary))',
    null,
    'rgb(var(--ragflow-color-info))',
  ],
  'text': [
    'rgb(var(--ragflow-theme-black))',
    null,
    '#9dbab8',
  ],
};

function FxGradientText({
  children,
  from: _from,
  via: _via,
  to: _to,
  direction: _direction = 'bottom',
  preset = 'primary',
  style,
  ...restProps
}: React.PropsWithChildren<Props>) {
  const direction = typeof _direction === 'number'
    ? `${_direction}deg`
    : DIRECTIONS.includes(_direction)
      ? `to ${_direction}`
      : _direction;

  const [
    from = _from,
    via = _via,
    to = _to,
  ] = PRESET_GRADIENT_MAP[preset] ?? []

  const stops = [from, via, to, via, from].filter(Boolean);

  return (
    <span
      {...restProps}
      style={{
        ...(style ?? {}),
        color: 'transparent',
        backgroundClip: 'text',
        backgroundSize: '200% 200%',
        backgroundImage: `linear-gradient(${direction}, ${stops.join(', ')})`,
      }}
    >
      {children}
    </span>
  );
}

export default FxGradientText;