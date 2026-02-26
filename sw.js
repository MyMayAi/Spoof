const CACHE_NAME = 'chef-v3';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './chef-hat.png',
  './flour.png',
  './glass.png',
  './lemon.png',
  './mug.png',
  './oil.png',
  './salt.png',
  './spoon.png',
  './sugar.png',
  './teaspoon.png',
  './vinegar.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
