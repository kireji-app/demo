<? if ($uri == 'server.js') {
 header("content-type:text/javascript");
 include 'server.js';
 exit;
} ?>
<!DOCTYPE html>
<meta name=robots content=noindex>
<style>
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