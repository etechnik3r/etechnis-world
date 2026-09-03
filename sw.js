/* ============================================================
   sw.js — Service Worker (Offline-Fähigkeit + Update-Erkennung)
   Beim Deploy die CACHE-Version erhöhen: der Browser erkennt den
   geänderten Service Worker, installiert ihn und die Seite zeigt
   das "Neue Version verfügbar"-Banner (siehe js/app.js).
   ============================================================ */
const CACHE = "ew-cache-v13";

// Kern-Dateien (App-Shell). Relative Pfade, damit es auch unter
// einem Unterverzeichnis (GitHub Pages) funktioniert.
const CORE = [
    "./",
    "index.html",
    "elektroauto-kostenvergleich.html",
    "css/site.css",
    "css/tools.css",
    "js/app.js",
    "img/circuit.svg",
    "manifest.webmanifest",
    "icons/icon-192.png",
    "icons/icon-512.png",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE)
            .then((c) => c.addAll(CORE))
            .catch(() => { /* einzelne fehlende Datei nicht fatal */ })
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(
                keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

// Cache-first für gleiche Herkunft; erfolgreiche Antworten nachladen.
self.addEventListener("fetch", (event) => {
    const req = event.request;
    if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
    event.respondWith(
        caches.match(req).then((hit) => {
            if (hit) return hit;
            return fetch(req).then((res) => {
                if (res && res.status === 200 && res.type === "basic") {
                    const copy = res.clone();
                    caches.open(CACHE).then((c) => c.put(req, copy));
                }
                return res;
            }).catch(() => hit);
        })
    );
});

// Auf Wunsch der Seite sofort aktiv werden → controllerchange → Reload.
self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});
