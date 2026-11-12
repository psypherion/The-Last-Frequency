/* The Last Frequency · offline cache. Version changes whenever index.html changes. */
const V='tlf-97e01bbe08',CORE=['./','index.html','logo.webp','icon-192.png','manifest.webmanifest'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n.startsWith('tlf-')&&n!==V).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||r.headers.has('range'))return;const u=new URL(r.url);if(u.origin!==location.origin)return;
  if(u.pathname.endsWith('yt-config.json'))return;
  const put=res=>{if(res&&res.ok&&res.type==='basic'){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res};
  if(r.mode==='navigate'){e.respondWith(caches.match('index.html').then(m=>m||fetch(r).then(put)));return}
  e.respondWith(caches.match(r).then(m=>{const net=fetch(r).then(put).catch(()=>m);return m||net}))});
