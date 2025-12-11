import { cn } from "@site/src/utils/twUtils";
import { Children, isValidElement } from "react";

type Props<As extends React.ElementType = any> = {
  as?: As;
  style?: React.CSSProperties;
  className?: string;
  size?: number | string;
  interactive?: boolean;
  glowOnInteract?: boolean;
} & Omit<React.ComponentPropsWithoutRef<As>, 'as' | 'style' | 'className' | 'size' | 'interactive'>;

const INTERACTIVE_ELEMENTS = [
  'button', 'a', 'input', 'textarea', 'select'
];

export default function FxGlowEffect<As extends React.ElementType = 'span'>(props: Props<As>) {
  const {
    as: AsComponent = 'span',
    style,
    children,
    className,
    size = 0,
    interactive: _interactive,
    glowOnInteract = false,
    ...restProps
  } = props;

  const interactive: boolean = _interactive
    ?? Children
      .toArray(children)
      .reduce((acc, child) => acc || (isValidElement(child) && INTERACTIVE_ELEMENTS.includes(child.type as string)), false);

  const sizeCalculable = typeof size === 'number' || !isNaN(size as any);
  const sanitizedSize = sizeCalculable
    ? `${size}px`
    : size;

  return (
    <AsComponent
      {...(restProps as any)}
      className={cn(
        className,
        'ragflow-fx-root',
        'inline-block relative',
        'before:content-[""] before:absolute before:-z-1',
        'before:-inset-[var(--fx-glow-size)] before:opacity-50 before:blur',
        'before:bg-gradient-to-b before:transition-opacity before:duration-slow',
        interactive && (glowOnInteract ? 'before:opacity-0' : 'before:opacity-50'),
        interactive && 'hover:before:opacity-100 focus-within:before:opacity-100',
      )}
      style={{
        ...style,
        '--fx-glow-size': sanitizedSize,
        '--tw-gradient-from': '#42b6ff var(--tw-gradient-from-position)',
        '--tw-gradient-to': '#2be8aa var(--tw-gradient-to-position)',
        '--tw-gradient-stops': 'var(--tw-gradient-from), var(--tw-gradient-to)',
      } as React.CSSProperties}
    >
      {children}
    </AsComponent>
  )
}