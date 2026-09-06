'use client';

import Image from 'next/image';
import { projects, type Project } from '@/content/projects';
import { GlobeIcon } from './globe-icon';

/** §5.3 — tres tarjetas sticky que se apilan solas. Sin animación por scroll. */
const LAYERS = [
  { paddingTop: '8vh', zIndex: 1, shadow: '0 -18px 60px rgba(31,27,22,0.10), 0 40px 90px rgba(31,27,22,0.14)' },
  { paddingTop: '12vh', zIndex: 2, shadow: '0 -18px 60px rgba(31,27,22,0.10), 0 40px 90px rgba(31,27,22,0.16)' },
  { paddingTop: '16vh', zIndex: 3, shadow: '0 -18px 60px rgba(31,27,22,0.10), 0 40px 90px rgba(31,27,22,0.18)' },
];

export function ProjectsStack({ onOpen }: { onOpen: (index: number) => void }) {
  return (
    <section id="proyectos" className="relative bg-page pb-[12vh]">
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
      className="sticky top-0 flex h-[145vh] items-start justify-center px-10 max-md:px-4"
      style={{ paddingTop: layer.paddingTop, zIndex: layer.zIndex }}
    >
      <div className="relative w-full max-w-[1100px]">
        <div
          className="h-[46px] w-[268px] rounded-[14px_26px_0_0] shadow-[0_-1px_0_rgba(0,0,0,0.03)]"
          style={{ background: p.cardBg }}
        />
        <div
          className="-mt-px rounded-[0_22px_22px_22px] px-10 pt-[34px] pb-10 max-md:px-6 max-md:pb-7"
          style={{ background: p.cardBg, boxShadow: layer.shadow }}
        >
          <div
            className="absolute left-8 top-3 font-mono text-xs uppercase tracking-[0.18em]"
            style={{ color: p.cardLabelInk }}
          >
            proyecto {p.n}
          </div>

          <div className="flex items-start justify-between gap-6">
            <h2 className="m-0 font-extrabold tracking-[-0.03em] text-[clamp(30px,8vw,44px)]">{p.title}</h2>
            <a
              href={p.href}
              {...(p.hrefExterno ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              aria-label={`Ver sitio de ${p.title}`}
              title="ver sitio"
              className="group inline-flex size-[46px] shrink-0 items-center justify-center rounded-full transition-transform duration-200 ease-[var(--ease-ui)] hover:scale-[1.06]"
              style={{ background: p.globeBg, color: p.globeInk }}
            >
              <GlobeIcon />
            </a>
          </div>

          <div className="mt-[30px] grid grid-cols-[300px_1fr] items-start gap-10 max-lg:grid-cols-1">
            <div>
              <p
                className="m-0 text-xl leading-[1.35]"
                style={{ color: p.cardTeaserInk, textWrap: 'pretty' }}
              >
                {p.teaser}
              </p>

              <div className="mt-[34px] flex flex-wrap gap-2.5">
                {p.teaserTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-[10px] border bg-white/35 px-[18px] py-2.5 text-[13px] font-bold uppercase tracking-[0.06em]"
                    style={{ borderColor: p.cardChipBorder, color: p.cardChipInk }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={onOpen}
                className="mt-[26px] cursor-pointer border-0 bg-transparent p-0 text-[26px] font-bold tracking-[-0.03em] transition-opacity duration-200 hover:opacity-60"
                style={{ color: p.accent, borderBottom: `3px solid ${p.accent}` }}
              >
                abrir caso →
              </button>
            </div>

            <div
              className="relative aspect-video overflow-hidden rounded-[14px]"
              style={{ background: p.cardShotBg }}
            >
              <Image
                src={p.cardShot.src}
                alt={p.cardShot.alt}
                fill
                sizes="(max-width: 1024px) 90vw, 720px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
