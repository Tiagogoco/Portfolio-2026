"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CopyEmailButton } from './copy-email-button';

/**
 * La banda del header es opaca (si no, con la página compacta el contenido se
 * lee por debajo al pasar), así que tiene que tomar el color de la sección que
 * queda debajo. Cada sección declara el suyo con `data-skin`, en vez de que el
 * header cargue una lista de ids: así el color vive donde vive la sección y
 * agregar o reordenar secciones no obliga a tocar este archivo.
 */
const SKINS = {
  dark: { bg: "#000000", dark: true },
  light: { bg: "#FBFAF8", dark: false },
} as const;

type SkinName = keyof typeof SKINS;

/** Línea de sondeo: el borde inferior de la banda. */
const PROBE = 46;

export function SiteHeader({ standalone = false }: { standalone?: boolean }) {
  const [visible, setVisible] = useState(false);
  /* Arranca en `null`, no en claro: el SSR no sabe qué sección queda debajo y
     pintar un default para corregirlo después daba un fundido de claro a negro
     sobre la portada. Mientras no haya medida, la banda va sin transición. */
  const [skin, setSkin] = useState<(typeof SKINS)[SkinName] | null>(null);

  useEffect(() => {
    /* El `z-index` se lee una sola vez: no cambia, y consultarlo en cada frame
       forzaría un recálculo de estilo por vuelta. */
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-skin]"),
    ).map((el) => ({
      el,
      skin: SKINS[(el.dataset.skin as SkinName) ?? "light"],
      z: Number(getComputedStyle(el).zIndex) || 0,
    }));
    const intro = document.getElementById("intro");
    let raf = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);

      const ir = intro?.getBoundingClientRect();
      const nextVisible = standalone || !intro || (!!ir && ir.top <= window.innerHeight * 0.35);
      setVisible((v) => (v === nextVisible ? v : nextVisible));

      /* Hay una franja donde dos secciones se traslapan: el hero y el footer
         invaden a su vecina con sus esquinas redondeadas. Ahí gana la que se
         pinta encima, o sea la de mayor `z-index` — no sirve quedarse con la
         primera del documento, porque el hero invade hacia abajo y el footer
         hacia arriba. A igualdad, la última, como en el orden de pintado. */
      let bajo: (typeof nodes)[number] | undefined;
      for (const node of nodes) {
        const r = node.el.getBoundingClientRect();
        if (r.top > PROBE || r.bottom <= PROBE) continue;
        if (!bajo || node.z >= bajo.z) bajo = node;
      }
      if (bajo) {
        const next = bajo.skin;
        setSkin((prev) => (prev === next ? prev : next));
      }
    };

    tick();
    return () => cancelAnimationFrame(raf);
  }, [standalone]);

  const { bg, dark } = skin ?? SKINS.light;
  const ink = dark ? "#ffffff" : "#1F1B16";
  const soft = dark ? "rgba(255,255,255,0.7)" : "#6d675e";
  const pillBg = dark ? "#ffffff" : "#111111";
  const pillInk = dark ? "#111111" : "#ffffff";
  const homeLink = standalone ? "/#top" : "#top";
  const projectsLink = standalone ? "/#proyectos" : "#proyectos";
  const aboutLink = standalone ? "/#sobre-mi" : "#sobre-mi";
  const contactLink = standalone ? "/#contacto" : "#contacto";

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-40">
      <div
        className="flex items-center gap-6 px-[clamp(20px,3.4vw,46px)] py-[clamp(14px,2.4vh,24px)] font-sans text-[12px] font-semibold uppercase tracking-[-0.025em]"
        style={{
          background: bg,
          color: soft,
          opacity: visible ? 1 : 0,
          transform: `translateY(${visible ? "0px" : "-24px"})`,
          pointerEvents: visible ? "auto" : "none",
          /* La transición se activa en el mismo frame en que llega el primer
             color medido: al no existir antes, ese cambio no se anima y la
             banda aparece ya con el color correcto. */
          transition: skin
            ? "opacity 420ms ease, transform 480ms cubic-bezier(.2,.7,.2,1), color 380ms ease, background-color 380ms ease"
            : "none",
        }}
      >
        <Link
          href={homeLink}
          className="shrink-0 text-[15px] font-extrabold tracking-[-0.055em] md:text-[17px]"
          style={{ color: ink }}
        >
          TIAGOGOCO
        </Link>

        <nav className="absolute left-1/2 flex -translate-x-1/2 items-center gap-[clamp(24px,3.4vw,56px)] max-md:hidden">
          <Link
            href={projectsLink}
            className="transition-opacity hover:opacity-55"
            style={{ color: ink }}
          >
            PROYECTOS
          </Link>
          <Link
            href={aboutLink}
            className="transition-opacity hover:opacity-55"
            style={{ color: ink }}
          >
            SOBRE MI
          </Link>
        </nav>

        <nav aria-label="Navegación móvil" className="ml-auto flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.12em] md:hidden">
          <Link href={aboutLink} className="transition-opacity hover:opacity-55">SOBRE MÍ</Link>
          <Link href={contactLink} className="transition-opacity hover:opacity-55">CONTACTO</Link>
        </nav>

        <CopyEmailButton
          compact
          pill
          className="ml-auto max-md:hidden"
          style={{ background: pillBg, color: pillInk }}
        />
      </div>
    </div>
  );
}
