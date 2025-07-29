'use client';

import { useState } from 'react';
import styles from './WhyChooseUs.module.css';
import { Abyssinica_SIL } from 'next/font/google';

const abyssinica = Abyssinica_SIL({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

export default function WhyChooseUs() {
  const [showMore1, setShowMore1] = useState(false);
  const [showMore2, setShowMore2] = useState(false);

  return (
    <div className={`${abyssinica.className} ${styles.contentDescription}`}>
      <h2 className={styles.h2}>¿Por qué elegirnos?</h2>

      <div className={styles.description}>
        <p className={styles.pTitle}>
          Somos un centro de repruebas de cilindros (CRPC)
        </p>
        <p
          className={`${styles.pDescription} ${!showMore1 ? styles.truncate : ''}`}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry is standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book.
        </p>
        <span
          className={styles.linkLike}
          onClick={() => setShowMore1(!showMore1)}
        >
          {showMore1 ? 'Ver menos' : 'Ver más...'}
        </span>
      </div>

      <div className={styles.description}>
        <p className={styles.pTitle}>
          Somos Productor de Equipos Completos (PEC)
        </p>
        <p
          className={`${styles.pDescription} ${!showMore2 ? styles.truncate : ''}`}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry is standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book.
        </p>
        <span
          className={styles.linkLike}
          onClick={() => setShowMore2(!showMore2)}
        >
          {showMore2 ? 'Ver menos' : 'Ver más...'}
        </span>
      </div>
    </div>
  );
}
