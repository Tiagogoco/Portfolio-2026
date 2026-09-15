'use client';

import { useRef } from 'react';
import { socials } from '@/content/site';
import { useScrollReveal } from '@/lib/use-scroll-reveal';
import { CopyEmailButton } from './copy-email-button';

/** Cierre editorial claro: contacto, redes y una última señal de disponibilidad. */
export function SiteFooter() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <footer
      id="contacto"
      data-skin="dark"
      ref={ref}
      className="site-footer relative min-h-[38svh] overflow-hidden md:min-h-[46svh]"
    >

      <div className="mx-auto flex min-h-[38svh] max-w-[1440px] flex-col justify-end px-[clamp(24px,5vw,72px)] pb-[clamp(34px,6vh,90px)] pt-[clamp(48px,9vh,190px)] md:min-h-[46svh] md:flex-row md:items-center md:justify-between md:gap-12">
        <h2
          data-reveal="text-chars"
          className="m-0 whitespace-nowrap font-sans text-[clamp(50px,16vw,112px)] font-extrabold leading-[0.72] tracking-[-0.09em] md:text-[clamp(78px,10vw,180px)]"
        >
          HABLEMOS
        </h2>

        <div data-reveal="copy" className="mx-auto mt-[clamp(40px,6vh,72px)] flex flex-col items-center md:mx-0 md:mt-0 md:items-end">
          <CopyEmailButton pill className="site-footer-pill px-6 py-4 text-[11px] md:px-7 md:py-5 md:text-[12px]" />

          <nav aria-label="Redes sociales" className="mt-6 flex flex-wrap justify-center gap-x-7 gap-y-3 md:justify-end">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif text-[clamp(18px,2vw,28px)] tracking-[-0.04em] transition-opacity hover:opacity-55"
              >
                {social.label.charAt(0) + social.label.slice(1).toLowerCase()}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
