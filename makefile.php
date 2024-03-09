<?
if ($uri != '') {
 $mime = match ($uri) {
  default => 'image/png',
  'font.woff2' => 'font/woff2',
  'serviceWorker.js' => 'application/javascript',
  'manifest.json' => 'application/json'
 };
 header("content-type:$mime");
 match ($uri) {
  default => readfile('icon.png'),
  'serviceWorker.js' => print(<<<JS
    self.addEventListener('fetch', function(event) {
     event.respondWith(async function() {
      try {
       var res = await fetch(event.request);
       var cache = await caches.open('cache');
       cache.put(event.request.url, res.clone());
       return res;
      } catch (error) {
       return caches.match(event.request);
      }
     }());
    });
    JS),
  'font.woff2' => readfile('open_sans.woff2'),
  'manifest.json' => print(<<<JSON
  {
   "short_name": "Kireji Editor",
   "description": "Standalone viewer and editor. Alpha release. Do not use this app.",
   "display": "standalone",
   "background_color": "#e1e6e9",
   "theme_color": "#e1e6e9",
   "display_override": ["window-controls-overlay"],
   "icons": [{
    "src": "apple-touch-icon.png",
    "type": "image/png",
    "sizes": "144x144",
    "purpose": "any"
   }],
   "start_url": "/",
   "scope": "/"
  }
  JSON),
 };
} else {
 include 'bootstrap.php';
}
