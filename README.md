# Tiago Gómez · Portafolio

Soy desarrollador web y product designer en Puebla, México. Me gusta entender cómo funciona un negocio, diseñar una experiencia clara y construir el producto que la hace posible.

Este portafolio reúne una selección de mi trabajo y cuenta cómo abordo los proyectos: el problema inicial, las decisiones que tomé y lo que aprendí al llevarlos a producción.

## Proyectos

- **Saint Padel:** una tienda de palas de padel organizada por lanzamientos, con productos disponibles para envío y bajo pedido.
- **Rankeo:** una plataforma para torneos, ligas y rankings de padel en Puebla.
- **Piri:** un buscador de antigüedades y coleccionables.

Cada caso presenta el contexto del proyecto, la solución y algunas de las decisiones detrás del producto.

## Sobre el sitio

El diseño combina tipografía de gran formato, imágenes de los proyectos y animaciones que acompañan el recorrido. También incluye información sobre mi forma de trabajar, mi experiencia y cómo contactarme.

Está construido con Next.js, React y TypeScript.

## Ejecutarlo en local

```bash
npm ci
npm run dev
```

Abre [localhost:3000](http://localhost:3000) para ver el sitio. Para generar la versión de producción, ejecuta `npm run build`.

## Actualizar el CV

Las rutas `/cv` y `/cv/en` comparten el contenido de `content/cv.ts`.
El botón de descarga entrega un PDF generado previamente para evitar que
Safari en iPhone cambie la paginación.

Después de modificar el contenido o los estilos del CV, inicia el sitio y,
en otra terminal, regenera ambos archivos:

```bash
npx playwright install chromium
npm run cv:pdf
```

Si usas otro puerto, indica `CV_BASE_URL=http://localhost:3001`.
Revisa los dos PDF en `public/cv/` y súbelos junto con los cambios del CV.

## Contacto

[Correo](mailto:tiagogocor@gmail.com) · [LinkedIn](https://www.linkedin.com/in/tiago-gomez-dev/) · [GitHub](https://github.com/Tiagogoco)
