/* ============================================================
   render.js — fotografiert die Flyer-Seiten als PNG ab
   Aufruf (aus dem Repo-Wurzelverzeichnis):
     NODE_PATH="$(npm root -g)" node holz/flyer/render.js
   Ergebnis, je 2160 × 3840 px (9:16):
     holz/flyer/save-the-date.png      Version 1
     holz/flyer/save-the-date-v2.png   Version 2 (mit Foto)
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

        const out = path.join(__dirname, name + ".png");
        await page.screenshot({ path: out, clip: { x: 0, y: 0, width: W, height: H } });
        console.log("geschrieben:", out);
    }
    await browser.close();
})();
