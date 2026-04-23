import Link from 'next/link';
import Image from 'next/image';
import styles from './btnWhatsapp.module.css';
import WhatsappGreen from '@/images/whatsapp-green.png';
import WhatsappBlue from '@/images/whatsapp-blue.png';

const imagePaths = {
  green: WhatsappGreen,
  blue: WhatsappBlue,
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
