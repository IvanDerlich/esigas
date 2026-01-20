import Image, { StaticImageData } from 'next/image';
import styles from './footer.module.css';
import { abyssinica } from '@/app/assets/fonts';

type FooterProps = {
  logoSrc: StaticImageData;
};

export const Footer = ({ logoSrc }: FooterProps) => {
  return (
    <footer className={styles.footer}>
      <Image src={logoSrc} alt="Logo" width={110} height={55} />

      <div className={styles.content_footer}>
        <div className={styles.footer_text}>
          <p className={`${abyssinica.className} ${styles.footer_p}`}>
            Made by Datara in 2025
          </p>
        </div>

        <div className={`${abyssinica.className} ${styles.contact_info}`}>
          <p className={styles.title_contacto}>Contacto:</p>
          <a
            className={styles.email_contacto}
            href="mailto:esigas@esigas.com.ar?subject=Consulta%20de%20servicio&body=Hola,%20quisiera%20consultar%20sobre..."
          >
            esigas@esigas.com.ar
          </a>
        </div>
      </div>
    </footer>
  );
};
