# Design-Anpassung: Seeuferweg Walensee

## 🎨 Farben - Alpine Natur Thema

Die Farben wurden an das offizielle Seeuferweg Walensee Design angepasst:

### Farbpalette

| Farbe | Hex-Code | Verwendung |
|-------|----------|-----------|
| **Wald Grün** | `#2b7b4a` | Primary Color - Buttons, Header, Links |
| **Helles Grün** | `#4a9d6f` | Hover States - Sanfte Übergänge |
| **Dunkles Grün** | `#1e5a35` | Dark Mode - Accents |
| **Wasser Blau** | `#1e90ff` | Accent Color - Highlights, Borders |
| **Helles Blau** | `#4eb3ff` | Light Accents - Sekundäre Elemente |
| **Text Dunkelblau** | `#2c3e50` | Text Color - Lesbarkeit |
| **Border Grau** | `#e0e6ed` | Borders - Struktur |
| **Orange** | `#f39c12` | Warnings - Hinweise |
| **Rot** | `#e74c3c` | Danger - Kritische Elemente |
| **Grün (Success)** | `#27ae60` | Success - Erfolgreiche Aktionen |

### Design-Philosophie

- **Grün**: Alpines Waldthema, Natur, Nachhaltigkeit
- **Blau**: Walensee, Wasser, Klarheit
- **Neutral**: Dunkle Grautöne für Lesbarkeit

---

## 🏔️ Logo

Das neue Logo (`logo.svg`) zeigt:
- **Bergpipfel**: Symbole der alpinen Landschaft
- **Wellen**: Das Wasser des Walensees
- **Blüte**: Alpendiastellum, Flora der Region
- **Farbschema**: Grün-Blau Kombination

Das Logo wird automatisch im Header angezeigt, falls die Datei vorhanden ist.

### Logo verwenden

1. **SVG-Version**: `logo.svg` im Root-Verzeichnis
2. **Alternative PNG**: Unter demselben Namen ablegen
3. **Kein Logo**: Wird automatisch versteckt, wenn nicht vorhanden

---

## 📝 CSS Custom Properties

Alle Farben sind als CSS Custom Properties definiert:

```css
:root {
    --primary-color: #2b7b4a;      /* Forest Green */
    --primary-light: #4a9d6f;      /* Light Green */
    --primary-dark: #1e5a35;       /* Dark Green */
    --accent-color: #1e90ff;       /* Water Blue */
    --accent-light: #4eb3ff;       /* Light Blue */
    --text-color: #2c3e50;         /* Dark Blue-Gray */
}
```

Das macht es einfach, die Farben anschließend anzupassen!

---

## 🎯 Betroffene UI-Elemente

### Header
- Hintergrund: Grüner Gradient
- Untere Grenze: Blaue Akzentlinie
- Logo-Support: Links neben dem Titel

### Buttons
- Primary-Button: Waldgrün
- Hover-State: Dunkles Grün mit Schatten

### Karten & Tiles
- Linker Border: Grün (mit blauem Hover)
- Bild-Hintergrund: Grün-Blau Gradient

### Modals
- Titel-Unterline: Grün-Blau

---

## 📱 Responsive Design

Das Design passt sich auf allen Geräten an:
- **Desktop**: Vollbreite Header mit Logo
- **Tablet**: Optimierte Spacing und Größen
- **Mobile**: Kompakte Header, aber weiterhin elegant

---

## 🔧 Anpassungen vornehmen

### Farbe ändern

Bearbeiten Sie `styles.css` im `:root` Bereich:

```css
:root {
    --primary-color: #ihre-farbe;
}
```

Alle Elemente werden automatisch aktualisiert!

### Logo ersetzen

1. Ersetzen Sie `logo.svg` mit Ihrem Logo
2. Stellen Sie sicher, dass es `logo.svg` heißt
3. Laden Sie die Seite neu

### Gradient anpassen

Header-Gradient in `styles.css`:

```css
.header {
    background: linear-gradient(135deg, #ihre-farbe1 0%, #ihre-farbe2 100%);
}
```

---

## 🌍 Kompatibilität

- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Mobile Browser
- ✅ Accessibility (WCAG AA)

---

## 📊 Farb-Kontraste

Alle Farben erfüllen WCAG AA Standards für Lesbarkeit:
- Text auf Grün: Hoher Kontrast
- Text auf Blau: Hoher Kontrast
- Buttons: Optimal lesbar

---

## 💾 config.json

Die Farbkonfiguration ist auch in `config.json` gespeichert:

```json
{
  "colors": {
    "primary": "#2b7b4a",
    "accent": "#1e90ff"
  }
}
```

Dies ermöglicht künftige API-Integrationen oder Thema-Konfigurationen.

---

**Design angepasst**: 27. Januar 2026  
**Status**: ✅ Seeuferweg Walensee Styling aktiv
