# Pendientes antes de publicar

Recogidos de §8 y §9 de la spec. Nada de esto bloquea el build: el sitio corre hoy,
pero estas cuatro cosas van a producción tal cual si no se resuelven.

## 1. Textos "Pendiente:" en Rankeo y Piri

En `content/projects.ts`, los casos `rankeo` y `piri` tienen `problema`, `solucion`,
`decisiones[].title/note` y `aprendizajes` con el texto literal "Pendiente: …".
Se ven en el overlay de esos dos casos. Saint Padel está completo y sirve de molde.

## 2. Cuatro Lotties de la sección whoami

`components/whoami.tsx` → `LottieSlot`. Hoy son cuadros 1/1 de color `#EFEBE4`.
Formato y peso por decidir; si se resuelven como video o GIF cambia el markup del slot.

## 3. Marca propia para favicon y Open Graph

Error mío, ya corregido a medias. §8 de la spec listaba los logotipos de las marcas como
"útiles para OG y favicons" y los tomé literalmente: el favicon del portafolio era **el
logo de Rankeo** y la imagen de Open Graph **el banner publicitario de Saint Padel**. Al
compartir tiagogo.co salía el anuncio de un cliente.

Ambos assets están fuera. En su lugar hay dos generados con `next/og` a partir de
contenido propio: `app/icon.tsx` (una "t" sobre el azul del sitio) y
`app/opengraph-image.tsx` (wordmark, titular y "Puebla · México" sobre la paleta). Son
sustitutos honestos y funcionales, pero no son diseño de marca: cuando tengas identidad
propia, cámbialos. Nota menor: `ImageResponse` usa la tipografía del sistema, no Archivo;
para que use Archivo hay que cargar el .ttf en esos archivos.

## 4. La copy del encabezado de proyectos

