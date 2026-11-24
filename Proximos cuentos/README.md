# Proximos cuentos

Taller de trabajo. Aquí viven los cuentos **todavía no publicados**, con su texto base y las notas de canon. Nada de esta carpeta se publica directamente: el sitio lee solo `src/content/cuentos/`.

## Flujo de trabajo

1. Elegir el cuento por prioridad.
2. Limpiar y expandir el texto base (objetivo: 900–1.100 palabras).
3. Revisar canon: nombres, objetos, cronología y final.
4. Crear la portada 16:9.
5. Llenar los metadatos y publicar en `src/content/cuentos/`.
6. Mover el archivo terminado a `Cuentos publicados/` y actualizar el estado aquí.

## Estados

| Estado | Significado |
|---|---|
| `pendiente` | Texto base extraído, sin trabajar |
| `en-revision` | Se está editando o esperando decisiones |
| `listo` | Texto y metadatos listos para publicar |
| `publicado` | Ya vive en el sitio (mover a `Cuentos publicados/`) |

## Cola de trabajo

| # | Cuento | Palabras | Saga | Prioridad | Notas |
|---|---|---:|---|---|---|
| 01 | El nacimiento del Guardián del Lago Espejo | 477 | Tom, Lucas y Max | 1 | Arranque del arco «Los orígenes del Guardián» |
| 02 | El Guardián y la Luna Rota | 580 | Tom, Lucas y Max | 1 | Parte 02 del arco |
| 03 | El Guardián y el Árbol de los Recuerdos | 572 | Tom, Lucas y Max | 1 | Parte 03 y cierre del arco |
| 04 | Cómo se conocieron Lía y Finn | 511 | Tom, Lucas y Max | 2 | Usar la versión canónica (Finn niño, no dragón) |
| 05 | El Misterio del Bosque Luminoso | 390 | Tom, Lucas y Max | 3 | Cambiar título: ya existe «Árbol Luminoso» |
| 12 | Lucas, Max y Tom en la Dimensión Giratoria | 563 | Tom, Lucas y Max | 3 | Tono más absurdo; decidir si encaja |
| 06 | El Gran Desafío de Samuel | 347 | Por definir | 4 | Realista, sin magia |
| 07 | El Cuchuflí Travieso | 270 | Por definir | 4 | Muy corto; guiño chileno |
| 08 | El Bosque de las Sombras Brillantes | 295 | Por definir | 4 | Protagonista nuevo: Leo |
| 09 | El Bosque de los Mil Secretos | 375 | Por definir | 4 | Protagonista nueva: Sofía |
| 10 | El Misterio del Desierto Dorado | 383 | Por definir | 4 | Protagonista nuevo: Áxel |
| 11 | El Bosque de los Sueños Perdidos | 544 | Por definir | 4 | Otra Sofía; unificar o separar |
| 13 | El Misterio del Bosque de Niebla | 496 | Tom, Lucas y Max | 5 | Final choca con el canon del Guardián |

## Decisiones pendientes

- **Nombre del Guardián:** el texto lo llama «Líaen», demasiado parecido a Lía. Recomendado dejarlo sin nombre.
- **Arco nuevo:** crear «Los orígenes del Guardián» en `src/data/sagas.ts` para las tres primeras partes.
- **Saga nueva:** decidir qué hacer con Samuel, Tilo, Leo, Sofía y Áxel. Opciones: una saga de cuentos sueltos o publicarlos como independientes.
- **Bosque de Niebla:** reescribir el final o descartarlo.
- **Bosque Luminoso:** diferenciarlo de «El Misterio del Árbol Luminoso».

## Reglas

- Los textos de `_originales/` son el material crudo del chat: no se editan, sirven de respaldo.
- Un cuento no se considera publicado hasta que existe en `src/content/cuentos/` con portada y metadatos.
- Al publicar, mover el `.md` de este taller a `Cuentos publicados/`.
