/* ROOT /IO: offline support. Bump the version suffix whenever core assets change. */
const CACHE_PREFIX='rootio-'+self.registration.scope+'-';
const VERSION=CACHE_PREFIX+'model-v2';
const CORE=[
 "./",
 "OrbitControls.js",
 "machine-model.js",
 "machines.json",
 "profile.json",
 "haas-umc750-profile.json",
 "fanuc-lrmate200id-profile.json",
 "mep806b-60kw-tqg-profile.json",
 "toyota-camry-25-profile.json",
 "honda-hrn216-profile.json",
 "samsung-rf28r7351sr-profile.json",
 "uss-missouri-bb63-profile.json",
 "p51d-mustang-profile.json",
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
 "demo-config.js",
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
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith(CACHE_PREFIX)&&k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
const cached=req=>caches.open(VERSION).then(c=>c.match(req));
self.addEventListener('fetch',e=>{
  const req=e.request; if(req.method!=='GET') return; const url=new URL(req.url); if(url.origin!==location.origin) return;
  const path=url.pathname.slice(self.registration.scope.replace(location.origin,'').length);
  if(req.mode==='navigate'||FRESH.test(path)){
    e.respondWith(fetch(req,{cache:'no-cache'}).then(async r=>{if(r.ok){try{const c=await caches.open(VERSION);await c.put(req.mode==='navigate'?'./':req,r.clone());}catch(err){}} return r;})
      .catch(()=>cached(req.mode==='navigate'?'./':req).then(m=>m||(req.mode==='navigate'?cached('index.html'):new Response('',{status:404})))));
    return;
  }
  e.respondWith(cached(req).then(m=>m||fetch(req).then(async r=>{if(r.ok){try{const c=await caches.open(VERSION);await c.put(req,r.clone());}catch(err){}} return r;})));
});
