import React from "react";

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
        // background: "#4c8ef4",
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
        // background: "#4c8ef4",
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

const items = [
  { icon: "carousel-001.png" },
  { icon: "carousel-002.png" },
  { icon: "carousel-003.png" },
  { icon: "carousel-004.png" },
];

const HomeCarousel = () => {
  return (
    <section>
      <Slider {...settings} className={styles.carousel}>
        {items.map((x, idx) => {
          return <img key={idx} src={`/img/${x.icon}`}></img>;
        })}
      </Slider>
    </section>
  );
};

export default HomeCarousel;
