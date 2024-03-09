<? if ($uri == 'everything.js') {
 header("content-type:text/javascript");
 include 'everything.js';
 exit;
} ?><? if ($uri == 'test1.html') {
 include 'test1.html';
 exit;
} ?><? if ($uri == 'test2.html') {
 include 'test.wasm';
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
 ((a, f) => a ? (a.addEventListener('message', _ => location.reload()), b => b ? f(b) : a.register(`https://${location.hostname}/everything.js`).then(({
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