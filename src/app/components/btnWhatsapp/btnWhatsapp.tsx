import Link from 'next/link';
import Image from 'next/image';
import styles from './btnWhatsapp.module.css';

const imagePaths = {
  green: '/Image/whatsapp-green.png',
  blue: '/Image/whatsapp-blue.png',
};

interface WhatsappBtnProps {
  phoneNumber: string;
  color?: 'green' | 'blue';
}

const WhatsappBtn = ({ phoneNumber, color = 'green' }: WhatsappBtnProps) => {
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${cleanNumber}`;

  const selectedImagePath = imagePaths[color];

  return (
    <Link href={whatsappUrl} className={styles.btnWhatsapp}>
      <Image
        className={styles.imgWhatsapp}
        src={selectedImagePath}
        alt={`Contactar por Whatsapp (${color})`}
        width={120}
        height={120}
      />
    </Link>
  );
};

export default WhatsappBtn;
