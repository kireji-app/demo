<!DOCTYPE html
><link rel=manifest
><meta name=robots content=noindex
><meta name=viewport content="width=device-width,initial-scale=1"
><meta name=copyright content="&copy; 2024 Eric Augustinowicz"
><script defer src="https://<?=$_SERVER['HTTP_HOST']."/".($_SERVER['REMOTE_ADDR']==='173.168.55.24'?'dev.':'')?>server.js"
></script><style>
 :root, body {
  height: 100%;
  display: grid;
  margin: 0;
 }
 #debug {
  position: fixed;
  left: 8px;
  top: 8px;
  opacity: 25%;
  background-color: #0007;
  color: green;
  transition: all ease-in-out 0.25s;
 }
 #debug, #stats, #fuzzbtn {
  padding: 5px;
  border-radius: 8px;
  margin: 0;
 }
 #stats {
  height: 0;
  width: 0;
  overflow: hidden;
  overflow-y: scroll;
  transition: all ease-in-out 0.3s;
  background: black;
  margin-top: 0px;
  padding: 0;
 }
 #debug:hover #stats {
  display: block;
  width: 256px;
  height: 256px;
  margin-top: 5px;
 }
 #debug:hover {
  opacity: 100%;
 }
 #fuzzbtn {
  cursor: pointer;
  display: block;
  width: 32px;
  height: 32px;
  background: black;
  color: white;
  border: none;
 }
 #fuzzbtn:hover {
  background: #47b;
 }
</style><!-- REMOTE INDEX -->