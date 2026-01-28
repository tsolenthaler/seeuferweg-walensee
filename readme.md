# Seeuferweg Walensee Web-App

Eine responsive Progressive Web App zur Präsentation von Sehenswürdigkeiten und Aktivitäten rund um den Walensee.

## 🌟 Features

- **Responsive Design**: Optimiert für Desktop, Tablet und Mobile
- **Progressive Web App (PWA)**: Installierbar auf mobilen Geräten mit Offline-Funktionalität
- **Drei Ansichtsmodi**: Kachel-Ansicht, Listen-Ansicht und Karten-Ansicht mit OpenStreetMap
- **Favoriten-System**: Speichern Sie Ihre Lieblingsorte lokal im Browser
- **Datenintegration**: Automatische Filterung und Normalisierung von OpenData-Quellen
- **Export & Teilen**: Exportieren Sie Ihre Favoriten als JSON oder teilen Sie sie über URL

## 📱 Seiten

- **Startseite**: Übersicht und Featured Highlights
- **Standorte**: Alle POIs mit Suchfunktion und Filtern
- **Highlights**: Die schönsten Sehenswürdigkeiten
- **Erlebnisse**: Aktivitäten rund um den Walensee
- **Fotopoints**: Fotogalerie mit den besten Fotospots
- **Favoriten**: Ihre gespeicherten Orte

## 🚀 Installation & Deployment

### Lokale Entwicklung

1. Repository klonen:
```bash
git clone https://github.com/tsolenthaler/seeuferweg-walensee.git
cd seeuferweg-walensee
```

2. Lokalen Webserver starten:
```bash
# Mit Python 3
python -m http.server 8000

# Mit Node.js (http-server)
npx http-server -p 8000

# Mit PHP
php -S localhost:8000
```

3. Browser öffnen: `http://localhost:8000`

### GitHub Pages Deployment

Die App wird automatisch auf GitHub Pages deployed, wenn Änderungen auf den `main` Branch gepusht werden.

**Setup:**

1. Gehen Sie zu den Repository Settings
2. Navigieren Sie zu "Pages" in der linken Seitenleiste
3. Wählen Sie unter "Build and deployment":
   - Source: **GitHub Actions**
4. Die GitHub Actions Workflow-Datei (`.github/workflows/deploy.yml`) ist bereits konfiguriert

Die App wird dann unter `https://tsolenthaler.github.io/seeuferweg-walensee/` verfügbar sein.

## 📊 Datenquellen

Die App integriert Daten aus folgenden OpenData-Quellen:

