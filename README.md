# Agustín Wojtyszyn — Portfolio / System Atlas

Portfolio bilingüe (es/en) realizado con **Next.js, React y TypeScript**, con diseño responsive, ilustraciones SVG originales y casos documentados.

## Contenido actualizado · octubre de 2026

- **ServiFood Orders:** pedidos corporativos, menús, permisos, sedes, remitos, reportes y automatización.
- **ServiFood Tracking:** trabajos diarios, mantenimiento, vehículos, kilometraje, activos e informes.
- **ServiFood Analytics / Calidad:** Excel, documentación SGC, certificaciones, desvíos e inspecciones BPM.
- **gestiQa:** gestión documental multiempresa, flujos de aprobación, versiones, roles y requisitos ISO.
- **RPG Premium:** roguelite top-down en desarrollo para PC y Android con Godot 4.7; el nombre definitivo todavía está en definición.

Los repositorios privados se presentan mediante casos documentados, sin enlaces al código inaccesible al público. El repositorio público del juego es `roguelike_premium`. El sitio no contiene datos privados ni capturas de sistemas internos.

## Ejecutar

```bash
npm ci
npm run dev
```

Español: `http://localhost:3000/es` · Inglés: `http://localhost:3000/en`.

## Verificaciones

```bash
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm run test:e2e
```

Para las pruebas de navegador, Playwright levanta el servidor en el puerto 3100. CI comprueba lint, TypeScript, compilación y pruebas de interfaz. Se omite `public/vida-game/**` en ESLint porque es una exportación generada de Godot, no código fuente del sitio.

## Publicación

Establecer `SITE_URL=https://agustinwojtyszyn.com` en el entorno de compilación. Render puede construir el sitio con `npm ci && npm run build` e iniciarlo con `npm start -- --port $PORT`, según la configuración del servicio.

## Diseño y accesibilidad

El sitio usa fuentes locales Manrope e IBM Plex Mono, navegación con teclado, enlaces bilingües, secciones semánticas y `prefers-reduced-motion`. La ilustración de RPG Premium es arte conceptual vectorial original **no una captura del videojuego**. Los diagramas de sistemas son representaciones conceptuales, no datos reales ni métricas inventadas.

El repositorio `public/vida-game` conserva una exportación web del proyecto VIDA en su ruta independiente; no forma parte del nuevo bloque de proyectos destacados.
