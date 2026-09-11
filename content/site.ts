export const EMAIL = "tiagogocor@gmail.com";

export type Social = { n: string; label: string; href: string };

export const socials: Social[] = [
  { n: "01", label: "GITHUB", href: "https://github.com/" },
  { n: "02", label: "LINKEDIN", href: "https://linkedin.com/" },
  { n: "03", label: "INSTAGRAM", href: "https://instagram.com/" },
];

export const ticker: string[] = [
  "disponible para proyectos",
  "puebla · méxico",
  "producto · diseño · código",
  EMAIL,
  "saint padel",
  "rankeo",
  "piri",
];

/** Párrafos de la intro. Cada palabra se revela por separado (§5.2). */
export const introLines: string[] = [
  "Soy Tiago, desarrollador de productos web.",
  "Estudio ingeniería en teconologías de la información y soy autodidacta",
  "Construyo productos web desde el diseño hasta los cobros en producción.",
  "Tres en línea desde 2025, con usuarios usándolos hoy.",
];

export const aboutContent = {
  eyebrow: "( sobre mí )",
  title: "SOBRE MÍ",
  lead: "Construyo productos digitales de principio a fin: de una idea clara a una experiencia que funciona.",
  body: "Soy Tiago, desarrollador y product designer en Puebla. Me gusta trabajar cerca del problema: entender el negocio, diseñar el sistema y escribir el código que lo lleva a producción. Desde 2025 he construido ecommerce, SaaS y herramientas con usuarios reales.",
};

/** Encabezado de la sección de proyectos. El conteo se deriva de `projects`. */
export const proyectosHeader = {
  eyebrow: "( selección )",
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
