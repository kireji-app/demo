<? if ($uri == 'server.js') {
 header("content-type:text/javascript");
 include 'server.js';
 exit;
} ?>
<!DOCTYPE html>
<meta name=robots content=noindex>
<link rel="preload" href="https://fonts.gstatic.com/s/vt323/v17/pxiKyp0ihIEF2isfFJXUdVNF.woff2" as="font" type="font/woff" crossorigin>
<style>
 @font-face {
  font-family: 'bootstrap';
  src: url(https://fonts.gstatic.com/s/vt323/v17/pxiKyp0ihIEF2isfFJXUdVNF.woff2) format('woff2');
 }

 body {
  background: rgb(28, 32, 38);
  color: white;
  font-family: 'bootstrap', monospace;
  white-space: pre;
 }
</style>
<script>
 ((a, f) => a ? (a.addEventListener('message', _ => location.reload()), b => b ? f(b) : a.register(`https://${location.hostname}/server.js`).then(({
  waiting: x,
  installing: y,
  active: z
 }) => {
  (x || y)?.addEventListener('statechange', ({
   target: t
  }) => t.state === 'activated' ? f(t) : null);
  f(z)
 }))(a.controller) : console.error('!sw'))(navigator.serviceWorker, () => location.reload?.())
</script>
$ > core.parts
$ > installing...