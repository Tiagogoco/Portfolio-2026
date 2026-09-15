import type { Metadata } from 'next';
import { StructuredData } from '@/components/structured-data';
import { socials } from '@/content/site';
import { siteUrl, SITE_DESCRIPTION } from '@/lib/seo';
import { Suspense } from 'react';
import { Site } from '@/components/site';

export const metadata: Metadata = { alternates: { canonical: '/' } };

export default function Page() {
  return (
    <>
      <StructuredData data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': siteUrl('/#website'),
            name: 'tiagogoco',
            url: siteUrl(),
            inLanguage: 'es-MX',
            description: SITE_DESCRIPTION,
            publisher: { '@id': siteUrl('/#person') },
          },
          {
            '@type': 'Person',
            '@id': siteUrl('/#person'),
            name: 'Tiago Gómez',
            alternateName: 'tiagogoco',
            url: siteUrl(),
            jobTitle: 'Desarrollador web full stack y product designer',
            image: siteUrl('/img/perfil/about-tiago.webp'),
            sameAs: socials.map(social => social.href),
          },
          {
            '@type': 'ProfilePage',
            '@id': siteUrl('/#profile'),
            url: siteUrl(),
            name: 'Portfolio de Tiago Gómez — tiagogoco',
            inLanguage: 'es-MX',
            isPartOf: { '@id': siteUrl('/#website') },
            mainEntity: { '@id': siteUrl('/#person') },
          },
        ],
      }} />
      <Suspense>
        <Site />
      </Suspense>
    </>
  );
}
