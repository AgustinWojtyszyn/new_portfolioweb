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