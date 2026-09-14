export const EMAIL = "tiagogocor@gmail.com";

export type Social = { n: string; label: string; href: string };

export const socials: Social[] = [
  { n: "01", label: "GITHUB", href: "https://github.com/Tiagogoco" },
  {
    n: "02",
    label: "LINKEDIN",
    href: "https://www.linkedin.com/in/tiago-gomez-dev/",
  },
  { n: "03", label: "INSTAGRAM", href: "https://www.instagram.com/tiagogoco/" },
];

/**
 * Grid de previews al pie del hero. Los `id` son los mismos de `projects`,
 * así que cada tarjeta enlaza a `/proyectos/[id]`.
 */
export const heroPreviews = [
  {
    id: "rankeo",
    src: "/img/proyectos/hero-rankeo.webp",
    mobileSrc: "/img/proyectos/mobile-rankeo.webp",
    label: "Ver el caso de Rankeo",
    alt: "Rankeo en móvil: torneos, ligas y rankings de padel en Puebla",
  },
  {
    id: "piri",
    src: "/img/proyectos/hero-piri.webp",
    mobileSrc: "/img/proyectos/mobile-piri.webp",
    label: "Ver el caso de Piri",
    alt: "Piri en escritorio: buscador de antigüedades y coleccionables",
  },
  {
    id: "saint",
    src: "/img/proyectos/hero-saint.webp",
    mobileSrc: "/img/proyectos/mobile-saint.webp",
    label: "Ver el caso de Saint Padel",
    alt: "Saint Padel en móvil: catálogo de palas por tipo de juego",
  },
] as const;

export const aboutContent = {
  eyebrow: "sobre mí",
  headline:
    "Soy Tiago, desarrollador y product designer en Puebla. Construyo productos digitales de principio a fin: de una idea clara a una experiencia que funciona.",
  /** Notas al pie del retrato, en versalitas. */
  notes: [
    "Me gusta trabajar cerca del problema: entender el negocio, diseñar el sistema y escribir el código que lo lleva a producción.",
    "Estudio ITI en la BUAP desde 2022 y soy autodidacta desde el primer día. Desde 2025 mantengo tres productos en producción, con usuarios reales.",
  ],
  portrait: {
    src: "/img/perfil/about-tiago.webp",
    alt: "Tiago trabajando con su laptop",
  },
};

/** Encabezado de la sección de proyectos. El conteo se deriva de `projects`. */
export const proyectosHeader = {
  eyebrow: "selección",
  title: "TRABAJO EN PRODUCCIÓN",
  lede: "Tres productos construidos desde el modelo de negocio hasta el primer cobro.",
};

export type Satellite = {
  phase: number;
  lane: "left" | "right";
  offset: string;
  width: string;
  kind: "lottie" | "text";
};

/** Ocho satélites en cuatro carriles (§5.6). */
export const satellites: Satellite[] = [
  {
    phase: 0.03,
    lane: "left",
    offset: "5%",
    width: "clamp(96px, 11vw, 148px)",
    kind: "lottie",
  },
  {
    phase: 0.17,
    lane: "left",
    offset: "11%",
    width: "clamp(120px, 14vw, 190px)",
    kind: "text",
  },
  {
    phase: 0.3,
    lane: "left",
    offset: "5%",
    width: "clamp(100px, 12vw, 158px)",
    kind: "lottie",
  },
  {
    phase: 0.44,
    lane: "left",
    offset: "11%",
    width: "clamp(130px, 15vw, 200px)",
    kind: "text",
  },
  {
    phase: 0.11,
    lane: "right",
    offset: "5%",
    width: "clamp(96px, 11vw, 148px)",
    kind: "lottie",
  },
  {
    phase: 0.25,
    lane: "right",
    offset: "11%",
    width: "clamp(110px, 13vw, 170px)",
    kind: "text",
  },
  {
    phase: 0.38,
    lane: "right",
    offset: "5%",
    width: "clamp(100px, 12vw, 158px)",
    kind: "lottie",
  },
  {
    phase: 0.52,
    lane: "right",
    offset: "11%",
    width: "clamp(130px, 15vw, 205px)",
    kind: "text",
  },
];
