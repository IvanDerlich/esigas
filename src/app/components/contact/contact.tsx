import Image from 'next/image';
import Line from '@/images/line.png';
import styles from './contact.module.css';
import { Abyssinica_SIL } from 'next/font/google';

const abyssinica = Abyssinica_SIL({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

interface ContactFormProps {
  showCheckboxes?: boolean;
  showContact?: boolean; // ✅ nuevo booleano
}

export default function Contact({
  showCheckboxes = false,
  showContact = true,
}: ContactFormProps) {
  if (!showContact) return null; // ✅ si es false, no renderiza nada

  return (
    <>
      <div
        id="contacto"
        className={`${abyssinica.className} ${styles.contactContainer}`}
      >
        <h2 className={styles.contactTitle}>Contacto</h2>
      </div>
      <div className={`${abyssinica.className} ${styles.contactSubtitle}`}>
        <Image
          src={Line}
          alt="Line"
          width={250}
          height={0.5}
          className={styles.equiposImage}
        />
        <h2 className={styles.equiposTitle}>Dejanos Tu Consulta</h2>
        <Image
          src={Line}
          alt="Line"
          width={250}
          height={0.5}
          className={styles.equiposImage}
        />
      </div>
      <div className={`${abyssinica.className} ${styles.contactFormContainer}`}>
        <form className={styles.contactForm}>
          <label className={styles.formLabel}>
            Nombre y Apellido:
            <input
              type="text"
              name="name"
              className={styles.formInput}
              required
            />
          </label>
          <label className={styles.formLabel}>
            Telefono:
            <input
              type="tel"
              name="phone"
              className={styles.formInput}
              required
            />
          </label>
          <label className={styles.formLabel}>
            Email:
            <input
              type="email"
              name="email"
              className={styles.formInput}
              required
            />
          </label>
          {showCheckboxes && (
            <div className={styles.checkboxGroup}>
              <p>Sucursal</p>
              <div className={styles.containerCheckbox}>
                <label className={styles.checkboxLabel}>
                  <input
                    className={styles.checkbox}
                    type="checkbox"
                    name="info"
                  />
                  Mendoza
                </label>
                <label className={styles.checkboxLabel}>
                  <input
                    className={styles.checkbox}
                    type="checkbox"
                    name="promos"
                  />
                  Santa Fe
                </label>
              </div>
            </div>
          )}
          <label className={styles.formLabel}>
            Mensaje:
            <textarea
              name="message"
              className={styles.formTextarea}
              required
            ></textarea>
          </label>
        </form>
        <div className={styles.formButtonContainer}>
          <button type="submit" className={styles.formButton}>
            Enviar
          </button>
        </div>
      </div>
    </>
  );
}
