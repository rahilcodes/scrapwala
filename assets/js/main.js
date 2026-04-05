/**
 * main.js — Application Entry Point
 * Scrapwala Hyderabad
 * Initializes all modules after DOM is ready
 */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof Nav !== 'undefined') Nav.init();
  if (typeof Calculator !== 'undefined') Calculator.init();
  if (typeof FAQ !== 'undefined') FAQ.init();
  if (typeof Form !== 'undefined') Form.init();
  if (typeof Animations !== 'undefined') Animations.init();

  // ---- Smart Price Timestamp ----
  const priceTimestamp = document.getElementById('price-timestamp');
  if (priceTimestamp) {
    const now = new Date();
    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
    priceTimestamp.textContent = `Prices updated: Today, ${hours}:${minutes} ${ampm}`;
  }

  // ---- Interactive WA Widget ----
  const waFab = document.getElementById('wa-fab');
  const waPopup = document.getElementById('wa-popup');
  const waClose = document.getElementById('wa-close');
  const waBadge = document.getElementById('wa-badge');
  const waTime = document.getElementById('wa-time');

  if (waFab && waPopup) {
    if (waTime) {
      const now = new Date();
      waTime.textContent = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
    }
    
    waFab.addEventListener('click', () => {
      waPopup.classList.add('show');
      if (waBadge) waBadge.style.opacity = '0';
    });
    
    if (waClose) {
      waClose.addEventListener('click', () => {
        waPopup.classList.remove('show');
      });
    }
  }

  // ---- WhatsApp area-page pre-fill ----
  // If page has data-area attribute, pre-fill area in booking form
  const bodyArea = document.body.dataset.area;
  if (bodyArea) {
    const areaInput = document.getElementById('form-area');
    if (areaInput) areaInput.value = bodyArea;
  }

  // ---- Area pill links (make them navigate) ----
  document.querySelectorAll('.area-pill[data-href]').forEach(pill => {
    pill.addEventListener('click', () => {
      window.location.href = pill.dataset.href;
    });
    pill.style.cursor = 'pointer';
  });

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = document.getElementById('main-nav')?.offsetHeight || 66;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- Copy phone on click ----
  document.querySelectorAll('[data-copy-phone]').forEach(el => {
    el.addEventListener('click', () => {
      navigator.clipboard.writeText('+919392901664').then(() => {
        const original = el.textContent;
        el.textContent = 'Copied!';
        setTimeout(() => { el.textContent = original; }, 1500);
      }).catch(() => {});
    });
  });
});
