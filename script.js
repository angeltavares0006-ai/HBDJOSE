/* ═══════════════════════════════════════════════════════════
   FELIZ CUMPLEAÑOS JOSÉ — script.js
   Autor: construido con todo el cariño del mundo
═══════════════════════════════════════════════════════════ */

'use strict';

/* ───────────────────────────────────────────
   1. CURSOR PERSONALIZADO
─────────────────────────────────────────── */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const trail  = document.getElementById('cursorTrail');
  let mx = -100, my = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  // Trail sigue con suavidad
  let tx = -100, ty = -100;
  function animTrail() {
    tx += (mx - tx) * .18;
    ty += (my - ty) * .18;
    trail.style.left = tx + 'px';
    trail.style.top  = ty + 'px';
    requestAnimationFrame(animTrail);
  }
  animTrail();

  // Escalar al pasar sobre elementos interactivos
  const interactives = 'button, a, .polaroid, .n-card, .achievement';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(interactives)) {
      cursor.style.transform = 'translate(-50%,-50%) scale(2.2)';
      cursor.style.background = 'rgba(201,168,76,.6)';
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(interactives)) {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      cursor.style.background = 'var(--gold)';
    }
  });
})();


/* ───────────────────────────────────────────
   2. CANVAS DE ESTRELLAS GLOBAL (fondo)
─────────────────────────────────────────── */
(function initStars() {
  const canvas = document.getElementById('starsCanvas');
  const ctx    = canvas.getContext('2d');
  let W, H, stars = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  for (let i = 0; i < 220; i++) {
    stars.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.4 + .3,
      alpha: Math.random(),
      speed: Math.random() * .4 + .1,
      drift: (Math.random() - .5) * .15
    });
  }

  function drawStars() {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => {
      s.alpha += (Math.random() - .5) * .02;
      s.alpha = Math.max(.05, Math.min(.9, s.alpha));
      s.y -= s.speed * .06;
      s.x += s.drift;
      if (s.y < 0) { s.y = H; s.x = Math.random() * W; }
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(drawStars);
  }
  drawStars();
})();


/* ───────────────────────────────────────────
   3. PARTÍCULAS DE INTRO
─────────────────────────────────────────── */
(function initIntroParticles() {
  const canvas = document.getElementById('introParticles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const particles = [];
  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - .5) * .4,
      vy: (Math.random() - .5) * .4,
      r: Math.random() * 2 + .5,
      alpha: Math.random() * .5 + .1,
      gold: Math.random() > .6
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      const color = p.gold ? `rgba(201,168,76,${p.alpha})` : `rgba(255,255,255,${p.alpha * .5})`;
      ctx.fillStyle = color;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();


/* ───────────────────────────────────────────
   4. INTRO → MAIN TRANSITION
─────────────────────────────────────────── */
document.getElementById('btnStart').addEventListener('click', () => {
  const intro = document.getElementById('intro');
  const main  = document.getElementById('mainContent');

  intro.classList.add('exit');

  setTimeout(() => {
    intro.classList.add('hidden');
    main.classList.remove('hidden');
    // Iniciar experiencia
    startTypewriter();
    initFloatingHearts();
    initScrollReveal();
    initBebopStars();
    initMusicPlayer();
    initGallery();
    initPsyduckBubbles();
    initZeldaParticles();
    initMusicWaves();
    observeFinale();
    // Scroll al inicio
    window.scrollTo(0, 0);
  }, 900);
});


/* ───────────────────────────────────────────
   5. MÁQUINA DE ESCRIBIR
─────────────────────────────────────────── */
function startTypewriter() {
  const el = document.getElementById('typewriterText');
  const sig = document.getElementById('letterSignature');

  const text = `José.

Para muchos eres mi tío.

Pero para mí siempre has sido
el hermano mayor que la vida
decidió regalarme.

Gracias por estar.
Gracias por escucharme.
Gracias por cuidarme.

Hoy no pude comprarte un regalo.

Así que decidí construir uno.

Con mucho cariño...
Feliz cumpleaños.`;

  let i = 0;
  let html = '';
  const speed = 38; // ms por carácter

  // Cursor parpadeante inicial
  el.innerHTML = '<span class="cursor-blink"></span>';

  function type() {
    if (i < text.length) {
      const ch = text[i];
      html += ch === '\n' ? '<br/>' : ch;
      el.innerHTML = html + '<span class="cursor-blink"></span>';
      i++;
      setTimeout(type, ch === '\n' ? speed * 4 : speed);
    } else {
      // Terminar cursor, mostrar firma
      el.innerHTML = html;
      sig.classList.remove('hidden');
      sig.style.opacity = 0;
      setTimeout(() => {
        sig.style.transition = 'opacity 1.2s';
        sig.style.opacity = 1;
      }, 300);
    }
  }

  // Pequeño delay antes de comenzar
  setTimeout(type, 800);
}


/* ───────────────────────────────────────────
   6. CORAZONES FLOTANTES
─────────────────────────────────────────── */
function initFloatingHearts() {
  const container = document.getElementById('floatingHearts');
  const emojis = ['♡', '♥', '✦', '·'];

  function spawnHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    heart.style.cssText = `
      left: ${Math.random() * 100}%;
      bottom: -30px;
      font-size: ${Math.random() * 18 + 10}px;
      color: ${Math.random() > .5 ? '#e75480' : 'rgba(201,168,76,.6)'};
      --drift: ${(Math.random() - .5) * 200};
      animation-duration: ${Math.random() * 6 + 6}s;
      animation-delay: ${Math.random() * 2}s;
    `;
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 12000);
  }

  setInterval(spawnHeart, 800);
}


