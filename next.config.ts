import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // El repo vive dentro de una carpeta con un package-lock.json ajeno más arriba.
  turbopack: { root: __dirname },
};

export default nextConfig;
