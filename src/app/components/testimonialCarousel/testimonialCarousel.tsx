'use client';
import React, { useEffect, useState } from 'react';
import styles from './testimonialCarousel.module.css';
import testimonialsData from './testimonials.json';
import Image from 'next/image';
import leftArrow from '@/images/Icon-left.png';
import rightArrow from '@/images/Icon-right.png';
import { Abyssinica_SIL } from 'next/font/google';
import Link from 'next/link';

const abyssinica = Abyssinica_SIL({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

const TestimonialCarousel = () => {
  const [start, setStart] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

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

  return (
    <div
      id="testimonios"
      className={`${abyssinica.className} ${styles.container}`}
    >
      <div className={styles.testimonials}>
        <h2 className={styles.testimonialsTitle}>Testimonios</h2>
      </div>
      <div className={styles.testimonialsDescription}>
        <p className={styles.testimonialsSubtitle}>Nuestros clientes opinan</p>
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

        {testimonialsData.slice(start, start + visibleItems).map(
          (
            item: {
              type: string;
              title?: string;
              comment?: string;
              author?: string;
              rating?: number;
              urlTestimonial?: string;
              youtubeId?: string | null;
              igUrl?: string;
              image?: string;
            },
            index
          ) => (
            <div key={index} className={styles.testimonial}>
              {item.type === 'text' ? (
                <>
                  <p className={styles.testimonialText}>{item.title}</p>

                  <div className={styles.stars}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <span key={star} className={styles.star}>
                        {item.rating && item.rating >= star ? '★' : '☆'}
                      </span>
                    ))}
                  </div>
                  <p className={styles.testimonialTextTwo}>{item.comment}</p>
                  <p className={styles.testimonialAuthor}>- {item.author}</p>
                  <Link
                    href={item.urlTestimonial || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.googleButton}
                  >
                    Ver en Google
                  </Link>
                </>
              ) : item.type === 'video' ? (
                <div className={styles.videoContainer}>
                  <iframe
                    width="100%"
                    height="200"
                    src={`https://www.youtube.com/embed/${item.youtubeId}`}
                    title="YouTube video testimonial"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <a
                    href={`https://www.youtube.com/watch?v=${item.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.youtubeButton}
                  >
                    Ver en YouTube
                  </a>
                </div>
              ) : item.type === 'instagram' && item.igUrl ? (
                <div className={styles.instagramContainer}>
                  <Link
                    href={item.igUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={item.image!}
                      alt="Instagram post"
                      width={300}
                      height={300}
                    />
                    <div className={styles.instagramButton}>
                      Ver en Instagram
                    </div>
                  </Link>
                </div>
              ) : null}
            </div>
          )
        )}

        <div
          className={`${styles.arrowWrapper} ${styles.arrowRight} ${start < maxStartIndex ? '' : styles.hidden}`}
        >
          <button className={styles.arrowButton} onClick={handleNext}>
            <Image src={rightArrow} alt="Siguiente" width={40} height={40} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
