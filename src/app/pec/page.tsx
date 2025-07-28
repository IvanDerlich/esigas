'use client';

import { useEffect, useState } from 'react';
import Link from "next/link";
import Image from 'next/image';
import oblea from "@/images/oblea.png";
import equipoinstalado from "@/images/equipo-instalado.png";
import equipognc from "@/images/equipo-gnc.png";
import cilindromaquina from "@/images/cilindro-maquina.png";
import tubognc from "@/images/tubo-gnc.png";
import logo from "@/images/logo.png";
import { Abyssinica_SIL } from "next/font/google";
import styles from "./page.module.css";

const abyssinica = Abyssinica_SIL({
    subsets: ["latin"],
    weight: ["400"],
    display: "swap",
});

export default function PecPage() {
    const [slideIndex, setSlideIndex] = useState(0);
    const images = [equipoinstalado, equipognc];
    const [slideIndex2, setSlideIndex2] = useState(0);
    const images2 = [cilindromaquina, tubognc];

    useEffect(() => {
        const interval = setInterval(() => {
            setSlideIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    useEffect(() => {
        const interval = setInterval(() => {
            setSlideIndex2((prevIndex) => (prevIndex + 1) % images2.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images2.length]);

    return (
        <div>

            <div className={styles.container}>
                <div className={`${abyssinica.className} ${styles.content}`}>
                    <p className={styles.text}>Hace tu revisión técnica con nosotros</p>
                    <Link className={styles.btn} href="https://transporteecologico.com.ar">
                        Consultar
                    </Link>
                </div>
                <div className={styles.container_img}>
                    <Image 
                        src={oblea} 
                        alt="Oblea" 
                        width={500} 
                        priority />
                </div>
            </div>

            <div className={styles.container_equipos}>
                <div className={styles.carousel_container}>
                    <div
                        className={styles.carousel_slider}
                        style={{ transform: `translateX(-${slideIndex * 100}%)` }}
                    >
                        {images.map((img, index) => (
                            <div key={index} className={styles.carousel_slide}>
                                <Image
                                    style={{ borderRadius: '15px' }}
                                    src={img} alt={`Slide-${index}`}
                                    width={400}
                                    height={400}
                                    priority
                                />
                            </div>
                        ))}
                    </div>
                    <div className={styles.carousel_dots}>
                        {images.map((_, i) => (
                            <span
                                key={i}
                                className={`${styles.dot} ${i === slideIndex ? styles.active : ''}`}
                                onClick={() => setSlideIndex(i)}
                            />
                        ))}
                    </div>
                </div>
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
                <div className={styles.carousel_container}>
                    <div
                        className={styles.carousel_slider}
                        style={{ transform: `translateX(-${slideIndex2 * 100}%)` }}
                    >
                        {images2.map((img, index) => (
                            <div key={index} className={styles.carousel_slide}>
                                <Image
                                    style={{ borderRadius: '15px' }}
                                    src={img}
                                    alt={`Slide2-${index}`}
                                    width={450}
                                    height={400}
                                    priority
                                />
                            </div>
                        ))}
                    </div>
                    <div className={styles.carousel_dots}>
                        {images2.map((_, i) => (
                            <span
                                key={i}
                                className={`${styles.dot2} ${i === slideIndex2 ? styles.active2 : ''}`}
                                onClick={() => setSlideIndex2(i)}
                            />
                        ))}
                    </div>
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
