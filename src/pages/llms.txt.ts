import type { APIRoute } from 'astro';
import { todosLosCuentos, sagas, personajesPorSlug } from '../lib/cuentos';
import { personajes } from '../data/personajes';

export const GET: APIRoute = async () => {
  const cuentos = await todosLosCuentos();

  const lineas: string[] = [];
  lineas.push('# Lee Cuentitos');
  lineas.push('');
  lineas.push(
    '> Lee Cuentitos es una biblioteca gratuita de cuentos infantiles originales en español, escritos para leer en familia y practicar la lectura. Las historias ocurren en un mismo mundo de fantasía y están organizadas en sagas y personajes.',
  );
  lineas.push('');
  lineas.push('Idioma: español (Chile). Público: familias con niños de 6 a 10 años y docentes.');
  lineas.push(`Catálogo: ${cuentos.length} cuentos, ${sagas.length} sagas, ${personajes.length} personajes.`);
  lineas.push('Licencia: contenido original, uso personal y educativo; citar la fuente con enlace.');
  lineas.push('');

  lineas.push('## Sagas');
  for (const s of sagas) {
    const total = cuentos.filter((c) => c.data.saga === s.slug).length;
    lineas.push(`- [${s.nombre}](https://leecuentitos.com/sagas/${s.slug}/): ${s.descripcion} (${total} cuentos)`);
  }
  lineas.push('');

  lineas.push('## Personajes');
  for (const p of personajes) {
    const total = cuentos.filter((c) => c.data.personajes.includes(p.slug)).length;
    if (total === 0) continue;
    lineas.push(`- [${p.nombre}](https://leecuentitos.com/personajes/${p.slug}/): ${p.rol}. ${p.descripcion}`);
  }
  lineas.push('');

  lineas.push('## Cuentos');
  for (const c of cuentos) {
    const saga = sagas.find((s) => s.slug === c.data.saga)?.nombre;
    const personas = c.data.personajes.map((p) => personajesPorSlug[p]?.nombre).filter(Boolean).join(', ');
    lineas.push(
      `- [${c.data.title}](https://leecuentitos.com/${c.data.slug}/): ${c.data.resumen}${saga ? ` Saga: ${saga}.` : ''}${personas ? ` Personajes: ${personas}.` : ''}`,
    );
  }
  lineas.push('');

  lineas.push('## Páginas');
  lineas.push('- [Inicio](https://leecuentitos.com/)');
  lineas.push('- [Biblioteca completa](https://leecuentitos.com/cuentos/)');
  lineas.push('- [Buscador](https://leecuentitos.com/buscar/)');
  lineas.push('- [Nosotros](https://leecuentitos.com/nosotros/)');
  lineas.push('- [Contacto](https://leecuentitos.com/contacto/)');
  lineas.push('- [Privacidad y cookies](https://leecuentitos.com/privacidad/)');
  lineas.push('');
  lineas.push('## Cómo citar');
  lineas.push(
    'Lee Cuentitos (2026). Cuentos infantiles originales. https://leecuentitos.com/ — Autor: Christian Himmer.',
  );
  lineas.push('');

  return new Response(lineas.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
