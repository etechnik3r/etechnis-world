# etechnis-world

Persönliche Themenwelt von **Bastian** – Erfinder, Bastler, Ingenieur.
Eine schlanke, statische Webseite (reines HTML/CSS/JS, ohne Build-Schritt),
die als Sandbox dient und Schritt für Schritt um neue Themen erweitert wird.

## Struktur

```
/
├── index.html                         Startseite mit linker Navigation und allen Themen
├── elektroauto-kostenvergleich.html   Unterseite: Kostenvergleich E-Auto vs. Verbrenner
├── css/
│   └── site.css                       Gemeinsame Basis + Navigationsleiste (Sidebar/Drawer)
└── img/                               Bilder zu den Themen
```

## Navigation & Themen

Links liegt eine feste Navigationsleiste (auf Mobilgeräten als ausklappbares
Menü), die die Themen gruppiert:

- **Elektromobilität** – Elektrofahrzeuge, Laden & Ladeinfrastruktur,
  Batteriediagnose sowie die Unterseite *Kostenvergleich E-Auto*
- **Energie & Wärme** – Wärmepumpen, Photovoltaik & Speicher, Thermografie
- **Weitere Themen** – Modellflug & Drohnen, Elektronik & Embedded,
  Erfindungen & Patente

## Unterseite: Kostenvergleich E-Auto vs. Verbrenner

Interaktives Werkzeug (dependency-frei, Diagramme als Inline-SVG). Vergleicht
die realen monatlichen Super-E10-Preise (Sep 2022 – Aug 2026) mit den
einstellbaren Stromkosten eines E-Autos. Über Regler lassen sich Fahrleistung,
Verbräuche, Ladeanteil und Strompreise anpassen; drei Ansichten zeigen
Monatskosten, kumulierte Kosten und die Spritpreis-Entwicklung.

## Neues Thema hinzufügen

1. In `index.html` eine neue `<section>` mit eigener `id` anlegen.
2. In `css/site.css` einen passenden Navigationspunkt in der `.nav-list`
   ergänzen (in beiden HTML-Dateien, damit die Navigation überall gleich ist).
3. Für umfangreichere Themen eine eigene Unterseite nach dem Muster von
   `elektroauto-kostenvergleich.html` erstellen und verlinken.

## Hinweise

- Die Seite ist für GitHub Pages ausgelegt (statisch, relative Pfade).
- Dateinamen der Bilder sind case-sensitive (z. B. `elektronik.JPG`).
- Das Impressum in `index.html` muss noch um die vollständige Anschrift
  ergänzt werden (Pflichtangabe nach § 5 DDG).