`content/site.ts` → `proyectosHeader`. Título y bajada los escribí yo siguiendo el tono
del resto ("PROYECTOS SELECCIONADOS" / "Tres productos en producción, del modelo de
negocio al primer cobro."). Revísalos: es tu voz, no la mía. El conteo `03 proyectos`
sale de `projects.length`, así que ese se mantiene solo.

Ojo con la repetición: la intro cierra con "ÚLTIMOS PROYECTOS ↓" justo antes. Por eso el
eyebrow es `( selección )` y no `( proyectos )`, que dejaba la palabra tres veces
seguidas en media pantalla.

## 5. El año de los proyectos

`content/projects.ts` → `year`. Los tres están en `'2025'`, tomado de la propia copy de
la intro ("Tres en línea desde 2025"). Si alguno salió a producción en otro año, hay que
corregirlo: se ve en la píldora sobre la imagen de cada tarjeta.

La referencia en la que se basa la tarjeta lleva también un botón de GitHub junto al del
sitio en vivo. No se puso porque no hay URLs de repositorio en los datos; si se añaden,
el hueco está justo a la izquierda del botón de globo.

## 6. URLs reales de redes

`content/site.ts` → `socials`. Hoy apuntan a la raíz de github.com, linkedin.com e
instagram.com.

## 7. Sitios en vivo de Rankeo y Piri

`content/projects.ts` → `href` de esos dos casos apunta a `#contacto` y `hrefExterno`
está en `false`. Cuando existan, poner la URL y `hrefExterno: true`; el botón de globo
de la tarjeta y del overlay se actualizan solos.

---

## Desviaciones deliberadas de la spec

- **Dos anatomías de tarjeta, una por breakpoint** — `components/projects-stack.tsx`
  tiene `DesktopCard` y `MobileCard`, y comparten `Shot`, `Chips`, `Globo` y `AbrirCaso`.

  **Desktop** conserva la carpeta de §5.3 tal cual: pestaña, superficie de color, titular
  de 44px con el botón circular a la derecha, y rejilla `300px 1fr` con descripción,
  chips y `abrir caso →` a la izquierda e imagen a la derecha.

  **Móvil** sigue la referencia minimalista: sin carpeta ni apilado, fila de meta
  (año · regla · botón), imagen dominante, nombre + chips, descripción y CTA.

  El markup está duplicado a propósito: las dos disposiciones difieren en el orden del
  DOM, no sólo en estilos, y resolverlo con `grid-area` salía más frágil que legible. No
  cuesta descargas: las imágenes son `loading="lazy"` y la variante oculta nunca llega a
  intersecar el viewport, así que no se pide (comprobado: una sola petición a
  `/_next/image` con las dos variantes en el DOM).

  En ambas, la caja de la imagen toma su `aspect-ratio` de las dimensiones del archivo
  (`cardShot.w/h`): los tres banners tienen proporciones distintas (1.905, 1.776, 1.600)
  y cualquier caja fija recortaba alguno.

  Los chips pasan de Archivo 13px con relleno blanco a mono 11–12px sin relleno y con
  borde, más acordes al conjunto.
- **Encabezado de sección** — `#proyectos` no tenía título propio en la spec. Se añadió
  uno con la estructura de la referencia (eyebrow, titular, bajada, regla + conteo),
  usando los tokens de "H2 sección" de §2 y el revelado escalonado de §5.4: `enter()` del
  bloque encadenado a `stagger()`, con el mismo easeOutCubic y los mismos 26px de
  desplazamiento del resto del sitio. Alineado a los 1100px de las tarjetas.
- **La carpeta es sólo de desktop** — desde `md` se mantiene todo lo de la spec:
  pestaña de 268×46, superficie de color, radio `0 22px 22px 22px`, las tres sombras
  crecientes (.14 / .16 / .18) y el apilado sticky de 145vh con `padding-top` 8/12/16vh.
  Por debajo de 768px no hay carpeta ni apilado: cada proyecto es la captura sobre el
  fondo de página en una lista vertical con 64px de separación.
- **Header con banda opaca** — §3 lo define "sin fondo ni blur". Con la página compacta
  eso dejaba el contenido leyéndose por debajo al pasar por detrás. Ahora la banda es
  opaca y su color sigue al de la sección que tiene debajo, muestreada en `y = 46`:
  crema en hero/intro/proyectos, azul en proceso, blanco en stack/whoami. El texto se
  invierte a blanco sobre azul, como ya hacía. Fondo y color transicionan en 380 ms, así
  que el cambio de sección no da un salto. Los destinos de ancla llevan
  `scroll-margin-top: 76px` para no quedar debajo de la banda (mide 63–67px).
- **Degradado del hero** — eliminado. El hero va sobre el fondo sólido de página.
- **Superficies de las tarjetas de proyecto** — la spec §2 las define en crema
  (`#EFE9DE`) y verde (`#C9DCAF`). Se cambiaron a una escala azul de tres pasos, la
  misma familia del abanico del hero, para que las dos secciones lean como un sistema:

  | tarjeta | superficie | borde de chip | tinta de chip | etiqueta |
  | ------- | ---------- | ------------- | ------------- | -------- |
  | 01 Saint  | `#E6EFFD` | `#B9D1F4` | `#3f5a7d` | `#4a6382` |
  | 02 Rankeo | `#C6DDFD` | `#9BC0F3` | `#2c5fa8` | `#3a5680` |
  | 03 Piri   | `#A8CBFB` | `#7FAEF0` | `#164b96` | `#274a7d` |

  Los acentos de marca (verde Saint, negro/lima Rankeo, marrón Piri) **no** cambian:
  siguen en el botón de globo, en "abrir caso →" y en todo el overlay, que es donde
  identifican al proyecto. Todas las combinaciones quedan por encima de 5:1.

---

## Decisiones de móvil ya tomadas

La spec dejaba cuatro puntos abiertos para <768px. Quedaron así:

- **Abanico del hero** — en móvil deja de ser un abanico superpuesto y pasa a ser un
  **carrusel horizontal** de 3 tarjetas (Proyectos, Sobre mí, Stack) en flujo, con
  `scroll-snap`, sangrado a los bordes de pantalla y scrollbar oculta. Tarjetas al 62%
  de ancho con 12px de separación, etiqueta horizontal abajo a la izquierda, sin blur y
  **sin las sombras laterales**: en el abanico caen bajo la tarjeta vecina y leen como
  profundidad, pero en flujo se esparcen sobre el fondo y lo ensucian de gris. Debajo va
  la ayuda `DESLIZA ——— 03`. Desde `md` vuelven a ser absolutas, al 36.76% en
  las posiciones de la spec, con etiqueta vertical y blur. El padding lateral baja a 24px.
  Si se quieren las 5 en el carrusel, basta con poner `onMobile: true` en
  `content/site.ts`.
- **Titular del hero** — el piso del `clamp()` baja de 38px a 34px: 4 líneas a 375px en
  vez de las 5 del original. Por encima de ~532px de ancho no cambia nada.
- **Alto del hero** — en móvil deja de ser 100vh y la marca el contenido (556px a
  375×812). Sin `justify-between`, titular y carrusel quedan juntos en vez de repartirse
  el viewport. Desktop sigue a 100vh con `space-between`.
- **Alineación de la intro** — en móvil el bloque sticky se alinea arriba
  (`items-start`, 96px) en vez de centrarse. Centrado dejaba 245px muertos entre el hero
  y el primer párrafo; así son 124px. El coste es que, con el sticky fijado, el texto
  queda en la mitad superior de la pantalla en lugar de centrado. Para volver atrás,
  quitar `max-md:items-start max-md:pt-24` de `components/intro-reveal.tsx`.
- **Alto de los bloques sticky en móvil** — en desktop el hijo sticky mide justo un
  viewport y su contenido lo llena, así que no sobra nada. En móvil el contenido es más
  estrecho y alto, y sobraba mucho por debajo, que se veía como un hueco enorme antes de
  la sección siguiente. Corregido en los dos sitios donde pasaba:

  | transición | antes | ahora |
  | ---------- | ----- | ----- |
  | intro → proyectos | 372px | 72px |
  | proyectos → proceso | 426px | 64px |

  El hijo sticky de `#intro` pasa a `min-h-0`, y `#proyectos` deja de ser sticky en
  móvil, así que su alto ya lo marca el contenido. `#sobre-mi`, `#stack` y `#whoami` no
  necesitan ajuste: su contenido sí llena el viewport.
- **Rejillas** — la de `300px 1fr` de las tarjetas de proyecto y la de `1.15fr 0.85fr`
  del overlay pasan a una columna.
- **Alturas sticky** — bajan a 230–280vh (tabla en el README).
- **Whoami** — de ocho satélites a los cuatro de texto, en dos carriles al 2% de cada
  borde, con el retrato reducido a 46vw para que no se crucen.
- **Stack** — el titular sube justo bajo el eyebrow (13vh) y la lista arranca a 23vh y
  llega al borde inferior, con una máscara que conserva el desvanecido de los bordes.
- **Header** — el nav central se oculta; quedan logo y Contacto.
