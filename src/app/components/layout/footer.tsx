import Image from 'next/image';
import styles from './footer.module.css';
import logo from '@/images/logo.png';
import { Abyssinica_SIL } from 'next/font/google';

const abyssinica = Abyssinica_SIL({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Image src={logo} alt="Logo" width={110} height={55} />
      <div className={styles.footer_text}>
        <p className={`${abyssinica.className} ${styles.footer_p}`}>
          © Copyright 2025 Esigas. All Rights Reserved.
        </p>
        <p className={`${abyssinica.className} ${styles.footer_p}`}>
          Made by Datara in 2025
        </p>
      </div>
    </footer>
  );
};
