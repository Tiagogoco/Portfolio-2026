/** Una sola base para canónicas, sitemap y datos estructurados. */
export const SITE_URL = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.tiagogoco.com',
).origin;

export const SITE_TITLE = 'tiagogoco | Portfolio de Tiago Gómez, desarrollador web';
export const SITE_DESCRIPTION =
  'Portfolio de tiagogoco, Tiago Gómez: desarrollador web full stack y product designer en Puebla, México. Proyectos reales de ecommerce y SaaS.';

export function siteUrl(path = '/') {
  return new URL(path, `${SITE_URL}/`).toString();
}
