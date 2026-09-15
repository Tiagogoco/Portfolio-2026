'use client';

import Link from 'next/link';
import type { CvLocale } from '@/content/cv';

/** Cromo del sitio, no del documento: `.cv-actions` se oculta al imprimir, así
    que el switch de idioma no acaba dentro del PDF. Cada idioma es una ruta
    propia para que el CV se pueda compartir ya en el idioma correcto. */
export function CvActions({ locale, downloadLabel }: { locale: CvLocale; downloadLabel: string }) {
  return (
    <div className="cv-actions">
      <Link
        href={locale === 'es' ? '/cv/en' : '/cv'}
        hrefLang={locale === 'es' ? 'en' : 'es'}
        className="cv-actions-switch"
      >
        {locale === 'es' ? 'English' : 'Español'}
      </Link>

      {/* La descarga es el propio diálogo de impresión: "Guardar como PDF". */}
      <button type="button" onClick={() => window.print()}>
        {downloadLabel}
      </button>
    </div>
  );
}
