'use client';

import { useEffect, useRef } from 'react';
import styles from './sustainability.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Check from '@/images/check.png';
import { oswald, lato, poppins } from '@/app/assets/fonts';

export const Sustainability = () => {
  const scrollRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
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

  const items = [
    {
      id: 't1',
      content: (
        <h2 className={`${oswald.className} ${styles.title}`}>
          SOSTENIBILIDAD
        </h2>
      ),
    },
    {
      id: 'tx',
      content: (
        <div className={styles.container_text}>
          <p className={styles.text}>
            Nuestra visión es ayudar a combatir la contaminación ambiental y a
            ralentizar el cambio climático. Creemos que es nuestra
            responsabilidad proteger el medio ambiente para las generaciones
            futuras y estamos comprometidos a hacer nuestra parte.
          </p>
          <p className={styles.text}>
            Nuestra misión es proporcionar soluciones tecnológicas que promuevan
            la transición de combustibles líquidos a gas natural. Sabemos que el
            gas natural es una fuente de energía más limpia y menos contaminante
            que otros combustibles fósiles, y queremos ayudar a nuestros
            clientes a hacer la transición de manera eficiente y sostenible.
          </p>
          <p className={styles.text}>
            En nuestra empresa, valoramos la integridad y el servicio por encima
            de todo. Nos esforzamos por ser éticos en todas nuestras decisiones
            y proporcionar un servicio excepcional a nuestros clientes. Nos
            enorgullece ser una empresa de confianza y estamos comprometidos a
            ganarnos su lealtad a largo plazo.
          </p>
          <p className={styles.text}>
            Si está buscando un proyecto en la que pueda confiar para ayudarle a
            hacer la transición a una fuente de energía más sostenible, no
            busque más. Contáctenos hoy mismo para obtener más información y
            empezar a alcanzar sus objetivos de sostenibilidad.
          </p>
        </div>
      ),
    },
    {
      id: 'lk',
      content: (
        <Link
          className={`${poppins.className} ${styles.link}`}
          href="https://api.whatsapp.com/send/?phone=5492615591335"
        >
          <span>Contáctanos</span>
        </Link>
      ),
    },
    {
      id: 'a1-t',
      content: (
        <div className={styles.container_check}>
          <Image src={Check} width={22} height={18} alt="Check" priority />
          <h3 className={`${poppins.className} ${styles.subtitle}`}>
            Un futuro más verde
          </h3>
        </div>
      ),
    },
    {
      id: 'a1-p',
      content: (
        <p className={styles.text}>
          Aplicamos la tecnología de manera sostenible y responsable, con el
          objetivo de proteger el medio ambiente y promover un futuro más verde.
        </p>
      ),
    },
    {
      id: 'a2-t',
      content: (
        <div className={styles.container_check}>
          <Image src={Check} width={22} height={18} alt="Check" priority />
          <h3 className={`${poppins.className} ${styles.subtitle}`}>
            Un presente sin desigualdad
          </h3>
        </div>
      ),
    },
    {
      id: 'a2-p',
      content: (
        <p className={styles.text}>
          Sabemos que la convivencia de género es fundamental para lograr un
          ambiente de trabajo equilibrado y productivo. Por eso, promovemos la
          igualdad de oportunidades y la no discriminación en todas nuestras
          políticas y prácticas de empleo.
        </p>
      ),
    },
  ];

  return (
    <section className={`${lato.className} ${styles.section_sustainability}`}>
      <div className={styles.container_sustainability}>
        {items.map((item, index) => {
          const isButton = item.id === 'lk';

          return (
            <div
              key={item.id}
              ref={addToRefs}
              className={styles.push_block}
              style={
                {
                  '--i': index,
                  transitionDelay: isButton ? '0.8s' : undefined,
                } as React.CSSProperties
              }
            >
              {item.content}
            </div>
          );
        })}
      </div>
    </section>
  );
};
