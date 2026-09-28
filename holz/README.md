# Hölzerne Hochzeit – Save the Date & Einladung

Zwei zusammengehörende Seiten für unsere Hölzerne Hochzeit (zehn Jahre)
auf dem Erlebnisbauernhof **Bauer Bues** in Groß Denkte bei Wolfenbüttel.

| Datei         | Zweck | Ton |
|---------------|-------|-----|
| `index.html`  | **Save the Date** – nur die knackigen Fakten, damit sich alle den Termin merken | kurz, ein Bildschirm, Wow |
| `holz2.html`  | **Die Einladung** – Ablauf, Kinder, Essen, Anfahrt, Geschenke, Zusage | ausführlich, warm, erklärend |

Beide Seiten sind **komplett eigenständig**: eigenes CSS, eigenes JS, eigene
Bilder, keine externen Schriften, keine Bibliotheken, keine Requests nach
außen. Der Ordner `holz/` lässt sich deshalb 1:1 auf einen beliebigen
Webspace kopieren und funktioniert dort sofort.

```
holz/
├── index.html      Save the Date
├── holz2.html      Ausführliche Einladung
├── css/holz.css    Design (warm, "Papier & Holz")
├── js/holz.js      Countdown, Kalender-Datei (.ics), Einblendungen, Parallax
├── img/
│   ├── favicon.svg Jahresringe als Icon
│   └── vorschau.png Vorschaubild für WhatsApp/Signal/Mail (1200×630)
└── flyer/          Save-the-Date als Bild zum Verschicken
    ├── content.md          Inhalt, was bewusst fehlt, wie neu erzeugen
    ├── save-the-date.html  Quelle des Bildes
    ├── save-the-date.png   fertiges Bild, 2160×2700 (4:5)
    ├── render.js           HTML → PNG mit Playwright
    └── fonts/              Cormorant Garamond + Jost (SIL OFL)
```

## Nicht auffindbar, nur über den Link

- Von der Startseite (`../index.html`) wird **bewusst nicht verlinkt**.
- Beide Seiten tragen
  `<meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex">`
  plus `googlebot`-Variante und `referrer: no-referrer`.
- **Bewusst kein Eintrag in einer `robots.txt`:** Ein `Disallow: /holz/`
  würde die Adresse öffentlich bekannt machen *und* gleichzeitig verhindern,
  dass Suchmaschinen das `noindex` überhaupt lesen. Das Gegenteil von dem,
  was wir wollen.
- Der Service Worker holt alles unter `/holz/` **immer zuerst aus dem Netz**,
  damit niemand eine veraltete Uhrzeit sieht (siehe `../sw.js`).

> Zu bedenken: Solange das Repository öffentlich ist, ist der Ordnername auch
> auf GitHub sichtbar. Wirklich „geheim" ist die Seite nur, wenn das
> Repository privat ist oder der Ordner beim Deploy umbenannt wird
> (z. B. in etwas Unrateambares wie `holz-3f9a2c/`).

## Was noch eingetragen werden muss

Alle Platzhalter sind auf den Seiten **rot und kursiv** markiert (`.ph`):

1. **Name der Braut: Merle** (im Flyer schon drin) – auf den Seiten noch offen, in beiden Dateien: `<span class="ph">[Name]</span>`,
   zusätzlich im `data-title` am `<body>` und im Footer.
2. **Das exakte Datum.** Aktuell steht überall **Samstag, 12. Juni 2027**
   (ein plausibler Samstag im Juni). Zu ändern an drei Stellen je Datei:
   - `data-start` / `data-end` am `<body>` → daraus ziehen Countdown *und*
     Kalender-Datei ihre Werte,
   - der sichtbare Datumsblock (`.dateline`),
   - die Fakten-/Karten-Texte.
3. **Rückmeldefrist** und **Mailadresse/WhatsApp** im Abschnitt „Zusage"
   in `holz2.html` (inkl. `mailto:`-Link).

## Die Fragezeichen

Alles, was mit dem Hof noch nicht final abgestimmt ist, trägt ein
`<span class="tbc">?</span>` – ein kleines gelbes Fragezeichen mit Tooltip.
Sobald etwas bestätigt ist, einfach den `<span>` löschen. Betroffen sind
aktuell: Uhrzeit 14–20 Uhr, alle Zeiten im Ablauf, Pizza am Abend,
Lagerfeuer, Hunde.

## Bilder

Die Illustrationen sind **selbst gezeichnete Inline-SVGs** (Hof mit Scheune,
Wohnhaus, Baum, Zaun; auf Seite 2 zusätzlich Lichterkette, Trettrecker,
Hühner und Pony). Kein fremdes Bildmaterial, damit es keine Rechtefragen
gibt. Echte Fotos vom Hof können später einfach ergänzt werden – sie gehören
nach `img/`.

Das Vorschaubild `img/vorschau.png` ist die Grafik, die beim Teilen des Links
in WhatsApp, Signal oder Mail erscheint (Open Graph, 1200×630).

## Nach dem Deploy

`CACHE`-Version in `../sw.js` erhöhen, damit Besucher die neue Fassung
bekommen (bereits auf `ew-cache-v14` gesetzt).
