import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { Abyssinica_SIL } from 'next/font/google';
import styles from './page.module.css';
import descripcion_img from '@/images/descripcion_img.jpg';
import { Footer } from './components/layout/footer';
import { strings } from './consts';
import AccordionSlider from './components/accordionSlider/accordionSlider';

const abyssinica = Abyssinica_SIL({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

export default function Home() {
  return (
    <>
      <main className={styles.container_ppl}>
        <AccordionSlider />
        <div className={styles.container_p}>
          <div className={styles.mision}>
            <p className={`${abyssinica.className} ${styles.subtitle}`}>
              Misión
            </p>
            <p className={abyssinica.className}>{strings.mission}</p>
          </div>
          <div className={styles.vision}>
            <p className={`${abyssinica.className} ${styles.subtitle}`}>
              Visión
            </p>
            <p className={abyssinica.className}>{strings.vision}</p>
          </div>
          <div className={styles.valores}>
            <p className={`${abyssinica.className} ${styles.subtitle}`}>
              Valores
            </p>
            <p className={abyssinica.className}>{strings.valores}</p>
          </div>
        </div>
        <div className={styles.container_ppl_descripcion}>
          <div className={styles.container_h2}>
            <h2 className={`${abyssinica.className} ${styles.title_h2}`}>
              Descripción
            </h2>
          </div>
          <div className={styles.container_descripcion}>
            <p className={`${abyssinica.className} ${styles.descripcion}`}>
              {strings.descripcion}
            </p>
            <Image
              className={styles.img_descripcion}
              src={descripcion_img}
              alt="Descripcion"
              width={400}
              height={400}
            />
          </div>
        </div>
        <div className={styles.container_contacto}>
          <h3 className={styles.title_contacto}>Comunicate con nosotros:</h3>
          <a
            className={styles.email_contacto}
            href="mailto:esigas@esigas.com.ar?subject=Consulta%20de%20servicio&body=Hola,%20quisiera%20consultar%20sobre..."
          >
            esigas@esigas.com.ar
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}

const HeroImage = ({
  image,
  alt,
  href,
}: {
  image: StaticImageData;
  alt: string;
  href: string;
}) => {
  return (
    <Link href={href}>
      <Image
        className={styles.img_home}
        src={image}
        alt={alt}
        width={600}
        height={180}
      />
    </Link>
  );
};
