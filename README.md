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


## Secuencia visual 2026 (segunda etapa)

La experiencia ahora tiene una secuencia de tres actos que **se transforma con el avance real del desplazamiento**, sin secuestrar la rueda ni obligar al visitante a interactuar:

1. Una pieza metálica cambia de encuadre, escala y orientación.
2. La pieza cede el protagonismo a una composición tipográfica tridimensional.
3. Los elementos se reorganizan en una arquitectura visual original.

También hay una marquesina editorial continua, reflejos lentos, una composición tipográfica óptica, una escultura orbital y una retícula material en movimiento. Ninguno es un juego, un panel falso o un producto de un cliente.

La secuencia usa `IntersectionObserver`, eventos pasivos de desplazamiento y `requestAnimationFrame` limitado a los eventos. No se agregaron bibliotecas de animación ni se alteró el desplazamiento nativo. En ausencia de JavaScript o cuando el usuario prefiere menos movimiento, los tres capítulos aparecen como contenido estático y legible. La animación se detiene al salir de las secciones correspondientes según las capacidades del navegador.

Archivos nuevos: `src/components/cinematic-sequence.tsx`, `src/app/cinematic-motion.css`. Pruebas: `tests/cinematic-motion.spec.ts`.
