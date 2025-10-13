'use client';

import { useState, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from './InteractiveCarousel.module.css';

type Props = {
  images: StaticImageData[];
  dotClass?: string;
  activeClass?: string;
};

const InteractiveCarousel = ({ images, dotClass, activeClass }: Props) => {
  const [current, setCurrent] = useState(0);
  const interval = 5000;

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(slideInterval);
  }, [images.length]);

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
              width={400}
              height={400}
              style={{ borderRadius: '15px', objectFit: 'cover' }}
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