/* ───────────────────────────────────────────
   7. SCROLL REVEAL (IntersectionObserver)
─────────────────────────────────────────── */
function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal-text, .reveal-card');

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        // Stagger por índice entre hermanos
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal-text, .reveal-card')];
        const i = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${i * 0.12}s`;
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: .15 });

  targets.forEach(t => obs.observe(t));
}


/* ───────────────────────────────────────────
   8. ZELDA — PARTÍCULAS DORADAS
─────────────────────────────────────────── */
function initZeldaParticles() {
  const canvas = document.getElementById('zeldaParticles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width  = canvas.offsetWidth  || window.innerWidth;
    H = canvas.height = canvas.offsetHeight || window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const gp = [];
  for (let i = 0; i < 60; i++) {
    gp.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vy: -(Math.random() * .6 + .2),
      vx: (Math.random() - .5) * .3,
      r: Math.random() * 2.5 + .5,
      life: Math.random()
    });
  }

  function drawGoldParticles() {
    ctx.clearRect(0, 0, W, H);
    gp.forEach(p => {
      p.y += p.vy; p.x += p.vx;
      p.life -= .003;
      if (p.life <= 0 || p.y < 0) {
        p.x = Math.random() * W;
        p.y = H + 10;
        p.life = Math.random() * .8 + .2;
      }
      const alpha = Math.min(p.life * 2, .7);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,168,76,${alpha})`;
      ctx.fill();

      // Brillo
      if (p.r > 1.5) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,201,109,${alpha * .2})`;
        ctx.fill();
      }
    });
    requestAnimationFrame(drawGoldParticles);
  }
  drawGoldParticles();
}


/* ───────────────────────────────────────────
   9. PSYDUCK — BURBUJAS
─────────────────────────────────────────── */
function initPsyduckBubbles() {
  const container = document.getElementById('bubblesContainer');

  function spawnBubble() {
    const b = document.createElement('div');
    b.className = 'bubble';
    const size = Math.random() * 80 + 20;
    b.style.cssText = `
      width:  ${size}px;
      height: ${size}px;
      left:   ${Math.random() * 100}%;
      animation-duration: ${Math.random() * 8 + 6}s;
      animation-delay:    ${Math.random() * 3}s;
    `;
    container.appendChild(b);
    setTimeout(() => b.remove(), 14000);
  }
  for (let i = 0; i < 10; i++) spawnBubble();
  setInterval(spawnBubble, 1200);
}


/* ───────────────────────────────────────────
   10. COWBOY BEBOP — ESTRELLAS CON PARALLAX
─────────────────────────────────────────── */
function initBebopStars() {
  const canvas = document.getElementById('bebopStars');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width  = canvas.offsetWidth  || window.innerWidth;
    H = canvas.height = canvas.offsetHeight || window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const stars = [];
  for (let i = 0; i < 300; i++) {
    stars.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      z: Math.random() * 3 + .5, // "profundidad"
      alpha: Math.random(),
      r: Math.random() * 1.5 + .3
    });
  }

  let scrollY = 0;
  window.addEventListener('scroll', () => { scrollY = window.scrollY; });

  function drawBebop() {
    ctx.clearRect(0, 0, W, H);

    // Gradiente de fondo espacial
    const grad = ctx.createRadialGradient(W*.5, H*.4, 0, W*.5, H*.4, W*.7);
    grad.addColorStop(0, 'rgba(10,15,60,.3)');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    stars.forEach(s => {
      // Parallax: estrellas más profundas se mueven menos
      const py = (s.y + scrollY * .05 * s.z) % H;
      ctx.beginPath();
      ctx.arc(s.x, py, s.r, 0, Math.PI * 2);
      // Algunas doradas
      const isGold = s.alpha > .7 && s.r > 1;
      ctx.fillStyle = isGold
        ? `rgba(201,168,76,${s.alpha * .6})`
        : `rgba(255,255,255,${s.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(drawBebop);
  }
  drawBebop();
}


