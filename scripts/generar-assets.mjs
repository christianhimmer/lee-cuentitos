import sharp from 'sharp';
import fs from 'node:fs/promises';

const svg = await fs.readFile('public/favicon.svg');
await sharp(svg, { density: 300 }).resize(192, 192).png().toFile('public/icono-192.png');
await sharp(svg, { density: 600 }).resize(512, 512).png().toFile('public/icono-512.png');
await sharp(svg, { density: 400 }).resize(180, 180).png().toFile('public/apple-touch-icon.png');

// OG por defecto: portada del Lago Espejo con degradado y texto
const base = 'src/assets/cuentos/el-misterio-del-lago-espejo-parte-11.webp';
const ancho = 1200, alto = 630;
const portada = await sharp(base).resize(ancho, alto, { fit: 'cover' }).toBuffer();
const overlay = Buffer.from(`<svg width="${ancho}" height="${alto}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#560b26" stop-opacity="0.15"/>
      <stop offset="0.55" stop-color="#560b26" stop-opacity="0.72"/>
      <stop offset="1" stop-color="#560b26" stop-opacity="0.96"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <text x="64" y="430" font-family="Georgia, serif" font-size="76" font-weight="bold" fill="#fff8f0">Lee Cuentitos</text>
  <text x="66" y="492" font-family="Arial, sans-serif" font-size="32" fill="#f7d9e3">Cuentos para leer en familia</text>
  <text x="66" y="548" font-family="Arial, sans-serif" font-size="24" fill="#e9a23b">leecuentitos.com</text>
</svg>`);
await sharp(portada).composite([{ input: overlay }]).png().toFile('public/og-default.png');
console.log('assets ok');
