'use client';

import { useEffect, useState, type CSSProperties } from 'react';

const INTRO_DURATION = 2500;
const EXIT_DURATION = 350;
const PROGRESS_DURATION = INTRO_DURATION - EXIT_DURATION;

let seenInMemory = false;

/** Bienvenida breve, una vez por carga de página; no simula progreso de carga. */
export function SiteIntro() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches || seenInMemory) return;

    let timer = 0;
    let interval = 0;
    const dismiss = () => {
      window.clearInterval(interval);
      window.clearTimeout(timer);
      setVisible(false);
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
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.clearInterval(interval);
      window.removeEventListener('keydown', dismiss);
      window.removeEventListener('pointerdown', dismiss);
      reduced.removeEventListener('change', dismiss);
    };
  }, []);

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
