'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useTransform, type MotionValue } from 'motion/react';
import { satellites } from '@/content/site';
import { clamp, useIsMobile, useReducedMotion, useSectionProgress } from '@/lib/scroll';

/** Contenido de cada satélite, en el orden de `satellites` (§5.6). */
const CONTENT: React.ReactNode[] = [
  <LottieSlot key="l1" label="Lottie 1" />,
  <div key="s2">
    <div className="font-serif italic leading-[1.1]" style={{ fontSize: 'clamp(20px, 2.1vw, 32px)' }}>
      Puebla,
      <br />
      México
    </div>
    <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">base</div>
  </div>,
  <LottieSlot key="l2" label="Lottie 2" />,
  <div
    key="s4"
    className="font-bold leading-[1.2] tracking-[-0.02em]"
    style={{ fontSize: 'clamp(15px, 1.5vw, 21px)' }}
  >
    Autodidacta
    <br />
    desde 2022
  </div>,
  <LottieSlot key="l3" label="Lottie 3" />,
  <div key="s6" className="font-serif italic leading-[1.1]" style={{ fontSize: 'clamp(19px, 2vw, 30px)' }}>
    padel casi
    <br />
    diario
  </div>,
  <LottieSlot key="l4" label="Lottie 4" />,
  <div key="s8">
    <div
      className="font-bold leading-[1.2] tracking-[-0.02em]"
      style={{ fontSize: 'clamp(15px, 1.5vw, 21px)' }}
    >
      Buceo cuando
      <br />
      el mar deja
    </div>
    <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">
      off · screen
    </div>
  </div>,
];

/** §5.6 — satélites en flujo continuo sobre un sticky de 460vh. */
export function Whoami() {
  const ref = useRef<HTMLElement>(null);
  const w = useSectionProgress(ref);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();

  const centerY = useTransform(w, (v) => `${(-7 * v).toFixed(2)}vh`);

  /* §9 — en móvil los cuatro carriles laterales no caben: queda un solo carril de textos. */
  const visibles = mobile
    ? satellites.map((s, i) => ({ s, i })).filter(({ s }) => s.kind === 'text')
    : satellites.map((s, i) => ({ s, i }));

  if (reduced) return <WhoamiStatic />;

  return (
    <section id="whoami" ref={ref} className="relative h-[460vh] bg-page max-md:h-[280vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-white">
        <div className="absolute left-10 top-[26px] z-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-mute max-md:left-6 max-md:top-[104px]">
          ( sobre mí )
        </div>

        <div className="relative h-full overflow-hidden">
          <motion.div
            className="absolute left-1/2 top-[8%] whitespace-nowrap font-mono font-medium tracking-[-0.02em]"
            style={{ fontSize: 'clamp(22px, 2.6vw, 40px)', x: '-50%', y: centerY }}
          >
            ~whoami
          </motion.div>

          <motion.div
            className="absolute left-1/2 top-1/2 w-[min(26vw,360px)] overflow-hidden max-md:w-[46vw]"
            style={{ x: '-50%', y: centerY, translateY: '-46%' }}
          >
            <div className="relative aspect-4/5">
              <Image
                src="/img/perfil/retrato.webp"
                alt="Retrato de Tiago"
                fill
                sizes="(max-width: 768px) 46vw, 360px"
                className="object-cover"
                style={{ objectPosition: '50% 18%' }}
              />
            </div>
          </motion.div>

          {visibles.map(({ s, i }) => (
            <Satellite
              key={i}
              phase={s.phase}
              progress={w}
              lane={s.lane}
              offset={mobile ? '2%' : s.offset}
              width={mobile ? '25%' : s.width}
            >
              {CONTENT[i]}
            </Satellite>
          ))}
        </div>
      </div>
    </section>
  );
}

function Satellite({
  phase,
  progress,
  lane,
  offset,
  width,
  children,
}: {
  phase: number;
  progress: MotionValue<number>;
  lane: 'left' | 'right';
  offset: string;
  width: string;
  children: React.ReactNode;
}) {
  /* t recorre 1.25 vueltas por scroll: entran por abajo, cruzan, salen por arriba. */
  const t = useTransform(progress, (v) => (phase + v * 1.25) % 1);
  const y = useTransform(t, (v) => `${(104 - v * 130).toFixed(2)}vh`);
  const opacity = useTransform(t, (v) => clamp(Math.min(v / 0.12, (1 - v) / 0.14)));

  return (
    <motion.div
      className="absolute top-0"
      style={lane === 'left' ? { left: offset, width, y, opacity } : { right: offset, width, y, opacity }}
    >
      {children}
    </motion.div>
  );
}

function LottieSlot({ label }: { label: string }) {
  return <div aria-label={label} role="presentation" className="aspect-square rounded-[14px] bg-lottie-slot" />;
}

/** Bajo `prefers-reduced-motion` el flujo se vuelve una rejilla legible sin scroll. */
function WhoamiStatic() {
  return (
    <section id="whoami" className="relative bg-white px-10 py-[14vh]">
      <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-mute">( sobre mí )</div>
      <div className="mx-auto mt-10 flex max-w-[900px] flex-col items-center gap-10">
        <div className="font-mono font-medium tracking-[-0.02em]" style={{ fontSize: 'clamp(22px, 2.6vw, 40px)' }}>
          ~whoami
        </div>
        <div className="relative aspect-4/5 w-[min(320px,70vw)] overflow-hidden">
          <Image
            src="/img/perfil/retrato.webp"
            alt="Retrato de Tiago"
            fill
            sizes="320px"
            className="object-cover"
            style={{ objectPosition: '50% 18%' }}
          />
        </div>
        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(150px,1fr))] items-center justify-items-center gap-8 text-center">
          {satellites.map((s, i) => (
            <div key={i} style={{ width: s.width }}>
              {CONTENT[i]}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
