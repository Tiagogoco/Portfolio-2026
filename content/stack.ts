import type { CSSProperties } from 'react';

export type StackRow = { k: 'h' | 'i' | 'n'; t: string };

export const stackRows: StackRow[] = [
  { k: 'h', t: 'En producción (avanzado)' },
  { k: 'i', t: 'Next.js' },
  { k: 'i', t: 'TypeScript' },
  { k: 'i', t: 'PostgreSQL' },
  { k: 'i', t: 'Supabase' },
  { k: 'i', t: 'Stripe' },
  { k: 'i', t: 'Vercel' },
  { k: 'i', t: 'Tailwind' },
  {
    k: 'n',
    t: 'Agentes de IA como Claude Code, especializados (skills, mcps) para optimizar el flujo de trabajo.',
  },
  { k: 'h', t: 'He construido con esto' },
  { k: 'i', t: 'Python' },
  { k: 'i', t: 'Docker' },
  { k: 'i', t: 'Prisma' },
  { k: 'h', t: 'Explorando' },
  { k: 'i', t: 'React Framer' },
  { k: 'h', t: 'Lenguajes' },
  { k: 'n', t: 'TypeScript / JavaScript — mi eje, en producción.' },
  { k: 'n', t: 'Python — FastAPI, pandas, el lado de datos.' },
  { k: 'n', t: 'SQL (PostgreSQL)' },
];

/** Estilo por tipo de fila. §5.5 de la spec. */
export const rowStyle: Record<StackRow['k'], CSSProperties> = {
  h: {
    fontFamily: 'var(--font-mono)',
    fontWeight: 500,
    fontSize: 'clamp(11px, 1vw, 14px)',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: '#1F6FEB',
  },
  i: {
    fontFamily: 'var(--font-sans)',
    fontWeight: 800,
    fontSize: 'clamp(24px, 3.2vw, 50px)',
    letterSpacing: '-0.035em',
    textTransform: 'uppercase',
    color: '#1F1B16',
  },
  n: {
    fontFamily: 'var(--font-sans)',
    fontWeight: 600,
    fontSize: 'clamp(14px, 1.5vw, 21px)',
    letterSpacing: '-0.01em',
    textTransform: 'none',
    color: '#5a5449',
  },
};
