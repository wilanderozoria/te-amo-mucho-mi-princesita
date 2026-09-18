/**
 * animations.js
 * ------------------------------------------------------------------
 * Efectos visuales de la experiencia:
 * 1) Un campo de luciérnagas ambiental (canvas) que vive detrás de
 *    cada escena, como una noche de campo — sutil, cálido, constante.
 * 2) Un pequeño estallido de luz para la pantalla final (sin confeti).
 * ------------------------------------------------------------------
 */

const Fireflies = (() => {
  let canvas, ctx, particles, raf, w, h;
  let intensity = 1; // se puede aumentar en momentos emocionales (ej. escena final)

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function makeParticle() {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.6 + Math.random() * 1.6,
      baseAlpha: 0.15 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
      speed: 0.15 + Math.random() * 0.3,
      driftX: (Math.random() - 0.5) * 0.25,
      driftY: -0.05 - Math.random() * 0.15
    };
  }

  function init(count = 34) {
    canvas = document.getElementById('fireflies');
    ctx = canvas.getContext('2d');
    resize();
    particles = Array.from({ length: count }, makeParticle);
    window.addEventListener('resize', resize);
    tick();
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);
    const t = performance.now() * 0.001;

    particles.forEach((p) => {
      p.phase += 0.015 * p.speed * 10 * 0.1;
      p.x += p.driftX;
      p.y += p.driftY;

      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) { p.y = h + 10; }

      const flicker = 0.5 + 0.5 * Math.sin(t * p.speed * 2 + p.phase);
      const alpha = p.baseAlpha * flicker * intensity;

      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
      grad.addColorStop(0, `rgba(201,166,107,${alpha})`);
      grad.addColorStop(1, 'rgba(201,166,107,0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(243,236,225,${Math.min(alpha * 1.4, 0.9)})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });

    raf = requestAnimationFrame(tick);
  }

  function setIntensity(value) {
    intensity = value;
  }

  return { init, setIntensity };
})();

/**
 * Estallido de luz suave para el cierre final.
 * Nada de confeti: solo motas de luz cálida que suben lentamente.
 */
function lightBurst(container) {
  const layer = document.createElement('div');
  layer.style.position = 'absolute';
  layer.style.inset = '0';
  layer.style.pointerEvents = 'none';
  layer.style.overflow = 'hidden';
  container.appendChild(layer);

  const count = 18;
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('span');
    const size = 3 + Math.random() * 4;
    const left = 10 + Math.random() * 80;
    const delay = Math.random() * 2.2;
    const duration = 4 + Math.random() * 3;

    Object.assign(dot.style, {
      position: 'absolute',
      left: left + '%',
      bottom: '-10px',
      width: size + 'px',
      height: size + 'px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(201,166,107,0.9), rgba(201,166,107,0))',
      opacity: '0',
      animation: `floatUp ${duration}s ease-in ${delay}s infinite`
    });

    layer.appendChild(dot);
  }

  if (!document.getElementById('floatUpKeyframes')) {
    const style = document.createElement('style');
    style.id = 'floatUpKeyframes';
    style.textContent = `
      @keyframes floatUp {
        0% { transform: translateY(0) scale(0.6); opacity: 0; }
        10% { opacity: 1; }
        80% { opacity: 0.6; }
        100% { transform: translateY(-70vh) scale(1.1); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}

/**
 * Revela elementos con clase .stagger-item de forma escalonada.
 * Útil para las líneas de texto de las transiciones emocionales.
 */
function staggerReveal(elements, baseDelay = 220) {
  elements.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * baseDelay);
  });
}

window.Fireflies = Fireflies;
window.lightBurst = lightBurst;
window.staggerReveal = staggerReveal;
