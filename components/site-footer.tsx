'use client';

import { useRef } from 'react';
import { motion, useTransform } from 'motion/react';
import { socials, ticker } from '@/content/site';
import { useEnterProgress } from '@/lib/scroll';
import { CopyEmailButton } from './copy-email-button';

/** Cierre editorial claro: contacto, redes y una última señal de disponibilidad. */
export function SiteFooter() {
  const ref = useRef<HTMLElement>(null);
  const enter = useEnterProgress(ref);
  const markX = useTransform(enter, (v) => `${(30 * (1 - v)).toFixed(1)}px`);
  const items = [...ticker, ...ticker];

  return (
    <footer id="contacto" ref={ref} className="relative overflow-hidden border-t border-ink/15 bg-page text-ink">
      <div aria-hidden className="border-b border-ink/15 py-5">
        <div className="marquee flex w-max animate-[marquee_28s_linear_infinite]">
          {items.map((label, i) => (
            <span key={`${label}-${i}`} className="flex items-center gap-9 whitespace-nowrap pr-9 font-mono text-[11px] uppercase tracking-[0.24em] text-ink-mute">
              {label}
              <span className="text-blue">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-[clamp(24px,5vw,72px)] py-[clamp(72px,13vh,150px)]">
        <div className="font-mono text-[clamp(10px,1vw,13px)] uppercase tracking-[0.22em] text-ink-mute">( contacto )</div>

        <motion.h2
          data-motion="scroll"
          className="m-0 mt-[clamp(28px,5vh,68px)] max-w-[1100px] font-extrabold uppercase tracking-[-0.08em]"
          style={{ fontSize: 'clamp(64px, 13vw, 190px)', lineHeight: 0.8, x: markX }}
        >
          HABLEMOS
        </motion.h2>

        <div className="mt-[clamp(70px,11vh,140px)] grid gap-14 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] md:gap-20">
          <p className="m-0 max-w-[360px] text-[clamp(20px,2.1vw,32px)] font-medium leading-[1.08] tracking-[-0.04em]">
            Disponible para construir productos digitales con intención.
          </p>

          <div className="min-w-0">
            <CopyEmailButton pill className="px-6 py-4 text-[11px] md:px-7 md:py-5 md:text-[12px]" />

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute transition-colors hover:text-ink"
                >
                  <span className="mr-2 text-ink/35">{social.n}</span>
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-ink/15 px-[clamp(24px,5vw,72px)] py-5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
        <div className="mx-auto flex max-w-[1440px] flex-wrap justify-between gap-4">
          <span>TIAGOGOCO / PORTFOLIO 2026</span>
          <span>HECHO CON FIGMA, NEXT.JS, TAILWIND Y MUCHO &lt;3</span>
        </div>
      </div>
    </footer>
  );
}
