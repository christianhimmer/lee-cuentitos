import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { todosLosCuentos } from '../lib/cuentos';
import { portadaDe } from '../lib/imagenes';

export async function GET(context: APIContext) {
  const cuentos = await todosLosCuentos();
  return rss({
    title: 'Lee Cuentitos',
    description:
      'Cuentos infantiles ilustrados en español para leer en familia y practicar la lectura.',
    site: context.site ?? 'https://leecuentitos.com',
    items: cuentos.map((c) => ({
      title: c.data.title,
      pubDate: c.data.date,
      description: c.data.resumen,
      link: `/${c.data.slug}/`,
      categories: [...c.data.tags, ...(c.data.saga ? [c.data.saga] : [])],
      enclosure: { url: portadaDe(c.data.portada).src, length: 0, type: 'image/webp' },
    })),
    customData: '<language>es-cl</language>',
  });
}
