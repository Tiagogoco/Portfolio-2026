import type { Metadata, Viewport } from 'next';
import { Archivo, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION } from '@/lib/seo';
import { CursorFollower } from '@/components/cursor-follower';
import { SiteIntro } from '@/components/site-intro';

const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
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
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: '%s | tiagogoco' },
  description: SITE_DESCRIPTION,
  authors: [{ name: 'Tiago Gómez', url: SITE_URL }],
  creator: 'Tiago Gómez — tiagogoco',
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: SITE_URL,
    siteName: 'tiagogoco',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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
      <body>
        {children}
        <CursorFollower />
        <SiteIntro />
      </body>
    </html>
  );
}
