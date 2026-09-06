export type Decision = { n: string; title: string; note: string };
export type Resena = { q: string; by: string; item: string };
export type Shot = { src: string; alt: string };

export type Project = {
  id: 'saint' | 'rankeo' | 'piri';
  n: '01' | '02' | '03';
  title: string;
  short: string;
  tab: string;
  kind: string;
  href: string;
  hrefExterno: boolean;
  accent: string;
  accentInk: string;
  cardBg: string;
  cardChipBorder: string;
  cardChipInk: string;
  cardTeaserInk: string;
  cardLabelInk: string;
  cardShotBg: string;
  cardShot: Shot;
  globeBg: string;
  globeInk: string;
  globeBgHover: string;
  teaser: string;
  teaserTags: string[];
  lede: string;
  problema: string;
  solucion: string;
  stack: string[];
  decisiones: Decision[];
  aprendizajes: string[];
  shots: [Shot, Shot];
  resenas?: Resena[];
};

export const projects: Project[] = [
  {
    id: 'saint',
    n: '01',
    title: 'SAINT PADEL',
    short: 'SAINT PADEL',
    tab: 'saint padel',
    kind: 'ecommerce de drops',
    href: 'https://saintpadel.com.mx',
    hrefExterno: true,
    accent: '#14664A',
    accentInk: '#ffffff',
    cardBg: '#E6EFFD',
    cardChipBorder: '#B9D1F4',
    cardChipInk: '#3f5a7d',
    cardTeaserInk: '#2a3b52',
    cardLabelInk: '#4a6382',
    cardShotBg: '#14664A',
    cardShot: { src: '/img/proyectos/saint.webp', alt: 'Captura del sitio Saint Padel' },
    globeBg: '#14664A',
    globeInk: '#ffffff',
    globeBgHover: '#0e5039',
    teaser: 'Ecommerce en producción para una nueva marca de palas de padel',
    teaserTags: ['Next.js', 'Supabase', 'Stripe'],
    lede: 'Ecommerce en producción para una nueva marca de palas de padel, construido alrededor de lanzamientos y no de un catálogo fijo.',
    problema:
      'Vender por lanzamientos, donde cada drop mezcla palas con stock físico y palas bajo pedido. Un catálogo normal, con stock y precio pegados al producto, no representa eso.',
    solucion:
      'La publicación manda, no el producto — precio, disponibilidad, modalidad y plazo pertenecen al drop, así que un mismo lanzamiento combina envío en 24/48 h y preventa a 7 días.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Supabase', 'Stripe', 'Tailwind', 'Vercel'],
    decisiones: [
      {
        n: '01',
        title: 'El drop es la entidad de venta',
        note: 'Precio, modalidad, plazo y disponibilidad viven en la publicación. El producto queda como ficha técnica reutilizable entre lanzamientos.',
      },
      {
        n: '02',
        title: 'Dos modalidades en un mismo carrito',
        note: 'Stock físico y bajo pedido conviven en la misma orden; el plazo de entrega se calcula por línea y se comunica antes del pago.',
      },
      {
        n: '03',
        title: 'Catálogo vivo',
        note: 'La colección se recalcula con cada cambio de drop, sin publicar productos huérfanos ni precios desactualizados.',
      },
    ],
    aprendizajes: [
      'Modelar el negocio antes que la pantalla ahorra el rediseño completo del catálogo tres semanas después.',
      'Cuando el plazo de entrega es parte de la promesa, tiene que aparecer antes del pago, no en el correo de confirmación.',
    ],
    shots: [
      { src: '/img/casos/saint-1.webp', alt: 'Home de Saint Padel en mobile' },
      { src: '/img/casos/saint-2.webp', alt: 'Catálogo filtrado por tipo de juego' },
    ],
  },
  {
    id: 'rankeo',
    n: '02',
    title: 'RANKEO',
    short: 'RANKEO',
    tab: 'rankeo',
    kind: 'saas de torneos y ligas',
    href: '#contacto',
    hrefExterno: false,
    accent: '#2f3b23',
    accentInk: '#E8F3D8',
    cardBg: '#C6DDFD',
    cardChipBorder: '#9BC0F3',
    cardChipInk: '#2c5fa8',
    cardTeaserInk: '#22364f',
    cardLabelInk: '#3a5680',
    cardShotBg: '#0F0F0F',
    cardShot: { src: '/img/proyectos/rankeo.webp', alt: 'Captura de Rankeo' },
    globeBg: '#0F0F0F',
    globeInk: '#D8F24A',
    globeBgHover: '#000000',
    teaser:
      'Rankeo soluciona la gestión de torneos y ligas, un SAAS completo para clubs y organizadores de eventos de padel',
    teaserTags: ['Next.js', 'PostgreSQL', 'Tailwind'],
    lede: 'Rankeo soluciona la gestión de torneos y ligas: un SaaS completo para clubes y organizadores de eventos de padel.',
    problema:
      'Pendiente: describe cómo se gestionaban los torneos antes (hojas de cálculo, grupos de WhatsApp) y qué se rompía al escalar.',
    solucion: 'Pendiente: qué sustituye Rankeo y cuál es la pieza que ningún otro sistema resolvía.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Supabase', 'Tailwind', 'Vercel'],
    decisiones: [
      { n: '01', title: 'Pendiente: decisión de datos', note: 'Modelo de ligas, niveles y jornadas.' },
      { n: '02', title: 'Pendiente: permisos por rol', note: 'Club, organizador, jugador.' },
      { n: '03', title: 'Pendiente: brackets y ranking', note: 'Cómo se calculan y se exportan.' },
    ],
    aprendizajes: [
      'Pendiente: qué aprendiste construyendo para clubes reales.',
      'Pendiente: la decisión que cambiarías hoy.',
    ],
    shots: [
      { src: '/img/casos/rankeo-1.webp', alt: 'Ranking en mobile' },
      { src: '/img/casos/rankeo-2.webp', alt: 'Partido o bracket en mobile' },
    ],
  },
  {
    id: 'piri',
    n: '03',
    title: 'PIRI',
    short: 'PIRI',
    tab: 'piri',
    kind: 'ecommerce de antigüedades',
    href: '#contacto',
    hrefExterno: false,
    accent: '#3A2317',
    accentInk: '#F6E9D8',
    cardBg: '#A8CBFB',
    cardChipBorder: '#7FAEF0',
    cardChipInk: '#164b96',
    cardTeaserInk: '#16294a',
    cardLabelInk: '#274a7d',
    cardShotBg: '#3A2317',
    cardShot: { src: '/img/proyectos/piri.webp', alt: 'Captura del sitio Piri' },
    globeBg: '#3A2317',
    globeInk: '#F6E9D8',
    globeBgHover: '#2a1810',
    teaser:
      'Ecommerce para una tienda de antigüedades, con sincronización de articulos diarios, pixel, cupones, admin, envíos, pagos.',
    teaserTags: ['Next.js', 'Stripe', 'Admin propio'],
    lede: 'Ecommerce para una tienda de antigüedades, con sincronización de artículos diarios, pixel, cupones, admin, envíos y pagos.',
    problema: 'Pendiente: por qué un catálogo de piezas únicas rompe el modelo de ecommerce estándar.',
    solucion: 'Pendiente: cómo resolviste la sincronización diaria y el inventario de una sola unidad.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Tailwind', 'Vercel'],
    decisiones: [
      { n: '01', title: 'Pendiente: piezas únicas', note: 'Inventario de una unidad y reserva en checkout.' },
      { n: '02', title: 'Pendiente: sincronización diaria', note: 'De dónde llegan los artículos y qué pasa cuando fallan.' },
      { n: '03', title: 'Pendiente: envíos y cupones', note: 'Reglas por peso, zona y campaña.' },
    ],
    aprendizajes: [
      'Pendiente: aprendizaje sobre catálogos de piezas únicas.',
      'Pendiente: lo que el cliente necesitaba y no estaba en el brief.',
    ],
    shots: [
      { src: '/img/casos/piri-1.webp', alt: 'Home de Piri en mobile' },
      { src: '/img/casos/piri-2.webp', alt: 'Ficha de pieza en mobile' },
    ],
    resenas: [
      {
        q: '“Hola, la mejor tienda de antigüedades online, excelente atención y servicio. Recomendados al 10000”',
        by: 'marisol fernandez',
        item: 'Cafetera vintage Kockums Sweden peltre esmaltado blanco',
      },
      {
        q: '“Me encantaron las piezas que recibi. Llegaron pronto, en perfecto estado y cumplieron mls...”',
        by: 'Guillermo López Varela',
        item: 'Antiguo lote coleccionables Club Puebla FC revistas cuadro',
      },
    ],
  },
];
