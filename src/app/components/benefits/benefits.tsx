'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './benefits.module.css';
import Image from 'next/image';
import route from '@/images/ruta.png';
import send from '@/images/enviado.png';
import professionals from '@/images/profesionales.png';
import { oswald, lato } from '@/app/assets/fonts';

export const Benefits = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 769;

  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));

            setTimeout(() => {
              setVisibleItems(prev => [...prev, index]);
            }, index * 200);

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    itemsRef.current.forEach(item => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <section className={styles.benefits}>
      <h1 className={`${oswald.className} ${styles.title}`}>
        El transporte sostenible a GNC es nuestra experiencia
      </h1>
      <h2 className={`${lato.className} ${styles.subtitle}`}>
        Reducirás en un 30% la huella de carbono de tus productos
      </h2>
      <div className={styles.items}>
        <div
          ref={el => {
            itemsRef.current[0] = el;
          }}
          data-index="0"
          className={`${styles.item} ${
            isMobile && visibleItems.includes(0) ? styles.itemVisible : ''
          }`}
        >
          <Image
            className={styles.image}
            src={send}
            alt="Enviado"
            width={80}
            height={80}
            priority
          />
          <p className={`${oswald.className} ${styles.itemTitle}`}>
            ESCALABILIDAD
          </p>
          <p className={`${lato.className} ${styles.itemContent}`}>
            33,5 toneladas de carga útil para optimizar recursos.
          </p>
        </div>
        <div
          ref={el => {
            itemsRef.current[1] = el;
          }}
          data-index="1"
          className={`${styles.item} ${
            isMobile && visibleItems.includes(1) ? styles.itemVisible : ''
          }`}
        >
          <Image
            className={styles.image}
            src={route}
            alt="Ruta"
            width={80}
            height={80}
            priority
          />
          <p className={`${oswald.className} ${styles.itemTitle}`}>
            SOSTENIBILIDAD
          </p>
          <p className={`${lato.className} ${styles.itemContent}`}>
            50 toneladas de CO2 no emitidos utilizando nuestras unidades a GNC.
          </p>
        </div>
        <div
          ref={el => {
            itemsRef.current[2] = el;
          }}
          data-index="2"
          className={`${styles.item} ${
            isMobile && visibleItems.includes(2) ? styles.itemVisible : ''
          }`}
        >
          <Image
            className={styles.image}
            src={professionals}
            alt="Profesionales"
            width={80}
            height={80}
            priority
          />
          <p className={`${oswald.className} ${styles.itemTitle}`}>INCLUSIÓN</p>
          <p className={`${lato.className} ${styles.itemContent}`}>
            Es fundamental para lograr un ambiente de trabajo equilibrado y
            productivo. Por eso, promovemos la igualdad de oportunidades y la no
            discriminación en todas nuestras políticas y prácticas de empleo.
          </p>
        </div>
      </div>
    </section>
  );
};
