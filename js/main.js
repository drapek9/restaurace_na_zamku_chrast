/**
 * Restaurace Na Zámku Chrast – Main JavaScript
 * Navigation, hero video, contact form
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // Mobile navigation
  // --------------------------------------------------------------------------
  var navToggle = document.getElementById('nav-toggle');
  var navMobile = document.getElementById('nav-mobile');
  var navOverlay = document.getElementById('nav-overlay');
  var body = document.body;

  function openMenu() {
    if (!navToggle || !navMobile || !navOverlay) return;
    navToggle.setAttribute('aria-expanded', 'true');
    navMobile.classList.add('is-open');
    navOverlay.classList.add('is-visible');
    navOverlay.setAttribute('aria-hidden', 'false');
    body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!navToggle || !navMobile || !navOverlay) return;
    navToggle.setAttribute('aria-expanded', 'false');
    navMobile.classList.remove('is-open');
    navOverlay.classList.remove('is-visible');
    navOverlay.setAttribute('aria-hidden', 'true');
    body.style.overflow = '';
  }

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMobile && navMobile.classList.contains('is-open');
      if (isOpen) closeMenu();
      else openMenu();
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
  }

  if (navMobile) {
    navMobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  // Close menu on escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navMobile && navMobile.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // --------------------------------------------------------------------------
  // Hero video – play when visible, optional mute toggle
  // --------------------------------------------------------------------------
  var heroVideo = document.getElementById('hero-video');
  var heroWrap = heroVideo && heroVideo.closest('.hero__video-wrap');
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.playsInline = true;
    heroVideo.addEventListener('playing', function () {
      if (heroWrap) heroWrap.classList.add('video-playing');
    });
    var playAttempt = heroVideo.play();
    if (playAttempt && typeof playAttempt.then === 'function') {
      playAttempt.catch(function () {});
    } else if (heroWrap) {
      heroWrap.classList.remove('video-playing');
    }
  }

  // --------------------------------------------------------------------------
  // Contact form – basic validation and submit handling (no backend)
  // --------------------------------------------------------------------------
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      var name = document.getElementById('name');
      var email = document.getElementById('email');
      var message = document.getElementById('message');
      var valid = true;

      [name, email, message].forEach(function (field) {
        if (!field) return;
        if (!field.value.trim()) {
          valid = false;
          field.setCustomValidity('Vyplňte prosím toto pole.');
        } else {
          field.setCustomValidity('');
        }
      });

      if (!valid) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      alert('Děkujeme za zprávu. V nejbližší době vás budeme kontaktovat.\n\n(Pozn.: Formulář je zatím bez napojení na server – lze doplnit odeslání na e-mail nebo backend.)');
      contactForm.reset();
    });
  }

  // --------------------------------------------------------------------------
  // Header scroll
  // --------------------------------------------------------------------------
  var siteHeader = document.getElementById('site-header');
  if (siteHeader) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // --------------------------------------------------------------------------
  // Loga dodavatelů – zkopíruje src z první skupiny do druhé (stačí vyplnit src jen v první skupině)
  // --------------------------------------------------------------------------
  var track = document.querySelector('.suppliers__track');
  if (track) {
    var groups = track.querySelectorAll('.suppliers__group');
    if (groups.length >= 2) {
      var firstLogos = groups[0].querySelectorAll('.suppliers__logo img');
      var secondLogos = groups[1].querySelectorAll('.suppliers__logo img');
      firstLogos.forEach(function (img, i) {
        if (secondLogos[i] && img.getAttribute('src')) {
          secondLogos[i].src = img.src;
        }
      });
    }
  }

  // --------------------------------------------------------------------------
  // Menu cards & event cards – click to enlarge (lightbox)
  // --------------------------------------------------------------------------
  var menuCards = document.querySelectorAll('.menu-card');
  var eventCards = document.querySelectorAll('.event-card');
  var lightbox = document.getElementById('menu-lightbox');
  var lightboxImage = lightbox && lightbox.querySelector('.menu-lightbox__image');
  var lightboxClose = lightbox && lightbox.querySelector('.menu-lightbox__close');
  var lightboxOverlay = lightbox && lightbox.querySelector('.menu-lightbox__overlay');
  var lightboxPrev = lightbox && lightbox.querySelector('.menu-lightbox__nav--prev');
  var lightboxNext = lightbox && lightbox.querySelector('.menu-lightbox__nav--next');

  var lightboxGallery = null;

  function openMenuLightbox(src, alt, opts) {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = src || '';
    lightboxImage.alt = alt || '';
    if (opts && opts.galleryItems && opts.galleryItems.length > 0 && opts.index != null) {
      lightboxGallery = { items: opts.galleryItems, index: opts.index };
      lightbox.classList.add('is-gallery');
    } else {
      lightboxGallery = null;
      lightbox.classList.remove('is-gallery');
    }
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenuLightbox() {
    if (!lightbox || !lightboxImage) return;
    lightbox.classList.remove('is-open');
    lightbox.classList.remove('is-gallery');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
    lightboxImage.alt = '';
    lightboxGallery = null;
    document.body.style.overflow = '';
  }

  function lightboxGoPrev() {
    if (!lightboxGallery || !lightboxImage) return;
    lightboxGallery.index = (lightboxGallery.index - 1 + lightboxGallery.items.length) % lightboxGallery.items.length;
    var item = lightboxGallery.items[lightboxGallery.index];
    lightboxImage.src = item.src;
    lightboxImage.alt = item.alt;
  }

  function lightboxGoNext() {
    if (!lightboxGallery || !lightboxImage) return;
    lightboxGallery.index = (lightboxGallery.index + 1) % lightboxGallery.items.length;
    var item = lightboxGallery.items[lightboxGallery.index];
    lightboxImage.src = item.src;
    lightboxImage.alt = item.alt;
  }

  if (lightbox) {
    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeMenuLightbox);
    }
    if (lightboxOverlay) {
      lightboxOverlay.addEventListener('click', closeMenuLightbox);
    }
    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', function (e) { e.stopPropagation(); lightboxGoPrev(); });
    }
    if (lightboxNext) {
      lightboxNext.addEventListener('click', function (e) { e.stopPropagation(); lightboxGoNext(); });
    }
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') {
        closeMenuLightbox();
        return;
      }
      if (lightboxGallery) {
        if (e.key === 'ArrowLeft') {
          lightboxGoPrev();
          e.preventDefault();
        } else if (e.key === 'ArrowRight') {
          lightboxGoNext();
          e.preventDefault();
        }
      }
    });
  }

  if (menuCards.length && lightbox) {
    menuCards.forEach(function (card) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', function () {
        var img = card.querySelector('.menu-card__image');
        if (!img) return;
        openMenuLightbox(img.src, img.alt);
      });
    });
  }

  if (eventCards.length && lightbox) {
    eventCards.forEach(function (card) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', function () {
        var img = card.querySelector('.event-card__image') || card.querySelector('.event-card__poster img');
        if (!img) return;
        openMenuLightbox(img.src, img.alt);
      });
    });
  }

  var akceRokuWraps = document.querySelectorAll('.akce-roku-wrap');
  if (akceRokuWraps.length && lightbox) {
    akceRokuWraps.forEach(function (wrap) {
      wrap.addEventListener('click', function () {
        var img = wrap.querySelector('.akce-roku-img');
        if (!img) return;
        openMenuLightbox(img.src, img.alt);
      });
    });
  }

  var foodtrackGallery = document.getElementById('foodtrack-gallery');
  if (foodtrackGallery && lightbox) {
    var galleryItems = [];
    foodtrackGallery.querySelectorAll('.gallery__item').forEach(function (item) {
      var img = item.querySelector('img');
      galleryItems.push({ src: img ? img.src || '' : '', alt: img ? img.alt || '' : '' });
    });
    foodtrackGallery.querySelectorAll('.gallery__item').forEach(function (item, index) {
      item.style.cursor = 'pointer';
      item.addEventListener('click', function () {
        var img = item.querySelector('img');
        if (!img) return;
        openMenuLightbox(img.src, img.alt, { galleryItems: galleryItems, index: index });
      });
    });
  }

  // --------------------------------------------------------------------------
  // Scroll animations for elements with [data-animate]
  // --------------------------------------------------------------------------
  var animatedEls = document.querySelectorAll('[data-animate]');
  if (animatedEls.length) {
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15
      });

      animatedEls.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      animatedEls.forEach(function (el) {
        el.classList.add('is-visible');
      });
    }
  }
})();
