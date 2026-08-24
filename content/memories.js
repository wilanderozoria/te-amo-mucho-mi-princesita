/**
 * memories.js
 * ------------------------------------------------------------------
 * Aquí se configuran las fotografías de la experiencia.
 *
 * CÓMO AGREGAR TUS FOTOS:
 * 1. Coloca las imágenes dentro de la carpeta:  assets/photos/
 * 2. Escribe el nombre exacto del archivo en "src" (ej: "01.jpg").
 * 3. La frase en "caption" es opcional. Déjala como "" si no quieres texto.
 * 4. Puedes reordenar, agregar o quitar objetos del arreglo libremente.
 *
 * No necesitas tocar ningún otro archivo para cambiar las fotos o frases.
 * ------------------------------------------------------------------
 */

// Galería principal — la historia general de estos 6 meses
const GALLERY_PHOTOS = [
  {
    src: "assets/photos/01.jpg",
    caption: "Uno de tantos momentos que quiero guardar."
  },
  {
    src: "assets/photos/02.jpg",
    caption: "Así, sin planearlo, empezó todo."
  },
  {
    src: "assets/photos/03.jpg",
    caption: "Contigo hasta lo simple se siente especial."
  },
  {
    src: "assets/photos/04.jpg",
    caption: ""
  },
  {
    src: "assets/photos/05.jpg",
    caption: "Seis meses y ya perdí la cuenta de cuántas veces sonreí por ti."
  }
];

// Sección especial — el viaje a Las Charcas
const CHARCAS_PHOTOS = [
  {
    src: "assets/photos/charcas-01.jpg",
    caption: ""
  },
  {
    src: "assets/photos/charcas-02.jpg",
    caption: "Todavía recuerdo cada detalle de ese día."
  },
  {
    src: "assets/photos/charcas-03.jpg",
    caption: ""
  }
];

// No modificar: exposición global para app.js
window.GALLERY_PHOTOS = GALLERY_PHOTOS;
window.CHARCAS_PHOTOS = CHARCAS_PHOTOS;
