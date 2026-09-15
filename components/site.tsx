'use client';

import { useRef } from 'react';
import { useScrollReveal } from '@/lib/use-scroll-reveal';
import { useScrollMarker } from '@/lib/use-scroll-marker';
import { Hero } from './hero';
import { Process } from './process';
import { ProjectsStack } from './projects-stack';
import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';
// import { Whoami } from './whoami';

/**
 * §1 — una sola ruta. El caso abierto vive en `?caso=`, que además da URL
 * compartible y hace que atrás/adelante del navegador cierren y reabran el overlay.
 */
export function Site() {
  const mainRef = useRef<HTMLElement>(null);
  useScrollReveal(mainRef);
  useScrollMarker(mainRef);
  return (
    <>
      <SiteHeader />
      <main ref={mainRef}>
        <Hero />
        <ProjectsStack />
        <Process />
        {/* <Whoami /> */}
      </main>
      <SiteFooter />
    </>
  );
}
