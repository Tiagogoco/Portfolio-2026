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

      {/* PDF generado desde este mismo documento: Safari no lo repagina. */}
      <a href={`/cv/tiago-gomez-cv-${locale}.pdf`} download>
        {downloadLabel}
      </a>
    </div>
  );
}
