<style>
 @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');
</style>
<style>
 @media screen and (display-mode: window-controls-overlay) {
  body>.tab::before {
   content: attr(name);
   display: flex;
   font-size: 140%;
   line-height: var(--toolbar-height);
   font-weight: 900;
   padding-left: 14px;
   position: fixed;
   height: var(--toolbar-height);
   width: var(--toolbar-width);
   left: var(--toolbar-start);
   top: env(titlebar-area-y, 0);
   box-sizing: border-box;
  }

  body::before {
   content: '';
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   height: var(--toolbar-height);
   -webkit-app-region: drag;
   /* app-region: drag; commented out to stop yellow in vscode, but still valid line */
  }

  body {
   --toolbar-height: calc(env(titlebar-area-height, 33px) + 14px);
   --toolbar-end: min(80vw, calc(env(titlebar-area-x, 0) + env(titlebar-area-width, 100vw)));
   --toolbar-width: calc(var(--toolbar-end) - var(--toolbar-start));
   --toolbar-start: max(20vw, env(titlebar-area-x, 20vw));
   padding-top: var(--toolbar-height) !important;
  }
 }

 @media screen and (min-width: 600px) and (display-mode: window-controls-overlay) {
  body>.tab {
   flex: 0 0 var(--toolbar-width);
  }

  menu {
   width: var(--toolbar-start) !important;
  }

  section {
   width: calc(100vw - var(--toolbar-end)) !important;
  }
 }

 @media screen and (max-width: 600px) {

  menu,
  section {
   display: none !important;
  }

  body>.tab {
   width: 100vw !important;
   border: none !important;
  }

  body>.tab::before {
   width: 100% !important;
   left: 0 !important;
   border: none !important;
   padding-left: var(--toolbar-start);
   background-color: transparent;
  }
 }


 :root,
 body {
  height: 100%;
 }

 body,
 ::before,
 ::after,
 button {
  font-family: 'Open Sans', sans-serif;
 }

 body>.tab,
 body>.tab::before {
  background: linear-gradient(to right, white, transparent);
 }

 :root {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  background-color: #e1e6e9;
  box-sizing: border-box;
 }

 body {
  overflow: hidden;
  display: flex;
  margin: 0;
  flex-flow: row-reverse nowrap;
  width: fit-content;
  max-width: 100%;
  box-sizing: border-box;
 }

 menu,
 section {
  display: flex;
  flex-flow: column nowrap;
  width: 20vw;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: relative;
 }

 .code,
 .state {
  max-width: 100%;
  white-space: normal;
  overflow: hidden;
  word-break: break-all;
 }

 menu>.tab {
  text-align: left;
  border: none;
  background: none;
  border-radius: 4px;
  font-size: 110%;
  cursor: pointer;
  padding: 4px 4px 4px 8px;
  box-sizing: border-box;
  margin-left: 8px;
  margin-right: 8px;
 }

 menu>h1,
 section>h1 {
  font-size: 110%;
  font-weight: 500;
  height: 34px;
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
  width: 60vw;
  box-sizing: border-box;
  overflow: hidden;
  overflow-y: scroll;
  height: 100%;
 }

 .tab>canvas {
  display: block;
  cursor: none;
  flex-direction: column;
  image-rendering: pixelated;
 }

 .tab>canvas.pixelRatio {
  width: 100%;
  height: 100%;
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