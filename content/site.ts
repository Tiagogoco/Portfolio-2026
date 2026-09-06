export const EMAIL = 'tiagogocor@gmail.com';

export type Social = { n: string; label: string; href: string };

export const socials: Social[] = [
  { n: '01', label: 'GITHUB', href: 'https://github.com/' },
  { n: '02', label: 'LINKEDIN', href: 'https://linkedin.com/' },
  { n: '03', label: 'INSTAGRAM', href: 'https://instagram.com/' },
];

export const ticker: string[] = [
  'disponible para proyectos',
  'puebla · méxico',
  'producto · diseño · código',
  EMAIL,
  'saint padel',
  'rankeo',
  'piri',
];

/** Párrafos de la intro. Cada palabra se revela por separado (§5.2). */
export const introLines: string[] = [
  'Soy Tiago, desarrollador en Puebla.',
  'Construyo productos digitales desde el diseño hasta los cobros en producción.',
  'Tres en línea desde 2025, con usuarios usándolos hoy.',
];

export type HeroCard = {
  label: string;
  color: string;
  ink: string;
  href: string;
  /** Posición en el abanico de 5 de desktop, con tarjetas del 36.76%. */
  left: string;
  /** Si entra en el carrusel de móvil, que coloca las tarjetas en flujo (§9). */
  onMobile: boolean;
  z: number;
  blur: number;
};

/** Abanico del hero, de atrás hacia adelante en el DOM (§5.1). */
export const heroCards: HeroCard[] = [
  { label: 'Contacto', color: '#C6DDFD', ink: '#2c5fa8', href: '#contacto', left: '62.75%', onMobile: false, z: 1, blur: 2.6 },
  { label: 'Stack', color: '#85B8FA', ink: '#164b96', href: '#stack', left: '47.06%', onMobile: true, z: 2, blur: 1.4 },
  { label: 'Experiencia', color: '#4C8FF5', ink: '#ffffff', href: '#sobre-mi', left: '31.37%', onMobile: false, z: 3, blur: 0 },
  { label: 'Sobre mí', color: '#1F6FEB', ink: '#ffffff', href: '#sobre-mi', left: '15.68%', onMobile: true, z: 4, blur: 0 },
];

export type Satellite = {
  phase: number;
  lane: 'left' | 'right';
  offset: string;
  width: string;
  kind: 'lottie' | 'text';
};

/** Ocho satélites en cuatro carriles (§5.6). */
export const satellites: Satellite[] = [
  { phase: 0.03, lane: 'left', offset: '5%', width: 'clamp(96px, 11vw, 148px)', kind: 'lottie' },
  { phase: 0.17, lane: 'left', offset: '11%', width: 'clamp(120px, 14vw, 190px)', kind: 'text' },
  { phase: 0.3, lane: 'left', offset: '5%', width: 'clamp(100px, 12vw, 158px)', kind: 'lottie' },
  { phase: 0.44, lane: 'left', offset: '11%', width: 'clamp(130px, 15vw, 200px)', kind: 'text' },
  { phase: 0.11, lane: 'right', offset: '5%', width: 'clamp(96px, 11vw, 148px)', kind: 'lottie' },
  { phase: 0.25, lane: 'right', offset: '11%', width: 'clamp(110px, 13vw, 170px)', kind: 'text' },
  { phase: 0.38, lane: 'right', offset: '5%', width: 'clamp(100px, 12vw, 158px)', kind: 'lottie' },
  { phase: 0.52, lane: 'right', offset: '11%', width: 'clamp(130px, 15vw, 205px)', kind: 'text' },
];
