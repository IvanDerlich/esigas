'use client';

import { useState } from 'react';
import styles from './ourAdvantages.module.css';

interface AdvantageItemProps {
  title: string;
  description: string;
}

export const AdvantageItem = ({ title, description }: AdvantageItemProps) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className={styles.description}>
      <p className={styles.pTitle}>{title}</p>
      <p
        className={`${styles.pDescription} ${!showMore ? styles.truncate : ''}`}
      >
        {description}
      </p>
      <span className={styles.linkLike} onClick={() => setShowMore(!showMore)}>
        {showMore ? 'Ver menos' : 'Ver más...'}
      </span>
    </div>
  );
};
