import { cn } from '@site/src/utils/twUtils';

type Props<As extends React.ElementType> = PropsWithAs<{
  count?: React.ReactNode;
  counterClassName?: string;
}, As>;

export default function Tag<As extends React.ElementType = 'span'>(props: Props<As>) {
  const {
    as: AsComponent = 'span',
    count,
    children,
    className,
    counterClassName,
    ...restProps
  } = props;

  return (
    <AsComponent
      {...restProps}
      className={cn(
        'group/tag',
        'px-2 py-1 text-sm text-nowrap leading-none rounded-md',
        className,
        count ? 'flex items-center' : 'inline-block'
      )}
    >
      {children}

      {count && (
        <span
          className={cn(
            'text-[.85em] ml-2 px-1.5 py-1 rounded',
            counterClassName,
          )}
        >
          {count}
        </span>
      )}
    </AsComponent>
  )
}