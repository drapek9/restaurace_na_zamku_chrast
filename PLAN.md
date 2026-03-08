# Restaurace Na Zámku Chrast – Website Plan & Structure

**Client:** RESAL CATERING, s.r.o.  
**Restaurant:** Restaurace Na Zámku Chrast  
**Project:** Modern, elegant castle restaurant website

---

## 1. Design Direction

### 1.1 Mood & Atmosphere
- **Elegant** – refined typography, generous whitespace, subtle animations
- **Warm** – warm neutrals (cream, sand, soft gold), accent burgundy/wine
- **Atmospheric** – strong use of imagery, video hero, gallery grids
- **Castle-inspired** – not “medieval”, but dignified and timeless

### 1.2 Color Palette
| Role        | Color        | Use |
|------------|--------------|-----|
| Primary    | #5C2E2E (burgundy) | Headers, accents, buttons |
| Secondary  | #C9A962 (gold)     | Highlights, borders, stars |
| Background | #F8F5F0 (cream)    | Page background |
| Dark       | #2C2420 (charcoal) | Text, footer |
| Light text | #FFFFFF            | On dark/video overlays |

### 1.3 Typography
- **Headings:** Cormorant Garamond (elegant serif) – fallback: Georgia
- **Body:** Source Sans 3 (readable, modern) – fallback: system sans
- **Decorative:** Optional script for taglines only

### 1.4 Visual Elements
- Hero: full-width background video with overlay and short intro text
- Sections: alternating light/dark where it supports storytelling
- Images: placeholders with aspect ratios (16:9, 4:3, 1:1) for gallery
- Event posters: dedicated placeholder areas (e.g. 3:4)
- Icons: minimal, line-style for ratings, contact, awards

---

## 2. Site Structure & Navigation

### 2.1 Global Navigation (top, always visible)
- **Úvod** (Home)
- **Prostory restaurace**
- **4 Pepře**
- **Kontakt**

Logo left, menu right (desktop); hamburger menu on mobile.

### 2.2 Pages Overview

| Page               | File          | Purpose |
|--------------------|---------------|---------|
| Úvodní stránka     | index.html    | Hero, about, awards, ratings, events, gallery |
| Prostory restaurace| prostory.html | Interior/exterior/castle gallery |
| 4 Pepře            | ctyri-pepre.html | Concept page (inspired by current 4 Pepře) |
| Kontakt            | kontakt.html  | Address, phone, email, map, contact form |

---

## 3. Page-by-Page Structure

### 3.1 Home Page (index.html)

1. **Hero**
   - Full-viewport background video (placeholder: `<video>` with poster)
   - Dark overlay for readability
   - Headline: e.g. “Restaurace Na Zámku Chrast”
   - Short tagline overlay
   - Optional CTA: “Prohlédnout nabídku” or “Rezervovat”

2. **O restauraci (About)**
   - Heading + short story/description
   - One large placeholder image (atmosphere)
   - Optional quote (e.g. 70% chuti…)

3. **Ocenění – Hvězda sládků**
   - Section title
   - Award visual placeholder (logo/badge)
   - Short text about the award

4. **Hodnocení (Ratings)**
   - Two blocks: Google rating, Facebook rating
   - Stars (font/icon) + number (e.g. 4.8, 98%)
   - No individual reviews, only averages

5. **Akce (Events)**
   - Section title
   - 2 event cards:
     - Poster image placeholder
     - Title
     - Short description
     - Date
   - Optional “Všechny akce” link (can go to # or future page)

6. **Galerie (Photo gallery)**
   - Grid with varied sizes (masonry-like or CSS grid with span)
   - 6–9 image placeholders
   - Improves atmosphere and visual storytelling

7. **Footer**
   - Company name, address, phone, email
   - Links to pages
   - Optional social icons (Facebook)

---

### 3.2 Prostory restaurace (prostory.html)

- **Page title** + short intro
- **Gallery**: interior, exterior, castle spaces
- Grid layout (e.g. 3 columns desktop, 2 tablet, 1 mobile)
- Placeholders with labels: “Interiér”, “Exteriér”, “Zámek”
- Focus on atmosphere; minimal text

---

### 3.3 4 Pepře (ctyri-pepre.html)

- **Concept page** (inspired by current zameckachrast.cz 4 Pepře)
- Structure:
  - Hero/header with title “4 Pepře”
  - Intro paragraph
  - 4 blocks (one per “pepř”) – each: heading, short text, optional image
  - Modernized layout (cards or alternating image/text)
- Placeholder content; client can fill with real concept text

---

### 3.4 Kontakt (kontakt.html)

- **Contact info**
  - Address: Náměstí 1, Chrast
  - Phone: +420 773 549 795
  - Email: info@zameckachrast.cz
- **Map**
  - Embedded map placeholder (e.g. Google Maps iframe or static image with link)
  - Location: Chrast, Náměstí 1 (castle/restaurant)
- **Contact form**
  - Name, Email, Subject, Message
  - Submit button (no backend; form can be wired later)

---

## 4. Technical Stack

- **HTML5** – semantic sections, accessibility (labels, headings)
- **CSS3** – custom properties for colors/fonts, Grid/Flexbox, responsive breakpoints
- **JavaScript** – minimal: navigation (mobile menu), gallery lightbox or smooth scroll, form validation/placeholder behavior
- **No build step** – plain HTML/CSS/JS, run in browser
- **Responsive** – mobile-first or desktop-first with breakpoints (e.g. 768px, 1024px)

---

## 5. File Structure

```
restaurace_na_zamku_chrast/
├── index.html          # Home
├── prostory.html       # Prostory restaurace
├── ctyri-pepre.html    # 4 Pepře
├── kontakt.html        # Kontakt
├── css/
│   └── styles.css      # Global + page-specific styles
├── js/
│   └── main.js         # Navigation, gallery, form
├── images/             # (optional) placeholder images
│   └── placeholders/
└── PLAN.md             # This document
```

---

## 6. Placeholders Summary

- **Hero:** 1× background video (poster image fallback)
- **About:** 1× large atmosphere image
- **Awards:** 1× award badge/logo
- **Events:** 2× event poster images
- **Home gallery:** 6–9× photos (different sizes in grid)
- **Prostory:** 6–12× gallery images (interior/exterior/castle)
- **4 Pepře:** 0–4× concept images (optional per block)
- **Kontakt:** 1× map (iframe or image with link)

All image placeholders use consistent styling (e.g. gray background, aspect ratio, optional “Placeholder” or icon) so the client can replace with real assets.

---

## 7. Responsive Breakpoints

- **Mobile:** &lt; 768px – single column, hamburger menu, stacked sections
- **Tablet:** 768px – 1023px – 2 columns where appropriate
- **Desktop:** ≥ 1024px – full layout, multi-column galleries

---

## 8. Accessibility & SEO

- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- Heading hierarchy (one `<h1>` per page)
- Alt text for placeholders (“Placeholder: popis”)
- Form labels and basic ARIA where helpful (e.g. menu toggle)
- Meta description and title per page

---

*Document version: 1.0 — for Restaurace Na Zámku Chrast website project.*
