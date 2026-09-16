import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

// Ejecutar con el sitio iniciado: npm run dev (o npm run start).
const baseURL = process.env.CV_BASE_URL || 'http://localhost:3000';
const output = new URL('../public/cv/', import.meta.url);
const browser = await chromium.launch();

try {
  const page = await browser.newPage({ viewport: { width: 816, height: 1056 } });
  const documents = [];

  for (const locale of ['es', 'en']) {
    const response = await page.goto(new URL(locale === 'es' ? '/cv' : '/cv/en', baseURL).href);
    if (!response?.ok()) throw new Error(`No se pudo cargar el CV: ${locale}`);
    await page.evaluate(() => document.fonts.ready);
    await page.emulateMedia({ media: 'print' });

    // Carta tiene menos altura que A4. Fallar si el contenido deja de caber,
    // en lugar de publicar una descarga con información cortada.
    const height = await page.locator('.cv-sheet').evaluate(element => element.getBoundingClientRect().height);
    const printableHeight = (279.4 - 20) * 96 / 25.4;
    if (height > printableHeight) throw new Error(`El CV ${locale} excede una página: ${height}px`);

    const pdf = await page.pdf({
      format: 'Letter',
      printBackground: true,
      displayHeaderFooter: false,
      preferCSSPageSize: true,
    });
    documents.push({ locale, pdf });
  }

  await mkdir(output, { recursive: true });
  for (const { locale, pdf } of documents) {
    await writeFile(new URL(`tiago-gomez-cv-${locale}.pdf`, output), pdf);
    console.log(`PDF actualizado: ${locale}`);
  }
} finally {
  await browser.close();
}
