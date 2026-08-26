/* ============================================================
   app.js — Gemeinsame Logik für alle Seiten
   Navigation (mobil), Scrollspy, Update-Banner, PWA-Installation.
   Wird von jeder Seite eingebunden.
   ============================================================ */
(function () {
    "use strict";

    var APP_VERSION = "2026.08.26";
    var $ = function (id) { return document.getElementById(id); };

    /* ── Mobiles Navigationsmenü ───────────────────────────── */
    var toggle   = document.querySelector(".nav-toggle");
    var backdrop = document.querySelector(".nav-backdrop");
    function closeNav() {
        document.body.classList.remove("nav-open");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
    }
    if (toggle) {
        toggle.addEventListener("click", function () {
            var open = document.body.classList.toggle("nav-open");
            toggle.setAttribute("aria-expanded", open ? "true" : "false");
        });
    }
    if (backdrop) backdrop.addEventListener("click", closeNav);
    document.querySelectorAll(".sidebar a").forEach(function (a) {
        a.addEventListener("click", closeNav);
    });

    /* ── Scrollspy (nur auf Seiten mit Abschnitten) ────────── */
    var navLinks = Array.prototype.slice.call(
        document.querySelectorAll('.nav-list a[data-nav]'));
    if (navLinks.length && "IntersectionObserver" in window) {
        var spy = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var id = entry.target.id;
                navLinks.forEach(function (l) {
                    l.classList.toggle("active", l.getAttribute("href") === "#" + id);
                });
            });
        }, { rootMargin: "-45% 0px -50% 0px" });
        document.querySelectorAll(".page [id]").forEach(function (el) { spy.observe(el); });
    }

    /* ── Zahnrad-Menü ──────────────────────────────────────── */
    var gearBtn  = $("gearBtn");
    var gearMenu = $("gearMenu");
    if (gearBtn && gearMenu) {
        gearBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            var open = gearMenu.hasAttribute("hidden");
            if (open) { gearMenu.removeAttribute("hidden"); }
            else { gearMenu.setAttribute("hidden", ""); }
            gearBtn.setAttribute("aria-expanded", open ? "true" : "false");
        });
        document.addEventListener("click", function (e) {
            if (!gearMenu.contains(e.target) && e.target !== gearBtn) {
                gearMenu.setAttribute("hidden", "");
                gearBtn.setAttribute("aria-expanded", "false");
            }
        });
    }
    var appVersion = $("appVersion");
    if (appVersion) appVersion.textContent = "Version " + APP_VERSION;

    /* ── PWA-Installation ("App installieren") ─────────────── */
    var installBtn = $("installBtn");
    var deferredPrompt = null;
    window.addEventListener("beforeinstallprompt", function (e) {
        e.preventDefault();
        deferredPrompt = e;
        if (installBtn) installBtn.removeAttribute("hidden");
    });
    if (installBtn) {
        installBtn.addEventListener("click", function () {
            if (!deferredPrompt) return;
            deferredPrompt.prompt();
            deferredPrompt.userChoice.finally(function () {
                deferredPrompt = null;
                installBtn.setAttribute("hidden", "");
            });
        });
    }
    window.addEventListener("appinstalled", function () {
        if (installBtn) installBtn.setAttribute("hidden", "");
    });

    /* ── Service Worker + Update-Erkennung ─────────────────── */
    var banner   = $("updateBanner");
    var ubReload = $("ubReload");
    var ubClose  = $("ubClose");
    var updateCheck = $("updateCheck");

    function showUpdateBanner(worker) {
        if (!banner) return;
        banner.classList.add("show");
        if (ubReload) ubReload.onclick = function () {
            if (worker) worker.postMessage({ type: "SKIP_WAITING" });
            else location.reload();
        };
    }
    if (ubClose && banner) {
        ubClose.addEventListener("click", function () { banner.classList.remove("show"); });
    }

    if ("serviceWorker" in navigator && location.protocol.indexOf("http") === 0) {
        navigator.serviceWorker.register("sw.js").then(function (reg) {
            if (reg.waiting && navigator.serviceWorker.controller) showUpdateBanner(reg.waiting);
            reg.addEventListener("updatefound", function () {
                var nw = reg.installing;
                if (!nw) return;
                nw.addEventListener("statechange", function () {
                    if (nw.state === "installed" && navigator.serviceWorker.controller) {
                        showUpdateBanner(nw);
                    }
                });
            });
            if (updateCheck) updateCheck.addEventListener("click", function () {
                reg.update();
            });
            // Beim Fokussieren des Tabs nach Updates schauen
            window.addEventListener("focus", function () { reg.update(); });
        }).catch(function () { /* Registrierung fehlgeschlagen – ignorieren */ });

        var reloaded = false;
        navigator.serviceWorker.addEventListener("controllerchange", function () {
            if (reloaded) return;
            reloaded = true;
            location.reload();
        });
    }
})();
