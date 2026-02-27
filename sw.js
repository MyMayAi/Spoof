/* sw.js - Chef Academy / Peso Senza Bilancia */

// Cambia questo numero (v1, v2, v3...) ogni volta che modifichi index.html
const CACHE_NAME = 'chef-academy-v4'; 

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './spoon.png',
  './teaspoon.png',
  './mug.png',
  './glass.png',
  './flour.png',
  './oil.png',
  './sugar.png',
  './salt.png',
  './rice.png',
  './milk.png'
];

// Installazione: salvataggio asset
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Attivazione: pulizia vecchie cache
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(k => {
        if (k !== CACHE_NAME) return caches.delete(k);
      })
    ))
  );
  self.clients.claim();
});

// Fetch: Priorità alla cache per velocità massima
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});