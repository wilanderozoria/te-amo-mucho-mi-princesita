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
    src: "assets/photos/WhatsApp Image 2026-09-10 at 10.06.01 PM.jpeg",
    caption: "Tus detalles son lo que más amo de nosotros."
  },
  {
    src: "assets/photos/WhatsApp Image 2026-09-10 at 10.05.45 PM.jpeg",
    caption: "Momentos que se vuelven eternos cuando estoy contigo."
  },
  {
    src: "assets/photos/WhatsApp Image 2026-09-10 at 10.05.57 PM.jpeg",
    caption: "La complicidad que construimos día tras día."
  },
  {
    src: "assets/photos/WhatsApp Image 2026-09-10 at 10.06.04 PM (1).jpeg",
    caption: "No importa dónde estemos, si es a tu lado es el lugar correcto."
  },
  {
    src: "assets/photos/WhatsApp Image 2026-09-10 at 10.05.51 PM.jpeg",
    caption: "Tu risa es mi melodía favorita."
  },
  {
    src: "assets/photos/WhatsApp Image 2026-09-10 at 10.06.00 PM.jpeg",
    caption: "Gracias por llenar mis días de colores."
  },
  {
    src: "assets/photos/WhatsApp Image 2026-09-10 at 10.05.49 PM (1).jpeg",
    caption: "Seis meses de pura magia y felicidad."
  },
  {
    src: "assets/photos/WhatsApp Image 2026-09-10 at 10.06.00 PM (1).jpeg",
    caption: "Eres el sueño que nunca quiero dejar de vivir."
  },
  {
    src: "assets/photos/WhatsApp Image 2026-09-10 at 10.06.03 PM.jpeg",
    caption: "Por muchos más meses, años y vidas juntos."
  },
  {
    src: "assets/photos/WhatsApp Image 2026-09-10 at 10.06.04 PM.jpeg",
    caption: "Cada mirada, cada sonrisa, guardada en mi corazón."
  }
];

// Sección especial — el viaje a Las Charcas
const CHARCAS_PHOTOS = [
  {
    src: "assets/photos/recuerdas este dia.jpeg",
    caption: "Aquel día en Las Charcas que nunca olvidaré."
  },
  {
    src: "assets/photos/llevabamos poco tiempo.jpeg",
    caption: "Cuando todavía llevábamos poquito tiempo juntos."
  },
  {
    src: "assets/photos/recuerdo cada detalle.jpeg",
    caption: "Cada detalle de ese viaje sigue vivo en mi memoria."
  }
];

// No modificar: exposición global para app.js
window.GALLERY_PHOTOS = GALLERY_PHOTOS;
window.CHARCAS_PHOTOS = CHARCAS_PHOTOS;
