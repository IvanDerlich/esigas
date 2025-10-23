'use client';

import Image from 'next/image';
import Line from '@/images/line.png';
import styles from './contact.module.css';
import { Abyssinica_SIL } from 'next/font/google';
import { sendEmail } from './sendEmail';
import { useState, useTransition, useEffect } from 'react';

const abyssinica = Abyssinica_SIL({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

interface ContactFormProps {
  showCheckboxes?: boolean;
  showContact?: boolean;
  formType: 'equipos' | 'oblea-reprueba' | 'estaciones';
}

export default function Contact({
  showCheckboxes = false,
  showContact = true,
  formType,
}: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (status === 'success' || status === 'error') {
      const timer = setTimeout(() => setStatus('idle'), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  if (!showContact) return null;

  async function handleSubmit(formData: FormData) {
    setStatus('idle');
    formData.append('formType', formType);

    startTransition(async () => {
      try {
        const result = await sendEmail(formData);
        setStatus(result.includes('✅') ? 'success' : 'error');
      } catch (err) {
        console.error(err);
        setStatus('error');
      }
    });
  }

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
          height={1}
          className={styles.equiposImage}
        />
        <h2 className={styles.equiposTitle}>Dejanos Tu Consulta</h2>
        <Image
          src={Line}
          alt="Line"
          width={250}
          height={1}
          className={styles.equiposImage}
        />
      </div>

      <div className={`${abyssinica.className} ${styles.contactFormContainer}`}>
        <form
          className={styles.contactForm}
          action={handleSubmit}
          noValidate={false}
        >
          <label className={styles.formLabel}>
            Nombre y Apellido:
            <input
              type="text"
              name="name"
              className={styles.formInput}
              placeholder="Ej: Juan Pérez"
              required
            />
          </label>

          <label className={styles.formLabel}>
            Teléfono:
            <input
              type="tel"
              name="phone"
              className={styles.formInput}
              placeholder="Ej: 2615123456"
              pattern="[0-9]{6,15}"
              title="Solo se permiten números (mínimo 6 dígitos)"
              required
            />
          </label>

          <label className={styles.formLabel}>
            Email:
            <input
              type="email"
              name="email"
              className={styles.formInput}
              placeholder="Ej: ejemplo@correo.com"
              required
            />
          </label>

          {showCheckboxes && (
            <div className={styles.checkboxGroup}>
              <p>
                Sucursal <span style={{ color: 'red' }}>*</span>
              </p>
              <div className={styles.containerCheckbox}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="radio"
                    name="sucursal"
                    value="Mendoza"
                    className={styles.checkbox}
                    required
                  />
                  Mendoza
                </label>
                <label className={styles.checkboxLabel}>
                  <input
                    type="radio"
                    name="sucursal"
                    value="Santa Fe"
                    className={styles.checkbox}
                    required
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
              placeholder="Escribí tu consulta aquí..."
              required
              minLength={10}
              title="El mensaje debe tener al menos 10 caracteres"
            ></textarea>
          </label>

          {status === 'success' && (
            <p className={styles.successMessage}>
              ✅ Mensaje enviado correctamente.
            </p>
          )}
          {status === 'error' && (
            <p className={styles.errorMessage}>
              ❌ Error al enviar. Intentalo más tarde.
            </p>
          )}

          <div className={styles.formButtonContainer}>
            <button
              type="submit"
              className={styles.formButton}
              disabled={isPending}
            >
              {isPending ? 'Enviando...' : 'Enviar'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
