import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import type { Props } from '@theme/Tag';

import Icon from '@site/src/components/Icon';
import TagComponent from '@site/src/components/Tag';

export default function Tag({
  permalink,
  label,
  count,
  description,
}: Props): ReactNode {
  if (permalink) {
    return (
      <TagComponent
        as={Link}
        href={permalink}
        title={description}
        count={count}
        className="
          no-underline transition-colors
          text-secondary bg-secondary/10
          hover:bg-secondary/20 focus-visible:bg-secondary/20
          hover:text-standard focus-visible:text-standard"
        counterClassName="text-theme-white bg-current"
      >
        <Icon
          icon="LucideTag"
          className="flex-none mr-1"
        />

        {label}
      </TagComponent>
    );
  }

  return null;
}
