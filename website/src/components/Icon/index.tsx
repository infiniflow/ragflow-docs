import React, { forwardRef } from 'react';
import { cn } from '@site/src/utils/twUtils';

import * as LucideIcons from 'lucide-react';
import * as SimpleIcons from '@icons-pack/react-simple-icons';
import * as RagflowIcons from '@site/src/lib/ragflow-icons';

type SimpleIconName<T = keyof typeof SimpleIcons> = T extends `Si${infer U}`
  ? (U extends `${infer _}Hex` ? never : (T | U))
  : never;

type LucideIconName = Exclude<keyof typeof LucideIcons, 'icons' | 'Icon'>;
type RagflowIconName = keyof typeof RagflowIcons;

export type IconName = SimpleIconName | LucideIconName | RagflowIconName;

export interface Props {
  icon: IconName;
  fallback?: React.ReactNode;
}

const NAMESPACES = [
  ['Si', SimpleIcons, 'simple-icon'],
  ['Lucide', LucideIcons, 'lucide'],
  ['Rag', RagflowIcons, 'ragflow-icon'],
] as const;

/**
 * Generic icon component
 *
 * Rendering an icon with Simple Icons, Lucide, and RAGFlow Icons (iconfont).
 * Better with `Si` or `Lucide` or `Rag` namespace to explicitly specify the icon source,
 * otherwise, it will find the icon in the following order:
 *  1. Ragflow Icons
 *  2. Simple Icons
 *  3. Lucide
 *
 * It will render nothing if the icon name is not found in any library.
 *
 * @example
 * <Icon icon="RagAgent" />
 * <Icon icon="SiYoutube" />
 * <Icon icon="LucideArrowRight" />
 * <Icon icon="ArrowRight" /> // Simple Icons library doesn't have `ArrowRight`, fallback to Lucide
 * <Icon icon="Oops" /> // Renders nothing
 */
export default forwardRef(function Icon(
  {
    children,
    icon,
    className,
    ...restProps
  }: Props & React.SVGAttributes<SVGElement>,
  ref: React.ForwardedRef<SVGElement>
) {
  if (!icon) {
    return children;
  }

  const [[IconComponent, libraryClassName] = []] = NAMESPACES
    .map(([ns, library, lc]) => {
      return [
        (icon.startsWith(ns)
          // Prefixed, direct match
          ? library[icon]
          // Find prefixed first, then fallback to unprefixed
          : (library[`${ns}${icon}`] ?? library[icon])
        ) as React.ComponentType<React.SVGAttributes<SVGElement>>,
        lc,
      ] as const
    })
    .filter(([C]) => C)
    ?? [];

  return IconComponent
  ? (
      <IconComponent
        // @ts-ignore
        ref={ref}
        className={cn('icon stroke-[1.5]', libraryClassName, className)}
        {...restProps}
      />
    )
    : children;
})