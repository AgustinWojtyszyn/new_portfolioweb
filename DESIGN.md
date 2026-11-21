# AW — Sistema visual vigente (noviembre de 2026)

## Objetivo
El visitante debe comprender en la primera pantalla que Agustín Wojtyszyn diseña y desarrolla páginas web, tiendas digitales y aplicaciones a medida. La página demuestra el oficio, pero nunca oculta lo que se ofrece.

## Dirección artística
- Combinar superficies de tinta muy oscura con papel cálido y un acento verde lima. Es un estudio digital editorial, no un catálogo oscuro de esculturas abstractas.
- La pieza emblemática es una composición original de una página web en escritorio y su adaptación móvil, sin barras de navegador ficticias, estadísticas o clientes inventados.
- Tipografía Manrope Variable alojada con la aplicación y Georgia como contraste editorial, sin descargar tipografías de terceros en cada visita.
- Reducir repetición de adornos, etiquetas en mayúsculas, estrellas y paneles simulados. Cada pantalla debe tener una composición útil.
- Respetar la identidad del autor y la privacidad de aplicaciones empresariales. Los ejemplos ficticios son conceptos claramente identificados como demostraciones.

## Experiencia y navegación
- Encabezado compacto en dispositivos móviles, contacto disponible en el menú y en el contenido.
- Tres demostraciones seleccionables (marca, tienda y sistema), con controles accesibles de vista clara y oscura.
- Navegación real a servicios, privacidad, GitHub, LinkedIn y correo. Conservar español e inglés.
- Variaciones de escala, fondo y composición entre secciones. Mantener claridad comercial y pocas llamadas a la acción bien situadas.

## Adaptación
- Nada de desplazamiento horizontal. Usar overflow-x: clip en html y body, contenedores centrados y columnas minmax(0,1fr).
- Comprobar 320, 360, 375, 390, 393, 412, 414, 430, 600, 700, 768, 1024, 1280, 1440 y 1920 píxeles.
- En móvil ningún elemento del encabezado debe superponerse ni salirse, y el botón de consulta debe permanecer visible sin recorrer toda la página.
- Interacciones táctiles de 44 px o más, foco visible, contenido accesible sin JavaScript y movimiento opcional bajo prefers-reduced-motion.

## Rendimiento
Sin WebGL obligatorio, vídeos decorativos, audio automático, desplazamiento interceptado ni dependencias de animación nuevas. Preferir CSS nativo, transiciones de transform/opacity y una galería de estado local en React.

## Referencias estudiadas; sin copiar código ni identidad
- Hallmark y tema Studio: https://github.com/Nutlope/hallmark
- Impeccable: https://github.com/pbakaus/impeccable
- Lume Studio Next: https://github.com/haramishra/lume-studio-next
- Vercel Web Interface Guidelines: https://github.com/vercel-labs/web-interface-guidelines
- Michael Kolesidis, portafolio creativo de código abierto (referencia de interacción, no assets): https://github.com/michaelkolesidis/michaelkolesidis.com

## Archivos activos
- src/sections/cinema-home.tsx — portada y secuencia comercial actual.
- src/components/navigation.tsx — barra y menú móvil.
- src/components/live-showcase.tsx — demostraciones interactivas.
- src/app/studio-showcase.css — estructura visual.
- src/app/studio-refinement.css — refinamientos visuales y adaptación de pantallas.
- src/app/studio-detail.css — páginas de servicios y privacidad.
- tests/mobile-visual-regression.spec.ts — protección contra cortes en celular.
Los antiguos estilos y componentes de cine permanecen en el repositorio como historial, pero no se importan en la experiencia principal.

## Barreras de calidad
npm ci
npm run lint
npm run typecheck
npm run build
npm run test:e2e

Estas pruebas se tienen que ejecutar, junto con capturas reales móviles y de escritorio. Un commit aceptado por GitHub no equivale a validación visual o funcional.