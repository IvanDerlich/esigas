import styles from './ourAdvantages.module.css';
import { Abyssinica_SIL } from 'next/font/google';
import { AdvantageItem } from './AdvantageItem';
import { advantages } from './advantagesData';

const abyssinica = Abyssinica_SIL({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

export const OurAdvantages = () => {
  return (
    <div className={`${abyssinica.className} ${styles.contentDescription}`}>
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
