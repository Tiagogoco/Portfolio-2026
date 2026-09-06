'use client';

import { useRef } from 'react';
import { motion, useTransform } from 'motion/react';
import { EMAIL, socials, ticker } from '@/content/site';
import { useEnterProgress } from '@/lib/scroll';

/** §5.7 — ticker, redes, wordmark y barra gris. */
export function SiteFooter() {
  const ref = useRef<HTMLElement>(null);
  const enter = useEnterProgress(ref);
  const markX = useTransform(enter, (v) => `${(46 * (1 - v)).toFixed(1)}px`);

  const items = [...ticker, ...ticker];

  return (
    <footer id="contacto" ref={ref} className="relative overflow-hidden bg-black text-footer-ink">
      <div aria-hidden className="border-b border-[rgba(242,239,231,0.14)] py-[26px]">
        <div className="marquee flex w-max animate-[marquee_26s_linear_infinite]">
          {items.map((label, i) => (
            <span
              key={`${label}-${i}`}
              className="flex items-center gap-10 whitespace-nowrap pr-10 font-mono text-[13px] uppercase tracking-[0.28em] text-[rgba(242,239,231,0.55)]"
            >
              {label}
              <span className="text-blue">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-[1180px] grid-cols-[minmax(0,1fr)_minmax(0,auto)] items-center gap-12 px-10 max-md:px-6 pt-[clamp(70px,14vh,150px)] pb-[clamp(70px,12vh,130px)] max-md:grid-cols-1">
        <div className="flex flex-col items-start gap-[clamp(6px,1.4vh,16px)]">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-[18px] font-extrabold leading-none tracking-[-0.04em] text-footer-ink transition-[transform,color] duration-300 ease-[var(--ease-ui)] hover:translate-x-[26px] hover:text-blue"
              style={{ fontSize: 'clamp(30px, 5vw, 76px)' }}
            >
              <span
                className="font-mono font-normal tracking-[0.18em] text-[rgba(242,239,231,0.4)]"
                style={{ fontSize: 'clamp(10px, 1vw, 13px)' }}
              >
                {s.n}
              </span>
              {s.label}
            </a>
          ))}
        </div>

        <div className="justify-self-end text-right max-md:justify-self-start max-md:text-left">
          <motion.div
            data-motion="scroll"
            className="font-extrabold tracking-[-0.05em]"
            style={{ fontSize: 'clamp(34px, 6.6vw, 104px)', lineHeight: 0.86, x: markX }}
          >
            TIAGOGOCO
          </motion.div>
          <div className="mt-[18px] font-mono text-[11px] uppercase tracking-[0.22em] text-[rgba(242,239,231,0.45)]">
            © 2026 · portafolio
          </div>
        </div>
      </div>

      <div className="bg-footer-bar text-ink">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-[42px] px-10 max-md:px-6 pt-[34px] pb-[46px]">
          <div
            className="font-bold tracking-[-0.02em] text-[#6b6b6b]"
            style={{ fontSize: 'clamp(18px, 2.2vw, 30px)' }}
          >
            hecho con figma, next.js, tailwind y mucho &lt;3
          </div>
          <a
            href={`mailto:${EMAIL}`}
            className="self-start font-bold tracking-[-0.02em] text-[#0d0d0d] transition-[transform,color] duration-[260ms] ease-[var(--ease-ui)] hover:translate-x-2.5 hover:text-blue"
            style={{ fontSize: 'clamp(18px, 2.2vw, 30px)' }}
          >
            {EMAIL}
          </a>
        </div>
      </div>
    </footer>
  );
}
