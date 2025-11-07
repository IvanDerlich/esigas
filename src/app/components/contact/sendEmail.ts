'use server';

import { ms } from './messages';
import sendEmailCore from './sendEmailCore';

export async function sendEmail(formData: FormData): Promise<string> {
  const name = formData.get('name')?.toString().trim() || '';
  const email = formData.get('email')?.toString().trim() || '';
  const phone = formData.get('phone')?.toString().trim() || '';
  const message = formData.get('message')?.toString().trim() || '';
  const formType = formData.get('formType')?.toString() || '';
  const sucursal = formData.get('sucursal')?.toString() || '';
  const origin = formData.get('origin')?.toString() || '';

  if (!name) return ms.NAME_EMPTY;
  if (!email) return ms.EMAIL_EMPTY;
  if (!message) return ms.MESSAGE_EMPTY;

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) return ms.EMAIL_INVALID;

  const { EMAIL_USER, EMAIL_PASS, EMAIL_HOST, EMAIL_PORT, EMAIL_SECURE } =
    process.env;

  if (!EMAIL_USER || !EMAIL_PASS || !EMAIL_HOST || !EMAIL_PORT)
    return ms.INTERNAL_SERVER_ERROR;

  const destinationEmail = EMAIL_USER;

  return sendEmailCore({
    name,
    email,
    phone,
    message,
    destinationEmail,
    user: EMAIL_USER,
    pass: EMAIL_PASS,
    host: EMAIL_HOST,
    port: parseInt(EMAIL_PORT),
    secure: EMAIL_SECURE === 'true',
    origin,
    sucursal,
  });
}
