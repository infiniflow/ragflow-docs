import React, {type ReactNode} from 'react';
import Translate from '@docusaurus/Translate';
import {ThemeClassNames} from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import IconEdit from '@theme/Icon/Edit';
import type {Props} from '@theme/EditThisPage';

export default function EditThisPage({editUrl}: Props): ReactNode {
  return (
    <Link to={editUrl} className={ThemeClassNames.common.editThisPage}>
      <IconEdit />

      <span>
        <Translate
          id="theme.common.editThisPage"
          description="The link label to edit the current page">
          Edit this page
        </Translate>
      </span>
    </Link>
  );
}
