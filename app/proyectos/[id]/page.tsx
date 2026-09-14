import type { Metadata } from 'next';
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

  return {
    title,
    description: project.lede,
    alternates: { canonical: url },
    openGraph: { type: 'article', url, title, description: project.lede },
    twitter: { title, description: project.lede },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const index = projects.findIndex((project) => project.id === id);

  if (index < 0) notFound();

  return <ProjectPageClient index={index} />;
}
