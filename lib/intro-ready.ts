'use client';

let ready = false;
const listeners = new Set<() => void>();

/** Señal persistente: también funciona al volver al inicio por navegación interna. */
export function completeIntro() {
  if (ready) return;
  ready = true;
  listeners.forEach(listener => listener());
  listeners.clear();
}

export function onIntroReady(listener: () => void) {
  if (ready) listener();
  else listeners.add(listener);
  return () => { listeners.delete(listener); };
}
