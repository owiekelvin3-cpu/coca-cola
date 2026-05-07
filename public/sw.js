/**
 * Coca-Cola NG — Service Worker
 * Caches Sketchfab 3D model iframes and assets so they load
 * instantly on every reload after the first visit.
 */

const CACHE_NAME = "coke-ng-v1";

// Sketchfab model IDs used on the site
const MODEL_IDS = [
  "3e2d38a14d4345608a95843b73d869b6", // Can
  "34075fedb0ef40d9a172231134849914", // Bottle
  "30178d8ee92949499854f6edaac8574f", // Softdrinks
];

// Pre-cache the Sketchfab embed pages on install
const PRECACHE_URLS = MODEL_IDS.map(id => {
  const p = new URLSearchParams({
    autostart: "1", preload: "1", transparent: "1",
    ui_infos: "0", ui_controls: "0", ui_watermark: "0",
    ui_watermark_link: "0", ui_ar: "0", ui_help: "0",
    ui_settings: "0", ui_vr: "0", ui_fullscreen: "0",
    ui_annotations: "0", ui_stop: "0", ui_loading: "0",
    autospin: "0.1", animation_autoplay: "1", scrollwheel: "0",
    dnt: "0",
  });
  return `https://sketchfab.com/models/${id}/embed?${p.toString()}`;
});

// ── Install: pre-cache embed pages ───────────────────────────────
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Best-effort: don't fail install if Sketchfab is unreachable
      return Promise.allSettled(
        PRECACHE_URLS.map(url =>
          fetch(url, { mode: "no-cors" })
            .then(res => cache.put(url, res))
            .catch(() => {}) // silently skip if offline
        )
      );
    }).then(() => self.skipWaiting())
  );
});

// ── Activate: clean up old caches ────────────────────────────────
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: cache-first for Sketchfab, network-first for everything else ──
self.addEventListener("fetch", (event) => {
  const url = event.request.url;

  // Only intercept Sketchfab requests
  if (
    url.includes("sketchfab.com") ||
    url.includes("media.sketchfab.com") ||
    url.includes("static.sketchfab.com")
  ) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(event.request);
        if (cached) {
          // Serve from cache immediately
          // Refresh cache in background (stale-while-revalidate)
          fetch(event.request, { mode: "no-cors" })
            .then(res => { if (res) cache.put(event.request, res); })
            .catch(() => {});
          return cached;
        }

        // Not cached yet — fetch and cache
        try {
          const res = await fetch(event.request, { mode: "no-cors" });
          if (res) cache.put(event.request, res.clone());
          return res;
        } catch {
          // Offline and not cached — nothing we can do
          return new Response("", { status: 503 });
        }
      })
    );
    return;
  }

  // Everything else: network first, fall back to cache
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
