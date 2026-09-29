# Save-the-Date-Flyer – Inhalt

Zwei Versionen als Bild zum Verschicken per WhatsApp, beide 2160 × 3840 px
im Hochformat 9:16 (füllt aktuelle Handys in voller Breite, passt auch als
WhatsApp-Status):

| Datei                          | Version                                              |
|--------------------------------|------------------------------------------------------|
| `save-the-date.png` / `.pdf`   | **1** – Jahresringe, „Zehn Jahre“, Hof-Zeichnung     |
| `save-the-date-v2.png` / `.pdf`| **2** – nach handschriftlicher Vorlage, Foto im Kreis |

Die PDFs haben dasselbe Format (810 × 1440 pt ≈ 286 × 508 mm), sind
vektoriell und enthalten echten, kopierbaren Text. Jost ist als Schrift
eingebettet; Literata legt Chromium wegen der variablen Achsen als
Vektorkonturen (Type 3) ab – sieht überall gleich aus, lässt sich in
Canva & Co. aber nicht als Text weiterbearbeiten.

---

## Version 1

Reihenfolge von oben nach unten: erst die Fakten, dann die Geschichte.

| Feld        | Inhalt                                                        |
|-------------|---------------------------------------------------------------|
| Art         | **Save the Date** – noch keine Einladung                      |
| Signet      | zehn Jahresringe mit der „10“                                 |
| Anlass      | Zehn Jahre · Hölzerne Hochzeit                                |
| Paar        | **Merle & Bastian**                                           |
| Datum       | **Samstag, 12. Juni 2027** (ohne Uhrzeit)                     |
| Slogan      | „Manche Tage sind es wert, gefeiert zu werden.“               |
| Text        | „Wir laden euch ein zu einem ganz besonderen Tag – an einem Ort, an dem Kinder genauso willkommen sind wie Erwachsene. Ein bisschen Natur, ein bisschen Abenteuer, ein paar Tiere, viel Platz zum Spielen – und hoffentlich ganz viel Zeit für die Menschen, die uns wichtig sind.“ |
| Bild        | Hof als Linienzeichnung (Scheune, Wohnhaus, Baum, Zaun, Strohballen) – der einzige Hinweis auf den Ort |

## Version 2

Nach handschriftlicher Vorlage.

| Feld        | Inhalt                                                        |
|-------------|---------------------------------------------------------------|
| Überschrift | „Wir haben etwas zu feiern“                                   |
| Medaillon   | **Foto** im Kreis, darum zehn Jahresringe als Holzrahmen; im Bogen oben „10 JAHRE **WIR**“, unten „HÖLZERNE HOCHZEIT“, links **M**, rechts **B** |
| Datum       | **12. Juni 2027**, darunter „Samstag · **15 Uhr**“            |
| Text 1      | „Ob Groß oder Klein – ihr seid mit euren Kindern herzlich eingeladen, diesen besonderen Tag mit uns zu verbringen.“ |
| Text 2      | „Freut euch auf Stroh in den Haaren, leckeres Essen, lautes Kinderlachen und jede Menge herzlicher Begegnungen.“ |
| Schluss     | „Also: Termin vormerken und Vorfreude sammeln.“               |
| Hinweis     | „Weitere Infos gibt’s mit der Einladung.“                     |
| Bild        | schmaler Streifen mit Wiese, Strohballen und Zaun             |

**Uhrzeit:** Version 2 nennt 15 Uhr (laut Vorlage). Die Seiten unter
`holz/` stehen noch auf 14–20 Uhr mit Fragezeichen.

**Foto:** `foto.jpg` neben `save-the-date-v2.html` legen und neu rendern –
es landet automatisch im Kreis. Ohne Foto steht dort eine Holzscheibe.
Bildausschnitt bei Bedarf über `FOTO = { zoom, dx, dy }` im Skript der
Seite. **Das Repo ist öffentlich:** `foto.*` ist per `.gitignore`
ausgeschlossen, und ein PNG mit Foto sollte ebenfalls nicht committet
werden.

---

## Was in beiden bewusst fehlt

| Feld              | Warum                                                        |
|-------------------|--------------------------------------------------------------|
| Hof, Adresse, Region, „Bauernhof“ | **noch geheim** – Text und Zeichnung deuten nur an |
| Zusage / Frist    | kommt erst mit der richtigen Einladung                       |
| Ablauf, Kleidung, Geschenke, FAQ | steht auf der Einladungsseite `holz2.html`    |
| QR-Code           | auf dem Handy scannt niemand das eigene Display              |

## Schrift und Lesbarkeit

Das Bild wird auf dem Handy ca. 390 pt breit gezeigt, also Faktor ~0,36
gegenüber den 1080 CSS-px der Vorlage.

**Literata** (Serife): als Leseschrift für Bildschirme gebaut (Google Play
Books), große x-Höhe (0,52 em – zum Vergleich Cormorant 0,39 em), offene
Formen, keine haarfeinen Striche. Das hilft vor allem älteren Lesern.
Über die Achse für optische Größen (`opsz`) bekommt jedes Element den
Schnitt für seine tatsächliche Größe auf dem Display.

**Jost** für die gesperrten Versalien (Labels, Schrift im Bogen).

| Element                         | Vorlage | auf dem Display |
|---------------------------------|---------|-----------------|
| V1 „Zehn Jahre“, Datum          | 124 px  | ~45 pt          |
| V2 Datum                        | 116 px  | ~42 pt          |
| V1 Namen                        |  88 px  | ~32 pt          |
| V2 Überschrift                  |  72 px  | ~26 pt          |
| V1 „Hölzerne Hochzeit“          |  66 px  | ~24 pt          |
| V2 Initialen M / B              |  60 px  | ~22 pt          |
| Slogan / Schluss                | 54–56 px| ~20 pt          |
| Fließtext                       |  50 px  | ~18 pt          |
| Labels                          | 42–44 px| ~15–16 pt       |
| V2 Hinweis „Weitere Infos …“    |  42 px  | ~15 pt          |
| V2 Schrift im Bogen             |  40 px  | ~14 pt          |

Beide Schriften: SIL Open Font License, liegen in `fonts/`.

## Gestaltung

- „Papier & Holz“ wie die Seiten unter `holz/`: Papierton `#fbf5ea`,
  Schrift `#2b211a` / `#3f3128`, Holz `#97552b` / `#c4833f`.
- Die Jahresringe sind leicht unregelmäßig, wie bei echtem Holz.

## Neu erzeugen

Texte stehen in `save-the-date.html` bzw. `save-the-date-v2.html`. Nach
einer Änderung:

```sh
NODE_PATH="$(npm root -g)" node holz/flyer/render.js
```

Braucht Playwright mit Chromium. Das Skript rendert beide Seiten mit
1080 × 1920 CSS-Pixeln bei Faktor 2 als PNG und druckt sie zusätzlich
als PDF. Wird ein Text länger, prüfen, dass
er nicht in die Zeichnung am unteren Rand läuft.

## Beim Verschicken

- In WhatsApp als **HD** senden (oder als Dokument), sonst komprimiert
  WhatsApp das Bild sichtbar.
- **Achtung, Link:** Die Save-the-Date-Seite `index.html`, ihre
  Link-Vorschau (`og:description`, `img/vorschau.png`) und die Einladung
  `holz2.html` nennen den Hof und die Adresse. Solange der Ort geheim
  bleiben soll, den Link **nicht** mitschicken – das Bild steht für sich.