/* ───────────────────────────────────────────
   11. REPRODUCTOR MUSICAL (visual)
─────────────────────────────────────────── */
function initMusicPlayer() {
  const playBtn  = document.getElementById('playBtn');
  const disc     = document.getElementById('albumDisc');
  const progress = document.getElementById('progressFill');
  const timeEl   = document.getElementById('currentTime');
  const audio    = document.getElementById('audioPlayer');

  let playing = false;
  let rotation = 0;
  let rafId = null;

  function formatTime(s) {
    const m = Math.floor(s / 60);
    const ss = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${ss}`;
  }

  function animate() {
    if (playing) {
      const current = audio.currentTime || 0;
      const duration = audio.duration || 1;

      // giro del disco
      rotation += 0.6;
      disc.style.transform = `rotate(${rotation}deg)`;

      // progreso real
      progress.style.width = `${(current / duration) * 100}%`;

      // tiempo actual
      timeEl.textContent = formatTime(current);

      // fin de canción
      if (current >= duration) {
        playing = false;
        playBtn.textContent = '▶';
      }
    }

    rafId = requestAnimationFrame(animate);
  }

  rafId = requestAnimationFrame(animate);

  // PLAY / PAUSE
  playBtn.addEventListener('click', async () => {
    if (!audio.src && audio.querySelector('source')) {
      audio.load();
    }

    if (audio.paused) {
      await audio.play();
      playing = true;
      playBtn.textContent = '⏸';
    } else {
      audio.pause();
      playing = false;
      playBtn.textContent = '▶';
    }
  });

  // RESET
  document.getElementById('prevBtn').addEventListener('click', () => {
    audio.currentTime = 0;
  });

  // SKIP END
  document.getElementById('nextBtn').addEventListener('click', () => {
    audio.currentTime = audio.duration || 0;
    audio.pause();
    playing = false;
    playBtn.textContent = '▶';
  });

  // duración real
  audio.addEventListener('loadedmetadata', () => {
    const total = document.querySelector('.progress-times span:last-child');
    if (total) total.textContent = formatTime(audio.duration);
  });

  // sincronización si se controla manualmente
  audio.addEventListener('pause', () => {
    playing = false;
    playBtn.textContent = '▶';
  });

  audio.addEventListener('play', () => {
    playing = true;
    playBtn.textContent = '⏸';
  });
}

/* ───────────────────────────────────────────
   12. ONDAS MUSICALES (decorativas)
─────────────────────────────────────────── */
function initMusicWaves() {
  const container = document.getElementById('musicWaves');
  const bars = 60;

  for (let i = 0; i < bars; i++) {
    const bar = document.createElement('div');
    bar.className = 'wave-bar';
    const angle   = (i / bars) * 360;
    const rad     = angle * Math.PI / 180;
    const radius  = 190; // px desde el centro del player
    const cx = 50 + Math.cos(rad) * 47; // %
    const cy = 50 + Math.sin(rad) * 47;
    bar.style.cssText = `
      left:   ${cx}%;
      top:    ${cy}%;
      height: ${Math.random() * 28 + 12}px;
      transform: rotate(${angle}deg) translateY(-50%);
      transform-origin: bottom center;
      animation-duration: ${Math.random() * 1.2 + .6}s;
      animation-delay:    ${Math.random() * 1}s;
    `;
    container.appendChild(bar);
  }
}


/* ───────────────────────────────────────────
   13. GALERÍA DE POLAROIDS
─────────────────────────────────────────── */
function initGallery() {
  const polaroids = document.querySelectorAll('.polaroid');
  const modal     = document.getElementById('photoModal');
  const overlay   = document.getElementById('photoModalOverlay');
  const inner     = document.getElementById('photoModalInner');
  const closeBtn  = document.getElementById('modalClose');

  polaroids.forEach(pol => {
    pol.addEventListener('click', () => {
      // Copiar contenido al modal
      const photo = pol.querySelector('.polaroid-photo');
      inner.style.background = window.getComputedStyle(photo).background;
      inner.innerHTML = photo.querySelector('.pola-overlay').outerHTML;

      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}


/* ───────────────────────────────────────────
   14. FINALE — ESTRELLAS CAYENDO + CONFETI
─────────────────────────────────────────── */
function observeFinale() {
  const section = document.getElementById('sectionFinale');
  let triggered = false;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !triggered) {
        triggered = true;
        runFinale();
        obs.unobserve(section);
      }
    });
  }, { threshold: .3 });

  obs.observe(section);
}

function runFinale() {
  // Estrellas en canvas final
  const canvas = document.getElementById('finaleCanvas');
  const ctx    = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width  = canvas.offsetWidth  || window.innerWidth;
    H = canvas.height = canvas.offsetHeight || window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const shootingStars = [];
  for (let i = 0; i < 120; i++) {
    shootingStars.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight * .5,
      len: Math.random() * 80 + 20,
      speed: Math.random() * 3 + 1,
      alpha: Math.random(),
      angle: Math.PI / 4 + (Math.random() - .5) * .5
    });
  }

  function drawFinale() {
    ctx.clearRect(0, 0, W, H);
    shootingStars.forEach(s => {
      s.x += Math.cos(s.angle) * s.speed;
      s.y += Math.sin(s.angle) * s.speed;
      s.alpha -= .004;
      if (s.alpha <= 0 || s.x > W || s.y > H) {
        s.x = Math.random() * W * .5;
        s.y = Math.random() * H * .3;
        s.alpha = Math.random() * .8 + .2;
      }
      const grad = ctx.createLinearGradient(
        s.x, s.y,
        s.x - Math.cos(s.angle) * s.len,
        s.y - Math.sin(s.angle) * s.len
      );
      grad.addColorStop(0, `rgba(201,168,76,${s.alpha})`);
      grad.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(
        s.x - Math.cos(s.angle) * s.len,
        s.y - Math.sin(s.angle) * s.len
      );
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });
    requestAnimationFrame(drawFinale);
  }
  drawFinale();

  // Confeti
  setTimeout(() => spawnConfetti(), 1500);

  // Revelar líneas de texto con delays
  const lines = [
    { id: 'fl1',       delay: 800 },
    { id: 'fl2',       delay: 1800 },
    { id: 'fl3',       delay: 2800 },
    { id: 'flDivider', delay: 4000 },
    { id: 'fl4',       delay: 5000 },
    { id: 'fl5',       delay: 6200 },
    { id: 'fl6',       delay: 7400 },
  ];
  lines.forEach(({ id, delay }) => {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.classList.add('show');
    }, delay);
  });

  // Botón reiniciar
  setTimeout(() => {
    const btn = document.getElementById('btnRestart');
    btn.classList.remove('hidden');
  }, 9000);
}

function spawnConfetti() {
  const container = document.getElementById('confettiContainer');
  const colors = ['#c9a84c', '#e8c96d', '#fff', '#1a3a6e', '#e75480', '#fde68a', '#60a5fa'];

  for (let i = 0; i < 120; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    const color = colors[Math.floor(Math.random() * colors.length)];
    const spin  = Math.random() * 1080 - 540;
    piece.style.cssText = `
      left: ${Math.random() * 100}%;
      background: ${color};
      width:  ${Math.random() * 8 + 4}px;
      height: ${Math.random() * 8 + 4}px;
      border-radius: ${Math.random() > .5 ? '50%' : '2px'};
      --spin: ${spin}deg;
      animation-duration: ${Math.random() * 3 + 2.5}s;
      animation-delay:    ${Math.random() * 2}s;
      opacity: ${Math.random() * .5 + .5};
    `;
    container.appendChild(piece);
  }
  // Segunda oleada
  setTimeout(() => spawnConfetti2(), 2000);
}

function spawnConfetti2() {
  const container = document.getElementById('confettiContainer');
  const colors = ['#c9a84c', '#e8c96d', '#e75480', '#fde68a'];

  for (let i = 0; i < 80; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    const spin = Math.random() * 720 - 360;
    piece.style.cssText = `
      left: ${Math.random() * 100}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      width:  ${Math.random() * 6 + 3}px;
      height: ${Math.random() * 6 + 3}px;
      border-radius: 50%;
      --spin: ${spin}deg;
      animation-duration: ${Math.random() * 2.5 + 2}s;
      animation-delay:    ${Math.random() * 1}s;
    `;
    container.appendChild(piece);
  }
}


/* ───────────────────────────────────────────
   15. BOTÓN REINICIAR
─────────────────────────────────────────── */
document.addEventListener('click', e => {
  if (e.target.id === 'btnRestart') {
    location.reload();
  }
});


/* ───────────────────────────────────────────
   16. BOTÓN ZELDA — scroll suave a siguiente
─────────────────────────────────────────── */
document.getElementById('btnZelda').addEventListener('click', () => {
  document.getElementById('sectionNintendo').scrollIntoView({ behavior: 'smooth' });
});


/* ───────────────────────────────────────────
   17. PARALLAX LIGERO AL SCROLL
─────────────────────────────────────────── */
(function initParallax() {
  const parallaxEls = [
    { sel: '.zelda-map-frame', factor: .04 },
    { sel: '.bebop-title',     factor: .06 },
    { sel: '.letter-card',     factor: .03 },
  ];

  const mapped = parallaxEls
    .map(p => ({ el: document.querySelector(p.sel), factor: p.factor }))
    .filter(p => p.el);

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const sy = window.scrollY;
        mapped.forEach(({ el, factor }) => {
          const rect = el.getBoundingClientRect();
          const cy   = rect.top + rect.height / 2;
          const off  = (cy - window.innerHeight / 2) * factor;
          el.style.transform = `translateY(${off}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  });
})();


/* ───────────────────────────────────────────
   18. ACHIEVEMENT CARDS — efecto al revelar
─────────────────────────────────────────── */
(function initAchievementObserver() {
  const cards = document.querySelectorAll('.achievement');
  const obs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
          // Breve flash dorado
          const glow = entry.target.querySelector('.ach-glow');
          if (glow) {
            glow.style.transition = 'opacity .5s';
            glow.style.opacity = '1';
            setTimeout(() => { glow.style.opacity = ''; }, 600);
          }
        }, i * 180);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: .2 });
  cards.forEach(c => obs.observe(c));
})();
