/* HomeFix Pro — Service Worker
   Provides offline caching for core assets (PWA shell) */

const CACHE_NAME = 'homefix-pro-v2';
const STATIC_ASSETS = [
    './',
    './index.html',
    './css/jobie_theme.css',
    './css/mobile.css',
    './css/main.css',
    './css/dashboard_new.css',
    './css/layout.css',
    './js/app.js',
    './js/config.js',
    './js/mock-data.js',
    './js/modules/auth.js',
    './js/modules/marketplace.js',
    './js/modules/dashboard.js',
    './js/modules/chat.js',
    './js/modules/booking.js',
    './js/modules/aiDiagnosis.js',
    './js/modules/technicianProfile.js',
    './js/modules/rating.js',
    './js/modules/quickFixGuide.js',
    './js/modules/admin.js',
    './js/modules/landing.js',
    './js/modules/payment.js',
    './js/services/firebase-config.js',
    './js/services/auth-service.js',
    './js/services/ai-service.js',
    './js/services/chat-service.js',
    './js/services/notification-service.js',
    './js/services/firestore-service.js',
    './js/services/storage-service.js',
    './js/utils/seed-data.js',
    './js/components/toast.js',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

/* ── Install: cache static shell ── */
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('[SW] Pre-caching app shell');
            // Cache each asset individually to prevent one failure blocking all
            return Promise.allSettled(
                STATIC_ASSETS.map(url =>
                    cache.add(url).catch(err =>
                        console.warn('[SW] Failed to cache:', url, err)
                    )
                )
            );
        }).then(() => self.skipWaiting())
    );
});

/* ── Activate: clean old caches ── */
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => {
                        console.log('[SW] Removing old cache:', key);
                        return caches.delete(key);
                    })
            )
        ).then(() => self.clients.claim())
    );
});

/* ── Fetch: network-first for API, cache-first for assets ── */
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    // Skip non-GET, chrome-extension, and analytics
    if (event.request.method !== 'GET') return;
    if (url.protocol === 'chrome-extension:') return;

    // API calls — network only, no caching
    if (
        url.hostname.includes('onrender.com') ||
        url.hostname.includes('generativelanguage.googleapis.com') ||
        url.pathname.startsWith('/api/')
    ) {
        event.respondWith(fetch(event.request));
        return;
    }

    // Firebase — network only
    if (url.hostname.includes('firebaseapp.com') ||
        url.hostname.includes('firestore.googleapis.com')) {
        event.respondWith(fetch(event.request));
        return;
    }

    // Static assets — cache-first with network fallback
    event.respondWith(
        caches.match(event.request).then(cached => {
            if (cached) return cached;

            return fetch(event.request).then(response => {
                // Cache successful responses
                if (response && response.status === 200 && response.type !== 'opaque') {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseClone);
                    });
                }
                return response;
            }).catch(() => {
                // Offline fallback for navigation
                if (event.request.mode === 'navigate') {
                    return caches.match('./index.html');
                }
            });
        })
    );
});
