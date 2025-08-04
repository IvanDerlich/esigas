'use client';
import React, { useEffect, useState } from 'react';
import styles from './testimonialCarousel.module.css';
import testimonialsData from './testimonials.json';
import Image from 'next/image';
import leftArrow from '@/images/Icon-left.png';
import rightArrow from '@/images/Icon-right.png';

const TestimonialCarousel = () => {
  const [start, setStart] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);

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

  return (
    <div className={styles.container}>
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
      <div className={styles.testimonialsContent}>
        <div
          className={`${styles.arrowWrapper} ${start > 0 ? '' : styles.hidden}`}
        >
          <button className={styles.arrowButton} onClick={handlePrev}>
            <Image src={leftArrow} alt="Anterior" width={40} height={40} />
          </button>
        </div>

        {testimonialsData
          .slice(start, start + visibleItems)
          .map((item, index) => (
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
                </>
              ) : (
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
              )}
            </div>
          ))}

        <div
          className={`${styles.arrowWrapper} ${start < maxStartIndex ? '' : styles.hidden}`}
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
