'use client';
import React, { useEffect, useState } from 'react';
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
  const [start, setStart] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [activeTestimonial, setActiveTestimonial] =
    useState<Testimonial | null>(null);

  const testimonials = testimonialsData as Testimonial[];

  const minSwipeDistance = 50;

  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth < 768) {
        setVisibleItems(1);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2);
      } else {
        setVisibleItems(3);
      }
    };

    updateVisibleItems();
    window.addEventListener('resize', updateVisibleItems);
    return () => window.removeEventListener('resize', updateVisibleItems);
  }, []);

  const maxStartIndex = Math.max(testimonialsData.length - visibleItems, 0);

  const handleNext = () => {
    setStart(prev => Math.min(prev + 1, maxStartIndex));
  };

  const handlePrev = () => {
    setStart(prev => Math.max(prev - 1, 0));
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const distance = touchEndX - touchStartX;

    if (Math.abs(distance) < minSwipeDistance) return;

    if (distance < 0) {
      handleNext();
    } else {
      handlePrev();
    }
  };

  useEffect(() => {
    const root = document.documentElement;

    if (activeTestimonial) {
      root.style.overflow = 'hidden';
    } else {
      root.style.overflow = '';
    }

    return () => {
      root.style.overflow = '';
    };
  }, [activeTestimonial]);

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
          className={styles.testimonialsContent}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={`${styles.arrowWrapper} ${styles.arrowLeft} ${start > 0 ? '' : styles.hidden}`}
          >
            <button className={styles.arrowButton} onClick={handlePrev}>
              <Image src={leftArrow} alt="Anterior" width={40} height={40} />
            </button>
          </div>

          {testimonials
            .slice(start, start + visibleItems)
            .map((item, index) => {
              if (item.type === 'text') {
                return (
                  <TextTestimonialCard
                    key={index}
                    item={item}
                    onClick={() => setActiveTestimonial(item)}
                  />
                );
              }

              if (item.type === 'video' && item.youtubeId) {
                return (
                  <VideoTestimonialCard
                    key={index}
                    youtubeId={item.youtubeId}
                  />
                );
              }

              if (item.type === 'instagram' && item.igUrl && item.image) {
                return (
                  <InstagramTestimonialCard
                    key={index}
                    igUrl={item.igUrl}
                    image={item.image}
                  />
                );
              }

              return null;
            })}

          <div
            className={`${styles.arrowWrapper} ${styles.arrowRight} ${start < maxStartIndex ? '' : styles.hidden}`}
          >
            <button className={styles.arrowButton} onClick={handleNext}>
              <Image src={rightArrow} alt="Siguiente" width={40} height={40} />
            </button>
          </div>
        </div>
      </div>
      {activeTestimonial && (
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
                  {activeTestimonial.rating && activeTestimonial.rating >= star
                    ? '★'
                    : '☆'}
                </span>
              ))}
            </div>

            <p className={styles.testimonialTextFull}>
              {activeTestimonial.comment}
            </p>

            <p className={styles.testimonialAuthorFull}>
              - {activeTestimonial.author}
            </p>

            <a
              href={activeTestimonial.urlTestimonial}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.googleButtonFull}
            >
              Ver en Google
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default TestimonialCarousel;
