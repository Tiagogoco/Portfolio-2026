'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

/**
 * §3 — dos comportamientos independientes:
 * aparición cuando #intro cruza 0.35 × innerHeight, e inversión sobre la sección azul.
 */
export function SiteHeader() {
  const [visible, setVisible] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const intro = document.getElementById('intro');
    const azul = document.getElementById('sobre-mi');
    let raf = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);

      const ir = intro?.getBoundingClientRect();
      const nextVisible = !!ir && ir.top <= window.innerHeight * 0.35;
      setVisible((v) => (v === nextVisible ? v : nextVisible));

      const ar = azul?.getBoundingClientRect();
      const nextDark = !!ar && ar.top <= 46 && ar.bottom > 46;
      setDark((v) => (v === nextDark ? v : nextDark));
    };

    tick();
    return () => cancelAnimationFrame(raf);
  }, []);

  const ink = dark ? '#ffffff' : '#1F1B16';
  const soft = dark ? 'rgba(255,255,255,0.78)' : '#6d675e';

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-40">
      <div
        className="flex items-center gap-6 px-[clamp(20px,3.4vw,46px)] py-[clamp(14px,2.4vh,24px)] font-mono text-[11px] uppercase tracking-[0.14em]"
        style={{
          color: soft,
          opacity: visible ? 1 : 0,
          transform: `translateY(${visible ? '0px' : '-24px'})`,
          pointerEvents: visible ? 'auto' : 'none',
          transition:
            'opacity 420ms ease, transform 480ms cubic-bezier(.2,.7,.2,1), color 380ms ease',
        }}
      >
        <a href="#top" className="flex shrink-0 items-center gap-[9px]" style={{ color: ink }}>
          <Image
            src="/img/perfil/avatar.webp"
            alt=""
            width={24}
            height={24}
            className="size-6 shrink-0 rounded-full object-cover"
            style={{ objectPosition: '36% 30%' }}
          />
          <span>TIAGOGOCO</span>
        </a>

        <nav className="mx-auto flex items-center gap-[clamp(22px,3.4vw,56px)] max-md:hidden">
          <a href="#proyectos" style={{ color: ink }}>
            Proyectos
          </a>
          <a href="#sobre-mi" style={{ color: soft }}>
            Sobre mí
          </a>
        </nav>

        <a href="#contacto" className="shrink-0 max-md:ml-auto" style={{ color: soft }}>
          Contacto
        </a>
      </div>
    </div>
  );
}
