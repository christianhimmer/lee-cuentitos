export type Saga = {
  slug: string;
  nombre: string;
  lema: string;
  descripcion: string;
  descripcionLarga: string;
  portada: string;
  color: string;
  personajes: string[];
  orden: number;
};

export const sagas: Saga[] = [
  {
    slug: 'tom-lucas-y-max',
    nombre: 'Tom, Lucas y Max',
    lema: 'Tres amigos, un perro mágico y un mundo lleno de misterios.',
    descripcion:
      'Tom, Lucas y su perro Max descubren bosques encantados, castillos abandonados y relojes que guardan secretos. La saga principal de Lee Cuentitos.',
    descripcionLarga:
      'Todo empezó una tarde en el Bosque Encantado. Desde entonces, Tom, Lucas y Max no han dejado de encontrar puertas secretas, tesoros escondidos y criaturas que solo existen en los cuentos. Es la saga ideal para leer en orden o saltar al cuento que más te guste: cada historia funciona sola, pero juntas cuentan una aventura mucho más grande.',
    portada: 'el-misterio-del-lago-espejo-parte-11.webp',
    color: '#7A1236',
    personajes: ['tom', 'lucas', 'max', 'lia', 'finn'],
    orden: 1,
  },
  {
    slug: 'aventuras-de-damian',
    nombre: 'Las aventuras de Damián',
    lema: 'Minecraft, naves espaciales y un bosque donde los animales hablan.',
    descripcion:
      'Damián explora minas llenas de diamantes, resuelve misiones en una nave espacial y conversa con un búho sabio. Aventuras inspiradas en sus videojuegos favoritos.',
    descripcionLarga:
      'Damián es un explorador que no le teme a nada: ni a los mobs de una mina oscura, ni a los impostores de la nave Skeld, ni a los caminos del Bosque Mágico. Con su lobo Sader y el búho Ollie, cada cuento es una misión distinta.',
    portada: 'la-aventura-de-damian-en-la-mina-misteriosa.webp',
    color: '#1F7A6F',
    personajes: ['damian', 'sader', 'ollie'],
    orden: 2,
  },
  {
    slug: 'mundo-de-guijarro',
    nombre: 'El mundo de Guijarro',
    lema: 'Un guijarro que concede deseos y un gusanito que quiere ser héroe.',
    descripcion:
      'Dos historias sobre el reino de Guijarro: un guijarro azul que cumple deseos y Guillermo, un gusanito verde con alma de guerrero.',
    descripcionLarga:
      'En el reino de Guijarro pasan cosas pequeñas y enormes a la vez. Joaquín encuentra una piedra que brilla con luz azul; Guillermo, un gusanito con casco de bellota, se prepara para el Gran Juego. Dos cuentos sobre valentía, amistad y el poder de las palabras.',
    portada: 'el-gran-juego-de-guijarro-la-aventura-de-guillermo-y-sus-amigos.webp',
    color: '#B26A00',
    personajes: ['joaquin', 'guillermo', 'juana', 'jasper'],
    orden: 3,
  },
];

export type Arco = {
  slug: string;
  nombre: string;
  saga: string;
  descripcion: string;
  portada: string;
  total: number;
};

export const arcos: Arco[] = [
  {
    slug: 'el-misterio-del-lago-espejo',
    nombre: 'El Misterio del Lago Espejo',
    saga: 'tom-lucas-y-max',
    descripcion:
      'Una saga en once partes: un lago que refleja otro mundo, un guardián de sombras y cinco amigos dispuestos a todo.',
    portada: 'el-misterio-del-lago-espejo-parte-01.webp',
    total: 11,
  },
];
