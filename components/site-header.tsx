"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CopyEmailButton } from './copy-email-button';

/**
 * Fondo de cada sección, para que la banda del header sea opaca sin cortar el color
 * de lo que hay debajo. La spec §3 lo dejaba sin fondo, pero con la página compacta
 * el contenido se leía por debajo al pasar.
 */
const SECTIONS = [
  { id: "top", bg: "#FBFAF8", dark: false },
  { id: "intro", bg: "#FBFAF8", dark: false },
  { id: "proyectos", bg: "#FBFAF8", dark: false },
  { id: "sobre-mi", bg: "#FBFAF8", dark: false },
  { id: "contacto", bg: "#000000", dark: true },
];

/** Línea de sondeo: el borde inferior de la banda. */
const PROBE = 46;

export function SiteHeader({ standalone = false }: { standalone?: boolean }) {
  const [visible, setVisible] = useState(false);
  const [{ bg, dark }, setSkin] = useState({ bg: "#FBFAF8", dark: false });

  useEffect(() => {
    const nodes = SECTIONS.map((s) => ({
      ...s,
      el: document.getElementById(s.id),
    }));
    const intro = document.getElementById("intro");
    let raf = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);

      const ir = intro?.getBoundingClientRect();
      const nextVisible = standalone || !intro || (!!ir && ir.top <= window.innerHeight * 0.35);
      setVisible((v) => (v === nextVisible ? v : nextVisible));

      const bajo = nodes.find((s) => {
        const r = s.el?.getBoundingClientRect();
        return r && r.top <= PROBE && r.bottom > PROBE;
      });
      if (bajo) {
        setSkin((prev) =>
          prev.bg === bajo.bg && prev.dark === bajo.dark
            ? prev
            : { bg: bajo.bg, dark: bajo.dark },
        );
      }
    };

    tick();
    return () => cancelAnimationFrame(raf);
  }, [standalone]);

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
          transition:
            "opacity 420ms ease, transform 480ms cubic-bezier(.2,.7,.2,1), color 380ms ease, background-color 380ms ease",
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
