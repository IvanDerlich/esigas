import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import { Footer } from './components/layout/footer';
import AccordionSlider from './components/accordionSlider/accordionSlider';
import OurValues from './components/ourValues/ourValues';
import OurVision from './components/ourVision/ourVision';
import OurMission from './components/ourMission/ourMission';
import OurCompany from './components/ourCompany/ourCompany';
import logo from '@/images/logo.png';

export default function Home() {
  return (
    <>
      <main className={styles.container_ppl}>
        <AccordionSlider />
        <OurCompany />
        <OurMission />
        <OurVision />
        <OurValues />
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
      <Footer logoSrc={logo} />
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
