<!DOCTYPE html>
<meta name="robots" content="noindex">
<link rel="manifest">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
 html,
 body {
  overscroll-behavior-y: contain !important;
  overflow: clip;
  height: 100%;
  margin: 0;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
 }
</style>
<script src="https://<?= $_SERVER['HTTP_HOST'] ?>/<?= ($_SERVER['REMOTE_ADDR'] === '35.138.226.122' && str_starts_with($_SERVER['HTTP_HOST'], 'dev.')) ? 'script' : 'error' ?>.js"></script>