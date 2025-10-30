'use client';

import { useState } from 'react';
import styles from './accordionSlider.module.css';
import Image from 'next/image';

export default function AccordionSlider() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const slides = [
    {
      id: 1,
      icon: '/Image/logo-transporte-ecologico.png',
      brand: 'Transporte Ecológico',
      name: 'Movilidad Sustentable Esigas',
      subtitle: 'Reducción de emisiones y eficiencia energética',
      specs: [
        'Tecnología: Conversión a Gas Natural Comprimido (GNC)',
        'Beneficio: Reducción del 90% en emisiones de CO₂',
        'Ahorro: Hasta 45% menos costo operativo frente al diésel',
        'Cobertura: Servicio logístico nacional e internacional',
      ],
      badges: [
        'Energía limpia',
        'Transporte inteligente',
        'Certificación ambiental ISO 14001',
      ],
      img: '/Image/transporte-carga-pesada.png',
    },
    {
      id: 2,
      icon: '/Image/logo-simple.png',
      brand: 'Equipos y Revisiones',
      name: 'Control y Certificación de Seguridad',
      subtitle: 'Revisión, mantenimiento y prueba de cilindros GNC',
      specs: [
        'Servicio: Verificación técnica obligatoria de equipos GNC',
        'Pruebas: Hidráulicas y visuales con tecnología certificada',
        'Norma: Cumplimiento de Resolución ENARGAS vigente',
        'Trazabilidad: Registro digital completo y reportes en línea',
      ],
      badges: [
        'Seguridad garantizada',
        'Certificación oficial',
        'Revisión y reprueba integral',
      ],
      img: '/Image/revision-equipo.png',
    },
    {
      id: 3,
      icon: '/Image/logo-simple.png',
      brand: 'Estaciones',
      name: 'Red de Abastecimiento GNC',
      subtitle: 'Carga rápida, segura y eficiente para cada viaje',
      specs: [
        'Infraestructura: Estaciones de carga de alta presión GNC',
        'Ubicación: Red nacional en expansión continua',
        'Tecnología: Sistemas automáticos de medición y control',
        'Servicio: Atención 24/7 con soporte técnico especializado',
      ],
      badges: ['Alta disponibilidad', 'Energía limpia', 'Atención profesional'],
      img: '/Image/estacion-rosario6.jpg',
    },
  ];

  const handleClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.accordionSlider}>
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`${styles.slide} ${activeIndex === i ? styles.active : ''}`}
            style={{ backgroundImage: `url(${slide.img})` }}
            onClick={() => handleClick(i)}
          >
            <div className={styles.overlay}></div>

            <div className={styles.headerClosed}>
              <span className={styles.brandClosed}>
                <span className={styles.brandText}>{slide.brand}</span>
              </span>
              <span className={styles.numberClosed}>
                <Image
                  src={slide.icon}
                  alt={`${slide.brand} icon`}
                  className={styles.iconImage}
                  width={65}
                  height={55}
                />
              </span>
            </div>

            <div className={styles.headerOpen}>
              <span className={styles.numberOpen}>
                <Image
                  src={slide.icon}
                  alt={`${slide.brand} icon`}
                  className={styles.iconImage}
                  width={65}
                  height={55}
                />
              </span>
              <span className={styles.brandOpen}>{slide.brand}</span>
            </div>

            <div className={styles.slideContent}>
              <div className={styles.name}>{slide.name}</div>
              <div className={styles.subtitle}>{slide.subtitle}</div>

              <div className={styles.specs}>
                {slide.specs.map((spec, idx) => (
                  <div key={idx} className={styles.specRow}>
                    {spec}
                  </div>
                ))}
              </div>

              <div className={styles.badges}>
                {slide.badges.map((badge, idx) => (
                  <span key={idx} className={styles.badge}>
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <button
              className={styles.addButton}
              onClick={e => {
                e.stopPropagation();
                handleClick(i);
              }}
            >
              {activeIndex === i ? '−' : '+'}
            </button>
          </div>
        ))}
      </div>

      <button
        className={`${styles.navBtn} ${styles.prev}`}
        onClick={() =>
          handleClick((activeIndex! - 1 + slides.length) % slides.length)
        }
      >
        ‹
      </button>
      <button
        className={`${styles.navBtn} ${styles.next}`}
        onClick={() => handleClick((activeIndex! + 1) % slides.length)}
      >
        ›
      </button>
    </div>
  );
}
