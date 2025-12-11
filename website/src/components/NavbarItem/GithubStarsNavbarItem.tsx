import React, { useEffect, useState } from "react";

import Link from "@docusaurus/Link";
import Icon, { type IconName } from "@site/src/components/Icon";
import { noop } from "lodash-es";

let globalStars: string | null = null;

interface Props {
  repo: string;
  icon: IconName;
}

export default function GithubStarsNavbarItem({
  repo,
  icon,
}: Props) {
  const [star, setStar] = useState(globalStars);

  useEffect(() => {
    if (globalStars == null) {
      fetch(`https://api.github.com/repos/${repo}`)
        .then((response) => response.json())
        .then((data) => {
          let stars;

          if (data.stargazers_count) {
            stars = (data.stargazers_count / 1000).toFixed(1) + "k";
          }

          globalStars = stars;
          setStar(stars);
        })
        .catch(noop);
    }
  }, []);

  return (
    <Link
      className="mx-4"
      href={`https://github.com/${repo}`}
    >
      <Icon icon={icon ?? 'LucideStar'} className={star && 'mr-2'} />
      <span>{star}</span>
    </Link>
  );
};
