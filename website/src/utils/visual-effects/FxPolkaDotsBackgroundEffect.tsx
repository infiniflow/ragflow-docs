type Props<As extends React.ElementType> = PropsWithAs<{
  as?: As;
  color?: string;
  size?: number | string;
  spacing?: number | string;
}, As>;

export default function FxPolkaDotsBackgroundEffect<As extends React.ElementType = 'div'>(props: Props<As>) {
  const {
    as: AsComponent = 'div',
    children,
    style,
    color = 'var(--ragflow-border-component)',
    size: _size = 1,
    spacing: _spacing = 20,
    ...restProps
  } = props;

  const size = typeof _size === 'number' || isFinite(_size as any)
    ? `${_size}px`
    : _size;

  const spacing = typeof _spacing === 'number' || isFinite(_spacing as any)
    ? `${_spacing}px`
    : _spacing;

  return (
    <AsComponent
      {...restProps}
      style={{
        ...(style ?? {}),
        backgroundImage: `radial-gradient(${color} ${size}, transparent ${size})`,
        backgroundSize: `${spacing} ${spacing}`,
      }}
    >
      {children}
    </AsComponent>
  )
};

