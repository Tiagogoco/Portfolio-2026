import { CommitCalendar } from './commit-calendar';

/**
 * El hero funciona como una portada editorial: identidad tipográfica arriba,
 * una herramienta visual al centro y navegación al final.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-between px-[clamp(24px,5vw,72px)] pb-[clamp(28px,5vh,64px)] pt-[clamp(92px,13vh,150px)]"
    >
      <div className="flex items-center justify-between gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute md:text-[11px]">
        <span>tiagogoco / portfolio 2026</span>
      </div>

      <div className="grid items-end gap-[clamp(42px,8vh,96px)] min-[1050px]:grid-cols-[minmax(0,1fr)_minmax(300px,0.42fr)] min-[1050px]:gap-16">
        <div>
          <h1
            className="m-0 font-extrabold uppercase tracking-[-0.08em] text-ink"
            style={{
              fontSize: "clamp(95px, 15.3vw, 236px)",
              lineHeight: 0.76,
            }}
          >
            <span className="block">design</span>
            <span className="ml-[0.12em] block">
              code
              <span className="font-serif font-normal lowercase tracking-[-0.08em] text-blue">
                {" "}
                &amp;
              </span>
            </span>
          </h1>
          {/* <p className="m-0 mt-10 max-w-[490px] text-[clamp(18px,2.1vw,28px)] leading-[1.08] tracking-[-0.035em] text-body">
            desarrollador y digital product designer, ayudo a marcas tener las
            mejores experiencias del mercado digital.
          </p> */}
        </div>

        <div className="min-[1050px]:justify-self-end min-[1050px]:w-full min-[1050px]:max-w-[460px]">
          <CommitCalendar />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-6 pt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
        <nav
          aria-label="Navegación principal"
          className="flex flex-wrap gap-x-8 gap-y-3"
        >
          <a className="transition-colors hover:text-blue" href="#proyectos">
            Proyectos
          </a>
          <a className="transition-colors hover:text-blue" href="#sobre-mi">
            Sobre mí
          </a>
        </nav>
      </div>
    </section>
  );
}
