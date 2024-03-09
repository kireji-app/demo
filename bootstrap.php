<? // 7.69 %
const MODULES = [
 'header',
 'utils',
 'matrix.temp',
 'pascal',
 'shape',
 'primatives',
 'debug',
 'type',
 'struct',
 'woff2',
 'font',
 'core'
];

foreach (MODULES as $filename) {
 include $filename . '.php';
}
?><script>
 Core.initialize()
</script>