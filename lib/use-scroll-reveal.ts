'use client';

import type { RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/** Entradas progresivas; el HTML permanece visible sin JavaScript. */
export function useScrollReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const media = gsap.matchMedia();
    const seen = new WeakSet<HTMLElement>();

    media.add({
      desktop: '(min-width: 768px)',
      mobile: '(max-width: 767px)',
      reduced: '(prefers-reduced-motion: reduce)',
    }, (context) => {
      if (context.conditions?.reduced || !scope.current) return;

      const desktop = context.conditions?.desktop;
      // Medimos antes de escribir estilos; excluimos la variante responsive oculta.
      const targets = Array.from(scope.current.querySelectorAll<HTMLElement>('[data-reveal]'))
        .map((element) => ({ element, rect: element.getBoundingClientRect() }))
        .filter(({ element, rect }) => rect.width > 0 &&
          (!seen.has(element) || element.hasAttribute('data-marker-block')));
      const tweens = new Map<HTMLElement, gsap.core.Tween>();

      for (const { element, rect } of targets) {
        // Conserva el contenido visible al restaurar scroll o seguir un ancla.
        if (rect.top < window.innerHeight * 0.9) {
          seen.add(element);
          if (!element.hasAttribute('data-marker-block')) continue;
        }

        const kind = element.dataset.reveal;
        if (kind?.startsWith('text-')) {
          const unit = kind === 'text-chars' ? 'chars' : kind === 'text-words' ? 'words' : 'lines';
          SplitText.create(element, {
            type: unit === 'chars' ? 'words,chars' : unit,
            mask: unit === 'lines' ? 'lines' : undefined,
            linesClass: 'reveal-line',
            autoSplit: true,
            aria: 'auto',
            onSplit(split) {
              // deepSlice separa el mark por renglón. Reasignamos los tramos
              // también al cambiar de ancho o volver a un texto ya revelado.
              const marks = element.querySelectorAll<HTMLElement>('.scroll-marker');
              marks.forEach((mark, index) => {
                mark.style.setProperty('--marker-lines', String(marks.length));
                mark.style.setProperty('--marker-line', String(index));
              });
              // Un cambio de ancho recalcula las líneas sin repetir una entrada terminada.
              if (seen.has(element)) return;
              const tween = gsap.from(split[unit], {
                yPercent: unit === 'lines' ? 115 : 35,
                opacity: unit === 'lines' ? 1 : 0,
                duration: desktop ? 0.8 : 0.65,
                stagger: unit === 'chars' ? 0.09 : unit === 'lines' ? 0.09 : 0.06,
                ease: 'power3.out',
                clearProps: 'opacity,transform',
                onComplete: () => { seen.add(element); },
                scrollTrigger: {
                  trigger: element,
                  start: 'clamp(top 90%)',
                  once: true,
                },
              });
              tweens.set(element, tween);
              return tween;
            },
          });
          continue;
        }

        const isMedia = kind === 'media';
        const tween = gsap.from(element, {
          opacity: 0,
          y: desktop ? (isMedia ? 28 : 20) : 14,
          duration: isMedia ? 0.85 : 0.7,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
          onComplete: () => { seen.add(element); },
          scrollTrigger: {
            trigger: element,
            start: 'clamp(top 90%)',
            once: true,
          },
        });
        tweens.set(element, tween);
      }

      // Al navegar con Tab, el enlace enfocado debe verse inmediatamente.
      const root = scope.current;
      const showFocused = (event: FocusEvent) => {
        if (!(event.target instanceof Element)) return;
        const target = event.target.closest<HTMLElement>('[data-reveal]');
        if (target) tweens.get(target)?.progress(1);
      };
      root.addEventListener('focusin', showFocused);

      let active = true;
      void document.fonts.ready.then(() => {
        if (active) ScrollTrigger.refresh();
      });

      return () => {
        active = false;
        root.removeEventListener('focusin', showFocused);
      };
    }, scope);

    return () => media.revert();
  }, { scope });
}
