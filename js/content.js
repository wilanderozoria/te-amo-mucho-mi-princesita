/**
 * content.js
 * ------------------------------------------------------------------
 * Configuración general y fácil de editar de toda la experiencia:
 * fecha, música, y los textos de cada escena.
 *
 * No necesitas tocar app.js ni animations.js para hacer cambios de texto.
 * ------------------------------------------------------------------
 */

const CONFIG = {
  // ---------- Música ----------
  song: {
    title: "Isn't She Lovely",
    artist: "Stevie Wonder",
    // Coloca el archivo de audio en assets/audio/ con este nombre exacto,
    // o cambia esta ruta por la que prefieras.
    src: "assets/audio/isnt-she-lovely.mp3",
    defaultVolume: 0.55
  },

  // ---------- Textos de la escena de bienvenida ----------
  welcome: {
    eyebrow: "Para ti",
    title: "Tengo algo preparado para ti...",
    button: "Comenzar ❤️"
  },

  // ---------- Escena de nombres ----------
  names: {
    intro: "Antes de comenzar...",
    herLabel: "Escribe tu nombre",
    herPlaceholder: "Chantal",
    myLabel: "Ahora escribe mi nombre",
    myPlaceholder: "Wilander",
    button: "Continuar →"
  },

  // ---------- Escena de fecha ----------
  date: {
    prompt: "Y ahora... ¿cuando nos hicimos novios?",
    button: "Guardar esta fecha ❤️",
    afterLabel: "Nuestro comienzo de esta etapa..."
  },

  // ---------- Introducción emocional ----------
  intro: {
    line1: "6 meses...",
    line2: "y todavía siento que apenas estamos comenzando."
  },

  // ---------- Galería ----------
  gallery: {
    kicker: "Nuestra historia, en pequeños momentos"
  },

  // ---------- lindos momentos ----------
  charcas: {
    line1: "¿Recuerdas este día?",
    line2: "Cuando todavía llevábamos poquito tiempo juntos...",
    line3: "te amo PRINCESITA ❤️"
  },

  // ---------- Transición a la carta ----------
  letterIntro: {
    line1: "Pero hay algo que las fotos no pueden decir...",
    line2: "Así que decidí plasmarte en texo como se siente este este chico que esta loco de amor por una chica.",
    button: "Leer mi carta "
  },

  // ---------- Explicación de la canción ----------
  songMeaning: {
    line1: "Y todavía falta algo...",
    line2: "Hay una razón por la que elegí esta canción.",
    // Explicación general (NO es la letra de la canción).
    explanationEs: [
      "\u201cIsn\u2019t She Lovely\u201d no es solo una canción alegre: es la forma en que Stevie Wonder decidió celebrar, en voz alta y sin pena, a alguien que lo llena de asombro.",
      "En español, su idea central sería algo así como: \u201c¿No es hermosa? Mírala, es un milagro que llegó a mi vida y lo cambió todo.\u201d No hay drama, no hay complicación: solo admiración pura y ganas de gritarle al mundo lo afortunado que se siente.",
      "La elegí porque así me siento yo con estos 6 meses: con ganas de decir, sin filtros, que encontrarte fue encontrar algo hermoso. No por perfecta, sino porque contigo todo se siente más liviano, más alegre, más real."
    ]
  },

  // ---------- Pantalla final ----------
  final: {
    line1: "6 meses contigo...",
    line2: "y espero que esto sea solamente una pequeña parte de todo lo que todavía nos queda por vivir.",
    closing: "Feliz 6 meses ❤️"
  }
};

window.CONFIG = CONFIG;
