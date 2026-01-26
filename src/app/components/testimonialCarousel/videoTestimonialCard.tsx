'use client';
import styles from './testimonialCarousel.module.css';

type Props = {
  youtubeId: string;
};

export default function VideoTestimonialCard({ youtubeId }: Props) {
  return (
    <div className={styles.testimonial}>
      <div className={styles.videoContainer}>
        <iframe
          width="100%"
          height="200"
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title="YouTube video testimonial"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <a
          href={`https://www.youtube.com/watch?v=${youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.youtubeButton}
        >
          Ver en YouTube
        </a>
      </div>
    </div>
  );
}
