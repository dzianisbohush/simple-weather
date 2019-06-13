
## Simple example of app with server-side rendering and code splitting.

For starting locally:
```bash
$ cd services/app/
$ npm install
$ npm start
```

Service Worker included by default in `services/app/src/server/index.js`
```
<script>
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/serviceWorker.js');
        });
    }
</script>
```

