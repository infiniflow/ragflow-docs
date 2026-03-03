import Translate from '@docusaurus/Translate';
import Tag from '@theme/Tag';
import type { Props } from '@theme/TagsListInline';

export default function TagsListInline({tags}: Props) {
  return (
    <div className="flex">
      <ul className="
        list-none m-0 p-0 pt-0.5
        flex flex-wrap gap-2 text-sm"
      >
        {tags.map((tag) => (
          <li key={tag.permalink} className="m-0 p-0">
            <Tag {...tag} />
          </li>
        ))}
      </ul>
    </div>
  );
}
