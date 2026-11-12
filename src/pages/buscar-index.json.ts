import type { APIRoute } from 'astro';
import { indiceBusqueda } from '../lib/cuentos';

export const GET: APIRoute = async () => {
  const indice = await indiceBusqueda();
  return new Response(JSON.stringify(indice), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
