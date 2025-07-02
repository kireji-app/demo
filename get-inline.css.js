return `*,
*::before,
*::after {
 box-sizing: border-box;
 -webkit-user-select: none;
 -ms-user-select: none;
 user-select: none;
}

html:has(body[inert]) {
 cursor: wait;
}

a,
a:visited {
 text-decoration: none;
 color: inherit;
}

#theme-control {
 display: contents;
}

html,
body {
 --system-ui: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
 --system-ui-mono: ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Mono", "Source Code Pro", "Fira Mono", "Droid Sans Mono", "Consolas", "Courier New", monospace;
 --menu-tween: 0;
 --h: 100vh;
 overscroll-behavior: none !important;
 margin: 0;
 height: var(--h);
 font-synthesis: weight style;
 --sidebar-width: 256px;
 color: var(--fg);
 background: var(--bg);
}

img {
 fill: var(--fg);
}

img[src="${part.render({ request: "blank.png", format: "datauri" })}"],
img[src="${part.render({ request: "blank.gif", format: "datauri" })}"] {
 background: magenta;
}

wallpaper- {
 position: fixed;
 top: 0;
 bottom: var(--task-bar-height);
 left: 0;
 right: 0;
 overflow: hidden;
}

debug- {
 --u: calc(var(--spacing) / 4);
 top: 0;
 color: white;
 right: 0;
 margin: var(--spacing);
 opacity: 50%;
 padding: var(--spacing);
 position: fixed;
 text-align: right;
 font-family: var(--system-ui-mono);
 white-space: pre;
 border-radius: var(--u);
 mix-blend-mode: multiply;
 pointer-events: none;
 background-color: black;
 gap: var(--u);
 display: flex;
 flex-flow: column;
}

debug->div {
 font-weight: 700;
 display: flex;
 justify-content: space-between;
 gap: var(--u);
 width: 250px;
}

debug- select {
 margin: 0;
 font-weight: 700;
 padding: 0;
 background: white;
 border: none;
 outline: none;
 border-radius: var(--u);
 width: 150px;
}

debug- select>option {
 color: black;
 padding: var(--u);
 font-weight: 700;
 margin: 0;
}

@supports (height: 100dvh) {

 html,
 body {
  --h: 100dvh;
 }
}

task-menu {
 position: fixed;
 top: 0;
 bottom: 0;
 left: 0;
 right: 0;
 margin: 0;
 padding: 0;
 outline: none;
}

button,
menu-button {
 background: transparent;
 padding: 0;
 margin: 0;
 border: none;
 color: inherit;
}

task-bar>menu-button {
 position: absolute;
 left: var(--spacing);
 bottom: var(--spacing);
}

sidebar- {
 margin: 0;
 position: fixed;
 overflow: hidden;
 display: flex;
 flex-flow: column;
}

#settings {
 display: flex;
 flex-flow: column;
}

#settings>span {
 display: flex;
 justify-content: space-between;
 padding: 4px;
 gap: 4px;
}

.task-link {
 display: contents;
}

.task-link>a,
.task-link>a:visited {
 display: flex;
 flex: 0;
 font-weight: 500;
 margin: 0;
 position: relative;
 align-items: center;
}

.task-link>a>.label {
 flex: 1 1;
}

.part-icon {
 height: var(--icon-size);
 width: var(--icon-size);
 border-radius: calc(var(--icon-size) * 0.2);
}

#logo {
 font-weight: 700;
}

task-bar {
 position: fixed;
 bottom: 0;
 left: 0;
 right: 0;
 height: var(--task-bar-height);
 margin: 0;
 line-height: var(--task-bar-height);
 display: flex;
}

task-bar>.btn {
 width: var(--icon-size);
}

task-bar>.btn:hover {
 color: var(--fg-accent);
}

button:hover,
menu-button:hover {
 color: var(--fg-accent);
}

#nested button {
 font-size: 100px;
}

flex-spacer {
 flex: 1;
}

#nested {
 line-height: var(--icon-size);
 padding: 0;
 display: flex;
 height: var(--icon-size);
 gap: 6px;
}

@media (width < 500px) {
 #nested {
  position: fixed;
  bottom: var(--task-bar-height);
  left: 0;
  right: 0;
  width: 100vw;
  box-shadow: var(--task-bar-accent);
 }
}`