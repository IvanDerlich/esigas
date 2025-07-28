'use client';

import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from "./InteractiveCarousel.module.css";

type Props = {
  images: StaticImageData[];
  dotClass?: string;
  activeClass?: string;
  width?: number;
  height?: number;
  radius?: string;
};

const InteractiveCarousel = ({
  images,
  dotClass = styles.dot,
  activeClass = styles.active,
  width = 500,
  height = 300,
  radius = "0px",
}: Props) => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  return (
    <div className={styles.carousel_container}>
      <div
        className={styles.carousel_slider}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, i) => (
          <div key={i} className={styles.carousel_slide}>
            <Image
              src={img}
              alt={`Slide-${i}`}
              width={width}
              height={height}
              style={{ borderRadius: radius }}
              priority
            />
          </div>
        ))}
      </div>
      <div className={styles.carousel_dots}>
        {images.map((_, i) => (
          <span
            key={i}
            className={`${dotClass} ${i === current ? activeClass : ""}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default InteractiveCarousel;