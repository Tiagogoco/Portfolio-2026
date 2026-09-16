import { EMAIL } from '@/content/site';

/**
 * Fuente única del CV, en español e inglés. Las rutas `/cv` y `/cv/en` sólo lo
 * pintan. Después de editarlo, ejecutar `npm run cv:pdf` con el sitio en local
 * para actualizar también los dos PDF descargables en public/cv.
 *
 * El inglés no es traducción literal del español: cada versión está redactada
 * en su idioma. Al tocar una, revisar la otra — `CvContent` obliga a que ambas
 * tengan la misma forma, pero no a que digan lo mismo.
 *
 * Todo lo que se afirma aquí tiene que ser verificable.
 *
 * Los `period` salen del primer commit de cada repo, no de memoria:
 * PIRI `piri.git` 2026-03-29, Rankeo `Tournament-Bracket-Platform.git`
 * 2026-04-06, Saint Padel `saint-padel-shop.git` 2026-07-21.
 */

export type CvLocale = 'es' | 'en';

export type CvRole = {
  org: string;
  role: string;
  period: string;
  site: { label: string; href: string };
  bullets: string[];
};

/** Trabajo de clase, sin desplegar: va en su propia sección y con su etiqueta,
 *  nunca mezclado con la experiencia, que es trabajo pagado y en producción. */
export type CvAcademicProject = {
  title: string;
  org: string;
  /** Que fue en equipo se declara aquí, y las viñetas reclaman sólo la parte
   *  propia. Al revés —callar el equipo y narrar en primera persona— es lo que
   *  se cae en la entrevista. */
  context: string;
  period: string;
  bullets: string[];
};

export type CvContent = {
  headline: string;
  location: string;
  labels: {
    profile: string;
    skills: string;
    education: string;
    languages: string;
    experience: string;
    academic: string;
    download: string;
  };
  profile: string[];
  experience: CvRole[];
  academic: CvAcademicProject;
  skills: { title: string; items: string }[];
  education: { school: string; degree: string; detail: string; status: string[] };
  languages: { title: string; detail: string }[];
};

/** Datos que no cambian entre idiomas. */
export const cvIdentity = {
  name: 'Tiago Gómez Cordero',
  phone: { label: '+52 221 300 1590', href: 'tel:+522213001590' },
  email: EMAIL,
  links: [
    { label: 'tiagogoco.com', href: 'https://www.tiagogoco.com' },
    { label: 'github.com/Tiagogoco', href: 'https://github.com/Tiagogoco' },
    {
      label: 'linkedin.com/in/tiago-gomez-dev',
      href: 'https://www.linkedin.com/in/tiago-gomez-dev/',
    },
  ],
};

const piriSite = { label: 'piriantiguedades.com', href: 'https://piriantiguedades.com' };
const rankeoSite = { label: 'rankeo.com.mx', href: 'https://rankeo.com.mx' };
const saintSite = { label: 'saintpadel.com.mx', href: 'https://saintpadel.com.mx' };

