'use client';

import { useEffect, useRef, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from './carouselMobile.module.css';
import arrowLeft from '@/images/Arrow-left.png';
import arrowRight from '@/images/Arrow-right.png';

type CarouselImage = { src: StaticImageData; alt: string };

type CarouselMobileProps = {
  images: CarouselImage[];
};

export default function CarouselMobile({ images }: CarouselMobileProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>(
    'desktop'
  );
  const [isFullscreen, setIsFullscreen] = useState(false);

  const carouselTouch = useRef({ startX: 0, endX: 0 });
  const fullscreenTouch = useRef({ startX: 0, endX: 0 });

  const SWIPE_THRESHOLD = 50;
  const TAP_THRESHOLD = 12;

  useEffect(() => {
    function updateViewport() {
      const w = window.innerWidth;
      if (w < 769) setViewport('mobile');
      else if (w <= 1024) setViewport('tablet');
      else setViewport('desktop');
    }

    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  if (!images || images.length === 0) return null;

  const itemsToShow = viewport === 'mobile' ? 1 : viewport === 'tablet' ? 2 : 3;

  const visibleImages = Array.from({ length: itemsToShow }, (_, i) => {
    return images[(currentIndex + i) % images.length];
  });

  const next = () => setCurrentIndex(s => (s + 1) % images.length);
  const prev = () =>
    setCurrentIndex(s => (s - 1 + images.length) % images.length);

  const onCarouselTouchStart = (e: React.TouchEvent) => {
    carouselTouch.current.startX = e.touches[0].clientX;
    carouselTouch.current.endX = e.touches[0].clientX;
  };
  const onCarouselTouchMove = (e: React.TouchEvent) => {
    carouselTouch.current.endX = e.touches[0].clientX;
  };
  const onCarouselTouchEnd = () => {
    const diff = carouselTouch.current.startX - carouselTouch.current.endX;
    const abs = Math.abs(diff);
    if (abs < TAP_THRESHOLD) return;
    if (diff > SWIPE_THRESHOLD) next();
    else if (diff < -SWIPE_THRESHOLD) prev();
  };

  const onFsTouchStart = (e: React.TouchEvent) => {
    fullscreenTouch.current.startX = e.touches[0].clientX;
    fullscreenTouch.current.endX = e.touches[0].clientX;
  };
  const onFsTouchMove = (e: React.TouchEvent) => {
    fullscreenTouch.current.endX = e.touches[0].clientX;
  };
  const onFsTouchEnd = () => {
    const diff = fullscreenTouch.current.startX - fullscreenTouch.current.endX;
    const abs = Math.abs(diff);
    if (abs < TAP_THRESHOLD) return;
    if (diff > SWIPE_THRESHOLD) {
      next();
    } else if (diff < -SWIPE_THRESHOLD) {
      prev();
    }
  };

  const openFullscreen = (realIndex: number) => {
    setCurrentIndex(realIndex % images.length);
    setIsFullscreen(true);
    carouselTouch.current = { startX: 0, endX: 0 };
    fullscreenTouch.current = { startX: 0, endX: 0 };
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    fullscreenTouch.current = { startX: 0, endX: 0 };
  };

  return (
    <>
      <div
        className={styles.carousel}
        onTouchStart={onCarouselTouchStart}
        onTouchMove={onCarouselTouchMove}
        onTouchEnd={onCarouselTouchEnd}
      >
        <div className={styles.imageRow}>
          {visibleImages.map((img, i) => {
            const realIndex = (currentIndex + i) % images.length;

            return (
              <Image
                key={realIndex}
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
              className={`${styles.dot} ${i === currentIndex ? styles.activeDot : ''}`}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Mostrar imagen ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {isFullscreen && (
        <div
          className={styles.fullscreenOverlay}
          onTouchStart={onFsTouchStart}
          onTouchMove={onFsTouchMove}
          onTouchEnd={onFsTouchEnd}
        >
          <button className={styles.closeBtn} onClick={closeFullscreen}>
            ✕
          </button>

          <button
            className={styles.arrowLeft}
            onClick={prev}
            aria-label="Anterior"
          >
            <Image className={styles.arrow} src={arrowLeft} alt="Previous" />
          </button>

          <div className={styles.fullscreenImageWrapper}>
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              fill
              className={styles.fullscreenImage}
            />
          </div>

          <button
            className={styles.arrowRight}
            onClick={next}
            aria-label="Siguiente"
          >
            <Image className={styles.arrow} src={arrowRight} alt="Next" />
          </button>
        </div>
      )}
    </>
  );
}
