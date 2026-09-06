'use client';

import { useCallback, useSyncExternalStore, type RefObject } from 'react';
import { useScroll, type MotionValue } from 'motion/react';

/**
 * Recorrido de una sección sticky larga, 0 → 1.
 * Equivale a `-top / (height - innerHeight)` del prototipo (§4).
 */
export function useSectionProgress(ref: RefObject<HTMLElement | null>): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref as RefObject<HTMLElement>,
    offset: ['start start', 'end end'],
  });
  return scrollYProgress;
}

/**
 * Entrada de un bloque normal, 0 → 1.
 * Equivale a `(innerHeight*0.92 - top) / (innerHeight*0.75)` del prototipo (§4).
 */
export function useEnterProgress(ref: RefObject<HTMLElement | null>): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref as RefObject<HTMLElement>,
    offset: ['start 92%', 'start 17%'],
  });
  return scrollYProgress;
}

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

/** easeOutCubic — el único easing ligado a scroll del sitio (§2). */
export const easeOutCubic = (k: number) => 1 - Math.pow(1 - k, 3);

/** Progreso escalonado: fila `i` arranca 0.10 después que la anterior (§5.4). */
export function stagger(q: number, i: number, step = 0.1, window = 0.22) {
  return easeOutCubic(clamp((q - i * step) / window));
}

export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

/** Breakpoint único del sitio: por debajo de 768px el layout cambia de forma (§9). */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 767px)');
}

function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false, // en el servidor no hay preferencia: se asume desktop sin reducción
  );
}
