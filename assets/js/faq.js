/**
 * faq.js — FAQ Accordion Module
 * Scrapwala Hyderabad
 * Handles: accordion expand/collapse with smooth animation
 */

const FAQ = (() => {
  function init() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
      const question = item.querySelector('.faq-item__question');
      if (!question) return;

      question.addEventListener('click', () => toggle(item, faqItems));

      // Allow keyboard activation
      question.setAttribute('tabindex', '0');
      question.setAttribute('role', 'button');
      question.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle(item, faqItems);
        }
      });
    });

    // Open first item by default if present
    if (faqItems[0]) {
      faqItems[0].classList.add('open');
    }
  }

  function toggle(item, allItems) {
    const isOpen = item.classList.contains('open');

    // Close all
    allItems.forEach(i => {
      i.classList.remove('open');
      const q = i.querySelector('.faq-item__question');
      if (q) q.setAttribute('aria-expanded', 'false');
    });

    // Open clicked if it was closed
    if (!isOpen) {
      item.classList.add('open');
      const q = item.querySelector('.faq-item__question');
      if (q) q.setAttribute('aria-expanded', 'true');
    }
  }

  return { init };
})();
