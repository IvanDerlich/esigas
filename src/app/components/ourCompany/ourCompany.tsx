'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './ourCompany.module.css';
import descripcion_img from '@/images/bosque.jpg';

export default function OurCompany() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  const active = useRef(false);
  const lastScroll = useRef(0);
  const offset = useRef(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const MAX_SHIFT = 90;
    const SPEED = 0.22;

    const tick = () => {
      if (textRef.current) {
        textRef.current.style.transform = `translateY(${offset.current}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (!active.current) return;

      const scrollY = window.scrollY;
      const delta = scrollY - lastScroll.current;
      lastScroll.current = scrollY;

      offset.current -= delta * SPEED;

      if (offset.current > MAX_SHIFT) offset.current = MAX_SHIFT;
      if (offset.current < -MAX_SHIFT) offset.current = -MAX_SHIFT;
    };

    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const VISIBLE_THRESHOLD = 0.3;

          if (entry.intersectionRatio >= VISIBLE_THRESHOLD) {
            active.current = true;

            lastScroll.current = window.scrollY;
          } else {
            active.current = false;
          }
        });
      },
      { threshold: [0, 0.1, 0.25, 0.3, 0.5, 1] }
    );

    raf.current = requestAnimationFrame(tick);
    window.addEventListener('scroll', onScroll, { passive: true });

    if (wrapperRef.current) obs.observe(wrapperRef.current);

    const rect = wrapperRef.current?.getBoundingClientRect();
    if (rect) {
      const vh = window.innerHeight;
      const visiblePx = Math.max(
        0,
        Math.min(rect.bottom, vh) - Math.max(rect.top, 0)
      );
      const visibleRatio = visiblePx / Math.min(rect.height, vh);

      if (visibleRatio >= 0.3) {
        active.current = true;
        lastScroll.current = window.scrollY;
        offset.current = 0;
        if (textRef.current)
          textRef.current.style.transform = `translateY(0px)`;
      }
    }

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener('scroll', onScroll);
      obs.disconnect();
    };
  }, []);

  return (
    <div className={styles.container_ppl_descripcion} ref={wrapperRef}>
      <div className={styles.container_img_descripcion}>
        <Image
          className={styles.img_descripcion}
          src={descripcion_img}
          alt="Bosque"
          priority
        />
      </div>

      <div ref={textRef} className={styles.container_descripcion}>
        <h2 className={styles.h2}>Nuestra Empresa</h2>
        <p className={styles.text_descripcion}>
          ESIGAS es una empresa de servicios de ingeniería dedicada al cambio de
          la matriz energética de combustibles líquidos a gas natural en el
          transporte de personas y cargas, por compromiso ambiental y por efecto
          económico positivo para los usuarios y para el país.
        </p>
      </div>
    </div>
  );
}
