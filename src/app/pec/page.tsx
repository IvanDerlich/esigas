import Link from 'next/link';
import Image from 'next/image';
import oblea from '@/images/oblea.png';
import equipoinstalado from '@/images/equipo-instalado.png';
import centroReprueba1 from '@/images/centro-reprueba1.png';
import centroReprueba2 from '@/images/centro-reprueba2.png';
import centroReprueba3 from '@/images/centro-reprueba3.png';
import centroReprueba4 from '@/images/centro-reprueba4.png';
import { Footer } from '../components/layout/footer';
import { Abyssinica_SIL } from 'next/font/google';
import InteractiveCarousel from './components/InteractiveCarousel';
import styles from './page.module.css';

const abyssinica = Abyssinica_SIL({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

export default function PecPage() {
  return (
    <>
      <main className={styles.container_ppl}>
        <div className={styles.container}>
          <div className={`${abyssinica.className} ${styles.content}`}>
            <p className={styles.text}>¿Querés instalar un equipo?</p>
            <Link className={styles.btn} href="/equipos">
              Consultar
            </Link>
          </div>
          <Image
            className={styles.img_equipos}
            src={equipoinstalado}
            alt="Equipo Instalado"
            width={400}
            height={400}
          />
        </div>

        <div className={styles.container_equipos}>
          <div className={styles.container_img}>
            <Image
              className={styles.img_oblea}
              src={oblea}
              alt="Oblea"
              width={500}
              height={350}
              priority
            />
          </div>
          <div className={`${abyssinica.className} ${styles.content_equipos}`}>
            <p className={styles.text_equipos}>
              Hace tu revisión técnica con nosotros
            </p>
            <Link className={styles.btn_equipos} href="/oblea-reprueba">
              Consultar
            </Link>
          </div>
        </div>

        <div className={styles.container}>
          <div className={`${abyssinica.className} ${styles.content}`}>
            <p className={styles.text}>
              ¿Querés hacer reprueba a tus cilindros?
            </p>
            <Link className={styles.btn} href="/oblea-reprueba">
              Consultar
            </Link>
          </div>
          <InteractiveCarousel
            images={[
              centroReprueba1,
              centroReprueba2,
              centroReprueba3,
              centroReprueba4,
            ]}
            dotClass={styles.dot2}
            activeClass={styles.active2}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
