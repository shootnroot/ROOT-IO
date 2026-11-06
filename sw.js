/* The Troubleshooter: offline support. Bump VERSION (or upload any changed file) to roll out an update. */
const VERSION='tts-34598cb3a5';
const CORE=[
 "./",
 "the-troubleshooter/fonts/barlow-semi-condensed-latin-500-normal.woff2",
 "the-troubleshooter/fonts/barlow-semi-condensed-latin-600-normal.woff2",
 "the-troubleshooter/fonts/barlow-semi-condensed-latin-700-normal.woff2",
 "the-troubleshooter/fonts/ibm-plex-mono-latin-400-normal.woff2",
 "the-troubleshooter/fonts/ibm-plex-mono-latin-500-normal.woff2",
 "the-troubleshooter/fonts/ibm-plex-sans-latin-400-normal.woff2",
 "the-troubleshooter/fonts/ibm-plex-sans-latin-500-normal.woff2",
 "the-troubleshooter/fonts/ibm-plex-sans-latin-600-normal.woff2",
 "the-troubleshooter/icons/apple-touch-icon.png",
 "the-troubleshooter/icons/favicon-32.png",
 "the-troubleshooter/icons/icon-192.png",
 "the-troubleshooter/icons/icon-512.png",
 "the-troubleshooter/icons/maskable-512.png",
 "index.html",
 "the-troubleshooter/lib/OrbitControls.js",
 "the-troubleshooter/lib/pdfjs/pdf.min.js",
 "the-troubleshooter/lib/pdfjs/pdf.worker.min.js",
 "the-troubleshooter/lib/three.min.js",
 "the-troubleshooter/lib/xlsx.full.min.js",
 "the-troubleshooter/manifest.webmanifest"
];
const FRESH=/(^|\/)(index\.html|profile\.json)?$/; // page and machine data: network first, so updates arrive
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
