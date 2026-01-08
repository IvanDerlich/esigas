import styles from './location.module.css';
import Image from 'next/image';
import Line from '@/images/line.png';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['200'],
  display: 'swap',
});

const locations = [
  {
    title: 'Casa Central',
    phone: '+54 9 261 3808347',
    address: 'Perito Moreno 508, Godoy Cruz Mendoza',
    email: 'ventas@esigas.com.ar',
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3348.764575397947!2d-68.84776222439675!3d-32.93081777108917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e0bda2029223f%3A0xc6ff105b7a5def65!2sPerito%20Moreno%20508%2C%20M5501%20Mendoza!5e0!3m2!1ses-419!2sar!4v1761935157097!5m2!1ses-419!2sar',
  },
  {
    title: 'Sucursal Ituzaingó',
    phone: '+54 9 261 6913692',
    address: 'Ituzaingó 2536, Ciudad Mendoza',
    email: 'ventas@esigas.com.ar',
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3349.234217496493!2d-68.84500012399988!3d-32.91844197108678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e09ad12bdf3c7%3A0x6b8b8ef6e18a29d9!2sItuzaing%C3%B3%202536%2C%20M5500%20Mendoza!5e0!3m2!1ses-419!2sar!4v1761935200000!5m2!1ses-419!2sar',
    mapLocationRight: false,
  },
  {
    title: 'Sucursal San Rafael',
    phone: '+54 9 260 4482958',
    address: 'Av Mariano Moreno 1315, San Rafael Mendoza',
    email: 'pec3060@esigas.com.ar',
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4644.446875937394!2d-68.33096024722012!3d-34.601129982613266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967907de1fd840e9%3A0x9d9e953d96cf1482!2sAv.%20Mariano%20Moreno%201315%2C%20M5602CNG%20San%20Rafael%2C%20Mendoza!5e0!3m2!1ses-419!2sar!4v1762190955561!5m2!1ses-419!2sar',
  },
];

export default function Location() {
  return (
    <>
      <div className={`${inter.className} ${styles.ubicationContainer}`}>
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

      <div className={`${inter.className} ${styles.ubicationContent}`}>
        {locations.map((loc, index) => (
          <div key={index} className={`${styles.ubicationCard} ${loc.mapLocationRight === false ? styles.reverse : ''
            }`}>
            <div className={loc.mapLocationRight === false ? styles.alignEnd : ''
            }>
              <h3 className={styles.ubicationTitleCard}>{loc.title}</h3>

              <div className={styles.ubicationItem}>
                <span className={styles.green}>Teléfono:</span>
                <br />
                <span className={styles.value}>{loc.phone}</span>
              </div>

              <div className={styles.ubicationItem}>
                <span className={styles.green}>Dirección:</span>
                <br />
                <span className={styles.value}>{loc.address}</span>
              </div>

              <div className={styles.ubicationItem}>
                <span className={styles.green}>Email:</span>
                <br />
                <span className={styles.value}>{loc.email}</span>
              </div>
            </div>
            <div className={styles.mapContainer}>
              <iframe
                src={loc.map}
                width="100%"
                height="350"
                className={styles.map}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
