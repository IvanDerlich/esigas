'use client';

import { useState, useTransition, useEffect, useRef } from 'react';
import styles from './transportForm.module.css';
import { oswald } from '@/app/assets/fonts';
import { sendEmail } from '../contact/sendEmail';

interface Errors {
    name?: string;
    email?: string;
}

export const TransportForm = () => {
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errors, setErrors] = useState<Errors>({});
    const [isPending, startTransition] = useTransition();
    const [sourceURL, setSourceURL] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        setSourceURL(window.location.href);
    }, []);

    const validateName = (name: string) => {
        if (!name.trim()) return 'Este campo es obligatorio.';
        return '';
    };

    const validateEmail = (email: string, isSubmit = false) => {
        if (!email.trim()) {
            return isSubmit
                ? 'Este campo es obligatorio.'
                : 'Por favor, introduce una dirección de correo electrónico válida.';
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            return 'Por favor, introduce una dirección de correo electrónico válida.';
        }

        return '';
    };

    async function handleSubmit(formData: FormData) {
        const name = formData.get('name')?.toString() || '';
        const email = formData.get('email')?.toString() || '';

        const newErrors: Errors = {};

        const nameError = validateName(name);
        if (nameError) newErrors.name = nameError;

        const emailError = validateEmail(email, true);
        if (emailError) newErrors.email = emailError;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        formData.append('sourceURL', sourceURL);
        formData.append('sourceForm', 'transporte');

        startTransition(async () => {
            try {
                const result = await sendEmail(formData);
                if (result.includes('✅')) {
                    setStatus('success');
                } else {
                    setStatus('error');
                }
            } catch (error) {
                console.error(error);
                setStatus('error');
            }
        });
    }

    useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    },
    { threshold: 0.2 }
  );

  if (sectionRef.current) {
    observer.observe(sectionRef.current);
  }

  return () => {
    if (sectionRef.current) {
      observer.unobserve(sectionRef.current);
    }
  };
}, []);

    return (
        <section
        ref={sectionRef}
            className={`${oswald.className} ${styles.form_section} ${status === 'success' ? styles.compact : ''
                } ${isVisible ? styles.visible : ''}`}
        >
            <div className={styles.animateContent}>
            <h2 className={styles.form_title}>Empezá a cuidar el planeta</h2>

            {status === 'success' ? (
                <div className={styles.successBanner}>
                    Gracias por contactarnos, en breve nos comunicaremos.
                </div>
            ) : (
                <form className={styles.inputs_container} action={handleSubmit}>

                    <label className={styles.formLabel}>
                        Nombre y Apellido *
                        <input
                            type="text"
                            name="name"
                            className={`${styles.formInput} ${errors.name ? styles.inputError : ''
                                }`}
                            onChange={(e) => {
                                if (e.target.value.trim() !== '') {
                                    setErrors((prev) => ({ ...prev, name: undefined }));
                                }
                            }}
                        />
                        {errors.name && (
                            <span className={styles.errorText}>{errors.name}</span>
                        )}
                    </label>

                    <label className={styles.formLabel}>
                        Email *
                        <input
                            type="email"
                            name="email"
                            className={`${styles.formInput} ${errors.email ? styles.inputError : ''
                                }`}
                            onBlur={(e) => {
                                const error = validateEmail(e.target.value);
                                setErrors((prev) => ({ ...prev, email: error }));
                            }}
                            onChange={(e) => {
                                const value = e.target.value;

                                if (!value.trim()) {
                                    setErrors((prev) => ({ ...prev, email: undefined }));
                                    return;
                                }

                                if (/\S+@\S+\.\S+/.test(value)) {
                                    setErrors((prev) => ({ ...prev, email: undefined }));
                                }
                            }}
                        />
                        {errors.email && (
                            <span className={styles.errorText}>{errors.email}</span>
                        )}
                    </label>

                    <label className={styles.formLabel}>
                        Déjanos un mensaje
                        <textarea
                            name="message"
                            className={styles.formTextarea}
                        ></textarea>
                    </label>

                    {status === 'error' && (
                        <p className={styles.errorMessage}>
                            ❌ Error al enviar. Intentalo más tarde.
                        </p>
                    )}

                    <div className={styles.button_container}>
                        <button
                            type="submit"
                            className={`${styles.formButton} ${isPending ? styles.buttonLoading : ''
                                }`}
                            disabled={isPending}
                        >
                            {isPending ? 'Enviando' : 'Enviar'}
                        </button>

                        {isPending && <span className={styles.spinner}></span>}
                    </div>
                </form>
            )}
            </div>
        </section>
    );
};