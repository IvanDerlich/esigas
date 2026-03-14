'use client';

import { useEffect, useRef } from 'react';
import styles from './homeVideo.module.css';
import { oswald } from '@/app/assets/fonts';

export default function HomeVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;

        if (entry.isIntersecting) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section_video}>
      <div className={`${oswald.className} ${styles.container_text}`}>
        <h2 className={styles.title_video}>
          Conocé <span className={styles.green}>nuestro impacto</span>
        </h2>
        <h3 className={styles.subtitle_video}>
          El transporte ecológico a <span className={styles.green}>GNC</span> en
          acción
        </h3>
      </div>
      <div className={styles.container_video}>
        <video
          src="https://zodqmpsbkn9hean6.public.blob.vercel-storage.com/DJI_0450.mp4"
          controls
          autoPlay
          loop
          muted
          playsInline
          className={styles.video}
        />
      </div>
    </section>
  );
}
