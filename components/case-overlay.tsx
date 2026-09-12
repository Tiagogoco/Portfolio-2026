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
  opener?: RefObject<HTMLElement | null>;
  standalone?: boolean;
};

export function CaseOverlay({ index, onSelect, onClose, opener, standalone = false }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  const p = projects[index];
  const next = projects[(index + 1) % projects.length];

  /* Bloquea el body compensando el ancho de la barra de scroll (§6). */
  useEffect(() => {
    if (standalone) return;

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
  }, [standalone]);

  /* Devuelve el foco al botón que abrió el caso. */
  useEffect(() => {
    if (standalone || !opener) return;
    const el = opener.current;
    return () => el?.focus();
  }, [opener, standalone]);

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
    <div className={standalone ? 'min-h-screen bg-page' : 'fixed inset-0 z-90 flex items-center justify-center bg-[#1d1d1d] p-[clamp(0px,2vh,24px)]'} onKeyDown={onKeyDown}>
      {!standalone && <div className="absolute inset-0 bg-black/45" onClick={onClose} />}

      <div
        ref={panelRef}
        role={standalone ? 'main' : 'dialog'}
        aria-modal={standalone ? undefined : true}
        aria-labelledby={titleId}
        tabIndex={-1}
        className={standalone ? 'relative flex min-h-screen w-full flex-col bg-page outline-none' : 'relative flex h-full w-full max-w-[1280px] animate-[overlay-open_380ms_var(--ease-modal)_both] flex-col bg-page outline-none md:h-[min(96vh,1500px)]'}
      >
        <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
          <div className={`mx-auto max-w-[1120px] px-[clamp(20px,5vw,72px)] pb-20 ${standalone ? 'pt-[clamp(76px,10vh,100px)]' : 'pt-[clamp(34px,7vw,88px)]'}`}>
            <header>
              <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:gap-12">
                <div className="flex min-w-0 items-start justify-between gap-4 max-md:flex-col max-md:gap-2">
                  <div className="flex min-w-0 items-start gap-4">
                    <span className="pt-2 font-mono text-[11px] font-bold tracking-[0.12em] text-ink-mute">{p.n}</span>
                    <h2 id={titleId} className={`m-0 min-w-0 max-w-full shrink-0 font-extrabold text-[clamp(30px,3vw,43px)] uppercase leading-[0.76] tracking-[-0.09em] max-md:text-[clamp(60px,16vw,128px)] ${p.id === 'saint' ? 'whitespace-normal' : 'whitespace-nowrap'}`}>
                      {p.id === 'saint' ? <>SAINT<br />PADEL</> : p.title}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex min-h-11 shrink-0 items-center gap-3 border-0 bg-transparent px-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink transition-opacity hover:opacity-55 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink max-md:order-first max-md:self-end"
                  >
                    cerrar <span aria-hidden>×</span>
                  </button>
                </div>
                <p className="m-0 min-w-0 max-w-[620px] text-[clamp(19px,2.2vw,32px)] font-medium leading-[1.02] tracking-[-0.045em] text-ink">
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
              <MediaFrame
                src={p.cardShot.src}
                alt={p.cardShot.alt}
                accent={p.id === 'rankeo' ? '#CAFF00' : p.accent}
                video={p.id === 'rankeo' ? '/video/rankeo-landing.mp4' : p.id === 'saint' ? '/video/saint-padel-landing.mp4' : p.id === 'piri' ? '/video/piri-desktop.mp4' : undefined}
                playbackRate={p.id === 'piri' ? 1.25 : p.id === 'rankeo' || p.id === 'saint' ? 1.2 : undefined}
                className={p.id === 'rankeo' ? 'aspect-[2988/1720]' : p.id === 'saint' ? 'aspect-[2988/1792]' : 'aspect-[2988/1796]'}
              />

              {p.id === 'piri' && (
                <MediaFrame
                  src={p.cardShot.src}
                  alt="Segundo recorrido de la experiencia de PIRI"
                  accent={p.accent}
                  video="/video/piri-desktop-2.mp4"
                  playbackRate={1.25}
                  className="mt-5 aspect-[2988/1796]"
                />
              )}

              <div className="mt-[clamp(80px,12vw,170px)] grid gap-10 border-t-2 border-ink pt-7 lg:grid-cols-2 lg:gap-20">
                <Story label={p.problemaLabel ?? 'problema'} text={p.problema} />
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
                  <h3 className="m-0 font-extrabold text-[clamp(30px,3vw,43px)] uppercase leading-[0.8] tracking-[-0.08em]">Aprendizaje</h3>
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

function MediaFrame({ src, alt, accent, video, playbackRate, className = '', natural = false, w, h }: { src: string; alt: string; accent: string; video?: string; playbackRate?: number; className?: string; natural?: boolean; w?: number; h?: number }) {
  return (
    <div className={`relative overflow-hidden bg-black ${className}`} style={{ border: `clamp(8px, 1.2vw, 16px) solid ${accent}` }}>
      {video ? (
        <video
          key={video}
          aria-label={alt}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          ref={(node) => {
            if (node && playbackRate) node.playbackRate = playbackRate;
          }}
          className="absolute inset-0 size-full object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>
      ) : natural && w && h ? (
        <Image src={src} alt={alt} width={w} height={h} sizes="(max-width: 640px) 92vw, 560px" className="block h-auto w-full transition-transform duration-700 ease-[var(--ease-ui)] hover:scale-[1.025]" />
      ) : (
        <Image src={src} alt={alt} fill sizes="(max-width: 640px) 92vw, (max-width: 1024px) 78vw, 1000px" className="object-cover object-top transition-transform duration-700 ease-[var(--ease-ui)] hover:scale-[1.025]" />
      )}
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
