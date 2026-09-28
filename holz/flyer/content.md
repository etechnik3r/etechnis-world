# Save-the-Date-Flyer – Inhalt

Bild zum Verschicken per WhatsApp: `save-the-date.png`
(2160 × 3840 px, Hochformat 9:16 – füllt aktuelle Handys in voller Breite
und passt auch als WhatsApp-Status).

## Was draufsteht

| Feld        | Inhalt                                                        | Stand |
|-------------|---------------------------------------------------------------|-------|
| Art         | **Save the Date** – noch keine Einladung                      | fest  |
| Anlass      | Zehn Jahre · Hölzerne Hochzeit                                | fest  |
| Paar        | **Merle & Bastian**                                           | fest  |
| Slogan      | „Manche Tage sind es wert, gefeiert zu werden.“ – leitet direkt zum Datum über | fest |
| Datum       | **Samstag, 12. Juni 2027**                                    | fest  |
| Ort         | „Auf einem Bauernhof bei Wolfenbüttel“                        | fest  |
| Ton         | „Mit Kind und Kegel.“                                         | fest  |

## Was bewusst fehlt

| Feld              | Warum                                                        |
|-------------------|--------------------------------------------------------------|
| Name des Hofs, Adresse | **noch geheim** – nur „Bauernhof“ und die Region; die Hofzeichnung unten transportiert den Rest |
| Uhrzeit           | noch nicht final mit dem Hof abgestimmt                      |
| Zusage / Frist    | kommt erst mit der richtigen Einladung                       |
| Ablauf, Essen, Kleidung, Geschenke, FAQ | steht auf der Einladungsseite `holz2.html` |
| QR-Code           | auf dem Handy scannt niemand das eigene Display              |

## Schriftgrößen

Auf dem Handy wird das Bild auf ca. 390 pt Breite gezeigt (Faktor ~0,36
gegenüber den 1080 CSS-px der Vorlage). Daraus:

| Element               | Vorlage | auf dem Display |
|-----------------------|---------|-----------------|
| „Zehn Jahre“          | 164 px  | ~59 pt          |
| Datum                 | 146 px  | ~53 pt          |
| Namen                 |  94 px  | ~34 pt          |
| „Hölzerne Hochzeit“   |  82 px  | ~30 pt          |
| Slogan                |  64 px  | ~23 pt          |
| Ort                   |  62 px  | ~22 pt          |
| „Mit Kind und Kegel.“ |  58 px  | ~21 pt          |
| Labels (Versalien)    |  38 px  | ~14 pt          |

## Gestaltung

- „Papier & Holz“ wie die Seiten unter `holz/`: Papierton `#fbf5ea`,
  Schrift `#2b211a`, Holz `#97552b` / `#c4833f`.
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
1080 × 1920 CSS-Pixeln bei Faktor 2 und schreibt `save-the-date.png`.

## Beim Verschicken

- In WhatsApp als **HD** senden (oder als Dokument), sonst komprimiert
  WhatsApp das Bild sichtbar.
- **Achtung, Link:** Die Save-the-Date-Seite `index.html`, ihre
  Link-Vorschau (`og:description`, `img/vorschau.png`) und die Einladung
  `holz2.html` nennen den Hof und die Adresse. Solange der Ort geheim
  bleiben soll, den Link **nicht** mitschicken – das Bild steht für sich.
