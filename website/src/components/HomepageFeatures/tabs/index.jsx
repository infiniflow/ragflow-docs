import { useState } from "react";
import clsx from "clsx";

import styles from "./styles.module.css";

const list = [
  {
    key: "1",
    description:
      "Streamlined RAG orchestration catered to both personal and large businesses",
    icon: require("@site/static/img/tab.svg").default,
    children: "image1",
  },
  {
    key: "2",
    description: "Configurable LLMs as well as embedding models",
    icon: require("@site/static/img/tab.svg").default,
    children: "image2",
  },
  {
    key: "3",
    description: "Multiple recall paired with fused reranking",
    icon: require("@site/static/img/tab.svg").default,
    children: "image3",
  },
  {
    key: "4",
    description: "Intuitive APIs for seamless integration with business",
    icon: require("@site/static/img/tab.svg").default,
    children: "image4",
  },
];

const Tabs = ({ items = list }) => {
  const [selectedKey, setSelectedKey] = useState("1");

  const handleClick = (key) => () => {
    setSelectedKey(key);
  };

  return (
    <section>
      <section className={styles.tabWrapper}>
        {items.map((x) => {
          const Icon = x.icon;
          return (
            <div
              key={x.key}
              onClick={handleClick(x.key)}
              className={clsx(styles.tabItem, {
                [styles.background]: selectedKey === x.key,
              })}
            >
              <div>
                <Icon></Icon>
              </div>
              <p>{x.description}</p>
            </div>
          );
        })}
      </section>
      <section className={styles.tabChildren}>
        {items.find((x) => x.key === selectedKey).children}
      </section>
    </section>
  );
};

export default Tabs;
