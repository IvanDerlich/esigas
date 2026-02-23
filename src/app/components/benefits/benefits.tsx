import styles from './benefits.module.css';
import Image from 'next/image';
import route from '@/images/ruta.png';
import send from '@/images/enviado.png';
import professionals from '@/images/profesionales.png';
import { oswald, lato } from '@/app/assets/fonts';

export const Benefits = () => {
  return (
    <section className={styles.benefits}>
      <h1 className={`${oswald.className} ${styles.title}`}>
        El transporte sostenible a GNC es nuestra experiencia
      </h1>
      <h2 className={`${lato.className} ${styles.subtitle}`}>
        Reducirás en un 30% la huella de carbono de tus productos
      </h2>
      <div className={styles.items}>
        <div className={styles.item}>
          <Image src={send} alt="Enviado" width={80} height={80} />
          <p className={`${oswald.className} ${styles.itemTitle}`}>
            ESCALABILIDAD
          </p>
          <p className={`${lato.className} ${styles.itemContent}`}>
            33,5 toneladas de carga útil para optimizar recursos.
          </p>
        </div>
        <div className={styles.item}>
          <Image src={route} alt="Ruta" width={80} height={80} />
          <p className={`${oswald.className} ${styles.itemTitle}`}>
            SOSTENIBILIDAD
          </p>
          <p className={`${lato.className} ${styles.itemContent}`}>
            50 toneladas de CO2 no emitidos utilizando nuestras unidades a GNC.
          </p>
        </div>
        <div className={styles.item}>
          <Image
            src={professionals}
            alt="Profesionales"
            width={80}
            height={80}
          />
          <p className={`${oswald.className} ${styles.itemTitle}`}>INCLUSIÓN</p>
          <p className={`${lato.className} ${styles.itemContent}`}>
            Es fundamental para lograr un ambiente de trabajo equilibrado y
            productivo. Por eso, promovemos la igualdad de oportunidades y la no
            discriminación en todas nuestras políticas y prácticas de empleo.
          </p>
        </div>
      </div>
    </section>
  );
};
