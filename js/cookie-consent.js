/**
 * Cookie consent + GA4 (G-X769CSEFRD) — Google Consent Mode v2
 * GA se načte a spustí jen po souhlasu. Odmítnutí = žádný gtag.js, žádná data.
 * Rozšiřitelné přes consent.choices (např. marketing).
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'zameckachrast_cookie_consent';
  var SCHEMA_VERSION = 1;
  var GA_MEASUREMENT_ID = 'G-X769CSEFRD';

  /** Klíč stránky = atribut data-consent-ga-page na <body> */
  var PAGE_EVENTS = {
    uvod: { event: 'key_page_uvod', page_label: 'Úvod' },
    prostory: { event: 'key_page_prostory', page_label: 'Prostory restaurace' },
    ctyri_pepre: { event: 'key_page_ctyri_pepre', page_label: '4 Pepře' },
    menu: { event: 'key_page_menu', page_label: 'Menu' },
    kontakt: { event: 'key_page_kontakt', page_label: 'Kontakt' }
  };

  function readConsent() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (!data || data.schemaVersion !== SCHEMA_VERSION || !data.choices) return null;
      return data;
    } catch (e) {
      return null;
    }
  }

  function saveConsent(choices) {
    var payload = {
      schemaVersion: SCHEMA_VERSION,
      choices: choices,
      updatedAt: new Date().toISOString()
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      /* quota / private mode */
    }
  }

  function getBodyPageKey() {
    var b = document.body;
    return (b && b.getAttribute('data-consent-ga-page')) || '';
  }

  function removeBanner() {
    var bar = document.getElementById('cookie-consent-bar');
    if (bar) bar.remove();
    document.body.classList.remove('cookie-consent-visible');
  }

  function showBanner() {
    if (document.getElementById('cookie-consent-bar')) return;

    var bar = document.createElement('div');
    bar.id = 'cookie-consent-bar';
    bar.className = 'cookie-consent';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-live', 'polite');
    bar.setAttribute('aria-label', 'Souhlas s cookies');

    var inner = document.createElement('div');
    inner.className = 'cookie-consent__inner';

    var textWrap = document.createElement('div');
    textWrap.className = 'cookie-consent__text-wrap';

    var p = document.createElement('p');
    p.className = 'cookie-consent__text';
    p.textContent = 'Používáme cookies pro analýzu návštěvnosti.';

    var more = document.createElement('a');
    more.href = 'ochrana-udaju.html';
    more.className = 'cookie-consent__more';
    more.textContent = 'Více informací';

    textWrap.appendChild(p);
    textWrap.appendChild(more);

    var actions = document.createElement('div');
    actions.className = 'cookie-consent__actions';

    var btnAccept = document.createElement('button');
    btnAccept.type = 'button';
    btnAccept.className = 'cookie-consent__btn cookie-consent__btn--accept';
    btnAccept.textContent = 'Souhlasím';

    var btnReject = document.createElement('button');
    btnReject.type = 'button';
    btnReject.className = 'cookie-consent__btn cookie-consent__btn--reject';
    btnReject.textContent = 'Odmítnout';

    btnAccept.addEventListener('click', onAccept);
    btnReject.addEventListener('click', onDecline);

    actions.appendChild(btnReject);
    actions.appendChild(btnAccept);
    inner.appendChild(textWrap);
    inner.appendChild(actions);
    bar.appendChild(inner);
    document.body.appendChild(bar);
    document.body.classList.add('cookie-consent-visible');
  }

  function fireKeyPageEvent() {
    var key = getBodyPageKey();
    if (!key || typeof window.gtag !== 'function') return;
    var def = PAGE_EVENTS[key];
    if (!def) return;
    window.gtag('event', def.event, { page_label: def.page_label });
  }

  /**
   * Načte gtag.js a po souhlasu nastaví Consent Mode (granted) + config + key event.
   * Bez tohoto volání se k Google Analytics nic neposílá.
   */
  function loadGA4AfterConsent() {
    if (window.__zameckaGA4Ready) {
      fireKeyPageEvent();
      return;
    }

    var existing = document.querySelector('script[data-zamecka-ga4="1"]');
    if (existing) return;

    var s = document.createElement('script');
    s.async = true;
    s.setAttribute('data-zamecka-ga4', '1');
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_MEASUREMENT_ID);

    s.onload = function () {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;

      /* Po inline „default: denied“ — aktivace měření jen se souhlasem */
      gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted'
      });

      gtag('js', new Date());
      gtag('config', GA_MEASUREMENT_ID);

      window.__zameckaGA4Ready = true;
      fireKeyPageEvent();
    };

    document.head.appendChild(s);
  }

  function onAccept() {
    saveConsent({
      analytics: true,
      marketing: false
    });
    removeBanner();
    loadGA4AfterConsent();
  }

  function onDecline() {
    saveConsent({
      analytics: false,
      marketing: false
    });
    removeBanner();
    /* záměrně nenačítáme gtag.js – analytics_storage zůstává v praxi „denied“ (žádné měření) */
  }

  function init() {
    var stored = readConsent();
    if (stored && stored.choices.analytics === true) {
      loadGA4AfterConsent();
      return;
    }
    if (stored && stored.choices.analytics === false) {
      return;
    }
    showBanner();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
