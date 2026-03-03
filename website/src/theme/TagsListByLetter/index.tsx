import { listTagsByLetters, type TagLetterEntry } from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';

import type { Props } from '@theme/TagsListByLetter';
import Heading from '@theme/Heading';
import Tag from '@site/src/components/Tag';

function TagLetterEntryItem({ letterEntry }: {letterEntry: TagLetterEntry}) {
  return (
    <article className="contents">
      <Heading
        as="h2"
        id={letterEntry.letter}
        className="m-0"
      >
        {letterEntry.letter}
      </Heading>

      <ul className="mt-0.5 list-none m-0 p-0 flex flex-row flex-wrap gap-2">
        {letterEntry.tags.map((tag) => (
          <li key={tag.permalink} className="m-0 p-0">
            <Link
              to={tag.permalink}
              className="no-underline"
            >
              <Tag
                className="transition-colors text-secondary hover:text-standard focus:text-standard"
                count={<span className="text-theme-white">{tag.count}</span>}
                counterClassName="inline-flex justify-center items-center min-w-5 rounded-sm bg-current transition-colors px-1 py-0.5 pt-1 leading-none"
              >
                {tag.label}
              </Tag>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function TagsListByLetter({tags}: Props) {
  const letterList = listTagsByLetters(tags);
  return (
    <section className="my-12 grid grid-cols-[auto_1fr] gap-x-4 gap-y-8">
      {letterList.map((letterEntry) => (
        <TagLetterEntryItem
          key={letterEntry.letter}
          letterEntry={letterEntry}
        />
      ))}
    </section>
  );
}
