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
})();
