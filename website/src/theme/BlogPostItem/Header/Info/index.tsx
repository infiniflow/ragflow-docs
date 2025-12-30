import { translate } from '@docusaurus/Translate';
import { usePluralForm } from '@docusaurus/theme-common';
import { useDateTimeFormat } from '@docusaurus/theme-common/internal';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import type { Props } from '@theme/BlogPostItem/Header/Info';
import { cn } from '@site/src/utils/twUtils';
import TagsListInline from '@site/src/theme/TagsListInline';

// Very simple pluralization: probably good enough for now
function useReadingTimePlural() {
  const { selectMessage } = usePluralForm();
  return (readingTimeFloat: number) => {
    const readingTime = Math.ceil(readingTimeFloat);
    return selectMessage(
      readingTime,
      translate(
        {
          id: 'theme.blog.post.readingTime.plurals',
          description:
            'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: 'One min read|{readingTime} min read',
        },
        { readingTime },
      ),
    );
  };
}

function DateTime({
  date,
  formattedDate,
}: {
  date: string;
  formattedDate: string;
}) {
  return <time dateTime={date}>{formattedDate}</time>;
}

export default function BlogPostItemHeaderInfo({className}: Props) {
  const { metadata, isBlogPostPage } = useBlogPost();
  const { date, readingTime, tags } = metadata;
  const readingTimePlural = useReadingTimePlural();

  const dateTimeFormat = useDateTimeFormat({
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });

  const formatDate = (blogDate: string) =>
    dateTimeFormat.format(new Date(blogDate));

  const tagsExists = tags.length > 0;

  return (
    <>
      <div className={cn('text-sm leading-none text-secondary', className)}>
        <DateTime date={date} formattedDate={formatDate(date)} />

        {typeof readingTime !== 'undefined' && (
          <span className="before:content-['·'] before:mx-2">
            {readingTimePlural(readingTime)}
          </span>
        )}
      </div>

      {isBlogPostPage && tagsExists && (
        <div className="mt-4">
          <TagsListInline tags={tags} />
        </div>
      )}
    </>
  );
}
