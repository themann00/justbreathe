const CACHE_NAME = 'justbreathe-v2';
const ASSETS = [
    './',
    'index.html',
    'tide.html',
    'particlecloud.html',
    'mantra.html',
    'mandala.html',
    'emdr.html',
    'sleep.html',
    'nav.js',
    'manifest.json',
    'icon.svg'
];

self.addEventListener('install', (e) => {
    self.skipWaiting(); // Force update immediately
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request))
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(clients.claim()); // Take control of all pages immediately
});