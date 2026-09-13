import Image from "next/image";
import Link from "next/link";

import { heroPreviews } from "@/content/site";

/**
 * Portada tipográfica: el wordmark es la pieza central y los stickers flotan
 * encima. Las posiciones van en `em` sobre el contenedor, cuyo `font-size` es
 * el mismo del wordmark, para que la composición escale en bloque.
 *
 * La portada se limita a `100svh` menos un margen, y el grid de proyectos arranca
 * justo debajo: así asoma al abrir sin tocar el wordmark. El wordmark va anclado
 * arriba (margen explícito, no `justify-between`) para que su posición no dependa
 * del alto del bloque ni de cuánto contenido venga después.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="hero-shell relative mx-auto max-w-[1440px] px-[clamp(24px,5vw,72px)] pb-[clamp(48px,8vh,110px)]"
    >
      <div className="hero-main flex min-h-[calc(100svh_-_clamp(56px,9vh,120px))] flex-col pb-[clamp(20px,3vh,40px)] pt-[clamp(92px,13vh,150px)]">
        <div
          className="hero-wordmark relative isolate mx-auto mt-[clamp(40px,8vh,90px)] w-[4.621em] pt-[0.9em]"
          style={{ fontSize: "clamp(56px, 17.4vw, 250px)" }}
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
          <span
            aria-hidden
            className="hero-sticker-api sticker-shadow absolute hidden"
          >
            <span className="sticker sticker-tr flex h-full w-full items-center justify-center bg-sticker-pink">
              <span className="fold bg-sticker-white-fold" />
              <span className="text-[0.125em] font-normal leading-none text-wordmark">
                APIs
              </span>
            </span>
          </span>
        </div>

        <p
          className="hero-intro m-0 mt-auto max-w-[24ch] pt-[clamp(24px,4vh,56px)] tracking-[-0.01em] text-body"
          style={{ fontSize: "clamp(18px, 2.3vw, 32px)", lineHeight: 1.5 }}
        >
          Del primer wireframe al deploy en producción.
        </p>
      </div>

      <div className="hero-previews grid grid-cols-3 gap-[clamp(10px,2.4vw,34px)]">
        <div className="hero-preview-track">
          {heroPreviews.map((p) => (
            <Link
              key={p.id}
              href={`/proyectos/${p.id}`}
              aria-label={p.label}
              className={`hero-preview-${p.id} group relative block aspect-square overflow-hidden rounded-[clamp(10px,1.6vw,24px)] bg-gray-card`}
            >
              <picture>
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 640px) 31vw, (max-width: 1440px) 30vw, 430px"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-ui)] group-hover:scale-[1.04]"
                />
              </picture>
            </Link>
          ))}
        </div>
      </div>

      <p className="hero-mobile-intro hidden">
        Construyendo productos web desde los primeros wireframes hasta
        producción.
      </p>
    </section>
  );
}
