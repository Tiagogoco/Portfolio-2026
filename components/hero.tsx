import { heroCards } from '@/content/site';

/** §5.1 — titular arriba, abanico de 5 tarjetas abajo. Nada aquí es imagen. */
export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-screen max-w-[1320px] flex-col justify-between gap-[clamp(40px,6vh,80px)] px-14 pt-[clamp(80px,15vh,190px)] pb-[clamp(60px,12vh,130px)] max-md:px-6"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute top-0 h-1/2 left-[calc(-50vw+50%)] right-[calc(-50vw+50%)]"
        style={{
          background:
            'linear-gradient(to bottom, rgba(31,111,235,0.28) 0%, rgba(31,111,235,0.160) 34%, rgba(31,111,235,0.059) 64%, rgba(31,111,235,0) 100%)',
        }}
      />

      <h1
        className="relative m-0 max-w-[20em] font-extrabold"
        style={{
          fontSize: 'clamp(38px, 6.4vw, 96px)',
          lineHeight: 0.94,
          letterSpacing: '-0.045em',
          textWrap: 'pretty',
        }}
      >
        Creando productos digitales desde la idea, hasta producción
      </h1>

      <div className="relative flex justify-center">
        <div className="relative h-[clamp(220px,34vh,320px)] w-[min(816px,100%)]">
          {heroCards.map((card) => (
            <a
              key={card.label}
              href={card.href}
              className="group absolute top-0 h-full w-[36.76%] transition-[transform,filter] duration-[240ms] ease-[var(--ease-ui)] hover:z-[9] hover:translate-y-[-16px] hover:blur-none"
              style={{ left: card.left, zIndex: card.z, filter: card.blur ? `blur(${card.blur}px)` : undefined }}
            >
              <span
                className="absolute top-0 left-0 h-[26px] w-[40%] rounded-[10px_16px_0_0]"
                style={{ background: card.color }}
              />
              <span
                className="absolute inset-x-0 bottom-0 top-[21px] rounded-[12px]"
                style={{
                  background: card.color,
                  boxShadow: card.label === 'Sobre mí' ? '-18px 0 40px rgba(31,111,235,0.18)' : undefined,
                }}
              />
              <span
                className="absolute bottom-5 right-[14px] font-mono text-[11px] uppercase tracking-[0.16em]"
                style={{ writingMode: 'vertical-rl', color: card.ink }}
              >
                {card.label}
              </span>
            </a>
          ))}

          <a
            href="#proyectos"
            className="absolute top-0 left-0 z-[5] h-full w-[36.76%] transition-transform duration-[240ms] ease-[var(--ease-ui)] hover:z-[9] hover:translate-y-[-16px]"
          >
            <span className="absolute top-0 left-0 h-[28px] w-[43%] rounded-[10px_16px_0_0] bg-gray-card" />
            <span className="absolute inset-x-0 bottom-0 top-[23px] rounded-[12px] bg-gray-card shadow-[-20px_0_46px_rgba(31,27,22,0.16)]" />
            <span
              className="absolute left-6 top-[44px] font-bold text-page"
              style={{ fontSize: 'clamp(20px, 2.8vw, 30px)', letterSpacing: '-0.03em' }}
            >
              Proyectos
            </span>
            <span className="absolute bottom-5 left-6 font-mono text-[11px] uppercase tracking-[0.16em] text-[rgba(251,250,248,0.7)]">
              3 sitios · abrir
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
