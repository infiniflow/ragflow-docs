import { partition } from "lodash-es";
import { Children, cloneElement, forwardRef, isValidElement, useEffect, useLayoutEffect, useRef, useState } from "react";

import Icon, { type IconName } from "@site/src/components/Icon";

const ANIMATE_ELEMENTS = ['animate', 'animateMotion', 'animateTransform', 'set'];

interface Props extends React.SVGAttributes<SVGForeignObjectElement> {
  size?: number;
  icon?: IconName;
  iconId?: string;
  iconClassName?: string;
}

const SvgForeignIcon = forwardRef(function SvgForeignIcon({
  children: _children,
  id,
  size,

  x,
  y,
  width,
  height,

  icon,
  iconId,
  iconClassName,
  ...restProps
}: Props, ref: React.ForwardedRef<SVGElement>) {
  const [animateChildren, children] = partition(
    Children.toArray(_children),
    (child) => isValidElement(child) && ANIMATE_ELEMENTS.includes(child.type as string),
  );

  const iconRef = useRef<SVGGraphicsElement | HTMLDivElement>(null);
  const [computedIconSize, setComputedIconSize] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const icon = iconRef.current;

    if (icon) {
      // @ts-ignore
      const {
        width: iw,
        height: ih,
      } = icon.getBoundingClientRect();

      setComputedIconSize([iw, ih]);
    }
  }, [width, height, size]);

  return (
    <g
      id={id}
      ref={ref as React.ForwardedRef<SVGGElement>}
      {...restProps}
    >
      <foreignObject
        x={x ?? (-size / 2)}
        y={y ?? (-size / 2)}
        width={width ?? size ?? computedIconSize[0]}
        height={height ?? size ?? computedIconSize[1]}
      >
        {children.length
          ? (children.length === 1 && isValidElement<React.ReactElement>(children[0])
            ? cloneElement(
              children[0],
              {
                // @ts-ignore
                ref: iconRef as React.RefObject<SVGElement>,
                ...children[0].props ?? {},
              },
              // @ts-ignore
              children[0].props?.children,
            )
            : (
              <div
                ref={iconRef as React.RefObject<HTMLDivElement>}
                className="size-fit"
              >
                {children}
              </div>
            )
          )
          : (
            <Icon
              ref={iconRef as React.RefObject<SVGElement>}
              id={iconId}
              className={iconClassName}
              icon={icon}
              style={{
                display: 'block',
                width: `${size}px`,
                height: `${size}px`,
                fontSize: `${size}px`,
              }}
            />
          )
        }
      </foreignObject>

      {animateChildren}
    </g>
  );
});

export default SvgForeignIcon;