1. **Heidiland**: [OpenData Heidiland](https://opendata.hlt.contentdesk.io/map/products.html)
2. **Glarnerland**: [OpenData Glarnerland](https://opendata.visitgl.contentdesk.io/map/products.html)
3. **Rapperswil-Jona**: [Rapperswil-Jona API](https://www.rapperswil-zuerichsee.ch/en/api/v2/data)

Die Daten werden automatisch auf die Walensee-Region gefiltert und in ein einheitliches Format normalisiert.

## 🎨 Design

- **Framework**: Bootstrap 5.3 (kompatibel mit OpenFrontend)
- **Karten**: Leaflet mit OpenStreetMap
- **Primärfarbe**: Orange (#ff9c21)
- **Schriftart**: Poppins (via Adobe Fonts)
- **Logo**: `logo-seeuferweg-orange.svg`

## 📁 Projektstruktur

```
seeuferweg-walensee/
├── index.html              # Startseite
├── standorte.html          # Standorte-Seite
├── highlights.html         # Highlights-Seite
├── erlebnisse.html         # Erlebnisse-Seite
├── fotopoints.html         # Fotopoints-Seite
├── favoriten.html          # Favoriten-Seite
├── app.css                 # Zusätzliche App-Styles
├── seeuferweg.css          # Vorgegebene Styles
├── manifest.json           # PWA Manifest
├── service-worker.js       # Service Worker für Offline-Funktionalität
├── js/
│   ├── app.js              # Haupt-App-Logik
│   ├── data-processor.js   # Datenverarbeitung
│   ├── favorites.js        # Favoriten-Management
│   └── standorte.js        # Standorte-Seite Logik
├── glarnerland.json        # Glarnerland POI-Daten
├── heidiland.json          # Heidiland POI-Daten
├── rapperswil.json         # Rapperswil POI-Daten
└── .github/
    └── workflows/
        └── deploy.yml      # GitHub Actions Workflow
```

## 💡 Verwendung

### Favoriten

- **Hinzufügen**: Klicken Sie auf das Herz-Symbol bei einem POI
- **Exportieren**: Als JSON-Datei herunterladen oder als URL teilen
- **Importieren**: Über URL-Parameter oder JSON-Upload
- **Löschen**: Einzeln oder alle auf einmal

### Filter & Suche

- Suchen Sie nach Name, Beschreibung oder Ort
- Filtern Sie nach POI-Typ (Unterkunft, Restaurant, Attraktion, etc.)
- Kombinieren Sie mehrere Filter

### Ansichtsmodi

- **Kachel-Ansicht**: Übersichtliche Kartenansicht mit Bildern
- **Listen-Ansicht**: Kompakte Listenansicht
- **Karten-Ansicht**: Interaktive Karte mit allen POIs

## 🔧 Technische Details

### PWA Features

- Service Worker für Offline-Caching
- Installierbar auf mobilen Geräten
- Manifest mit Icons und Shortcuts
- Theme-Farbe: Orange (#ff9c21)

### Browser-Kompatibilität

- Chrome/Edge: ✅ Vollständig unterstützt
- Firefox: ✅ Vollständig unterstützt
- Safari: ✅ Grundfunktionen unterstützt (PWA-Installation eingeschränkt)

### Lokaler Speicher

- Favoriten werden im Browser's localStorage gespeichert
- Daten bleiben auch nach Schließen des Browsers erhalten
- Pro Browser/Gerät separate Favoriten-Liste

## 📝 Lizenz

© 2026 Seeuferweg Walensee. Alle Rechte vorbehalten.

## 🤝 Beiträge

Beiträge sind willkommen! Bitte erstellen Sie einen Pull Request mit Ihren Änderungen.

## 📧 Kontakt

Bei Fragen oder Problemen erstellen Sie bitte ein Issue im GitHub Repository.

---

**Viel Spaß beim Erkunden des Walensees! 🏔️🌊**

---

## Use-Case (Original Requirements)

### Fakts

Erstelle eine Web-App mit dem Namen "seeuferweg-walensee".

### Technik
* static generierte Seite
* Web App
    * Kann als App gespeichert werden auf Mobile-Geräten
    * Responsive
* Framework OpenFrontend
https://openfrontend.tourismusweb.site/getting-started/introduction/
* kann als static generiter Webseite auf GitHub Pages veröffentlicht


### Source / OpenData
Als Quelle der Daten sind folgendes Files.
Diese müssen auf Daten reduziert werden die nur rund um den Walensee relevant sind.

* Heidiland 
heidiland.json
https://opendata.hlt.contentdesk.io/map/products.html

* Glarnerland
glarnerland.json
https://opendata.visitgl.contentdesk.io/map/products.html

* Rapperswil-Jona (Weesen Amden) 
rapperswil.json
https://www.rapperswil-zuerichsee.ch/en/api/v2/data

### Functions

* Favoriten-Liste - POI (Orte) können als Favoriten auf dem Gerät gespeichert werden und weitergegeben werden

### Design

* Logo logo-seeuferweg-orange.svg
* CSS Style seeuferweg.css

### Content

Als Vorlage dient folgende Webseite
https://seeuferweg-walensee.dev.cms.tso.ch/de/
https://seeuferweg-walensee.dev.cms.tso.ch/sitemap.xml

* Navigation
    * Standort - Directory mit Kachel, List und Map Ansicht (OpenStreetmap) Suche nach Name und Filter nach Typ-Baum und Orts
    * Highlights - Alle Highlights rund um den Walensee

    * Erlebnisse - Alle Erlebnisse rund um den Walensee
    * Fotopoints - Seite mit einer Social Wall von Fotospots rund um den Walensee

* Startseite erklärt kurz was der Seeuferweg ist
