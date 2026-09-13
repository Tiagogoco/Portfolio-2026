import { socials } from "@/content/site";
import { CopyEmailButton } from "./copy-email-button";

/**
 * Portada tipográfica minimalista: el wordmark es la pieza central, los stickers
 * flotan encima y debajo van los dos accesos directos (redes y correo) más la
 * frase de posicionamiento. Las posiciones de los stickers van en `em` sobre el
 * contenedor, cuyo `font-size` es el mismo del wordmark, para que la composición
 * escale en bloque.
 *
 * Sin abanico: las tres cards que vivían aquí son las mismas de `#proyectos`,
 * que queda a un scroll de distancia y las muestra mejor. La portada ocupa una
 * pantalla y ya.
 */
export function Hero() {
  return (
    <section
      id="top"
      data-skin="dark"
      className="hero-shell relative mx-auto max-w-[1440px] px-[clamp(24px,5vw,72px)]"
    >
      {/* Columna centrada: wordmark, accesos y frase comparten eje. La frase
          conserva su alineación a la izquierda dentro del bloque centrado. */}
      <div className="hero-main flex flex-col items-center justify-center">
        {/* El tope por `svh` en el `font-size` mantiene la portada en una sola
            pantalla: en monitores bajitos el wordmark encoge solo en vez de
            empujar la frase y los accesos fuera del frame. */}
        {/* `w-fit` en vez de un ancho en `em`: el contenedor se ciñe al texto
            real, así los stickers (que van en % sobre él) caen siempre sobre
            las letras sin depender de las métricas de la fuente. El `pb`
            reserva lo que `ecommerce` cuelga por abajo, que al ser absoluto no
            mide y si no se metería encima de los accesos. */}
        <div
          className="hero-wordmark relative isolate w-fit pb-[0.16em]"
          style={{ fontSize: "min(15vw, 21svh, 280px)" }}
        >
          <h1
            className="m-0 font-black lowercase text-wordmark"
            style={{
              fontSize: "1em",
              lineHeight: 0.78,
              letterSpacing: "-0.1em",
            }}
          >
            {/* En bloque: `tiagogoco` es una sola palabra, sin esto no hay
                dónde partir y el wordmark sale en una línea desbordada. */}
            <span className="block">tiago</span>
            <span className="block">goco</span>
          </h1>

          <span
            aria-hidden
            className="hero-sticker-web sticker-shadow absolute left-[-16%] top-[-18.1%] h-[20.9%] w-[35%] rotate-[7.5deg]"
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
            className="hero-sticker-saas sticker-shadow absolute left-[81%] top-[-10.9%] h-[20.9%] w-[34%] rotate-[-7deg]"
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
            className="hero-sticker-commerce sticker-shadow absolute left-[21%] top-[78%] h-[20%] w-[34%] rotate-[5deg]"
          >
            <span className="sticker sticker-br flex h-full w-full items-center justify-center bg-sticker-white">
              <span className="fold bg-sticker-white-fold" />
              <span className="text-[0.1447em] font-medium leading-none text-wordmark">
                ecommerce
              </span>
            </span>
          </span>
        </div>

        <div className="hero-actions flex items-center gap-3">
          {github && (
            <a
              href={github.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="GitHub"
              className="hero-social grid size-12 shrink-0 place-items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
            >
              <GithubIcon />
            </a>
          )}

          <CopyEmailButton
            pill
            className="hero-email-pill px-5 py-4 text-[11px] md:px-6 md:text-[12px]"
          />
        </div>

        <p className="hero-intro m-0 max-w-[22ch]">
          Construyendo productos digitales desde los primeros wireframes hasta
          producción.
        </p>
      </div>
    </section>
  );
}

/** El enlace sale de `content/site.ts`; aquí solo vive la marca. */
const github = socials.find((social) => social.label === "GITHUB");

function GithubIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-6"
      fill="currentColor"
    >
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.24-.12-.31-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.24a11.5 11.5 0 0 1 6.01 0c2.29-1.56 3.3-1.24 3.3-1.24.66 1.65.24 2.87.12 3.18.77.85 1.24 1.92 1.24 3.24 0 4.63-2.81 5.65-5.49 5.95.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
    </svg>
  );
}
