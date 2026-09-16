'use client';

import { completeIntro } from '@/lib/intro-ready';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type CSSProperties } from 'react';

const INTRO_DURATION = 2500;
const EXIT_DURATION = 350;
const PROGRESS_DURATION = INTRO_DURATION - EXIT_DURATION;

let seenInMemory = false;

/** Bienvenida breve, una vez por carga de página; no simula progreso de carga. */
export function SiteIntro() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    /** El CV es un documento que se comparte por enlace: quien lo abre no debe
        esperar la bienvenida del sitio para poder leerlo. */
    if (pathname.startsWith('/cv') || reduced.matches || seenInMemory) {
      completeIntro();
      return;
    }

    let timer = 0;
    let interval = 0;
    const dismiss = () => {
      window.clearInterval(interval);
      window.clearTimeout(timer);
      setVisible(false);
      completeIntro();
    };
    const frame = requestAnimationFrame(() => {
      seenInMemory = true;
      setVisible(true);
      const started = performance.now();
      interval = window.setInterval(() => {
        const next = Math.min(100, Math.floor((performance.now() - started) / PROGRESS_DURATION * 100));
        setProgress(next);
        if (next === 100) window.clearInterval(interval);
      }, 20);
      timer = window.setTimeout(dismiss, INTRO_DURATION);
    });

    window.addEventListener('keydown', dismiss);
    window.addEventListener('pointerdown', dismiss);
    reduced.addEventListener('change', dismiss);
    return () => {
      if (seenInMemory) completeIntro();
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.clearInterval(interval);
      window.removeEventListener('keydown', dismiss);
      window.removeEventListener('pointerdown', dismiss);
      reduced.removeEventListener('change', dismiss);
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      className="site-intro"
      aria-hidden="true"
      style={{ '--intro-progress-duration': `${PROGRESS_DURATION}ms` } as CSSProperties}
    >
      <div className="site-intro-signature">
        <span className="site-intro-label">Diseño + desarrollo</span>
        <div className="site-intro-name">
          <span>tiagogoco</span>
          <span className="site-intro-dot" />
        </div>
        <span className="site-intro-rule" style={{ transform: `scaleX(${progress / 100})` }} />
        <span className="site-intro-percentage">{String(progress).padStart(2, '0')}%</span>
      </div>
    </div>
  );
}
