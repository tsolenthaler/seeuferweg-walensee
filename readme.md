# Use-Case

Erstelle eine Webapp mit dem Namen "seeuferweg-walensee".
Mit dieser Web App können Besucher auf einer Karten alle wichtigen Orte (POI), Wege (Touren), Events und Angeobte / Produkte rund um den Walensee sehen.
Auch als Liste oder Kacheln können diese aufgelistet und nach Namen, Typ, Kategorie, Öffnungszeiten bzw. durchführungs Datum und Preis gefiltert werden.
Diese Objekte können nach Name, Ort, Datum oder Preis soriert werden.
Jedes Objekt kann als Favoriten-Liste gespeichert und diese Liste kann mit anderen geteilt werden.
Die Web-App ist in deutsch und english verfügbar.
Das Design soll gleich sein wie https://seeuferweg-walensee.dev.cms.tso.ch/de/map.html. Die folgende CSS Styles nutzt:
https://seeuferweg-walensee.dev.cms.tso.ch/layout-canvas/styles/bundle-components.css?v=e9750dcb
https://seeuferweg-walensee.dev.cms.tso.ch/layout-canvas/styles/bundle-all.css?v=2efa3ed0
https://seeuferweg-walensee.dev.cms.tso.ch/files/design_assets/design-seeuferweg-walensee/css/custom.css
und Logo:
https://seeuferweg-walensee.dev.cms.tso.ch/assets/images/r/logo-seeuferweg-orange-weiss-yr1vvxpxxtpf3yt.svg

Der Content soll von ostschweiz.json und glanerland.json übernommen werden.

Die Impresum und Datenschutz-Seite soll übernommen werden.

Das Ergenis soll als github Pages veröffentlicht werden können.

## Fakts

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

## Prompt

```
Create a web app called “seeuferweg-walensee.”
This web app allows visitors to see all important places (POIs), routes (tours), events, and offers/products around Lake Walen on a map.
These can also be listed as a list or tiles and filtered by name, type, category, opening hours, date, and price.
These items can be sorted by name, location, date, or price.
Each item can be saved as a favorites list, and this list can be shared with others.
The web app is available in German and English.
The design should be the same as https://seeuferweg-walensee.dev.cms.tso.ch/de/map.html. 
The content should be taken from file ostschweiz.json and glanerland.json
The result should be publishable as GitHub Pages.
```


## Prompt V2

* 