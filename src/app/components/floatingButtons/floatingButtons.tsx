'use client';

import BtnWhatsapp from '../btnWhatsapp/btnWhatsapp';
import EmailBtn from '../buttonEmail/btnEmail';
import styles from './floatingButtons.module.css';

interface FloatingButtonsProps {
  showWhatsapp?: boolean;
  showEmail?: boolean;
  phoneNumber?: string;
  color?: 'green' | 'blue';
}

export default function FloatingButtons({
  showWhatsapp = false,
  showEmail = false,
  phoneNumber,
  color = 'green',
}: FloatingButtonsProps) {
  return (
    <div className={styles.container}>
      {showEmail && <EmailBtn />}

      {showWhatsapp && phoneNumber ? (
        <BtnWhatsapp phoneNumber={phoneNumber} color={color} />
      ) : null}
    </div>
  );
}
