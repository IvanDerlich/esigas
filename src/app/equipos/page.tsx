import { Abyssinica_SIL } from 'next/font/google';
import Image from 'next/image';
import Line from '@/images/line.png';
import Tarjetas from '@/images/tarjetas.png';
import LineGreen from '@/images/line-green.png';
import MediosDePago from '@/images/medios-de-pago.png';
import NavBar from '../components/header/navBar';
import { OurAdvantages } from '../components/ourAdvantages/ourAdvantages';
import styles from './page.module.css';
import Link from 'next/link';
import Calculator from '../components/calculator/calculator';

const abyssinica = Abyssinica_SIL({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Calculadora', href: '#calculadora' },
  { label: 'Financiación', href: '#financiacion' },
  { label: 'Testimonios', href: '/testimonios' },
  { label: 'Contacto', href: '/contacto' },
];

export default function Page() {
  return (
    <>
      <NavBar links={links} />
      <main className={`${abyssinica.className} ${styles.main}`}>
        <div id="home" className={styles.space}></div>
        <OurAdvantages />
        <div id="financiacion" className={styles.equiposFinanciacion}>
          <Image
            src={Line}
            alt="Line"
            width={450}
            height={0.5}
            className={styles.equiposImage}
          />
          <h2 className={styles.equiposTitle}>Financiación</h2>
          <Image
            src={Line}
            alt="Line"
            width={450}
            height={0.5}
            className={styles.equiposImage}
          />
        </div>
        <div className={styles.financiacionContainer}>
          <div className={styles.financiacionSubContainer}>
            <div className={styles.equiposBox}>
              <p className={styles.equiposNumber}>6</p>
              <p className={styles.equiposCuotas}>Cuotas</p>
            </div>
            <div className={styles.equiposBox}>
              <p className={styles.equiposNumber}>12</p>
              <p className={styles.equiposCuotas}>Cuotas</p>
            </div>
            <div className={styles.equiposBox}>
              <p className={styles.equiposNumber}>24</p>
              <p className={styles.equiposCuotas}>Cuotas</p>
            </div>
            <Image
              src={Tarjetas}
              alt="Tarjetas"
              width={190}
              height={160}
              className={styles.equiposImage}
            />
          </div>
          <Link href="/financiacion" className={styles.equiposLink}>
            Consulta Financiación
          </Link>
        </div>
        <Calculator />
        <div className={styles.equiposFinanciacion}>
          <Image
            src={Line}
            alt="Line"
            width={450}
            height={0.5}
            className={styles.equiposImage}
          />
          <h2 className={styles.equiposTitle}>Financiación</h2>
          <Image
            src={Line}
            alt="Line"
            width={450}
            height={0.5}
            className={styles.equiposImage}
          />
        </div>
        <div className={styles.financiacionContainerTwo}>
          <p className={styles.financiacionText}>
            Disponemos de 6, 12 y 24 cuotas
          </p>
          <Image
            src={LineGreen}
            alt="Line Green"
            width={450}
            height={0.5}
            className={styles.equiposLine}
          />
          <p className={styles.financiacionText}>
            ¡Recibimos todas las tarjetas!
          </p>
          <Image
            src={MediosDePago}
            alt="Medios de Pago"
            width={600}
            height={80}
            className={styles.imageFinanciacion}
          />
        </div>
      </main>
    </>
  );
}
