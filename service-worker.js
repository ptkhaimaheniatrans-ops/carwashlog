const CACHE_NAME = "carwash-log-v2";

const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",

  // ICON PWA (WAJIB)
  "./assets/images/icon-192.png",
  "./assets/images/icon-512.png",

  // IMAGE
  "./assets/images/carlog.jpg",

  // SOUND
  "./assets/sounds/clicktone.mp3",
  "./assets/sounds/successtone.mp3",
  "./assets/sounds/errortone.mp3"
];

/* INSTALL */
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

/* ACTIVATE */
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME)
            .map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

/* FETCH */
self.addEventListener("fetch", event => {

  // Jangan cache Google Apps Script
  if (event.request.url.includes("script.google.com")) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request)
        .catch(() => caches.match("./index.html"));
    })
  );
});
