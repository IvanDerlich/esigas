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

  const itemsToShow = viewport === 'mobile' ? 1 : viewport === 'tablet' ? 2 : 3;

  if (!images || images.length === 0) return null;

  const visibleImages = Array.from({ length: itemsToShow }, (_, i) => {
    return images[(activeIndex + i) % images.length];
  });

  return (
    <div className={styles.carousel}>
      <div className={styles.imageRow}>
        {visibleImages.map((img, i) => (
          <Image
            key={i}
            src={img.src}
            alt={img.alt}
            width={365}
            height={180}
            className={styles.carouselImage}
            priority
          />
        ))}
      </div>

      {/* Dots */}
      <div className={styles.dots}>
        {images.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${
              i === activeIndex ? styles.activeDot : ''
            }`}
            onClick={() => setActiveIndex(i)}
            aria-label={`Mostrar imagen ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
