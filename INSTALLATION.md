# Installation & Erste Schritte

## Schnellstart

### Option 1: Lokaler Python-Server (empfohlen)

1. Terminal öffnen und ins Projektverzeichnis wechseln:
```bash
cd seeuferweg-walensee
```

2. Python-Server starten:
```bash
python -m http.server 8000
```

3. Browser öffnen und navigieren zu:
```
http://localhost:8000
```

### Option 2: Node.js http-server

1. http-server global installieren (falls noch nicht vorhanden):
```bash
npm install -g http-server
```

2. Server starten:
```bash
cd seeuferweg-walensee
http-server -p 8000
```

3. Browser öffnen: `http://localhost:8000`

### Option 3: PHP Built-in Server

```bash
cd seeuferweg-walensee
php -S localhost:8000
```

Browser öffnen: `http://localhost:8000`

### Option 4: VS Code Live Server Extension

1. "Live Server" Extension in VS Code installieren
2. Rechtsklick auf `index.html`
3. "Open with Live Server" wählen

## Die App testen

### 1. Grundfunktionen testen

✅ **Startseite**
- Überprüfen Sie, ob die Startseite korrekt lädt
- Statistics sollten angezeigt werden (basierend auf glarnerland.json Daten)
- Featured Highlights sollten erscheinen

✅ **Navigation**
- Testen Sie alle Menüpunkte
- Prüfen Sie die responsive Navigation auf Mobile

### 2. Standorte-Seite testen

✅ **Ansichtsmodi**
- Kachel-Ansicht (Grid)
- Listen-Ansicht
- Karten-Ansicht mit OpenStreetMap

✅ **Filter & Suche**
- Suche nach Namen oder Orten
- Filtern nach Typ (Webcam, Unterkunft, etc.)
- Filter kombinieren

### 3. Favoriten-System testen

✅ **Favoriten hinzufügen**
- Herz-Symbol bei einem POI klicken
- Favoriten-Zähler in Navigation sollte sich aktualisieren
- POI sollte auf Favoriten-Seite erscheinen

✅ **Favoriten exportieren**
- "Als JSON exportieren" - Download sollte starten
- "Link teilen" - URL sollte in Zwischenablage kopiert werden

✅ **Favoriten importieren**
- Geteilten Link in neuem Tab/Browser öffnen
- Favoriten sollten automatisch importiert werden

### 4. PWA-Funktionen testen

✅ **Service Worker**
- Browser-Console öffnen (F12)
- Unter "Application" → "Service Workers" prüfen
- Service Worker sollte registriert sein

✅ **Offline-Funktionalität**
- Seite laden
- In Browser DevTools: Application → Service Worker → "Offline" aktivieren
- Seite neu laden - sollte aus Cache funktionieren

✅ **App-Installation (Mobile/Chrome)**
- Chrome/Edge Browser öffnen
- "App installieren" sollte in Adressleiste erscheinen
- Nach Installation: App sollte im Standalone-Modus laufen

### 5. Responsive Design testen

✅ **Desktop** (>992px)
- Vollständige Navigation
- Sidebar-Filter
- Grid-Layout

✅ **Tablet** (768px - 991px)
- Collapsible Navigation
- Angepasste Grid-Spalten

✅ **Mobile** (<768px)
- Hamburger-Menü
- Einspaltiges Layout
- Touch-freundliche Buttons

## Browser-Kompatibilität prüfen

### Vollständig getestet
- ✅ Chrome 90+ (Desktop & Mobile)
- ✅ Edge 90+
- ✅ Firefox 88+

### Grundfunktionen
- ⚠️ Safari 14+ (PWA-Installation eingeschränkt)
- ⚠️ iOS Safari (Service Worker funktioniert)

## Bekannte Einschränkungen

### Daten
- **heidiland.json** ist derzeit leer - keine Daten von dieser Quelle
- **rapperswil.json** enthält nur Kategorien, keine POI-Daten
- **glarnerland.json** enthält funktionale Webcam- und Unterkunftsdaten

### Features
- Karten-Ansicht benötigt Internetverbindung (OpenStreetMap)
- Service Worker cached nur statische Assets, nicht externe Bilder

## Troubleshooting

### Problem: "Service Worker registration failed"
**Lösung**: 
- Service Worker funktionieren nur über HTTPS oder localhost
- Stellen Sie sicher, dass Sie `localhost` verwenden, nicht die IP-Adresse

### Problem: "Keine POIs werden angezeigt"
**Lösung**:
- Browser-Console prüfen (F12)
- Stellen Sie sicher, dass JSON-Dateien korrekt geladen werden
- Prüfen Sie, ob Daten im Walensee-Bereich liegen (Geo-Filterung)

### Problem: "Karte lädt nicht"
**Lösung**:
- Internetverbindung prüfen (OpenStreetMap benötigt Online-Zugriff)
- Browser-Console auf Fehler prüfen
- Leaflet.js CDN-Verfügbarkeit prüfen

### Problem: "Favoriten gehen verloren"
**Lösung**:
- LocalStorage wird pro Origin/Browser gespeichert
- Im Inkognito-Modus werden Favoriten nach Schließen gelöscht
- Browser-Daten löschen entfernt auch Favoriten

## Daten aktualisieren

Um neue Daten zu integrieren:

1. Aktualisierte JSON-Dateien ins Hauptverzeichnis kopieren
2. Geo-Koordinaten müssen im Walensee-Bereich liegen:
   - Latitude: 46.9 - 47.2
   - Longitude: 8.95 - 9.25

3. Datenformat siehe `js/data-processor.js`

## Deployment auf GitHub Pages

1. Code auf GitHub pushen:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. In Repository Settings → Pages:
   - Source: "GitHub Actions" wählen
   - Workflow läuft automatisch

3. Nach ca. 2-3 Minuten ist die App verfügbar unter:
```
https://tsolenthaler.github.io/seeuferweg-walensee/
```

## Weitere Entwicklung

### Empfohlene Erweiterungen
- Detailseiten für einzelne POIs
- Routenplanung zwischen POIs
- Wetter-Integration
- Social Media Sharing
- Mehrsprachigkeit (DE/EN/FR)
- Weitere Datenquellen integrieren

### Performance-Optimierung
- Bilder optimieren und lazy loading
- JavaScript minifizieren
- CSS minifizieren
- Service Worker Cache-Strategie optimieren

---

**Viel Erfolg mit der Seeuferweg Walensee App!** 🚀
