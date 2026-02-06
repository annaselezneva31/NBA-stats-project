import React, { Children, useState, useRef, useEffect } from "react";
import styles from "./Slider.module.css";

const Slider = ({
  slidesPerView: initialSliderPerView = 4,
  spaceBetween: initialSpaceBetween = 16,
  slidesPerGroup: initialSliderPerGroup = 4,
  items,
  children,
}) => {
  const [slidesPerView, setSlidesPerView] = useState(initialSliderPerView);
  const [slidesPerGroup, setSlidesPerGroup] = useState(initialSliderPerGroup);
  const [spaceBetween, setSpaceBetween] = useState(initialSpaceBetween);

  const [sliderItemWidth, setSliderItemWidth] = useState(0);

  const sliderContainerRef = useRef(null);

  const sliderItems = items || Children.toArray(children);

  useEffect(() => {
    if (sliderContainerRef.current) {
      const sliderContainerWidth = sliderContainerRef.current.offsetWidth;

      const elements = sliderContainerRef.current.querySelector(".slider-item");

      elements.forEach((el) => {
        const sliderItemWidth = Math.ceil(
          sliderContainerWidth / slidesPerView - spaceBetween,
        );

        el.style.width = sliderItemWidth + "px";

        Array.from(el.children).forEach((div) => {
          div.style.width = sliderItemWidth + "px";
        });

        setSliderItemWidth(sliderItemWidth);
      });
    }
  }, [slidesPerView, spaceBetween]);

  const sliderButtonHandler = (direction) => {
    if (direction === "forward") {
      // add logic
    } else {
      // add another logic
    }
  };
  return (
    <div className={styles.slider}>
      <div className={styles.slidesContainer}>
        <div style={{ display: "flex" }}>
          {sliderItems.map((item, i) => {
            return <div key={i}>{item}</div>;
          })}
        </div>
      </div>
      <button
        className={`${styles.slideButton} ${styles.slideButtonPrev}`}
        onClick={() => sliderButtonHandler("backward")}
      >
        <span
          className={`${styles.materialSymbolsOutlined}${styles.slideButtonIcon}`}
          style={{ letterSpacing: "4px" }}
        >
          arrow_back_ios_new
        </span>
      </button>
      <button
        className={`${styles.slideButton} ${styles.slideButtonPrev}`}
        onClick={() => sliderButtonHandler("forward")}
      >
        <span
          className={`${styles.materialSymbolsOutlined}${styles.slideButtonIcon}`}
          style={{ letterSpacing: "4px" }}
        >
          arrow_forward_ios
        </span>
      </button>
    </div>
  );
};

export default Slider;
