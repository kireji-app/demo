<?
if ($uri == '.js') {
 header("content-type:text/javascript");
 include 'serviceWorker.php';
 exit;
} else if ($uri == '.json') {
 header("content-type:application/json");
 include 'database.php';
 exit;
}
?>
<!DOCTYPE html>
<title>Loading...</title>
<style>
 :root {
  --vellum-white: #EBE4CD;
  --prussian-blue: #19517f;
  background: var(--prussian-blue);
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  color: var(--vellum-white);
 }
</style>
<script>
 if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('.js').then(reg => {
   if (reg.waiting || reg.installing) {
    (reg.waiting || reg.installing).addEventListener('statechange', event => {
     if (event.target.state === 'activated') location.reload();
    });
   } else if (reg.active) {
    location.reload();
   }
  });
 }
</script>
<p>Server-provided loading-page.</p>