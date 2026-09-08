'use client';

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
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <IntroReveal />
        <ProjectsStack />
        <Process />
        <StackLoop />
        <Whoami />
      </main>
      <SiteFooter />
    </>
  );
}
