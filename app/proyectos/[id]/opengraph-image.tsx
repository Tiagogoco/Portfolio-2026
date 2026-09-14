import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { notFound } from 'next/navigation';
import { projects } from '@/content/projects';

/** `ImageResponse` no hereda las fuentes del sitio: sin esto el `fontWeight`
    se ignora y el titular sale fino, que no es lo que muestra el banner del
    home. El .ttf vive en el repo para no depender de Google en cada build. */
const archivo = readFile(join(process.cwd(), 'assets/fonts/Archivo-ExtraBold.ttf'));

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
/** Genérico a propósito: el nombre del caso ya se lee dentro de la imagen, y un
    `alt` por proyecto obligaría a `generateImageMetadata`, que aquí choca con
    `generateStaticParams`. */
export const alt = 'Caso de estudio en el portafolio de Tiago Gómez';

/** Sin esto la ruta sería dinámica y cada scraper pagaría la generación. */
export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

/** Misma paleta que el banner del home (negro, blanco, punto azul) para que al
    compartir un caso se lea como parte del mismo sitio y no como otra marca. */
export default async function ProjectOpenGraphImage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) notFound();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#000000',
          padding: 80,
          fontFamily: 'Archivo',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', color: '#FFFFFF', fontSize: 34, fontWeight: 700, letterSpacing: '-0.04em' }}>
          tiagogoco
          <div style={{ display: 'flex', width: 12, height: 12, marginLeft: 6, borderRadius: '50%', background: '#0071F2' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', color: '#FFFFFF', fontSize: 112, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.05em' }}>
            {project.title}
          </div>
          <div style={{ display: 'flex', marginTop: 26, color: '#8A8A8A', fontSize: 34, letterSpacing: '-0.02em' }}>
            {project.kind}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ display: 'flex', width: 120, height: 6, background: '#0071F2' }} />
          <div style={{ display: 'flex', fontSize: 26, letterSpacing: '0.16em', color: '#8A8A8A' }}>
            {project.year}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Archivo', data: await archivo, weight: 800, style: 'normal' }],
    },
  );
}
