import { notFound } from 'next/navigation';
import { projects } from '@/content/projects';
import { ProjectPageClient } from '@/components/project-page-client';

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const index = projects.findIndex((project) => project.id === id);

  if (index < 0) notFound();

  return <ProjectPageClient index={index} />;
}
