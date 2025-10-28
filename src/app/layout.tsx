import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Esigas',
  description:
    'Empresa Servicios de Ingeniería. Modernizamos tu experiencia con GNC: información, ahorro y tecnología en un solo lugar para que disfrutes un servicio eficiente y sustentable.',
  metadataBase: new URL('https://esigas.com.ar'),
  openGraph: {
    title: 'Esigas',
    description:
      'Empresa Servicios de Ingeniería. Modernizamos tu experiencia con GNC: información, ahorro y tecnología en un solo lugar para que disfrutes un servicio eficiente y sustentable.',
    url: 'https://esigas.com.ar',
    siteName: 'Esigas',
    images: [
      {
        url: 'https://esigas.com.ar/Image/logo-simple.png',
        width: 1200,
        height: 630,
        alt: 'Logo Esigas',
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Esigas',
    description:
      'Empresa Servicios de Ingeniería. Modernizamos tu experiencia con GNC: información, ahorro y tecnología en un solo lugar para que disfrutes un servicio eficiente y sustentable.',
    images: ['https://esigas.com.ar/Image/logo-simple.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
