import type { Metadata } from 'next';
import { CvDocument } from '@/components/cv-document';
import { cv } from '@/content/cv';

export const metadata: Metadata = {
  title: 'CV',
  description: 'Résumé of Tiago Gómez Cordero, full stack developer and web product designer based in Puebla, Mexico.',
  robots: { index: false, follow: true },
  alternates: { languages: { es: '/cv', en: '/cv/en' } },
};

export default function CvEnPage() {
  return <CvDocument content={cv.en} locale="en" />;
}
