'use client';

import { useCallback, useEffect, useId, useRef, type RefObject } from 'react';
import Image from 'next/image';
import { projects } from '@/content/projects';
import { GlobeIcon } from './globe-icon';

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
    <div
      className="fixed inset-0 z-90 flex items-center justify-center p-[clamp(12px,3vh,40px)]"
      onKeyDown={onKeyDown}
    >
      <div
        className="absolute inset-0 animate-[overlay-fade_260ms_ease_both] bg-[rgba(31,27,22,0.62)] backdrop-blur-[6px]"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative flex h-[min(92vh,940px)] w-[min(1240px,100%)] flex-col animate-[overlay-open_380ms_var(--ease-modal)_both] outline-none"
      >
        <div role="tablist" aria-label="Casos" className="flex items-end gap-0.5 pl-0.5">
          {projects.map((c, i) => {
            const active = i === index;
            return (
              <button
                key={c.id}
                role="tab"
                type="button"
                aria-selected={active}
                tabIndex={active ? 0 : -1}
                onClick={() => onSelect(i)}
                className="cursor-pointer rounded-[12px_20px_0_0] border-0 font-mono text-[11px] uppercase tracking-[0.16em] transition-[padding] duration-200"
                style={{
                  padding: active ? '14px 26px 13px' : '11px 22px 10px',
                  background: active ? '#FBFAF8' : '#E7E1D6',
                  color: active ? '#1F1B16' : '#8d8578',
                }}
              >
                {c.tab}
              </button>
            );
          })}
          <button
            type="button"
            onClick={onClose}
            className="mb-2.5 ml-auto cursor-pointer border-0 bg-transparent p-0 font-mono text-[10px] uppercase tracking-[0.18em] text-[rgba(251,250,248,0.75)] transition-colors duration-200 hover:text-page"
          >
            esc · cerrar
          </button>
        </div>

        <div className="flex min-h-0 flex-1 overflow-hidden rounded-[0_22px_22px_22px] bg-page shadow-[0_40px_120px_rgba(0,0,0,0.42)]">
          <div
            ref={scrollRef}
            className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden px-[clamp(28px,5vw,76px)] pt-[clamp(30px,4.4vh,54px)] pb-20 max-md:px-5"
          >
            {/* 1 · cabecera */}
            <div className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] items-start gap-[clamp(28px,5vw,72px)] max-lg:grid-cols-1">
              <div>
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <div
                      className="font-mono text-[11px] uppercase tracking-[0.2em]"
                      style={{ color: p.accent }}
                    >
                      caso {p.n} · {p.kind}
                    </div>
                    <h2
                      id={titleId}
                      className="m-0 mt-3 font-extrabold tracking-[-0.04em]"
                      style={{ fontSize: 'clamp(38px, 5vw, 66px)', lineHeight: 0.94 }}
                    >
                      {p.title}
                    </h2>
                  </div>
                  <a
                    href={p.href}
                    {...(p.hrefExterno ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    aria-label={`Ver ${p.title} en vivo`}
                    title="ver sitio en vivo"
                    className="mt-1 inline-flex size-[52px] shrink-0 items-center justify-center rounded-full transition-[transform,opacity] duration-200 ease-[var(--ease-ui)] hover:scale-[1.06] hover:opacity-[0.88]"
                    style={{ background: p.accent, color: p.accentInk }}
                  >
                    <GlobeIcon size={25} />
                  </a>
                </div>

                <p
                  className="m-0 mt-[22px] max-w-[34em] leading-[1.4] tracking-[-0.01em] text-[#2c2823]"
                  style={{ fontSize: 'clamp(17px, 1.8vw, 23px)', textWrap: 'pretty' }}
                >
                  {p.lede}
                </p>

                {/* 2 · stack */}
                <div className="mt-[clamp(32px,4.6vh,52px)]">
                  <div
                    className="font-extrabold tracking-[-0.035em]"
                    style={{ fontSize: 'clamp(26px, 3vw, 38px)' }}
                  >
                    STACK
                  </div>
                  <ul className="mt-3.5 flex max-w-[340px] list-none flex-col p-0">
                    {p.stack.map((s, i) => (
                      <li
                        key={s}
                        className="flex items-baseline justify-between gap-3.5 border-b-2 border-ink px-0.5 py-[11px] font-bold uppercase tracking-[-0.01em]"
                        style={{ fontSize: 'clamp(17px, 1.7vw, 22px)' }}
                      >
                        {s}
                        <span className="font-mono text-[10px] font-normal tracking-[0.14em] text-ink-mute">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Phone src={p.shots[0].src} alt={p.shots[0].alt} />
            </div>

            {/* 3 · problema / solución */}
            <div className="mt-[clamp(44px,6vh,74px)] grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[clamp(20px,3vw,48px)] border-t-2 border-ink pt-8">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-mute">
                  ( problema )
                </div>
                <p
                  className="m-0 mt-3.5 leading-[1.5]"
                  style={{ fontSize: 'clamp(15px, 1.5vw, 19px)', textWrap: 'pretty' }}
                >
                  {p.problema}
                </p>
              </div>
              <div>
                <div
                  className="font-mono text-[11px] uppercase tracking-[0.2em]"
                  style={{ color: p.accent }}
                >
                  ( solución )
                </div>
                <p
                  className="m-0 mt-3.5 leading-[1.5]"
                  style={{ fontSize: 'clamp(15px, 1.5vw, 19px)', textWrap: 'pretty' }}
                >
                  {p.solucion}
                </p>
              </div>
            </div>

            {/* 4 · decisiones técnicas */}
            <div className="mt-[clamp(40px,5.4vh,64px)]">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-mute">
                ( decisiones técnicas )
              </div>
              <div className="mt-[18px] grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[clamp(18px,2.6vw,40px)]">
                {p.decisiones.map((d) => (
                  <p
                    key={d.n}
                    className="m-0 leading-[1.55] text-body"
                    style={{ fontSize: 'clamp(14px, 1.35vw, 17px)', textWrap: 'pretty' }}
                  >
                    <span className="font-bold text-ink">{d.title}.</span> {d.note}
                  </p>
                ))}
              </div>
            </div>

            {/* 5 · aprendizaje */}
            <div className="mt-[clamp(44px,6vh,74px)] grid grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] items-center gap-[clamp(28px,5vw,72px)] max-lg:grid-cols-1">
              <div
                className="rounded-[26px] px-[clamp(26px,3.4vw,42px)] py-[clamp(28px,4vh,44px)]"
                style={{ background: p.accent, color: p.accentInk }}
              >
                <div
                  className="font-extrabold uppercase tracking-[-0.035em]"
                  style={{ fontSize: 'clamp(24px, 2.8vw, 34px)' }}
                >
                  Aprendizaje
                </div>
                <div className="mt-4 flex flex-col gap-3.5">
                  {p.aprendizajes.map((a) => (
                    <p
                      key={a}
                      className="m-0 max-w-[34em] leading-[1.42]"
                      style={{ fontSize: 'clamp(15px, 1.6vw, 20px)', textWrap: 'pretty' }}
                    >
                      {a}
                    </p>
                  ))}
                </div>
              </div>

              <Phone src={p.shots[1].src} alt={p.shots[1].alt} />
            </div>

            {/* 6 · reseñas */}
            {p.resenas && (
              <div className="mt-[clamp(44px,6vh,74px)]">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-mute">
                  ( reseñas )
                </div>
                <div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
                  {p.resenas.map((r) => (
                    <div
                      key={r.by}
                      className="rounded-[20px] border border-rule-soft bg-[#F4F1EA] px-[clamp(22px,2.6vw,30px)] py-[clamp(22px,3vh,30px)]"
                    >
                      <div className="flex items-center gap-3">
                        <span aria-label="5 de 5 estrellas" className="text-sm tracking-[0.12em] text-star">
                          ★★★★★
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
                          verificada
                        </span>
                      </div>
                      <p
                        className="m-0 mt-4 leading-[1.45]"
                        style={{ fontSize: 'clamp(15px, 1.5vw, 19px)', textWrap: 'pretty' }}
                      >
                        {r.q}
                      </p>
                      <div className="mt-[18px] border-t border-rule-soft pt-4">
                        <div
                          className="font-bold tracking-[-0.02em]"
                          style={{ fontSize: 'clamp(16px, 1.6vw, 20px)' }}
                        >
                          {r.by}
                        </div>
                        <div className="mt-1.5 font-mono text-[10px] uppercase leading-[1.6] tracking-[0.16em] text-ink-mute">
                          {r.item}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7 · siguiente */}
            <div className="mt-[34px] flex flex-wrap items-center justify-end gap-4">
              <button
                type="button"
                onClick={() => onSelect((index + 1) % projects.length)}
                className="inline-flex cursor-pointer items-center gap-3 border-0 bg-transparent font-bold tracking-[-0.025em] transition-[transform,color] duration-[240ms] ease-[var(--ease-ui)] hover:translate-x-2 hover:text-blue"
                style={{ fontSize: 'clamp(18px, 2vw, 26px)' }}
              >
                Siguiente: {next.short} →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Phone({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="w-full max-w-[300px] overflow-hidden rounded-[38px] border-[10px] border-ink bg-ink shadow-[0_30px_70px_rgba(31,27,22,0.22)] max-lg:justify-self-center">
      <div className="relative aspect-9/19.5 overflow-hidden bg-white">
        <Image src={src} alt={alt} fill sizes="300px" className="object-cover object-top" />
      </div>
    </div>
  );
}
