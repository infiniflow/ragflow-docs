import { listTagsByLetters, type TagLetterEntry } from '@docusaurus/theme-common';
import Tag from '@theme/Tag';
import type {Props} from '@theme/TagsListByLetter';
import Heading from '@theme/Heading';

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
            <Tag {...tag} />
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
