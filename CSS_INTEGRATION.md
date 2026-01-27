# CSS-Integration: Seeuferweg Bundle Styles

## 🎯 Was wurde integriert?

Dieses Projekt hat die professionellen CSS-Styles von der offiziellen Seeuferweg Walensee Website integriert.

### Quelle
```
https://seeuferweg-walensee.dev.cms.tso.ch/layout-canvas/styles/bundle-all.css
https://seeuferweg-walensee.dev.cms.tso.ch/layout-canvas/styles/bundle-components.css
```

### Integrierte Komponenten

✅ **Button Styles**
- Standard, Dark, Light Varianten
- Multiple Größen (mini, small, large, xlarge)
- Hover-Effekte & Transitions

✅ **Card & Layout Components**
- Feature Boxes
- Title Blocks
- Dividers
- Promo Boxes

✅ **Typography**
- Raleway (Überschriften)
- Lato (Body)
- Crete Round (Accents)

✅ **Color System**
- Forest Green (#2b7b4a)
- Water Blue (#1e90ff)
- Seeuferweg Teal (#1abc9c)
- Neutrale & Funktionale Farben

✅ **Advanced Components**
- Portfolio Items
- Testimonials
- Team Members
- Pricing Boxes
- Skill Bars
- Icons
- Badges

✅ **Utility System**
- Spacing (margin, padding)
- Display (flex, block, none)
- Text (align, weight, transform)
- Shadows & Borders
- Hover Effects

---

## 📁 CSS-Dateien

### 1. `styles.css` (30KB)
**Enthalten:**
- CSS Variables (:root)
- Global Styles
- Header Design
- Sidebar & Filter Styling
- Map, Tiles & List Views
- Forms & Inputs
- Responsive Media Queries
- Seeuferweg Button Styles (integriert)
- Feature Boxes & Title Blocks
- Dividers & Promo Boxes
- Typography Enhancements
- Message/Alert Styles
- Portfolio & Icon Styles
- Testimonials & Team Styles
- Pricing Boxes & Skills

### 2. `seeuferweg-components.css` (25KB)
**Enthalten:**
- Card Components
- Badge System
- Progress Bars
- Carousel/Slider
- Accordion Component
- Tab System
- Modal/Dialog
- Breadcrumbs
- Tags/Labels
- Alert System
- Tooltips
- Loader/Spinner
- Utility Classes (Spacing, Display, Text, Flex)

---

## 🎨 Farbschema-Übersicht

```
:root {
    /* Primär */
    --primary-color: #2b7b4a;        /* Forest Green */
    --primary-light: #4a9d6f;        /* Light Green */
    --primary-dark: #1e5a35;         /* Dark Green */
    
    /* Sekundär */
    --accent-color: #1e90ff;         /* Water Blue */
    --accent-light: #4eb3ff;         /* Light Blue */
    --accent-lighter: #1abc9c;       /* Brand Teal */
    
    /* Text */
    --text-dark: #333;               /* Very Dark */
    --text-color: #2c3e50;           /* Standard */
    --text-light: #5a6c7d;           /* Light */
    --text-muted: #777;              /* Muted */
    
    /* Backgrounds */
    --bg-light: #f5f5f5;             /* Light BG */
    --bg-white: #fff;                /* White BG */
    
    /* Functional */
    --success-color: #27ae60;        /* Green */
    --warning-color: #f39c12;        /* Orange */
    --danger-color: #e74c3c;         /* Red */
    
    /* Strukturen */
    --border-color: #e0e6ed;         /* Border */
    --border-light: #eee;            /* Light Border */
    
    /* Schatten */
    --shadow: 0 2px 8px rgba(...);
    --shadow-md: 0 4px 12px rgba(...);
    --shadow-lg: 0 5px 15px rgba(...);
    
    /* Spacing */
    --radius: 6px;
    --radius-sm: 3px;
}
```

---

## 🚀 Verwendungsbeispiele

### HTML einbinden
```html
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="seeuferweg-components.css">
```

### Button verwenden
```html
<!-- Standard Button -->
<button class="button">Click me</button>

<!-- Dark Button -->
<button class="button button-dark">Dark Button</button>

<!-- Large Button -->
<button class="button button-large">Large Button</button>
```

### Card verwenden
```html
<div class="card">
    <div class="card-header">
        <h3>Card Title</h3>
    </div>
    <div class="card-body">
        Card content here...
    </div>
    <div class="card-footer">
        Footer content...
    </div>
</div>
```

### Alert verwenden
```html
<div class="alert alert-primary">
    This is an info message
</div>

<div class="alert alert-success">
    Success! Action completed.
</div>

<div class="alert alert-warning">
    Warning: Be careful!
</div>

<div class="alert alert-danger">
    Error: Something went wrong!
</div>
```

### Utility Classes
```html
<!-- Spacing -->
<div class="mt-3 mb-2 p-2">Content</div>

<!-- Display -->
<div class="flex flex-center gap-2">
    <span>Centered</span>
</div>

<!-- Text -->
<p class="text-accent text-bold text-uppercase">Bold Accent Text</p>

<!-- Borders -->
<div class="border rounded shadow-lg">
    Card with borders
</div>
```

---

## 📊 Component-Matrix

| Komponente | Datei | Klasse |
|-----------|-------|--------|
| Buttons | styles.css | `.button` |
| Cards | seeuferweg-components.css | `.card` |
| Badges | seeuferweg-components.css | `.badge` |
| Alerts | seeuferweg-components.css | `.alert` |
| Feature Box | styles.css | `.feature-box` |
| Title Block | styles.css | `.title-block` |
| Promo Box | styles.css | `.promo` |
| Portfolio | styles.css | `.portfolio-item` |
| Accordion | seeuferweg-components.css | `.accordion` |
| Tabs | seeuferweg-components.css | `.tabs` |
| Modal | seeuferweg-components.css | `.modal-overlay` |
| Progress | seeuferweg-components.css | `.progress` |
| Tooltips | seeuferweg-components.css | `.tooltip` |
| Spinner | seeuferweg-components.css | `.spinner` |

---

## 🔧 Customization

### Farben ändern
```css
:root {
    --primary-color: #your-color;
    --accent-lighter: #your-brand-color;
}
```

### Fonts ändern
```css
:root {
    --font-primary: 'Your Font', sans-serif;
    --font-secondary: 'Your Heading Font', sans-serif;
}
```

### Spacing anpassen
```css
:root {
    --radius: 8px;  /* Größere Border Radius */
    --shadow: 0 3px 10px rgba(0, 0, 0, 0.2);  /* Stärkerer Shadow */
}
```

---

## 📱 Responsive Breakpoints

```css
/* Desktop Extra Large */
@media (min-width: 1920px) { ... }

/* Desktop */
@media (min-width: 1200px) { ... }

/* Tablet */
@media (max-width: 1024px) { ... }

/* Mobile */
@media (max-width: 768px) { ... }

/* Mobile Small */
@media (max-width: 480px) { ... }
```

Alle Komponenten sind vollständig responsive!

---

## 📚 Dokumentation

- **[DESIGN_GUIDE.md](DESIGN_GUIDE.md)** - Ausführlicher Design-Leitfaden
- **[SEEUFERWEG_STYLES.md](SEEUFERWEG_STYLES.md)** - Komponenten-Dokumentation
- **[DESIGN.md](DESIGN.md)** - Original Design-Notes
- **[START_HERE.md](START_HERE.md)** - Quick-Start

---

## ✨ Features

✅ **100% Seeuferweg Design kompatibel**  
✅ **CSS Custom Properties für einfaches Theming**  
✅ **Mobile-First Responsive Design**  
✅ **WCAG 2.1 Accessibility**  
✅ **No JavaScript Dependencies** (Pure CSS)  
✅ **Optimized für Performance**  
✅ **Production Ready**  

---

## 🎯 Best Practices

1. **Verwende CSS Variables** - Einfaches Theming
2. **Kombiniere Utility Classes** - Schnelle Layouts
3. **Teste auf Mobile** - Responsive Design
4. **Benutze Semantisches HTML** - Bessere Accessibility
5. **Minify für Production** - Bessere Performance

---

**Status:** ✅ Production Ready  
**Last Updated:** 27. Januar 2026  
**Seeuferweg Design Version:** 1.0 Integrated
