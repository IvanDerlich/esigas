'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './testimonialCarousel.module.css';

type Props = {
  igUrl: string;
  image: string;
};

export default function InstagramTestimonialCard({ igUrl, image }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={styles.testimonial}>
      <div className={styles.instagramContainer} style={{ position: 'relative' }}>
        
        {!isLoaded && (
          <div className={styles.spinnerOverlay}>
            <div className={styles.spinner}></div>
          </div>
        )}

        <Link 
          href={igUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            opacity: isLoaded ? 1 : 0, 
            transition: 'opacity 0.3s ease-in-out',
            display: 'block' 
          }}
        >
          <Image 
            src={image} 
            alt="Instagram post" 
            fill
            style={{ objectFit: 'cover' }}
            draggable={false}
            priority
            onLoad={() => setIsLoaded(true)}
          />
          <div className={styles.instagramButton}>Ver en Instagram</div>
        </Link>
      </div>
    </div>
  );
}