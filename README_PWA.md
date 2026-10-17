# PWA integration

These files were added to make the project progressive web app (PWA) ready.

Add the following to your site's <head> (index.html):

```html
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#0d47a1">
<link rel="icon" href="/icons/icon-192.png">
```

And before </body> add service worker registration:

```html
<script>
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('ServiceWorker registered:', reg.scope))
      .catch(err => console.log('ServiceWorker registration failed:', err));
  });
}
</script>
```

Testing locally:

- python -m http.server 8000
- open http://localhost:8000 and check DevTools → Application → Manifest and Service Workers

If you want branded icons, upload them to /icons/icon-192.png and /icons/icon-512.png and I will update the manifest to point at those files instead of embedded data URIs.
