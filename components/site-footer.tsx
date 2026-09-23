'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { socials } from '@/content/site';
import { useReducedMotion } from '@/lib/scroll';
import { CopyEmailButton } from './copy-email-button';

gsap.registerPlugin(SplitText, useGSAP);

/** Contacto se descubre debajo de Sobre mí, con un recorrido más lento. */
export function SiteFooter() {
  const ref = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });
  // El marco avanza con la página; su contenido recorre solo el 35%.
  // El progreso se mide en el footer sin transformar para evitar realimentación.
  const y = useTransform(scrollYProgress, [0, 1], ['-65%', '0%']);

  useGSAP(() => {
    const title = titleRef.current;
    const footer = ref.current;
    if (reducedMotion || !title || !footer) return;

    let revealed = false;
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

    // La posición cambia con Motion: esperamos a que el título salga de la
    // cubierta, además de entrar en pantalla, antes de animar sus letras.
    const revealWhenUncovered = () => {
      const bounds = title.getBoundingClientRect();
      const coverBottom = document.getElementById('sobre-mi')?.getBoundingClientRect().bottom
        ?? footer.getBoundingClientRect().top;
      if (!entrance || bounds.top < coverBottom || bounds.top > window.innerHeight * 0.9) return;
      revealed = true;
      entrance.play();
      gsap.ticker.remove(revealWhenUncovered);
    };
    gsap.ticker.add(revealWhenUncovered);
    return () => gsap.ticker.remove(revealWhenUncovered);
  }, { scope: ref, dependencies: [reducedMotion], revertOnUpdate: true });

  return (
    <footer
      id="contacto"
      data-skin="dark"
      ref={ref}
      className="site-footer"
      onFocusCapture={() => {
        // Un enlace alcanzado con Tab debe quedar completamente descubierto.
        if (scrollYProgress.get() < 1) {
          ref.current?.scrollIntoView({ block: 'start', behavior: 'instant' });
        }
      }}
    >

      <motion.div
        style={{ y: reducedMotion ? 0 : y }}
        className="contact-reveal-content mx-auto flex max-w-[1440px] flex-col justify-center px-[clamp(24px,5vw,72px)] pb-[clamp(48px,8vh,110px)] md:flex-row md:items-center md:justify-between md:gap-12"
      >
        <h2
          ref={titleRef}
          className="m-0 whitespace-nowrap font-sans text-[clamp(50px,16vw,112px)] font-extrabold leading-[0.72] tracking-[-0.09em] md:text-[clamp(78px,10vw,180px)]"
        >
          HABLEMOS
        </h2>

        <div className="mx-auto mt-[clamp(40px,6vh,72px)] flex flex-col items-center md:mx-0 md:mt-0 md:items-end">
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

          {/* Fuera del nav de redes a propósito: es una página propia, no un
              perfil externo, y meterla ahí volvería falso su `aria-label`.
              La mono de 10px contra la serif de las redes ya lo separa sin
              necesidad de una regla. */}
          <p className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">
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
      </motion.div>
    </footer>
  );
}
