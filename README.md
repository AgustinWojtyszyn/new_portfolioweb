# Agustín Wojtyszyn — diseño y desarrollo web

Portfolio comercial bilingüe realizado con Next.js 16, React 19 y TypeScript.

## Rediseño integral — noviembre 2026

La portada comunica desde el primer momento que Agustín diseña y desarrolla páginas web, tiendas online y aplicaciones a medida. El nuevo sistema visual alterna tinta oscura, verde lima y papel cálido. La experiencia no depende de imágenes remotas, WebGL ni animaciones pesadas.

- Portada comercial con ilustraciones originales de interfaces y botón directo para consultar.
- Presentación del valor del diseño y del desarrollo personalizado.
- Laboratorio interactivo de tres demostraciones (marca, tienda y sistema), cada una en versión clara y oscura.
- Tres servicios con gráficos originales y enlaces a sus páginas explicativas.
- Proceso de trabajo, presentación personal, contacto y navegación por secciones.
- Navegación móvil y contenido en español e inglés.
- Animaciones suaves con adaptación a preferencias de movimiento reducido.

Todas las vistas demostrativas están identificadas como ejemplos, no como proyectos de clientes. No se publican enlaces a aplicaciones empresariales privadas ni métricas inventadas.

## Archivos principales

- src/sections/cinema-home.tsx: nueva portada y secciones (nombre conservado por compatibilidad).
- src/components/live-showcase.tsx: galería interactiva clara/oscura.
- src/components/navigation.tsx: navegación para computadora y móvil.
- src/app/studio-showcase.css: identidad visual y diseño adaptable.
- src/app/[lang]/servicios/[slug]/page.tsx: páginas de servicios con contenido SEO.
- tests/cinematic-motion.spec.ts: nuevas pruebas de la portada, la interacción y el móvil.

## Verificaciones previas a publicar

Ejecutar en este orden: npm ci, npm run lint, npm run typecheck, npm run build y npm run test:e2e. Además, revisar el resultado visual, la navegación por teclado y el diseño a 320, 390, 768, 1440 y 1920 píxeles.
