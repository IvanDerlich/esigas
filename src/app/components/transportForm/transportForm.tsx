import styles from './transportForm.module.css';
import Link from 'next/link';
import { oswald } from '@/app/assets/fonts';

export const TransportForm = () => {
  return (
    <section className={`${oswald.className} ${styles.form_section}`}>
      <h2 className={styles.form_title}>Empezá a cuidar el planeta</h2>
      <div className={styles.inputs_container}>
        <label className={styles.formLabel}>
          <div>
            Nombre y Apellido <span className={styles.required}>*</span>
          </div>
          <input
            type="text"
            name="name"
            className={styles.formInput}
            required
          />
        </label>
        <label className={styles.formLabel}>
          <div>
            Email <span className={styles.required}>*</span>
          </div>
          <input
            type="email"
            name="email"
            className={styles.formInput}
            required
          />
        </label>
        <label className={styles.formLabel}>
          Déjanos un mensaje
          <textarea
            name="message"
            className={styles.formTextarea}
            required
            minLength={10}
          ></textarea>
        </label>

        <div className={styles.button_container}>
          <Link href="/" className={styles.formLink}>
            Enviar
          </Link>
        </div>
      </div>
    </section>
  );
};
