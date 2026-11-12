import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const cuentos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cuentos' }),
  schema: z.object({
      title: z.string(),
      slug: z.string(),
      date: z.coerce.date(),
      saga: z.string().optional(),
      arco: z.string().optional(),
      parte: z.number().optional(),
      personajes: z.array(z.string()).default([]),
      tags: z.array(z.string()).default([]),
      resumen: z.string(),
      portada: z.string(),
      portadaAlt: z.string().optional(),
      minutos: z.number().default(5),
      youtube: z.string().optional().default(''),
      borrador: z.boolean().default(false),
      destacado: z.boolean().default(false),
    }),
});

export const collections = { cuentos };
