'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './ourValues.module.css';
import ourValues from '@/images/trabajo-equipo.jpg';

export default function OurValues() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add(styles.animate);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.container_valores}>
      <div className={styles.img_container}>
        <Image
          className={styles.img_valores}
          src={ourValues}
          alt="Nuestros Valores"
        />
      </div>

      <div className={styles.text_valores}>
        <h2 className={styles.title}>Nuestros Valores</h2>

        <div className={styles.text_group}>
          <div className={styles.content_values}>
            <p className={styles.subtitle}>
              Profesionalización de nuestros servicios
            </p>
            <p className={styles.text}>
              Respaldada por equipos técnicos capacitados y procesos
              estandarizados.
            </p>
          </div>

          <div className={styles.content_values}>
            <p className={styles.subtitle}>
              Uso de normas internacionales de calidad
            </p>
            <p className={styles.text}>
              Garantizando seguridad, eficiencia y confiabilidad en cada
              proyecto.
            </p>
          </div>

          <div className={styles.content_values}>
            <p className={styles.subtitle}>Mejora continua</p>
            <p className={styles.text}>
              Incorporando innovación, tecnología y aprendizaje constante.
            </p>
          </div>

          <div className={styles.content_values}>
            <p className={styles.subtitle}>Compromiso ambiental</p>
            <p className={styles.text}>
              Promoviendo soluciones sustentables y desarrollo responsable.
            </p>
          </div>

          <div className={styles.content_values}>
            <p className={styles.subtitle}>Seguridad como prioridad</p>
            <p className={styles.text}>
              Cuidando a las personas, instalaciones y el entorno.
            </p>
          </div>

          <div className={styles.content_values}>
            <p className={styles.subtitle}>
              Responsabilidad y ética profesional
            </p>
            <p className={styles.text}>
              Actuando con transparencia e integridad.
            </p>
          </div>

          <div className={styles.content_values}>
            <p className={styles.subtitle}>Orientación al cliente</p>
            <p className={styles.text}>
              Soluciones a medida y acompañamiento permanente.
            </p>
          </div>

          <div className={styles.content_values}>
            <p className={styles.subtitle}>Trabajo en equipo</p>
            <p className={styles.text}>Colaboración y crecimiento conjunto.</p>
          </div>

          <div className={styles.content_values}>
            <p className={styles.subtitle}>Excelencia operativa</p>
            <p className={styles.text}>
              Resultados consistentes y de alto nivel.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
