# 🎨 Seeuferweg CSS Styles - Integration Guide

## Überblick

Dieses Projekt integriert professionelle CSS-Styles von der offiziellen Seeuferweg Walensee Website. Die Styles wurden aus zwei Bundle-Dateien übernommen:

- `bundle-all.css` (Haupt-Stylesheets)
- `bundle-components.css` (Komponenten-spezifische Styles)

## 📁 CSS-Dateien

### 1. **styles.css** (Basis-Stylesheet)
Enthält die Kernstyles für die App mit Seeuferweg Design:

- **Farben-Variablen** (CSS Custom Properties)
  - `--primary-color: #2b7b4a` (Waldgrün)
  - `--accent-lighter: #1abc9c` (Teal aus Seeuferweg)
  - `--accent-color: #1e90ff` (Wasserblau)
  
- **Typografie**
  - `--font-primary: 'Lato'` (Body-Text)
  - `--font-secondary: 'Raleway'` (Überschriften)
  - `--font-accent: 'Crete Round'` (Dekorative Schrift)

- **Komponenten**
  - Header mit Farbgradienten
  - Sidebar mit Filtern
  - Karten/Tiles mit Hover-Effekten
  - Listen-Ansichten
  - Modal-Dialoge
  - Responsive Design

### 2. **seeuferweg-components.css** (Komponenten-Bibliothek)

Enthält eine vollständige Komponentenbibliothek im Seeuferweg-Stil:

#### Cards
```html
<div class="card">
    <div class="card-header">
        <h3>Kartentitel</h3>
    </div>
    <div class="card-body">
        Karteneinhalt
    </div>
    <div class="card-footer">
        Fußzeile
    </div>
</div>
```

#### Badges
```html
<span class="badge badge-primary">Primary</span>
<span class="badge badge-accent">Accent</span>
<span class="badge badge-success">Success</span>
```

#### Buttons
```html
<button class="button">Normale Button</button>
<button class="button button-dark">Dunkle Button</button>
<button class="button button-light">Helle Button</button>
<button class="button button-large">Große Button</button>
<button class="button button-small">Kleine Button</button>
```

#### Alerts
```html
<div class="alert alert-primary">Primary Alert</div>
<div class="alert alert-accent">Accent Alert</div>
<div class="alert alert-success">Success Alert</div>
<div class="alert alert-warning">Warning Alert</div>
<div class="alert alert-danger">Danger Alert</div>
```

#### Accordions
```html
<div class="accordion">
    <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(event)">
            Überschrift
            <span class="accordion-toggle">⌄</span>
        </div>
        <div class="accordion-body">
            Inhalt
        </div>
    </div>
</div>
```

#### Tabs
```html
<div class="tabs">
    <div class="tab-buttons">
        <button class="tab-button active" onclick="showTab(event, 'tab1')">Tab 1</button>
        <button class="tab-button" onclick="showTab(event, 'tab2')">Tab 2</button>
    </div>
    <div id="tab1" class="tab-content active">Inhalt 1</div>
    <div id="tab2" class="tab-content">Inhalt 2</div>
</div>
```

#### Progress Bars
```html
<div class="progress">
    <div class="progress-bar" style="width: 75%"></div>
</div>
```

#### Tooltips
```html
<span class="tooltip">
    Hover me
    <span class="tooltip-text">Dies ist ein Tooltip!</span>
</span>
```

## 🎯 Integrierte Seeuferweg-Komponenten

Aus den Original-CSS wurden folgende Komponenten übernommen:

### Button Styles
- Standardbuttons mit Uppercase-Text
- Verschiedene Größen (mini, small, large, xlarge)
- Hover-Effekte mit Farbübergängen
- Dark und Light Varianten

### Feature Boxes
```css
.feature-box - Container für Features mit Icon links
.fbox-icon - Zirkuläres Icon mit Hintergrundfarbe
```

### Title Blocks
```css
.title-block - Überschrift mit farbigem linken Rand
.title-block-right - Überschrift mit farbigem rechten Rand
```

### Portfolio Items
```css
.portfolio-item - Bildgalerie-Items
.portfolio-overlay - Overlay auf Hover
.portfolio-desc - Beschreibungsbereich
```

### Divider
```css
.divider - Horizontale Trennlinie
.divider-short - Kurze Trennlinie
```

### Promo Boxes
```css
.promo - Standard-Promo Box
.promo-flat - Mit Hintergrundfarbe (Teal)
.promo-dark - Dunkle Promo Box
```

