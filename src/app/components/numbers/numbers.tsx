'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './numbers.module.css';
import { oswald, poppins } from '@/app/assets/fonts';

const numbersData = [
  { value: 184800, label: 'Kilómetros anuales a GNC por camión' },
  { value: 51744, label: 'Toneladas de CO2 no emitidas' },
  {
    value: 1000,
    label: 'Arboles anuales plantados por camión sin inversión adicional',
  },
  { value: 37, label: 'Años dedicados al GNC' },
];

export const Numbers = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [counts, setCounts] = useState(numbersData.map(() => 0));
  const [startCounter, setStartCounter] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCounter(true);

          numbersData.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems(prev => [...prev, index]);
            }, index * 140);
          });

          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!startCounter) return;

    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const newCounts = numbersData.map(item =>
        Math.floor(item.value * progress)
      );

      setCounts(newCounts);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [startCounter]);

  return (
    <section
      ref={sectionRef}
      className={`${styles.numbers_section} ${oswald.className}`}
    >
      <h2 className={styles.title}>NUESTROS NÚMEROS</h2>

      <div className={styles.numbers_container}>
        {numbersData.map((item, index) => (
          <div
            key={index}
            className={`${styles.number_item} ${
              visibleItems.includes(index) ? styles.numberVisible : ''
            }`}
          >
            <p className={styles.number}>{counts[index].toLocaleString()}</p>
            <p className={`${styles.description} ${poppins.className}`}>
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
