/* ROOT /IO: offline support. Bump VERSION (or upload any changed file) to roll out an update. */
const VERSION='rootio-header-v2';
const CORE=[
 "./",
 "OrbitControls.js",
 "apple-touch-icon.png",
 "barlow-semi-condensed-latin-500-normal.woff2",
 "barlow-semi-condensed-latin-600-normal.woff2",
 "barlow-semi-condensed-latin-700-normal.woff2",
 "favicon-32.png",
 "ibm-plex-mono-latin-400-normal.woff2",
 "ibm-plex-mono-latin-500-normal.woff2",
 "ibm-plex-sans-latin-400-normal.woff2",
 "ibm-plex-sans-latin-500-normal.woff2",
 "ibm-plex-sans-latin-600-normal.woff2",
 "icon-192.png",
 "icon-512.png",
 "index.html",
 "rootio-header.png",
 "manifest.webmanifest",
 "maskable-512.png",
 "pdf.min.js",
 "pdf.worker.min.js",
 "three.min.js",
 "xlsx.full.min.js"
];
const FRESH=/(^|\/)(index\.html|[^\/]+\.json)?$/; // page, machines.json and machine profiles: network first, so updates arrive
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const req=e.request; if(req.method!=='GET') return; const url=new URL(req.url); if(url.origin!==location.origin) return;
  const path=url.pathname.slice(self.registration.scope.replace(location.origin,'').length);
  if(req.mode==='navigate'||FRESH.test(path)){
    e.respondWith(fetch(req,{cache:'no-cache'}).then(r=>{if(r.ok){const cp=r.clone(); caches.open(VERSION).then(c=>c.put(req.mode==='navigate'?'./':req,cp));} return r;})
      .catch(()=>caches.match(req.mode==='navigate'?'./':req).then(m=>m||(req.mode==='navigate'?caches.match('index.html'):new Response('',{status:404})))));
    return;
  }
  e.respondWith(caches.match(req).then(m=>m||fetch(req).then(r=>{if(r.ok){const cp=r.clone(); caches.open(VERSION).then(c=>c.put(req,cp));} return r;})));
});
