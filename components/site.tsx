'use client';

import { useCallback, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { projects } from '@/content/projects';
import { CaseOverlay } from './case-overlay';
import { Hero } from './hero';
import { IntroReveal } from './intro-reveal';
import { Process } from './process';
import { ProjectsStack } from './projects-stack';
import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';
import { StackLoop } from './stack-loop';
import { Whoami } from './whoami';

/**
 * §1 — una sola ruta. El caso abierto vive en `?caso=`, que además da URL
 * compartible y hace que atrás/adelante del navegador cierren y reabran el overlay.
 */
export function Site() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const opener = useRef<HTMLElement | null>(null);

  const caso = projects.findIndex((p) => p.id === params.get('caso'));

  const go = useCallback(
    (index: number) => {
      const next = new URLSearchParams(params.toString());
      if (index < 0) next.delete('caso');
      else next.set('caso', projects[index].id);
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [params, pathname, router],
  );

  const open = useCallback(
    (index: number) => {
      opener.current = document.activeElement as HTMLElement | null;
      go(index);
    },
    [go],
  );

  const close = useCallback(() => go(-1), [go]);

  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <IntroReveal />
        <ProjectsStack onOpen={open} />
        <Process />
        <StackLoop />
        <Whoami />
      </main>
      <SiteFooter />

      {caso >= 0 && <CaseOverlay index={caso} onSelect={go} onClose={close} opener={opener} />}
    </>
  );
}
