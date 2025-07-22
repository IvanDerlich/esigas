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
          <p className={styles.subtitle}>Misión</p>
          <p>Ofrecer transporte sostenible con camiones euro 6, a gas nacional reduciendo el uso de combustible diesel, importado mejorando la contaminación ambiental y sonora.
            Desarrollar la transformación a gas de vehículos ciclos otto y diesel,
            Desarrollar los corredores verdes para producir un efecto económico positivo en la economía.</p>
        </div>
        <div className={styles.vision}>
          <p className={styles.subtitle}>Vision</p>
          <p>Ser socios confiables y seguros de aquellas empresas comprometidas con el medio ambiente y la reducción de la huella de carbono ofreciendo servicios de transporte ecológico, en el ámbito nacional e internacional.</p>
        </div>
        <div className={styles.valores}>
          <p className={styles.subtitle}>Valores</p>
          <p>Profesionalización de nuestros servicios
            Uso de normas internacionales de calidad.<br/>
            Mejora continua<br/>
            Compromiso ambiental</p>
        </div>
      </div>
      <div className={styles.container_descripcion}>
        <div>
          <h2>Descripción</h2>
        </div>
      </div>
    </div>
  );
}
