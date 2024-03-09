<? function package_all($uri, $mime, $encode = false)
{
 $value = file_get_contents("client/$uri");
 $key = $encode ? "base64" : "body";
 $value = $encode ? json_encode(base64_encode($value)) : json_encode($value);
 return "\"$uri\":{\"$key\":$value,\"options\":{\"headers\":{\"content-type\":\"$mime\"}}}";
}

$files = join(',', array_map(fn ($a) => package_all(...$a), [
 ['meta.json', 'application/json'],
 ['manifest.json', 'application/json'],

 ['script.js', 'text/javascript'],

 ['icon.png', 'image/png', true],
 ['ball.png', 'image/png', true],
 ['light-ball.png', 'image/png', true],
 ['blue-grid.png', 'image/png', true],
 ['white-grid.png', 'image/png', true],

 ['font.woff2', 'font/woff2', true],

 ['style.css', 'text/css'],
 ['window.css', 'text/css'],
 ['shelfbtn.css', 'text/css'],
 ['global.css', 'text/css'],
 ['test.css', 'text/css'],
 ['part.css', 'text/css'],
 ['portfolio.css', 'text/css'],
 ['corner-menu.css', 'text/css'],

 ['index.html', 'text/html'],
 ['tasks.html', 'text/html'],

 ['editor.h', 'text/plain'],
]));

echo '{' . $files . '}';
