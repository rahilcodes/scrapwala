/**
 * animations.js — Scroll Reveal & Micro-interaction Module
 * Scrapwala Hyderabad
 * Handles: IntersectionObserver-based reveal, hero stagger, stat counter
 */

const Animations = (() => {
  function init() {
    setupReveal();
    setupHeroStagger();
    setupStatCounters();
    setupTickerPause();
  }

  // ---- Scroll Reveal via IntersectionObserver ----
  function setupReveal() {
    const revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(el => observer.observe(el));
  }

  // ---- Hero Content Stagger ----
  function setupHeroStagger() {
    const heroContent = document.querySelector('.hero__content');
    if (!heroContent) return;

    const children = heroContent.children;
    Array.from(children).forEach((child, i) => {
      child.style.animation = `fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.1}s both`;
    });
  }

  // ---- Stat Counter Animation ----
  function setupStatCounters() {
    const statNums = document.querySelectorAll('[data-count]');
    if (!statNums.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const prefix = el.dataset.prefix || '';
          const suffix = el.dataset.suffix || '';
          animateCount(el, 0, target, prefix, suffix, 1800);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNums.forEach(el => observer.observe(el));
  }

  function animateCount(el, start, end, prefix, suffix, duration) {
    const range = end - start;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + range * eased);
      el.textContent = prefix + current.toLocaleString('en-IN') + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  // ---- Pause ticker on hover ----
  function setupTickerPause() {
    const belt = document.querySelector('.ticker__belt');
    const ticker = document.querySelector('.ticker');
    if (!belt || !ticker) return;

    ticker.addEventListener('mouseenter', () => {
      belt.style.animationPlayState = 'paused';
    });
    ticker.addEventListener('mouseleave', () => {
      belt.style.animationPlayState = 'running';
    });
  }

  return { init };
})();
