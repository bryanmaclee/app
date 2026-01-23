const CACHE_NAME = "my-app-cache-v1";
const urlsToCache = ["../public/index.html"];

// Install event: cache core assets
self.addEventListener("install", (event) => {
   event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
         console.log("Opened cache");
         return cache.addAll(urlsToCache);
      }),
   );
});

// Fetch event: serve assets from cache if available, otherwise fetch from network
self.addEventListener("fetch", (event) => {
   event.respondWith(
      caches.match(event.request).then((response) => {
         // If the asset is in the cache, return it
         if (response) {
            return response;
         }
         // Otherwise, fetch it from the network
         return fetch(event.request);
      }),
   );
});

// Activate event: clean up old caches (optional, but recommended)
self.addEventListener("activate", (event) => {
   const cacheWhitelist = [CACHE_NAME];
   event.waitUntil(
      caches.keys().then((cacheNames) => {
         return Promise.all(
            cacheNames.map((cacheName) => {
               if (cacheWhitelist.indexOf(cacheName) === -1) {
                  return caches.delete(cacheName);
               }
            }),
         );
      }),
   );
});
