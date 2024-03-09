<?
$directory = array_splice(scandir('client'), 2);
array_push($directory, 'directory.json', 'client.json');
$package = function ($uri) use ($directory,$user) {
 $ext = end(explode('.', $uri));
 $mime = ($ext === 'woff2' ? 'font/woff2' : ($ext === 'css' ? 'text/css' : ($ext === 'json' ? 'application/json' : mime_content_type('client/' . $uri))));
 $encode = $mime === 'image/png' || $mime === 'font/woff2';
 $value = $uri === 'directory.json' ? json_encode($directory) : ($uri === 'client.json' ? json_encode(['ip'=>$user,'version'=>VERSION]) : file_get_contents("client/$uri"));
 $key = $encode ? "base64" : "body";
 $value = $encode ? json_encode(base64_encode($value)) : json_encode($value);
 return "\"$uri\":{\"$key\":$value,\"options\":{\"headers\":{\"content-type\":\"$mime\"}}}";
};
$files = join(',', array_map($package, $directory));
echo '{' . $files . '}';
