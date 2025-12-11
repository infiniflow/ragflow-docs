import Icon from "@site/src/components/Icon";

export default function Blockquote({ children }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote className="relative px-12 py-6 border-0 bg-surface rounded-md text-secondary">
      <div className="contents pointer-events-none select-none text-disabled leading-none text-[1.5rem]">
        <Icon icon="LucideQuote" className="absolute left-3 top-4 rotate-180" />
        <Icon icon="LucideQuote" className="absolute right-3 bottom-4" />
      </div>

      {children}
    </blockquote>
  );
}