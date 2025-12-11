import React, { type ReactNode } from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import type {Props} from '@theme/AnnouncementBar/Content';
import styles from './styles.module.css';
import { cn } from '@site/src/utils/twUtils';

export default function AnnouncementBarContent(props: Props): ReactNode {
  const { announcementBar } = useThemeConfig();
  const { content } = announcementBar!;
  return (
    <div
      {...props}
      className={cn('text-sm text-center [&_a]:underline', props.className)}
      // Developer provided the HTML, so assume it's safe.
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{__html: content }}
    />
  );
}
