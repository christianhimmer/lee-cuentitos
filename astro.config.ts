// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://leecuentitos.com',
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      changefreq: 'weekly',
      priority: 0.7,
      serialize(item) {
        if (item.url === 'https://leecuentitos.com/') {
          return { ...item, priority: 1.0, changefreq: 'daily' } as any;
        }
        if (item.url.includes('/cuentos/')) {
          return { ...item, priority: 0.8 } as any;
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss() as any],
  },
  image: {
    // Las portadas vienen en 1920x1080: generamos AVIF y WebP al vuelo.
    responsiveStyles: false,
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
