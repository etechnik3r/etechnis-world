# etechnis-world

Persönliche Themenwelt von **Bastian** – Erfinder, Bastler, Ingenieur.
Eine schlanke, statische Webseite (reines HTML/CSS/JS, ohne Build-Schritt),
die als Sandbox dient und Schritt für Schritt um neue Themen und Rechner
erweitert wird. Als **Progressive Web App** installierbar.

## Struktur

```
/
├── index.html                         Startseite mit Navigation und allen Themen
├── elektroauto-kostenvergleich.html   Rechner: Kostenvergleich E-Auto vs. Verbrenner
├── css/
│   ├── site.css                       Design-System (Tokens) + Basis + Navigation
│   └── tools.css                      Wiederverwendbare Bausteine für Rechner/Tools
├── js/
│   └── app.js                         Gemeinsame Logik (Nav, Update-Banner, PWA)
├── sw.js                              Service Worker (Offline + Update-Erkennung)
├── manifest.webmanifest               PWA-Manifest
├── icons/                             App-Icons (SVG + PNG, inkl. maskable)
└── img/                               Bilder zu den Themen
```

## Design-System (wichtig für neue Rechner)

Damit alle Seiten – besonders künftige Rechner/Tools – **automatisch gleich
aussehen**, ist das Design zentral abgelegt:

- **`css/site.css`** definiert alle **Design-Tokens** als CSS-Variablen
  (`:root`): Farben (Markenfarbe Blau `--accent`, Flächen, Datenreihen
  `--series-a`/`--series-b`), Typo-Skala (`--fs-*`), Radien. Farben und
  Größen nur hier ändern – sie wirken überall.
- **`css/tools.css`** enthält fertige Bausteine (`.tool`, `.panel`,
  `.readout`, `.tabs`/`.tab`, `.controls`/`.slider`, `table.data`,
  Tooltip …), die ausschließlich auf diesen Tokens aufbauen.

**Neuen Rechner anlegen:** eine HTML-Seite erstellen, `site.css` **und**
`tools.css` einbinden, die vorhandenen Klassen verwenden – fertig, das
Look & Feel passt ohne zusätzliches Styling.

## Navigation & Themen

Links liegt eine feste Navigationsleiste (mobil als ausklappbares Menü),
die die Themen gruppiert: **Elektromobilität** (inkl. Kostenvergleich E-Auto),
**Energie & Wärme**, **Weitere Themen**. Ganz unten ein Zahnrad-Menü mit
„App installieren" und „Nach Updates suchen".

## PWA & Update-Erkennung

- `manifest.webmanifest` + `sw.js` machen die Seite installierbar und offline
  nutzbar. Installation über das Zahnrad-Menü unten in der Navigation.
- Der Service Worker erkennt neue Versionen. **Beim Deploy die `CACHE`-Version
  in `sw.js` erhöhen** – Besucher sehen dann automatisch das Banner
  „Neue Version verfügbar – Neu laden".

## Rechner: Kostenvergleich E-Auto vs. Verbrenner

Interaktiv, dependency-frei (Diagramme als Inline-SVG). Vergleicht reale
Super-E10-Monatspreise (Sep 2022 – Aug 2026) mit den einstellbaren Ladekosten
eines E-Autos (Mix aus Photovoltaik, Netz und unterwegs). Reglerwerte werden
lokal gespeichert (localStorage) und bleiben beim nächsten Besuch erhalten;
neue Felder nach einem Update fallen sauber auf ihre Standardwerte zurück.

## Hinweise

- Ausgelegt für GitHub Pages (statisch, relative Pfade).
- Bild-Dateinamen sind case-sensitive (z. B. `elektronik.JPG`).
- **Offen:** Bilder für „Photovoltaik & Speicher" sowie ein Impressum nach
  § 5 DDG (Name, Anschrift, Kontakt) ergänzen.
