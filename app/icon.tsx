import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

/** Favicon generado a partir de la propia marca del sitio, no de la de un cliente. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1F6FEB',
          color: '#FBFAF8',
          fontSize: 44,
          fontWeight: 800,
          letterSpacing: '-0.06em',
        }}
      >
        t
      </div>
    ),
    size,
  );
}
