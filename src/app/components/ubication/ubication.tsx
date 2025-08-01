import styles from './ubication.module.css';
import Image from 'next/image';
import Line from '@/images/line.png';
import { Abyssinica_SIL } from 'next/font/google';

const abyssinica = Abyssinica_SIL({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

export default function Ubication() {
  return (
    <>
      <div className={`${abyssinica.className} ${styles.ubicationContainer}`}>
        <Image
          src={Line}
          alt="Line"
          width={335}
          height={0.5}
          className={styles.ubicationImage}
        />
        <h2 className={styles.ubicationTitle}>Ubicaciones</h2>
        <Image
          src={Line}
          alt="Line"
          width={335}
          height={0.5}
          className={styles.ubicationImage}
        />
      </div>
      <div className={`${abyssinica.className} ${styles.ubicationContent}`}>
        <div className={styles.ubicationCard}>
          <h3 className={styles.ubicationTitleCard}>Casa Central</h3>
          <p className={styles.ubicationText}>
            <span className={styles.green}>Telefono:</span>
            +54 9 2616 92-9656
          </p>
          <p className={styles.ubicationText}>
            <span className={styles.green}>Dirección:</span>
            Ituzaingó 2536, Mendoza Ciudad
          </p>
          <p className={styles.ubicationText}>
            <span className={styles.green}>Email:</span>
            ventas@esigas.com
          </p>
        </div>
        <div className={styles.ubicationCard}>
          <h3 className={styles.ubicationTitleCard}>Sucursal Ituzaingo</h3>
          <p className={styles.ubicationText}>
            <span className={styles.green}>Telefono:</span>
            +54 9 2616 92-9656
          </p>
          <p className={styles.ubicationText}>
            <span className={styles.green}>Dirección:</span>
            Ituzaingó 2536, Mendoza Ciudad
          </p>
          <p className={styles.ubicationText}>
            <span className={styles.green}>Email:</span>
            ventas@esigas.com
          </p>
        </div>
      </div>
    </>
  );
}
