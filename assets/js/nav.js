/**
 * nav.js — Navigation Module
 * Scrapwala Hyderabad
 * Handles: mobile menu toggle, scroll behavior, active link highlighting
 */

const Nav = (() => {
  let navEl, hamburger, mobileMenu, isOpen;

  function init() {
    navEl = document.getElementById('main-nav');
    hamburger = document.getElementById('nav-hamburger');
    mobileMenu = document.getElementById('nav-mobile');
    isOpen = false;

    if (!navEl) return;

    // Scroll behavior — add shadow class when scrolled
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Hamburger toggle
    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', toggleMenu);
    }

    // Close mobile menu on link click
    if (mobileMenu) {
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
      });
    }

    // Mark active nav link
    markActiveLink();

    // Close menu on ESC
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && isOpen) closeMenu();
    });
  }

  function onScroll() {
    if (!navEl) return;
    if (window.scrollY > 20) {
      navEl.classList.add('scrolled');
    } else {
      navEl.classList.remove('scrolled');
    }
  }

  function toggleMenu() {
    isOpen ? closeMenu() : openMenu();
  }

  function openMenu() {
    isOpen = true;
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    isOpen = false;
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  function markActiveLink() {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.nav__links a, .nav__mobile a');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      // Exact match for home, prefix match for sub-pages
      if (href === '/' || href === '/index.html') {
        if (currentPath === '/' || currentPath === '/index.html') {
          link.classList.add('active');
        }
      } else if (currentPath.includes(href) && href !== '/') {
        link.classList.add('active');
      }
    });
  }

  return { init };
})();
