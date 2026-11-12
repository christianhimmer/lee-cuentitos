export type Personaje = {
  slug: string;
  nombre: string;
  rol: string;
  descripcion: string;
  saga: string;
  color: string;
  iniciales: string;
  especie: string;
  etiqueta: string;
  foto?: string;
};

export const personajes: Personaje[] = [
  {
    slug: 'tom',
    nombre: 'Tom',
    rol: 'El mentor del grupo',
    descripcion:
      'Dicen que Tom fue un zombie antes de ser el hombre que es hoy. Lucas y Max le devolvieron la humanidad, y desde entonces carga su mochila de latón y su bastón como quien carga una promesa: no dejar a nadie atrás. Camina despacio, pero nunca llega tarde.',
    saga: 'tom-lucas-y-max',
    color: '#7A1236',
    iniciales: 'T',
    especie: 'Adulto',
    etiqueta: 'Mentor',
    foto: 'tom.webp',
  },
  {
    slug: 'lucas',
    nombre: 'Lucas',
    rol: 'El cerebro del equipo',
    descripcion:
      'Lucas piensa con las manos: dibuja mapas en el aire, anota ideas en un cuaderno que ya no cierra y encuentra la salida donde los demás solo ven un callejón. Sus lentes agrandan los ojos, pero también la curiosidad.',
    saga: 'tom-lucas-y-max',
    color: '#1F7A6F',
    iniciales: 'L',
    especie: 'Niño',
    etiqueta: 'El cerebro',
    foto: 'lucas.webp',
  },
  {
    slug: 'max',
    nombre: 'Max',
    rol: 'El perro guardián',
    descripcion:
      'Max no ladra a los fantasmas: los mira fijo hasta que se van. Su collar de lobo brilla cuando la magia anda cerca, y si alguna vez lo ves correr con el pelo erizado, corre tú también.',
    saga: 'tom-lucas-y-max',
    color: '#B26A00',
    iniciales: 'M',
    especie: 'Perro',
    etiqueta: 'Perro guardián',
    foto: 'max.webp',
  },
  {
    slug: 'lia',
    nombre: 'Lía',
    rol: 'La que ve los detalles',
    descripcion:
      'Lía aparece cuando el camino se pone oscuro, con su linterna y esa diadema morada que no se quita ni para dormir. Ve lo que otros no ven: una huella, una sombra que no encaja, una puerta donde antes había pared.',
    saga: 'tom-lucas-y-max',
    color: '#6A4C93',
    iniciales: 'Lí',
    especie: 'Niña',
    etiqueta: 'La que ve',
    foto: 'lia.webp',
  },
  {
    slug: 'finn',
    nombre: 'Finn',
    rol: 'El explorador',
    descripcion:
      'Finn tiene una gorra verde que le da suerte y un mapa que siempre está un poco arrugado. Quiere saber qué hay después de la próxima curva, aunque la próxima curva tenga espinas. Vuelve con rasguños y con historias.',
    saga: 'tom-lucas-y-max',
    color: '#2A6F97',
    iniciales: 'F',
    especie: 'Niño',
    etiqueta: 'Explorador',
    foto: 'finn.webp',
  },
  {
    slug: 'guardian',
    nombre: 'El Guardián',
    rol: 'El protector del Lago Espejo',
    descripcion:
      'El Guardián no lucha: guía. Vive entre la niebla del lago, con una túnica bordada de constelaciones y un bastón cuyo cristal cambia de color cuando algo se acerca. Habla en enigmas porque las respuestas fáciles nunca fueron suyas.',
    saga: 'tom-lucas-y-max',
    color: '#1D3557',
    iniciales: 'G',
    especie: 'Guardián',
    etiqueta: 'Del lago',
    foto: 'guardian.webp',
  },
  {
    slug: 'damian',
    nombre: 'Damián',
    rol: 'El aventurero de los videojuegos',
    descripcion:
      'Damián tiene dos mundos: uno con espada de diamante y otro con nave espacial. En ambos se mete donde no debe, pregunta lo que nadie pregunta y vuelve con un amigo nuevo. Su lobo Sader siempre va un paso adelante.',
    saga: 'aventuras-de-damian',
    color: '#C1440E',
    iniciales: 'D',
    especie: 'Niño',
    etiqueta: 'Aventurero',
  },
  {
    slug: 'sader',
    nombre: 'Sader',
    rol: 'El lobo fiel',
    descripcion:
      'Sader es el lobo de Damián y su sombra cuando hay peligro. No necesita órdenes: huele el miedo, marca el camino y espera. Si se detiene y mira hacia atrás, es porque algo viene.',
    saga: 'aventuras-de-damian',
    color: '#5C5470',
    iniciales: 'S',
    especie: 'Lobo',
    etiqueta: 'Lobo fiel',
  },
  {
    slug: 'ollie',
    nombre: 'Ollie',
    rol: 'El búho sabio',
    descripcion:
      'Ollie vive en la rama más alta del Bosque Mágico y colecciona historias como otros coleccionan piedras. Cuando baja a hablar, conviene escuchar: casi siempre trae una advertencia envuelta en un cuento.',
    saga: 'aventuras-de-damian',
    color: '#8A5A00',
    iniciales: 'O',
    especie: 'Búho',
    etiqueta: 'Búho sabio',
  },
  {
    slug: 'joaquin',
    nombre: 'Joaquín',
    rol: 'El niño del guijarro',
    descripcion:
      'Joaquín encontró el guijarro azul en el jardín de su abuela, entre las malas hierbas y las hormigas. Desde entonces aprendió que los deseos se piden con cuidado, y que las palabras correctas a veces pesan más que una piedra.',
    saga: 'mundo-de-guijarro',
    color: '#2A6F97',
    iniciales: 'J',
    especie: 'Niño',
    etiqueta: 'El del guijarro',
  },
  {
    slug: 'guillermo',
    nombre: 'Guillermo',
    rol: 'El gusanito guerrero',
    descripcion:
      'Guillermo es un gusanito verde con casco de bellota y sueños del tamaño de un reino. Entrena con palitos, saluda a las hormigas y se prepara para el Gran Juego como si fuera la batalla final. Nadie se ríe de él dos veces.',
    saga: 'mundo-de-guijarro',
    color: '#4F772D',
    iniciales: 'G',
    especie: 'Gusano',
    etiqueta: 'Guerrero',
  },
  {
    slug: 'juana',
    nombre: 'Juana',
    rol: 'La tortuga sabia',
    descripcion:
      'Juana piensa despacio porque piensa de verdad. Mientras los demás corren, ella mira, escucha y al final dice la frase justa. En el reino de Guijarro, cuando Juana habla, se hace silencio.',
    saga: 'mundo-de-guijarro',
    color: '#588157',
    iniciales: 'Ju',
    especie: 'Tortuga',
    etiqueta: 'Sabia',
  },
  {
    slug: 'jasper',
    nombre: 'Jasper',
    rol: 'El duende travieso',
    descripcion:
      'Jasper es un duende con las manos rápidas y los bolsillos llenos de cosas que no son suyas. La mitad de los problemas del reino los causó él; la otra mitad los resolvió con una sonrisa torcida.',
    saga: 'mundo-de-guijarro',
    color: '#B5651D',
    iniciales: 'Ja',
    especie: 'Duende',
    etiqueta: 'Travieso',
  },
];

export const personajesPorSlug = Object.fromEntries(personajes.map((p) => [p.slug, p]));
