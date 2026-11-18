# Agustín Wojtyszyn — Experiencias digitales

Portfolio bilingüe de diseño y desarrollo independiente, creado con Next.js 16 y React 19.

La página es una exhibición visual original: no hay minijuegos, configuradores, paneles falsos, capturas de clientes ni cifras inventadas. El visitante recorre una composición cinematográfica de tipografía, material cromado y movimiento sutil, con una invitación clara a contratar.

## Arquitectura

- `src/sections/cinema-home.tsx` — portada comercial en español e inglés.
- `src/components/cinema-art.tsx` — escultura SVG original y otras piezas visuales.
- `src/app/cinema.css` — sistema visual y movimiento accesible, pensado primero para celulares.
- `src/components/navigation.tsx` — marca tipográfica, navegación y selector de idioma.
- `src/app/[lang]/servicios/[slug]/page.tsx` — páginas SEO de los servicios.
- `src/app/[lang]/privacidad/page.tsx` — política de contacto y medición.

## Reglas de diseño

La experiencia debe poder observarse, no jugarse. No hay animaciones atadas al puntero, audio automático ni dependencias WebGL. Las piezas visuales son SVG/CSS y se desactivan con `prefers-reduced-motion`. El contenido esencial sigue siendo HTML normal, navegable sin JavaScript.

## Verificación

```bash
npm ci
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

La automatización valida acceso móvil, adaptación de 320 a 1920 píxeles, idioma, enlaces, SEO, contraste de texto y funcionamiento con movimiento reducido.

El proyecto se publica desde la rama `main`, tras comprobar el resultado visual en celular y escritorio.

### Referencias de diseño

Los principios se estudiaron en Hallmark, Jesper Landberg, Meer Mohsin, Gionatan Nese y portfolios abiertos de Next.js. No se copiaron sus piezas, capturas ni código protegido.
