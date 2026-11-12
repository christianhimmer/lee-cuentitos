import type { ImageMetadata } from 'astro';

const archivos = import.meta.glob<ImageMetadata>('../assets/cuentos/*.webp', {
  eager: true,
  import: 'default',
});

/** Devuelve la imagen de portada por nombre de archivo (ej: "tom.webp"). */
export function imagen(nombre: string): ImageMetadata {
  const ruta = `../assets/cuentos/${nombre}`;
  const encontrada = archivos[ruta];
  if (!encontrada) throw new Error(`No se encontró la imagen ${nombre}`);
  return encontrada;
}

const retratos = import.meta.glob<ImageMetadata>('../assets/personajes/*.webp', {
  eager: true,
  import: 'default',
});

/** Devuelve el retrato de un personaje por nombre de archivo (ej: "tom.webp"). */
export function retrato(nombre: string): ImageMetadata | undefined {
  return retratos[`../assets/personajes/${nombre}`];
}

const portadas = import.meta.glob<ImageMetadata>('../assets/cuentos/*.webp', {
  eager: true,
  import: 'default',
});

/**
 * Resuelve una portada por nombre de archivo. Acepta "x.webp",
 * "../../assets/cuentos/x.webp" o "/src/assets/cuentos/x.webp".
 */
export function portadaDe(valor: string): ImageMetadata {
  const nombre = valor.split('/').pop() ?? valor;
  const encontrada = portadas[`../assets/cuentos/${nombre}`];
  if (!encontrada) throw new Error(`No se encontró la portada ${nombre}`);
  return encontrada;
}
