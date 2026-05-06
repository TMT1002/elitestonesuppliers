/* ═══════════════════════════════════════════════
   ELITE STONE SUPPLIERS — Shared JavaScript
   Pages: all
═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── Dropdown menu (mobile toggle) ──────── */
  document.querySelectorAll('.nav-item').forEach(function(item) {
    var link = item.querySelector('a');
    if (link && item.querySelector('.nav-dropdown')) {
      link.addEventListener('click', function(e) {
        if (window.innerWidth <= 975) {
          e.preventDefault();
          item.classList.toggle('open');
        }
      });
    }
  });

  /* ── Mobile menu ─────────────────────────── */
  var toggle   = document.querySelector('.nav-toggle');
  var mobile   = document.querySelector('.nav-mobile');
  var mClose   = document.querySelector('.nav-mobile-close');

  if (toggle && mobile) {
    toggle.addEventListener('click', function () { mobile.classList.add('open'); });
    if (mClose) mClose.addEventListener('click', function () { mobile.classList.remove('open'); });
    mobile.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { mobile.classList.remove('open'); });
    });
  }

  /* ── Sticky nav ──────────────────────────── */
  var header = document.querySelector('.site-header');
  if (header) {
    function updateNav() {
      if (window.scrollY > 60) header.classList.add('sticky');
      else header.classList.remove('sticky');
    }
    window.addEventListener('scroll', updateNav);
    updateNav();
  }

  /* ── Scrollspy (homepage only) ───────────── */
  var spySections = document.querySelectorAll('section[id]');
  var spyLinks    = document.querySelectorAll('.nav-links a[href^="#"], .nav-mobile a[href^="#"]');
  if (spySections.length && spyLinks.length) {
    function updateSpy() {
      var scrollY = window.scrollY + 80;
      var current = '';
      spySections.forEach(function (sec) {
        if (scrollY >= sec.offsetTop) current = sec.id;
      });
      spyLinks.forEach(function (a) {
        a.classList.remove('active');
        var href = a.getAttribute('href');
        if (href === '#' && current === 'home') a.classList.add('active');
        else if (href === '#' + current) a.classList.add('active');
      });
    }
    window.addEventListener('scroll', updateSpy, { passive: true });
    updateSpy();
  }

  /* ── Fade-up animations ──────────────────── */
  var fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    fadeEls.forEach(function (el) { observer.observe(el); });
  } else {
    /* Fallback for old browsers */
    fadeEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ── Gallery lightbox (product detail) ──── */
  var galleryLinks = document.querySelectorAll('.gallery-grid a');
  if (galleryLinks.length) {
    var lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.88);z-index:10000;align-items:center;justify-content:center;cursor:zoom-out;';
    var lbImg = document.createElement('img');
    lbImg.style.cssText = 'max-width:90vw;max-height:90vh;object-fit:contain;border:4px solid rgba(255,255,255,.15);';
    lb.appendChild(lbImg);
    document.body.appendChild(lb);

    galleryLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        lbImg.src = link.href;
        lb.style.display = 'flex';
      });
    });
    lb.addEventListener('click', function () {
      lb.style.display = 'none';
      lbImg.src = '';
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { lb.style.display = 'none'; lbImg.src = ''; }
    });
  }

});
