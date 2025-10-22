'use server';

import nodemailer from 'nodemailer';
import { ms } from './messages';

interface EmailConfig {
  name: string;
  email: string;
  phone: string;
  message: string;
  destinationEmail: string;
  user: string;
  pass: string;
  host: string;
  port: number;
  secure: boolean;
}

export default async function sendEmailCore(
  config: EmailConfig
): Promise<string> {
  const {
    name,
    email,
    phone,
    message,
    destinationEmail,
    user,
    pass,
    host,
    port,
    secure,
  } = config;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  const mailOptions = {
    from: `"ESIGAS Web" <${user}>`,
    to: destinationEmail,
    replyTo: email,
    subject: 'Nuevo mensaje desde esigas.com.ar',
    html: `
      <h2>Nuevo mensaje</h2>
      <p><b>Nombre:</b> ${name}</p>
      <p><b>Teléfono:</b> ${phone}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Mensaje:</b> ${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return ms.MESSAGE_SENT_SUCCESSFULLY;
  } catch (error: any) {
    console.error('Error enviando correo:', error);
    return ms.INTERNAL_SERVER_ERROR;
  }
}
