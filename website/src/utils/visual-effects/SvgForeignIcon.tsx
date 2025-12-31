import { partition } from "lodash-es";
import { Children, isValidElement } from "react";

import Icon, { type IconName } from "@site/src/components/Icon";

const ANIMATE_ELEMENTS = ['animate', 'animateMotion', 'animateTransform', 'set'];

interface Props extends React.SVGAttributes<SVGForeignObjectElement> {
  size?: number;
  icon?: IconName;
  iconId?: string;
  iconClassName?: string;
}

export default function SvgForeignIcon({
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
}: Props) {
  const [animateChildren, children] = partition(
    Children.toArray(_children),
    (child) => isValidElement(child) && ANIMATE_ELEMENTS.includes(child.type as string),
  );

  return (
    <g
      id={id}
      {...restProps}
    >
      <foreignObject
        x={x ?? (-size / 2)} y={y ?? (-size / 2)}
        width={width ?? size} height={height ?? size}
      >
        {children.length
          ? children
          : (
            <Icon
              id={iconId}
              className={iconClassName}
              icon={icon}
              style={{
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
}