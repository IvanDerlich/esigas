import Image from 'next/image';
import Link from 'next/link';
import { OurAdvantages } from '../components/ourAdvantages/ourAdvantages';
import { Abyssinica_SIL } from 'next/font/google';
import styles from './page.module.css';
import Carousel from '../components/testimonialCarousel/testimonialCarousel';
import CalendarIcon from '@/images/calendar.png';
import ObleaGnc from '@/images/obleagnc.png';
import Reprueba from '@/images/reprueba.png';
import Contact from '../components/contact/contact';
import Location from '../components/location/location';
import SocialNetwork from '../components/socialNetwork/socialNetwork';
import { Footer } from '../components/layout/footer';
import Navbar from '../components/header/navBar';
import Whatsapp from '@/images/whatsapp.webp';

const abyssinica = Abyssinica_SIL({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Testimonios', href: '#testimonios' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Page() {
  return (
    <>
      <header className={styles.header}>
        <Navbar links={links} />
      </header>
      <main id="home">
        <div className={styles.space}></div>
        <OurAdvantages />
        <Carousel />
        <div
          id="servicios"
          className={`${abyssinica.className} ${styles.services}`}
        >
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
        <Contact />
        <Location />
        <SocialNetwork />
        <Link href="/" className={styles.btnWhatsapp}>
          <Image
            className={styles.imgWhatsapp}
            src={Whatsapp}
            alt="Whatsapp"
            width={100}
            height={100}
          />
        </Link>
      </main>
      <Footer />
    </>
  );
}
