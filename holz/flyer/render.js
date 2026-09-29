/* ============================================================
   render.js — fotografiert die Flyer-Seiten als PNG ab und
   druckt sie als PDF (Vektor, echte Schrift eingebettet)
   Aufruf (aus dem Repo-Wurzelverzeichnis):
     NODE_PATH="$(npm root -g)" node holz/flyer/render.js
   Ergebnis:
     holz/flyer/save-the-date.png / .pdf      Version 1
     holz/flyer/save-the-date-v2.png / .pdf   Version 2 (mit Foto)
   PNG: 2160 × 3840 px (9:16). PDF: 1080 × 1920 px = 810 × 1440 pt.
   ============================================================ */
const path = require("path");
const { chromium } = require("playwright");

const W = 1080, H = 1920, SCALE = 2;
const PAGES = ["save-the-date", "save-the-date-v2"];

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage({
        viewport: { width: W, height: H },
        deviceScaleFactor: SCALE,
    });
    // Beim PDF-Druck dieselbe Darstellung wie am Bildschirm
    await page.emulateMedia({ media: "screen" });

    for (const name of PAGES) {
        await page.goto("file://" + path.join(__dirname, name + ".html"));

        // Alle Schnitte explizit laden, bevor abfotografiert wird
        await page.evaluate(async () => {
            await Promise.all([
                document.fonts.load('500 20px "Literata"'),
                document.fonts.load('italic 500 20px "Literata"'),
                document.fonts.load('400 20px "Jost"'),
                document.fonts.load('500 20px "Jost"'),
            ]);
            await document.fonts.ready;
        });
        // Seiten mit Skript-Aufbau (Foto) melden sich über data-ready
        await page.waitForFunction(() => document.documentElement.dataset.ready === "1",
                                   null, { timeout: 15000 });

        const png = path.join(__dirname, name + ".png");
        await page.screenshot({ path: png, clip: { x: 0, y: 0, width: W, height: H } });
        console.log("geschrieben:", png);

        const pdf = path.join(__dirname, name + ".pdf");
        await page.pdf({
            path: pdf,
            width: W + "px",
            height: H + "px",
            printBackground: true,
            margin: { top: 0, right: 0, bottom: 0, left: 0 },
            pageRanges: "1",
        });
        console.log("geschrieben:", pdf);
    }
    await browser.close();
})();
