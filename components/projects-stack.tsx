'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useTransform, type MotionValue } from 'motion/react';
import { projects, type Project } from '@/content/projects';
import { proyectosHeader } from '@/content/site';
import { stagger, useEnterProgress } from '@/lib/scroll';
import { GlobeIcon } from './globe-icon';

const SURFACES = ['#F2F0EB', '#E9EDF1', '#F4F1EC'];

export function ProjectsStack() {
  return (
    <section id="proyectos" className="relative bg-page pb-[14vh] max-md:px-6 max-md:pb-16">
      <ProjectsHeader />
      <div className="mx-auto max-w-[1180px]">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project: p, index }: { project: Project; index: number }) {
  return (
    <article className="relative md:sticky md:top-0 md:flex md:min-h-[100svh] md:items-center md:py-[9vh]" style={{ zIndex: index + 1 }}>
      <div className="w-full border-t border-ink/15 pt-5 max-md:border-t-0 md:rounded-[4px] md:border-0 md:bg-[var(--surface)] md:p-8 md:shadow-[0_18px_60px_rgba(31,27,22,0.08)]" style={{ '--surface': SURFACES[index] } as React.CSSProperties}>
        <MobileProjectCard project={p} />
        <DesktopProjectCard project={p} index={index} />
      </div>
    </article>
  );
}

function MobileProjectCard({ project: p }: { project: Project }) {
  return (
    <div className="md:hidden">
      <div className="relative overflow-hidden rounded-[4px] border border-ink/30 bg-white p-2">
        <Shot project={p} />
        <span className="absolute left-5 top-5 inline-flex min-h-8 items-center rounded-full bg-page px-4 font-mono text-[11px] font-bold tracking-[0.08em] text-ink">
          {p.year}
        </span>
        <Globo project={p} size={18} plain className="absolute right-5 top-5 size-11 shadow-[0_2px_10px_rgba(31,27,22,0.12)]" />
      </div>

      <div className="mt-7">
        <div className="flex items-start justify-between gap-5">
          <h3 className="m-0 font-extrabold uppercase tracking-[-0.07em]" style={{ fontSize: 'clamp(38px,11vw,58px)', lineHeight: 0.82 }}>{p.title}</h3>
          <span className="pt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">{p.n} / {String(projects.length).padStart(2, '0')}</span>
        </div>
        <p className="m-0 mt-5 max-w-[430px] text-[18px] leading-[1.28] tracking-[-0.025em] text-body">{p.teaser}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {p.teaserTags.slice(0, 2).map((tag) => (
            <span key={tag} className="rounded-[4px] border border-ink/15 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-mute">{tag}</span>
          ))}
        </div>
        <AbrirCaso project={p} className="mt-6 text-[20px]" />
      </div>
    </div>
  );
}

function DesktopProjectCard({ project: p, index }: { project: Project; index: number }) {
  return (
    <div className="hidden md:block">
      <div className="flex items-start justify-between gap-6">
        <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: p.cardLabelInk }}>
          <span className="inline-flex min-h-7 min-w-8 items-center justify-center px-2 text-white" style={{ background: p.accent }}>{p.n}</span>
          <span>{p.kind}</span>
        </div>
        <span className="font-mono text-[11px] text-ink-mute">{p.year}</span>
      </div>

      <div className="mt-8 grid items-end gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14">
        <div className="order-2 lg:order-1">
          <h3 className="m-0 font-extrabold uppercase tracking-[-0.07em]" style={{ fontSize: 'clamp(46px,7vw,104px)', lineHeight: 0.82 }}>{p.title}</h3>
          <p className="m-0 mt-8 max-w-[380px] text-[clamp(17px,1.7vw,23px)] leading-[1.18] tracking-[-0.025em]" style={{ color: p.cardTeaserInk }}>{p.teaser}</p>
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: p.cardLabelInk }}>
            {p.teaserTags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <AbrirCaso project={p} />
            <Globo project={p} size={19} className="size-11" />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <Shot project={p} />
          <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">
            <span>{String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
            <span>ver proyecto ↗</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectsHeader() {
  const ref = useRef<HTMLElement>(null);
  const enter = useEnterProgress(ref);

  return (
    <header ref={ref} className="mx-auto w-full max-w-[1180px] px-10 pb-[8vh] pt-[13vh] max-md:px-0 max-md:pb-12 max-md:pt-16">
      <Reveal p={enter} i={0}><div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-mute">{proyectosHeader.eyebrow}</div></Reveal>
      <Reveal p={enter} i={1}><h2 className="m-0 mt-5 max-w-[850px] font-extrabold uppercase tracking-[-0.07em]" style={{ fontSize: 'clamp(48px,9vw,132px)', lineHeight: 0.82 }}>{proyectosHeader.title}</h2></Reveal>
      <Reveal p={enter} i={2}>
        <div className="mt-8 flex flex-col justify-between gap-5 pt-5 md:flex-row md:items-start">
          <p className="m-0 max-w-[480px] text-[clamp(17px,1.7vw,23px)] leading-[1.18] tracking-[-0.025em] text-body">{proyectosHeader.lede}</p>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-mute">{String(projects.length).padStart(2, '0')} piezas / en producción</span>
        </div>
      </Reveal>
    </header>
  );
}

function Reveal({ p, i, children }: { p: MotionValue<number>; i: number; children: React.ReactNode }) {
  const e = useTransform(p, (v) => stagger(v, i, 0.12, 0.3));
  const y = useTransform(e, (v) => 26 * (1 - v));
  return <motion.div data-motion="scroll" style={{ opacity: e, y }}>{children}</motion.div>;
}

function Shot({ project: p }: { project: Project }) {
  return (
    <div className="relative overflow-hidden rounded-[4px]" style={{ aspectRatio: `${p.cardShot.w} / ${p.cardShot.h}`, background: p.cardShotBg }}>
      <Image src={p.cardShot.src} alt={p.cardShot.alt} fill sizes="(max-width: 768px) 92vw, 760px" className="object-cover transition-transform duration-700 ease-[var(--ease-ui)] hover:scale-[1.025]" />
    </div>
  );
}

function AbrirCaso({ project: p, className = '' }: { project: Project; className?: string }) {
  return <Link href={`/proyectos/${p.id}`} className={`inline-flex min-h-11 items-center border-b-[3px] font-bold tracking-[-0.03em] transition-opacity duration-200 hover:opacity-60 ${className}`} style={{ color: p.accent, borderBottomColor: p.accent }}>abrir caso →</Link>;
}

function Globo({ project: p, size, className, plain = false }: { project: Project; size: number; className: string; plain?: boolean }) {
  return <a href={p.href} {...(p.hrefExterno ? { target: '_blank', rel: 'noopener noreferrer' } : {})} aria-label={`Ver sitio de ${p.title}`} title="ver sitio" className={`inline-flex shrink-0 items-center justify-center rounded-full transition-transform duration-200 ease-[var(--ease-ui)] hover:scale-[1.06] ${className}`} style={{ background: plain ? 'var(--color-page)' : p.globeBg, color: plain ? 'var(--color-ink)' : p.globeInk }}><GlobeIcon size={size} /></a>;
}
