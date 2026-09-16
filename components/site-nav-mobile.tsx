'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { aboutContent } from '@/content/site';
import { CopyEmailButton } from './copy-email-button';

gsap.registerPlugin(useGSAP);

export type NavDestino = { label: string; href: string };

/**
 * Menú de móvil. El panel va en un portal a `body` y no dentro de la banda del
 * header: esa banda tiene `z-index`, o sea que crea contexto de apilamiento, y
 * cualquier hijo suyo quedaría atrapado por debajo del resto del sitio por más
 * `z` que se le ponga.
 *
 * El panel sólo existe en el DOM mientras está abierto. Al cerrar no se
 * desmonta de inmediato: se rebobina la línea de tiempo y se desmonta en
 * `onReverseComplete`, que es lo que da la salida sin duplicar animaciones.
 */
export function SiteNavMobile({
  home,
  links,
  ink,
}: {
  home: string;
  links: NavDestino[];
  ink: string;
}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  const close = () => {
    const tl = timeline.current;
    if (!tl) {
      setOpen(false);
      return;
    }
    /* Se cierra más rápido de lo que se abre: al salir nadie está leyendo. */
    tl.eventCallback('onReverseComplete', () => setOpen(false));
    tl.timeScale(1.6).reverse();
  };

  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!open || !panel) return;

      /* Sin animación no hay rebobinado que esperar: `timeline` se queda en
         null y `close()` desmonta en seco. */
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      timeline.current = gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .fromTo(
          panel,
          { xPercent: 100 },
          { xPercent: 0, duration: 0.42, ease: 'power4.out' },
        )
        .from('[data-nav-chrome]', { opacity: 0, duration: 0.3, stagger: 0.045 }, '-=0.2')
        // Los destinos suben desde detrás del recorte de su `<li>`, como el
        // resto de los titulares del sitio.
        .from('[data-nav-item]', { yPercent: 115, duration: 0.45, stagger: 0.055 }, '<')
        .from(
          '[data-nav-tail]',
          { opacity: 0, y: 18, duration: 0.38, stagger: 0.05 },
          '-=0.26',
        );

      return () => {
        timeline.current = null;
      };
    },
    { scope: panelRef, dependencies: [open] },
  );

  /* Mientras el menú tapa la pantalla, el fondo no debe poder desplazarse. */
  useEffect(() => {
    if (!open) return;

    const { body } = document;
    const previous = body.style.overflow;
    body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);

    closeRef.current?.focus();
    const opener = openerRef.current;
    return () => {
      body.style.overflow = previous;
      document.removeEventListener('keydown', onKeyDown);
      opener?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={openerRef}
        type="button"
        aria-label="Abrir menú"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(true)}
        className="-mr-2 ml-auto grid size-11 place-items-center md:hidden"
        style={{ color: ink }}
      >
        <span aria-hidden="true" className="flex w-[22px] flex-col gap-[6px]">
          <span className="h-[2px] w-full bg-current" />
          <span className="h-[2px] w-full bg-current" />
        </span>
      </button>

      {open
        ? createPortal(
            <div
              ref={panelRef}
              id={panelId}
              role="dialog"
              aria-modal="true"
              aria-label="Menú"
              className="mobile-nav-panel fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-black px-6 font-sans text-white md:hidden"
            >
              <div className="relative z-10 flex shrink-0 items-center justify-between text-[22px] font-extrabold tracking-[-0.055em]">
                <Link data-nav-chrome href={home} onClick={close} className="inline-flex min-h-11 items-center focus-visible:outline-2 focus-visible:outline-offset-4">
                  tiagogoco
                </Link>
                <button data-nav-chrome ref={closeRef} type="button" onClick={close} className="min-h-11 focus-visible:outline-2 focus-visible:outline-offset-4">
                  cerrar
                </button>
              </div>

              <div className="mobile-nav-content relative z-10 flex flex-1 flex-col items-center justify-center">
                <nav aria-label="Navegación principal" className="w-full shrink-0">
                  <ul className="m-0 list-none p-0">
                    {links.map((link) => (
                      <li key={link.href} className="overflow-hidden">
                        <Link
                          data-nav-item
                          href={link.href}
                          onClick={close}
                          className="block text-center text-[clamp(34px,10.5vw,46px)] font-extrabold uppercase leading-[1.2] tracking-[-0.045em]"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div data-nav-tail className="mobile-nav-portrait w-[64%] max-w-[230px] shrink-0">
                  <Image
                    src={aboutContent.portrait.src}
                    alt=""
                    width={1024}
                    height={768}
                    sizes="(max-width: 407px) calc(64vw - 30.72px), 230px"
                    className="aspect-4/3 w-full rounded-[20px] object-cover ring-1 ring-white/10"
                  />
                </div>

                <div className="flex w-full max-w-[224px] shrink-0 flex-col gap-3">
                  <div data-nav-tail>
                    <CopyEmailButton pill className="mobile-nav-action" style={{ background: 'rgba(255,255,255,0.09)' }} />
                  </div>

                  <Link
                    data-nav-tail
                    href="/cv"
                    onClick={close}
                    className="mobile-nav-action site-link-pill inline-flex items-center gap-3 rounded-full font-mono uppercase tracking-[0.04em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    <span>Descarga mi CV</span>
                    <DocIcon />
                  </Link>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

/** `bxs-file-doc` exportado del frame; el `viewBox` es el del asset. */
function DocIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 500 500"
      className="size-[26px] shrink-0"
      fill="currentColor"
    >
      <path d="M253.875 303.167C241.021 303.167 233.521 315.396 233.521 331.771C233.521 348.25 241.25 359.896 254 359.896C266.854 359.896 274.229 347.646 274.229 331.271C274.229 316.146 266.979 303.167 253.875 303.167Z" />
      <path d="M291.667 41.6667H125C113.949 41.6667 103.351 46.0565 95.5372 53.8705C87.7232 61.6846 83.3333 72.2826 83.3333 83.3333V416.667C83.3333 427.717 87.7232 438.315 95.5372 446.129C103.351 453.943 113.949 458.333 125 458.333H375C386.051 458.333 396.649 453.943 404.463 446.129C412.277 438.315 416.667 427.717 416.667 416.667V166.667L291.667 41.6667ZM190.729 363.625C181.854 371 168.375 374.479 151.896 374.479C142 374.479 135.021 373.854 130.271 373.229V290.5C138.791 289.273 147.392 288.695 156 288.771C172 288.771 182.375 291.646 190.479 297.771C199.229 304.271 204.729 314.646 204.729 329.479C204.729 345.625 198.854 356.75 190.729 363.625ZM253.021 375C228.021 375 213.417 356.125 213.417 332.125C213.417 306.896 229.521 288.042 254.396 288.042C280.25 288.042 294.375 307.396 294.375 330.646C294.354 358.25 277.604 375 253.021 375ZM350 359.125C355.729 359.125 362.104 357.854 365.875 356.375L368.75 371.229C365.25 372.979 357.375 374.854 347.146 374.854C318.042 374.854 303.042 356.75 303.042 332.75C303.042 304.021 323.521 288.042 349.021 288.042C358.896 288.042 366.375 290.042 369.75 291.792L365.875 306.917C360.803 304.82 355.363 303.758 349.875 303.792C334.75 303.792 323 312.917 323 331.667C323 348.521 333 359.125 350 359.125ZM291.667 187.5H270.833V83.3333L375 187.5H291.667Z" />
      <path d="M158 303.396C153.771 303.396 151.021 303.771 149.396 304.146V359.25C151.021 359.625 153.646 359.625 156 359.625C173.25 359.75 184.479 350.271 184.479 330.146C184.604 312.646 174.375 303.396 158 303.396Z" />
    </svg>
  );
}
