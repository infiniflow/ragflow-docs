import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {translate} from '@docusaurus/Translate';
import IconClose from '@theme/Icon/Close';
import type {Props} from '@theme/AnnouncementBar/CloseButton';

export default function AnnouncementBarCloseButton(props: Props): ReactNode {
  return (
    <button
      type="button"
      aria-label={translate({
        id: 'theme.AnnouncementBar.closeButtonAriaLabel',
        message: 'Close',
        description: 'The ARIA label for close button of announcement bar',
      })}
      {...props}
      className={clsx('clean-btn px-4 py-0 flex items-center', props.className)}
    >
      <IconClose />
    </button>
  );
}
