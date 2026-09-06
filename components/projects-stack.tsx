'use client';

import Image from 'next/image';
import { projects, type Project } from '@/content/projects';
import { GlobeIcon } from './globe-icon';

/**
 * §5.3 — tres tarjetas sticky que se apilan solas. Sin animación por scroll.
 * El apilado sale de tres valores que crecen juntos: padding-top, z-index y la sombra.
 */
const LAYERS = [
  { paddingTop: '8vh', zIndex: 1, shadow: '0 -18px 60px rgba(31,27,22,0.10), 0 40px 90px rgba(31,27,22,0.14)' },
  { paddingTop: '12vh', zIndex: 2, shadow: '0 -18px 60px rgba(31,27,22,0.10), 0 40px 90px rgba(31,27,22,0.16)' },
  { paddingTop: '16vh', zIndex: 3, shadow: '0 -18px 60px rgba(31,27,22,0.10), 0 40px 90px rgba(31,27,22,0.18)' },
];

export function ProjectsStack({ onOpen }: { onOpen: (index: number) => void }) {
  return (
    <section id="proyectos" className="relative bg-page pb-[12vh] max-md:pb-8">
      {projects.map((p, i) => (
        <ProjectCard key={p.id} project={p} layer={LAYERS[i]} onOpen={() => onOpen(i)} />
      ))}
    </section>
  );
}

function ProjectCard({
  project: p,
  layer,
  onOpen,
}: {
  project: Project;
  layer: (typeof LAYERS)[number];
  onOpen: () => void;
}) {
  return (
    <div
      /* En móvil la tarjeta es alta y estrecha: 145vh dejaba ~330px muertos debajo.
         `h-auto` con un mínimo evita el hueco sin arriesgar recortes en pantallas cortas. */
      className="sticky top-0 flex h-[145vh] items-start justify-center px-10 max-md:h-auto max-md:min-h-[102vh] max-md:px-4"
      style={{ paddingTop: layer.paddingTop, zIndex: layer.zIndex }}
    >
      <div className="relative w-full max-w-[1100px]">
        <div
          className="h-[46px] w-[268px] rounded-[14px_26px_0_0] shadow-[0_-1px_0_rgba(0,0,0,0.03)] max-md:w-[200px]"
          style={{ background: p.cardBg }}
        />
        <div
          className="-mt-px rounded-[0_22px_22px_22px] p-10 max-md:p-5 max-md:pt-9"
          style={{ background: p.cardBg, boxShadow: layer.shadow }}
        >
          <div
            className="absolute left-8 top-3 font-mono text-xs uppercase tracking-[0.18em] max-md:left-5"
            style={{ color: p.cardLabelInk }}
          >
            proyecto {p.n}
          </div>

          {/* Imagen dominante, con año y enlace al sitio en vivo encima. */}
          <div
            className="relative aspect-[16/10] overflow-hidden rounded-[14px] md:aspect-video"
            style={{ background: p.cardShotBg }}
          >
            <Image
              src={p.cardShot.src}
              alt={p.cardShot.alt}
              fill
              sizes="(max-width: 768px) 92vw, 1020px"
              className="object-cover"
            />
            <span className="absolute left-4 top-4 rounded-full bg-page px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink">
              {p.year}
            </span>
            <a
              href={p.href}
              {...(p.hrefExterno ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              aria-label={`Ver sitio de ${p.title}`}
              title="ver sitio"
              className="absolute right-4 top-4 inline-flex size-12 items-center justify-center rounded-full bg-page transition-transform duration-200 ease-[var(--ease-ui)] hover:scale-[1.06] max-md:size-11"
              style={{ color: p.accent }}
            >
              <GlobeIcon />
            </a>
          </div>

          {/* Nombre y stack en una sola fila, como en la referencia. */}
          <div className="mt-7 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4 max-md:mt-6">
            <h2 className="m-0 font-extrabold tracking-[-0.03em] text-[clamp(30px,8vw,44px)]">
              {p.title}
            </h2>
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
