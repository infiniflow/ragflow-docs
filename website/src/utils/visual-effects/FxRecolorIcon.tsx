import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

import { combineRefs } from '@site/src/utils';

import SvgRecolorLinearGradientFilter from './SvgRecolorLinearGradientFilter';

type Props = Omit<React.ComponentProps<typeof SvgRecolorLinearGradientFilter>, 'children'>
& {
  children: React.ReactNode;
};

export default function FxRecolorIcon({
  children,

  from,
  to,
  stops,
}: Props) {
  const filterId = useId();

  if (!Children.only(children) || !isValidElement(children)) {
    throw new Error('FxRecolorIcon must have exactly one valid child');
  }

  const iconRef = useRef<SVGGraphicsElement | HTMLDivElement>(null);
  const [[width, height], setComputedIconSize] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const icon = iconRef.current;

    if (icon) {
      console.log(icon);

      // @ts-ignore
      const {
        width: iw,
        height: ih,
      } = icon.getBoundingClientRect();

      setComputedIconSize([iw, ih]);
    }
  }, []);

  return (
    <svg
      width={width}
      height={height}
    >
      <SvgRecolorLinearGradientFilter
        id={filterId}
        from={from}
        to={to}
        stops={stops}
      />

      <g filter={`url(#${filterId})`}>
        <foreignObject
          x={0} y={0}
          width={width}
          height={height}
        >
          {cloneElement(
            children,
            {
              // @ts-ignore
              ref: combineRefs(children.ref, iconRef),
              // @ts-ignore
              ...children.props ?? {},
            },
            // @ts-ignore
            children.props?.children,
          )}
        </foreignObject>
      </g>
    </svg>
  )
}