<?
$outliner = [
 'host' => $host = $_SERVER['HTTP_HOST'],
 'public' => $public = $_SERVER['REMOTE_ADDR'] != '35.138.226.122',
 'group1' => [
  'source' => $source = $public ? 'public' : 'private'
 ],
 'uri' => $uri = ltrim($_SERVER['REQUEST_URI'],'/'),
];
include $source.'.php';