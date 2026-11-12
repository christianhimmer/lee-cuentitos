import type { APIRoute } from 'astro';

export const GET: APIRoute = () =>
  new Response(
    `User-agent: *
Allow: /
Disallow: /buscar/

# Contenido pensado para familias y lectura infantil.
# El buscador no aporta valor indexado; el resto del sitio sí.

Sitemap: https://leecuentitos.com/sitemap-index.xml
`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
