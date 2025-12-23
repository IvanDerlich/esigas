import Image from 'next/image';
import Estacionmza1 from '@/images/estacion-mendoza1.png';
import Estacionmza2 from '@/images/estacion-mendoza2.png';
import Estacionmza3 from '@/images/estacion-mendoza3.png';
import Estacionmza4 from '@/images/estacion-mendoza4.png';
import Estacionmza5 from '@/images/estacion-mendoza5.png';
import Estacionmza6 from '@/images/estacion-mendoza6.png';
import Estacionr1 from '@/images/estacion-rosario1.jpg';
import Estacionr2 from '@/images/estacion-rosario2.jpg';
import Estacionr3 from '@/images/estacion-rosario3.jpg';
import Estacionr4 from '@/images/estacion-rosario4.jpg';
import Estacionr5 from '@/images/estacion-rosario5.jpg';
import Estacionr6 from '@/images/estacion-rosario6.jpg';
import Line from '@/images/line.png';
import Camion from '@/images/camion.jpg';
import Link from 'next/link';
import styles from './page.module.css';
import { Abyssinica_SIL } from 'next/font/google';
import { OurAdvantages } from '../components/ourAdvantages/ourAdvantages';
import CarouselMobile from '../components/carouselMobile/carouselMobile';
import NavbarTwo from '../components/header/navBarEstaciones';
import Contact from '../components/contact/contact';
import SocialNetwork from '../components/socialNetwork/socialNetwork';
import { Footer } from '../components/layout/footer';
import Whatsapp from '@/images/whatsapp.png';
import logo from '@/images/logo-esignc.png';

const abyssinica = Abyssinica_SIL({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

const links = [
  { label: 'Home', href: '#home' },
  { label: '¿Cómo Llegar?', href: '#como-llegar' },
  { label: 'Carga Pesada', href: '#carga-pesada' },
  { label: 'Contacto', href: '#contacto' },
];

const imagesSet = [
  { src: Estacionmza1, alt: 'Estación 1' },
  { src: Estacionmza2, alt: 'Estación 2' },
  { src: Estacionmza3, alt: 'Estación 3' },
  { src: Estacionmza4, alt: 'Estación 4' },
  { src: Estacionmza5, alt: 'Estación 5' },
  { src: Estacionmza6, alt: 'Estación 6' },
];

const imagesSetTwo = [
  { src: Estacionr1, alt: 'Estación 1' },
  { src: Estacionr2, alt: 'Estación 2' },
  { src: Estacionr3, alt: 'Estación 3' },
  { src: Estacionr4, alt: 'Estación 4' },
  { src: Estacionr5, alt: 'Estación 5' },
  { src: Estacionr6, alt: 'Estación 6' },
];

export default function Page() {
  return (
    <>
      <header>
        <NavbarTwo links={links} />
      </header>

      <main id="home">
        <div className={styles.space}></div>
        <div className={styles.heroImg}>
          <div className={styles.heroContent}>
            <h1 className={styles.h1}>
              Tu estación de confianza, estés donde estés
            </h1>
            <Link href="#como-llegar" className={styles.btn}>
              Encontrá tu estación más cercana
            </Link>
          </div>
        </div>
        <OurAdvantages />
        <div>
          <div
            id="como-llegar"
            className={`${abyssinica.className} ${styles.estaciones}`}
          >
            <h3 className={styles.estacionesTitle}>
              Nuestras Estaciones de Servicio
            </h3>
          </div>
          <div className={styles.containerMaps}>
            <div className={styles.maps}>
              <div className={styles.mapContent}>
                <h4 className={`${abyssinica.className} ${styles.mapTitle}`}>
                  Saavedra 101, Guaymallén, Mendoza
                </h4>
                <p className={styles.mapItems}>
                  6 ESTACIONES DE CARGA <br />
                  SHOP CAFE COMIDAS PRODUCTOS BASICOS <br />
                  LEÑA HIELO <br />
                  ACEITE AGUA DESTILADA
                </p>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.244238680631!2d-68.83192682453506!3d-32.89171017361593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e093c98fcf3bf%3A0x8699a83fb67a3a27!2sSaavedra%20101%2C%20M5519%20Mendoza!5e0!3m2!1sen!2sar!4v1754329864541!5m2!1sen!2sar"
                width="500"
                height="350"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className={styles.ubication}
              />
            </div>
            <CarouselMobile images={imagesSet} />
          </div>
          <div className={styles.containerMaps}>
            <div className={styles.maps}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3348.5993862555056!2d-60.70113442453317!3d-32.93518117359797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b65335817e183f%3A0xe8ff445f5642cb6!2sSta%20Fe%205482%2C%20S2008%20GRN%2C%20Santa%20Fe!5e0!3m2!1sen!2sar!4v1754332486011!5m2!1sen!2sar"
                width="500"
                height="350"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className={styles.ubication}
              />
              <div className={styles.mapContent}>
                <h4 className={`${abyssinica.className} ${styles.mapTitle}`}>
                  Sta Fe 5482 Oeste, Rosario, Santa Fe
                </h4>
                <p className={styles.mapItems}>
                  6 ESTACIONES DE CARGA <br />
                  SHOP CAFE COMIDAS PRODUCTOS BASICOS <br />
                  LEÑA HIELO <br />
                  ACEITE AGUA DESTILADA
                </p>
              </div>
            </div>
            <CarouselMobile images={imagesSetTwo} />
          </div>
        </div>
        <div id="carga-pesada" className={styles.containerTransport}>
          <Image
            src={Line}
            alt="Line"
            width={1065}
            height={0.5}
            className={styles.line}
          />
          <div className={styles.transporteInfo}>
            <Image
              src={Camion}
              alt="Transporte"
              width={660}
              height={350}
              className={styles.transport}
            />
            <div
              className={`${abyssinica.className} ${styles.transporteContainer}`}
            >
              <div className={styles.transporteText}>
                <h4 className={styles.transporteTitle}>
                  Habilitadas para carga pesada
                </h4>
                <p className={styles.transporteSub}>
                  Nuestras estaciones están preparadas para recibir vehículos de
                  gran porte.
                </p>
                <div className={styles.transporteItems}>
                  <p className={styles.item}>Áreas Amplias de maniobrar</p>
                  <p className={styles.item}>
                    Surtidores adaptados para camiones y colectivos
                  </p>
                  <p className={styles.item}>
                    Pisos reforzados para alto tonelaje
                  </p>
                  <p className={styles.item}>Accesos señalizados y seguros</p>
                </div>
              </div>
              <div className={styles.trasporteBtn}>
                <Link href="#como-llegar" className={styles.btn}>
                  Encontrá tu estación más cercana
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div id="contacto">
          <Contact formType="estaciones" showContact={true} showCheckboxes />
        </div>
        <SocialNetwork showNewsletter={false} />
        <Link
          href="https://wa.me/+5492613252113"
          className={styles.btnWhatsapp}
        >
          <Image
            className={styles.imgWhatsapp}
            src={Whatsapp}
            alt="Whatsapp"
            width={120}
            height={120}
          />
        </Link>
      </main>
      <Footer logoSrc={logo} />
    </>
  );
}
