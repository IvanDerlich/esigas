'use client';

import styles from './footerTranspote.module.css';
import Image from 'next/image';
import LogoTransporte from '@/images/logo-transporte.png';
import IconLocation from '@/images/icon-location.svg';
import IconPhone from '@/images/icon-phone.svg';
import IconEmail from '@/images/icon-email.svg';
import { lato } from '@/app/assets/fonts';

export const FooterTransporte = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerInner}>
          <div className={styles.logoWrapper}>
            <Image
              src={LogoTransporte}
              alt="Logo Transporte"
              width={162}
              height={37}
              style={{ objectFit: 'contain' }}
            />
          </div>

          <div className={`${styles.contactInfo} ${lato.className}`}>
            <div className={styles.contactItem}>
              <div className={styles.iconWrapper}>
                <Image
                  className={styles.icon_location}
                  src={IconLocation}
                  alt="Icon Location"
                  width={25}
                  height={32}
                />
              </div>
              <p className={styles.contactText}>
                Parque industrial Eje norte, de Las Heras, Mendoza
              </p>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.iconWrapper}>
                <Image
                  className={styles.icon_email}
                  src={IconEmail}
                  alt="Icon Email"
                  width={30}
                  height={25}
                />
              </div>
              <p className={styles.contactTextTwo}>transporte@esigas.com.ar</p>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.iconWrapper}>
                <Image
                  className={styles.icon_phone}
                  src={IconPhone}
                  alt="Icon Phone"
                  width={25}
                  height={30}
                />
              </div>
              <p className={styles.contactText}>2615 59-1335</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`${lato.className} ${styles.copy}`}>
        <p>© 2022-2025 Transporte Ecológico</p>
      </div>
      <div className={styles.section}></div>
    </footer>
  );
};
