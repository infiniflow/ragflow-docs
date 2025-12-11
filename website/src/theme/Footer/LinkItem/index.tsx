import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import isInternalUrl from '@docusaurus/isInternalUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';
import type { Props } from '@theme/Footer/LinkItem';
import Icon, { type IconName } from '@site/src/components/Icon';

export default function FooterLinkItem({ item }: Props) {
  const {
    to,
    href,
    label,
    prependBaseUrlToHref,
    className,
    icon,
    ...props
  } = item;
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, {forcePrependBaseUrl: true});

  return (
    <Link
      className={className}
      {...(href
        ? { href: prependBaseUrlToHref ? normalizedHref : href }
        : { to: toUrl }
      )}
      {...props}
    >
      {icon && <Icon icon={icon as IconName} className="mr-2" />}
      {label}
      {/* Cancel out the external link icon here */}
      {/* {href && !isInternalUrl(href) && <IconExternalLink />} */}
    </Link>
  );
}
