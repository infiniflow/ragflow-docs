import React, {
  useRef,
  useState,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from 'react';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { useCollapsible, Collapsible } from '@docusaurus/theme-common';

import { cn } from '@site/src/utils/twUtils';
import Icon from '@site/src/components/Icon';

function isInSummary(node: HTMLElement | null): boolean {
  if (!node) {
    return false;
  }

  return node.tagName === 'SUMMARY' || isInSummary(node.parentElement);
}

function hasParent(node: HTMLElement | null, parent: HTMLElement): boolean {
  if (!node) {
    return false;
  }
  return node === parent || hasParent(node.parentElement, parent);
}

export type DetailsProps = {
  /**
   * Summary is provided as props, optionally including the wrapping
   * `<summary>` tag
   */
  summary?: ReactElement | string;
} & ComponentProps<'details'>;

/**
 * A mostly un-styled `<details>` element with smooth collapsing. Provides some
 * very lightweight styles, but you should bring your UI.
 */
export default function Details({
  summary,
  children,
  ...props
}: DetailsProps): ReactNode {
  useBrokenLinks().collectAnchor(props.id);

  const isBrowser = useIsBrowser();
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const {collapsed, setCollapsed} = useCollapsible({
    initialState: !props.open,
  });

  // Use a separate state for the actual details prop, because it must be set
  // only after animation completes, otherwise close animations won't work
  const [open, setOpen] = useState(props.open);

  const summaryContent = React.isValidElement(summary)
    ? summary.type === 'summary'
      ? (summary.props as any).children
      : summary
    : summary ?? 'Details';

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <details
      {...props}
      ref={detailsRef}
      open={open}
      data-collapsed={collapsed}
      className={cn(
        'rounded-md bg-surface overflow-hidden',
        isBrowser && 'is-browser',
        props.className,
      )}
      onMouseDown={(e) => {
        const target = e.target as HTMLElement;
        // Prevent a double-click to highlight summary text
        if (isInSummary(target) && e.detail > 1) {
          e.preventDefault();
        }
      }}
      onClick={(e) => {
        e.stopPropagation(); // For isolation of multiple nested details/summary
        const target = e.target as HTMLElement;
        const shouldToggle =
          isInSummary(target) && hasParent(target, detailsRef.current!);
        if (!shouldToggle) {
          return;
        }
        e.preventDefault();
        if (collapsed) {
          setCollapsed(false);
          setOpen(true);
        } else {
          setCollapsed(true);
          // Don't do this, it breaks close animation!
          // setOpen(false);
        }
      }}
    >
      <summary className="
        p-4 flex items-center cursor-pointer before:hidden
        transition-colors hover:bg-surface"
      >
        <Icon icon="LucideChevronRight" className="mr-3 transition-transform" />
        <span>{summaryContent}</span>
      </summary>

      <Collapsible
        lazy={false} // Content might matter for SEO in this case
        animation={{
          duration: 150,
          easing: 'ease-in-out',
        }}
        collapsed={collapsed}
        onCollapseTransitionEnd={(newCollapsed) => {
          setCollapsed(newCollapsed);
          setOpen(!newCollapsed);
        }}
      >
        <div className="px-4 pb-4">
          <div className="pt-4 border-0 border-t border-solid border-t-standard [&>*:last-child]:mb-0">
            {children}
          </div>
        </div>
      </Collapsible>
    </details>
  );
}