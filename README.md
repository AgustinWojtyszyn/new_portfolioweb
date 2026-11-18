# Agustín Wojtyszyn — sitio web profesional

Sitio comercial bilingüe (español / inglés) para ofrecer páginas web, aplicaciones a medida y automatización a clientes no técnicos.

## Enfoque visual

- Identidad editorial oscura: tinta, marfil y acentos lima con jerarquía tipográfica y composición propia. El rediseño sigue principios de la guía pública de Hallmark; no se afirma una certificación del linter.
- Jerarquía comercial: qué ofrezco, casos reales, cómo trabajo y cómo contactarme.
- Sin emojis, stickers, dashboards ficticios, estadísticas inventadas ni videojuegos en portada.
- Portada con selector accesible de cuatro capturas reales, dirección artística diferenciada para web, aplicaciones y automatización, y soporte para movimiento reducido.
- Contacto mediante consulta que abre el cliente de correo del visitante, con opción de copiar texto. No se envían ni almacenan datos desde el sitio.
- Las páginas de trabajos ofrecen explicaciones comprensibles y detalles técnicos opcionales.

## Íconos

14 archivos SVG de Iconoir (MIT) integrados localmente, sin CDN, atribución y copyright preservados en public/iconoir/LICENSE.
Fuente: https://github.com/iconoir-icons/iconoir

## Comandos

npm ci
npm run lint
npm run typecheck
npm run build
npm run test:e2e

## Producción

El sitio utiliza Next.js y necesita que el servicio de hosting despliegue la rama main.
Establecer SITE_URL=https://agustinwojtyszyn.com en el entorno de compilación.

Nota: los cambios de GitHub no implican por sí solos que Render haya ejecutado un despliegue.
## Visuales propios (2026)

Se incorporaron capturas tomadas del repositorio propio de Análisis ServiFood, alojadas localmente en `public/portfolio-evidence/` (sin dependencias externas). Los recursos visuales de portada, proyecto destacado y galería muestran producto existente, no estadísticas ficticias. La interfaz real puede haber evolucionado desde estas capturas. El resto de diagramas de sistemas siguen siendo ilustraciones conceptuales identificadas como tales.

La galería es bilingüe, navegable con botones, permite ampliar una vista y mantiene un tratamiento de baja luminosidad para la interfaz oscura del portfolio.


## Visibilidad en buscadores y clientes (SEO)

- La web genera robots.txt y sitemap.xml, URL canónicas, idiomas alternativos y datos estructurados WebSite, Person y Service. El dominio oficial se aplica por defecto, incluso si falta SITE_URL.
- Hay páginas comerciales específicas en /es/servicios/paginas-web, /es/servicios/aplicaciones-a-medida y /es/servicios/automatizacion, y equivalentes /en/. Están enlazadas desde la portada.
- Search Console: verificar la propiedad del dominio con DNS en el proveedor de dominio, o configurar GOOGLE_SITE_VERIFICATION para verificación HTML. Después enviar el sitemap y consultar Inspección de URL. La verificación requiere acceso a la cuenta de Google.
- Analytics: crear un flujo web GA4, configurar NEXT_PUBLIC_GA_MEASUREMENT_ID con el ID G-... en Render y volver a desplegar. No se carga Google Analytics hasta que el visitante consiente. La página de privacidad explica esta medición.
- Perfil de Empresa en Google: solo corresponde si se cumplen las reglas de atención presencial. No inventar ubicaciones, direcciones, reseñas ni calificaciones.
- Pruebas: npm run lint, npm run typecheck, npm run build y npm run test:e2e. Los buscadores pueden tardar en rastrear los cambios y ningún ajuste garantiza posicionamiento.
