'use client';

import { useState, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from './carouselMobile.module.css';
import arrowLeft from '@/images/Arrow-left.png';
import arrowRight from '@/images/Arrow-right.png';

type CarouselImage = { src: StaticImageData; alt: string };

type CarouselMobileProps = {
  images: CarouselImage[];
};

export default function CarouselMobile({ images }: CarouselMobileProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>(
    'desktop'
  );

  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    function updateViewport() {
      const width = window.innerWidth;

      if (width < 769) setViewport('mobile');
      else if (width <= 1024) setViewport('tablet');
      else setViewport('desktop');
    }

    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  if (!images || images.length === 0) return null;

  const itemsToShow = viewport === 'mobile' ? 1 : viewport === 'tablet' ? 2 : 3;

  const visibleImages = Array.from({ length: itemsToShow }, (_, i) => {
    return images[(activeIndex + i) % images.length];
  });

  const openFullscreen = (index: number) => {
    setFullscreenIndex(index);
    setActiveIndex(index);
  };

  const closeFullscreen = () => {
    setIsClosing(true);

    setTimeout(() => {
      setFullscreenIndex(null);
      setIsClosing(false);
    }, 250);
  };

  const nextFullscreen = () => {
    if (fullscreenIndex === null) return;

    const newIndex = (fullscreenIndex + 1) % images.length;
    setFullscreenIndex(newIndex);
    setActiveIndex(newIndex);
  };

  const prevFullscreen = () => {
    if (fullscreenIndex === null) return;

    const newIndex = (fullscreenIndex - 1 + images.length) % images.length;
    setFullscreenIndex(newIndex);
    setActiveIndex(newIndex);
  };

  return (
    <>
      <div className={styles.carousel}>
        <div className={styles.imageRow}>
          {visibleImages.map((img, i) => {
            const realIndex = (activeIndex + i) % images.length;

            return (
              <Image
                key={i}
                src={img.src}
                alt={img.alt}
                width={365}
                height={180}
                className={styles.carouselImage}
                priority
                onClick={() => openFullscreen(realIndex)}
              />
            );
          })}
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

      {fullscreenIndex !== null && (
        <div className={styles.fullscreenOverlay}>
          <button className={styles.closeBtn} onClick={closeFullscreen}>
            ✕
          </button>

          <button className={styles.arrowLeft} onClick={prevFullscreen}>
            <Image className={styles.arrow} src={arrowLeft} alt="Previous" />
          </button>

          <div className={styles.fullscreenImageWrapper}>
            <Image
              src={images[fullscreenIndex].src}
              alt={images[fullscreenIndex].alt}
              fill
              className={`${styles.fullscreenImage} ${isClosing ? styles.zoomOut : styles.zoomIn}`}
            />
          </div>

          <button className={styles.arrowRight} onClick={nextFullscreen}>
            <Image className={styles.arrow} src={arrowRight} alt="Next" />
          </button>
        </div>
      )}
    </>
  );
}
