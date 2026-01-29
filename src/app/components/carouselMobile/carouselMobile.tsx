'use client';

import { useRef, useState, useEffect, memo } from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from './carouselMobile.module.css';
import arrowLeft from '@/images/Arrow-left.png';
import arrowRight from '@/images/Arrow-right.png';

type CarouselImage = {
  src: StaticImageData;
  alt: string;
};

type Props = {
  images: CarouselImage[];
};

const SlideItem = memo(
  ({ img, index, tx, opacity, zIndex, onPointerDown }: any) => {
    const [status, setStatus] = useState<'loading' | 'loaded'>('loading');
    const [currentSrc, setCurrentSrc] = useState('');

    useEffect(() => {
      const newSrc = typeof img.src === 'string' ? img.src : img.src.src;
      if (newSrc !== currentSrc) {
        setStatus('loading');
        setCurrentSrc(newSrc);
      }
    }, [img.src, currentSrc]);

    return (
      <div
        className={styles.mzaSlide}
        style={{
          transform: `translateX(${tx}px)`,
          opacity,
          zIndex,
          cursor: 'grab',
          touchAction: 'none',
        }}
        onPointerDown={onPointerDown}
      >
        <div
          className={styles.imageWrapper}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
            overflow: 'hidden',
          }}
        >
          {status === 'loading' && (
            <div
              className={styles.spinnerOverlay}
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                backgroundColor: '#fff',
              }}
            >
              <div className={styles.spinner} />
            </div>
          )}
          {currentSrc && (
            <Image
              key={currentSrc}
              src={img.src}
              alt={img.alt || `img-${index}`}
              width={300}
              height={180}
              draggable={false}
              className={styles.carouselImage}
              onLoad={() => setStatus('loaded')}
              style={{
                opacity: status === 'loaded' ? 1 : 0,
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                transition: 'opacity 0.15s ease',
              }}
            />
          )}
        </div>
      </div>
    );
  }
);
SlideItem.displayName = 'SlideItem';

export default function CarouselMobile({ images }: Props) {
  const [state, setState] = useState({ index: 0, pos: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [fsAnimDir, setFsAnimDir] = useState<'left' | 'right' | null>(null);

  const n = images.length;
  const gesture = useRef({
    startX: 0,
    currentX: 0,
    isDragging: false,
    tappedIndex: null as number | null,
  });
  const rafRef = useRef<number>(0);

  const mod = (n: number, m: number) => ((n % m) + m) % m;

  const goTo = (targetIndex: number) => {
    setIsTransitioning(true);
    const startPos = state.pos;
    let d = targetIndex - startPos;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    const endPos = startPos + d;
    const startTime = performance.now();
    const duration = 600;

    const animate = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const ease = 1 - Math.pow(1 - t, 4);
      const currentPos = startPos + (endPos - startPos) * ease;
      setState(prev => ({ ...prev, pos: currentPos }));
      if (t < 1) rafRef.current = requestAnimationFrame(animate);
      else {
        const finalIndex = mod(Math.round(currentPos), n);
        setState({ index: finalIndex, pos: finalIndex });
        setIsTransitioning(false);
      }
    };
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animate);
  };

  const onPointerDown = (e: React.PointerEvent, index?: number) => {
    if (isTransitioning) return;
    gesture.current.startX = e.clientX;
    gesture.current.currentX = e.clientX;
    gesture.current.isDragging = true;
    gesture.current.tappedIndex = index ?? null;
    cancelAnimationFrame(rafRef.current);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!gesture.current.isDragging) return;
    gesture.current.currentX = e.clientX;
    const dx = e.clientX - gesture.current.startX;

    if (!isFullscreen) {
      setState(prev => ({ ...prev, pos: prev.index - dx / 400 }));
    }
  };

  const onPointerUp = () => {
    if (!gesture.current.isDragging) return;
    gesture.current.isDragging = false;
    const moved = Math.abs(gesture.current.currentX - gesture.current.startX);

    if (moved > 10) {
      const direction =
        gesture.current.currentX < gesture.current.startX ? 1 : -1;
      if (isFullscreen) {
        setFsAnimDir(direction === 1 ? 'left' : 'right');
        setState(prev => ({
          index: mod(prev.index + direction, n),
          pos: mod(prev.index + direction, n),
        }));
      } else {
        goTo(mod(Math.round(state.pos), n));
      }
      return;
    }

    if (gesture.current.tappedIndex !== null) {
      const idx = gesture.current.tappedIndex;
      setState({ index: idx, pos: idx });
      setIsFullscreen(true);
    }
  };

  const next = () => {
    setFsAnimDir('left');
    if (isFullscreen) {
      setState(prev => ({
        index: mod(prev.index + 1, n),
        pos: mod(prev.index + 1, n),
      }));
      return;
    }
    goTo(mod(state.index + 1, n));
  };

  const prev = () => {
    setFsAnimDir('right');
    if (isFullscreen) {
      setState(prev => ({
        index: mod(prev.index - 1, n),
        pos: mod(prev.index - 1, n),
      }));
      return;
    }
    goTo(mod(state.index - 1, n));
  };

  const closeFullscreen = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsFullscreen(false);
      setIsClosing(false);
      setFsAnimDir(null);
    }, 250);
  };

  if (!images?.length) return null;

  return (
    <>
      <div className={styles.mzaContainer}>
        <div
          className={styles.mzaViewport}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          <div className={styles.mzaTrack}>
            {images.map((img, i) => {
              let d = i - state.pos;
              if (d > n / 2) d -= n;
              if (d < -n / 2) d += n;
              const tx = d * 320;
              const opacity = 1 - Math.abs(d) * 0.5;
              const zIndex = 100 - Math.abs(d) * 10;

              return (
                <SlideItem
                  key={`slide-${i}`}
                  img={img}
                  index={i}
                  tx={tx}
                  opacity={opacity}
                  zIndex={zIndex}
                  onPointerDown={(e: React.PointerEvent<HTMLDivElement>) =>
                    onPointerDown(e, i)
                  }
                />
              );
            })}
          </div>
        </div>

        <div className={styles.dots}>
          {images.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${mod(Math.round(state.pos), n) === i ? styles.activeDot : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>

      {isFullscreen && (
        <div
          className={`${styles.fullscreenOverlay} ${isClosing ? styles.zoomOut : styles.zoomIn}`}
          onPointerDown={e => {
            if (e.pointerType !== 'mouse')
              e.currentTarget.setPointerCapture(e.pointerId);
            onPointerDown(e);
          }}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          <button className={styles.closeBtn} onClick={closeFullscreen}>
            ✕
          </button>
          <button className={styles.arrowLeft} onClick={prev}>
            <Image src={arrowLeft} alt="Anterior" />
          </button>
          <div className={styles.fullscreenImageWrapper}>
            <SlideItem
              img={images[state.index]}
              index={state.index}
              tx={0}
              opacity={1}
              zIndex={100}
              onPointerDown={onPointerDown}
            />
          </div>
          <button className={styles.arrowRight} onClick={next}>
            <Image src={arrowRight} alt="Siguiente" />
          </button>
        </div>
      )}
    </>
  );
}
