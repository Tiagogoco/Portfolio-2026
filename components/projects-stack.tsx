'use client';

import { useRef, useState } from 'react';
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
  const ref = useRef<HTMLElement>(null);
  const enter = useEnterProgress(ref);
  const reveal = useTransform(enter, (value) => stagger(value, 0, 0, 0.34));
  const y = useTransform(reveal, (value) => 30 * (1 - value));

  return (
    <article ref={ref} className="relative mb-[10px] md:mb-0 md:py-[clamp(48px,7vw,104px)]" style={{ zIndex: index + 1 }}>
      <div
        className="w-full"
        style={{ '--surface': SURFACES[index] } as React.CSSProperties}
      >
        <motion.div
          data-motion="project-card"
          className="w-full border-t border-ink/15 pt-5 max-md:border-t-0 md:mx-auto md:max-w-[1020px] md:bg-transparent md:p-0 md:shadow-none"
          style={{ opacity: reveal, y }}
        >
          <MobileProjectCard project={p} />
          <DesktopProjectCard project={p} />
        </motion.div>
      </div>
    </article>
  );
}

function MobileProjectCard({ project: p }: { project: Project }) {
  return (
    <div className="md:hidden">
      <div className="relative overflow-hidden rounded-[4px] bg-white">
        <CardMedia project={p} showGlobe />
      </div>

      <div className="mt-7">
        <div className="flex items-start justify-between gap-5">
          <h3 className="m-0 font-extrabold text-[clamp(38px,11vw,58px)] uppercase tracking-[-0.07em]" style={{ lineHeight: 0.82 }}><Link href={`/proyectos/${p.id}`} scroll={false} className="transition-opacity hover:opacity-65 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">{p.title}</Link></h3>
          <span className="pt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">{p.n} / {String(projects.length).padStart(2, '0')}</span>
        </div>
        <p className="m-0 mt-5 max-w-[430px] text-[18px] leading-[1.28] tracking-[-0.025em] text-body">{p.teaser}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {p.teaserTags.slice(0, 2).map((tag) => (
            <span key={tag} className="rounded-[4px] border border-ink/15 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-mute">{tag}</span>
          ))}
          <span className="rounded-[4px] border border-ink/15 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-ink-mute">{p.year}</span>
        </div>
      </div>
    </div>
  );
}

function DesktopProjectCard({ project: p }: { project: Project }) {
  return (
    <div className="hidden md:block">
      <div className="mt-8">
          <CardMedia project={p} showGlobe />
        <div className="mt-6 flex items-start justify-between gap-8">
          <div className="min-w-0">
            <h3 className="m-0 font-extrabold text-[clamp(46px,5vw,82px)] uppercase leading-[0.82] tracking-[-0.07em]"><Link href={`/proyectos/${p.id}`} scroll={false} className="transition-opacity hover:opacity-65 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">{p.title}</Link></h3>
            <p className="m-0 mt-5 max-w-[560px] text-[clamp(17px,1.7vw,23px)] leading-[1.18] tracking-[-0.025em]" style={{ color: p.cardTeaserInk }}>{p.teaser}</p>
          </div>
          <div className="flex shrink-0 flex-wrap justify-end gap-x-5 gap-y-2 pt-1 font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: p.cardLabelInk }}>
            {p.teaserTags.map((tag) => <span key={tag} className="rounded-[4px] border border-ink/15 px-3 py-2">{tag}</span>)}
            <span className="rounded-[4px] border border-ink/15 px-3 py-2 font-bold">{p.year}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardMedia({ project: p, showGlobe = false }: { project: Project; showGlobe?: boolean }) {
  return (
    <div className="relative">
      <Link href={`/proyectos/${p.id}`} scroll={false} aria-label={`Abrir proyecto ${p.title}`} className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
        <Shot project={p} />
      </Link>
      <div className="pointer-events-none absolute inset-x-5 top-5 flex items-start justify-between gap-3">
        <Link href={`/proyectos/${p.id}`} scroll={false} className="pointer-events-auto inline-flex min-h-10 items-center rounded-full bg-page px-4 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-ink shadow-[0_2px_10px_rgba(31,27,22,0.12)] transition-transform hover:scale-[1.04]">
          ver <span aria-hidden className="ml-2 text-[14px]">↗</span>
        </Link>
        <div className="flex items-center gap-3">
          {showGlobe && <Globo project={p} size={18} plain className="size-11 shadow-[0_2px_10px_rgba(31,27,22,0.12)]" />}
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
      <Reveal p={enter} i={1}><h2 className="m-0 mt-5 max-w-[1000px] font-extrabold text-[clamp(48px,9vw,132px)] uppercase tracking-[-0.07em] md:text-[clamp(52px,6vw,92px)]" style={{ lineHeight: 0.82 }}>{proyectosHeader.title}</h2></Reveal>
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
  const [videoFailed, setVideoFailed] = useState(false);
  const video = p.id === 'rankeo'
    ? '/video/rankeo-landing.mp4'
    : p.id === 'saint'
      ? '/video/saint-padel-landing.mp4'
      : p.id === 'piri'
        ? '/video/piri-desktop.mp4'
        : undefined;

  return (
    <div className="relative overflow-hidden rounded-[4px] md:rounded-[16px]" style={{ aspectRatio: `${p.cardShot.w} / ${p.cardShot.h}`, background: p.cardShotBg }}>
      {video && !videoFailed ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={p.cardShot.src}
          onError={() => setVideoFailed(true)}
          className="size-full object-cover transition-transform duration-700 ease-[var(--ease-ui)] hover:scale-[1.025]"
        >
          <source src={video} type="video/mp4" />
        </video>
      ) : (
        <Image src={p.cardShot.src} alt={p.cardShot.alt} fill sizes="(max-width: 768px) 92vw, 760px" className="object-cover transition-transform duration-700 ease-[var(--ease-ui)] hover:scale-[1.025]" />
      )}
    </div>
  );
}

function Globo({ project: p, size, className, plain = false }: { project: Project; size: number; className: string; plain?: boolean }) {
  return <a href={p.href} {...(p.hrefExterno ? { target: '_blank', rel: 'noopener noreferrer' } : {})} aria-label={`Ver sitio de ${p.title}`} title="ver sitio" className={`pointer-events-auto inline-flex shrink-0 items-center justify-center rounded-full transition-transform duration-200 ease-[var(--ease-ui)] hover:scale-[1.06] ${className}`} style={{ background: plain ? 'var(--color-page)' : p.globeBg, color: plain ? 'var(--color-ink)' : p.globeInk }}><GlobeIcon size={size} /></a>;
}
