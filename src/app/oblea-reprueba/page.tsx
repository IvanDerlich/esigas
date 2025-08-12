import Image from 'next/image';
import logo from '@/images/logo.png';
import Link from 'next/link';
import { OurAdvantages } from '../components/ourAdvantages/ourAdvantages';
import { Abyssinica_SIL } from 'next/font/google';
import styles from './page.module.css';
import Carousel from '../components/testimonialCarousel/testimonialCarousel';
import CalendarIcon from '@/images/calendar.png';
import ObleaGnc from '@/images/obleagnc.png';
import Reprueba from '@/images/reprueba.png';

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

          <input
            type="checkbox"
            id="menu-toggle"
            className={styles.menuToggle}
          />
          <label htmlFor="menu-toggle" className={styles.menuIcon}>
            <span></span>
            <span></span>
            <span></span>
          </label>

          <nav className={`${abyssinica.className} ${styles.nav}`}>
            <Link href="/home">Home</Link>
            <Link href="/servicios">Testimonios</Link>
            <Link href="/servicios">Servicios</Link>
            <Link href="/contacto">Contacto</Link>
          </nav>
        </div>
      </header>
      <main>
        <div className={styles.space}></div>
        <OurAdvantages />
        <Carousel />
        <div className={`${abyssinica.className} ${styles.services}`}>
          <div className={styles.serviceHeader}>
            <h3 className={styles.serviceTitle}>
              Servicios rápidos y confiables
            </h3>
          </div>
          <div className={styles.serviceCards}>
            <div className={styles.serviceCard}>
              <Image src={ObleaGnc} alt="Oblea GNC" width={90} height={90} />
              <p className={styles.serviceDescription}>
                Hacé tu oblea con nosotros
              </p>
              <p className={styles.serviceSubtitle}>
                Renová tu oblea en minutos, con la seguridad que necesitas
              </p>
              <Link href="/oblea-reprueba" className={styles.link}>
                <Image
                  src={CalendarIcon}
                  alt="Calendario"
                  width={20}
                  height={20}
                />
                Solicitar Turno
              </Link>
            </div>

            <div className={styles.serviceCard}>
              <Image src={Reprueba} alt="Reprueba" width={90} height={90} />
              <p className={styles.serviceDescription}>
                Hacé la reprueba de tus cilindros con nosotros
              </p>
              <p className={styles.serviceSubtitle}>
                Revisamos y certificamos tus cilindros según normativa
              </p>
              <Link href="/oblea-reprueba" className={styles.link}>
                <Image
                  src={CalendarIcon}
                  alt="Calendario"
                  width={20}
                  height={20}
                />
                Solicitar Turno
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
