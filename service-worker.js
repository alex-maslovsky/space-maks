const CACHE_VERSION = 'v1';

self.addEventListener('install', async event => {
    console.log('The service worker is being installed.');

    const caches = await caches.open(CACHE_VERSION);
    event.waitUntil(caches.addAll());
});

self.addEventListener('fetch', (event) => {
    console.log('The service worker is serving the asset.');

    event.respondWith(fromCache(event.request));

    event.waitUntil(update(event.request));
});

async function fromCache(request) {
    const cache = await caches.open(CACHE_VERSION);
    const matching = await cache.match(request);

    console.log('Taking from cache');

    return matching || Promise.reject('no-match');
}

async function update(request) {
    const cache = await caches.open(CACHE_VERSION);
    const response = await fetch(request);

    console.log('Cache updated');

    return cache.put(request, response);
}
