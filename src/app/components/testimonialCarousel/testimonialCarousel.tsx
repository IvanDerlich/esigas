'use client';
import React, { useState, useRef, useEffect } from 'react';
import styles from './testimonialCarousel.module.css';
import testimonialsData from './testimonials.json';
import Image from 'next/image';
import leftArrow from '@/images/Icon-left.png';
import rightArrow from '@/images/Icon-right.png';
import { abyssinica } from '@/app/assets/fonts';
import TextTestimonialCard from './textTestimonialCard';
import VideoTestimonialCard from './videoTestimonialCard';
import InstagramTestimonialCard from './instagramTestimonialCard';

type Testimonial = {
  type: 'text' | 'video' | 'instagram';
  title?: string;
  comment?: string;
  author?: string;
  rating?: number;
  urlTestimonial?: string;
  youtubeId?: string;
  igUrl?: string;
  image?: string;
};

const TestimonialCarousel = () => {
  const [state, setState] = useState({ index: 0, pos: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeTestimonial, setActiveTestimonial] =
    useState<Testimonial | null>(null);

  const testimonials = testimonialsData as Testimonial[];
  const n = testimonials.length;

  const gesture = useRef({
    startX: 0,
    currentX: 0,
    isDragging: false,
    moved: false,
  });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    setActiveTestimonial(null);
    return () => setActiveTestimonial(null);
  }, []);

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

      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        const finalIndex = mod(Math.round(currentPos), n);
        setState({ index: finalIndex, pos: finalIndex });
        setIsTransitioning(false);
      }
    };
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animate);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (isTransitioning) return;
    gesture.current.startX = e.clientX;
    gesture.current.isDragging = true;
    gesture.current.moved = false;
    cancelAnimationFrame(rafRef.current);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!gesture.current.isDragging) return;
    const dx = e.clientX - gesture.current.startX;
    if (Math.abs(dx) > 10) {
      gesture.current.moved = true;
    }
    setState(prev => ({ ...prev, pos: prev.index - dx / 400 }));
  };

  const onPointerUp = () => {
    if (!gesture.current.isDragging) return;
    gesture.current.isDragging = false;
    goTo(mod(Math.round(state.pos), n));
  };

  const handlePreventClick = (e: React.MouseEvent) => {
    if (gesture.current.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleCardClick = (item: Testimonial) => {
    if (!gesture.current.moved && item.type === 'text') {
      setActiveTestimonial(item);
    }
  };

  const handleNext = () => goTo(mod(state.index + 1, n));
  const handlePrev = () => goTo(mod(state.index - 1, n));

  return (
    <>
      <div
        id="testimonios"
        className={`${abyssinica.className} ${styles.container}`}
      >
        <div className={styles.testimonials}>
          <h2 className={styles.testimonialsTitle}>Testimonios</h2>
        </div>
        <div className={styles.testimonialsDescription}>
          <p className={styles.testimonialsSubtitle}>
            Nuestros clientes opinan
          </p>
          <p className={styles.testimonialsText}>
            Estas son algunas de las experiencias de quienes confiaron en
            nosotros.
          </p>
        </div>

        <div
          className={styles.mzaViewport}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          style={{ touchAction: 'pan-y', userSelect: 'none' }}
        >
          <div className={styles.mzaTrack}>
            {testimonials.map((item, i) => {
              let d = i - state.pos;
              if (d > n / 2) d -= n;
              if (d < -n / 2) d += n;
              if (Math.abs(d) > 2) return null;

              const tx = d * 105;
              const opacity = 1 - Math.abs(d) * 0.7;
              const scale = 1 - Math.abs(d) * 0.15;

              return (
                <div
                  key={i}
                  className={styles.mzaSlide}
                  onDragStart={e => e.preventDefault()}
                  style={{
                    transform: `translateX(${tx}%) scale(${scale})`,
                    opacity,
                    zIndex: Math.round(100 - Math.abs(d) * 10),
                    cursor: gesture.current.isDragging ? 'grabbing' : 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div
                    onClickCapture={handlePreventClick}
                    onClick={() => handleCardClick(item)}
                    style={{
                      height: '100%',
                      width: '100%',
                      display: 'contents',
                    }}
                  >
                    {item.type === 'text' && (
                      <TextTestimonialCard item={item} />
                    )}
                    {item.type === 'video' && item.youtubeId && (
                      <VideoTestimonialCard youtubeId={item.youtubeId} />
                    )}
                    {item.type === 'instagram' && item.igUrl && item.image && (
                      <InstagramTestimonialCard
                        igUrl={item.igUrl}
                        image={item.image}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.navigationWrapper}>
            <button
              className={`${styles.arrowBtn} ${styles.left}`}
              onClick={handlePrev}
            >
              <Image src={leftArrow} alt="Anterior" width={40} height={40} />
            </button>
            <button
              className={`${styles.arrowBtn} ${styles.right}`}
              onClick={handleNext}
            >
              <Image src={rightArrow} alt="Siguiente" width={40} height={40} />
            </button>
          </div>
        </div>
      </div>

      {activeTestimonial && activeTestimonial.type === 'text' && (
        <div
          className={styles.fullscreenOverlay}
          onClick={() => setActiveTestimonial(null)}
        >
          <div
            className={styles.fullscreenCard}
            onClick={e => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={() => setActiveTestimonial(null)}
            >
              ✕
            </button>

            <p className={styles.testimonialTitle}>{activeTestimonial.title}</p>

            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map(star => (
                <span key={star} className={styles.star}>
                  {(activeTestimonial.rating ?? 0) >= star ? '★' : '☆'}
                </span>
              ))}
            </div>

            <p className={styles.testimonialTextFull}>
              {activeTestimonial.comment}
            </p>
            <p className={styles.testimonialAuthorFull}>
              - {activeTestimonial.author}
            </p>

            {activeTestimonial.urlTestimonial && (
              <a
                href={activeTestimonial.urlTestimonial}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.googleButtonFull}
              >
                Ver en Google
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TestimonialCarousel;
