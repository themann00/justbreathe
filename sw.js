const CACHE_NAME = 'justbreathe-v1';
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
    'manifest.json'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request))
    );
});