### Testimonials
```css
.testimonial - Kundenbewertung mit Bild
.testi-image - Runde Bilder
.testi-content - Text mit Anführungszeichen
.testi-meta - Autor-Info
```

### Team Members
```css
.team - Team-Mitglied Card
.team-image - Bild des Mitglieds
.team-title - Name und Position
```

### Pricing Boxes
```css
.pricing-box - Preis-Vergleich Box
.pricing-title - Box-Überschrift
.pricing-price - Große Preisanzeige
.best-price - Hervorgehobene Best-Price-Box
```

## 🌈 Farbschema

| Variable | Farbe | Verwendung |
|----------|-------|-----------|
| `--primary-color` | #2b7b4a | Waldgrün, Primärfarbe |
| `--primary-light` | #4a9d6f | Hellgrün |
| `--primary-dark` | #1e5a35 | Dunkelgrün |
| `--accent-lighter` | #1abc9c | Teal (Seeuferweg Brand) |
| `--accent-color` | #1e90ff | Wasserblau |
| `--success-color` | #27ae60 | Erfolgs-Grün |
| `--warning-color` | #f39c12 | Warnungs-Orange |
| `--danger-color` | #e74c3c | Fehler-Rot |
| `--text-dark` | #333 | Sehr dunkler Text |
| `--text-color` | #2c3e50 | Standard Text |
| `--text-light` | #5a6c7d | Heller Text |
| `--text-muted` | #777 | Gedimmter Text |
| `--bg-light` | #f5f5f5 | Heller Hintergrund |
| `--border-light` | #eee | Helle Kanten |

## 📱 Responsive Design

Alle Komponenten sind vollständig responsive mit Breakpoints bei:
- **1920px+**: Desktop Extra-Large
- **1200px**: Desktop
- **1024px**: Tablet Landscape
- **768px**: Tablet
- **480px**: Mobil

## 🚀 Verwendung

### In HTML
```html
<!-- Komponenten-CSS laden -->
<link rel="stylesheet" href="seeuferweg-components.css">

<!-- Button verwenden -->
<button class="button button-large">Klick mich</button>

<!-- Card verwenden -->
<div class="card">
    <div class="card-header">
        <h3>Titel</h3>
    </div>
    <div class="card-body">
        Inhalt...
    </div>
</div>
```

### CSS-Variablen überschreiben
```css
:root {
    --primary-color: #custom-green;
    --accent-lighter: #custom-teal;
}
```

## 🎨 Utility-Klassen

### Margin/Padding
- `mt-1` bis `mt-5`: Margin-Top
- `mb-1` bis `mb-5`: Margin-Bottom
- `p-1` bis `p-4`: Padding all

### Display
- `.d-none`: display: none
- `.d-block`: display: block
- `.d-flex`: display: flex
- `.flex-center`: Zentriert mit Flexbox
- `.flex-between`: Space-between Layout

### Text
- `.text-primary`, `.text-accent`, etc.
- `.text-bold`, `.text-uppercase`, `.text-center`
- `.text-muted`: Gedimmter Text

### Spacing
- `.gap-1`, `.gap-2`, `.gap-3`: Flexbox Gap

### Borders & Shadows
- `.border`, `.border-top`, `.border-bottom`
- `.rounded`, `.rounded-sm`
- `.shadow-sm`, `.shadow`, `.shadow-lg`

### Hover Effekte
- `.hover-shadow`: Schatten auf Hover
- `.hover-scale`: Skalierung auf Hover
- `.hover-color`: Farbe auf Hover

## 📚 Weitere Ressourcen

- Originale Website: https://seeuferweg-walensee.dev.cms.tso.ch
- Layout-Canvas Styles: `/layout-canvas/styles/bundle-*.css`
- Lokale Dokumentation: siehe `DESIGN.md`

## ✅ Checkliste für Entwickler

- [x] CSS Variables für einfaches Theming
- [x] Responsive Design für alle Breakpoints
- [x] Accessibility (WCAG) Features
- [x] Button Varianten (size, style)
- [x] Card-basierte Layouts
- [x] Modal/Dialog System
- [x] Form Styling
- [x] Icon Support
- [x] Animation & Transitions
- [x] Dark Mode Ready
- [x] Print Stylesheet
- [x] Performance optimiert

---

**Letzte Aktualisierung:** 27. Januar 2026  
**Seeuferweg Design Integration:** Vollständig  
**Status:** ✅ Produktionsreife
