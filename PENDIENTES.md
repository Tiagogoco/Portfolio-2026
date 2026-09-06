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

## 3. URLs reales de redes

`content/site.ts` → `socials`. Hoy apuntan a la raíz de github.com, linkedin.com e
instagram.com.

## 4. Sitios en vivo de Rankeo y Piri

`content/projects.ts` → `href` de esos dos casos apunta a `#contacto` y `hrefExterno`
está en `false`. Cuando existan, poner la URL y `hrefExterno: true`; el botón de globo
de la tarjeta y del overlay se actualizan solos.

---

## Desviaciones deliberadas de la spec

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

- **Abanico del hero** — se conserva el abanico, pero de 5 tarjetas pasa a 3
  (Proyectos, Sobre mí, Stack) para simplificar la navegación. Las tarjetas crecen a
  54% de ancho en posiciones 0 / 23% / 46%, que mantiene el mismo solape proporcional
  que las cinco de desktop y llena el ancho. El padding lateral baja a 24px.
- **Titular del hero** — el piso del `clamp()` baja de 38px a 28px para que quepa en
  3 líneas a 375px en vez de 5. Por encima de ~594px de ancho no cambia nada.
- **Alto del hero** — en móvil deja de ser 100vh y la marca el contenido (567px a
  375×812). Sin `justify-between`, titular y abanico quedan a 44px en vez de repartirse
  el viewport. Desktop sigue a 100vh con `space-between`.
- **Rejillas** — la de `300px 1fr` de las tarjetas de proyecto y la de `1.15fr 0.85fr`
  del overlay pasan a una columna.
- **Alturas sticky** — bajan a 230–280vh (tabla en el README).
- **Whoami** — de ocho satélites a los cuatro de texto, en dos carriles al 2% de cada
  borde, con el retrato reducido a 46vw para que no se crucen.
- **Stack** — el titular sube justo bajo el eyebrow (13vh) y la lista arranca a 23vh y
  llega al borde inferior, con una máscara que conserva el desvanecido de los bordes.
- **Header** — el nav central se oculta; quedan logo y Contacto.
