import Image from 'next/image';
import logo from '@/images/logo.png';
import Link from 'next/link';
import styles from './page.module.css';
import { Abyssinica_SIL } from 'next/font/google';
import WhyChooseUs from '@/app/components/WhyChooseUs/WhyChooseUs';

const abyssinica = Abyssinica_SIL({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

export default function Page() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Image
            src={logo}
            alt="Logo"
            width={130}
            height={60}
            className={styles.logo}
          />
          <nav className={`${abyssinica.className} ${styles.nav}`}>
            <Link href="/home">Home</Link>
            <Link href="/servicios">¿Cómo Llegar?</Link>
            <Link href="/servicios">Carga Pesada</Link>
            <Link href="/contacto">Contacto</Link>
          </nav>
        </div>
      </header>

      <main>
        <div className={styles.heroImg}>
          <div className={styles.heroContent}>
            <h1 className={styles.h1}>
              Tu estación de confianza, estés donde estés
            </h1>
            <Link href="/" className={styles.btn}>
              Encontra tu estación más cercana
            </Link>
          </div>
        </div>
        <WhyChooseUs />
      </main>
    </>
  );
}
