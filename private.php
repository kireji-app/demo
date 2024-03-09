<?
if ($uri != '') {
 $mime = match ($uri) {
  default => 'image/png',
  'serviceWorker.js' => 'application/javascript',
  'manifest.json' => 'application/json'
 };
 header("content-type:$mime");
 echo match ($uri) {
  default => readfile('icon.png'),
   'serviceWorker.js' => <<<JS
    onfetch=e=>{
     
    }
    JS,
  'manifest.json' =>  <<<JSON
  {
   "short_name": "My Custom App",
   "description": "Welcome to My Custom App!",
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
  JSON,
 };
} else {
 include 'bootstrap.php';
}
