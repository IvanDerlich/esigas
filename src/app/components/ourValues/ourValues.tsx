'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './ourValues.module.css';
import ourValues from '@/images/trabajo-equipo.jpg';

export default function OurValues() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add(styles.animate);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.container_valores}>
      <div className={styles.img_container}>
        <Image
          className={styles.img_valores}
          src={ourValues}
          alt="Nuestros Valores"
        />
      </div>

      <div className={styles.text_valores}>
        <h2 className={styles.title}>Nuestros Valores</h2>

        <ul className={styles.text_group}>
          <li className={styles.item}>
            Profesionalización de nuestros servicios
          </li>
          <li className={styles.item}>
            Uso de normas internacionales de calidad
          </li>
          <li className={styles.item}>Mejora continua</li>
          <li className={styles.item}>Compromiso ambiental</li>
          <li className={styles.item}>Seguridad como prioridad</li>
          <li className={styles.item}>Responsabilidad y ética profesional</li>
          <li className={styles.item}>Orientación al cliente</li>
          <li className={styles.item}>Trabajo en equipo</li>
          <li className={styles.item}>Excelencia operativa</li>
        </ul>
      </div>
    </section>
  );
}
