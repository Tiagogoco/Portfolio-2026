import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

const archivo = readFile(join(process.cwd(), 'assets/fonts/Archivo-ExtraBold.ttf'));

/** iOS escala este icono para la pantalla de inicio y para las tarjetas de
    sugerencias de Safari. Sin él, Safari estira el favicon de 64 px y se ve
    pixelado. Sin radio ni margen: iOS recorta la esquina por su cuenta. */
export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000000',
          color: '#0071F2',
          fontSize: 124,
          fontWeight: 800,
          fontFamily: 'Archivo',
          letterSpacing: '-0.06em',
        }}
      >
        t
      </div>
    ),
    { ...size, fonts: [{ name: 'Archivo', data: await archivo, weight: 800, style: 'normal' }] },
  );
}
