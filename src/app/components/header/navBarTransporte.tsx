import Image from 'next/image';
import logo from '@/images/logo-transporte.png';
import styles from './navBarTransporte.module.css';
import Link from 'next/link';
import { Sen, Poppins } from 'next/font/google';

export const sen = Sen({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export default function NavBarTransporte() {
  return (
    <header className={`${sen.className} ${styles.header}`}>
      <Image
        className={styles.logo}
        src={logo}
        alt="Logo Transporte Ecológico"
      />

      <p className={styles.text}>
        Unite a nosotros en esta misión por un futuro más verde
      </p>

      <div>
        <Link
          className={`${poppins.className} ${styles.link}`}
          href="https://api.whatsapp.com/send/?phone=5492615591335&text="
        >
          <span>CONTÁCTANOS</span>
        </Link>
      </div>
    </header>
  );
}
