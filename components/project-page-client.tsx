'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { projects } from '@/content/projects';
import { CaseOverlay } from './case-overlay';
import { SiteHeader } from './site-header';

export function ProjectPageClient({ index }: { index: number }) {
  const router = useRouter();
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  const closeProject = () => {
    if (typeof window !== 'undefined' && document.referrer.startsWith(window.location.origin)) {
      router.back();
      return;
    }

    router.push('/#proyectos');
  };

  return (
    <>
      <SiteHeader standalone />
      <CaseOverlay
        index={index}
        standalone
        opener={opener}
        onClose={closeProject}
        onSelect={(nextIndex) => router.push(`/proyectos/${projects[nextIndex].id}`)}
      />
    </>
  );
}
