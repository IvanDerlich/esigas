'use client';

import { useEffect, useRef } from 'react';
import styles from './arguments.module.css';
import Image from 'next/image';
import Mapa from '@/images/mapa.png';
import Circle from '@/images/circle.png';
import { lato, oswald } from '@/app/assets/fonts';

export const Arguments = () => {
  const scrollRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    scrollRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !scrollRefs.current.includes(el)) {
      scrollRefs.current.push(el);
    }
  };

  return (
    <section className={styles.arguments_section}>
      <div ref={addToRefs} className={`${styles.hidden} ${styles.from_left}`}>
        <Image
          className={styles.arguments_image_map}
          src={Mapa}
          alt="Mapa"
          width={300}
          height={650}
        />
      </div>

      <div className={`${lato.className} ${styles.arguments_text}`}>
        <h2 className={`${oswald.className} ${styles.arguments_title}`}>
          La solución sostenible para tu transporte nacional e internacional
        </h2>

        <div
          ref={addToRefs}
          className={`${styles.hidden} ${styles.from_right} ${styles.arguments_text}`}
        >
          <p className={styles.arguments_description}>
            Transportamos cargas en todo el territorio de Argentina y Chile,
            utilizando vehículos propulsados por gas natural comprimido (GNC).
          </p>
          <p className={styles.arguments_description}>
            Nos esforzamos por ser la mejor opción de transporte de cargas en la
            región, ofreciendo un servicio de alta calidad y una amplia red de
            destinos. Nuestra flota de vehículos a GNC nos permite ofrecer un
            servicio más limpio y sostenible, reduciendo nuestro impacto
            ambiental y contribuyendo a la lucha contra la contaminación.
          </p>
          <p className={styles.arguments_description}>
            Además, nuestro equipo de profesionales altamente capacitados se
            asegura de que su carga llegue a su destino de manera segura y
            oportuna.
          </p>
          <p className={styles.arguments_description}>
            Proporcionamos un servicio excepcional a nuestros clientes, haciendo
            todo lo posible para satisfacer sus necesidades de transporte.
          </p>
          <p className={styles.arguments_description}>
            Si necesita una empresa de transporte de confianza para llevar su
            carga a cualquier parte de Argentina o Chile, no dude en ponerse en
            contacto con nosotros. Estamos dispuestos a ayudarle a encontrar la
            solución de transporte que mejor se adapte a sus necesidades.
          </p>
        </div>

        <div
          ref={addToRefs}
          className={`${styles.hidden} ${styles.from_right} ${styles.delay_item}`}
        >
          <div className={styles.arguments_item}>
            <Image src={Circle} alt="Logo" width={55} height={55} />
            <p className={styles.arguments_description}>NOS HICIMOS CARGO</p>
          </div>
        </div>

        <div
          ref={addToRefs}
          className={`${styles.hidden} ${styles.from_right}`}
        >
          <p className={styles.arguments_description}>
            Somos los primeros en Sudamérica en transformar camiones de carga a
            GNC. Decidimos convertir los transportes de Gas Oil a GNC y así
            reducimos la huella de carbono de cada viaje en un significativo 30
            % por viaje.
          </p>
        </div>

        <div
          ref={addToRefs}
          className={`${styles.hidden} ${styles.from_right} ${styles.delay_item}`}
        >
          <div className={styles.arguments_item}>
            <Image src={Circle} alt="Logo" width={55} height={55} />
            <p className={styles.arguments_description}>TU EMPRESA</p>
          </div>
        </div>

        <div
          ref={addToRefs}
          className={`${styles.hidden} ${styles.from_right}`}
        >
          <p className={styles.arguments_description}>
            Podrás cumplir con los estándares de empresa sustentable, como así
            aportar desde el transporte a la responsabilidad social empresarial.
          </p>
        </div>
      </div>
    </section>
  );
};
