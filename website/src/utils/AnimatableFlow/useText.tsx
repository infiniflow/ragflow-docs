import { useId, useRef } from "react";
import { UseElementHookReturn } from "./types";

interface UseTextHookProps extends React.SVGAttributes<SVGTextElement> {

}

interface UseTextHookReturn extends
  UseElementHookReturn<SVGTextElement>
{
}

export function useText(props: UseTextHookProps): UseTextHookReturn {
  const {
    id: propId,
    children,
    x = 0,
    y = 0,
    textAnchor = 'start',
    dominantBaseline = 'middle',
    className: className,
    ...textRestProps
  } = props ?? {};

  const _id = useId();
  const ref = useRef<SVGElement>(null);
  const id = propId ?? _id;

  const element = (
    <text
      {...textRestProps}
      id={id}
      ref={ref as React.RefObject<SVGTextElement>}
    >
      {children}
    </text>
  );

  return {
    textContent,
    textClassName,
    textRestProps,
  };
}