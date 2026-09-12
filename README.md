# Agustín Wojtyszyn / System Atlas

Portfolio bilingüe construido con Next.js App Router, TypeScript y React. Tipografías locales Manrope e IBM Plex Mono; diagramas SVG/CSS propios y una interpretación procedural de MIDNIGHT PASS en Canvas 2D, cargada en un chunk separado. No carga el juego ni necesita WebGL.

## Desarrollo

```sh
npm ci
npm run dev
```

Abrir http://localhost:3000/es. Inglés: `/en`. Los cinco casos tienen rutas independientes en `/{es,en}/work/{slug}`. El selector de idioma conserva el caso actual.

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

## Publicación

Definir `SITE_URL` con el origen HTTPS definitivo antes del build (sin barra final), por ejemplo mediante las variables del proveedor de hosting. Se utiliza en canonical, alternates, OpenGraph, schema y sitemap. Sin esta variable, la versión local utiliza localhost y solicita no indexar. No hay dominio de producción inventado.

Render: servicio web Node, build `npm ci && npm run build`, start `npm start -- --port $PORT`. Compatible con un despliegue estándar de Next.js. Esta entrega no publica el sitio ni modifica repositorios remotos.

## Estructura

- `src/app/[lang]`: home, layouts y rutas de casos.
- `src/content`: copy ES/EN y modelo de proyectos.
- `src/sections`: secciones de la home.
- `src/components`: navegación, atlas, diagramas y escena de carretera.
- `src/lib`: identidad, idioma y configuración del sitio.
- `src/app/globals.css`: sistema visual y responsive.
- `src/app/opengraph-image.tsx`: imagen social original de 1200 × 630.

## Contenido y alcance

El briefing del propietario es fuente de experiencia, fechas, tecnologías y alcance de los productos. La consulta de metadata pública de GitHub identificó repositorios originales y forks. Se revisaron además documentación y símbolos de proyectos locales. LinkedIn no permitió lectura; no se atribuyen verificaciones a esa fuente.

Los enlaces de los cuatro sistemas empresariales corresponden a repositorios públicos observados durante la consulta. MIDNIGHT PASS se documentó desde material local y enlaza al repositorio público Midnight_pass indicado por el propietario. ServiFood Orders enlaza a App_de_pedidos. Los proyectos pequeños se muestran como evolución, sin presentar forks como autoría propia.

Las visualizaciones son diagramas conceptuales, no capturas reales ni telemetría de producción. No se copiaron datos empresariales, credenciales o archivos privados. Las etiquetas de 60 Hz y tres cámaras describen el proyecto MIDNIGHT PASS, no el rendimiento del portfolio. No se afirman uptime, cantidad de clientes, disponibilidad laboral ni métricas de impacto no comprobadas.

La primera versión incluye enlaces directos a email, LinkedIn, GitHub y WhatsApp. El contacto no depende de un formulario o backend. Quedan para una siguiente iteración capturas reales autorizadas y mediciones de rendimiento sobre el dominio definitivo.

## Movimiento incremental

Se conserva la composición editorial original y sus diagramas. `src/components/motion-layer.tsx` coordina reveals con IntersectionObserver, progreso de scroll y parallax de hasta 7 px; `src/app/motion.css` contiene la capa visual. El Atlas dibuja conexiones, presenta etiquetas en secuencia y responde al puntero. Los proyectos usan señales abstractas, sin capturas ni métricas simuladas de producción.

MIDNIGHT PASS conserva la carretera original: líneas en movimiento, ruta ilustrada y desplazamiento de cámara mínimo. La animación se detiene fuera de pantalla y con la pestaña oculta; limita resolución y frecuencia en móviles. El botón de pausa detiene también la ruta. `prefers-reduced-motion` desactiva reveals, parallax y animaciones, y el contenido sigue accesible sin JavaScript.

Pruebas de navegador: `npm run test:e2e` (puerto 3100). Edad de 26 años: dato provisto por el propietario, actualización manual.
