# Prompt für GitHub Copilot: seeuferweg-walensee Web-App

**Erstelle eine Web-App mit dem Namen "seeuferweg-walensee" nach folgenden Spezifikationen:**

## **Projektübersicht**
Entwickle eine responsive Web-App zur Präsentation von Sehenswürdigkeiten und Aktivitäten rund um den Walensee. Die App soll als statisch generierte Seite auf GitHub Pages veröffentlicht werden und auf mobilen Geräten als installierbare Web-App verfügbar sein.

## **Technische Anforderungen**
- **Framework**: OpenFrontend (https://openfrontend.tourismusweb.site/getting-started/introduction/)
- **Deployment**: Statisch generierte Seite, deploybar auf GitHub Pages
- **Responsive Design**: Optimiert für Desktop, Tablet und Mobile
- **Web-App-Fähigkeiten**: 
  - Installierbar auf mobilen Geräten (PWA-Funktionalität)
  - Offline-Funktionalität wo möglich
- **Styling**: Verwende die bereitgestellte `seeuferweg.css` und das Logo `logo-seeuferweg-orange.svg`

## **Datenquellen & Datenaufbereitung**
Integriere und filiere Daten aus folgenden OpenData-Quellen (nur Inhalte relevant für Walensee-Region):

1. **Heidiland**: `heidiland.json` (https://opendata.hlt.contentdesk.io/map/products.html)
2. **Glarnerland**: `glarnerland.json` (https://opendata.visitgl.contentdesk.io/map/products.html)
3. **Rapperswil-Jona**: `rapperswil.json` (https://www.rapperswil-zuerichsee.ch/en/api/v2/data)

**Datenverarbeitung**: 
- Filtere alle Daten auf geografisch relevante Einträge um den Walensee
- Normalisiere die Datenformate zu einheitlicher Struktur
- Kategorisiere POIs nach Typ (z.B. Restaurants, Aktivitäten, Aussichtspunkte, etc.)

## **Kernfunktionalitäten**

### **1. Favoriten-System**
- Benutzer können POIs als Favoriten speichern (lokaler Browser-Storage)
- Favoriten-Listen können exportiert und weitergegeben werden (JSON/URL-basiert)
- Favoriten bleiben auf dem Gerät gespeichert

### **2. Navigation / Seitenstruktur**

- **Startseite**: 
  - Kurze Erklärung: Was ist der Seeuferweg?
  - Featured Content/Highlights
  
- **Standorte / Directory**:
  - Drei Ansichtsmodi: Kachel-Ansicht, Listen-Ansicht, Karten-Ansicht (OpenStreetMap)
  - Such-Funktion nach Name/Beschreibung
  - Filter nach POI-Typ (Baum-Struktur)
  - Filter nach Ort/Region
  
- **Highlights**: 
  - Alle Highlights rund um den Walensee in Featured-Ansicht
  
- **Erlebnisse**: 
  - Alle Aktivitäten/Erlebnisse rund um den Walensee
  - Kategorisiert und filterbar
  
- **Fotopoints**: 
  - Social Wall / Gallery mit Fotospots rund um den Walensee
  - Möglichkeit zur Anzeige von benutzergenerierten Inhalten

## **Design & Branding**
- Verwende das Logo `logo-seeuferweg-orange.svg` als Primary Brand Element
- Implementiere die `seeuferweg.css` Styling-Richtlinien
- Orange als Primary-Farbe
- Konsistente, intuitive Navigation
- Barrierefreies Design (WCAG 2.1 AA Standard)

## **Inhalt / Content-Referenz**
Orientiere dich an der vorhandenen Webseite für Content-Struktur:
- https://seeuferweg-walensee.dev.cms.tso.ch/de/
- Sitemap: https://seeuferweg-walensee.dev.cms.tso.ch/sitemap.xml

## **Lieferergebnisse**
1. Vollständig funktionsfähige Web-App mit OpenFrontend Framework
2. Automatisiertes Build- und Deployment-Setup für GitHub Pages
3. Responsive, PWA-fähige Anwendung
4. Dokumentation für Installation und Verwendung
5. Daten-Pipeline zur Filterung und Normalisierung der OpenData-Quellen
