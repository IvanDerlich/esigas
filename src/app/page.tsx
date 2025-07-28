import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Abyssinica_SIL } from "next/font/google";
import styles from "./page.module.css";
import transporte from "@/images/transporte.png";
import equipos from "@/images/equipos.png";
import estaciones from "@/images/estaciones.png";
import descripcion_img from "@/images/descripcion_img.jpg";
import logo from "@/images/logo.png";
import { strings } from "./consts";

const abyssinica = Abyssinica_SIL({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

console.log("Abyssinica font loaded:", abyssinica);
console.log("Abyssinica font loaded:", abyssinica);
console.log("Abyssinica font loaded:", abyssinica);

export default function Home() {
  return (
    <div className={styles.container_ppl}>
      <div className={styles.home}>
        <div className={`${abyssinica.className} ${styles.container_title}`}>
          <h1 className={styles.title}>
            ¡Descubri los diferentes servicios que tenemos para ofrecerte!
          </h1>
        </div>
        <div className={styles.container_img}>
          <HeroImage
            image={transporte}
            alt="Transporte"
            href={"https://transporteecologico.com.ar"}
          />
          <HeroImage
            image={equipos}
            alt="Equipos"
            href={"https://transporteecologico.com.ar"}
          />
          <HeroImage
            image={estaciones}
            alt="Estaciones"
            href={"https://transporteecologico.com.ar"}
          />
        </div>
      </div>
      <div className={styles.container_p}>
        <div className={styles.mision}>
          <p className={`${abyssinica.className} ${styles.subtitle}`}>Misión</p>
          <p className={abyssinica.className}>{strings.mission}</p>
        </div>
        <div className={styles.vision}>
          <p className={`${abyssinica.className} ${styles.subtitle}`}>Visión</p>
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
      <footer className={styles.footer}>
        <Image src={logo} alt="Logo" width={110} height={55} />
        <div className={styles.footer_text}>
          <p className={`${abyssinica.className} ${styles.footer_p}`}>
            © Copyright 2025 Esigas. All Rights Reserved.
          </p>
          <p className={`${abyssinica.className} ${styles.footer_p}`}>
            Made by Datara in 2025
          </p>
        </div>
      </footer>
    </div>
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
      <Image className={styles.img_home} src={image} alt={alt} width={600} height={180} />
    </Link>
  );
};