import Image from 'next/image';
import Estacion1 from "@/images/estacion1.png"
import Estacion2 from "@/images/estacion2.png"
import Estacion3 from "@/images/estacion3.png"
import Estacion4 from "@/images/estacion4.png"
import Estacion5 from "@/images/estacion5.png"
import Estacion6 from "@/images/estacion6.png"
import Line from "@/images/line.png"
import logo from '@/images/logo.png';
import Camion from "@/images/camion.png"
import Link from 'next/link';
import styles from './page.module.css';
import { Abyssinica_SIL } from 'next/font/google';
import { OurAdvantages } from '../components/ourAdvantages/ourAdvantages';

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
        <OurAdvantages />
        <div>
          <div className={`${abyssinica.className} ${styles.estaciones}`}>
            <h3 className={styles.estacionesTitle}>Nuestras Estaciones de Servicio</h3>
          </div>
          <div className={`${abyssinica.className} ${styles.containerMaps}`}>
            <div className={styles.maps}>
              <div className={styles.mapContent}>
                <h4 className={styles.mapTitle}>Saavedra 101, Guaymallén, Mendoza</h4>
                <p className={styles.mapItems}>6 ESTACIONES DE CARGA <br />
                  SHOP CAFE COMIDAS PRODUCTOS BASICOS <br />
                  LEÑA HIELO <br />
                  ACEITE AGUA DESTILADA</p>
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
            <div className={styles.mapImage}>
              <Image
                src={Estacion1}
                alt="Estaciones"
                width={365}
                height={180}
                className={styles.imageEstacion}
              />
              <Image
                src={Estacion2}
                alt="Estaciones"
                width={365}
                height={180}
                className={styles.imageEstacion}
              />
              <Image
                src={Estacion3}
                alt="Estaciones"
                width={365}
                height={180}
                className={styles.imageEstacion}
              />
            </div>
          </div>
          <div className={`${abyssinica.className} ${styles.containerMaps}`}>
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
                <h4 className={styles.mapTitle}>Sta Fe 5482 Oeste, Rosario, Santa Fe</h4>
                <p className={styles.mapItems}>6 ESTACIONES DE CARGA <br />
                  SHOP CAFE COMIDAS PRODUCTOS BASICOS <br />
                  LEÑA HIELO <br />
                  ACEITE AGUA DESTILADA</p>
              </div>
            </div>
            <div className={styles.mapImage}>
              <Image
                src={Estacion4}
                alt="Estaciones"
                width={365}
                height={180}
                className={styles.imageEstacion}
              />
              <Image
                src={Estacion5}
                alt="Estaciones"
                width={365}
                height={180}
                className={styles.imageEstacion}
              />
              <Image
                src={Estacion6}
                alt="Estaciones"
                width={365}
                height={180}
                className={styles.imageEstacion}
              />
            </div>
          </div>
        </div>
        <div className={styles.containerTransport}>
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
              width={800}
              height={600}
              className={styles.transport}
            />
            <div className={`${abyssinica.className} ${styles.transporteContainer}`}>
              <div className={styles.transporteText}>
                <h4 className={styles.transporteTitle}>Habilitadas para carga pesada</h4>
                <p className={styles.transporteSub}>Nuestras estaciones están preparadas para recibir vehiculos de gran porte.</p>
                <div className={styles.transporteItems}>
                  <p className={styles.item}>Áreas Amplias de maniobrar</p>
                  <p className={styles.item}>Surtidores adaptados para camiones y colectivos</p>
                  <p className={styles.item}>Pisos reforzados para alto tonelaje</p>
                  <p className={styles.item}>Accesos señalizados y seguros</p>
                </div>
              </div>
              <div className={styles.trasporteBtn}>
                <Link href="/" className={styles.btn}>
                  Encontra tu estación más cercana
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}