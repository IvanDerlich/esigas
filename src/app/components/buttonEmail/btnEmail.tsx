import Link from 'next/link';
import Image from 'next/image';
import styles from './btnEmail.module.css';
import Email from '@/images/email.png';

const EmailBtn = () => {
  return (
    <Link
      href="mailto:info@esigas.com.ar?subject=Consulta%20de%20servicio&body=Hola,%20quisiera%20consultar%20sobre..."
      className={styles.btnEmail}
    >
      <Image
        className={styles.imgEmail}
        src={Email}
        alt="Contactar por Email"
        width={100}
        height={65}
      />
    </Link>
  );
};

export default EmailBtn;
