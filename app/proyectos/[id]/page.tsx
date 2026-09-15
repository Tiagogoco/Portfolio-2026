import type { Metadata } from 'next';
import { StructuredData } from '@/components/structured-data';
import { siteUrl } from '@/lib/seo';
import { notFound } from 'next/navigation';
import { projects } from '@/content/projects';
import { ProjectPageClient } from '@/components/project-page-client';

/** Sin esto cada caso hereda el título y la descripción del home, así que al
    compartir el enlace la imagen dice RANKEO y el texto habla del portafolio. */
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) return {};

  const title = `${project.title} — ${project.kind}`;
  const url = `/proyectos/${project.id}`;
  const socialTitle = `${title} | tiagogoco`;

  return {
    title,
    description: project.lede,
    alternates: { canonical: url },
    openGraph: { type: 'article', url, title: socialTitle, description: project.lede },
    twitter: { title: socialTitle, description: project.lede },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const index = projects.findIndex((project) => project.id === id);

  if (index < 0) notFound();

  const project = projects[index];
  return (
    <>
      <StructuredData data={{
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: `${project.title} — ${project.kind}`,
        description: project.lede,
        url: siteUrl(`/proyectos/${project.id}`),
        image: siteUrl(project.cardShot.src),
        inLanguage: 'es-MX',
        author: {
          '@type': 'Person',
          '@id': siteUrl('/#person'),
          name: 'Tiago Gómez',
          alternateName: 'tiagogoco',
          url: siteUrl(),
        },
      }} />
      <ProjectPageClient index={index} />
    </>
  );
}
