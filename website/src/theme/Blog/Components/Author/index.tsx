import Link, {type Props as LinkProps} from '@docusaurus/Link';
import type {Props} from '@theme/Blog/Components/Author';
import { cn } from '@site/src/utils/twUtils';

function MaybeLink(props: LinkProps) {
  return props.href
    ? (<Link {...props} />)
    : props.children;
}

// Note: in the future we might want to have multiple "BlogAuthor" components
// Creating different display modes with the "as" prop may not be the best idea
// Explainer: https://kyleshevlin.com/prefer-multiple-compositions/
// For now, we almost use the same design for all cases, so it's good enough
export default function BlogAuthor({
  as,
  author,
  className,
  count,
}: Props) {
  const { name, title, url, imageURL, email, page } = author;
  const link = page?.permalink || url || (email && `mailto:${email}`) || undefined;

  return (
    <div
      className={cn(
        'flex items-center gap-3',
        className,
      )}>
      {imageURL && (
        <MaybeLink href={link}>
          <img
            className="block size-12 rounded-full overflow-hidden"
            src={imageURL}
            alt={name}
          />
        </MaybeLink>
      )}

      {(name || title) && (
        <div>
          <div>
            {name && (
              <MaybeLink href={link}>
                <span className="text-base" translate="no">
                  {name}
                </span>
              </MaybeLink>
            )}

            {count !== undefined && (
              <span className="ml-1 px-1.5 py-0.5 bg-surface rounded text-standard text-xs">{count}</span>
            )}
          </div>

          {title && (
            <small className="leading-none text-xs line-clamp-1" title={title}>
              {title}
            </small>
          )}

          {/* Cancelled out author social links */}
          {/* <AuthorSocials author={author} /> */}
        </div>
      )}
    </div>
  );
}
