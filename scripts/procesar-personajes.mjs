import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const ORIGEN = 'Img/Personajes';
const DESTINO = 'src/assets/personajes';
await fs.mkdir(DESTINO, { recursive: true });

const archivos = [
  ['Tom.png', 'tom'],
  ['Lucas.png', 'lucas'],
  ['Max.png', 'max'],
  ['Lia.png', 'lia'],
  ['Finn.png', 'finn'],
  ['El Guardián.png', 'guardian'],
];

/** Quita el fondo por relleno desde los bordes (no toca colores parecidos del personaje). */
async function procesar(entrada, salida) {
  const { data, info } = await sharp(entrada).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const bg = [data[0], data[1], data[2]];
  const tolerancia = 46;
  const distancia = (i) => {
    const dr = data[i] - bg[0];
    const dg = data[i + 1] - bg[1];
    const db = data[i + 2] - bg[2];
    return Math.sqrt(dr * dr + dg * dg + db * db);
  };

  const visitado = new Uint8Array(width * height);
  const cola = [];

  const encolar = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const p = y * width + x;
    if (visitado[p]) return;
    visitado[p] = 1;
    if (distancia(p * channels) <= tolerancia) cola.push(p);
  };

  for (let x = 0; x < width; x++) {
    encolar(x, 0);
    encolar(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    encolar(0, y);
    encolar(width - 1, y);
  }

  while (cola.length) {
    const p = cola.pop();
    const x = p % width;
    const y = (p - x) / width;
    data[p * channels + 3] = 0;
    encolar(x + 1, y);
    encolar(x - 1, y);
    encolar(x, y + 1);
    encolar(x, y - 1);
    // Relleno de 2px extra para comer el halo del antialias
    encolar(x + 2, y);
    encolar(x - 2, y);
    encolar(x, y + 2);
    encolar(x, y - 2);
  }

  // Limpieza: quitar píxeles casi idénticos al fondo y motas sueltas
  const mascara = new Uint8Array(width * height);
  for (let p = 0; p < width * height; p++) {
    if (data[p * channels + 3] === 0) continue;
    if (distancia(p * channels) < 22) { data[p * channels + 3] = 0; continue; }
    mascara[p] = 1;
  }
  for (let pasada = 0; pasada < 2; pasada++) {
    const copia = new Uint8Array(mascara);
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const p = y * width + x;
        if (!copia[p]) continue;
        let vecinos = 0;
        for (let dy = -1; dy <= 1; dy++)
          for (let dx = -1; dx <= 1; dx++)
            vecinos += copia[(y + dy) * width + (x + dx)];
        if (vecinos < 4) { mascara[p] = 0; data[p * channels + 3] = 0; }
      }
    }
  }

  let minX = width, minY = height, maxX = 0, maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (mascara[y * width + x] && data[(y * width + x) * channels + 3] > 20) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  const margen = 10;
  const left = Math.max(0, minX - margen);
  const top = Math.max(0, minY - margen);
  const w = Math.min(width - left, maxX - minX + margen * 2);
  const h = Math.min(height - top, maxY - minY + margen * 2);
  const lado = Math.max(w, h);
  const padX = Math.round((lado - w) / 2);
  const padY = Math.round((lado - h) / 2);

  // Lienzo cuadrado transparente, copiando píxeles a mano (evita el bug de composite)
  const lienzo = new Uint8Array(lado * lado * 4);
  for (let y = 0; y < h; y++) {
    const origen = ((top + y) * width + left) * channels;
    const destino = ((padY + y) * lado + padX) * 4;
    for (let x = 0; x < w; x++) {
      const o = origen + x * channels;
      const d = destino + x * 4;
      lienzo[d] = data[o];
      lienzo[d + 1] = data[o + 1];
      lienzo[d + 2] = data[o + 2];
      lienzo[d + 3] = data[o + 3];
    }
  }

  await sharp(lienzo, { raw: { width: lado, height: lado, channels: 4 } })
    .resize(700, 700, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 90 })
    .toFile(path.join(DESTINO, `${salida}.webp`));

  console.log(`✓ ${salida}.webp bbox=${left},${top} ${w}x${h} lado=${lado}`);
}

for (const [archivo, nombre] of archivos) {
  try {
    await procesar(path.join(ORIGEN, archivo), nombre);
  } catch (e) {
    console.warn(`✗ ${archivo}: ${e.message}`);
  }
}
