'use client';

import type { RefObject } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { onIntroReady } from './intro-ready';

gsap.registerPlugin(useGSAP);

export function useHeroEntrance(scope: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const root = scope.current;
      if (!root) return;
      const name = root.querySelectorAll('.hero-wordmark h1 > span');
      const stickers = root.querySelectorAll('.hero-wordmark > .sticker-shadow');
      const actions = root.querySelectorAll('.hero-actions, .hero-intro');
      const sequence = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });

      sequence
        .from(name, {
          yPercent: 18, opacity: 0, duration: 0.75, stagger: 0.08,
          clearProps: 'transform,opacity',
        }, 0)
        .from(stickers, {
          y: -18, scale: 0.94, rotation: index => index % 2 ? -5 : 5,
          opacity: 0, duration: 0.65, stagger: 0.12,
          ease: 'back.out(1.15)', clearProps: 'transform,opacity',
        }, 0.4)
        .from(actions, {
          y: 12, opacity: 0, duration: 0.5, stagger: 0.1,
          clearProps: 'transform,opacity',
        }, 0.8);

      const unsubscribe = onIntroReady(() => {
        // No anima fuera de vista al entrar por un ancla o restaurar el scroll.
        if (root.getBoundingClientRect().bottom <= 0 || window.scrollY > 80) {
          sequence.progress(1);
        } else {
          sequence.play();
        }
      });
      const showFocused = () => { sequence.progress(1); };
      root.addEventListener('focusin', showFocused);
      return () => {
        unsubscribe();
        root.removeEventListener('focusin', showFocused);
      };
    }, scope);
    return () => media.revert();
  }, { scope });
}
