import clsx from "clsx";
import Tabs from "./tabs";
import { featureList } from "./constant";

import styles from "./styles.module.css";

const Features = () => {
  return (
    <section className={styles.featuresWrapper}>
      {featureList.map((x, idx) => (
        <section
          key={idx}
          className={clsx(styles.featuresItem, {
            [styles.featuresItemBorder]: idx > 0,
          })}
        >
          <div className={styles.featuresSubLabel}>Features</div>
          <div className={styles.featuresTitle}>{x.title}</div>
          <Tabs items={x.items} img={x.img}></Tabs>
        </section>
      ))}
    </section>
  );
};

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <Features></Features>
      </div>
    </section>
  );
}
