# Save-the-Date-Flyer – Inhalt

Bild zum Verschicken per WhatsApp: `save-the-date.png`
(2160 × 3840 px, Hochformat 9:16 – füllt aktuelle Handys in voller Breite
und passt auch als WhatsApp-Status).

## Was draufsteht

Reihenfolge von oben nach unten: erst die Fakten, dann die Geschichte.

| Feld        | Inhalt                                                        |
|-------------|---------------------------------------------------------------|
| Art         | **Save the Date** – noch keine Einladung                      |
| Signet      | zehn Jahresringe mit der „10“                                 |
| Anlass      | Zehn Jahre · Hölzerne Hochzeit                                |
| Paar        | **Merle & Bastian**                                           |
| Datum       | **Samstag, 12. Juni 2027**                                    |
| Slogan      | „Manche Tage sind es wert, gefeiert zu werden.“               |
| Text        | „Wir laden euch ein zu einem ganz besonderen Tag – an einem Ort, an dem Kinder genauso willkommen sind wie Erwachsene. Ein bisschen Natur, ein bisschen Abenteuer, ein paar Tiere, viel Platz zum Spielen – und hoffentlich ganz viel Zeit für die Menschen, die uns wichtig sind.“ |
| Bild        | Hof als Linienzeichnung (Scheune, Wohnhaus, Baum, Zaun, Strohballen) – der einzige Hinweis auf den Ort |

Der Slogan führt direkt in den Text: „Manche Tage sind es wert, gefeiert
zu werden. Wir laden euch ein zu einem ganz besonderen Tag …“

## Was bewusst fehlt

| Feld              | Warum                                                        |
|-------------------|--------------------------------------------------------------|
| Hof, Adresse, Region, „Bauernhof“ | **noch geheim** – Text und Zeichnung deuten nur an |
| Uhrzeit           | noch nicht final mit dem Hof abgestimmt                      |
| Zusage / Frist    | kommt erst mit der richtigen Einladung                       |
| Ablauf, Essen, Kleidung, Geschenke, FAQ | steht auf der Einladungsseite `holz2.html` |
| QR-Code           | auf dem Handy scannt niemand das eigene Display              |

## Schrift und Lesbarkeit

Das Bild wird auf dem Handy ca. 390 pt breit gezeigt, also Faktor ~0,36
gegenüber den 1080 CSS-px der Vorlage.

**Literata** (Serife) statt Cormorant: Literata ist als Leseschrift für
Bildschirme gebaut (Google Play Books), mit großer x-Höhe (0,52 em statt
0,39 em bei Cormorant, also ~⅓ größer bei gleicher Pixelgröße), offenen
Formen und ohne haarfeine Striche. Das hilft vor allem älteren Lesern.
Über die Achse für optische Größen (`opsz`) bekommt jedes Element den
Schnitt für seine tatsächliche Größe auf dem Display: der Titel den
feinen, eleganten, der Fließtext den robusten.

**Jost** für die gesperrten Versalien-Labels.

| Element               | Vorlage | auf dem Display | opsz |
|-----------------------|---------|-----------------|------|
| „Zehn Jahre“          | 124 px  | ~45 pt          | 45   |
| Datum                 | 124 px  | ~45 pt          | 45   |
| Namen                 |  88 px  | ~32 pt          | 32   |
| „Hölzerne Hochzeit“   |  66 px  | ~24 pt          | 24   |
| Slogan                |  56 px  | ~20 pt          | 20   |
| Fließtext             |  50 px  | ~18 pt          | 18   |
| Labels (Jost)         |  42 px  | ~15 pt          | –    |

Beide Schriften: SIL Open Font License, liegen in `fonts/`.

## Gestaltung

- „Papier & Holz“ wie die Seiten unter `holz/`: Papierton `#fbf5ea`,
  Schrift `#2b211a` / `#3f3128`, Holz `#97552b` / `#c4833f`.
- Die Jahresringe sind leicht unregelmäßig, wie bei echtem Holz.

## Neu erzeugen

Texte stehen in `save-the-date.html`. Nach einer Änderung:

```sh
NODE_PATH="$(npm root -g)" node holz/flyer/render.js
```

Braucht Playwright mit Chromium. Das Skript rendert die Seite mit
1080 × 1920 CSS-Pixeln bei Faktor 2 und schreibt `save-the-date.png`.
Wird der Text länger, prüfen, dass der Absatz nicht in die Hofzeichnung
läuft (aktuell 8 Zeilen, ~60 px Luft).

## Beim Verschicken

- In WhatsApp als **HD** senden (oder als Dokument), sonst komprimiert
  WhatsApp das Bild sichtbar.
- **Achtung, Link:** Die Save-the-Date-Seite `index.html`, ihre
  Link-Vorschau (`og:description`, `img/vorschau.png`) und die Einladung
  `holz2.html` nennen den Hof und die Adresse. Solange der Ort geheim
  bleiben soll, den Link **nicht** mitschicken – das Bild steht für sich.
