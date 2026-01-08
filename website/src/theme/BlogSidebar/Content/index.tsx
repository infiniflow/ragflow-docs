import React, { memo } from 'react';

import {
  Collapsible,
  useCollapsible,
} from '@docusaurus/theme-common';

import Translate from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import { usePluginData } from '@docusaurus/useGlobalData';
import { useLocation } from '@docusaurus/router';

import type { Props } from '@theme/BlogSidebar/Content';
import SearchBar from '@theme/SearchBar';

import Icon from '@site/src/components/Icon';
import Tag from '@site/src/components/Tag';


type FilterProps = {
  items: {
    permalink?: string;
    label?: string;
    items?: any[];
  }[];
  urlSearchKey?: string;
  label?: React.ReactNode;
}

function BlogFilter(props: FilterProps) {
  const {
    items,
    urlSearchKey,
    label,
  } = props;


  const { collapsed, setCollapsed } = useCollapsible({
    initialState: false,
  });

  const location = useLocation();

  if (!items?.length) {
    return null;
  }

  return (
    <div>
      <button
        className="group clean-btn w-full py-2 flex items-center text-base leading-tight text-standard font-medium"
        onClick={() => setCollapsed(!collapsed)}
        aria-expanded={!collapsed}
      >
        <div className="mr-2">
          {label}
        </div>

        <Icon icon="LucideChevronRight" className="ml-auto transition-transform group-aria-expanded:rotate-90" />
      </button>

      <div className="ml-2 border-0 border-l-1 border-solid border-standard">
        <Collapsible
          lazy={false}
          as="ul"
          className="list-none block m-0 p-0 mt-2 -ml-px py-2"
          collapsed={collapsed}
          animation={{
            duration: 150,
            easing:  'ease-out',
          }}
        >
          {items.map((item) => {
            const search = new URLSearchParams(location.search);

            if (urlSearchKey) {
              search.set(urlSearchKey, item.label);
            }

            const searchString = search.toString();

            // Take care of search string in the URL
            const targetTo = `${item.permalink || location.pathname}${searchString ? `?${searchString}` : ''}`;

            return (
              <li
                key={item.label}
                className="mt-4 first:mt-0"
              >
                <Link
                  to={targetTo}
                  isNavLink
                  isActive={(match, location) => {
                    const searchParams = new URLSearchParams(location.search);

                    if (urlSearchKey) {
                      const searchingItem = searchParams.get(urlSearchKey);
                      return searchingItem === item.label;
                    }

                    return location.pathname === item.permalink;
                  }}
                  className="pl-2 inline-block leading-tights border-0 border-l-1 border-solid border-transparent transition-colors hover:border-theme-black focus:border-theme-black"
                  activeClassName="text-standard !border-theme-black"
                >
                  <Tag
                    count={<span className="text-theme-white">{item.items?.length ?? 0}</span>}
                    counterClassName="inline-flex justify-center items-center min-w-5 rounded-sm bg-current transition-colors px-1 py-0.5 pt-1 leading-none"
                  >
                    {item.label}
                  </Tag>
                </Link>
              </li>
            );
          })}
        </Collapsible>
      </div>
    </div>
  )
}

function BlogSidebarContent(props: Props) {
  const {
    blogTags,
    blogYears,
  } = (usePluginData('docusaurus-plugin-content-blog') as GlobalBlogPluginData) || {};

  // Tags are sorted in alphabetical ascending order
  const tags = Object.values(blogTags || {}).sort((a, b) => a.label.localeCompare(b.label));
  // Years are sorted in descending order
  const years = Object.values(blogYears || {}).sort((a, b) => Number(b.label) - Number(a.label));

  return (
    <div className="space-y-8">
      <div>
        <SearchBar />
      </div>

      <BlogFilter
        items={tags}
        label={(
          <>
            <Icon icon="LucideTag" className="mr-2" />
            <Translate
              id="theme.blog.sidebar.tag"
              description="The label of the tags filter"
            >
              Tags
            </Translate>
          </>
        )}
      />

      <BlogFilter
        items={years}
        urlSearchKey="year"
        label={(
          <>
            <Icon icon="LucideCalendarDays" className="mr-2" />
            <Translate
              id="theme.blog.sidebar.date"
              description="The label of the date filter"
            >
              Date
            </Translate>
          </>
        )}
      />
    </div>
  );
}

export default memo(BlogSidebarContent);
