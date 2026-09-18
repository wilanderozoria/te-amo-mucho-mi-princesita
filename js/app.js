/**
 * app.js
 * ------------------------------------------------------------------
 * Controla el flujo completo de la experiencia: navegación entre
 * escenas, formularios, galería, carta, música y pantalla final.
 * ------------------------------------------------------------------
 */

(function () {
  'use strict';

  // ---------------------------------------------------------------
  // Estado de la experiencia (en memoria, no persistente)
  // ---------------------------------------------------------------
  const state = {
    herName: '',
    myName: '',
    dateValue: '' // yyyy-mm-dd
  };

  // Orden real de la historia. progress = índice del punto en el indicador.
  const SCENES = [
    { key: 'welcome',     progress: 0 },
    { key: 'names',       progress: 1 },
    { key: 'date',        progress: 2 },
    { key: 'dateReveal',  progress: 2 },
    { key: 'intro',       progress: 3 },
    { key: 'music',       progress: 4 },
    { key: 'gallery',     progress: 5 },
    { key: 'charcas',     progress: 6 },
    { key: 'letterIntro', progress: 7 },
    { key: 'letter',      progress: 7 },
    { key: 'song',        progress: 8 },
    { key: 'final',       progress: 9 }
  ];
  const PROGRESS_TOTAL = 10;

  let activeIntervals = [];
  const clearActiveIntervals = () => {
    activeIntervals.forEach(clearInterval);
    activeIntervals = [];
  };

  // ---------------------------------------------------------------
  // Navegación entre escenas
  // ---------------------------------------------------------------
  function showScene(key) {
    clearActiveIntervals();

    document.querySelectorAll('.scene').forEach((el) => el.classList.remove('active'));
    const target = document.querySelector(`[data-scene="${key}"]`);
    if (target) target.classList.add('active');

    updateProgress(key);

    if (typeof ENTER_HOOKS[key] === 'function') {
      // pequeño respiro para que la transición de salida/entrada se sienta natural
      setTimeout(() => ENTER_HOOKS[key](), 120);
    }
  }

  function updateProgress(key) {
    const meta = SCENES.find((s) => s.key === key);
    const idx = meta ? meta.progress : 0;
    const dots = document.querySelectorAll('#progressDots span');
    dots.forEach((dot, i) => {
      dot.classList.toggle('done', i < idx);
      dot.classList.toggle('current', i === idx);
    });
  }

  function buildProgressDots() {
    const wrap = document.getElementById('progressDots');
    wrap.innerHTML = '';
    for (let i = 0; i < PROGRESS_TOTAL; i++) {
      const span = document.createElement('span');
      wrap.appendChild(span);
    }
  }

  // ---------------------------------------------------------------
  // Texto estático desde content.js (CONFIG)
  // ---------------------------------------------------------------
  function paintStaticText() {
    const c = window.CONFIG;

    document.getElementById('welcomeEyebrow').textContent = c.welcome.eyebrow;
    document.getElementById('welcomeTitle').textContent = c.welcome.title;
    document.getElementById('btnStart').textContent = c.welcome.button;

    document.getElementById('namesIntro').textContent = c.names.intro;
    document.getElementById('herLabel').textContent = c.names.herLabel;
    document.getElementById('herName').placeholder = c.names.herPlaceholder;
    document.getElementById('myLabel').textContent = c.names.myLabel;
    document.getElementById('myName').placeholder = c.names.myPlaceholder;
    document.getElementById('btnNamesContinue').textContent = c.names.button;

    document.getElementById('datePrompt').textContent = c.date.prompt;
    document.getElementById('btnDateSave').textContent = c.date.button;
    document.getElementById('dateRevealCaption').textContent = c.date.afterLabel;

    document.getElementById('introLine1').textContent = c.intro.line1;
    document.getElementById('introLine2').textContent = c.intro.line2;

    document.getElementById('galleryKicker').textContent = c.gallery.kicker;

    document.getElementById('charcasLine1').textContent = c.charcas.line1;
    document.getElementById('charcasLine2').textContent = c.charcas.line2;
    document.getElementById('charcasLine3').textContent = c.charcas.line3;

    document.getElementById('letterIntroLine1').textContent = c.letterIntro.line1;
    document.getElementById('letterIntroLine2').textContent = c.letterIntro.line2;
    document.getElementById('btnReadLetter').textContent = c.letterIntro.button;

    document.getElementById('songLine1').textContent = c.songMeaning.line1;
    document.getElementById('songLine2').textContent = c.songMeaning.line2;
    document.getElementById('songName').textContent = c.song.title;
    document.getElementById('songArtist').textContent = c.song.artist;

    const explWrap = document.getElementById('songExplanation');
    explWrap.innerHTML = '';
    c.songMeaning.explanationEs.forEach((paragraph) => {
      const p = document.createElement('p');
      p.textContent = paragraph;
      explWrap.appendChild(p);
    });

    document.getElementById('finalLine1').textContent = c.final.line1;
    document.getElementById('finalLine2').textContent = c.final.line2;
    document.getElementById('finalClosing').textContent = c.final.closing;

    // Carta
    const letterBody = document.getElementById('letterBody');
    letterBody.innerHTML = '';
    window.LETTER_PARAGRAPHS.forEach((paragraph) => {
      const p = document.createElement('p');
      p.className = 'letter-paragraph stagger-item';
      p.textContent = paragraph;
      letterBody.appendChild(p);
    });
    document.getElementById('letterSignature').textContent = window.LETTER_SIGNATURE;
  }

  // ---------------------------------------------------------------
  // Escena: bienvenida
  // ---------------------------------------------------------------
  function setupWelcome() {
    document.getElementById('btnStart').addEventListener('click', () => showScene('names'));
  }

  // ---------------------------------------------------------------
  // Escena: nombres
  // ---------------------------------------------------------------
  function setupNames() {
    const her = document.getElementById('herName');
    const my = document.getElementById('myName');
    const btn = document.getElementById('btnNamesContinue');

    function validate() {
      btn.disabled = !(her.value.trim().length > 0 && my.value.trim().length > 0);
    }

    her.addEventListener('input', validate);
    my.addEventListener('input', validate);

    btn.addEventListener('click', () => {
      state.herName = her.value.trim();
      state.myName = my.value.trim();
      showScene('date');
    });
  }

  // ---------------------------------------------------------------
  // Escena: fecha
  // ---------------------------------------------------------------
  function formatDateEs(isoValue) {
    if (!isoValue) return '';
    const [y, m, d] = isoValue.split('-');
    return `${d} · ${m} · ${y}`;
  }

  function setupDate() {
    const input = document.getElementById('dateInput');
    const btn = document.getElementById('btnDateSave');

    input.addEventListener('input', () => {
      btn.disabled = !input.value;
    });

    btn.addEventListener('click', () => {
      state.dateValue = input.value;
      document.getElementById('dateRevealText').textContent = formatDateEs(state.dateValue);
      showScene('dateReveal');
    });

    document.getElementById('btnDateRevealContinue').addEventListener('click', () => {
      showScene('intro');
    });
  }

  // ---------------------------------------------------------------
  // Escena: introducción emocional
  // ---------------------------------------------------------------
  function enterIntro() {
    const scene = document.querySelector('[data-scene="intro"]');
    const items = scene.querySelectorAll('.stagger-item');
    items.forEach((el) => el.classList.remove('visible'));
    staggerReveal(items, 650);
  }

  function setupIntro() {
    document.getElementById('btnIntroContinue').addEventListener('click', () => showScene('music'));
  }

  // ---------------------------------------------------------------
  // Escena: música
  // ---------------------------------------------------------------
  const audio = document.getElementById('bgMusic');
  let musicStarted = false;

  function fadeInAudio(target, duration = 2200) {
    audio.volume = 0;
    const steps = 30;
    const stepTime = duration / steps;
    let i = 0;
    const fade = setInterval(() => {
      i++;
      audio.volume = Math.min(target, (target * i) / steps);
      if (i >= steps) clearInterval(fade);
    }, stepTime);
  }

  function startMusic() {
    if (musicStarted) return;
    musicStarted = true;
    const target = (window.CONFIG.song.defaultVolume) || 0.55;

    audio.play().catch(() => {
      // Reproducción bloqueada por el navegador; el control manual seguirá disponible.
    });
    fadeInAudio(target);

    document.getElementById('musicControl').classList.add('visible');
    document.getElementById('volumeSlider').value = target;
  }

  function setupMusicControls() {
    const btnPlayPause = document.getElementById('btnPlayPause');
    const btnMute = document.getElementById('btnMute');
    const volumeSlider = document.getElementById('volumeSlider');
    const iconPlay = document.getElementById('iconPlay');
    const iconPause = document.getElementById('iconPause');
    const iconVolOn = document.getElementById('iconVolOn');
    const iconVolOff = document.getElementById('iconVolOff');

    btnPlayPause.addEventListener('click', () => {
      if (audio.paused) {
        audio.play().catch(() => {});
        iconPlay.style.display = 'none';
        iconPause.style.display = '';
      } else {
        audio.pause();
        iconPlay.style.display = '';
        iconPause.style.display = 'none';
      }
    });

    btnMute.addEventListener('click', () => {
      audio.muted = !audio.muted;
      iconVolOn.style.display = audio.muted ? 'none' : '';
      iconVolOff.style.display = audio.muted ? '' : 'none';
    });

    volumeSlider.addEventListener('input', () => {
      audio.volume = parseFloat(volumeSlider.value);
      if (audio.volume === 0) {
        audio.muted = true;
        iconVolOn.style.display = 'none';
        iconVolOff.style.display = '';
      } else if (audio.muted) {
        audio.muted = false;
        iconVolOn.style.display = '';
        iconVolOff.style.display = 'none';
      }
    });
  }

  function setupMusicScene() {
    document.getElementById('btnPlayMusic').addEventListener('click', () => {
      startMusic();
      showScene('gallery');
    });
  }

  // ---------------------------------------------------------------
  // Galería genérica (usada en "gallery" y "charcas")
  // ---------------------------------------------------------------
  function buildSlideshow(frameEl, dotsEl, photos, options = {}) {
    const interval = options.interval || 4200;
    frameEl.innerHTML = '';
    dotsEl.innerHTML = '';

    if (!photos || photos.length === 0) return;

    photos.forEach((photo, i) => {
      const slide = document.createElement('div');
      slide.className = 'gallery-photo';

      const fallback = document.createElement('div');
      fallback.className = 'fallback';
      fallback.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="#c9a66b" stroke-width="1.2">
          <path d="M12 21s-7.5-4.6-10-9.1C.5 8.6 2.2 5 5.8 5c2 0 3.4 1.1 4.2 2.4C10.8 6.1 12.2 5 14.2 5c3.6 0 5.3 3.6 3.8 6.9C15.5 16.4 12 21 12 21z"/>
        </svg>`;
      slide.appendChild(fallback);

      const img = new Image();
      img.onload = () => {
        slide.style.backgroundImage = `url("${photo.src}")`;
        slide.classList.add('has-photo');
      };
      img.onerror = () => {
        // se mantiene el fallback decorativo, sin romper la experiencia
      };
      img.src = photo.src;

      if (photo.caption) {
        const cap = document.createElement('div');
        cap.className = 'gallery-caption';
        cap.textContent = photo.caption;
        slide.appendChild(cap);
      }

      frameEl.appendChild(slide);

      const dot = document.createElement('span');
      dotsEl.appendChild(dot);
    });

    const slides = frameEl.querySelectorAll('.gallery-photo');
    const dots = dotsEl.querySelectorAll('span');

    let current = 0;
    function activate(i) {
      slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
      dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
      const cap = slides[i].querySelector('.gallery-caption');
      slides.forEach((s) => s.querySelectorAll('.gallery-caption').forEach((c) => c.classList.remove('active')));
      if (cap) cap.classList.add('active');
    }

    activate(0);

    // Cambiamos la progresión automática por una manual (clic en la foto)
    slides.forEach((slide) => {
      slide.addEventListener('click', () => {
        current++;
        if (current >= slides.length) {
          if (typeof options.onComplete === 'function') options.onComplete();
        } else {
          activate(current);
        }
      });
    });
  }

  function enterGallery() {
    const frame = document.getElementById('galleryFrame');
    const dots = document.getElementById('galleryDots');
    buildSlideshow(frame, dots, window.GALLERY_PHOTOS, {
      interval: 4200,
      onComplete: () => showScene('charcas')
    });
  }

  function setupGallery() {
    document.getElementById('btnGallerySkip').addEventListener('click', () => showScene('charcas'));
  }

  // ---------------------------------------------------------------
  // Las Charcas
  // ---------------------------------------------------------------
  function enterCharcas() {
    const scene = document.querySelector('[data-scene="charcas"]');
    const items = scene.querySelectorAll('.stagger-item');
    items.forEach((el) => el.classList.remove('visible'));
    staggerReveal(items, 550);

    const frame = document.getElementById('charcasFrame');
    const dots = document.getElementById('charcasDots');
    setTimeout(() => {
      buildSlideshow(frame, dots, window.CHARCAS_PHOTOS, { interval: 4000 });
    }, 400);
  }

  function setupCharcas() {
    document.getElementById('btnCharcasContinue').addEventListener('click', () => showScene('letterIntro'));
  }

  // ---------------------------------------------------------------
  // Transición a la carta
  // ---------------------------------------------------------------
  function enterLetterIntro() {
    const scene = document.querySelector('[data-scene="letterIntro"]');
    const items = scene.querySelectorAll('.stagger-item');
    items.forEach((el) => el.classList.remove('visible'));
    staggerReveal(items, 650);
  }

  function setupLetterIntro() {
    document.getElementById('btnReadLetter').addEventListener('click', () => showScene('letter'));
  }

  // ---------------------------------------------------------------
  // Carta
  // ---------------------------------------------------------------
  function enterLetter() {
    const paragraphs = document.querySelectorAll('#letterBody .letter-paragraph');
    const signature = document.getElementById('letterSignature');
    const continueBtn = document.getElementById('btnLetterContinue');

    paragraphs.forEach((p) => p.classList.remove('visible'));
    signature.classList.remove('visible');
    continueBtn.style.opacity = '0';

    paragraphs.forEach((p, i) => {
      setTimeout(() => p.classList.add('visible'), 500 + i * 700);
    });

    const totalDelay = 500 + paragraphs.length * 700;
    setTimeout(() => signature.classList.add('visible'), totalDelay + 200);
    setTimeout(() => { continueBtn.style.opacity = '1'; }, totalDelay + 700);
  }

  function setupLetter() {
    document.getElementById('btnLetterContinue').addEventListener('click', () => showScene('song'));
  }

  // ---------------------------------------------------------------
  // Significado de la canción
  // ---------------------------------------------------------------
  function enterSong() {
    const scene = document.querySelector('[data-scene="song"]');
    const items = scene.querySelectorAll('.stagger-item');
    items.forEach((el) => el.classList.remove('visible'));
    staggerReveal(items, 500);
  }

  function setupSong() {
    document.getElementById('btnSongContinue').addEventListener('click', () => showScene('final'));
  }

  // ---------------------------------------------------------------
  // Final
  // ---------------------------------------------------------------
  function enterFinal() {
    document.getElementById('finalNames').textContent = `${state.herName} ❤️ ${state.myName}`;
    document.getElementById('finalDate').textContent = formatDateEs(state.dateValue);

    const scene = document.querySelector('[data-scene="final"]');
    const items = scene.querySelectorAll('.stagger-item');
    items.forEach((el) => el.classList.remove('visible'));
    staggerReveal(items, 600);

    Fireflies.setIntensity(1.8);
    lightBurst(scene);
  }

  // ---------------------------------------------------------------
  // Hooks de entrada por escena
  // ---------------------------------------------------------------
  const ENTER_HOOKS = {
    intro: enterIntro,
    gallery: enterGallery,
    charcas: enterCharcas,
    letterIntro: enterLetterIntro,
    letter: enterLetter,
    song: enterSong,
    final: enterFinal
  };

  // ---------------------------------------------------------------
  // Inicialización
  // ---------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    paintStaticText();
    buildProgressDots();
    updateProgress('welcome');
    Fireflies.init();

    setupWelcome();
    setupNames();
    setupDate();
    setupIntro();
    setupMusicScene();
    setupMusicControls();
    setupGallery();
    setupCharcas();
    setupLetterIntro();
    setupLetter();
    setupSong();
  });
})();
