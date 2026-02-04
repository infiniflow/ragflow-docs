import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import SvgForeignIcon from "../visual-effects/SvgForeignIcon";
import type { UseElementHookReturn } from "./types";
import { cn } from "../twUtils";

interface UseBoxHookProps extends React.SVGAttributes<SVGRectElement> {
  icon?: React.ComponentProps<typeof SvgForeignIcon>;
  variant?: 'default' | 'transparent';
  padding?: number | [number, number] | [number, number, number] | [number, number, number, number];
  text?: string | (React.SVGAttributes<SVGTextElement> & { textContent: string });
  textClassName?: string;
  flow?: 'row' | 'column';
  gap?: number;
}

interface UseBoxHookReturn extends
  UseElementHookReturn<SVGGElement>
{
  icon?: UseElementHookReturn<typeof SvgForeignIcon>;
  text?: UseElementHookReturn<'text'>;
}

export function useBox(props: UseBoxHookProps): UseBoxHookReturn {
  const {
    x: _x = 0,
    y: _y = 0,
    width: _w = 0,
    height: _h = 0,
    padding: _padding = 0,
    rx: _rx,
    ry: _ry,
    r,
    icon: _icon,
    variant = 'default',
    text: _text,
    flow = 'row',
    gap = 4,
    ...restProps
  } = props ?? {};

  const id = useId();
  const ref = useRef<SVGGElement>(null);
  const contentRef = useRef<SVGGElement>(null);

  const [
    [x, y, w, h],
    setDimensions,
  ] = useState([props.x ?? 0, props.y ?? 0, props.width ?? 0, props.height ?? 0]);

  const paddingTop = typeof _padding === 'number' ? _padding : _padding[0] ?? 0;
  const paddingRight = typeof _padding === 'number' ? _padding : _padding[1] ?? 0;
  const paddingBottom = typeof _padding === 'number' ? _padding : (_padding[2] ?? paddingTop);
  const paddingLeft = typeof _padding === 'number' ? _padding : (_padding[3] ?? paddingRight);

  useEffect(() => {
    const $content = contentRef.current;

    if ($content) {
      const { x, y, width, height } = $content.getBBox();

      setDimensions([
        x - paddingLeft,
        y - paddingTop,
        width + paddingLeft + paddingRight,
        height + paddingTop + paddingBottom,
      ]);
    }
  }, [
    x, y, w, h,
    paddingTop, paddingRight, paddingBottom, paddingLeft,
  ]);

  const rx = _rx ?? r ?? 0;
  const ry = _ry ?? r ?? 0;

  let icon = null;
  let text = null;

  if (_icon) {
    const iconId = `${id}:icon`;
    const iconElement = (
      <SvgForeignIcon
        {..._icon}
        iconId={iconId}
      />
    );

    icon = {
      props: _icon,
      id: iconId,
      cssId: `#${iconId}`,
      href: `url(#${iconId})`,
      element: iconElement,
    };
  }

  if (_text != null) {
    const {
      children: textChildren,
      textContent,
      className: textClassName,
      ...textRestProps
    } = typeof _text === 'string' ? { textContent: _text } : _text;

    if (textContent !== '') {
      const textId = `${id}:text`;
      const textAnchor = flow === 'row' ? 'start' : 'middle';
      const textX = icon && flow === 'row'
        ? (icon?.props?.size ?? 0) / 2 + gap
        : 0;
      const textY = icon && flow === 'column'
        ? (icon?.props?.size ?? 0) / 2 + gap
        : 0;

      const textElement = (
        <text
          {...textRestProps}
          id={textId}
          x={textX} y={textY}
          textAnchor={textAnchor}
          dominantBaseline={flow === 'row' ? 'middle' : 'hanging'}
          className={cn('text-sm leading-none', textClassName)}
        >
          {textChildren ?? textContent}
        </text>
      );

      text = {
        props: {
          ...textRestProps,
          text,
          className: textClassName,
        },
        id: textId,
        cssId: `#${textId}`,
        href: `url(#${textId})`,
        element: textElement,
      };
    }
  }

  const hasFill = variant === 'default';
  const hasStroke = variant === 'default';

  let element = (
    <g ref={ref}>
      <g transform={`translate(${_x}, ${_y})`}>
        <rect
          x={x} y={y}
          width={w} height={h}
          rx={rx} ry={ry}
          {...restProps}
          id={id}
          fill={hasFill ? 'rgb(var(--ctxlink-bg-standard))' : undefined}
          stroke={hasStroke ? 'var(--ctxlink-border-component)' : undefined}
          strokeWidth={hasStroke ? 'var(--ctxlink-global-border-width)' : undefined}
        />

        <g ref={contentRef}>
          {icon?.element}
          {text?.element}
        </g>
      </g>
    </g>
  );

  return {
    props: {
      x,
      y,
      width: _w,
      height: _h,
      rx,
      ry,
      ...restProps
    },
    id,
    cssId: `#${id}`,
    href: `url(#${id})`,
    element,
    icon,
    text,
    ref,
  };
}