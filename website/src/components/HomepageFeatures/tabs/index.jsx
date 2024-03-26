import clsx from "clsx";

import styles from "./styles.module.css";

const Tabs = ({ items = [], img = "" }) => {
  return (
    <section>
      <section className={styles.tabWrapper}>
        {items.map((x) => {
          const Icon = x.icon;
          return (
            <div key={x.key} className={clsx(styles.tabItem)}>
              <div
                className={clsx(styles.tabIcon, {
                  [styles.tabIconLeft]: items.length === 4,
                })}
              >
                <Icon></Icon>
              </div>
              <p className={styles.tabDescription}>{x.description}</p>
            </div>
          );
        })}
      </section>
      <section className={styles.tabChildren}>
        <img src={require(`@site/static/img/${img}`).default} alt="" />
      </section>
    </section>
  );
};

export default Tabs;
