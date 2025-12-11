import Icon from '@site/src/components/Icon';
import { cn } from '@site/src/utils/twUtils';
import React from 'react';

interface Props {
  className?: string;
  bodyClassName?: string;
  children: React.ReactNode;
  minHeight?: number;
  url: string;
}

export default function BrowserWindow({
  children,
  url = window.location.origin,
  className,
  bodyClassName,
}: Props) {
  return (
    <div className={cn('border-4 border-solid border-secondary-lightest bg-standard rounded-xl shadow-md mb-leading', className)}>
      <div className="w-full flex items-center gap-3 px-4 py-1 border-secondary-lightest bg-secondary-lightest border-b-4 border-solid">
        <div className="whitespace-nowrap inline-flex items-center gap-3">
          <span className="size-4 rounded-full bg-danger" />
          <span className="size-4 rounded-full bg-warning" />
          <span className="size-4 rounded-full bg-success" />
        </div>
        <div className="
          flex-1
          mx-2 px-4 py-2 leading-none rounded-full select-none
          text-sm text-secondary bg-standard
          text-ellipsis overflow-hidden whitespace-nowrap"
        >
          {url}
        </div>
        <div className="ml-auto">
          <Icon icon="LucideMenu" className="size-4 text-secondary-darkest" />
        </div>
      </div>

      <div className={cn("w-full p-4 bg-standard rounded-b-[inherit] [&>:last-child]:mb-0", bodyClassName)}>
        {children}
      </div>
    </div>
  );
}
