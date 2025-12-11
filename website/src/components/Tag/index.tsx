import { cn } from '@site/src/utils/twUtils';

type Props<C extends React.ElementType> = {
  as?: C;
  count?: number;
  className?: string;
  children?: React.ReactNode;
};

export default function Tag<C extends React.ElementType = 'span'>({
  as,
  count,
  children,
  className,
  ...restProps
}: Omit<React.ComponentPropsWithoutRef<C>, keyof Props<C>> & Props<C>) {
  const As = (as ?? 'span') as React.ElementType;

  return (
    <As
      {...restProps}
      className={cn(
        'px-2 py-1 text-sm text-nowrap leading-none',
        'rounded-md text-primary bg-primary/10',
        className,
        count
          ? 'flex items-center pr-1'
          : 'inline-block'
      )}
    >
      {children}

      {count && (
        <span
          className="
            text-[.85em] ml-2 px-1.5 py-1 rounded
            text-primary-contrast-foreground bg-standard/75"
        >
          {count}
        </span>
      )}
    </As>
  )
}