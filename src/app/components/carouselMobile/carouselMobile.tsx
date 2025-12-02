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
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);


  function handlePrev() {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  }

  function handleNext() {
    setActiveIndex((prev) => (prev + 1) % images.length);
  }

  function handleFullscreenPrev() {
    if (fullscreenIndex === null) return;
    setFullscreenIndex((prev) => (prev! - 1 + images.length) % images.length);
  }

  function handleFullscreenNext() {
    if (fullscreenIndex === null) return;
    setFullscreenIndex((prev) => (prev! + 1) % images.length);
  }


  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const distance = touchStartX - touchEndX;

    if (distance > 50) handleNext();
    if (distance < -50) handlePrev();
  };


  const handleFullscreenTouchStart = (
    e: React.TouchEvent<HTMLDivElement>
  ) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleFullscreenTouchMove = (
    e: React.TouchEvent<HTMLDivElement>
  ) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleFullscreenTouchEnd = () => {
    const distance = touchStartX - touchEndX;

    if (distance > 50) handleFullscreenNext();
    if (distance < -50) handleFullscreenPrev();
  };


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

  const itemsToShow =
    viewport === 'mobile' ? 1 : viewport === 'tablet' ? 2 : 3;

  const visibleImages = Array.from({ length: itemsToShow }, (_, i) => {
    return images[(activeIndex + i) % images.length];
  });

  const openFullscreen = (index: number) => {
    setFullscreenIndex(index);
    setActiveIndex(index);
  };

  const closeFullscreen = () => setFullscreenIndex(null);

  return (
    <>
      <div
        id="carousel-mobile"
        className={styles.carousel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
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
        <div
          className={styles.fullscreenOverlay}
          onTouchStart={handleFullscreenTouchStart}
          onTouchMove={handleFullscreenTouchMove}
          onTouchEnd={handleFullscreenTouchEnd}
        >
          <button className={styles.closeBtn} onClick={closeFullscreen}>
            ✕
          </button>

          <button
            className={styles.arrowLeft}
            onClick={handleFullscreenPrev}
          >
            <Image className={styles.arrow} src={arrowLeft} alt="Previous" />
          </button>

          <div className={styles.fullscreenImageWrapper}>
            <Image
              src={images[fullscreenIndex].src}
              alt={images[fullscreenIndex].alt}
              fill
              className={styles.fullscreenImage}
            />
          </div>

          <button
            className={styles.arrowRight}
            onClick={handleFullscreenNext}
          >
            <Image className={styles.arrow} src={arrowRight} alt="Next" />
          </button>
        </div>
      )}
    </>
  );
}
