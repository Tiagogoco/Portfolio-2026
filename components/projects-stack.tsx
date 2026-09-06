'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useTransform, type MotionValue } from 'motion/react';
import { projects, type Project } from '@/content/projects';
import { proyectosHeader } from '@/content/site';
import { stagger, useEnterProgress } from '@/lib/scroll';
import { GlobeIcon } from './globe-icon';

/**
 * §5.3 — desde `md`, tres tarjetas-carpeta sticky que se apilan solas: el apilado sale
 * de tres valores que crecen juntos (padding-top, z-index y sombra) y no hay animación
 * por scroll. En móvil la carpeta desaparece: cada proyecto es la captura sobre el fondo
 * de página, en una lista vertical normal.
 */
const LAYERS = [
  { paddingTop: '8vh', shadow: '0 -18px 60px rgba(31,27,22,0.10), 0 40px 90px rgba(31,27,22,0.14)' },
  { paddingTop: '12vh', shadow: '0 -18px 60px rgba(31,27,22,0.10), 0 40px 90px rgba(31,27,22,0.16)' },
  { paddingTop: '16vh', shadow: '0 -18px 60px rgba(31,27,22,0.10), 0 40px 90px rgba(31,27,22,0.18)' },
];

export function ProjectsStack({ onOpen }: { onOpen: (index: number) => void }) {
  return (
    <section
      id="proyectos"
      className="relative bg-page pb-[12vh] max-md:flex max-md:flex-col max-md:gap-16 max-md:px-6 max-md:pt-10 max-md:pb-16"
    >
      <ProjectsHeader />
      {projects.map((p, i) => (
        <ProjectCard key={p.id} project={p} layer={LAYERS[i]} index={i} onOpen={() => onOpen(i)} />
      ))}
    </section>
  );
}

function ProjectCard({
  project: p,
  layer,
  index,
  onOpen,
}: {
  project: Project;
  layer: (typeof LAYERS)[number];
  index: number;
  onOpen: () => void;
}) {
  return (
    <div
      className="relative md:sticky md:top-0 md:flex md:h-[145vh] md:items-start md:justify-center md:px-10 md:pt-[var(--pt)]"
      style={{ '--pt': layer.paddingTop, zIndex: index + 1 } as React.CSSProperties}
    >
      <div
        className="relative w-full md:max-w-[1100px]"
        style={{ '--bg': p.cardBg, '--sh': layer.shadow } as React.CSSProperties}
      >
        {/* Pestaña y superficie de carpeta: sólo desde md. */}
        <div className="hidden h-[46px] w-[268px] rounded-[14px_26px_0_0] bg-[var(--bg)] shadow-[0_-1px_0_rgba(0,0,0,0.03)] md:block" />

        <div className="md:-mt-px md:rounded-[0_22px_22px_22px] md:bg-[var(--bg)] md:p-10 md:shadow-[var(--sh)]">
          <div
            className="absolute left-8 top-3 hidden font-mono text-xs uppercase tracking-[0.18em] md:block"
            style={{ color: p.cardLabelInk }}
          >
            proyecto {p.n}
          </div>

          {/* Año y enlace al sitio, fuera de la imagen: los banners son composiciones
              cerradas y cualquier cosa encima les tapa el logotipo. */}
          <div className="mb-5 flex items-center gap-4 max-md:mb-4">
            <span
              className="font-mono text-[11px] uppercase tracking-[0.22em]"
              style={{ color: p.cardLabelInk }}
            >
              {p.year}
            </span>
            <span className="h-px flex-1" style={{ background: p.cardChipBorder }} />
            <a
              href={p.href}
              {...(p.hrefExterno ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              aria-label={`Ver sitio de ${p.title}`}
              title="ver sitio"
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-full transition-transform duration-200 ease-[var(--ease-ui)] hover:scale-[1.06]"
              style={{ background: p.accent, color: p.accentInk }}
            >
              <GlobeIcon size={21} />
            </a>
          </div>

          <div
            /* La caja toma la proporción del propio asset: así ningún banner se recorta. */
            className="relative overflow-hidden rounded-[14px]"
            style={{
              aspectRatio: `${p.cardShot.w} / ${p.cardShot.h}`,
              background: p.cardShotBg,
            }}
          >
            <Image
              src={p.cardShot.src}
              alt={p.cardShot.alt}
              fill
              sizes="(max-width: 768px) 92vw, 1020px"
              className="object-cover"
            />
          </div>

          {/* Nombre y stack en una sola fila. */}
          <div className="mt-7 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4 max-md:mt-6">
            <h3 className="m-0 font-extrabold tracking-[-0.03em] text-[clamp(30px,8vw,44px)]">
              {p.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {p.teaserTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-[10px] border px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] md:text-xs"
                  style={{ borderColor: p.cardChipBorder, color: p.cardChipInk }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <p
            className="m-0 mt-4 max-w-[46em] text-[17px] leading-[1.45] md:text-xl"
            style={{ color: p.cardTeaserInk, textWrap: 'pretty' }}
          >
            {p.teaser}
          </p>

          <button
            type="button"
            onClick={onOpen}
            className="mt-7 cursor-pointer border-0 bg-transparent p-0 text-[26px] font-bold tracking-[-0.03em] transition-opacity duration-200 hover:opacity-60 max-md:mt-6 max-md:text-[22px]"
            style={{ color: p.accent, borderBottom: `3px solid ${p.accent}` }}
          >
            abrir caso →
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Encabezado de la sección. Entra con el revelado escalonado de §5.4: mismo easing y
 * mismo desplazamiento de 26px, encadenado al progreso de entrada del bloque (§4).
 */
function ProjectsHeader() {
  const ref = useRef<HTMLElement>(null);
  const enter = useEnterProgress(ref);

  return (
    <header
      ref={ref}
      className="mx-auto w-full max-w-[1180px] px-10 pt-[14vh] pb-[7vh] max-md:px-0 max-md:pt-0 max-md:pb-0"
    >
      <Reveal p={enter} i={0}>
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-mute">
          {proyectosHeader.eyebrow}
        </div>
      </Reveal>

      <Reveal p={enter} i={1}>
        <h2
          className="m-0 mt-[18px] font-extrabold tracking-[-0.035em]"
          style={{ fontSize: 'clamp(34px, 4.4vw, 66px)', lineHeight: 0.98 }}
        >
          {proyectosHeader.title}
        </h2>
      </Reveal>

      <Reveal p={enter} i={2}>
        <p
          className="m-0 mt-4 max-w-[560px] leading-[1.34] text-body"
          style={{ fontSize: 'clamp(16px, 1.6vw, 22px)', textWrap: 'pretty' }}
        >
          {proyectosHeader.lede}
        </p>
      </Reveal>

      <Reveal p={enter} i={3}>
        <div className="mt-[clamp(24px,4vh,46px)] flex items-center gap-[18px] font-mono text-[11px] uppercase tracking-[0.22em] text-ink-mute">
          <span className="h-px w-16 bg-rule" />
          {String(projects.length).padStart(2, '0')} proyectos
        </div>
      </Reveal>
    </header>
  );
}

function Reveal({
  p,
  i,
  children,
}: {
  p: MotionValue<number>;
  i: number;
  children: React.ReactNode;
}) {
  const e = useTransform(p, (v) => stagger(v, i, 0.12, 0.3));
  const y = useTransform(e, (v) => 26 * (1 - v));

  return (
    <motion.div data-motion="scroll" style={{ opacity: e, y }}>
      {children}
    </motion.div>
  );
}
