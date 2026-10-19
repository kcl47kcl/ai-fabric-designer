/* AI Fabric Designer — offline-first service worker.
   Network-first for the app page (so new versions arrive when online), cache fallback offline. */
const CACHE="aifd-v53";
const ASSETS=["./","index.html","manifest.webmanifest","icon-180.png","icon-192.png","icon-512.png","icon-512-maskable.png","logo.svg"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=="GET"||u.origin!==location.origin) return;
  e.respondWith(fetch(e.request).then(r=>{const cp=r.clone(); caches.open(CACHE).then(c=>c.put(e.request,cp)); return r;})
    .catch(()=>caches.match(e.request).then(m=>m||caches.match("index.html"))));
});
