// Simple cache-first PWA service worker
const CACHE_NAME = 'o--pwa-v1';
const OFFLINE_URL = '/offline.html';
const ASSETS = [
  '/',
  '/index.html',
  OFFLINE_URL,
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => k !== CACHE_NAME ? caches.delete(k) : null))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // put a copy in cache for next time (optional)
        return caches.open(CACHE_NAME).then(cache => {
          try { cache.put(event.request, response.clone()); } catch(e){}
          return response;
        });
      }).catch(() => caches.match(OFFLINE_URL));
    })
  );
});
