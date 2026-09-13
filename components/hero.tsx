import { HeroCardFan } from "./hero-card-fan";

/**
 * Portada tipográfica: el wordmark es la pieza central y los stickers flotan
 * encima. Las posiciones van en `em` sobre el contenedor, cuyo `font-size` es
 * el mismo del wordmark, para que la composición escale en bloque.
 *
 * La portada se limita a `100svh` menos un margen, y el abanico de proyectos
 * arranca justo debajo: así asoma al abrir sin tocar el wordmark y su apertura
 * queda ligada al primer tramo de scroll. El wordmark va anclado
 * arriba (margen explícito, no `justify-between`) para que su posición no dependa
 * del alto del bloque ni de cuánto contenido venga después.
 */
export function Hero() {
  return (
    <section
      id="top"
      data-skin="dark"
      className="hero-shell relative mx-auto max-w-[1440px] px-[clamp(24px,5vw,72px)]"
    >
      <div className="hero-main flex flex-col">
        {/* El tope por `svh` en el `font-size` es lo que permite el frame
            único: en pantallas bajitas el wordmark encoge solo y le deja sitio
            al abanico debajo, en vez de empujarlo a su propia pantalla. */}
        <div
          className="hero-wordmark relative isolate mx-auto w-[4.621em] pt-[0.9em]"
          style={{ fontSize: "min(12.5vw, 19svh, 225px)" }}
        >
          <h1
            className="m-0 font-black lowercase text-wordmark"
            style={{
              fontSize: "1em",
              lineHeight: 0.78,
              letterSpacing: "-0.1em",
            }}
          >
            <span>tiago</span>
            <span>goco</span>
          </h1>

          <span
            aria-hidden
            className="hero-sticker-web sticker-shadow absolute left-[0.0198em] top-[0.6314em] h-[0.3279em] w-[0.9597em] rotate-[7.5deg]"
          >
            <span className="sticker sticker-tl flex h-full w-full items-center justify-center bg-sticker-blue">
              <span className="fold bg-sticker-blue-fold" />
              <span className="text-[0.1447em] font-medium leading-none text-wordmark">
                <span className="hidden md:inline">full stack web</span>
                <span className="md:hidden">web products</span>
              </span>
            </span>
          </span>

          <span
            aria-hidden
            className="hero-sticker-saas sticker-shadow absolute left-[3.4651em] top-[0.8729em] h-[0.25em] w-[0.83em] rotate-[-7deg]"
          >
            <span
              className="sticker sticker-tr flex h-full w-full items-center justify-center bg-sticker-yellow"
              style={{ "--fold": "0.082em" } as React.CSSProperties}
            >
              <span className="fold bg-sticker-yellow-fold" />
              <span className="text-[0.126em] font-medium leading-none text-wordmark">
                SaaS
              </span>
            </span>
          </span>

          <span
            aria-hidden
            className="hero-sticker-commerce sticker-shadow absolute left-[3.5126em] top-[1.52em] -z-10 h-[0.3255em] w-[0.9548em] rotate-[5deg]"
          >
            <span className="sticker sticker-br flex h-full w-full items-center justify-center bg-sticker-white">
              <span className="fold bg-sticker-white-fold" />
              <span className="text-[0.1447em] font-medium leading-none text-wordmark">
                ecommerce
              </span>
            </span>
          </span>
          {/* <span
            aria-hidden
            className="hero-sticker-api sticker-shadow absolute hidden"
          >
            <span className="sticker sticker-tr flex h-full w-full items-center justify-center bg-sticker-pink">
              <span className="fold bg-sticker-white-fold" />
              <span className="text-[0.125em] font-normal leading-none text-wordmark">
                APIs
              </span>
            </span>
          </span> */}
        </div>
      </div>

      {/* Las dos intros viajan dentro del abanico, no en la cabecera: quedan
          debajo de las cards y así el wordmark se puede pegar al abanico y
          crecer con el espacio que dejaron. */}
      <HeroCardFan>
        <p
          className="hero-intro m-0 max-w-[24ch] text-center tracking-[-0.01em]"
          style={{ fontSize: "clamp(18px, 2.3vw, 32px)", lineHeight: 1.5 }}
        >
          Del primer wireframe al deploy en producción.
        </p>
        <p className="hero-mobile-intro hidden">
          Construyendo productos web desde los primeros wireframes hasta
          producción.
        </p>
      </HeroCardFan>
    </section>
  );
}
