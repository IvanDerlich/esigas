import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import { Footer } from './components/layout/footer';
import { strings } from './consts';
import AccordionSlider from './components/accordionSlider/accordionSlider';
import OurCompany from './components/ourCompany/ourCompany';

export default function Home() {
  return (
    <>
      <main className={styles.container_ppl}>
        <AccordionSlider />
        <OurCompany />
        <div className={styles.container_p}>
          <div className={styles.mision}>
            <p className={styles.subtitle}>Misión</p>
            <p className={styles.mision}>{strings.mission}</p>
          </div>
          <div className={styles.vision}>
            <p className={styles.subtitle}>Visión</p>
            <p className={styles.vision}>{strings.vision}</p>
          </div>
          <div className={styles.valores}>
            <p className={styles.subtitle}>Valores</p>
            <p className={styles.valores}>{strings.valores}</p>
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
