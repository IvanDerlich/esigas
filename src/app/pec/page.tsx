import Link from "next/link";
import Image from 'next/image';
import oblea from "@/images/oblea.png";
import equipoinstalado from "@/images/equipo-instalado.png";
import equipognc from "@/images/equipo-gnc.png";
import cilindromaquina from "@/images/cilindro-maquina.png";
import tubognc from "@/images/tubo-gnc.png";
import logo from "@/images/logo.png";
import { Abyssinica_SIL } from "next/font/google";
import InteractiveCarousel from './components/InteractiveCarousel';
import styles from "./page.module.css";

const abyssinica = Abyssinica_SIL({
    subsets: ["latin"],
    weight: ["400"],
    display: "swap",
});

export default function PecPage() {
    return (
        <div className={styles.container_ppl}>

            <div className={styles.container}>
                <div className={`${abyssinica.className} ${styles.content}`}>
                    <p className={styles.text}>Hace tu revisión técnica con nosotros</p>
                    <Link className={styles.btn} href="https://transporteecologico.com.ar">
                        Consultar
                    </Link>
                </div>
                <div className={styles.container_img}>
                    <Image
                        className={styles.img_oblea}
                        src={oblea}
                        alt="Oblea"
                        width={500}
                        priority
                    />
                </div>
            </div>

            <div className={styles.container_equipos}>
                <InteractiveCarousel
                    images={[equipoinstalado, equipognc]}
                    width={400}
                    height={400}
                    radius="15px"
                    dotClass={styles.dot}
                    activeClass={styles.active}
                />
                <div className={`${abyssinica.className} ${styles.content_equipos}`}>
                    <p className={styles.text_equipos}>¿Querés instalar un equipo?</p>
                    <Link className={styles.btn_equipos} href="https://transporteecologico.com.ar">
                        Consultar
                    </Link>
                </div>
            </div>

            <div className={styles.container}>
                <div className={`${abyssinica.className} ${styles.content}`}>
                    <p className={styles.text}>¿Querés hacer reprueba a tus cilindros?</p>
                    <Link className={styles.btn} href="https://transporteecologico.com.ar">
                        Consultar
                    </Link>
                </div>
                <InteractiveCarousel
                    images={[cilindromaquina, tubognc]}
                    width={450}
                    height={350}
                    radius="10px"
                    dotClass={styles.dot2}
                    activeClass={styles.active2}
                />
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
