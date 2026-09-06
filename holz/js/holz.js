/* ============================================================
   holz.js — Kleine Helfer für die Seiten zur Hölzernen Hochzeit
   - Countdown bis zum Fest
   - Kalender-Eintrag (.ics) direkt im Browser erzeugen
   - Sanftes Einblenden beim Scrollen
   - Leichter Parallax-Effekt in der Hof-Illustration
   Ohne Bibliotheken, ohne externe Requests.
   ============================================================ */
(function () {
    "use strict";

    /* Zentrale Eckdaten – NUR HIER ändern, alles andere zieht nach.
       (Werden aus den data-Attributen am <body> gelesen.) */
    var body  = document.body;
    var START = body.getAttribute("data-start") || "2027-06-12T14:00:00+02:00";
    var END   = body.getAttribute("data-end")   || "2027-06-12T20:00:00+02:00";
    var TITLE = body.getAttribute("data-title") || "Hölzerne Hochzeit";
    var PLACE = body.getAttribute("data-place") || "Bauer Bues, Hauptstraße 18, 38321 Groß Denkte";

    var startDate = new Date(START);

    /* ── Countdown ─────────────────────────────────────────── */
    var cdBox = document.getElementById("countdown");
    if (cdBox) {
        var cells = {
            d: cdBox.querySelector('[data-cd="d"]'),
            h: cdBox.querySelector('[data-cd="h"]'),
            m: cdBox.querySelector('[data-cd="m"]'),
            s: cdBox.querySelector('[data-cd="s"]')
        };
        var tick = function () {
            var diff = startDate.getTime() - Date.now();
            if (diff <= 0) { cdBox.hidden = true; return; }
            var s = Math.floor(diff / 1000);
            var d = Math.floor(s / 86400);
            var h = Math.floor((s % 86400) / 3600);
            var m = Math.floor((s % 3600) / 60);
            var sec = s % 60;
            if (cells.d) cells.d.textContent = d;
            if (cells.h) cells.h.textContent = h < 10 ? "0" + h : h;
            if (cells.m) cells.m.textContent = m < 10 ? "0" + m : m;
            if (cells.s) cells.s.textContent = sec < 10 ? "0" + sec : sec;
        };
        tick();
        setInterval(tick, 1000);
    }

    /* ── Kalender-Datei (.ics) ─────────────────────────────── */
    function icsStamp(date) {
        return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    }
    function buildIcs() {
        var lines = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//etechnis.world//Hoelzerne Hochzeit//DE",
            "CALSCALE:GREGORIAN",
            "METHOD:PUBLISH",
            "BEGIN:VEVENT",
            "UID:hoelzerne-hochzeit-" + icsStamp(startDate) + "@etechnis.world",
            "DTSTAMP:" + icsStamp(new Date()),
            "DTSTART:" + icsStamp(startDate),
            "DTEND:" + icsStamp(new Date(END)),
            "SUMMARY:" + TITLE,
            "LOCATION:" + PLACE.replace(/,/g, "\\,"),
            "DESCRIPTION:Alle Details: " + location.href.replace(/,/g, "\\,"),
            "BEGIN:VALARM",
            "TRIGGER:-P7D",
            "ACTION:DISPLAY",
            "DESCRIPTION:" + TITLE,
            "END:VALARM",
            "END:VEVENT",
            "END:VCALENDAR"
        ];
        return lines.join("\r\n");
    }
    Array.prototype.forEach.call(document.querySelectorAll("[data-ics]"), function (btn) {
        btn.addEventListener("click", function (ev) {
            ev.preventDefault();
            var blob = new Blob([buildIcs()], { type: "text/calendar;charset=utf-8" });
            var url  = URL.createObjectURL(blob);
            var a    = document.createElement("a");
            a.href = url;
            a.download = "hoelzerne-hochzeit.ics";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
            var old = btn.textContent;
            btn.textContent = "Im Kalender ✓";
            setTimeout(function () { btn.textContent = old; }, 2600);
        });
    });

    /* ── Einblenden beim Scrollen ──────────────────────────── */
    var targets = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
        Array.prototype.forEach.call(targets, function (el) { el.classList.add("reveal"); });
    } else {
        Array.prototype.forEach.call(targets, function (el) { el.classList.add("reveal-init"); });
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (!e.isIntersecting) return;
                e.target.classList.remove("reveal-init");
                e.target.classList.add("reveal");
                io.unobserve(e.target);
            });
        }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });
        Array.prototype.forEach.call(targets, function (el) { io.observe(el); });
    }

    /* ── Parallax in der Hof-Illustration ──────────────────── */
    var layers = document.querySelectorAll("[data-par]");
    if (layers.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        var ticking = false;
        var apply = function () {
            var y = window.pageYOffset || 0;
            Array.prototype.forEach.call(layers, function (el) {
                var f = parseFloat(el.getAttribute("data-par")) || 0;
                el.style.transform = "translate3d(0," + (y * f).toFixed(1) + "px,0)";
            });
            ticking = false;
        };
        window.addEventListener("scroll", function () {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(apply);
        }, { passive: true });
        apply();
    }
})();
