/* AI Fabric Designer — offline-first service worker.
   App page is always revalidated against GitHub (bypasses the 10-min HTTP cache) when online;
   cached copy is used only when offline. */
const CACHE="aifd-v92";
const ASSETS=["./","index.html","manifest.webmanifest","icon-180.png","icon-192.png","icon-512.png","icon-512-maskable.png","logo.svg"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS.map(u=>new Request(u,{cache:"reload"})))).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=="GET"||u.origin!==location.origin) return;
  const fresh=e.request.mode==="navigate"?new Request(e.request.url,{cache:"no-store",credentials:"same-origin"}):e.request;
  e.respondWith(fetch(fresh).then(r=>{const cp=r.clone(); caches.open(CACHE).then(c=>c.put(e.request,cp)); return r;})
    .catch(()=>caches.match(e.request).then(m=>m||caches.match("index.html"))));
});
