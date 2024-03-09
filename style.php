<style>
 :root, body {
  height: 100%;
 }
 :root {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  background-color: #e1e6e9;
  padding: 6px;
  box-sizing: border-box;
 }
 body {
  overflow: hidden;
  display: flex;
  margin: 0;
  flex-flow: row-reverse nowrap;
  width: fit-content;
  max-width: 100%;
  gap: 12px;
  box-sizing: border-box;
 }
 body > * {
  border-radius: 4px;
 }
 menu, section {
  display: flex;
  flex-flow: column nowrap;
  width: 20vw;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  background: #e9f3f7;
  overflow: hidden;
  position: relative;
 }
 .code, .state {
  max-width: 100%;
  white-space: normal;
  overflow: hidden;
  word-break: break-all;
 }
 menu>.tab {
  text-align: left;
  border: none;
  background: transparent;
  border-radius: 4px;
  font-size: 110%;
  cursor: pointer;
  padding: 4px 4px 4px 8px;
  box-sizing: border-box;
  margin-left: 8px;
  margin-right: 8px;
 }
 body>.tab::before,
 menu>h1,
 section>h1 {
  content: attr(name);
  font-size: 110%;
  font-weight: 500;
  background: white;
  width: 100%;
  padding: 6px 6px 6px 12px;
  box-sizing: border-box;
  width: 100%;
  display: block;
  margin: 0;
  position: sticky;
  top: 0;
 }
 menu>.tab[open] {
  background: #abe;
 }
 menu>.tab:hover {
  background: #bdf;
 }
 body>.tab,
 section>.tab {
  position: relative;
  display: none;
  width: fit-content;
  align-self: start;
  flex: 1;
  box-sizing: border-box;
  background: #e9f3f7;
  overflow: hidden;
  overflow-y: scroll;
  height: 100%;
 }
 .tab>canvas {
  display: block;
  cursor: none;
  width: 60vw;
  flex-direction: column;
  image-rendering: pixelated;
 }
 .tab>output {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
 }
 .tab[open] {
  display: block;
 }
</style>