'use client';

import { useRef } from 'react';
import { motion, useTransform, type MotionValue } from 'motion/react';
import { introLines } from '@/content/site';
import { clamp, easeOutCubic, useSectionProgress } from '@/lib/scroll';

/** §5.2 — revelado palabra por palabra sobre un sticky de 380vh. */
export function IntroReveal() {
  const ref = useRef<HTMLElement>(null);
  const p = useSectionProgress(ref);

  const words = introLines.map((l) => l.split(' '));
  const total = words.reduce((a, w) => a + w.length, 0);
  const win = 1.35 / total + 0.06;
  const tail = useTransform(p, (v) => clamp((v - 0.84) / 0.12));

  let i = 0;

  return (
    <section id="intro" ref={ref} className="relative h-[380vh] bg-page max-md:h-[240vh]">
      {/* En móvil el bloque se alinea arriba y su alto lo marca el contenido, no el viewport:
          centrado dejaba ~245px muertos antes del texto, y los 100vh dejaban otros ~307px
          después, que se veían como un hueco enorme antes de #proyectos. */}
      <div className="sticky top-0 flex min-h-screen items-center pt-[clamp(96px,13vh,132px)] pb-14 max-md:min-h-0 max-md:items-start max-md:pt-24 max-md:pb-8">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 90% at 50% 50%, rgba(31,111,235,0.05) 0%, rgba(251,250,248,0) 62%)',
          }}
        />
        <div className="relative mx-auto w-full max-w-[1180px] px-14 max-md:px-6">
          <div className="flex items-start gap-7">
            <div className="shrink-0 pt-[18px] font-mono text-[11px] uppercase tracking-[0.22em] text-ink-mute max-md:hidden">
              ( intro )
            </div>
            <div className="flex-1">
              {words.map((line, li) => (
                <p
                  key={li}
                  className="m-0 mb-[clamp(18px,2.4vh,34px)] flex flex-wrap font-semibold"
                  style={{
                    fontSize: 'clamp(30px, 3.6vw, 54px)',
                    lineHeight: 1.14,
                    letterSpacing: '-0.028em',
                    columnGap: '0.28em',
                    rowGap: '0.06em',
                    textWrap: 'pretty',
                  }}
                >
                  {line.map((w) => (
                    <Word key={`${li}-${i}`} word={w} start={i++ / total} window={win} progress={p} />
                  ))}
                </p>
              ))}

              <motion.div
                data-motion="scroll"
                className="mt-[clamp(24px,4vh,46px)] flex items-center gap-[18px]"
                style={{ opacity: tail }}
              >
                <span className="h-px w-16 bg-[#d8d2c7]" />
                <a
                  href="#proyectos"
                  className="font-mono text-[13px] font-medium uppercase tracking-[0.2em] text-ink"
                >
                  Últimos proyectos ↓
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Word({
  word,
  start,
  window: win,
  progress,
}: {
  word: string;
  start: number;
  window: number;
  progress: MotionValue<number>;
}) {
  const e = useTransform(progress, (v) => easeOutCubic(clamp((v / 0.82 - start) / win)));
  const opacity = useTransform(e, (v) => 0.1 + 0.9 * v);
  const y = useTransform(e, (v) => 14 * (1 - v));
  const filter = useTransform(e, (v) => `blur(${(5 * (1 - v)).toFixed(2)}px)`);
  /* Salto duro de color, sin interpolación (§5.2). */
  const color = useTransform(e, (v) => (v > 0.55 ? '#1F1B16' : '#8d8578'));

  return (
    <motion.span
      data-motion="scroll"
      className="inline-block will-change-[opacity,transform]"
      style={{ opacity, y, filter, color }}
    >
      {word}
    </motion.span>
  );
}
