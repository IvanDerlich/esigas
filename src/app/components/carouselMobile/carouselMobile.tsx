'use client';

import { useEffect, useRef, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from './carouselMobile.module.css';
import arrowLeft from '@/images/Arrow-left.png';
import arrowRight from '@/images/Arrow-right.png';

type CarouselImage = { src: StaticImageData; alt: string };

type Props = {
  images: CarouselImage[];
};

export default function CarouselMobile({ images }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>(
    'desktop'
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const SWIPE_THRESHOLD = 50;
  const TAP_THRESHOLD = 10;

  const gesture = useRef({
    startX: 0,
    endX: 0,
    isDown: false,
  });

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      if (w < 769) setViewport('mobile');
      else if (w <= 1024) setViewport('tablet');
      else setViewport('desktop');
    };

    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (!images?.length) return null;

  const itemsToShow = viewport === 'mobile' ? 1 : viewport === 'tablet' ? 2 : 3;

  const visibleImages = Array.from({ length: itemsToShow }, (_, i) => {
    return images[(currentIndex + i) % images.length];
  });

  const next = () => setCurrentIndex(i => (i + 1) % images.length);
  const prev = () =>
    setCurrentIndex(i => (i - 1 + images.length) % images.length);

  const startSwipe = (x: number) => {
    gesture.current = { startX: x, endX: x, isDown: true };
  };

  const moveSwipe = (x: number) => {
    if (!gesture.current.isDown) return;
    gesture.current.endX = x;
  };

  const endSwipe = (onTap?: () => void) => {
    if (!gesture.current.isDown) return;

    const diff = gesture.current.startX - gesture.current.endX;
    const abs = Math.abs(diff);

    if (abs < TAP_THRESHOLD) {
      onTap?.();
    } else if (abs > SWIPE_THRESHOLD) {
      diff > 0 ? next() : prev();
    }

    gesture.current.isDown = false;
  };

  const openFullscreen = (index: number) => {
    setCurrentIndex(index);
    setIsClosing(false);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsFullscreen(false);
      setIsClosing(false);
    }, 250);
  };

  return (
    <>
      <div className={styles.carousel}>
        <div className={styles.imageRow}>
          {visibleImages.map((img, i) => {
            const realIndex = (currentIndex + i) % images.length;

            return (
              <div
                key={realIndex}
                onPointerDown={e => startSwipe(e.clientX)}
                onPointerMove={e => moveSwipe(e.clientX)}
                onPointerUp={() => endSwipe(() => openFullscreen(realIndex))}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={365}
                  height={180}
                  draggable={false}
                  className={styles.carouselImage}
                />
              </div>
            );
          })}
        </div>

        {/* Dots */}
        <div className={styles.dots}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`${styles.dot} ${
                i === currentIndex ? styles.activeDot : ''
              }`}
            />
          ))}
        </div>
      </div>

      {isFullscreen && (
        <div
          className={`${styles.fullscreenOverlay} ${
            isClosing ? styles.zoomOut : styles.zoomIn
          }`}
          onPointerDown={e => startSwipe(e.clientX)}
          onPointerMove={e => moveSwipe(e.clientX)}
          onPointerUp={() => endSwipe()}
          onTouchStart={e => startSwipe(e.touches[0].clientX)}
          onTouchMove={e => moveSwipe(e.touches[0].clientX)}
          onTouchEnd={() => endSwipe()}
        >
          <button
            className={styles.closeBtn}
            onClick={closeFullscreen}
            onPointerDown={e => e.stopPropagation()}
            onTouchStart={e => e.stopPropagation()}
          >
            ✕
          </button>

          <button
            className={styles.arrowLeft}
            onClick={prev}
            onPointerDown={e => e.stopPropagation()}
            onTouchStart={e => e.stopPropagation()}
          >
            <Image src={arrowLeft} alt="Anterior" />
          </button>

          <div className={styles.fullscreenImageWrapper}>
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              fill
              draggable={false}
              className={styles.fullscreenImage}
            />
          </div>

          <button
            className={styles.arrowRight}
            onClick={next}
            onPointerDown={e => e.stopPropagation()}
            onTouchStart={e => e.stopPropagation()}
          >
            <Image src={arrowRight} alt="Siguiente" />
          </button>
        </div>
      )}
    </>
  );
}
