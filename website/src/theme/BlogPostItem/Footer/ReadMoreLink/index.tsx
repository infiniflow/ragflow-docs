import Translate, { translate } from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import type { Props } from '@theme/BlogPostItem/Footer/ReadMoreLink';
import Icon from '@site/src/components/Icon';

function ReadMoreLabel() {
  return (
    <b>
      <span>
        <Translate
          id="theme.blog.post.readMore"
          description="The label used in blog post item excerpts to link to full blog posts"
        >
          Read more
        </Translate>
      </span>

      <Icon icon="LucideArrowRight" className="stroke-[4]" />
    </b>
  );
}

export default function BlogPostItemFooterReadMoreLink(
  props: Props,
) {
  const { blogPostTitle, ...linkProps } = props;
  return (
    <Link
      className="
        leading-loose text-primary
        hover:text-primary-dark focus-visible:text-primary-dark
      "
      aria-label={translate(
        {
          message: 'Read more about {title}',
          id: 'theme.blog.post.readMoreLabel',
          description:
            'The ARIA label for the link to full blog posts from excerpts',
        },
        {title: blogPostTitle},
      )}
      {...linkProps}
    >
      <ReadMoreLabel />
    </Link>
  );
}
