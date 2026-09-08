'use client';

import { useEffect, useState } from 'react';
import { EMAIL } from '@/content/site';

/**
 * Fondo de cada sección, para que la banda del header sea opaca sin cortar el color
 * de lo que hay debajo. La spec §3 lo dejaba sin fondo, pero con la página compacta
 * el contenido se leía por debajo al pasar.
 */
const SECTIONS = [
  { id: 'top', bg: '#FBFAF8', dark: false },
  { id: 'intro', bg: '#FBFAF8', dark: false },
  { id: 'proyectos', bg: '#FBFAF8', dark: false },
  { id: 'sobre-mi', bg: '#1F6FEB', dark: true },
  { id: 'stack', bg: '#FFFFFF', dark: false },
  { id: 'whoami', bg: '#FFFFFF', dark: false },
  { id: 'contacto', bg: '#000000', dark: true },
];

/** Línea de sondeo: el borde inferior de la banda. */
const PROBE = 46;

export function SiteHeader() {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [{ bg, dark }, setSkin] = useState({ bg: '#FBFAF8', dark: false });

  useEffect(() => {
    const nodes = SECTIONS.map((s) => ({ ...s, el: document.getElementById(s.id) }));
    const intro = document.getElementById('intro');
    let raf = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);

      const ir = intro?.getBoundingClientRect();
      const nextVisible = !!ir && ir.top <= window.innerHeight * 0.35;
      setVisible((v) => (v === nextVisible ? v : nextVisible));

      const bajo = nodes.find((s) => {
        const r = s.el?.getBoundingClientRect();
        return r && r.top <= PROBE && r.bottom > PROBE;
      });
      if (bajo) {
        setSkin((prev) =>
          prev.bg === bajo.bg && prev.dark === bajo.dark ? prev : { bg: bajo.bg, dark: bajo.dark },
        );
      }
    };

    tick();
    return () => cancelAnimationFrame(raf);
  }, []);

  const ink = dark ? '#ffffff' : '#1F1B16';
  const soft = dark ? 'rgba(255,255,255,0.7)' : '#6d675e';
  const pillBg = dark ? '#ffffff' : '#111111';
  const pillInk = dark ? '#111111' : '#ffffff';

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-40">
      <div
        className="flex items-center gap-6 px-[clamp(20px,3.4vw,46px)] py-[clamp(14px,2.4vh,24px)] font-sans text-[12px] font-semibold uppercase tracking-[-0.025em]"
        style={{
          background: bg,
          color: soft,
          opacity: visible ? 1 : 0,
          transform: `translateY(${visible ? '0px' : '-24px'})`,
          pointerEvents: visible ? 'auto' : 'none',
          transition:
            'opacity 420ms ease, transform 480ms cubic-bezier(.2,.7,.2,1), color 380ms ease, background-color 380ms ease',
        }}
      >
        <a href="#top" className="shrink-0 text-[15px] font-extrabold tracking-[-0.055em] md:text-[17px]" style={{ color: ink }}>
          TIAGOGOCO
        </a>

        <nav className="absolute left-1/2 flex -translate-x-1/2 items-center gap-[clamp(24px,3.4vw,56px)] max-md:hidden">
          <a href="#proyectos" className="transition-opacity hover:opacity-55" style={{ color: ink }}>
            Work
          </a>
          <a href="#sobre-mi" className="transition-opacity hover:opacity-55" style={{ color: ink }}>
            About
          </a>
        </nav>

        <div
          className="ml-auto flex min-h-11 items-center gap-3 rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.04em] md:gap-4 md:px-5 md:text-[11px]"
          style={{ background: pillBg, color: pillInk }}
        >
          <a href={`mailto:${EMAIL}`} className="max-w-[150px] truncate transition-opacity hover:opacity-65 md:max-w-none">
            {EMAIL}
          </a>
          <button
            type="button"
            aria-label={copied ? 'Correo copiado' : 'Copiar correo'}
            title={copied ? 'Copiado' : 'Copiar correo'}
            onClick={copyEmail}
            className="grid size-7 shrink-0 place-items-center rounded-full transition-opacity hover:opacity-65 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
          >
            <CopyIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="8" y="8" width="10" height="10" rx="1.5" />
      <path d="M6 15H5.5A1.5 1.5 0 0 1 4 13.5v-8A1.5 1.5 0 0 1 5.5 4h8A1.5 1.5 0 0 1 15 5.5V6" />
    </svg>
  );
}
