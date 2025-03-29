const CACHE_NAME = 'age-tracker-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/_next/static/chunks/app/page-*.js',
  '/_next/static/chunks/main-*.js',
  '/_next/static/css/*.css',
  '/_next/static/media/*.woff2',
  '/android-icon-*.png',
  '/apple-icon-*.png',
  '/favicon.ico',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
