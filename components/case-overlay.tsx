'use client';

import { useCallback, useEffect, useId, useRef, type RefObject } from 'react';
import Image from 'next/image';
import { projects } from '@/content/projects';

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

type Props = {
  index: number;
  onSelect: (index: number) => void;
  onClose: () => void;
  /** Elemento al que se devuelve el foco al cerrar. */
  opener: RefObject<HTMLElement | null>;
};

export function CaseOverlay({ index, onSelect, onClose, opener }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  const p = projects[index];
  const next = projects[(index + 1) % projects.length];

  /* Bloquea el body compensando el ancho de la barra de scroll (§6). */
  useEffect(() => {
    const { body } = document;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;

    body.style.overflow = 'hidden';
    if (gap > 0) body.style.paddingRight = `${gap}px`;

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
    };
  }, []);

  /* Devuelve el foco al botón que abrió el caso. */
  useEffect(() => {
    const el = opener.current;
    return () => el?.focus();
  }, [opener]);

  /* El scroll interno vuelve a 0 al abrir o cambiar de caso. */
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
    panelRef.current?.focus();
  }, [index]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      const nodes = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!nodes?.length) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && (active === first || active === panelRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  return (
    <div className="fixed inset-0 z-90 flex items-center justify-center bg-[#1d1d1d] p-[clamp(0px,2vh,24px)]" onKeyDown={onKeyDown}>
      <div className="absolute inset-0 bg-black/45" onClick={onClose} />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative flex h-full w-full max-w-[1280px] animate-[overlay-open_380ms_var(--ease-modal)_both] flex-col bg-page outline-none md:h-[min(96vh,1500px)]"
      >
        <div className="flex items-center justify-between border-b border-ink/15 px-[clamp(20px,4vw,60px)] py-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
            detalle proyecto / {p.n}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-11 items-center gap-3 border-0 bg-transparent px-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink transition-opacity hover:opacity-55 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            cerrar <span aria-hidden>×</span>
          </button>
        </div>

        <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
          <div className="mx-auto max-w-[1120px] px-[clamp(20px,5vw,72px)] pb-20 pt-[clamp(34px,7vw,88px)]">
            <header>
              <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-16">
                <div className="flex items-start gap-4">
                  <span className="pt-2 font-mono text-[11px] font-bold tracking-[0.12em] text-ink-mute">{p.n}</span>
                  <h2 id={titleId} className="m-0 font-extrabold uppercase tracking-[-0.09em]" style={{ fontSize: 'clamp(54px, 10vw, 142px)', lineHeight: 0.76 }}>
                    {p.title}
                  </h2>
                </div>
                <p className="m-0 max-w-[620px] text-[clamp(23px,3vw,42px)] font-medium leading-[0.98] tracking-[-0.055em] text-ink">
                  {p.lede}
                </p>
              </div>

              <div className="mt-[clamp(46px,7vw,84px)] flex items-start gap-8 border-t-2 border-ink pt-4 max-md:flex-col max-md:gap-5">
                <span className="shrink-0 font-extrabold text-[clamp(21px,2vw,28px)] uppercase tracking-[-0.055em]">Stack</span>
                <ul className="m-0 flex min-w-0 flex-1 list-none flex-wrap gap-x-8 gap-y-3 p-0 font-bold text-[clamp(13px,1.3vw,17px)] uppercase tracking-[-0.025em] max-md:gap-x-5">
                  {p.stack.map((s) => <li key={s}>{s}</li>)}
                </ul>
              </div>
            </header>

            <main className="mt-[clamp(34px,5vw,64px)]">
              <MediaFrame src={p.cardShot.src} alt={p.cardShot.alt} accent={p.accent} className="aspect-[16/8.6]" />

              <div className="mt-[clamp(26px,4vw,48px)] grid grid-cols-2 gap-[clamp(14px,3vw,32px)] max-sm:grid-cols-1">
                <MediaFrame src={p.shots[0].src} alt={p.shots[0].alt} accent={p.accent} className="aspect-[0.72]" />
                <MediaFrame src={p.shots[1].src} alt={p.shots[1].alt} accent={p.accent} className="aspect-[0.72]" />
              </div>

              <div className="mt-[clamp(80px,12vw,170px)] grid gap-10 border-t-2 border-ink pt-7 lg:grid-cols-2 lg:gap-20">
                <Story label="problema" text={p.problema} />
                <Story label="solución" text={p.solucion} accent={p.accent} />
              </div>

              <section className="mt-[clamp(80px,12vw,170px)]">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-mute">( decisiones técnicas )</div>
                <div className="mt-6 grid gap-7 md:grid-cols-3 md:gap-8">
                  {p.decisiones.map((d) => (
                    <p key={d.n} className="m-0 text-[clamp(17px,1.5vw,22px)] leading-[1.12] tracking-[-0.035em]">
                      <span className="font-bold">{d.title}.</span> {d.note}
                    </p>
                  ))}
                </div>
              </section>

              <section className="mt-[clamp(80px,12vw,170px)] grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="bg-ink px-[clamp(24px,4vw,60px)] py-[clamp(28px,5vw,68px)] text-page">
                  <h3 className="m-0 font-extrabold text-[clamp(42px,6vw,86px)] uppercase leading-[0.8] tracking-[-0.08em]">Aprendizaje</h3>
                  <div className="mt-10 flex flex-col gap-5">
                    {p.aprendizajes.map((a) => <p key={a} className="m-0 max-w-[36em] text-[clamp(18px,1.7vw,25px)] leading-[1.08] tracking-[-0.04em]">{a}</p>)}
                  </div>
                </div>
                {p.resenas && (
                  <div className="border-t-2 border-ink pt-5">
                    <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-mute">( reseñas )</div>
                    <div className="mt-6 flex flex-col gap-7">
                      {p.resenas.map((r) => <blockquote key={r.by} className="m-0 text-[clamp(17px,1.5vw,22px)] leading-[1.15] tracking-[-0.035em]">{r.q}<footer className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">{r.by}</footer></blockquote>)}
                    </div>
                  </div>
                )}
              </section>
            </main>

            <footer className="mt-[clamp(100px,15vw,220px)] flex items-end justify-between gap-5 border-t-2 border-ink pt-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">siguiente proyecto</span>
              <button type="button" onClick={() => onSelect((index + 1) % projects.length)} className="border-0 bg-transparent p-0 text-right font-extrabold text-[clamp(38px,7vw,94px)] uppercase leading-[0.8] tracking-[-0.09em] transition-opacity hover:opacity-55 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
                {next.short}
              </button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

function MediaFrame({ src, alt, accent, className }: { src: string; alt: string; accent: string; className: string }) {
  return (
    <div className={`relative overflow-hidden bg-black ${className}`} style={{ border: `clamp(8px, 1.2vw, 16px) solid ${accent}` }}>
      <Image src={src} alt={alt} fill sizes="(max-width: 640px) 92vw, (max-width: 1024px) 78vw, 1000px" className="object-cover object-top transition-transform duration-700 ease-[var(--ease-ui)] hover:scale-[1.025]" />
    </div>
  );
}

function Story({ label, text, accent }: { label: string; text: string; accent?: string }) {
  return (
    <div>
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-mute" style={accent ? { color: accent } : undefined}>({label})</div>
      <p className="m-0 mt-4 max-w-[30em] text-[clamp(20px,2.2vw,32px)] leading-[1.05] tracking-[-0.045em]">{text}</p>
    </div>
  );
}
