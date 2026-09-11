'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { projects } from '@/content/projects';
import { CaseOverlay } from './case-overlay';
import { SiteHeader } from './site-header';

export function ProjectPageClient({ index }: { index: number }) {
  const router = useRouter();
  const opener = useRef<HTMLElement | null>(null);

  return (
    <>
      <SiteHeader standalone />
      <CaseOverlay
        index={index}
        standalone
        opener={opener}
        onClose={() => router.push('/')}
        onSelect={(nextIndex) => router.push(`/proyectos/${projects[nextIndex].id}`)}
      />
    </>
  );
}
