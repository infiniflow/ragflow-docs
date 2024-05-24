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
        zIndex: 100,
        right: -28,
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
        zIndex: 100,
        left: -28,
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
  { icon: "https://www.freeimg.cn/i/2024/03/30/6607e46c1e90d.png" },
  { icon: "https://www.freeimg.cn/i/2024/03/30/6607e47804c07.png" },
  { icon: "https://www.freeimg.cn/i/2024/03/30/6607e47ece9db.png" },
  { icon: "https://www.freeimg.cn/i/2024/04/01/660a47c472f11.png" },
];

const HomeCarousel = () => {
  return (
    <section>
      <Slider {...settings} className={styles.carousel}>
        {items.map((x, idx) => {
          return <img key={idx} src={x.icon}></img>;
        })}
      </Slider>
    </section>
  );
};

export default HomeCarousel;
