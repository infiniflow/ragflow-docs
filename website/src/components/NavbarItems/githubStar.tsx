/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import BrowserOnly from "@docusaurus/BrowserOnly";
import React, { useEffect, useState } from "react";

import StarIcon from "./star.svg";

let globalstars = "";

export const GithubStars = () => {
  const [star, setStar] = useState(globalstars);
  useEffect(() => {
    if (!globalstars) {
      fetch("https://api.github.com/repos/infiniflow/ragflow")
        .then((response) => response.json())
        .then((data) => {
          let stars;
          if (data.stargazers_count) {
            stars = (data.stargazers_count / 1000).toFixed(1) + "k";
          } else {
            stars = "10k";
          }
          globalstars = stars;
          setStar(stars);
        });
    }
  }, []);

  return (
    <a
      href="https://github.com/infiniflow/ragflow"
      target="_blank"
      rel="noopener noreferrer"
      className="navbar__item navbar__link"
    >
      <div>
        <div>
          <StarIcon height={14} width={14} />
          <span> {star} stars</span>
        </div>
      </div>
    </a>
  );
};
