import type { Metadata } from 'next';
import { CvDocument } from '@/components/cv-document';
import { cv } from '@/content/cv';

/** Lleva el teléfono a la vista, así que no se indexa: se comparte por enlace
    directo o como PDF. Quitar `robots` si algún día conviene que Google lo vea. */
export const metadata: Metadata = {
  title: 'CV',
  description: 'Currículum de Tiago Gómez Cordero, desarrollador full stack y diseñador de producto web en Puebla.',
  robots: { index: false, follow: true },
  alternates: { languages: { es: '/cv', en: '/cv/en' } },
};

export default function CvPage() {
  return <CvDocument content={cv.es} locale="es" />;
}
