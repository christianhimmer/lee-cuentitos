# Lee Cuentitos

Sitio estático de cuentos infantiles. Astro + Tailwind, desplegado en Cloudflare Pages.

- **Web:** https://leecuentitos.com
- **Panel para escribir:** https://app.pagescms.org (conectado a este repositorio)
- **Repositorio:** GitHub `christianhimmer/lee-cuentitos`

## Stack

| Pieza | Qué hace |
|---|---|
| [Astro 5](https://astro.build) | Genera HTML estático, cero JS innecesario |
| Tailwind CSS 4 | Estilos |
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
├── data/sagas.ts          ← sagas y arcos
├── data/personajes.ts     ← fichas de personajes
├── pages/                 ← rutas del sitio
├── components/            ← Header, Footer, tarjetas, anuncios, YouTube…
└── styles/global.css      ← colores, tipografía y componentes
```

## Cómo publicar un cuento

1. Entra a [app.pagescms.org](https://app.pagescms.org) con tu cuenta de GitHub.
2. Abre el repositorio `lee-cuentitos` → **Cuentos** → **Add entry**.
3. Completa título, slug, fecha, resumen, portada, saga, personajes y etiquetas.
4. Pega el texto del cuento en el cuerpo.
5. Guarda. Cloudflare reconstruye el sitio en ~1 minuto.

Si un cuento lleva video, pega solo el **ID** de YouTube (lo que va después de `v=`).
Si el campo está vacío, la sección de video no aparece.

## Variables de entorno (Cloudflare Pages)

| Variable | Para qué |
|---|---|
| `PUBLIC_ADSENSE_CLIENT` | `ca-pub-XXXXXXXX` — activa los anuncios. Sin ella, no se carga AdSense. |
| `PUBLIC_FORMSPREE_ID` | ID del formulario de contacto. Sin ella, el formulario abre el correo. |

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
