# Restaurace Na Zámku Chrast

Moderní web restaurace Na Zámku Chrast (RESAL CATERING, s.r.o.) — elegantní, teplý a atmosférický design v prostředí zámecké restaurace.

## Struktura projektu

- **index.html** — Úvodní stránka (hero, o restauraci, ocenění, hodnocení, akce, galerie)
- **prostory.html** — Prostory restaurace (galerie interiér / exteriér / zámek)
- **ctyri-pepre.html** — Koncept 4 Pepře
- **kontakt.html** — Kontakt (adresa, telefon, e-mail, mapa, formulář)
- **css/styles.css** — Jednotné styly
- **js/main.js** — Navigace, formulář, hero video
- **PLAN.md** — Detailní plán a struktura webu

## Jak spustit

1. Otevřete **index.html** v prohlížeči (dvojklik nebo přes Live Server / lokální server).
2. Pro vývoj s automatickým obnovením můžete použít např. rozšíření „Live Server” ve VS Code nebo příkaz:
   ```bash
   npx serve .
   ```
   a otevřít zobrazenou adresu (např. http://localhost:3000).

## Placeholdery

- **Hero:** video v `images/placeholders/hero-video.mp4` (nebo .webm), poster `hero-poster.jpg`. Pokud soubory chybí, zobrazí se tmavý fallback.
- **Obrázky:** Všechny bloky s textem „Placeholder: …” nahraďte vlastními obrázky (interiér, jídlo, akce, galerie, mapa).
- **Kontaktní formulář:** Nyní pouze zobrazí potvrzení; pro odesílání je potřeba doplnit backend nebo nap např. Formspree/Netlify Forms.
- **Mapa:** Na stránce Kontakt je odkaz na Google Maps; do `kontakt.html` lze vložit iframe s embedem z Google Maps.

## Responzivita

- Mobil: &lt; 768px  
- Tablet: 768px–1023px  
- Desktop: ≥ 1024px  

Navigace je v mobilu hamburger menu, na desktopu horizontální menu nahoře.

## Technologie

- HTML5, CSS3 (Grid, Flexbox, custom properties), vanilla JavaScript
- Fonty: Google Fonts (Cormorant Garamond, Source Sans 3)
