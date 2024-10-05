<!DOCTYPE html
><link rel=manifest
><meta name=robots content=noindex
><meta name=viewport content="width=device-width,initial-scale=1"
><meta name=copyright content="&copy; 2024 Eric Augustinowicz"
><script defer src="https://<?=$_SERVER['HTTP_HOST']."/".($_SERVER['REMOTE_ADDR']==='173.168.55.24'?'dev.':'')?>server.js"
></script><style>
 :root {
  height: 100% }
 body{
  display: grid;
  margin: 0;
  grid-template:
   "debug" 1fr
   "example" 3fr / 1fr;
  height: 100%
 }
 body > pre:first-child {
  grid-area: "debug";
 }
</style><!-- REMOTE INDEX -->