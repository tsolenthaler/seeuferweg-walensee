/**
 * Service Worker for Seeuferweg Walensee PWA
 * Provides offline functionality and caching
 */

const CACHE_NAME = 'seeuferweg-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/standorte.html',
    '/highlights.html',
    '/erlebnisse.html',
    '/fotopoints.html',
    '/favoriten.html',
    '/app.css',
    '/seeuferweg.css',
    '/js/app.js',
    '/js/data-processor.js',
    '/js/favorites.js',
    '/js/standorte.js',
    '/manifest.json',
    '/logo-seeuferweg-orange.svg',
    '/heidiland.json',
    '/glarnerland.json',
    '/rapperswil.json'
];

// Install event - cache assets
self.addEventListener('install', event => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Caching files');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => self.skipWaiting())
            .catch(error => {
                console.error('Service Worker: Cache failed', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cache => {
                        if (cache !== CACHE_NAME) {
                            console.log('Service Worker: Clearing old cache');
                            return caches.delete(cache);
                        }
                    })
                );
            })
            .then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    // Skip cross-origin requests
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }
    
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                // Return cached version or fetch from network
                if (cachedResponse) {
                    console.log('Service Worker: Serving from cache', event.request.url);
                    return cachedResponse;
                }
                
                return fetch(event.request)
                    .then(response => {
                        // Don't cache if not successful
                        if (!response || response.status !== 200 || response.type === 'error') {
                            return response;
                        }
                        
                        // Clone the response
                        const responseToCache = response.clone();
                        
                        // Cache the new resource
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    })
                    .catch(error => {
                        console.error('Service Worker: Fetch failed', error);
                        
                        // Return offline page if available
                        return caches.match('/index.html');
                    });
            })
    );
});

// Background sync for favorites
self.addEventListener('sync', event => {
    if (event.tag === 'sync-favorites') {
        event.waitUntil(
            // Sync logic here if needed
            Promise.resolve()
        );
    }
});

// Push notifications (optional)
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'Neue Inhalte verfügbar',
        icon: '/logo-seeuferweg-orange.svg',
        badge: '/logo-seeuferweg-orange.svg',
        vibrate: [200, 100, 200]
    };
    
    event.waitUntil(
        self.registration.showNotification('Seeuferweg Walensee', options)
    );
});
