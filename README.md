# Agustín Wojtyszyn — portfolio como experiencia

Sitio comercial bilingüe (español e inglés) construido con Next.js y React. En lugar de mostrar productos internos de clientes, **demuestra lo que puedo diseñar y programar directamente en la web**.

## Experiencias interactivas

- **Lienzo generativo:** tres escenas originales — Flujo, Órbita y Forma — que reaccionan al cursor y al tacto. Animación pausada fuera de pantalla, al ocultar la pestaña y cuando el usuario prefiere menos movimiento.
- **Estudio tipográfico:** el visitante escribe su marca y puede probar direcciones Monumento, Editorial y Señal, además de ajustar la escala.
- **Identidad:** negro grafito, cobre oscuro, tipografía editorial, navegación sin logo artificial y superficies exclusivamente oscuras.
- **Contacto:** consulta que prepara un correo con los datos ingresados; opción de copiar el texto. No hay base de datos de consultas ni envío automático.
- **Comercial:** páginas de servicios de web, aplicaciones a medida y automatización, FAQs y SEO bilingüe.

Los trabajos de clientes no figuran en la portada ni en el mapa de páginas; las rutas históricas de casos quedaron fuera de la navegación pública y con `noindex`. No se publica ninguna URL privada de sus aplicaciones.

## Código de referencia

- `src/sections/atelier-home.tsx` — portada y contacto.
- `src/components/creative-field.tsx` — Canvas2D interactivo.
- `src/components/type-playground.tsx` — laboratorio de marca.
- `src/components/navigation.tsx` — navegación y selector ES/EN.
- `src/app/atelier.css` — tokens, composición, adaptación y accesibilidad.
- `DESIGN.md` — criterios de dirección artística para mantener coherencia.

Los estilos de presentación antiguos quedan aislados en las rutas históricas de casos, sin imponerse a la nueva página.

## Validación

```bash
npm ci
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

Las pruebas verifican contenidos comerciales, interacciones reales, navegación de teclado, preferencias de movimiento, lectura sin JavaScript, SEO y geometría móvil/escritorio desde 320 hasta 1920 píxeles.

## Publicación

El sitio se compila desde `main` en el servicio de alojamiento configurado. Establecer `SITE_URL=https://agustinwojtyszyn.com` al compilar.

Publicar cambios en GitHub no confirma por sí solo que Render haya completado el despliegue. Verificar el estado del servicio antes de anunciar cambios en producción.

## Privacidad y medición

Se preservan `robots.txt`, `sitemap.xml`, URL canónicas, idiomas alternativos, JSON-LD `WebSite`, `Person`, `Service` y las páginas comerciales. `NEXT_PUBLIC_GA_MEASUREMENT_ID` habilita GA4 solo tras consentimiento explícito. La página de privacidad explica el contacto y la medición opcional.

## Referencias

La dirección artesanal se apoya en los principios de Hallmark v2, y estudia portfolios creativos de código abierto. No se copiaron assets, código ni diseños enteros de terceros.
