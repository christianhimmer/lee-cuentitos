import { getCollection, type CollectionEntry } from 'astro:content';
import { sagas, arcos } from '../data/sagas';
import { personajes, personajesPorSlug } from '../data/personajes';
import { portadaDe } from './imagenes';

export type Cuento = CollectionEntry<'cuentos'>;

export async function todosLosCuentos(): Promise<Cuento[]> {
  const cuentos = await getCollection('cuentos', ({ data }) => !data.borrador);
  return cuentos.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function cuentosOrdenados(): Promise<Cuento[]> {
  const cuentos = await getCollection('cuentos', ({ data }) => !data.borrador);
  return cuentos.sort((a, b) => {
    if (a.data.arco && b.data.arco === a.data.arco && a.data.parte && b.data.parte) {
      return a.data.parte - b.data.parte;
    }
    return b.data.date.getTime() - a.data.date.getTime();
  });
}

export async function cuentosDeSaga(slug: string): Promise<Cuento[]> {
  const cuentos = await todosLosCuentos();
  return cuentos.filter((c) => c.data.saga === slug);
}

export async function cuentosDeArco(slug: string): Promise<Cuento[]> {
  const cuentos = await todosLosCuentos();
  return cuentos
    .filter((c) => c.data.arco === slug)
    .sort((a, b) => (a.data.parte ?? 0) - (b.data.parte ?? 0));
}

export async function cuentosDePersonaje(slug: string): Promise<Cuento[]> {
  const cuentos = await todosLosCuentos();
  return cuentos.filter((c) => c.data.personajes.includes(slug));
}

export async function relacionados(cuento: Cuento, limite = 3): Promise<Cuento[]> {
  const cuentos = await todosLosCuentos();
  const otros = cuentos.filter((c) => c.data.slug !== cuento.data.slug);

  const puntuar = (c: Cuento) => {
    let puntos = 0;
    if (cuento.data.saga && c.data.saga === cuento.data.saga) puntos += 4;
    if (cuento.data.arco && c.data.arco === cuento.data.arco) puntos += 3;
    puntos += c.data.personajes.filter((p) => cuento.data.personajes.includes(p)).length * 2;
    puntos += c.data.tags.filter((t) => cuento.data.tags.includes(t)).length;
    return puntos;
  };

  return otros
    .map((c) => ({ c, puntos: puntuar(c) }))
    .sort((a, b) => b.puntos - a.puntos || b.c.data.date.getTime() - a.c.data.date.getTime())
    .slice(0, limite)
    .map((x) => x.c);
}

export async function anteriorYSiguiente(cuento: Cuento) {
  if (!cuento.data.arco) return { anterior: null, siguiente: null };
  const arco = await cuentosDeArco(cuento.data.arco);
  const indice = arco.findIndex((c) => c.data.slug === cuento.data.slug);
  return {
    anterior: indice > 0 ? arco[indice - 1] : null,
    siguiente: indice >= 0 && indice < arco.length - 1 ? arco[indice + 1] : null,
  };
}

export function fechaLarga(fecha: Date): string {
  return new Intl.DateTimeFormat('es-CL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(fecha);
}

export function fechaCorta(fecha: Date): string {
  return new Intl.DateTimeFormat('es-CL', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(fecha);
}

export function textoPlano(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export { sagas, arcos, personajes, personajesPorSlug };

export function nombreSaga(slug?: string): string {
  return sagas.find((s) => s.slug === slug)?.nombre ?? '';
}

export function nombreArco(slug?: string): string {
  return arcos.find((a) => a.slug === slug)?.nombre ?? '';
}

export function nombresPersonajes(slugs: string[] = []): string {
  return slugs.map((s) => personajesPorSlug[s]?.nombre ?? s).join(', ');
}

/** Índice de búsqueda que se sirve como JSON estático. */
export async function indiceBusqueda() {
  const cuentos = await todosLosCuentos();
  return cuentos.map((c) => ({
    t: c.data.title,
    s: c.data.slug,
    r: c.data.resumen,
    g: nombreSaga(c.data.saga),
    a: nombreArco(c.data.arco),
    p: c.data.personajes.map((p) => personajesPorSlug[p]?.nombre ?? p),
    k: c.data.tags,
    d: c.data.date.getFullYear().toString(),
    m: c.data.minutos,
    i: portadaDe(c.data.portada).src,
  }));
}
