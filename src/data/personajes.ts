export type Personaje = {
  slug: string;
  nombre: string;
  rol: string;
  descripcion: string;
  saga: string;
  color: string;
  iniciales: string;
  especie: string;
  foto?: string;
};

export const personajes: Personaje[] = [
  {
    slug: 'tom',
    nombre: 'Tom',
    rol: 'El mentor del grupo',
    descripcion:
      'Un hombre de unos 50 años, de mirada sabia y abrigo rojo gastado. Alguna vez fue un zombie y Lucas y Max le devolvieron su humanidad. Hoy camina con una brújula de latón, un diario de cuero y la prudencia de quien ya vio demasiado.',
    saga: 'tom-lucas-y-max',
    color: '#7A1236',
    iniciales: 'T',
    especie: 'Adulto',
    foto: 'tom.webp',
  },
  {
    slug: 'lucas',
    nombre: 'Lucas',
    rol: 'El cerebro del equipo',
    descripcion:
      'Tiene 9 años, lentes grandes y un cuaderno lleno de ideas. Resuelve acertijos de formas que nadie más imagina y nunca se separa de su mochila.',
    saga: 'tom-lucas-y-max',
    color: '#1F7A6F',
    iniciales: 'L',
    especie: 'Niño',
    foto: 'lucas.webp',
  },
  {
    slug: 'max',
    nombre: 'Max',
    rol: 'El perro guardián',
    descripcion:
      'El perro leal de Tom y Lucas: pelaje marrón oscuro, collar dorado con un colgante de lobo y un brillo que aparece cuando la magia está cerca. Duerme con un ojo abierto.',
    saga: 'tom-lucas-y-max',
    color: '#B26A00',
    iniciales: 'M',
    especie: 'Perro',
    foto: 'max.webp',
  },
  {
    slug: 'lia',
    nombre: 'Lía',
    rol: 'La que ve los detalles',
    descripcion:
      'Ocho años, cabello largo y oscuro, diadema morada y una linterna siempre en el bolsillo. Encuentra las pistas que los demás pasan por alto y no le teme a la oscuridad.',
    saga: 'tom-lucas-y-max',
    color: '#6A4C93',
    iniciales: 'Lí',
    especie: 'Niña',
    foto: 'lia.webp',
  },
  {
    slug: 'finn',
    nombre: 'Finn',
    rol: 'El explorador',
    descripcion:
      'Nueve años, gorra verde de la suerte, brújula y mapa. Quiere ver qué hay más allá de la próxima curva, aunque eso lo meta en problemas de vez en cuando.',
    saga: 'tom-lucas-y-max',
    color: '#2A6F97',
    iniciales: 'F',
    especie: 'Niño',
    foto: 'finn.webp',
  },
  {
    slug: 'guardian',
    nombre: 'El Guardián',
    rol: 'El protector del Lago Espejo',
    descripcion:
      'Una figura alta, con túnica azul bordada de constelaciones y un bastón coronado por un cristal que cambia de color según el peligro. Habla en enigmas y abre portales entre mundos, pero no puede luchar contra la oscuridad: solo guiar.',
    saga: 'tom-lucas-y-max',
    color: '#1D3557',
    iniciales: 'G',
    especie: 'Guardián',
    foto: 'guardian.webp',
  },
  {
    slug: 'damian',
    nombre: 'Damián',
    rol: 'El aventurero de los videojuegos',
    descripcion:
      'Explora minas de Minecraft, resuelve misiones en naves espaciales y conversa con un búho sabio. El nombre de este personaje nace de un lector muy especial.',
    saga: 'aventuras-de-damian',
    color: '#C1440E',
    iniciales: 'D',
    especie: 'Niño',
  },
  {
    slug: 'sader',
    nombre: 'Sader',
    rol: 'El lobo fiel',
    descripcion:
      'El compañero inseparable de Damián. Siempre camina un paso adelante, olfateando el peligro antes de que llegue.',
    saga: 'aventuras-de-damian',
    color: '#5C5470',
    iniciales: 'S',
    especie: 'Lobo',
  },
  {
    slug: 'ollie',
    nombre: 'Ollie',
    rol: 'El búho sabio',
    descripcion:
      'Vive en el Bosque Mágico y siempre tiene una historia o un consejo. Sus alas conocen todos los caminos.',
    saga: 'aventuras-de-damian',
    color: '#8A5A00',
    iniciales: 'O',
    especie: 'Búho',
  },
  {
    slug: 'joaquin',
    nombre: 'Joaquín',
    rol: 'El niño del guijarro',
    descripcion:
      'Encontró en el jardín de su abuela una piedra azul que concede deseos… si se dice la palabra correcta.',
    saga: 'mundo-de-guijarro',
    color: '#2A6F97',
    iniciales: 'J',
    especie: 'Niño',
  },
  {
    slug: 'guillermo',
    nombre: 'Guillermo',
    rol: 'El gusanito guerrero',
    descripcion:
      'Vive bajo una hoja de roble y sueña con ser un gran guerrero. Su valentía es mucho más grande que su tamaño.',
    saga: 'mundo-de-guijarro',
    color: '#4F772D',
    iniciales: 'G',
    especie: 'Gusano',
  },
  {
    slug: 'juana',
    nombre: 'Juana',
    rol: 'La tortuga sabia',
    descripcion:
      'La voz de la experiencia en el reino de Guijarro. Piensa despacio y acierta casi siempre.',
    saga: 'mundo-de-guijarro',
    color: '#588157',
    iniciales: 'Ju',
    especie: 'Tortuga',
  },
  {
    slug: 'jasper',
    nombre: 'Jasper',
    rol: 'El duende travieso',
    descripcion:
      'Nunca se queda quieto y siempre tiene un plan. A veces mete al grupo en problemas y a veces los saca.',
    saga: 'mundo-de-guijarro',
    color: '#B5651D',
    iniciales: 'Ja',
    especie: 'Duende',
  },
];

export const personajesPorSlug = Object.fromEntries(personajes.map((p) => [p.slug, p]));
