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
      <div className="hero-main flex flex-col justify-center">
        {/* El tope por `svh` en el `font-size` mantiene la portada en una sola
            pantalla: en monitores bajitos el wordmark encoge solo en vez de
            empujar la frase y los accesos fuera del frame. */}
        {/* El `pb` reserva lo que el sticker de `ecommerce` cuelga por debajo
            del wordmark (está en absoluto, así que no mide): sin él se metería
            encima de la fila de accesos. */}
        <div
          className="hero-wordmark relative isolate w-[4.621em] pb-[0.33em]"
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
        </div>

        <div className="hero-actions flex flex-wrap items-center gap-3">
          <nav aria-label="Redes sociales" className="flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                title={social.label}
                className="hero-social grid size-12 place-items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
              >
                <SocialIcon label={social.label} />
              </a>
            ))}
          </nav>

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

/** Marcas de las redes de `content/site.ts`. Un `path` por marca, sin librería. */
const SOCIAL_PATHS: Record<string, string> = {
  GITHUB:
    "M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.24-.12-.31-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.24a11.5 11.5 0 0 1 6.01 0c2.29-1.56 3.3-1.24 3.3-1.24.66 1.65.24 2.87.12 3.18.77.85 1.24 1.92 1.24 3.24 0 4.63-2.81 5.65-5.49 5.95.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z",
  LINKEDIN:
    "M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z",
  INSTAGRAM:
    "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.13 1.38C1.35 2.68.93 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13.67.66 1.34 1.08 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.3 1.46-.72 2.13-1.38.66-.67 1.08-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.3-.79-.72-1.46-1.38-2.13C21.32 1.35 20.65.93 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z",
};

function SocialIcon({ label }: { label: string }) {
  const path = SOCIAL_PATHS[label];
  if (!path) return null;
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="currentColor">
      <path d={path} />
    </svg>
  );
}
