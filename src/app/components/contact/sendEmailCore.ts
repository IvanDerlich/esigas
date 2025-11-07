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
  origin?: string;
  sucursal?: string;
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
    origin,
    sucursal,
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
    subject: 'Nuevo mensaje de contacto',
    html: `
      <h2>Nuevo mensaje de contacto</h2>
      ${origin ? `<p><b>Página de origen:</b> ${origin}</p>` : ''}
      ${sucursal ? `<p><b>Sucursal:</b> ${sucursal}</p>` : ''}
      <p><b>Nombre:</b> ${name}</p>
      <p><b>Teléfono:</b> ${phone}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Mensaje:</b></p>
      <p>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return ms.MESSAGE_SENT_SUCCESSFULLY;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error enviando correo:', error.message);
    } else {
      console.error('Error desconocido al enviar correo:', error);
    }
    return ms.INTERNAL_SERVER_ERROR;
  }
}
