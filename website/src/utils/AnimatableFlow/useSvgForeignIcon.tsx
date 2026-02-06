import { useId, useRef } from "react";
import SvgForeignIcon from "../visual-effects/SvgForeignIcon";
import { UseElementHookReturn } from "./types";



export function useSvgForeignIcon(props: React.ComponentProps<typeof SvgForeignIcon>): UseElementHookReturn<typeof SvgForeignIcon> {
  const id = useId();
  const ref = useRef<SVGElement>(null);

  const element = (
    <SvgForeignIcon
      id={id}
      ref={ref}
      {...props}
    />
  )

  return {
    props,
    id,
    cssId: `#${id}`,
    href: `url(#${id})`,
    element,
    ref,
  };
};