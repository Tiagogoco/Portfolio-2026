import { heroCards } from '@/content/site';

/** Tarjetas visibles en el carrusel de móvil: las marcadas + la de Proyectos. */
const MOBILE_COUNT = heroCards.filter((c) => c.onMobile).length + 1;

/* Tarjeta: en móvil va en flujo dentro del scroller; desde md se posiciona en el abanico. */
const CARD =
  'group relative h-full w-[62%] shrink-0 snap-start transition-transform duration-[240ms] ease-[var(--ease-ui)] ' +
  'md:absolute md:top-0 md:w-[36.76%] md:hover:z-[9] md:hover:translate-y-[-16px]';

/**
 * §5.1 — titular arriba, abanico de 5 tarjetas abajo. Nada aquí es imagen.
 * Sin degradado: el hero queda sobre el fondo sólido de página.
 * En móvil deja de ocupar 100vh y el abanico se vuelve un carrusel horizontal de 3
 * tarjetas en flujo, con snap; desde md vuelven a ser absolutas y superpuestas (§9).
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-screen max-w-[1320px] flex-col justify-between gap-[clamp(40px,6vh,80px)] px-14 pt-[clamp(80px,15vh,190px)] pb-[clamp(60px,12vh,130px)] max-md:min-h-0 max-md:justify-start max-md:gap-9 max-md:px-6 max-md:pt-[104px] max-md:pb-7"
    >
      <h1
        className="relative m-0 max-w-[20em] font-extrabold"
        style={{
          fontSize: 'clamp(34px, 6.4vw, 96px)',
          lineHeight: 0.94,
          letterSpacing: '-0.045em',
          textWrap: 'pretty',
        }}
      >
        Creando productos digitales desde la idea, hasta producción
      </h1>

      <div className="relative">
        <div className="relative -mx-6 flex h-[clamp(220px,34vh,320px)] snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-6 px-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-auto md:block md:w-[min(816px,100%)] md:gap-0 md:overflow-visible md:px-0">
          <a
            href="#proyectos"
            className={`${CARD} md:left-0 md:z-[5]`}
            style={{ order: -5 }}
          >
            <span className="absolute top-0 left-0 h-[28px] w-[43%] rounded-[10px_16px_0_0] bg-gray-card" />
            <span className="absolute inset-x-0 bottom-0 top-[23px] rounded-[12px] bg-gray-card md:shadow-[-20px_0_46px_rgba(31,27,22,0.16)]" />
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

          {heroCards.map((card) => (
            <a
              key={card.label}
              href={card.href}
              className={`${CARD} md:left-[var(--l)] ${
                card.blur ? 'md:[filter:blur(var(--b))] md:hover:[filter:blur(0px)]' : ''
              } ${card.onMobile ? '' : 'hidden md:block'}`}
              style={
                {
                  '--l': card.left,
                  '--b': `${card.blur}px`,
                  order: -card.z,
                  zIndex: card.z,
                } as React.CSSProperties
              }
            >
              <span
                className="absolute top-0 left-0 h-[26px] w-[40%] rounded-[10px_16px_0_0]"
                style={{ background: card.color }}
              />
              <span
                className={`absolute inset-x-0 bottom-0 top-[21px] rounded-[12px] ${
                  card.label === 'Sobre mí' ? 'md:shadow-[-18px_0_40px_rgba(31,111,235,0.18)]' : ''
                }`}
                style={{ background: card.color }}
              />
              <span
                className="absolute bottom-5 left-6 font-bold text-[20px] tracking-[-0.03em] md:left-auto md:right-[14px] md:font-mono md:text-[11px] md:font-normal md:uppercase md:tracking-[0.16em] md:[writing-mode:vertical-rl]"
                style={{ color: card.ink }}
              >
                {card.label}
              </span>
            </a>
          ))}
        </div>

        <div
          aria-hidden
          className="mt-5 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-mute md:hidden"
        >
          desliza
          <span className="h-px flex-1 bg-rule" />
          {String(MOBILE_COUNT).padStart(2, '0')}
        </div>
      </div>
    </section>
  );
}
