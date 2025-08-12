import styles from './socialNetwork.module.css';
import Image from 'next/image';
import Facebook from '@/images/fb.png';
import Instagram from '@/images/ig.png';
import Phone from '@/images/phone.png';
import { Abyssinica_SIL } from 'next/font/google';
import Line from '@/images/line.png';
import Link from 'next/link';

const abyssinica = Abyssinica_SIL({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

export default function SocialNetwork() {
  return (
    <>
      <div className={`${abyssinica.className} ${styles.redesContainer}`}>
        <Image
          src={Line}
          alt="Line"
          width={335}
          height={0.5}
          className={styles.redesImage}
        />
        <h2 className={styles.redesTitle}>Redes Sociales</h2>
        <Image
          src={Line}
          alt="Line"
          width={335}
          height={0.5}
          className={styles.redesImage}
        />
      </div>
      <div className={`${abyssinica.className} ${styles.container}`}>
        <div className={`${abyssinica.className} ${styles.containerContent}`}>
          <div className={styles.socialContainer}>
            <h3 className={styles.title}>
              Seguinos en nuestras redes sociales
            </h3>
            <p className={styles.subtitle}>
              y enterate de todas nuestras novedades
            </p>
          </div>
          <div className={styles.socialIcons}>
            <Link
              className={styles.icon}
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={Facebook} alt="Facebook" width={83} height={83} />
            </Link>
            <Link
              className={styles.icon}
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={Instagram} alt="Instagram" width={84} height={84} />
            </Link>
            <Link className={styles.icon} href="tel:+1234567890">
              <Image src={Phone} alt="Phone" width={83} height={83} />
            </Link>
          </div>
        </div>
        <div className={`${abyssinica.className} ${styles.newsletter}`}>
          <div className={styles.newsletterContent}>
            <h3 className={styles.newsletterTitle}>
              ¿Querés conocer nuestras novedades?
            </h3>
            <p className={styles.newsletterText}>
              Inscribite a nuestro newsletter y recibí toda la info!
            </p>
          </div>
          <form className={styles.form}>
            <input
              type="email"
              placeholder="Ingresa tu email"
              className={styles.input}
              required
            />
            <button type="submit" className={styles.button}>
              Suscribirme
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
