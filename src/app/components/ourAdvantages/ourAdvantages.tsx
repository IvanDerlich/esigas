import styles from './ourAdvantages.module.css';
import { Inter } from 'next/font/google';
import { AdvantageItem } from './AdvantageItem';
import { advantages } from './advantagesData';

const inter = Inter({
  subsets: ['latin'],
  weight: ['200'],
  display: 'swap',
});

export const OurAdvantages = () => {
  return (
    <div className={`${inter.className} ${styles.contentDescription}`}>
      <h2 className={styles.h2}>¿Por qué elegirnos?</h2>
      {advantages.map((advantage, index) => (
        <AdvantageItem
          key={index}
          title={advantage.title}
          description={advantage.description}
        />
      ))}
    </div>
  );
};
