/* ============================================================
   render.js — fotografiert save-the-date.html als PNG ab
   Aufruf (aus dem Repo-Wurzelverzeichnis):
     NODE_PATH="$(npm root -g)" node holz/flyer/render.js
   Ergebnis: holz/flyer/save-the-date.png, 2160 × 2700 px (4:5)
   ============================================================ */
const path = require("path");
const { chromium } = require("playwright");

const W = 1080, H = 1350, SCALE = 2;

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage({
        viewport: { width: W, height: H },
        deviceScaleFactor: SCALE,
    });

    await page.goto("file://" + path.join(__dirname, "save-the-date.html"));

    // Alle Schnitte explizit laden, bevor abfotografiert wird
    await page.evaluate(async () => {
        await Promise.all([
            document.fonts.load('500 20px "Cormorant"'),
            document.fonts.load('600 20px "Cormorant"'),
            document.fonts.load('italic 400 20px "Cormorant"'),
            document.fonts.load('italic 500 20px "Cormorant"'),
            document.fonts.load('400 20px "Jost"'),
            document.fonts.load('500 20px "Jost"'),
        ]);
        await document.fonts.ready;
    });

    const out = path.join(__dirname, "save-the-date.png");
    await page.screenshot({ path: out, clip: { x: 0, y: 0, width: W, height: H } });
    await browser.close();
    console.log("geschrieben:", out);
})();
