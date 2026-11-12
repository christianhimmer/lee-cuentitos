#!/usr/bin/env node
/**
 * Convierte la exportación del WordPress (migracion/datos.json) en
 * archivos Markdown para la colección `cuentos` de Astro.
 *
 * Uso: node scripts/importar-wp.mjs
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const RAIZ = process.cwd();
const ENTRADA = path.join(RAIZ, 'migracion/datos.json');
const SALIDA = path.join(RAIZ, 'src/content/cuentos');

const SAGAS = {
  'tom-lucas-y-max': 'tom-lucas-y-max',
  'lia-y-finn': 'tom-lucas-y-max', // Lía y Finn es parte del mismo mundo
};

/** Mapa editorial: saga, arco, personajes y etiquetas por slug. */
const FICHA = {
  'el-misterio-del-lago-espejo-parte-01': { parte: 1 },
  'el-misterio-del-lago-espejo-parte-2': { parte: 2 },
  'el-misterio-del-lago-espejo-parte-03': { parte: 3 },
  'el-misterio-del-lago-espejo-parte-04': { parte: 4 },
  'el-misterio-del-lago-espejo-parte-05': { parte: 5 },
  'el-misterio-del-lago-espejo-parte-06': { parte: 6 },
  'el-misterio-del-lago-espejo-parte-07': { parte: 7 },
  'el-misterio-del-lago-espejo-parte-08': { parte: 8 },
  'el-misterio-del-lago-espejo-parte-9': { parte: 9, personajes: ['tom', 'lucas', 'max', 'finn'] },
  'el-misterio-del-lago-espejo-parte-10': { parte: 10, personajes: ['tom', 'lucas', 'max', 'lia', 'finn'] },
  'el-misterio-del-lago-espejo-parte-11': { parte: 11, personajes: ['tom', 'lucas', 'max', 'lia', 'finn'] },

  'la-aventura-en-el-bosque-encantado': { saga: 'tom-lucas-y-max', personajes: ['tom', 'lucas', 'max'], tags: ['aventura', 'bosque', 'amistad'] },
  'el-misterio-del-arbol-luminoso': { saga: 'tom-lucas-y-max', personajes: ['tom', 'lucas', 'max'], tags: ['misterio', 'bosque', 'magia'] },
  'el-misterio-del-castillo-abandonado': { saga: 'tom-lucas-y-max', personajes: ['tom', 'lucas', 'max'], tags: ['misterio', 'castillo', 'valentia'] },
  'el-secreto-del-reloj-encantado': { saga: 'tom-lucas-y-max', personajes: ['tom', 'lucas', 'max'], tags: ['misterio', 'magia', 'tiempo'] },
  'el-misterio-del-tesoro-del-bosque-encantado': { saga: 'tom-lucas-y-max', personajes: ['tom', 'lucas', 'max'], tags: ['aventura', 'tesoro', 'bosque'] },

  'la-aventura-de-damian-en-la-mina-misteriosa': { saga: 'aventuras-de-damian', personajes: ['damian', 'sader'], tags: ['minecraft', 'aventura', 'valentia'] },
  'la-mision-en-la-nave-espacial': { saga: 'aventuras-de-damian', personajes: ['damian'], tags: ['among-us', 'espacio', 'misterio'] },
  'la-aventura-en-el-bosque-magico': { saga: 'aventuras-de-damian', personajes: ['damian', 'sader', 'ollie'], tags: ['bosque', 'animales', 'amistad'] },

  'el-misterio-del-guijarro-magico': { saga: 'mundo-de-guijarro', personajes: ['joaquin'], tags: ['magia', 'deseos', 'familia'] },
  'el-gran-juego-de-guijarro-la-aventura-de-guillermo-y-sus-amigos': { saga: 'mundo-de-guijarro', personajes: ['guillermo', 'juana', 'jasper'], tags: ['aventura', 'amistad', 'juego'] },
};

const ARCO_LAGO = {
  arco: 'el-misterio-del-lago-espejo',
  saga: 'tom-lucas-y-max',
  personajes: ['tom', 'lucas', 'max'],
  tags: ['misterio', 'magia', 'aventura', 'amistad'],
};

function limpiarHtml(html) {
  return html
    .replace(/<figure[\s\S]*?<\/figure>/gi, '')
    .replace(/<p[^>]*>/gi, '')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, '’')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    .replace(/&#8211;/g, '–')
    .replace(/&#8230;/g, '…')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function resumen(texto, max = 155) {
  const plano = texto.replace(/\s+/g, ' ').trim();
  if (plano.length <= max) return plano;
  const corte = plano.slice(0, max);
  const punto = Math.max(corte.lastIndexOf('. '), corte.lastIndexOf('? '), corte.lastIndexOf('! '));
  if (punto > 60) return corte.slice(0, punto + 1);
  return corte.slice(0, corte.lastIndexOf(' ')) + '…';
}

function palabras(texto) {
  return texto.split(/\s+/).filter(Boolean).length;
}

function yamlValor(v) {
  const s = String(v);
  if (/^[a-zA-Z0-9áéíóúñÑ._-]+$/.test(s) && !/^(true|false|null|\d+)$/.test(s)) return s;
  return JSON.stringify(s);
}

function fm(objeto) {
  const lineas = ['---'];
  for (const [k, v] of Object.entries(objeto)) {
    if (v === undefined || v === null || v === '') continue;
    if (Array.isArray(v)) {
      lineas.push(`${k}: [${v.map(yamlValor).join(', ')}]`);
    } else if (typeof v === 'boolean' || typeof v === 'number') {
      lineas.push(`${k}: ${v}`);
    } else {
      lineas.push(`${k}: ${yamlValor(v)}`);
    }
  }
  lineas.push('---');
  return lineas.join('\n');
}

const datos = JSON.parse(await fs.readFile(ENTRADA, 'utf8'));
await fs.mkdir(SALIDA, { recursive: true });

let n = 0;
for (const post of datos) {
  const mapa = FICHA[post.slug] || {};
  const esLago = post.slug.startsWith('el-misterio-del-lago-espejo-parte');
  const base = esLago ? { ...ARCO_LAGO, ...mapa } : mapa;

  const cuerpo = limpiarHtml(post.content);
  const lectura = Math.max(1, Math.round(palabras(cuerpo) / 180));

  const portada = `../../assets/cuentos/${post.slug}.webp`;

  const front = {
    title: post.title.replace(/\s+/g, ' ').trim(),
    slug: post.slug,
    date: post.date.slice(0, 10),
    saga: base.saga,
    arco: base.arco,
    parte: base.parte,
    personajes: base.personajes || [],
    tags: base.tags || [],
    resumen: resumen(cuerpo),
    portada,
    portadaAlt: post.image?.alt || post.title,
    minutos: lectura,
    youtube: '',
    borrador: false,
    destacado: ['el-misterio-del-lago-espejo-parte-11', 'la-aventura-en-el-bosque-encantado', 'la-aventura-de-damian-en-la-mina-misteriosa'].includes(post.slug),
  };

  let extra = '';
  if (post.slug === 'la-aventura-de-damian-en-la-mina-misteriosa') {
    extra = '\n\n![Damián y Sader en la mina misteriosa](../../assets/cuentos/damian-mina-interna.webp)\n';
  }

  const salida = `${fm(front)}\n\n${cuerpo}\n${extra}`;
  await fs.writeFile(path.join(SALIDA, `${post.slug}.md`), salida, 'utf8');
  n++;
}

console.log(`✓ ${n} cuentos escritos en src/content/cuentos`);
