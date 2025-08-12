'use client';

import { useState, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from './carouselMobile.module.css';

type CarouselMobileProps = {
  images: { src: StaticImageData; alt: string }[];
};

export default function CarouselMobile({ images }: CarouselMobileProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>(
    'desktop'
  );

  useEffect(() => {
    function updateViewport() {
      const width = window.innerWidth;
      if (width < 769) setViewport('mobile');
      else if (width >= 769 && width <= 1024) setViewport('tablet');
      else setViewport('desktop');
    }

    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

<<<<<<< HEAD
=======
  // Cambio automático cada 5s solo en móvil
>>>>>>> 87c023003262634ac9070c43d67cdf08a6a3efea
  useEffect(() => {
    if (viewport !== 'mobile') return;

    const interval = setInterval(() => {
      setActiveIndex(i => (i + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [viewport, images.length]);

  if (!images || images.length === 0) return null;

  if (viewport === 'mobile') {
    return (
      <div className={styles.carousel}>
        <div className={styles.imageContainer}>
          <Image
            src={images[activeIndex].src}
            alt={images[activeIndex].alt}
            width={320}
            height={280}
            className={styles.carouselImage}
            priority
          />
        </div>
        <div className={styles.dots}>
          {images.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === activeIndex ? styles.activeDot : ''}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`Mostrar imagen ${i + 1}`}
            />
          ))}
        </div>
      </div>
    );
  }

  if (viewport === 'tablet') {
    return (
      <div className={styles.wrapImages}>
        {images.map((img, i) => (
          <Image
            key={i}
            src={img.src}
            alt={img.alt}
            width={365}
            height={180}
            className={styles.imageEstacion}
            priority
          />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.desktopImages}>
      {images.map((img, i) => (
        <Image
          key={i}
          src={img.src}
          alt={img.alt}
          width={365}
          height={180}
          className={styles.imageEstacion}
          priority
        />
      ))}
    </div>
  );
}
