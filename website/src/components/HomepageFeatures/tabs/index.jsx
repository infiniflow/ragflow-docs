import clsx from "clsx";
import Slider from "react-slick";

import styles from "./styles.module.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={clsx(styles.arrowButton, className)}
      style={{
        ...style,
        display: "block",
        background: "#4c8ef4",
        right: -60,
      }}
      onClick={onClick}
    >
      <img src={"/img/arrow.svg"} alt="" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={clsx(className, styles.arrowButton)}
      style={{
        ...style,
        display: "block",
        background: "#4c8ef4",
        left: -60,
      }}
      onClick={onClick}
    >
      <img src={"/img/arrow.svg"} alt="" className={styles.preButton} />
    </div>
  );
}

const settings = {
  dots: true,
  infinite: true,
  speed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

const Tabs = ({ items = [], img = "" }) => {
  return (
    <section>
      <section className={styles.tabChildren}>
        <Slider {...settings} className={styles.tabSlider}>
          {items.map((x, idx) => {
            return <img key={idx} src={`/img/${x.icon}`}></img>;
          })}
        </Slider>
      </section>
    </section>
  );
};

export default Tabs;
