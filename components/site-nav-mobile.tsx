'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { CopyEmailButton } from './copy-email-button';

export type NavDestino = { label: string; href: string };

/**
 * Menú de móvil. El panel va en un portal a `body` y no dentro de la banda del
 * header: esa banda tiene `z-index`, o sea que crea contexto de apilamiento, y
 * cualquier hijo suyo quedaría atrapado por debajo del resto del sitio por más
 * `z` que se le ponga.
 *
 * El panel sólo existe en el DOM mientras está abierto. Al cerrar espera la
 * transición CSS breve antes de desmontarse.
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
  const [closing, setClosing] = useState(false);
  const openerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  const close = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOpen(false);
      setClosing(false);
      return;
    }
    setClosing(true);
  };

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
        onClick={() => {
          setClosing(false);
          setOpen(true);
        }}
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
              id={panelId}
              role="dialog"
              aria-modal="true"
              aria-label="Menú"
              data-closing={closing ? '' : undefined}
              onAnimationEnd={(event) => {
                if (event.target !== event.currentTarget || !closing) return;
                setOpen(false);
                setClosing(false);
              }}
              className="mobile-nav-panel fixed inset-0 z-[70] flex min-h-svh flex-col overflow-y-auto bg-black px-6 text-white md:hidden"
            >
              <div className="relative z-10 flex shrink-0 items-center justify-between">
                <Link
                  href={home}
                  onClick={close}
                  className="inline-flex min-h-11 items-center font-sans text-[17px] font-extrabold tracking-[-0.055em] focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  TIAGOGOCO
                </Link>
                <button
                  ref={closeRef}
                  type="button"
                  aria-label="Cerrar menú"
                  onClick={close}
                  className="mobile-nav-close relative grid size-12 place-items-center focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  <span aria-hidden="true" className="absolute h-px w-9 rotate-45 bg-current" />
                  <span aria-hidden="true" className="absolute h-px w-9 -rotate-45 bg-current" />
                </button>
              </div>

              <div className="mobile-nav-content relative z-10 flex flex-1 flex-col justify-between">
                <nav aria-label="Navegación principal" className="w-full">
                  <ul className="m-0 flex list-none flex-col p-0">
                    {[...links, { label: 'CV', href: '/cv' }].map((link, index) => (
                      <li key={link.href} className="mobile-nav-row overflow-hidden">
                        <span aria-hidden="true" className="mobile-nav-index">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <Link
                          href={link.href}
                          onClick={close}
                          className="mobile-nav-link font-serif focus-visible:outline-2 focus-visible:outline-offset-4"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="mobile-nav-footer">
                  <CopyEmailButton className="mobile-nav-email" />
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
