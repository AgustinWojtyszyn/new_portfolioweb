# Agustín Wojtyszyn — sitio web profesional

Sitio comercial bilingüe (español / inglés) para ofrecer páginas web, aplicaciones a medida y automatización a clientes no técnicos.

## Enfoque visual

- Identidad editorial: blanco cálido, tipografía oscura, azul y composición gráfica propia.
- Jerarquía comercial: qué ofrezco, casos reales, cómo trabajo y cómo contactarme.
- Sin emojis, stickers, dashboards ficticios, estadísticas inventadas ni videojuegos en portada.
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
