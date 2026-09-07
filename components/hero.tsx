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

      <div className="grid items-end gap-[clamp(42px,8vh,96px)] lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.42fr)] lg:gap-16">
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

        <Workbench />
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
          <a className="transition-colors hover:text-blue" href="#stack">
            Stack
          </a>
        </nav>
      </div>
    </section>
  );
}

function Workbench() {
  return (
    <div className="relative overflow-hidden rounded-[18px] bg-[#101010] p-5 text-[#f7f7f3] shadow-[0_18px_60px_rgba(31,27,22,0.16)] md:p-7">
      <div
        aria-hidden
        className="absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:22px_22px]"
      />
      <div className="relative">
        <div className="flex items-center justify-between border-b border-white/15 pb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
          <span>hero / auto layout</span>
          <span>01 — 04</span>
        </div>
        <div className="relative mt-10 aspect-[1.12] min-h-[220px]">
          <div className="absolute left-[8%] top-[14%] h-[31%] w-[57%] border border-[#64df83]" />
          <div className="absolute left-[8%] top-[14%] size-2 -translate-x-1/2 -translate-y-1/2 bg-white" />
          <div className="absolute left-[65%] top-[14%] size-2 -translate-x-1/2 -translate-y-1/2 bg-white" />
          <div className="absolute left-[8%] top-[45%] size-2 -translate-x-1/2 translate-y-1/2 bg-white" />
          <div className="absolute left-[65%] top-[45%] size-2 -translate-x-1/2 translate-y-1/2 bg-white" />
          <div className="absolute left-[22%] top-[27%] font-mono text-[10px] text-white/55">
            W 412 · H 268
          </div>
          <div className="absolute bottom-[13%] left-[28%] bg-[#64df83] px-2 py-1 font-mono text-[10px] text-[#07140b]">
            design → production
          </div>
          <div className="absolute bottom-[11%] right-[8%] size-3 rounded-full bg-blue shadow-[0_0_0_5px_rgba(31,111,235,0.16)]" />
        </div>
        <div className="flex items-center justify-between border-t border-white/15 pt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-white/55">
          <span>grid / type / motion</span>
          <span className="text-[#64df83]">● live</span>
        </div>
      </div>
    </div>
  );
}