export const cv: Record<CvLocale, CvContent> = {
  es: {
    headline: 'Full Stack Developer · Web Product Designer',
    location: 'Puebla, México',
    labels: {
      profile: 'Perfil',
      skills: 'Habilidades',
      education: 'Formación',
      languages: 'Idiomas',
      experience: 'Experiencia',
      academic: 'Proyecto académico',
      download: 'Descargar PDF',
    },
    profile: [
      'Desarrollo productos web que operan en producción: APIs, paneles de administración y tableros analíticos sobre PostgreSQL. Trabajo de punta a punta y aíslo la lógica crítica en módulos con pruebas.',
      'Busco prácticas profesionales donde sumarme a un equipo de ingeniería.',
    ],
    experience: [
      {
        org: 'PIRI Antigüedades',
        role: 'Socio · Full Stack y diseño de producto',
        period: 'Marzo 2026 — Actual',
        site: piriSite,
        bullets: [
          'Construí el e-commerce y el branding de un negocio de antigüedades que sostiene 90+ ventas mensuales en Mercado Libre, con pagos vía Stripe, apartado de piezas y cotización de envíos.',
          'Sincronizo un catálogo de 4,300+ piezas únicas desde la API de Mercado Libre con webhooks y un cron cada 6 horas: proceso por lotes para evitar timeouts y escribo de forma idempotente para no duplicar inventario.',
          'Desarrollé el panel administrativo del negocio: tablero de utilidad estimada, margen e inventario inmovilizado, alta y configuración de cupones, auditoría de publicaciones y envíos por paquetería.',
        ],
      },
      {
        org: 'Rankeo',
        role: 'Producto propio · Full Stack y diseño de producto',
        period: 'Abril 2026 — Actual',
        site: rankeoSite,
        bullets: [
          'Desarrollé la plataforma de torneos y ligas de pádel que usan Urban Padel y Padelex: inscripciones con pago en línea, rankings y cuatro formatos de competencia.',
          'Aislé los motores de torneo, liga y programación de partidos como TypeScript puro y determinista, con pruebas en Vitest que contrastan el horario optimizado contra un validador de restricciones.',
          'Con ella se han operado 2 torneos y 1 liga en Urban Padel; hoy desarrollo los espacios de trabajo que dejarán a cada club administrar la plataforma por su cuenta.',
        ],
      },
      {
        org: 'Saint Padel',
        role: 'Freelance · Full Stack y diseño de producto',
        period: 'Julio 2026 — Actual',
        site: saintSite,
        bullets: [
          'Diseñé y desarrollé un e-commerce de equipo de pádel por lanzamientos, con inventario y preventas dentro del mismo flujo de compra.',
          'Implementé reglas de disponibilidad y fechas de entrega para preventas, pagos con Stripe y seguimiento administrativo de pedidos.',
        ],
      },
    ],
    academic: {
      title: 'Tablero BI · Distribución del gasto público en Puebla',
      org: 'BUAP',
      context: 'Proyecto escolar en equipo',
      period: 'Mayo — Junio 2026',
      bullets: [
        'Construí un ETL en Python sobre seis fuentes de datos públicas (EFIPEM, PEF, ITER): normalicé codificaciones mixtas y formatos ancho/largo, y cargué el resultado en un modelo estrella en PostgreSQL.',
        'Expuse el análisis con FastAPI y un tablero en Streamlit y Plotly: coeficiente de Gini del gasto municipal y correlación de Pearson entre gasto social y rezago en los 217 municipios del estado.',
      ],
    },
    skills: [
      { title: 'Frontend', items: 'React, Next.js, TypeScript, Tailwind CSS' },
      {
        title: 'Backend e integraciones',
        items: 'PostgreSQL, Supabase, Prisma, APIs REST, Stripe, Mercado Libre',
      },
      { title: 'Datos y análisis', items: 'Python, pandas, FastAPI' },
      { title: 'Diseño de producto', items: 'Figma, interfaces, flujos de usuario, branding' },
      { title: 'Herramientas y calidad', items: 'Git, GitHub, Vercel, Vitest' },
    ],
    education: {
      school: 'BUAP',
      degree: 'Ingeniería en Tecnologías de la Información',
      detail: 'Benemérita Universidad Autónoma de Puebla',
      status: ['Último año', 'Graduación estimada: agosto de 2027'],
    },
    languages: [
      { title: 'Español', detail: 'Nativo' },
      { title: 'Inglés B2', detail: 'Leo documentación técnica y sostengo conversación' },
    ],
  },

  en: {
    headline: 'Full Stack Developer · Web Product Designer',
    location: 'Puebla, Mexico',
    labels: {
      profile: 'Profile',
      skills: 'Skills',
      education: 'Education',
      languages: 'Languages',
      experience: 'Experience',
      academic: 'Academic project',
      download: 'Download PDF',
    },
    profile: [
      'I build web products that run in production: APIs, back offices and analytical dashboards on top of PostgreSQL. I work end to end and isolate the critical logic into tested modules.',
      'Looking for a professional internship where I can join an engineering team.',
    ],
    experience: [
      {
        org: 'PIRI Antigüedades',
        role: 'Partner · Full Stack and Product Design',
        period: 'March 2026 — Present',
        site: piriSite,
        bullets: [
          'Built the storefront and the branding for an antiques business that sustains 90+ monthly sales on Mercado Libre, with Stripe payments, item holds and shipping quotes.',
          'I sync a catalog of 4,300+ one-of-a-kind items from the Mercado Libre API through webhooks and a 6-hour cron: I process in batches to avoid timeouts and write idempotently so inventory never duplicates.',
          'Built the back office: a dashboard for estimated profit, margin and idle inventory, coupon creation and setup, listing audits, and carrier shipping configuration.',
        ],
      },
      {
        org: 'Rankeo',
        role: 'Own product · Full Stack and Product Design',
        period: 'April 2026 — Present',
        site: rankeoSite,
        bullets: [
          'Built the padel tournament and league platform used by Urban Padel and Padelex: online registration and payments, rankings, and four competition formats.',
          'Isolated the tournament, league and match-scheduling engines as pure deterministic TypeScript, with Vitest tests that check the optimized schedule against a constraint validator.',
          'Two tournaments and one league have run on it at Urban Padel; I am currently building the workspaces that will let each club administer the platform on its own.',
        ],
      },
      {
        org: 'Saint Padel',
        role: 'Freelance · Full Stack and Product Design',
        period: 'July 2026 — Present',
        site: saintSite,
        bullets: [
          'Designed and built a drop-based e-commerce for padel gear, with inventory and pre-orders inside a single checkout flow.',
          'Implemented availability rules and delivery dates for pre-orders, Stripe payments and order tracking for the admin.',
        ],
      },
    ],
    academic: {
      title: 'BI dashboard · Public spending across Puebla',
      org: 'BUAP',
      context: 'Academic team project',
      period: 'May — June 2026',
      bullets: [
        'Built a Python ETL over six public data sources (EFIPEM, PEF, ITER): I normalized mixed encodings and wide/long shapes, then loaded the result into a star schema in PostgreSQL.',
        'Served the analysis through FastAPI and a Streamlit and Plotly dashboard: Gini coefficient for municipal spending and Pearson correlation between social spending and deprivation across the 217 municipalities of the state.',
      ],
    },
    skills: [
      { title: 'Frontend', items: 'React, Next.js, TypeScript, Tailwind CSS' },
      {
        title: 'Backend and integrations',
        items: 'PostgreSQL, Supabase, Prisma, REST APIs, Stripe, Mercado Libre',
      },
      { title: 'Data and analysis', items: 'Python, pandas, FastAPI' },
      { title: 'Product design', items: 'Figma, interfaces, user flows, branding' },
      { title: 'Tooling and quality', items: 'Git, GitHub, Vercel, Vitest' },
    ],
    education: {
      school: 'BUAP',
      degree: 'BEng in Information Technology',
      detail: 'Benemérita Universidad Autónoma de Puebla',
      status: ['Final year', 'Expected graduation: August 2027'],
    },
    languages: [
      { title: 'Spanish', detail: 'Native' },
      { title: 'English B2', detail: 'I read technical documentation and hold conversations' },
    ],
  },
};
