import type { Metadata, Viewport } from 'next';
import { Archivo, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

const instrument = Instrument_Serif({
  variable: '--font-instrument',
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic'],
  display: 'swap',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tiagogo.co';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Tiago Gómez — Desarrollador y product designer',
  description:
    'Creando productos digitales desde la idea hasta producción. Ecommerce, SaaS y plataformas en Next.js, con usuarios reales desde 2025.',
  keywords: ['desarrollador', 'product designer', 'Next.js', 'Puebla', 'ecommerce', 'SaaS'],
  authors: [{ name: 'Tiago Gómez' }],
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: SITE_URL,
    siteName: 'tiagogoco',
    title: 'Tiago Gómez — Desarrollador y product designer',
    description: 'Creando productos digitales desde la idea hasta producción.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tiago Gómez — Desarrollador y product designer',
    description: 'Creando productos digitales desde la idea hasta producción.',
  },
};

export const viewport: Viewport = {
  themeColor: '#FBFAF8',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${archivo.variable} ${jetbrains.variable} ${instrument.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
