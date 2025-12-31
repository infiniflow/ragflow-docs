import { useId } from "react";

interface Props extends React.SVGAttributes<SVGCircleElement> {
  id?: string;
  thickness?: string | number;
}

export default function SvgRippleCircle({
  id: propsId,
  begin = '0',
  dur = '5',
  r = 300,
  keySplines = '.2 .3 .5 1',
  opacity = 1,
  thickness = 8,
  ...restProps
}: Props) {
  const _id = useId();
  const id = propsId ?? _id;

  const filterInnerGlow = `${id}FilterInnerGlow`;
  const animRippleExpand = `${id}AnimRippleExpand`;

  return (
    <>
      <defs>
        <filter id={filterInnerGlow}>
          <feFlood
            floodColor="black"
            floodOpacity="0"
            result="transparent"
          />

          <feMorphology
            in="SourceGraphic"
            operator="erode"
            radius={thickness}
          />

          <feComposite
            in2="SourceGraphic"
            operator="xor"
          />

          <feGaussianBlur
            stdDeviation={thickness}
            result="blurred"
          />

          <feComposite
            in="blurred"
            in2="SourceAlpha"
            operator="in"
          />

          <feComponentTransfer>
            <feFuncA type="linear" slope="1">
              <animate
                attributeName="slope"
                values={`${opacity};0`}
                dur={dur}
                begin={`${animRippleExpand}.begin`}
              />
            </feFuncA>
          </feComponentTransfer>

          <feBlend
            in="transparent"
            mode="screen"
          />
        </filter>
      </defs>

      <circle
        cx="0" cy="0" r="0"
        filter={`url(#${filterInnerGlow})`}
        fill="rgb(var(--ragflow-color-primary))"
        {...restProps}
      >
        <animate
          id={animRippleExpand}
          attributeName="r"
          values={`0;${r}`}
          dur={dur}
          begin={begin ?? `${animRippleExpand}.begin`}
          calcMode="spline"
          keyTimes="0;1"
          keySplines={keySplines}
        />
      </circle>
    </>
  );
}