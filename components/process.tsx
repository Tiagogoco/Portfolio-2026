'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useTransform, type MotionValue } from 'motion/react';
import { proceso } from '@/content/process';
import { stagger, useSectionProgress } from '@/lib/scroll';

/** §5.4 — único bloque azul. Cinco fases con panel de descripción. */
export function Process() {
  const ref = useRef<HTMLElement>(null);
  const p = useSectionProgress(ref);
  const [fase, setFase] = useState(0);

  const activa = proceso[fase];

  return (
    <section id="sobre-mi" ref={ref} className="relative h-[350vh] bg-blue max-md:h-[230vh]">
      <div className="sticky top-0 flex min-h-screen items-center py-[8vh] text-white">
        <div className="mx-auto w-full max-w-[1180px] px-14 max-md:px-6">
          <Step p={p} i={0}>
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/60">
              ( proceso creativo )
            </div>
          </Step>

          <Step p={p} i={1}>
            <h2
              className="m-0 mt-[18px] font-extrabold tracking-[-0.035em]"
              style={{ fontSize: 'clamp(34px, 4.4vw, 66px)', lineHeight: 0.98 }}
            >
              QUÉ HAGO Y CÓMO
            </h2>
          </Step>

          <Step p={p} i={2}>
            <p
              className="m-0 mt-4 max-w-[560px] leading-[1.34] text-white/[0.74]"
              style={{ fontSize: 'clamp(16px, 1.6vw, 22px)', textWrap: 'pretty' }}
            >
              Siempre me gustó crear cosas, convierto una idea en un producto completo, desde el
              diseño hasta el despliegue.
            </p>
          </Step>

          <div className="mt-[clamp(26px,5vh,62px)] grid grid-cols-[minmax(0,1.35fr)_minmax(200px,0.65fr)] items-start gap-14 max-lg:grid-cols-1 max-lg:gap-8">
            <div role="tablist" aria-label="Fases del proceso" className="flex flex-col">
              {proceso.map((f, i) => {
                const on = i === fase;
                return (
                  <Step key={f.n} p={p} i={3 + i} dim={on ? 1 : 0.44}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={on}
                      aria-controls="fase-panel"
                      tabIndex={on ? 0 : -1}
                      onMouseEnter={() => setFase(i)}
                      onFocus={() => setFase(i)}
                      onClick={() => setFase(i)}
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowDown' || e.key === 'ArrowRight')
                          setFase((v) => (v + 1) % proceso.length);
                        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft')
                          setFase((v) => (v - 1 + proceso.length) % proceso.length);
                      }}
                      className="flex w-full items-baseline gap-5 border-0 border-t border-white/[0.22] bg-transparent px-0.5 py-[clamp(10px,1.6vh,18px)] text-left text-white"
                    >
                      <span className="font-mono text-xs tracking-[0.14em] text-white/70">{f.n}</span>
                      <span
                        className="font-bold tracking-[-0.025em]"
                        style={{ fontSize: 'clamp(18px, 2.1vw, 30px)' }}
                      >
                        {f.label}
                      </span>
                    </button>
                  </Step>
                );
              })}
              <div className="border-t border-white/[0.22]" />
            </div>

            <Step p={p} i={3 + proceso.length}>
              <div id="fase-panel" role="tabpanel" className="pt-1.5">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/[0.55]">
                  ( {activa.n.padStart(2, '0')} )
                </div>
                <p
                  className="m-0 mt-3.5 leading-[1.42]"
                  style={{ fontSize: 'clamp(15px, 1.4vw, 19px)', textWrap: 'pretty' }}
                >
                  {activa.desc}
                </p>
              </div>
            </Step>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Stagger de toda la seccion: q = progress / 0.7 (5.4).
 * `dim` se anima aparte en 260 ms para que el cambio de fase no dependa del scroll.
 */
function Step({
  p,
  i,
  dim = 1,
  children,
}: {
  p: MotionValue<number>;
  i: number;
  dim?: number;
  children: React.ReactNode;
}) {
  const e = useTransform(p, (v) => stagger(v / 0.7, i));
  const y = useTransform(e, (v) => 26 * (1 - v));
  const dimMv = useMotionValue(dim);
  const opacity = useTransform([e, dimMv], ([a, b]: number[]) => a * b);

  useEffect(() => {
    const controls = animate(dimMv, dim, { duration: 0.26, ease: 'easeInOut' });
    return () => controls.stop();
  }, [dim, dimMv]);

  return (
    <motion.div data-motion="scroll" style={{ opacity, y }}>
      {children}
    </motion.div>
  );
}
