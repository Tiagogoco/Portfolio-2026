# tiagogoco

Portafolio de Tiago Gómez — desarrollador y product designer.

Implementación en Next.js del prototipo especificado en [`spec/`](spec/). Una sola ruta
con siete secciones ancladas y el detalle de cada proyecto en un overlay modal.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **Tailwind CSS 4** — tokens del sitio en `app/globals.css` (`@theme`)
- **Motion** (Framer Motion) — todo el movimiento ligado a scroll
- Fuentes por `next/font/google`: Archivo, JetBrains Mono, Instrument Serif

## Estructura

```
app/
  layout.tsx        fuentes, metadata y OG
  page.tsx          envuelve <Site /> en Suspense (usa useSearchParams)
  globals.css       tokens de color, tipografía, easings y reduced-motion
components/
  site.tsx          compone las 7 secciones y gobierna el overlay vía ?caso=
  site-header.tsx   header fijo: aparición por scroll e inversión sobre el azul
  hero.tsx          portada tipográfica + panel visual de diseño/código
  intro-reveal.tsx  revelado palabra por palabra (sticky 380vh)
  projects-stack.tsx archivo editorial de proyectos sticky
  process.tsx       5 fases + panel de descripción (sticky 350vh)
  stack-loop.tsx    lista en loop vertical (sticky 460vh)
  whoami.tsx        satélites en flujo continuo (sticky 460vh)
  site-footer.tsx   ticker + redes + wordmark
  case-overlay.tsx  modal de caso con tabs, focus trap y retorno de foco
content/
  projects.ts       los 3 casos — fuente única de la tarjeta y del overlay
  process.ts        las 5 fases
  stack.ts          filas del stack y su estilo por tipo
  site.ts           intro, ticker, redes y satélites
lib/
  scroll.ts         hooks de progreso (§4), easings y media queries
spec/               spec original, prototipo y capturas de referencia
```

## Motor de scroll

Cinco secciones son *sticky largas*: un contenedor de altura fija en `vh` con un hijo
`position: sticky; top: 0`. Todo el movimiento interno deriva de dos escalares
(`useSectionProgress` y `useEnterProgress` en `lib/scroll.ts`), que se mantienen como
`MotionValue` y no como estado de React, para no re-renderizar por frame.

Las alturas de esas secciones son el único *timeline* del sitio: cambiarlas cambia la
velocidad de todo lo que contienen.

| sección     | altura desktop | altura móvil |
| ----------- | -------------- | ------------ |
| `#intro`    | 380vh          | 240vh        |
| `#proyectos`| 3 × 145vh      | igual        |
| `#sobre-mi` | 350vh          | 230vh        |
| `#stack`    | 460vh          | 280vh        |
| `#whoami`   | 460vh          | 280vh        |

## Desarrollo

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run lint
```

## URLs de caso

El overlay se refleja en `?caso=saint | rankeo | piri`, así que cada caso tiene URL
compartible y atrás/adelante del navegador lo cierran y reabren.

## Pendientes

Ver [PENDIENTES.md](PENDIENTES.md) — material que falta antes de publicar.
