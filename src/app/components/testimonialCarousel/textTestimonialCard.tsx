'use client';
import Link from 'next/link';
import styles from './testimonialCarousel.module.css';

type Props = {
  item: {
    title?: string;
    comment?: string;
    author?: string;
    rating?: number;
    urlTestimonial?: string;
  };
  onClick?: () => void;
};

export default function TextTestimonialCard({ item, onClick }: Props) {
  return (
    <div
      className={`${styles.testimonial} ${styles.clickable}`}
      onClick={onClick}
    >
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
        onClick={e => e.stopPropagation()}
      >
        Ver en Google
      </Link>
    </div>
  );
}
