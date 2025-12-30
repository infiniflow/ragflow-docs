import { ThemeClassNames } from '@docusaurus/theme-common';
import { isActiveSidebarItem } from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';
import isInternalUrl from '@docusaurus/isInternalUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';
import type { Props } from '@theme/DocSidebarItem/Link';
import { cn } from '@site/src/utils/twUtils';
import DocSidebarItemIcon from '@site/src/components/DocSidebarItemIcon';

export default function DocSidebarItemLink({
  item,
  onItemClick,
  activePath,
  level,
  index,
  ...props
}: Props) {
  const { href, label, className, autoAddBaseUrl } = item;
  const isActive = isActiveSidebarItem(item, activePath);
  const isInternalLink = isInternalUrl(href);

  return (
    <li
      key={label}
      className={cn(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        'mt-4 first:mt-0',
        className,
      )}
    >
      <Link
        className={cn(
          'flex items-center flex-1 leading-tight',
          level === 1 ? 'py-2' : 'py-1',
          level > 1 && 'border-0 border-l-1 border-solid border-transparent hover:border-theme-black focus:border-theme-black',
          isActive && 'text-standard border-theme-black',
        )}
        style={level > 1 ? { paddingLeft: `calc(var(--ragflow-sidebar-nesting-padding) * ${level - 1})`} : undefined}
        autoAddBaseUrl={autoAddBaseUrl}
        aria-current={isActive ? 'page' : undefined}
        to={href}
        {...(isInternalLink && {
          onClick: onItemClick ? () => onItemClick(item) : undefined,
        })}
        title={label}
        {...props}
      >
        <DocSidebarItemIcon item={item} />
        <span className="line-clamp-2">{label}</span>

        {!isInternalLink && <IconExternalLink />}
      </Link>
    </li>
  );
}
