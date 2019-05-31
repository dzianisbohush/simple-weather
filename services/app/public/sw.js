const filesToCache = ['/', 'index.html'];

const staticCacheName = 'pages-cache-v1';

// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', event => {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(staticCacheName).then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('activate', event => {
  console.log('Activating new service worker...');

  const cacheWhitelist = [staticCacheName];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        // eslint-disable-next-line array-callback-return
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', event => {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches
      .match(event.request)
      .then(responseFromCache => {
        if (responseFromCache) {
          console.log('Found ', event.request.url, ' in cache');
          return responseFromCache;
        }
        console.log('Network request for ', event.request.url);
        return fetch(event.request).then(response => {
          return caches.open(staticCacheName).then(cache => {
            cache.put(event.request.url, response.clone());
            return response;
          });
        });
      })
      .catch(error => {
        console.log('Error, ', error);
      })
  );
});
