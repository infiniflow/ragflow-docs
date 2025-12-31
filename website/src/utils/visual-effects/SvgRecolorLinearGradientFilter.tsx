import useLinearGradient, { UseLinearGradientProps } from "@site/src/utils/useLinearGradient";
import React, { Children, isValidElement } from "react";

interface Props extends
Omit<React.SVGAttributes<SVGFilterElement>, 'from' | 'to'>,
Omit<UseLinearGradientProps, 'stops'> {
  children?: React.ReactElement<React.JSX.IntrinsicElements['stop']>[];
}

export default function SvgRecolorGradientFilter({
  children,
  from,
  to,
  ...restProps
}: Props) {
  const stops = Children
    .toArray(children)
    .filter((child) => isValidElement(child) && child.type === 'stop')
    .map((child: React.ReactElement<React.JSX.IntrinsicElements['stop']>) => [Number(child.props.offset), child.props.stopColor] as [number, string]);

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