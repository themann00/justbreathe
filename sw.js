const CACHE_NAME = 'justbreathe-v3';
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
    e.waitUntil(
        Promise.all([
            // Clean up old caches
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            console.log('Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            }),
            // Take control of all pages immediately
            clients.claim()
        ])
    );
});