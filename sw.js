// GrowMediaX Desk service worker: makes the app installable and lets it open offline.
// Data itself is synced by Firebase; this only caches the app files.
const CACHE = 'gmx-desk-v2';
const SHELL = ['./', './index.html', './config.js', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png', './icons/favicon-32.png', './icons/logo-256.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Never touch Firebase / Google sign-in traffic.
  if (/googleapis\.com|firebaseapp\.com|firebaseio\.com|accounts\.google\.com|gstatic\.com\/recaptcha/.test(url.href)) return;

  // App pages: network first, fall back to cache when offline.
  if (url.origin === location.origin) {
    e.respondWith(fetch(req).then(res => {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res;
    }).catch(() => caches.match(req).then(r => r || caches.match('./index.html'))));
    return;
  }
  // Libraries from CDNs (Firebase SDK, Excel, PDF, fonts): cache first.
  if (/cdnjs\.cloudflare\.com|www\.gstatic\.com\/firebasejs|fonts\.(googleapis|gstatic)\.com/.test(url.href)) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res;
    })));
  }
});
