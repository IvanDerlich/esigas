'use client';

import { useState, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from './InteractiveCarousel.module.css';

type Props = {
  images: StaticImageData[];
  dotClass?: string;
  activeClass?: string;
  width?: number;
  height?: number;
  radius?: string;
  interval?: number;
};

const InteractiveCarousel = ({
  images,
  dotClass = styles.dot,
  activeClass = styles.active,
  width = 400,
  height = 400,
  radius = '15px',
  interval = 5000,
}: Props) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(slideInterval);
  }, [images.length, interval]);

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
            className={`${dotClass} ${i === current ? activeClass : ''}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default InteractiveCarousel;
