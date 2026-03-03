import useLinearGradient, { UseLinearGradientProps } from "@site/src/utils/useLinearGradient";
import React, { Children, isValidElement } from "react";

interface Props extends
Omit<React.SVGAttributes<SVGFilterElement>, 'from' | 'to'>,
Partial<UseLinearGradientProps> {
  children?: React.ReactElement<React.JSX.IntrinsicElements['stop']>[];
}

export default function SvgRecolorLinearGradientFilter({
  children,
  from,
  to,
  stops: _stops,
  ...restProps
}: Props) {
  const stops = _stops ?? Children
    .toArray(children)
    .filter((child) => isValidElement(child) && child.type === 'stop')
    .map((child: React.ReactElement<React.JSX.IntrinsicElements['stop']>) => [Number(child.props.offset), child.props.stopColor]);

  const dataGradient = useLinearGradient({
    stops,
    from,
    to,
  });

  return (
    <filter {...restProps}>
      <feImage
        href={dataGradient}
        result="gradient"
      />

      <feComposite
        in="gradient"
        in2="SourceGraphic"
        operator="atop"
      />
    </filter>
  );
}