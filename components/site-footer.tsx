'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { socials } from '@/content/site';
import { useReducedMotion } from '@/lib/scroll';
import { CopyEmailButton } from './copy-email-button';

gsap.registerPlugin(SplitText, useGSAP);

/** Contacto permanece fijo mientras Sobre mí lo descubre al subir. */
export function SiteFooter() {
  const ref = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const footer = ref.current;
    const content = contentRef.current;
    if (!footer || !content || reducedMotion) return;

    // Reservamos el alto real del contenido; no hay cálculos durante el scroll.
    // Si no cabe en la pantalla, vuelve al flujo para poder leerlo completo.
    const measure = () => {
      const height = content.offsetHeight;
      const fits = height <= document.documentElement.clientHeight - 76;
      footer.toggleAttribute('data-fixed-reveal', fits);
      footer.style.height = fits ? `${height}px` : '';
    };
    const observer = new ResizeObserver(measure);
    observer.observe(content);
    window.addEventListener('resize', measure);
    measure();
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
      footer.removeAttribute('data-fixed-reveal');
      footer.style.removeProperty('height');
    };
  }, [reducedMotion]);

  useGSAP(() => {
    const title = titleRef.current;
    const footer = ref.current;
    const content = contentRef.current;
    const cover = document.getElementById('sobre-mi');
    if (reducedMotion || !title || !footer || !content || !cover) return;

    let revealed = false;
    let triggerY = Infinity;
    let entrance: gsap.core.Tween | undefined;
    SplitText.create(title, {
      type: 'words,chars',
      autoSplit: true,
      aria: 'auto',
      onSplit(split) {
        if (revealed) return;
        entrance = gsap.from(split.chars, {
          yPercent: 35,
          opacity: 0,
          duration: window.matchMedia('(min-width: 768px)').matches ? 0.8 : 0.65,
          stagger: 0.09,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
          paused: true,
        });
        return entrance;
      },
    });

    const reveal = () => {
      if (revealed || !entrance || window.scrollY < triggerY) return;
      revealed = true;
      entrance.play();
      window.removeEventListener('scroll', reveal);
    };
    // El título está fijo: calculamos una vez dónde la cubierta lo descubre.
    // Durante el scroll solo comparamos números, sin medir el DOM por frame.
    const measure = () => {
      if (revealed) return;
      const top = title.getBoundingClientRect().top;
      triggerY = footer.hasAttribute('data-fixed-reveal')
        ? window.scrollY + cover.getBoundingClientRect().bottom - top
        : window.scrollY + top - document.documentElement.clientHeight * 0.9;
      reveal();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(content);
    observer.observe(title);
    window.addEventListener('scroll', reveal, { passive: true });
    window.addEventListener('resize', measure);
    // Espera a que el efecto de layout del footer active su posición fija.
    const frame = requestAnimationFrame(measure);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', reveal);
      window.removeEventListener('resize', measure);
    };
  }, { scope: ref, dependencies: [reducedMotion], revertOnUpdate: true });

  return (
    <footer
      id="contacto"
      data-skin="dark"
      ref={ref}
      className="site-footer"
      onFocusCapture={(event) => {
        // Un enlace alcanzado con Tab debe quedar completamente descubierto.
        if (ref.current?.hasAttribute('data-fixed-reveal')) {
          ref.current.scrollIntoView({ block: 'start', behavior: 'instant' });
        } else {
          event.target.scrollIntoView({ block: 'nearest', behavior: 'instant' });
        }
      }}
    >

      <div
        ref={contentRef}
        className="contact-reveal-content mx-auto flex max-w-[1440px] flex-col justify-center px-[clamp(24px,5vw,72px)] pb-[clamp(48px,8vh,110px)] md:flex-row md:items-center md:justify-between md:gap-12"
      >
        <h2
          ref={titleRef}
          className="m-0 whitespace-nowrap font-sans text-[clamp(50px,16vw,112px)] font-extrabold leading-[0.72] tracking-[-0.09em] md:text-[clamp(78px,10vw,180px)]"
        >
          HABLEMOS
        </h2>

        <div className="mx-auto mt-7 flex flex-col items-center md:mx-0 md:mt-0 md:items-end">
          <CopyEmailButton pill className="site-footer-pill px-6 py-4 text-[11px] md:px-7 md:py-5 md:text-[12px]" />

          <nav aria-label="Redes sociales" className="mt-4 flex flex-wrap justify-center gap-x-7 gap-y-3 md:mt-6 md:justify-end">
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

          {/* Fuera del nav de redes a propósito: es una página propia, no un
              perfil externo, y meterla ahí volvería falso su `aria-label`.
              La mono de 10px contra la serif de las redes ya lo separa sin
              necesidad de una regla. */}
          <p className="mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/50 md:mt-6">
            <span>Currículum</span>
            <Link
              href="/cv"
              aria-label="Currículum en español"
              className="transition-colors hover:text-white"
            >
              ES
            </Link>
            <span aria-hidden="true" className="text-white/30">
              /
            </span>
            <Link
              href="/cv/en"
              hrefLang="en"
              aria-label="Résumé in English"
              className="transition-colors hover:text-white"
            >
              EN
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
