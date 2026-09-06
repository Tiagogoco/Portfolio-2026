'use client';

import { useRef } from 'react';
import { motion, useTransform, type MotionValue } from 'motion/react';
import { rowStyle, stackRows, type StackRow } from '@/content/stack';
import { clamp, useReducedMotion, useSectionProgress } from '@/lib/scroll';

/** Separación entre filas, en vh (§5.5). */
const SP = 13;
const TOTAL = stackRows.length * SP;

/** §5.5 — loop vertical infinito. Un recorrido de scroll = exactamente una vuelta. */
export function StackLoop() {
  const ref = useRef<HTMLElement>(null);
  const r = useSectionProgress(ref);
  const reduced = useReducedMotion();

  if (reduced) return <StackStatic />;

  return (
    <section id="stack" ref={ref} className="relative h-[460vh] bg-white max-md:h-[280vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute left-10 top-[26px] z-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-mute max-md:left-6 max-md:top-[68px]">
          ( herramientas )
        </div>

        <div className="absolute left-0 top-[13vh] z-2 flex w-full items-start px-6 md:top-0 md:h-full md:items-center md:w-[46%] md:px-0 md:pl-[clamp(40px,5vw,96px)]">
          <h2
            className="m-0 font-extrabold tracking-[-0.04em] text-blue"
            style={{ fontSize: 'clamp(30px, 4.6vw, 68px)', lineHeight: 0.94 }}
          >
            LAS HERRAMIENTAS
            <br />
            QUE USO{' '}
            <span className="font-serif font-normal italic tracking-[-0.02em]">(stack)</span>
          </h2>
        </div>

        {/* En movil la lista arranca bajo el titular y llega al borde inferior; la mascara
            conserva el desvanecido que en desktop da la propia formula de opacidad. */}
        <div className="absolute right-0 top-[23vh] h-[77vh] w-full overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_10%,#000_90%,transparent)] md:top-0 md:h-full md:w-[54%] md:[mask-image:none]">
          {stackRows.map((row, i) => (
            <Row key={`${row.k}-${i}`} row={row} index={i} progress={r} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Row({ row, index, progress }: { row: StackRow; index: number; progress: MotionValue<number> }) {
  const pos = useTransform(progress, (v) => {
    const shift = v * TOTAL;
    return ((((index * SP - shift) % TOTAL) + TOTAL) % TOTAL) - SP;
  });
  const y = useTransform(pos, (v) => `${v.toFixed(2)}vh`);
  const opacity = useTransform(pos, (v) => clamp(Math.min((100 - v) / 14, (v + SP) / 14)));

  return (
    <motion.div
      data-motion="scroll"
      className="absolute left-0 top-0 right-[clamp(40px,6vw,120px)] pl-[clamp(20px,3vw,56px)] will-change-[transform,opacity] max-md:right-6 max-md:pl-6"
      style={{ y, opacity }}
    >
      <div className="border-b border-rule pb-[clamp(10px,1.4vh,18px)]">
        <div style={{ ...rowStyle[row.k], lineHeight: 1.16, textWrap: 'pretty' }}>{row.t}</div>
      </div>
    </motion.div>
  );
}

/** Bajo `prefers-reduced-motion` el loop se vuelve una lista estatica. */
function StackStatic() {
  return (
    <section id="stack" className="relative bg-white px-10 py-[12vh]">
      <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-mute">
        ( herramientas )
      </div>
      <div className="mx-auto mt-10 grid max-w-[1180px] grid-cols-[minmax(0,46fr)_minmax(0,54fr)] gap-14 max-lg:grid-cols-1">
        <h2
          className="m-0 font-extrabold tracking-[-0.04em] text-blue"
          style={{ fontSize: 'clamp(30px, 4.6vw, 68px)', lineHeight: 0.94 }}
        >
          LAS HERRAMIENTAS
          <br />
          QUE USO <span className="font-serif font-normal italic tracking-[-0.02em]">(stack)</span>
        </h2>
        <div>
          {stackRows.map((row, i) => (
            <div key={`${row.k}-${i}`} className="border-b border-rule pb-[clamp(10px,1.4vh,18px)] pt-4">
              <div style={{ ...rowStyle[row.k], lineHeight: 1.16, textWrap: 'pretty' }}>{row.t}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
