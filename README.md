# Lee Cuentitos

Sitio estático de cuentos infantiles. Astro + Tailwind, desplegado en Cloudflare Pages.

- **Web:** https://leecuentitos.com
- **Panel para escribir:** https://app.pagescms.org (conectado a este repositorio)
- **Repositorio:** GitHub `christianhimmer/lee-cuentitos`

## Estado

- Producción: https://leecuentitos.com (Cloudflare Pages, certificado activo)
- Preview: https://leecuentitos.pages.dev
- Repositorio: https://github.com/christianhimmer/lee-cuentitos

## Stack

| Pieza | Qué hace |
|---|---|
| [Astro 5](https://astro.build) | Genera HTML estático, cero JS innecesario |
| Tailwind CSS 4 | Estilos |
| Bitter + Atkinson Hyperlegible | Tipografía editorial / lectura infantil |
| Paleta del kit Elementor | Tyrian purple, carmín, naranjas y verde azulado |
| `astro:assets` + Sharp | Optimiza portadas a AVIF/WebP en varios tamaños |
| Búsqueda propia | Índice JSON + filtros por saga y personaje |
| Cloudflare Pages | Hosting, CDN, HTTPS y deploy automático |
| Pages CMS | Panel de escritura conectado a GitHub |

## Comandos

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
npm run preview  # sirve dist/
```

## Dónde está cada cosa

```text
src/
├── content/cuentos/       ← un .md por cuento (título, saga, personajes, texto)
├── assets/cuentos/        ← portadas 16:9 (webp)
├── assets/personajes/     ← retratos con fondo transparente
├── assets/autor/          ← foto del autor para las fichas y «Nosotros»
├── data/sagas.ts          ← sagas y arcos
├── data/personajes.ts     ← fichas de personajes
├── pages/                 ← rutas del sitio
├── components/            ← Header, Footer, tarjetas, anuncios, YouTube…
└── styles/global.css      ← colores, tipografía y componentes
```

Fuera de `src/`:

- `Proximos cuentos/` — taller de cuentos inéditos (texto base + notas de canon).
- `Cuentos publicados/` — archivo local de los originales crudos (no se sube al repo).

## Diseño

- Home con **banner de libro abierto** y 3 destacados manuales (sin autoplay).
- Barra superior automática con el último cuento publicado.
- Secciones: Sigue la aventura · Explora por saga · Conoce a los personajes ·
  Últimos cuentos · Nuestra filosofía.
- Filosofía en morado profundo con el logo del libro como marca de agua.
- Sin píldoras, sin sombras suaves y sin tarjetas redondeadas: filetes y papel.
- Las propuestas visuales están en `mockups/` (A y B); se implementó la A.

## Cómo publicar un cuento

1. Entra a [app.pagescms.org](https://app.pagescms.org) con tu cuenta de GitHub.
2. Abre el repositorio `lee-cuentitos` → **Cuentos** → **Add entry**.
3. Completa título, slug, fecha, resumen, portada, saga, personajes y etiquetas.
   El **resumen** es un gancho corto (menos de 160 caracteres) y no debe repetir el
   primer párrafo: se usa en las tarjetas, en Google y al compartir.
   **Última revisión** es opcional y se muestra en la ficha del cuento.
4. Pega el texto del cuento en el cuerpo.
5. Guarda. Cloudflare reconstruye el sitio en ~1 minuto.

Si un cuento lleva video, pega solo el **ID** de YouTube (lo que va después de `v=`).
Si el campo está vacío, la sección de video no aparece.

## Variables de entorno (Cloudflare Pages)

| Variable | Para qué |
|---|---|
| `PUBLIC_ADSENSE_CLIENT` | `ca-pub-XXXXXXXX` — activa los anuncios. Sin ella, no se carga AdSense. |
| `PUBLIC_FORMSPREE_ID` | ID del formulario de contacto. Sin ella, el formulario abre el correo. |

## Analítica, publicidad y consentimiento

Los IDs viven en `src/data/analytics.ts` (son públicos, viajan en el HTML):

| Herramienta | ID |
|---|---|
| Google Analytics 4 | `G-8ZTRVFLMVC` |
| Microsoft Clarity | `o9g9w35fyl` |
| Ahrefs | `hDh20kUP3Dhr/QW2bFTX2g` |
| Meta Pixel | `1262915438225933` |
| Google AdSense | `ca-pub-1433734828248955` |

Ninguno se carga antes del consentimiento. El aviso de cookies
(`src/components/Consent.astro`) guarda la decisión en `localStorage` con dos
categorías: **analítica** (GA4, Clarity, Ahrefs) y **publicidad** (AdSense, Meta).
El enlace **Cookies** del pie reabre las preferencias. `public/ads.txt` declara el
publisher de AdSense.

## Publicidad

Los espacios publicitarios están maquetados y solo se renderizan si existe
`PUBLIC_ADSENSE_CLIENT`. Formatos: horizontal (728×90) y rectángulo (336×250).
Siempre fuera del cuerpo del cuento.

## SEO y descubribilidad

- `sitemap-index.xml` automático (`@astrojs/sitemap`)
- `robots.txt`, `rss.xml`, `llms.txt`
- JSON-LD: `WebSite`, `ShortStory`, `CreativeWorkSeries`, `Person`, `BreadcrumbList`
- Open Graph + Twitter Cards con la portada de cada cuento
- URLs limpias idénticas a las del WordPress anterior
- Redirecciones 301 en `public/_redirects`

## Migración desde WordPress

`scripts/importar-wp.mjs` convierte la exportación REST (`migracion/datos.json`)
en Markdown. `scripts/procesar-personajes.mjs` recorta los retratos y quita el
fondo verde.

## Estructura editorial

- **Sagas:** Tom, Lucas y Max · Las aventuras de Damián · El mundo de Guijarro
- **Arcos:** El Misterio del Lago Espejo (11 partes)
- **Personajes:** Tom, Lucas, Max, Lía, Finn, el Guardián, Damián, Sader,
  Ollie, Joaquín, Guillermo, Juana, Jasper
