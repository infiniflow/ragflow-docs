import { useState } from "react";
import clsx from "clsx";

import styles from "./styles.module.css";

const Tabs = ({ items = [] }) => {
  const [selectedKey, setSelectedKey] = useState(1);
  const Child = items.find((x) => x.key === selectedKey)?.children;

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
        {typeof Child === "string" ? (
          Child
        ) : (
          <Child className={styles.tabChild} width="100%"></Child>
        )}
      </section>
    </section>
  );
};

export default Tabs;
