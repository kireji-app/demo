<? // 7.69 %
const MODULES = [
 'header',
 'utils',
 'matrix.temp',
 'pascal',
 'shape',
 'primatives',
 'debug',
 'core'
];

foreach (MODULES as $filename) {
 include $filename . '.php';
}
?><script>
 Core.initialize().then(_ => {
  new Core({});
 })
</script>