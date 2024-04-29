import clsx from "clsx";
import Tabs from "./tabs";
import { featureList } from "./constant";
import Carousel from "../Carousel";
import Link from "@docusaurus/Link";

import styles from "./styles.module.css";

const connectionList = [
  { label: "Twitter", link: "https://twitter.com/infiniflowai" },
  { label: "Github", link: "https://github.com/infiniflow/ragflow" },
  { label: "Discord", link: "https://discord.gg/4XxujFgUN7" },
];

function JoinUs() {
  return (
    <section className={styles.joinUsWrapper}>
      <div className={styles.joinUsTitle}>Join Our Community</div>
      <section className={clsx(styles.joinUsConnection, "container")}>
        {connectionList.map((x) => (
          <div className={styles.joinUsConnectionItem} key={x.label}>
            <span
              className={clsx(styles[`joinUs${x.label}`], styles.joinUsIcon)}
            ></span>
            <Link to={x.link} className={styles.joinUsLabel}>
              {x.label}
            </Link>
            <span className={styles.joinUsArrow}></span>
          </div>
        ))}
      </section>
    </section>
  );
}

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
          <div className={styles.featuresTitle}>{x.title}</div>
          {/* <Tabs items={x.items} img={x.img}></Tabs> */}
        </section>
      ))}
    </section>
  );
};

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <Carousel></Carousel>
        <JoinUs></JoinUs>
      </div>
    </section>
  );
}
