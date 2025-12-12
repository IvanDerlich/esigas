'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './ourMission.module.css';
import ourMission from '@/images/ourMission.png';

export default function OurMission() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const imgWrapRef = useRef<HTMLDivElement | null>(null);
  const active = useRef(false);
  const lastScroll = useRef(0);
  const targetOffset = useRef(0);
  const currentOffset = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const MAX_SHIFT = 90;
    const SPEED = 0.12;
    const SMOOTH = 0.12;

    const onScroll = () => {
      if (!active.current) return;
      const scrollY = window.scrollY;
      const delta = scrollY - lastScroll.current;
      lastScroll.current = scrollY;

      targetOffset.current -= delta * SPEED;

      if (targetOffset.current > MAX_SHIFT) targetOffset.current = MAX_SHIFT;
      if (targetOffset.current < -MAX_SHIFT) targetOffset.current = -MAX_SHIFT;
    };

    const tick = () => {
      currentOffset.current +=
        (targetOffset.current - currentOffset.current) * SMOOTH;
      if (imgWrapRef.current) {
        imgWrapRef.current.style.transform = `translateY(${currentOffset.current.toFixed(2)}px)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.intersectionRatio >= 0.08) {
            active.current = true;
            lastScroll.current = window.scrollY;
          } else {
            active.current = false;
          }
        });
      },
      { threshold: [0, 0.05, 0.08, 0.2, 0.5, 1] }
    );

    rafId.current = requestAnimationFrame(tick);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      lastScroll.current = window.scrollY;
    });

    if (wrapperRef.current) observer.observe(wrapperRef.current);

    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const visiblePx = Math.max(
        0,
        Math.min(rect.bottom, vh) - Math.max(rect.top, 0)
      );
      const visibleRatio = visiblePx / Math.min(rect.height || 1, vh);
      if (visibleRatio >= 0.08) {
        active.current = true;
        lastScroll.current = window.scrollY;
        targetOffset.current = 0;
      }
    }

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <section className={styles.container_ppl_mision} ref={wrapperRef}>
      <div className={styles.container_img_mision}>
        <div className={styles.img_wrapper} ref={imgWrapRef}>
          <Image
            src={ourMission}
            alt="Nuestra Misión"
            className={styles.img_mision}
            priority
          />
        </div>
      </div>

      <div className={styles.container_descripcion_mision}>
        <h2 className={styles.h2}>Nuestra Misión</h2>
        <p className={styles.text_descripcion_mision}>
          Ofrecer transporte sostenible con camiones euro 6, a gas nacional
          reduciendo el uso de combustible diesel, importado mejorando la
          contaminación ambiental y sonora. Desarrollar la transformación a gas
          de vehículos ciclos otto y diesel, Desarrollar los corredores verdes
          para producir un efecto económico positivo en la economía.
        </p>
      </div>
    </section>
  );
}
