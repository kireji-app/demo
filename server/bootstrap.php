<?
if ($uri == 'de.bug') {
 exit;
} else if ($uri == '.js') {
 header("content-type:text/javascript");
 include 'serviceWorker.php';
 exit;
} else if ($uri == 'apple-touch-icon.png') {
 header("content-type:image/png");
 readfile('client/icon.png');
 exit;
} else if ($uri == '.json') {
 header("content-type:application/json");
 include 'database.php';
 exit;
}
readfile('client/bootstrap.html');
?>
<h2>[Server]</h2>