import Image from "next/image";
import Link from "next/link";
import { Abyssinica_SIL } from 'next/font/google';
import styles from "./page.module.css";

const abyssinica = Abyssinica_SIL({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

export default function Home() {
  return (
    <div className={styles.container_ppl}>
      <div className={styles.home}>
        <div className={`${abyssinica.className} ${styles.container_title}`}>
          <h1 className={styles.title}>¡Descubri los diferentes servicios que tenemos para ofrecerte!</h1>
        </div>
        <div className={styles.container_img}>
          <Link href={"https://transporteecologico.com.ar"}>
            <Image src="/image/transporte.png" alt="Transporte" width={600} height={180} />
          </Link>
          <Link href={"https://transporteecologico.com.ar"}>
            <Image src="/image/equipos.png" alt="Equipos" width={600} height={180} />
          </Link>
          <Link href={"https://transporteecologico.com.ar"}>
            <Image src="/image/estaciones.png" alt="Estaciones" width={600} height={180} />
          </Link>
        </div>
      </div>
      <div className={styles.container_p}>
        <div className={styles.mision}>
          <p className={`${abyssinica.className} ${styles.subtitle}`}>Misión</p>
          <p className={abyssinica.className}>Ofrecer transporte sostenible con camiones euro 6, a gas nacional reduciendo el uso de combustible diesel, importado mejorando la contaminación ambiental y sonora.
            Desarrollar la transformación a gas de vehículos ciclos otto y diesel,
            Desarrollar los corredores verdes para producir un efecto económico positivo en la economía.</p>
        </div>
        <div className={styles.vision}>
          <p className={`${abyssinica.className} ${styles.subtitle}`}>Vision</p>
          <p className={abyssinica.className}>Ser socios confiables y seguros de aquellas empresas comprometidas con el medio ambiente y la reducción de la huella de carbono ofreciendo servicios de transporte ecológico, en el ámbito nacional e internacional.</p>
        </div>
        <div className={styles.valores}>
          <p className={`${abyssinica.className} ${styles.subtitle}`}>Valores</p>
          <p className={abyssinica.className}>Profesionalización de nuestros servicios
            Uso de normas internacionales de calidad.<br />
            Mejora continua<br />
            Compromiso ambiental</p>
        </div>
      </div>
      <div className={styles.container_ppl_descripcion}>
        <div className={styles.container_h2}>
          <h2 className={`${abyssinica.className} ${styles.title_h2}`}>Descripción</h2>
        </div>
        <div className={styles.container_descripcion}>
          <p className={`${abyssinica.className} ${styles.descripcion}`}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
          <Image src="/image/descripcion_img.jpg" alt="Descripcion" width={400} height={400} />
        </div>
      </div>
      <footer className={styles.footer}>
        <Image src="/image/logo.png" alt="Estaciones" width={110} height={55} />
        <div className={styles.footer_text}>
          <p className={`${abyssinica.className} ${styles.footer_p}`}>© Copyright 2025 Esigas. All Rights Reserved.</p>
          <p className={`${abyssinica.className} ${styles.footer_p}`}>Made by Datara in 2025</p>
        </div>
      </footer>
    </div>
  );
}
