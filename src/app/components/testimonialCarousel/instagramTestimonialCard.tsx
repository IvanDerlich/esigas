'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './testimonialCarousel.module.css';

type Props = {
  igUrl: string;
  image: string;
};

export default function InstagramTestimonialCard({ igUrl, image }: Props) {
  return (
    <div className={styles.testimonial}>
      <div className={styles.instagramContainer}>
        <Link href={igUrl} target="_blank" rel="noopener noreferrer">
          <Image src={image} alt="Instagram post" width={300} height={300} />
          <div className={styles.instagramButton}>Ver en Instagram</div>
        </Link>
      </div>
    </div>
  );
}
