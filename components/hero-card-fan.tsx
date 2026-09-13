'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useTransform, type MotionValue } from 'motion/react';

import { clamp, stagger, useIsMobile, useReducedMotion, useSectionProgress } from '@/lib/scroll';

/**
 * El abanico se fija en pantalla y toda la animación ocurre mientras está fijo:
 * `useSectionProgress` mapea 0 → 1 exactamente sobre el recorrido anclado
 * (`--fan-pin` en CSS). Subir esa variable alenta el reveal sin tocar un solo
 * número de aquí abajo; el timing es relativo, no absoluto.
 *
 * El mazo NO se mueve en Y: nace en su sitio y se queda ahí. Lo único que
 * recorre el scroll es la extensión en X, con su rotación en abanico. Por eso
 * `y` es una constante (`-50%`, el centrado) y no un `MotionValue`.
 *
 * `open` (OPEN_START → 1): rankeo ancla en el extremo izquierdo y las demás se
 * extienden hacia su derecha, una tras otra. Antes de OPEN_START el mazo se
 * sostiene cerrado, con rankeo al frente y las otras cuatro asomando apenas.
 *
 * La pose de cada card sale de su `step` (0 = ancla, LAST = la más a la derecha),
 * que es a la vez orden de apilado, orden de salida y posición en el arco.
 *
 * Todos los desplazamientos van en % del propio tamaño de la card (así los
 * escribe `transform`), no del contenedor: cambiar `--fan-card-w` en CSS
 * reescala el abanico completo sin tocar estos números.
 */
const OPEN_START = 0.1; // el mazo se sostiene cerrado hasta aquí
const STAGGER = 0.11; // desfase entre cards, del ancla hacia la derecha

const DECK_X = 3.5; // % del ancho: cuánto asoma cada card detrás del ancla
const DECK_TILT = 2.2; // grados por step en el mazo
const DECK_SCALE = 1.06; // el mazo arranca un pelo más grande y se asienta

/** % del ancho de la card: separación entre cards en el arco abierto. */
const SPREAD_X = 68;
const SPREAD_X_MOBILE = 50; // más traslape para que las cinco quepan sin achicarse de más
const ARC_TILT = 9; // grados del extremo respecto al centro del arco

const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

type FanCard = {
  id: string;
  slug: string;
  label: string;
  surface: string;
};

/** Orden del array = step: rankeo ancla a la izquierda, las demás a su derecha. */
const CARDS: FanCard[] = [
  { id: 'rankeo', slug: 'rankeo', label: 'Ver el caso de Rankeo', surface: 'hero-fan-rankeo' },
  { id: 'saint', slug: 'saint', label: 'Ver el caso de Saint Padel', surface: 'hero-fan-saint' },
  { id: 'piri-web', slug: 'piri', label: 'Ver el caso de Piri', surface: 'hero-fan-shot' },
  { id: 'piri', slug: 'piri', label: 'Ver el caso de Piri', surface: 'hero-fan-piri' },
  { id: 'rankeo-app', slug: 'rankeo', label: 'Ver el caso de Rankeo', surface: 'hero-fan-shot' },
];

const LAST = CARDS.length - 1;
const OPEN_WINDOW = 1 - LAST * STAGGER;

/** Pose final de cada card sobre el arco, centrado en el contenedor. */
function arcPose(step: number, spread: number) {
  const curve = (2 * step) / LAST - 1; // -1 → 0 → 1: los extremos giran por igual
  return {
    x: (step - LAST / 2) * spread,
    rotate: curve * ARC_TILT,
  };
}

/** Ranking de muestra que vive dentro de la card de Rankeo. */
const RANKING = [
  { pos: '1', player: 'M. Álvarez', pts: '2480' },
  { pos: '2', player: 'J. Rueda', pts: '2145' },
  { pos: '3', player: 'A. Solís', pts: '1990' },
];

/**
 * Abanico de proyectos: el mazo se fija en pantalla y se abre en arco con el
 * scroll. Es el único tratamiento de portada en todos los breakpoints; en móvil
 * abre las mismas cinco cards, solo que más juntas.
 */
export function HeroCardFan({ children }: { children?: React.ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const section = useSectionProgress(track);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const progress = useTransform(section, (v) => (reduced ? 1 : clamp(v)));

  const spread = isMobile ? SPREAD_X_MOBILE : SPREAD_X;

  return (
    <div ref={track} className="hero-fan-track">
      <div className="hero-fan-stage">
        <div className="hero-card-fan" role="group" aria-label="Proyectos destacados">
          {CARDS.map((card, index) => (
            <FanTile key={card.id} card={card} order={index} spread={spread} progress={progress}>
              {card.id === 'saint' && (
                <span className="hero-fan-logo hero-fan-logo-saint">
                  <Image src="/img/proyectos/hero-fan-saint.png" alt="" fill sizes="(max-width: 767px) 17vw, 150px" className="object-contain" />
                </span>
              )}
              {card.id === 'rankeo' && <RankeoBoard />}
              {card.id === 'piri' && (
                <span className="hero-fan-logo hero-fan-logo-piri">
                  <Image src="/img/proyectos/hero-fan-piri.png" alt="" fill sizes="(max-width: 767px) 22vw, 200px" className="object-contain" />
                </span>
              )}
              {card.id === 'piri-web' && (
                <Image src="/img/proyectos/hero-piri.webp" alt="" fill sizes="(max-width: 767px) 31vw, 280px" className="object-cover" />
              )}
              {card.id === 'rankeo-app' && (
                <Image src="/img/proyectos/hero-rankeo.webp" alt="" fill sizes="(max-width: 767px) 31vw, 280px" className="object-cover" />
              )}
            </FanTile>
          ))}
        </div>
        {children}
      </div>
    </div>
  );
}

function FanTile({
  card,
  order,
  spread,
  progress,
  children,
}: {
  card: FanCard;
  order: number;
  spread: number;
  progress: MotionValue<number>;
  children: React.ReactNode;
}) {
  /** Apertura escalonada: la card de más a la izquierda arranca primero. */
  const open = useTransform(progress, (v) =>
    stagger(clamp((v - OPEN_START) / (1 - OPEN_START)), order, STAGGER, OPEN_WINDOW),
  );

  const arc = arcPose(order, spread);
  const x = useTransform(open, (v) => `${-50 + lerp(order * DECK_X, arc.x, v)}%`);
  const rotate = useTransform(open, (v) => lerp(order * DECK_TILT, arc.rotate, v));
  const scale = useTransform(open, (v) => lerp(DECK_SCALE, 1, v));

  return (
    <motion.div
      data-motion="hero-fan"
      className={`hero-fan-card ${card.surface}`}
      style={{ x, y: '-50%', rotate, scale, zIndex: CARDS.length - order }}
    >
      <Link href={`/proyectos/${card.slug}`} aria-label={card.label} className="hero-fan-link">
        {children}
      </Link>
    </motion.div>
  );
}

function RankeoBoard() {
  return (
    <span className="hero-fan-board" aria-hidden="true">
      <span className="hero-fan-board-brand">
        rank<span>eo</span>
      </span>
      <span className="hero-fan-board-rows">
        {RANKING.map((row) => (
          <span key={row.pos} className="hero-fan-board-row">
            <span className="hero-fan-board-pos">{row.pos}</span>
            <span className="hero-fan-board-player">{row.player}</span>
            <span className="hero-fan-board-pts">{row.pts}</span>
          </span>
        ))}
      </span>
    </span>
  );
}
