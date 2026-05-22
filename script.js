'use strict';

if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('pageshow', () => window.scrollTo(0, 0));

document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);
  setTimeout(() => window.scrollTo(0, 0), 100);

  // ---- Custom cursor ----
  const cursor = document.getElementById('cursor');
  let mx = 0, my = 0, cx = 0, cy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  function animateCursor() {
    cx += (mx - cx) * 0.15;
    cy += (my - cy) * 0.15;
    cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll('a, button, .modal__btn, .hero__btn').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

  // ---- Particles ----
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const container = document.getElementById('particles');
  container.appendChild(canvas);
  let w, h, particles = [];

  function resize() {
    w = canvas.width = container.offsetWidth;
    h = canvas.height = container.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() {
      this.reset();
      this.y = Math.random() * h;
    }
    reset() {
      this.x = Math.random() * w;
      this.y = -10;
      this.size = Math.random() * 3 + 1;
      this.speedY = Math.random() * 0.8 + 0.2;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.alpha = Math.random() * 0.4 + 0.1;
      this.hue = Math.random() > 0.5 ? 330 : 300;
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      if (this.y > h + 10) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 80%, 70%, ${this.alpha})`;
      ctx.fill();
    }
  }

  const count = window.innerWidth <= 768 ? 20 : 60;
  for (let i = 0; i < count; i++) particles.push(new Particle());

  function drawParticles() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(drawParticles);
  }
  drawParticles();

  // ---- Header scroll ----
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  });

  // ---- Stats counter ----
  const stats = document.querySelectorAll('.stat__num');
  let statsStarted = false;

  function animateStats() {
    if (statsStarted) return;
    statsStarted = true;
    stats.forEach(el => {
      const target = parseInt(el.dataset.target);
      const duration = 2000;
      const start = performance.now();
      function update(now) {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.floor(eased * target);
        if (t < 1) requestAnimationFrame(update);
        else el.textContent = target;
      }
      requestAnimationFrame(update);
    });
  }

  // ---- Scroll reveal ----
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');

      if (entry.target.closest('.about__stats')) {
        animateStats();
      }

      if (entry.target.closest('.services__grid')) {
        const cards = entry.target.closest('.services__grid').querySelectorAll('.service-card');
        cards.forEach((card, i) => {
          setTimeout(() => card.classList.add('visible'), i * 80);
        });
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.about__stats, .services__grid, .service-card').forEach(el => {
    if (!el.classList.contains('service-card')) revealObserver.observe(el);
  });

  // ---- Modal ----
  const contactBtn = document.getElementById('contactBtn');
  const headerContactBtn = document.getElementById('headerContactBtn');
  const modal = document.getElementById('contactModal');

  function openModal(e) {
    if (e) e.preventDefault();
    modal.classList.add('open');
  }

  if (contactBtn && modal) {
    contactBtn.addEventListener('click', openModal);
  }
  if (headerContactBtn && modal) {
    headerContactBtn.addEventListener('click', openModal);
  }

  if (modal) {
    const closeBtn = modal.querySelector('.modal__close');
    const overlay = modal.querySelector('.modal__overlay');

    function closeModal() { modal.classList.remove('open'); }
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeModal();
    });

    modal.querySelectorAll('.modal__btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        if (action === 'call') {
          window.location.href = 'tel:+37377742921';
        } else if (action === 'telegram') {
          window.open('https://t.me/+8axplsiFQ6FiNjUy', '_blank');
        } else if (action === 'whatsapp') {
          window.open('https://api.whatsapp.com/send/?phone=37377742921&text&type=phone_number&app_absent=0', '_blank');
        }
        closeModal();
      });
    });
  }

});
