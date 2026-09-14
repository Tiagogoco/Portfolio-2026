export type Decision = { n: string; title: string; note: string };
export type Resena = { q: string; by: string; item: string };
export type Shot = { src: string; alt: string; w: number; h: number };
/** Captura de tarjeta: lleva sus dimensiones para que la caja adopte su proporción. */
export type CardShot = Shot & { w: number; h: number };

export type Project = {
  id: 'saint' | 'rankeo' | 'piri';
  n: '01' | '02' | '03';
  title: string;
  short: string;
  tab: string;
  kind: string;
  /** Año que se muestra en la píldora sobre la imagen. */
  year: string;
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
  cardShot: CardShot;
  globeBg: string;
  globeInk: string;
  globeBgHover: string;
  teaser: string;
  teaserTags: string[];
  lede: string;
  problemaLabel?: string;
  problema: string;
  solucion: string;
  stack: string[];
  decisiones: Decision[];
  aprendizajes: string[];
  shots: [Shot, Shot];
  resenas?: Resena[];
};

/** El rol no vive en `Project` porque es el mismo en los tres casos: los hice solo. */
export const rol = ['Full stack developer', 'APIs', 'UX', 'UI'];

export const projects: Project[] = [
  {
    id: 'saint',
    n: '01',
    title: 'SAINT PADEL',
    short: 'SAINT PADEL',
    tab: 'saint padel',
    kind: 'ecommerce de drops',
    year: '2025',
    href: 'https://saintpadel.com.mx',
    hrefExterno: true,
    accent: '#14664A',
    accentInk: '#ffffff',
    cardBg: '#E6EFFD',
    cardChipBorder: '#B9D1F4',
    cardChipInk: '#3f5a7d',
    cardTeaserInk: '#2a3b52',
    cardLabelInk: '#4a6382',
    cardShotBg: '#107C59',
    cardShot: { src: '/img/proyectos/saint-banner.webp', alt: 'Banner de Saint Padel: encuentra tu próxima pala', w: 1200, h: 630 },
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
      { src: '/img/casos/saint-1.webp', alt: 'Producto Metalbone Reserve 2026 de Saint Padel', w: 754, h: 1640 },
      { src: '/img/casos/saint-2.webp', alt: 'Catálogo filtrado por tipo de juego', w: 736, h: 1602 },
    ],
  },
  {
    id: 'rankeo',
    n: '02',
    title: 'RANKEO',
    short: 'RANKEO',
    tab: 'rankeo',
    kind: 'saas de torneos y ligas',
    year: '2025',
    href: 'https://rankeo.com.mx',
    hrefExterno: true,
    accent: '#2f3b23',
    accentInk: '#E8F3D8',
    cardBg: '#C6DDFD',
    cardChipBorder: '#9BC0F3',
    cardChipInk: '#2c5fa8',
    cardTeaserInk: '#22364f',
    cardLabelInk: '#3a5680',
    cardShotBg: '#020202',
    cardShot: { src: '/img/proyectos/rankeo.webp', alt: 'Banner de Rankeo: torneos, ligas y ranking', w: 712, h: 401 },
    globeBg: '#0F0F0F',
    globeInk: '#D8F24A',
    globeBgHover: '#000000',
    teaser:
      'Rankeo soluciona la gestión de torneos y ligas, un SAAS completo para clubs y organizadores de eventos de padel',
    teaserTags: ['Next.js', 'PostgreSQL', 'Tailwind'],
    lede: 'Rankeo soluciona la gestión de torneos y ligas: un SaaS completo para clubes y organizadores de eventos de padel.',
    problema:
      'Muchos clubs de pádel en México siguen utilizando herramientas manuales para gestionar lo central en el modelo de negocio de un club: las ligas y torneos.',
    solucion:
      'Rankeo ofrece una gestión automática, optimizada para los administradores y una experiencia profesional para los jugadores. Actualmente estoy trabajando en evolucionar Rankeo a una aplicación self service, con la visión de ser una plataforma referente de gestión de eventos de pádel.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Supabase', 'Stripe', 'Tailwind', 'Vercel'],
    decisiones: [
      {
        n: '01',
        title: 'El nivel es la unidad de la liga',
        note: 'Cada jornada cierra con un snapshot de ranking por nivel, y el ascenso o descenso queda guardado como un movimiento entre niveles en vez de recalcular la tabla entera. Un empate en el primer o el último puesto bloquea el cierre hasta que alguien lo resuelve.',
      },
      {
        n: '02',
        title: 'Cada club cobra con su propio Stripe',
        note: 'Las inscripciones se pagan en línea y el dinero entra directo a la cuenta del club, sin cuenta intermedia ni saldo que repartir después. Las llaves viven por club y solo se usan del lado del servidor.',
      },
      {
        n: '03',
        title: 'Los brackets son funciones puras',
        note: 'Eliminación simple y doble, round robin y grupos con playoff se generan sin tocar la base ni los horarios, así que cada formato se prueba solo. El ranking y el horario de cada jornada se exportan a PNG y PDF para reenviarlos al grupo de WhatsApp de los jugadores.',
      },
    ],
    aprendizajes: [
      'El mayor aprendizaje de Rankeo no fue desarrollándolo. Cuando tuve la primera versión aprendí a vender mi producto, a buscar retroalimentación de mis clientes y hacer mejoras iterativas en el producto.',
    ],
    shots: [
      { src: '/img/casos/rankeo-1.webp', alt: 'Ranking en mobile', w: 554, h: 1200 },
      { src: '/img/casos/rankeo-2.webp', alt: 'Partido o bracket en mobile', w: 560, h: 1200 },
    ],
  },
  {
    id: 'piri',
    n: '03',
    title: 'PIRI',
    short: 'PIRI',
    tab: 'piri',
    kind: 'ecommerce de antigüedades',
    year: '2025',
    href: 'https://piriantiguedades.com',
    hrefExterno: true,
    accent: '#3A2317',
    accentInk: '#F6E9D8',
    cardBg: '#A8CBFB',
    cardChipBorder: '#7FAEF0',
    cardChipInk: '#164b96',
    cardTeaserInk: '#16294a',
    cardLabelInk: '#274a7d',
    cardShotBg: '#591D26',
    cardShot: { src: '/img/proyectos/piri-marca.webp', alt: 'Identidad de Piri, antigüedades y vintage', w: 1600, h: 1000 },
    globeBg: '#3A2317',
    globeInk: '#F6E9D8',
    globeBgHover: '#2a1810',
    teaser:
      'Ecommerce para una tienda de antigüedades, con sincronización de articulos diarios, pixel, cupones, admin, envíos, pagos.',
    teaserTags: ['Next.js', 'Stripe', 'Admin propio'],
    lede: 'Ecommerce para una tienda de antigüedades, con sincronización de artículos diarios, pixel, cupones, admin, envíos y pagos.',
    problemaLabel: 'planteamiento',
    problema: 'PIRI no solo es un e-commerce, es la identidad de marca de un negocio que vivía solamente en Mercado Libre.',
    solucion: 'E-commerce propio vinculado a Mercado Libre vía API, sincronizando miles de productos. PIRI está creciendo con múltiples ventas, incluyendo internacionales, y tiene excelentes reseñas de experiencia de usuario.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Stripe', 'Mercado Libre API', 'Skydropx', 'Tailwind', 'Vercel'],
    decisiones: [
      {
        n: '01',
        title: 'La reserva nace antes del pago',
        note: 'Cada antigüedad es stock de una unidad, así que la orden se crea pendiente al abrir el checkout y expira a los treinta minutos. Quien llegue dentro de esa ventana recibe un aviso de pieza ocupada, no una segunda venta del mismo objeto.',
      },
      {
        n: '02',
        title: 'Mercado Libre manda, el sitio escucha',
        note: 'Un cron reconcilia el catálogo completo cada seis horas y los webhooks atienden el cambio individual. Todo entra por upsert contra el id de publicación, así que repetir una sincronización nunca duplica una pieza.',
      },
      {
        n: '03',
        title: 'Envío y cupón se resuelven en el servidor',
        note: 'La tarifa se cotiza con el peso y las dimensiones reales de la pieza, con tarifa manual de respaldo si el proveedor no responde. El cupón se revalida en el checkout y solo consume cupo cuando el pago se confirma, no cuando el cliente lo escribe.',
      },
    ],
    aprendizajes: [
      'Al ser socio de este negocio, me he involucrado mucho con el proyecto, aprendiendo todos los días a mejorar la conversión a través del diseño y escogiendo la mejor arquitectura en base a la necesidad inicial.',
    ],
    shots: [
      { src: '/img/casos/piri-1.webp', alt: 'Home de Piri en mobile', w: 559, h: 1200 },
      { src: '/img/casos/piri-2.webp', alt: 'Ficha de pieza en mobile', w: 559, h: 1200 },
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
