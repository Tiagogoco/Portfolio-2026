import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Tiago Gómez — Desarrollador y product designer';

/** OG del portafolio, con su propio contenido y paleta. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#FBFAF8',
          color: '#1F1B16',
          padding: 80,
        }}
      >
        <div style={{ display: 'flex', fontSize: 26, letterSpacing: '0.22em', color: '#a09889' }}>
          TIAGOGOCO
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 86,
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: '-0.045em',
            maxWidth: 900,
          }}
        >
          Creando productos digitales desde la idea, hasta producción
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ display: 'flex', width: 120, height: 6, background: '#1F6FEB' }} />
          <div style={{ display: 'flex', fontSize: 26, letterSpacing: '0.16em', color: '#5a5449' }}>
            PUEBLA · MÉXICO
          </div>
        </div>
      </div>
    ),
    size,
  );
}
