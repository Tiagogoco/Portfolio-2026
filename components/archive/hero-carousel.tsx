import Image from "next/image";
import Link from "next/link";

import { heroPreviews } from "@/content/site";

/**
 * ARCHIVADO — no se renderiza en ningún lado.
 *
 * Carrusel automático que ocupaba el lugar del grid de previews en mobile
 * (`max-width: 767px`). Se retiró del hero pero se conserva íntegro por si se
 * retoma.
 *
 * Para restaurarlo:
 *  1. Renderiza `<HeroCarousel />` en `components/hero.tsx`, justo después del
 *     bloque `.hero-previews` y antes de `.hero-mobile-intro`.
 *  2. Copia las reglas de `hero-carousel.css` (este mismo directorio) a
 *     `app/globals.css`: el bloque `.hero-carousel { display: none }` va fuera
 *     de cualquier media query, las reglas del track y los slides van dentro
 *     del `@media (max-width: 767px)` del hero, y el `@keyframes` y la regla de
 *     `prefers-reduced-motion` van al final.
 *
 * El track duplica la primera tarjeta al final para que el loop no salte: son
 * cuatro slides al 25% dentro de un track al 400%, y la animación recorre de
 * -75% a 0.
 */
export function HeroCarousel() {
  return (
    <div className="hero-carousel" aria-label="Proyectos destacados">
      <div className="hero-carousel-track">
        {[...heroPreviews, heroPreviews[0]].map((p, index) => (
          <Link
            key={`${p.id}-carousel-${index}`}
            href={`/proyectos/${p.id}`}
            aria-label={p.label}
            className={`hero-carousel-slide hero-carousel-${p.id}`}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="77vw"
              className="hero-carousel-image"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
