'use client';

import type { RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function useScrollMarker(
  scope: RefObject<HTMLElement | null>,
) {
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add({
      desktop: '(min-width: 768px)',
      mobile: '(max-width: 767px)',
      reduced: '(prefers-reduced-motion: reduce)',
    }, (context) => {
      if (context.conditions?.reduced || !scope.current) return;
      const blocks = Array.from(scope.current.querySelectorAll<HTMLElement>('[data-marker-block]'))
        .filter(element => element.getBoundingClientRect().width > 0);
      for (const element of blocks) {
        // La variable vive en el párrafo: los fragmentos de SplitText la heredan
        // incluso cuando las fuentes o el ancho obligan a recalcular las líneas.
        gsap.fromTo(element, { '--marker-progress': '0%' }, {
          '--marker-progress': '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'clamp(bottom 85%)',
            end: 'clamp(bottom 45%)',
            scrub: 0.25,
          },
        });
      }
      let active = true;
      void document.fonts.ready.then(() => { if (active) ScrollTrigger.refresh(); });
      return () => { active = false; };
    }, scope);
    return () => media.revert();
  }, { scope });
}
