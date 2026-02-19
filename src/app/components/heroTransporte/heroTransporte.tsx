import styles from './heroTransporte.module.css';
import Image from 'next/image';
import Cloud from '@/images/cloud.png';
import HeroImage from '@/images/hero-transporte.png';
import Link from 'next/link';
import { poppins, bebas } from '@/app/assets/fonts';

export default function HeroTransporte() {
  return (
    <section className={styles.main_container}>
      <div className={styles.containerImages}>
        <Image className={styles.cloud} src={Cloud} alt="Nube" />
        <Image
          className={styles.heroImage}
          src={HeroImage}
          alt="Hero Imagen"
          width={526}
          height={598}
        />
      </div>
      <div className={`${styles.containerText} ${bebas.className}`}>
        <p className={styles.title}>TRANSPORTE ECOLÓGICO</p>
        <div className={styles.textSlider}>
          <p className={`${styles.line} ${styles.line1}`}>
            TRANSPORTAMOS A GNC
          </p>
          <p className={`${styles.line} ${styles.line2}`}>
            CUIDAMOS EL PLANETA
          </p>
        </div>
        <Link
          className={`${styles.link} ${poppins.className}`}
          href="https://api.whatsapp.com/send?phone=542612443304"
        >
          Comenzá
        </Link>
      </div>
    </section>
  );
}
