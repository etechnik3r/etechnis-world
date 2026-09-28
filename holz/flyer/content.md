# Save-the-Date-Flyer – Inhalt

Bild zum Verschicken per WhatsApp: `save-the-date.png`
(2160 × 2700 px, Hochformat 4:5).

## Was draufsteht

| Feld        | Inhalt                                                        | Stand |
|-------------|---------------------------------------------------------------|-------|
| Art         | **Save the Date** – noch keine Einladung                      | fest  |
| Anlass      | Hölzerne Hochzeit – zehn Jahre verheiratet                    | fest  |
| Paar        | **Merle & Bastian**                                           | fest  |
| Datum       | **Samstag, 12. Juni 2027**                                    | fest  |
| Ort         | Erlebnisbauernhof Bauer Bues                                  | fest  |
| Adresse     | Hauptstraße 18 · 38321 Groß Denkte · bei Wolfenbüttel         | fest  |
| Ton         | „Mit Kind und Kegel.“                                         | fest  |

## Was bewusst fehlt

| Feld              | Warum                                                        |
|-------------------|--------------------------------------------------------------|
| Uhrzeit           | noch nicht final mit dem Hof abgestimmt                      |
| Zusage / Frist    | kommt erst mit der richtigen Einladung                       |
| Ablauf, Essen, Kleidung, Geschenke, FAQ | steht auf der Einladungsseite `holz2.html` |
| QR-Code           | auf dem Handy scannt niemand das eigene Display – der Link kommt als Text in die Nachricht |

## Gestaltung

- „Papier & Holz“ wie die Seiten unter `holz/`: Papierton `#fbf5ea`,
  Schrift `#2b211a`, Holz `#97552b` / `#c4833f`, Gold `#d9a441`.
- Zentrales Motiv: zehn Jahresringe mit der „10“ – Anlass und Material in
  einem Zeichen. Die Ringe sind leicht unregelmäßig, wie bei echtem Holz.
- Der Hof (Scheune, Wohnhaus, Baum, Zaun, Strohballen) als feine
  einfarbige Linienzeichnung am unteren Rand.
- Schriften: Cormorant Garamond (Serife) und Jost (Labels), beide SIL
  Open Font License, liegen in `fonts/`.

## Neu erzeugen

Texte stehen in `save-the-date.html`. Nach einer Änderung:

```sh
NODE_PATH="$(npm root -g)" node holz/flyer/render.js
```

Braucht Playwright mit Chromium. Das Skript rendert die Seite mit
1080 × 1350 CSS-Pixeln bei Faktor 2 und schreibt `save-the-date.png`.

## Beim Verschicken

In WhatsApp als **HD** senden (oder als Dokument), sonst komprimiert
WhatsApp das Bild sichtbar. Den Link zur Save-the-Date-Seite als Text in
dieselbe Nachricht schreiben.
