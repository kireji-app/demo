<? $Δ = [
 "https://core.parts/components/button/construct.js" => '
  (url, layout = "", manifest = "", onclickjs = `()=>{ console.trace("button click ${url}") }`) => {
   let parts = ("" + _["https://core.parts/components/button/construct.json"]).replace(/\$1/g, url).replace(/\$2/, layout.replace(/\n/g, "\\\\n").replace(/"/g, \'\\\\"\')).replace(/\$3/, manifest).replace(/"\$4"/, JSON.stringify(""+onclickjs))
   Object.entries(JSON.parse(parts)).forEach(([url, value]) => _[url] = value)
  }',
 "https://core.parts/components/button/construct.json" => '
  {
   "$1layout.css?constructor": "$1layout.css.c.js",
   "$1layout.css.c.js": "{ return `:host { background-color: #c3c3c3;${(``+down) === `1` ? `background-image: linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white), linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white); background-size: 2px 2px; background-position: 0 0, 1px 1px;`:``}; box-sizing: border-box; box-shadow: ${(``+down) === `1` ? `inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a` : `inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb`}} $2` }",
   "$1manifest.uri": "$3",
   "$1onclick.js": "$4",
   "$1?layout": "$1layout.css",
   "$1?manifest": "$1manifest.uri",
   "$1?onclick": "$1onclick.js",
   "$1layout.css?down": "$1down.txt",
   "$1?onpointerdown": "$1onpointerdown.js",
   "$1onpointerdown.js": "e => { e.stopPropagation(); _[\'$1down.txt\'] = \'1\'; _[\'https://core.parts/behaviors/release/src.uri\'] = \'$1release.js\' }","$1release.js":"e => { _[\'$1down.txt\'] = \'0\' }",
   "$1down.txt": "0",
   "$1down.txt?fx": "$1down-fx.uri",
   "$1down-fx.uri": "$1layout.css"
  }',
 "https://core.parts/components/cell/construct.js" => '
  (url, layout, manifest, layout_by_reference = false, manifest_by_reference = false) => {
   if (layout) {
    if (layout_by_reference) _[url + "?layout"] = layout
    else {
     const layout_url = url + "layout.css";
     _[url + "?layout"] = layout_url
     _[layout_url] = layout
    }
   }
   if (manifest) {
    if (manifest_by_reference) _[url + "?manifest"] = manifest
    else {
     const manifest_url = url + "manifest.uri";
     _[url + "?manifest"] = manifest_url
     _[manifest_url] = manifest
    }
   }
  }',
 "https://core.parts/components/click/construct.json" => '
  {
   "$1?onclick": "$1onclick.js",
   "$1onclick.js": "e => _[\'https://core.parts/components/click/handler.js\'](e, \'$2\',\'$3\')"
  }',
 "https://core.parts/components/click/construct.js" => '
  ($1, $2 = "https://core.parts/const/do-nothing.js", $3 = "https://core.parts/const/do-nothing.js") => {
   return _["https://core.parts/components/click/instantiate.js"]("click", $1, $2, $3)
  }',
 "https://core.parts/components/click/handler.js" => '
  (e, $2, $3) => {
   const
    key = "%double_click_timer%",
    waiting = key in globalThis,
    own_url = e.target.url;
   if (waiting) {
    const
     config = globalThis[key],
     clicked_url = config.url;
    // Stop waiting for double click.
    clearTimeout(config.timeout)
    delete globalThis[key]
    if (clicked_url === own_url) {
     // Handle double click.
     return _[$3](e)
    }
   }
   // Wait for double click.
   globalThis[key] = { url: e.target.url, timeout: setTimeout(() => delete globalThis[key], 500) }
   // Handle single click.
   return _[$2](e)
  }',
 "https://core.parts/components/click/instantiate.js" => '
  (template_name, ...$) => Object.assign(Δ, JSON.parse($.reduce(
   (x, $n, n) => x.replace(new RegExp("\\\\$" + (n+1), "g"), $n),
   "" + _[`https://core.parts/components/${template_name}/construct.json`]
  )))',
 "https://core.parts/components/transform/construct.js" => <<<JS
  (transform_url, position_url, directions = "nesw", move_handle_url) => {
   if (!/^n?e?s?w?$/.test(directions)) throw new TypeError(`transform component requires format /^n?e?s?w?$/ (got \${directions})`)
   const
    manifest = [],
    core_url = transform_url + "core/",
    behavior_url = "https://core.parts/behaviors/resize/",
    resize_cell = dir => {
     const
      dir_url = transform_url + dir + "/",
      dir_base = `\${behavior_url}\${dir}.`;
     _[dir_url + "?layout"] = dir_base + "css"
     _[dir_url + "?onpointerdown"] = dir_url + "onpointerdown.js"
     _[dir_url + "onpointerdown.js?core"] = core_url + "onpointerdown.js"
     _[dir_url + "onpointerdown.js?mode"] = dir_base + "txt"
     manifest.push(dir_url)
    };
   _[core_url + "onpointerdown.js?core"] = behavior_url + "onpointerdown.js"
   _[core_url + "onpointerdown.js?position"] = position_url
   if (directions.includes("n")) {
    resize_cell("top-")
    if (directions.includes("e")) resize_cell("top-right")
    if (directions.includes("w")) resize_cell("top-left")
   }
   if (directions.includes("s")) {
    resize_cell("bottom-")
    if (directions.includes("e")) resize_cell("bottom-right")
    if (directions.includes("w")) resize_cell("bottom-left")
   }
   if (directions.includes("e")) resize_cell("right-")
   if (directions.includes("w")) resize_cell("left-")
   if (move_handle_url) {
    _[move_handle_url + "?onpointerdown"] = move_handle_url + "onpointerdown.js"
    _[move_handle_url + "onpointerdown.js?core"] = core_url + "onpointerdown.js"
    _[move_handle_url + "onpointerdown.js?mode"] = "https://core.parts/behaviors/move.txt"
   }
   return manifest.join(" ")
  }
  JS,
 "https://core.parts/index.php" => '<?
  if ($_SERVER["REQUEST_URI"] === "/core.js") {
   header("content-type:text/javascript");
   echo str_replace("$1", json_encode($Δ, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_LINE_TERMINATORS | JSON_PRETTY_PRINT), $Δ["https://core.parts/bootstrap.js"]);
  } else {
   echo $Δ["https://core.parts/installer.html"];
  }
  ?>',
 "https://core.parts/version.txt" => '0.025',
 "https://core.parts/installer.html" => <<<HTML
  <!DOCTYPE html>
  <meta name=robots content=noindex>
  <style>
   body {
    background: #222334;
    color: white;
    font: bold 11px / 16px monospace;
    white-space: pre;
   }
  </style>
  <script>
   var run = false, splash_delay = 0, onload = () => {
     ((a, f) => a ? (
      b => b ? f(b) : a.register(`https://\${location.hostname}/core.js`).then(
       ({ waiting: x, installing: y, active: z }) => {
        (x || y)?.addEventListener("statechange", ({ target: t }) => t.state === "activated" ? f(t) : null);
        if(z) f(z);
       }
      )
     )(a.controller) : console.error("!sw")
    )(navigator.serviceWorker, controller => {
      if (run) return;
      run = true;
      document.body.innerHTML += "done.<br>Booting..."
      setTimeout(() => location.reload(), splash_delay)
     })
   }
  </script>
  ██╗  ██╗██╗██████╗ ██████╗     ██╗██╗
  ██║ ██╔╝██║██╔══██╗██╔═══╝     ██║██║
  █████╔╝ ██║██████╔╝████╗       ██║██║
  ██╔═██╗ ██║██╔══██╗██╔═╝  ██   ██║██║
  ██║  ██╗██║██║  ██║██████╗╚█████╔╝██║
  ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═════╝ ╚════╝ ╚═╝
  
  Installing...
  HTML,
 "https://core.parts/boilerplate.html" => '',
 "https://core.parts/core.php?constructor" => 'https://core.parts/core.php.c.js',
 "https://core.parts/core.php.c.js" => 'console.warn("need to output core.php. it will need the conversion back from json to php array...", "$Δ = [ $1 ]; eval(\"?>\" . $Δ[\"https://core.parts/index.php\"] . \"<?php \");");',
 "https://core.parts/?core" => 'https://pilot.parts/',
 "https://core.parts/.htaccess" => <<<HTACCESS
  Options -Indexes -MultiViews +FollowSymlinks
  DirectoryIndex core.php
  AddDefaultCharset UTF-8
  ServerSignature Off
  FileETag none
  Header unset ETag
  ErrorDocument 404 /core.php
  RewriteEngine on
  RewriteCond %{REMOTE_ADDR} !^(35\.138\.226\.122|68\.103\.68\.155|97\.76\.210\.20)
  RewriteRule ^ - [L,R=451]
  RewriteCond %{REQUEST_URI} !^/?core.php$
  RewriteRule . core.php
  HTACCESS,
 "https://core.parts/const/zero.txt" => '0',
 "https://core.parts/const/one.txt" => '1',
 "https://core.parts/const/do-nothing.js" => '()=>{}',
 "https://core.parts/img/white-dots.png" => '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',
 "https://core.parts/img/white-grid.png" => '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',
 "https://core.parts/img/blue-grid.png" => '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',
 "https://core.parts/apple-touch-icon.png" => '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',
 "https://core.parts/behaviors/grab/fx.uri" => 'https://core.parts/onpointermove.js https://core.parts/onpointerup.js',
 "https://core.parts/behaviors/grab/src.uri" => '',
 "https://core.parts/behaviors/grab/src.uri?fx" => 'https://core.parts/behaviors/grab/fx.uri',
 "https://core.parts/behaviors/release/fx.uri" => 'https://core.parts/onpointerup.js',
 "https://core.parts/behaviors/release/src.uri" => '',
 "https://core.parts/behaviors/release/src.uri?fx" => 'https://core.parts/behaviors/release/fx.uri',
 "https://core.parts/behaviors/resize/onpointerdown.js?stop_propagation" => 'https://core.parts/const/zero.txt',
 "https://core.parts/behaviors/resize/onpointerdown.js?should_focus" => 'https://core.parts/const/zero.txt',
 "https://core.parts/behaviors/resize/onpointerdown.js?constructor" => 'https://core.parts/behaviors/resize/onpointerdown.c.js',
 "https://core.parts/debug/event.js" => 'e => console.trace(e)',
 "https://core.parts/behaviors/resize/bottom-right.css" => '
  :host {
   position: absolute;
   bottom: -2px;
   right: -2px;
   width: 6px;
   height: 6px;
   cursor: nwse-resize
  }',
 "https://core.parts/behaviors/resize/bottom-.css" => '
  :host {
   position: absolute;
   bottom: -2px;
   left: 4px;
   right: 4px;
   height: 6px;
   cursor: ns-resize
  }',
 "https://core.parts/behaviors/resize/left-.css" => '
  :host {
   position: absolute;
   bottom: 4px;
   left: -2px;
   top: 4px;
   width: 6px;
   cursor: ew-resize
  }',
 "https://core.parts/behaviors/resize/right-.css" => '
  :host {
   position: absolute;
   bottom: 4px;
   right: -2px;
   top: 4px;
   width: 6px;
   cursor: ew-resize
  }',
 "https://core.parts/behaviors/resize/top-left.css" => '
    :host {
     position: absolute;
     top: -2px;
     left: -2px;
     width: 6px;
     height: 6px;
     cursor: nwse-resize
    }',
 "https://core.parts/behaviors/resize/top-.css" => '
  :host {
   position: absolute;
   top: -2px;
   left: 4px;
   right: 4px;
   height: 6px;
   cursor: ns-resize
  }',
 "https://core.parts/behaviors/resize/bottom-left.css" => '
  :host {
   position: absolute;
   bottom: -2px;
   left: -2px;
   width: 6px;
   height: 6px;
   cursor: nesw-resize
  }',
 "https://core.parts/behaviors/resize/top-right.css" => '
  :host {
   position: absolute;
   top: -2px;
   right: -2px;
   width: 6px;
   height: 6px;
   cursor: nesw-resize
  }',
 "https://core.parts/behaviors/resize/onpointerdown.c.js" => '
  const
   input_url = position.headerOf().href,
   transformer_url = "https://core.parts/behaviors/resize/transformer.js",
   output_properties = {
    "move":      "[north_south_pan, east_west_pan]",
    "n-resize":  "north_resize",
    "s-resize":  "south_resize",
    "e-resize":  "east_resize",
    "w-resize":  "west_resize",
    "ne-resize": "[north_resize, east_resize]",
    "se-resize": "[south_resize, east_resize]",
    "nw-resize": "[north_resize, west_resize]",
    "sw-resize": "[south_resize, west_resize]"
   }[mode],
   stop = ("" + stop_propagation) === "1" ? `event.stopPropagation(); event.preventDefault()` : ``,
   focus = ("" + should_focus) === "1" ? `event.target.focus();` : ``;
  if (!output_properties) throw "bad mode: " + mode
  return `event => {
   const
    { clientX: x, clientY: y } = event,
    { x: X = 0, y: Y = 0, w: W = 0, h: H = 0, range = { }, snap = { } } = JSON.parse(_["${input_url}"].toPrimitive()),
    { x: rx = [], y: ry = [], w: rw = [], h: rh = [] } = range,
    { x: sx = 1, y: sy = 1 } = snap,
    [min_x = -Infinity, max_x = Infinity] = rx,
    [min_y = -Infinity, max_y = Infinity] = ry,
    [min_w = -Infinity, max_w = Infinity] = rw,
    [min_h = -Infinity, max_h = Infinity] = rh,
    original_properties = ${"`x: ${X}, y: ${Y}, w: ${W}, h: ${H}, range: { x: [${rx}], y: [${ry}], w: [${rw}], h: [${rh}] }, snap: { x: ${sx} , y: ${sy} }`"},
    north_south_pan = ${"`y: Math.max(${min_y}, ${Y} - ${y} + y)`"},
    east_west_pan = ${"`x: Math.max(${min_x}, ${X} - ${x} + x)`"},
    north_resize = [north_south_pan,${"`h: Math.max(${min_h}, ${H} + (${y} - y))`"}].join(", "),
    south_resize = ${"`h: Math.max(${min_h}, ${H} - (${y} - y))`"},
    east_resize = ${"`w: Math.max(${min_w}, ${W} - (${x} - x))`"},
    west_resize = [east_west_pan, ${"`w: Math.max(${min_w}, ${W} + (${x} - x))`"}].join(", "),
    properties = [original_properties, ${output_properties}].join(", ");
   ${stop}
   ${focus}
   _["${transformer_url}"] = \`({ clientX: x, clientY: y }) => {
    const object = {\${properties}};
    if (!object.x) delete object.x
    if (!object.y) delete object.y
    if (!object.h) delete object.h
    if (!object.w) delete object.w
    if (!object.snap.x) delete object.snap.x
    else {
     if ("x" in object) object.x = Math.round(object.x / object.snap.x) * object.snap.x
     if ("w" in object) object.w = Math.round(object.w / object.snap.x) * object.snap.x
    }
    if (!object.snap.y) delete object.snap.y
    else {
     if ("y" in object) object.y = Math.round(object.y / object.snap.y) * object.snap.y
     if ("h" in object) object.h = Math.round(object.h / object.snap.y) * object.snap.y
    }
    if (!Object.keys(object.snap).length) delete object.snap
    if (!object.range.x.length) delete object.range.x
    if (!object.range.y.length) delete object.range.y
    if (!object.range.w.length) delete object.range.w
    if (!object.range.h.length) delete object.range.h
    if (!Object.keys(object.range).length) delete object.range
    _["${input_url}"] = JSON.stringify(object)
   }\`
   _["https://core.parts/behaviors/grab/src.uri"] = "${transformer_url}";
  }`',
 "https://core.parts/behaviors/grab/position.json" => '{}',
 "https://core.parts/behaviors/move.txt" => "move",
 "https://core.parts/behaviors/resize/bottom-left.txt" => "sw-resize",
 "https://core.parts/behaviors/resize/bottom-right.txt" => "se-resize",
 "https://core.parts/behaviors/resize/bottom-.txt" => "s-resize",
 "https://core.parts/behaviors/resize/left-.txt" => "w-resize",
 "https://core.parts/behaviors/resize/right-.txt" => "e-resize",
 "https://core.parts/behaviors/resize/top-left.txt" => "nw-resize",
 "https://core.parts/behaviors/resize/top-right.txt" => "ne-resize",
 "https://core.parts/behaviors/resize/top-.txt" => "n-resize",
 "https://core.parts/behaviors/resize/top-bottom.txt" => "ns-resize",
 "https://core.parts/behaviors/resize/left-right.txt" => "ew-resize",
 "https://core.parts/behaviors/resize/top-left-bottom-right.txt" => "nwse-resize",
 "https://core.parts/behaviors/resize/top-right-bottom-left.txt" => "nesw-resize",
 "https://core.parts/behaviors/window-close.c.js" => '
  const
   task_url = task.headerOf().href,
   window_url = window.headerOf().href;
  return `
   e => {
    const
     windows_uri = "https://pilot.parts/windows.uri",
     tasks_uri = "https://pilot.parts/tasks.uri",
     windows_string = _[windows_uri].toPrimitive(),
     tasks_string = _[tasks_uri].toPrimitive(),
     windows = windows_string ? windows_string.split(" ") : [],
     tasks = tasks_string ? tasks_string.split(" ") : [],
     own_window = "${window_url}",
     own_task = "${task_url}";
    const window_index = windows.indexOf(own_window);
    const task_index = tasks.indexOf(own_task);
    if (window_index !== -1) windows.splice(window_index, 1)
    if (task_index !== -1) tasks.splice(task_index, 1)
    _[windows_uri] = windows.join(" ")
    _[tasks_uri] = tasks.join(" ")
   }
  `',
 "https://core.parts/behaviors/window-focus.c.js" => '
  const
   active_url = active.headerOf().href,
   window_url = window.headerOf().href;
  return `
   e => {
    _["${active_url}"] = "1";
    const
     windows_uri = "https://pilot.parts/windows.uri",
     windows_string = _[windows_uri].toPrimitive(),
     windows = windows_string ? windows_string.split(" ") : [],
     own_window = "${window_url}";
    if (windows.at(-1) !== own_window) {
     const window_index = windows.indexOf(own_window);
     if (window_index !== -1) windows.splice(window_index, 1)
     windows.push(own_window)
     _[windows_uri] = windows.join(" ")
    }
   }
  `',
 "https://core.parts/client-to-server.js" => <<<JS
  ({ data, source }) => {
   const restart = () => source.postMessage({ restart: 1 })
   if ("restart" in data) registration.unregister().then(restart)
   else if ("save" in data) { Object.assign(Δ, data.save) }
   else throw new RangeError(`unhandled client to server command "\${JSON.stringify(data)}"`)
  }
  JS,
 "https://core.parts/core-part/" => '
  <!DOCTYPE html>
  <script src="https://core.parts/core.js"></script>
   <script>_["https://core.parts/core-part/bootstrap.js"]()</script>
  <meta name="viewport" content="width=device-width, initial-scale=0.8" />
  <style>
   html, body {
    overscroll-behavior-y: contain !important;
    overflow: clip;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 100%;
   }
  </style>',
 "https://core.parts/bootstrap.js" => <<<JS
  var
   causality = {},
   onfetch = (_ = new Proxy({}, new Proxy($1, { get: (Δ, Υ) => eval(Δ[V = "https://core.parts/proxy/alpha.js"]) })))["https://core.parts/file.js"],
   onmessage = _["https://core.parts/client-to-server.js"]
  JS,
 "https://core.parts/core-part/layout.css" => '',
 "https://core.parts/core-part/manifest.uri" => '',
 "https://core.parts/core-part/?apply" => 'https://core.parts/proxy/beta/apply.js',
 "https://core.parts/core-part/?get" => 'https://core.parts/proxy/beta/get.js',
 "https://core.parts/core-part/?getOwnPropertyDescriptor" => 'https://core.parts/proxy/beta/getOwnPropertyDescriptor.js',
 "https://core.parts/core-part/?getPrototypeOf" => 'https://core.parts/proxy/beta/getPrototypeOf.js',
 "https://core.parts/core-part/?has" => 'https://core.parts/proxy/beta/has.js',
 "https://core.parts/core-part/?headerOf" => 'https://core.parts/proxy/beta/headerOf.js',
 "https://core.parts/core-part/?getEmbedTag" => 'https://core.parts/proxy/beta/getEmbedTag.js',
 "https://core.parts/core-part/?isExtensible" => 'https://core.parts/proxy/beta/isExtensible.js',
 "https://core.parts/relative-core/?layout" => 'layout.css',
 "https://core.parts/relative-core/?manifest" => 'manifest.uri',
 "https://core.parts/core-part/?layout" => 'https://core.parts/core-part/layout.css',
 "https://core.parts/core-part/?manifest" => 'https://core.parts/core-part/manifest.uri',
 "https://core.parts/core-part/?ownKeys" => 'https://core.parts/proxy/beta/ownKeys.js',
 "https://core.parts/core-part/?query" => 'https://core.parts/proxy/beta/query.js',
 "https://core.parts/core-part/?rootsOf" => 'https://core.parts/proxy/beta/rootsOf.js',
 "https://core.parts/core-part/?set" => 'https://core.parts/proxy/beta/set.js',
 "https://core.parts/core-part/?toPrimitive" => 'https://core.parts/proxy/beta/toPrimitive.js',
 "https://core.parts/core-part/?toString" => 'https://core.parts/proxy/beta/toString.js',
 "https://core.parts/core-part/?valueOf" => 'https://core.parts/proxy/beta/valueOf.js',
 "https://core.parts/core-part/?core" => 'https://core.parts/core-part/',
 "https://core.parts/core-part/?hash" => 'https://core.parts/core-part/hash.js',
 "https://core.parts/core-part/hash.js" => '(x, y = 0x811c9dc5) => [...x].reduce((y, c) => (y ^= c.charCodeAt(0)) + (y << 1) + (y << 4) + (y << 7) + (y << 8) + (y << 24), y).toString(36)',
 "https://core.parts/core-part/bootstrap.js" => '
  () => {
   navigator.serviceWorker.onmessage = ({ data }) => {
    if ("restart" in data) location.reload()
    else throw new RangeError(`unhandled server to client command "\${JSON.stringify(data)}"`)
   }
   globalThis.nodePool = { }
   const eventKireji = { onclick: 0, oncontextmenu: 0, onpointerdown: 0, onpointerup: 0, onpointermove: 0, ondblclick: 0, onfocus: 0, layout: 1, manifest: 1, ondragstart: -1 };
   Object.defineProperties(HTMLElement.prototype, {
    shadow: {
     get() { if (!this._shadow) this._shadow = this.attachShadow({ mode: "closed" }); return this._shadow }
    },
    layout: {
     get() { if (!this._layout) { this._layout = new CSSStyleSheet(); this.shadow.adoptedStyleSheets.push(this._layout) } return this._layout },
     set(v) { this.layout.replaceSync(v) }
    },
    manifest: {
     get() { return [...this.shadow.children].map(x => x.url).join(" ") },
     set(v) {
      if (v === undefined) throw new TypeError(`manifest called on undefined (${this._url})`)
      if (typeof v !== "string") throw new TypeError(`part manifest must have mime of text/uri-list. Function expected js input "string", but got "${typeof v}." (${this._url})`)
      const C = this.shadow, O = [...C.children].map(x => x.url);
      if (v === "") {
       [...C.children].forEach(x => x.remove())
       return;
      }
      if (O.join(" ") === v) return;
      const N = v.split(" ")
      let o, n, i = -1;
      while (O.length && N.length) {
       i++
       if ((o = O.shift()) !== (n = N.shift())) {
        const u = O.findIndex(x => x === n)
        if (u === -1) this.install(n, i)
        else { C.insertBefore(C.children[i + u + 1], C.children[i]); O.splice(u, 1) }
        if (N.some(x => x === o)) O.unshift(o)
        else C.children[i + 1].remove();
       }
       // if (repair) C.children[i].repair()
      }
      if (O.length) O.forEach(() => C.children[i + 1].remove())
      else if (N.length) N.forEach(x => this.install(x));
     }
    },
    install: {
     get() {
      return (url, index) => {
       if (!url || url === "undefined") throw new TypeError(`install url cannot be ${url === undefined? "undefined" : url === "" ? "an empty string" : `"${url}"`} (installing <${this.tagName}> on ${this._url})`)
       const
        poolNode = (url in nodePool ? [...nodePool[url]].find(x => !x.isConnected && !x.parentNode) : undefined),
        hadPoolNode = !!poolNode,
        node = hadPoolNode ? poolNode : document.createElement(_[url].getEmbedTag());
       if (index === undefined || index >= this.shadow.children.length) this.shadow.appendChild(node); else this.shadow.insertBefore(node, this.shadow.children[index])
       if (node._url !== url) node.url = url
      }
     }
    },
    proxy: {
     get() { if (!this._proxy) this._proxy = _[this.url]; return this._proxy }
    },
    url: {
     get() { if (!this._url) throw new ReferenceError("attempted to get url before it was defined."); return this._url },
     set(v) {
      if (this._url) throw new TypeError(`cannot change HTMLElement\'s url (is ${this._url}, tried to set to ${v})`);
      this._url = v
      if (!(v in nodePool)) nodePool[v] = new Set()
      nodePool[v].add(this)
      const proxy_keys = Object.keys(this.proxy), focus_events = ["onfocus", "onpointerdown", "onclick", "oncontextmenu"];
      if (proxy_keys.some(x => focus_events.includes(x))) this.tabIndex = 0
      for (const kireji in eventKireji) {
       const type = eventKireji[kireji];
       if (type === -1) {
        this[kireji] = e => e.preventDefault()
       } else if (proxy_keys.includes(kireji)) {
       const subproxy = this.proxy[kireji]
       switch(type) {
        case 0:
         this[kireji] = subproxy
         break;
        case 1:
         const primitive = subproxy.toPrimitive()
         this[kireji] = primitive
         const url = subproxy.headerOf().href;
         if (!(url in causality)) causality[url] = {}
         if (!(kireji in causality[url])) causality[url][kireji] = new Set()
         causality[url][kireji].add(this)
         break;
        }
       }
      }
     }
    }
   })
   onload = () => document.body.url = location.href;
  }',
 "https://core.parts/file.js" => '
  event => {
   const
    direct = typeof event === "string",
    url = direct ? event : event.request.url;
   if (url === "https://core.parts/core.js") {
    return event.respondWith(new Response("var causality = {}, onfetch = (_ = new Proxy({}, new Proxy(" + JSON.stringify(Δ) + \', { get: (Δ, Υ) => eval(Δ[V = "https://core.parts/proxy/alpha.js"]) })))["https://core.parts/file.js"], onmessage = _["https://core.parts/client-to-server.js"]\', { headers: { "content-type": "application/json" } }))
   }
   if (url.includes("&")) {
    throw "deprecated"
    if (!url.includes("?")) throw new TypeError(`bad format (ampersand with no query string) ${url}`)
    const [base, query] = url.split("?")
    query.split("&").forEach(subquery => {
     const
      url = base + "?" + subquery,
      proxy = _[url],
      { value, kireji, target } = proxy.headerOf().groups;
     _[target][kireji] = value
    })
    const response = new Response(new Int8Array([1]))
    return direct ? response : event.respondWith(response)
   }
   const proxy = _[url], { binary, type, value, kireji, target } = proxy.headerOf().groups;
   let string = "";
   if (value) {
    throw "deprecated"
    _[target][kireji] = value
    const response = new Response(new Int8Array([1]))
    return direct ? response : event.respondWith(response)
   }
   else {
    string = proxy.toPrimitive()
    if (kireji) {
     console.warn("deprecate this redirect concept?")
     const response = Response.redirect(string, 307);
     return direct ? response : event.respondWith(response)
    }
   }
   var body = new TextEncoder().encode(string);
   if (binary) {
    const B = atob(string), k = B.length, A = new ArrayBuffer(k), I = new Uint8Array(A);
    for (var i = 0; i < k; i++) I[i] = B.charCodeAt(i);
    body = new Blob([I], { type });
   }
   const response = new Response(body, { headers: { "content-type": `${type}${binary ? "" : "; charset=UTF-8"}`, "expires": "Sun, 20 Jul 1969 20:17:00 UTC", "server": "kireji" } })
   return direct ? response : event.respondWith(response);
  }',
 "https://core.parts/flex-spacer/layout.css" => '
  :host {
   flex: 1 1;
  }',
 "https://core.parts/flex-spacer/?layout" => 'https://core.parts/flex-spacer/layout.css',
 "https://core.parts/onpointermove.js?behavior" => 'https://core.parts/behaviors/grab/src.uri',
 "https://core.parts/onpointermove.js?constructor" => 'https://core.parts/onpointermove.c.js',
 "https://core.parts/onpointermove.c.js" => 'return (""+behavior) ? (""+_[behavior]) : "( ) => { }"',
 "https://core.parts/oncontextmenu.js" => 'e => { e.preventDefault(); e.stopPropagation(); }',
 "https://core.parts/onpointerup.js?grab" => 'https://core.parts/behaviors/grab/src.uri',
 "https://core.parts/onpointerup.js?release" => 'https://core.parts/behaviors/release/src.uri',
 "https://core.parts/onpointerup.js?constructor" => 'https://core.parts/onpointerup.c.js',
 "https://core.parts/onpointerup.c.js" => 'return `e => { ${(""+grab) ? `_["${grab.headerOf().href}"] = ""; ` : ""}${(""+release) ? `_["${release}"](e); _["${release.headerOf().href}"] = ""; ` : ""}}`',
 "https://core.parts/proxy/beta/getEmbedTag.js" => '(part = Ψ.part) => part + (part.includes("-") ? "" : "-")',
 "https://core.parts/proxy/alpha.js" => '
  ({
   get:
    (unused, υ) => {
     const
      regex = /^(?<protocol>[a-z+]+:\/\/?)(?:(?<host>[^\/]+?)(?:\/(?<path>(?:[^\s.?\/]+?\/)*)(?:(?<part>[a-z][a-z0-9-]*)\/?|(?<filename>[^\s?\/]*)\.(?<extension>(?<binary>png|ico|woff2|wasm)|[^\s.?\/]+))|\/(?<index>(?:[^\s.?\/]+?\/)*))(?:\?(?<kireji>[a-zA-Z][a-zA-Z0-9_]*)(?:=(?<value>-?[\d]*\.?[\d]*)(?<rest_kireji>&(?:[a-zA-Z][a-zA-Z0-9_]*=-?[\d]*\.?[\d]*)+)?$)?)?)?$/,
      Ψ = υ.match(regex)?.groups;
     if (!Ψ) {
      throw new TypeError("AlphaError: bad request \'" + υ + "\'; previous request: " + globalThis.lastCall)
     }
     globalThis.lastCall = υ
     const
      extras = {
       size: {
        get() {
         return Δ[υ]?.length ?? 0
        }
       },
       entrySize: {
        get() {
         return this.size + υ.length
        }
       }
      },
      types = {
       js: "text/javascript",
       css: "text/css",
       json: "application/json",
       png: "image/png",
       woff2: "font/woff2",
       ico: "image/vnd.microsoft.icon",
       html: "text/html",
       wasm: "application/wasm",
       uri: "text/uri-list",
       hood: "physical/car-part",
       cork: "physical/drink-stopper",
       balloon: "physical/toy",
       zit: "physical/blemish"
      },
      true_extension = Ψ.value ? "js"
                       : (Ψ.index !== undefined || Ψ.part !== undefined) ? "html"
                       : (Ψ.kireji === undefined) ? Ψ.extension
                       : "uri";
     Object.defineProperties(Ψ, extras)
     if (Ψ.value)
      Ψ.target = υ.slice(0, - Ψ.kireji.length - (2 + Ψ.value.length))
     Ψ.type = types[true_extension] ?? "text/plain";
     let α, β;
     α = new Proxy(Proxy, {
      get: (unused, π) => {
       if (π === Symbol.toPrimitive) π = \'toPrimitive\';
       const result = eval(`(${Δ[Δ[`${υ}?${π}`] ?? Δ[`${Δ[`${υ}?core`] ?? \'https://core.parts/core-part/\'}?${π}`]] ?? Δ[`https://core.parts/proxy/beta/${π}.js`]})`)
       return result
      }
     })
     return β = new Proxy(α, α)
    },
   set:
    (unused, υ, δ) => {
     if (Δ[υ] === δ)
      return
     const
      payload = { [υ]: δ },
      onset = data => {
       for (const url in data)
        if (url in causality)
         Object.entries(causality[url]).forEach(
          ([kireji, nodeset]) => {
           nodeset.forEach(node => node[kireji] = data[url])
          }
         )
      }
     Δ[υ] = δ
     if (globalThis.coresetlock) return onset(payload)
     globalThis.coresetlock = true
     const
      fxdom = {},
      fxneg = {},
      fxall = new Set(),
      recursive_getfx = (cause, affected, level) => {
       fxneg[cause] = affected
       for (const url of affected) {
        if (!(url in fxdom)) {
         fxdom[url] = new Set()
         if (cause) fxdom[url].add(level + \'|\' + cause)
         if (url === \'undefined\') continue;
         fxall.add(url)
         recursive_getfx(url, ("" + _[url].fx).split(\' \'), level + 1)
        } else {
         fxdom[url].add(level + \'|\' + cause)
        }
       }
      }
     recursive_getfx(undefined, [υ], 0)
     const
      seen = new Set(),
      order = [...fxall],
      extract = item => {
       if (!order.includes(item)) return;
       order.splice(order.indexOf(item), 1)
      },
      moveToStart = item => {
       if (!order.includes(item)) return;
       order.unshift(extract(item)[0])
      },
      recursive_getprio = item => {
       if (seen.has(item) || !order.includes(item)) return;
       fxdom[item].forEach(moveToStart)
       fxdom[item].forEach(recursive_getprio)
      }
     extract(υ)
     extract("undefined")
     recursive_getprio(υ)
     // TODO: Allow a script to set others?
     order.forEach(url => {
      // TODO: check that the urls who affect this one - imagined earlier in this for loop - had any actual changes compared to existing. Skip if not. 
      const
       existing = Δ[url],
       generated = _[url].toPrimitive("imagine", υ);
      if (existing !== generated) {
       payload[url] = Δ[url] = generated
       // TODO: verify. For all fx of current url whose own url already passed through this callback,
       // imagine the fx\'s value again. maybe it changed? That would be a consistency issue.
      }
     })
     onset(payload)
     globalThis.coresetlock = false
    }
  }[Υ])',
 "https://core.parts/proxy/beta/apply.js" => '
  (unused1, unused2, A) => {
   return eval("" + α)(...A)
  }',
 "https://core.parts/proxy/beta/get.js" => '
  (unused, π) => {
   if (["toPrimitive", Symbol.toPrimitive, "toString", "valueOf", "headerOf", "rootsOf", "query", "getEmbedTag"].includes(π)) {
    return α[π]
   }
   let p, r = p = υ, url, result, exists, core_url = "https://core.parts/core-part/"
   do {
    exists = (result = Δ[url = `${r}?${π}`]) !== undefined
    if (exists) {
     return _[result]
    }
    if (r === core_url) break
    p = r
    r = Δ[`${r}?core`] ?? core_url
   } while (r !== p)
  }',
 "https://core.parts/proxy/beta/getOwnPropertyDescriptor.js" => '
  (unused, π) => ({
   configurable: true,
   enumerable: true,
   writable: true,
   value: α
  })',
 "https://core.parts/proxy/beta/getPrototypeOf.js" => '
  () => {
   return Object.prototype
  }',
 "https://core.parts/proxy/beta/has.js" => '
  (unused, π) => {
   // Beta proxy functions - υ (upsilon) refers to subject url in the function body.
   if (["toPrimitive", Symbol.toPrimitive, "toString", "valueOf", "headerOf", "rootsOf", "query", "getEmbedTag"].includes(π)) {
    
    return α[π] !== undefined
   }
   // For other functions, υ will refer to the url of the function itself
   let p, r = p = υ, url, result, exists, core_url = "https://core.parts/core-part/"
   do {
    exists = (result = Δ[url = `${r}?${π}`]) !== undefined
    if (exists) {
     return true
    }
    if (r === core_url) break
    p = r
    r = Δ[`${r}?core`] ?? core_url
   } while (r !== p)
  }',
 "https://core.parts/proxy/beta/headerOf.js" => '
  () => ({
   kernelActionLocation: V,
   kernelActionKey: Υ,
   href: υ,
   metaKernel: α,
   self: β,
   groups: Ψ,
   metaKernelKey: π
  })',
 "https://core.parts/proxy/beta/isExtensible.js" => '
  () => {
   return true
  }',
 "https://core.parts/proxy/beta/ownKeys.js" => '
  () => {
   const core_url = "https://core.parts/core-part/", keys = new Set()
   for (const url in Δ) {
    if (!url.match(/^[^?]*\?\w*$/)) continue
    let p, r = p = υ
    const [base, π] = url.split("?")
    if (keys.has(π)) continue;
    do {
     if (r === base) { keys.add(π); break }
     if (r === core_url) break;
     p = r
     r = Δ[`${r}?core`] ?? core_url
    } while (r !== p)
   }
   const result = [...keys]
   return result;
  }',
 "https://core.parts/proxy/beta/query.js" => '
  (ƒ = x => x) => {
   const roots = β.rootsOf()
   return Object.keys(Δ).reduce((o, url) => {
    const rootIndex = roots.findIndex(root => url.startsWith(root + \'?\'));
    if (rootIndex !== -1) {
     const root = roots[rootIndex],
      kireji = url.slice(root.length + 1)
     const item = { url, root, kireji, rootIndex, href: Δ[url] }
     const result = ƒ(item)
     if (result) o.push(result)
    }
    return o
   }, [])
  }',
 "https://core.parts/proxy/beta/rootsOf.js" => '
  () => {
   const roots = [υ], protocore = "https://core.parts/core-part/"
   if (υ === protocore) throw "recursion"
   let root = υ, key;
   while (root = Δ[key = root + \'?core\']) {
    if (roots.includes(root)) throw \'core loop\'
    roots.push(root);
    if (root === protocore) break;
   }
   if (!roots.includes(protocore)) roots.push(protocore)
   return roots;
  }',
 "https://core.parts/proxy/beta/set.js" => '
  (unused, kireji, value) => {
   console.warn("try to use the other method directly", { kireji, value, υ })
   return _[_[_[υ].query(l => l.kireji === kireji ? l.url : undefined)[0]]] = value
  }',
 "https://core.parts/proxy/beta/toPrimitive.js" => '
  (hint, caller) => {
   const core_root = "https://core.parts/core-part/", imagine = hint === "imagine"
   let primitive = Δ[υ];
   if (imagine || primitive === undefined) {
    const proxy = _[υ], constructor = proxy.constructor?.toPrimitive(), Kireji = new Map(), roots = β.rootsOf()
    if (!constructor) return proxy.core.toPrimitive()
    for (const url in Δ) {
     if (!url.match(/^[^?]*\?\w*$/)) continue
     let p, r = p = υ, rank = 0;
     const [base, π] = url.split("?")
     do {
      if (r === base) {
       if (!Kireji.has(π) || Kireji.get(π)[0] > rank) {
        Kireji.set(π, [rank, `"${Δ[url]}": ${π}`]);
       }
       break
      }
      if (r === core_root) break;
      p = r
      rank++;
      r = Δ[`${r}?core`] ?? core_root
     } while (r !== p)
    }
    const runtime = eval("({ \n " + [...Kireji.values()].map(x=>x[1]).join(\',\n \') + "\n}) => {\n " + constructor + "\n}");
    primitive = runtime(_);
    output_type = typeof primitive;
    if (output_type !== "string") {
     throw new TypeError(`output of ${υ} must be a primitive string (got ${output_type})`)
    }
    if (imagine) {
     return primitive
    }
    _[υ] = primitive
   }
   return primitive
  }',
 "https://core.parts/proxy/beta/toString.js" => '
  () => {
   return Δ[υ]
  }',
 "https://core.parts/proxy/beta/valueOf.js" => '
  () => {
   return Δ[υ]
  }',
 "https://core.parts/favicon.ico?core" => 'https://core.parts/apple-touch-icon.png',
 "https://ejaugust.com/favicon.ico?core" => 'https://core.parts/apple-touch-icon.png',
 "https://ejaugust.com/research/wasm/test.js" => 'WebAssembly.instantiateStreaming(onfetch("https://core.parts/wasm/test.wasm")).then(module => console.trace(module.instance.exports))',
 "https://ejaugust.com/research/wasm/test.wasm" => 'AGFzbQEAAAABBwFgA39/fwADAgEABQMBAAEHDgIDbWVtAgAEZmlsbAAACg0BCwAgACABIAL8CwALAAoEbmFtZQIDAQAA',
 "https://orenjinari.com/favicon.ico?core" => 'https://core.parts/apple-touch-icon.png',
 "https://kireji.app/favicon.ico?core" => 'https://core.parts/apple-touch-icon.png',
 "https://kireji.app/demo/hello.txt?mood" => 'https://kireji.app/demo/mood.txt',
 "https://kireji.app/demo/hello.txt?noun" => 'https://kireji.app/demo/noun.txt',
 "https://kireji.app/demo/hello.txt?past_phrasal_verb" => 'https://kireji.app/demo/past_phrasal_verb.txt',
 "https://kireji.app/demo/hello.txt?persons_name" => 'https://kireji.app/demo/persons_name.txt',
 "https://kireji.app/demo/hello.txt?time_interval" => 'https://kireji.app/demo/time_interval.txt',
 "https://kireji.app/demo/hello.txt?verb_ending_in_ing" => 'https://kireji.app/demo/verb_ending_in_ing.txt',
 "https://kireji.app/demo/hello.txt?constructor" => 'https://kireji.app/demo/hello.txt.c.js',
 "https://kireji.app/demo/hello.txt.c.js" => 'return `Welcome to my ${noun}, ${persons_name}! I\'ve been ${verb_ending_in_ing} on it all ${time_interval}. I\'m so ${mood} you ${past_phrasal_verb}.`',
 "https://kireji.app/demo/mood.txt" => 'glad',
 "https://kireji.app/demo/noun.txt" => 'website',
 "https://kireji.app/demo/past_phrasal_verb.txt" => 'stopped by',
 "https://kireji.app/demo/persons_name.txt" => 'stranger',
 "https://kireji.app/demo/time_interval.txt" => 'day',
 "https://kireji.app/demo/verb_ending_in_ing.txt" => 'working',
 "https://kireji.io/favicon.ico?core" => 'https://core.parts/apple-touch-icon.png',
 "https://kireji.io/poppable/party.balloon" => 'ps://core.parts/apple-touch-icon.pnghttps:',
 "https://kireji.io/poppable/champaign.cork" => 'https://core.parts/appps://core.parts/apple-touch-icon.pnghttps:ps://core.parts/apple-touch-icon.pnghttps:le-touch-icon.pnghttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touch-icon.png',
 "https://kireji.io/poppable/car.hood" => 'https://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touhttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touch-icon.pnghttps://core.parts/apple-touch-icon.png',
 "https://kireji.io/poppable/forehead.zit" => 'https://core.parts/apple-touch-icon.pnghttps://ps://core.parts/apple-touch-icon.pnghttps:',
 "https://kheb.online/favicon.ico?core" => 'https://core.parts/apple-touch-icon.png',
 "https://stargate.design/favicon.ico?core" => 'https://core.parts/apple-touch-icon.png',
 "https://pilot.parts/?onpointermove" => 'https://core.parts/onpointermove.js',
 "https://pilot.parts/?onpointerup" => 'https://core.parts/onpointerup.js',
 "https://pilot.parts/?oncontextmenu" => 'https://core.parts/oncontextmenu.js',
 "https://pilot.parts/layout.css?height" => 'https://pilot.parts/taskbar/css-height.txt',
 "https://pilot.parts/?layout" => 'https://pilot.parts/layout.css',
 "https://pilot.parts/?manifest" => 'https://pilot.parts/manifest.uri',
 "https://pilot.parts/layout.css?constructor" => 'https://pilot.parts/layout.css.c.js',
 "https://pilot.parts/layout.css.c.js" => '
  return `
   :host {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    height: 100%;
    margin: 0;
    display: grid;
    grid-template-rows: 1fr ${height};
    font: 11px / 16px sans-serif;
   }
  `',
 "https://pilot.parts/favicon.ico?core" => 'https://core.parts/apple-touch-icon.png',
 "https://pilot.parts/desktop/layout.css" => '
  :host {
   position: relative;
   width: 100%;
   box-sizing: border-box;
   height: 100%;
   margin: 0;
   background: #377f7f;
  }',
 "https://pilot.parts/desktop/onfocus.js?selected" => 'https://pilot.parts/taskbar/selected.txt',
 "https://pilot.parts/desktop/onfocus.js?constructor" => 'https://pilot.parts/desktop/onfocus.c.js',
 "https://pilot.parts/desktop/onfocus.c.js" => '
  const has_active = "" + selected !== "-1", active_url = selected.headerOf().href;
  return `
   () => {
    ${has_active ? `_["${active_url}"] = "-1"` : ``}
   }
  `',
 "https://pilot.parts/desktop/?layout" => 'https://pilot.parts/desktop/layout.css',
 "https://pilot.parts/desktop/?onfocus" => 'https://pilot.parts/desktop/onfocus.js',
 "https://pilot.parts/horizontal-line/layout.css" => '
  :host {
   height: 2px;
   border-top: 1px solid #7f7f7f;
   border-bottom: 1px solid white;
   box-sizing: border-box;
   margin: 4px 0;
  }',
 "https://pilot.parts/horizontal-line/?layout" => 'https://pilot.parts/horizontal-line/layout.css',
 "https://pilot.parts/manifest.uri?windows" => 'https://pilot.parts/windows.uri',
 "https://pilot.parts/manifest.uri?context_menu" => 'https://pilot.parts/context-menu/open.txt',
 "https://pilot.parts/manifest.uri?start_menu" => 'https://pilot.parts/start-menu/open.txt',
 "https://pilot.parts/manifest.uri?constructor" => 'https://pilot.parts/manifest.uri.c.js',
 "https://pilot.parts/manifest.uri.c.js" => '
  const
   urls = ["https://pilot.parts/desktop/"],
   windows_string = "" + windows,
   list = windows_string ? windows_string.split(" ").forEach(url => {
    if (("" + _[url + "minimized.txt"]) === "0") urls.push(url)
   }) : []
  urls.push("https://pilot.parts/taskbar/");
  if (""+start_menu === "1") urls.push(
   "https://pilot.parts/taskbar/start-menu/"
  );
  if (""+context_menu === "1") urls.push(
   "https://pilot.parts/context-menu/"
  );
  return urls.join(" ")',
 "https://pilot.parts/context-menu/?layout" => 'https://pilot.parts/context-menu/layout.css',
 "https://pilot.parts/context-menu/?manifest" => 'https://pilot.parts/context-menu/manifest.uri',
 "https://pilot.parts/context-menu/manifest.uri" => 'https://pilot.parts/context-menu/locate/ https://pilot.parts/context-menu/relate/ https://pilot.parts/context-menu/debate/ https://pilot.parts/horizontal-line/ https://pilot.parts/context-menu/download/ https://pilot.parts/context-menu/properties/',
 "https://pilot.parts/context-menu/main.uri" => 'https://pilot.parts/context-menu/locate/',
 "https://pilot.parts/context-menu/core-item/?layout" => 'https://pilot.parts/context-menu/core-item/layout.css',
 "https://pilot.parts/context-menu/core-item/layout.css?constructor" => 'https://pilot.parts/context-menu/core-item/layout.css.c.js',
 "https://pilot.parts/context-menu/core-item/layout.css?main" => 'https://pilot.parts/context-menu/main.uri',
 "https://pilot.parts/context-menu/core-item/layout.css.c.js" => 'return `:host { padding-left: 18px${υ.replace("layout.css", "") === ("" + main) ? `; font-weight: 700` : ``} } :host(:hover) { background: rgb(0, 0, 163); color: white } :host::before { content: "${_[υ.replace("layout.css", "label.txt")]}" }`',
 "https://pilot.parts/context-menu/locate/?layout" => 'https://pilot.parts/context-menu/locate/layout.css',
 "https://pilot.parts/context-menu/locate/layout.css?core" => 'https://pilot.parts/context-menu/core-item/layout.css',
 "https://pilot.parts/context-menu/locate/label.txt" => 'Locate',
 "https://pilot.parts/context-menu/relate/?layout" => 'https://pilot.parts/context-menu/relate/layout.css',
 "https://pilot.parts/context-menu/relate/layout.css?core" => 'https://pilot.parts/context-menu/core-item/layout.css',
 "https://pilot.parts/context-menu/relate/label.txt" => 'Relate',
 "https://pilot.parts/context-menu/debate/?layout" => 'https://pilot.parts/context-menu/debate/layout.css',
 "https://pilot.parts/context-menu/debate/layout.css?core" => 'https://pilot.parts/context-menu/core-item/layout.css',
 "https://pilot.parts/context-menu/debate/label.txt" => 'Debate',
 "https://pilot.parts/context-menu/download/?layout" => 'https://pilot.parts/context-menu/download/layout.css',
 "https://pilot.parts/context-menu/download/layout.css?core" => 'https://pilot.parts/context-menu/core-item/layout.css',
 "https://pilot.parts/context-menu/download/label.txt" => 'Download',
 "https://pilot.parts/context-menu/properties/?layout" => 'https://pilot.parts/context-menu/properties/layout.css',
 "https://pilot.parts/context-menu/properties/layout.css?core" => 'https://pilot.parts/context-menu/core-item/layout.css',
 "https://pilot.parts/context-menu/properties/label.txt" => 'Properties',
 "https://pilot.parts/context-menu/layout.css?constructor" => 'https://pilot.parts/context-menu/layout.css.c.js',
 "https://pilot.parts/context-menu/position.json" => '{ "x": 120, "y": 70 }',
 "https://pilot.parts/context-menu/position.json?fx" => 'https://pilot.parts/context-menu/reposition.uri',
 "https://pilot.parts/context-menu/reposition.uri" => 'https://pilot.parts/context-menu/layout.css',
 "https://pilot.parts/context-menu/open.txt" => '0',
 "https://pilot.parts/context-menu/open.txt?fx" => 'https://pilot.parts/context-menu/open-fx.js',
 "https://pilot.parts/context-menu/open-fx.js" => 'https://pilot.parts/manifest.uri',
 "https://pilot.parts/context-menu/layout.css?position" => 'https://pilot.parts/context-menu/position.json',
 "https://pilot.parts/context-menu/layout.css.c.js" => <<<JS
  const { x, y } = JSON.parse("" + position);
   return `
   :host {
    display: flex;
    flex-flow: column nowrap;
    position: absolute;
    left: \${x}px;
    top: \${y}px;
    user-select: none;
    line-height: 18px;
    text-align: left;
    background: #c3c3c3;
    box-sizing: border-box;
    padding: 3px 3px 3px 3px;
    text-align: left;
    background: #c3c3c3;
    min-width: 128px;
    box-shadow:
     inset -1px -1px black,
     inset 1px 1px white,
     inset -2px -2px #7a7a7a,
     inset 2px 2px #dbdbdb;
   }`
  JS,

 "https://pilot.parts/taskbar/css-height.txt" => '28px',
 "https://pilot.parts/taskbar/css-height/fx.uri" => 'https://core.parts/layout.css https://pilot.parts/taskbar/start-menu/layout.css',
 "https://pilot.parts/taskbar/layout.css" => '
  :host {
   position: relative;
   width: 100%;
   box-sizing: border-box;
   height: 100%;
   margin: 0;
   display: flex;
   flex-flow: row nowrap;
   gap: 3px;
   height: 100%;
   padding: 4px 2px 2px;
   background: #c3c3c3;
   box-shadow: inset 0 1px #c3c3c3, inset 0 2px white;
  }',
 "https://pilot.parts/taskbar/manifest.uri?running_apps" => 'https://pilot.parts/tasks.uri',
 "https://pilot.parts/taskbar/manifest.uri?constructor" => 'https://pilot.parts/taskbar/manifest.uri.c.js',
 "https://pilot.parts/taskbar/manifest.uri.c.js" => 'return `https://pilot.parts/taskbar/start-button/ ${"" + running_apps ? running_apps + " " : ""}https://core.parts/flex-spacer/ https://pilot.parts/taskbar/tray/`',
 "https://pilot.parts/taskbar/selected.txt" => '-1',
 "https://pilot.parts/taskbar/selected.txt?fx" => 'https://pilot.parts/taskbar/reselect.uri',
 "https://pilot.parts/taskbar/selected.txt?constructor" => 'https://pilot.parts/taskbar/selected.txt.c.js',
 "https://pilot.parts/taskbar/selected.txt.c.js" => '
  let wasOn;
  const result = ""+(""+fx).split(" ").findIndex(x => {
   const
    src = caller,
    isX = x === src;
   wasOn = Δ[src] === "1";
   return (src && wasOn) ? isX : ("" + _[x] === "1");
  });
  return result;',
 "https://pilot.parts/taskbar/reselect.uri" => 'https://pilot.parts/start-menu/open.txt https://pilot.parts/programs/locate/window/active.txt https://pilot.parts/programs/locate/window/onfocus.js https://pilot.parts/programs/relate/window/active.txt https://pilot.parts/programs/debate/window/active.txt https://pilot.parts/programs/answer/window/active.txt https://pilot.parts/programs/invite/window/active.txt https://pilot.parts/programs/welcome/window/active.txt https://pilot.parts/desktop/onfocus.js https://pilot.parts/taskbar/onpointerdown.js',
 "https://pilot.parts/taskbar/start-button/icon/layout.css?icon" => 'https://core.parts/apple-touch-icon.png',
 "https://pilot.parts/taskbar/start-button/icon/layout.css?constructor" => 'https://pilot.parts/taskbar/start-button/icon/layout.css.c.js',
 "https://pilot.parts/taskbar/start-button/icon/layout.css.c.js" => 'return `:host {
   position: relative;
   box-sizing: border-box;
   height: 100%;
   margin: 0;
   background: url(data:image/png;base64,${icon});
   background-size: 16px;
   width: 16px;
   height: 16px }`',
 "https://pilot.parts/taskbar/start-button/icon/?layout" => 'https://pilot.parts/taskbar/start-button/icon/layout.css',
 "https://pilot.parts/taskbar/start-button/label/layout.css" => '
  :host {
   position: relative;
   box-sizing: border-box;
   margin: 0;
   height: 16px }
  :host::before {
   content: "Start";
  }',
 "https://pilot.parts/taskbar/start-button/label/?layout" => 'https://pilot.parts/taskbar/start-button/label/layout.css',
 "https://pilot.parts/taskbar/start-button/layout.css?open" => 'https://pilot.parts/start-menu/open.txt',
 "https://pilot.parts/taskbar/start-button/layout.css?constructor" => 'https://pilot.parts/taskbar/start-button/layout.css.c.js',
 "https://pilot.parts/taskbar/start-button/layout.css.c.js" => '
  return `
   :host {
    flex: 0 0;
    position: relative;
    width: 100%;
    box-sizing: border-box;
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
    gap: 3px;
    border: none;
    font: bold 11px / 16px sans-serif;
    box-sizing: border-box;
    padding: ${("" + open) === "0" ? 3 : 4}px 4px 2px;
    text-align: left;
    background: #c3c3c3;
    box-shadow: ${("" + open) === "0" ? `
     inset -1px -1px black,
     inset 1px 1px white,
     inset -2px -2px #7a7a7a,
     inset 2px 2px #dbdbdb`
     : `
     inset -1px -1px white,
     inset 1px 1px black,
     inset -2px -2px #dbdbdb,
     inset 2px 2px #7a7a7a`};
   }
   :host(:focus)::after {
    border: 1px dotted black;
    content: "";
    position: absolute;
    margin: 3px;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    pointer-events: none;
   }
  `',
 "https://pilot.parts/taskbar/start-button/manifest.uri" => 'https://pilot.parts/taskbar/start-button/icon/ https://pilot.parts/taskbar/start-button/label/',
 "https://pilot.parts/taskbar/start-button/manifest.uri?open" => 'https://pilot.parts/start-menu/open.txt',
 "https://pilot.parts/taskbar/start-button/onpointerdown.js?constructor" => 'https://pilot.parts/taskbar/start-button/onpointerdown.c.js',
 "https://pilot.parts/taskbar/start-button/onpointerdown.js?open" => 'https://pilot.parts/start-menu/open.txt',
 "https://pilot.parts/taskbar/start-button/onpointerdown.c.js" => '
  return `e => {
   e.stopPropagation()
   _["${open.headerOf().href}"] = "${"" + open === "0" ? `1` : `0`}";
  }`',
 "https://pilot.parts/taskbar/start-button/?layout" => 'https://pilot.parts/taskbar/start-button/layout.css',
 "https://pilot.parts/taskbar/start-button/?manifest" => 'https://pilot.parts/taskbar/start-button/manifest.uri',
 "https://pilot.parts/taskbar/start-button/?onpointerdown" => 'https://pilot.parts/taskbar/start-button/onpointerdown.js',
 "https://pilot.parts/taskbar/start-menu/layout.css?height" => 'https://pilot.parts/taskbar/css-height.txt',
 "https://pilot.parts/taskbar/start-menu/layout.css?constructor" => 'https://pilot.parts/taskbar/start-menu/layout.css.c.js',
 "https://pilot.parts/taskbar/start-menu/layout.css.c.js" => 'return `
  :host {
   position: relative;
   min-width: 164px;
   display: flex;
   flex-flow: column nowrap;
   position: absolute;
   left: 2px;
   bottom: calc(${height} - 4px);
   user-select: none;
   line-height: 18px;
   text-align: left;
   background: #c3c3c3;
   box-sizing: border-box;
   padding: 3px 3px 3px 24px;
   text-align: left;
   background: #c3c3c3;
   box-shadow: inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb
  }
  :host::after {
   pointer-events: none;
   display: block;
   content: "Pilot";
   writing-mode: tb-rl;
   transform: rotate(-180deg);
   line-height: 21px;
   font-size: 18px;
   font-weight: 900;
   color: #c3c3c3;
   padding-top: 4px;
   box-sizing: border-box;
   position: absolute;
   left: 3px;
   top: 3px;
   bottom: 3px;
   background: #7f7f7f;
   width: 21px
  }`',
 "https://pilot.parts/taskbar/start-menu/manifest.uri" => 'https://pilot.parts/programs/locate/start-menu-item/ https://pilot.parts/programs/relate/start-menu-item/ https://pilot.parts/programs/debate/start-menu-item/ https://pilot.parts/horizontal-line/ https://pilot.parts/programs/welcome/start-menu-item/ https://pilot.parts/horizontal-line/ https://pilot.parts/taskbar/start-menu/save-computer/ https://pilot.parts/taskbar/start-menu/restart-computer/ https://pilot.parts/taskbar/start-menu/restart-server/',
 "https://pilot.parts/taskbar/start-menu/network-folder/app-icon/layout.css" => '
  :host {
   --size: 16px;
  }
  :host::before {
   content: "🔭";
   font-size: var(--size);
   line-height: var(--size);
  }',
 "https://pilot.parts/taskbar/start-menu/network-folder/app-icon/?layout" => 'https://pilot.parts/taskbar/start-menu/network-folder/app-icon/layout.css',
 "https://pilot.parts/taskbar/start-menu/network-folder/app-label/layout.css" => ':host::after {
   height: 24px;
   content: "Network";
  }',
 "https://pilot.parts/taskbar/start-menu/network-folder/app-label/?layout" => 'https://pilot.parts/taskbar/start-menu/network-folder/app-label/layout.css',
 "https://pilot.parts/taskbar/start-menu/network-folder/layout.css" => '
  :host {
   position: relative;
   display: flex;
   flex-flow: row nowrap;
   align-items: center;
   padding: 4px 0 }
  :host(:hover) {
   background: #00007f;
   color: white }
  app-icon {
   width: 24px;
   height: 24px;
   margin: 0 10px;
   --size: 24px;
  }',
 "https://pilot.parts/taskbar/start-menu/network-folder/manifest.uri" => 'https://pilot.parts/taskbar/start-menu/network-folder/app-icon/ https://pilot.parts/taskbar/start-menu/network-folder/app-label/',
 "https://pilot.parts/taskbar/start-menu/network-folder/?layout" => 'https://pilot.parts/taskbar/start-menu/network-folder/layout.css',
 "https://pilot.parts/taskbar/start-menu/network-folder/?manifest" => 'https://pilot.parts/taskbar/start-menu/network-folder/manifest.uri',
 "https://pilot.parts/taskbar/start-menu/restart-computer/app-icon/layout.css" => '
  :host {
   --size: 16px;
   width: var(--size);
   height: var(--size);
   font-size: var(--size);
   line-height: var(--size);
  }
  :host::after {
   content: "🖥";
  }',
 "https://pilot.parts/taskbar/start-menu/restart-computer/app-icon/?layout" => 'https://pilot.parts/taskbar/start-menu/restart-computer/app-icon/layout.css',
 "https://pilot.parts/taskbar/start-menu/restart-computer/app-label/layout.css" => ':host::after {
   height: 24px;
   content: "Load Last Save";
  }',
 "https://pilot.parts/taskbar/start-menu/restart-computer/app-label/?layout" => 'https://pilot.parts/taskbar/start-menu/restart-computer/app-label/layout.css',
 "https://pilot.parts/taskbar/start-menu/restart-computer/layout.css" => '
  :host {
   position: relative;
   display: flex;
   flex-flow: row nowrap;
   align-items: center;
   padding: 4px 0;
   padding-right: 6px }
  :host(:hover) {
   background: #00007f;
   color: white }
  app-icon {
   width: 24px;
   height: 24px;
   margin: 0 10px;
   --size: 24px;
  }',
 "https://pilot.parts/taskbar/start-menu/restart-computer/manifest.uri" => 'https://pilot.parts/taskbar/start-menu/restart-computer/app-icon/ https://pilot.parts/taskbar/start-menu/restart-computer/app-label/',
 "https://pilot.parts/taskbar/start-menu/restart-computer/onclick.js" => '
  () => {
   location.reload();
  }',
 "https://pilot.parts/taskbar/start-menu/restart-computer/?layout" => 'https://pilot.parts/taskbar/start-menu/restart-computer/layout.css',
 "https://pilot.parts/taskbar/start-menu/restart-computer/?manifest" => 'https://pilot.parts/taskbar/start-menu/restart-computer/manifest.uri',
 "https://pilot.parts/taskbar/start-menu/restart-computer/?onclick" => 'https://pilot.parts/taskbar/start-menu/restart-computer/onclick.js',
 "https://pilot.parts/taskbar/start-menu/restart-server/app-icon/layout.css" => '
  :host {
   --size: 16px;
   width: var(--size);
   height: var(--size);
   font-size: var(--size);
   line-height: var(--size);
  }
  :host::after {
   content: "🧼";
  }',
 "https://pilot.parts/taskbar/start-menu/restart-server/app-icon/?layout" => 'https://pilot.parts/taskbar/start-menu/restart-server/app-icon/layout.css',
 "https://pilot.parts/taskbar/start-menu/restart-server/app-label/layout.css" => ':host::after {
   height: 24px;
   content: "Factory Reset";
  }',
 "https://pilot.parts/taskbar/start-menu/restart-server/app-label/?layout" => 'https://pilot.parts/taskbar/start-menu/restart-server/app-label/layout.css',
 "https://pilot.parts/taskbar/start-menu/restart-server/layout.css" => '
  :host {
   position: relative;
   display: flex;
   flex-flow: row nowrap;
   align-items: center;
   padding: 4px 0 }
  :host(:hover) {
   background: #00007f;
   color: white }
  app-icon {
   width: 24px;
   height: 24px;
   margin: 0 10px;
   --size: 24px;
  }',
 "https://pilot.parts/taskbar/start-menu/restart-server/manifest.uri" => 'https://pilot.parts/taskbar/start-menu/restart-server/app-icon/ https://pilot.parts/taskbar/start-menu/restart-server/app-label/',
 "https://pilot.parts/taskbar/start-menu/restart-server/onclick.js" => '
  () => {
   navigator.serviceWorker.controller.postMessage({ restart: 1 });
  }',
 "https://pilot.parts/taskbar/start-menu/restart-server/?layout" => 'https://pilot.parts/taskbar/start-menu/restart-server/layout.css',
 "https://pilot.parts/taskbar/start-menu/restart-server/?manifest" => 'https://pilot.parts/taskbar/start-menu/restart-server/manifest.uri',
 "https://pilot.parts/taskbar/start-menu/restart-server/?onclick" => 'https://pilot.parts/taskbar/start-menu/restart-server/onclick.js',
 "https://pilot.parts/taskbar/start-menu/save-computer-as/app-icon/?layout" => 'https://pilot.parts/taskbar/start-menu/save-computer/app-icon/layout.css',
 "https://pilot.parts/taskbar/start-menu/save-computer-as/app-label/layout.css" => ':host::after {
    height: 24px;
    content: "Save as ServiceWorker source";
   }',
 "https://pilot.parts/taskbar/start-menu/save-computer-as/app-label/?layout" => 'https://pilot.parts/taskbar/start-menu/save-computer-as/app-label/layout.css',
 "https://pilot.parts/taskbar/start-menu/save-computer-as/layout.css" => '
   :host {
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 4px 0;
    padding-right: 6px }
   :host(:hover) {
    background: #00007f;
    color: white }
   app-icon {
    width: 24px;
    height: 24px;
    margin: 0 10px;
    --size: 24px;
   }',
 "https://pilot.parts/taskbar/start-menu/save-computer-as/manifest.uri" => 'https://pilot.parts/taskbar/start-menu/save-computer-as/app-icon/ https://pilot.parts/taskbar/start-menu/save-computer-as/app-label/',
 "https://pilot.parts/taskbar/start-menu/save-computer-as/onclick.js" => '
   () => {
    _["https://pilot.parts/start-menu/open.txt"] = "0"
    delete Δ["https://pilot.parts/taskbar/tray/clock/date.txt"]
    delete Δ["https://pilot.parts/taskbar/tray/clock/layout.css"]
    const
     a = document.createElement("a"),
     json = JSON.stringify(Object.keys(Δ).sort().reduce((temp_obj, key) => { temp_obj[key] = Δ[key]; return temp_obj }, {})).replace(/","/g,"\",\n  \"").replace(/^{/s, "{\n  ").replace(/}$/s, "\n}"),
     js = Δ["https://core.parts/bootstrap.js"].replace("$1", json),
     ourl = URL.createObjectURL(new Blob([js], { type: "text/javascript" }));
     a.href = ourl
     a.download = "core.js"
     document.body.appendChild(a)
    a.click();
     a.remove()
     URL.revokeObjectURL(ourl);
   }',
 "https://pilot.parts/taskbar/start-menu/save-computer-as/?layout" => 'https://pilot.parts/taskbar/start-menu/save-computer-as/layout.css',
 "https://pilot.parts/taskbar/start-menu/save-computer-as/?manifest" => 'https://pilot.parts/taskbar/start-menu/save-computer-as/manifest.uri',
 "https://pilot.parts/taskbar/start-menu/save-computer-as/?onclick" => 'https://pilot.parts/taskbar/start-menu/save-computer-as/onclick.js',
 "https://pilot.parts/taskbar/start-menu/save-computer/app-icon/layout.css" => '
  :host {
   --size: 16px;
   width: var(--size);
   height: var(--size);
   font-size: var(--size);
   line-height: var(--size);
  }
  :host::after {
   content: "💽";
  }',
 "https://pilot.parts/taskbar/start-menu/save-computer/app-icon/?layout" => 'https://pilot.parts/taskbar/start-menu/save-computer/app-icon/layout.css',
 "https://pilot.parts/taskbar/start-menu/save-computer/app-label/layout.css" => ':host::after {
   height: 24px;
   content: "Quick Save";
  }',
 "https://pilot.parts/taskbar/start-menu/save-computer/app-label/?layout" => 'https://pilot.parts/taskbar/start-menu/save-computer/app-label/layout.css',
 "https://pilot.parts/taskbar/start-menu/save-computer/layout.css" => '
  :host {
   position: relative;
   display: flex;
   flex-flow: row nowrap;
   align-items: center;
   padding: 4px 0;
   padding-right: 6px }
  :host(:hover) {
   background: #00007f;
   color: white }
  app-icon {
   width: 24px;
   height: 24px;
   margin: 0 10px;
   --size: 24px;
  }',
 "https://pilot.parts/taskbar/start-menu/save-computer/manifest.uri" => 'https://pilot.parts/taskbar/start-menu/save-computer/app-icon/ https://pilot.parts/taskbar/start-menu/save-computer/app-label/',
 "https://pilot.parts/taskbar/start-menu/save-computer/onclick.js" => '
  () => {
   _["https://pilot.parts/start-menu/open.txt"] = "0"
   delete Δ["https://pilot.parts/taskbar/tray/clock/date.txt"]
   delete Δ["https://pilot.parts/taskbar/tray/clock/layout.css"]
   navigator.serviceWorker.controller.postMessage({ save: Δ });
  }',
 "https://pilot.parts/taskbar/start-menu/save-computer/?layout" => 'https://pilot.parts/taskbar/start-menu/save-computer/layout.css',
 "https://pilot.parts/taskbar/start-menu/save-computer/?manifest" => 'https://pilot.parts/taskbar/start-menu/save-computer/manifest.uri',
 "https://pilot.parts/taskbar/start-menu/save-computer/?onclick" => 'https://pilot.parts/taskbar/start-menu/save-computer/onclick.js',
 "https://pilot.parts/taskbar/start-menu/?layout" => 'https://pilot.parts/taskbar/start-menu/layout.css',
 "https://pilot.parts/taskbar/start-menu/?manifest" => 'https://pilot.parts/taskbar/start-menu/manifest.uri',
 "https://pilot.parts/taskbar/tray/clock/date.txt?fx" => 'https://pilot.parts/taskbar/tray/clock/date/fx.uri',
 "https://pilot.parts/taskbar/tray/clock/date.txt?constructor" => 'https://pilot.parts/taskbar/tray/clock/date.txt.c.js',
 "https://pilot.parts/taskbar/tray/clock/date.txt.c.js" => 'return new Date().toLocaleString("en-US", { hour: "numeric", minute: "numeric", hourCycle: "h12" })',
 "https://pilot.parts/taskbar/tray/clock/date/fx.uri" => 'https://pilot.parts/taskbar/tray/clock/layout.css',
 "https://pilot.parts/taskbar/tray/clock/layout.css?date" => 'https://pilot.parts/taskbar/tray/clock/date.txt',
 "https://pilot.parts/taskbar/tray/clock/layout.css?constructor" => 'https://pilot.parts/taskbar/tray/clock/layout.css.c.js',
 "https://pilot.parts/taskbar/tray/clock/layout.css.c.js" => '
  const minute = 1000 * 60, delay = minute - (Date.now() % minute);
  setTimeout(()=>{
   _[date.headerOf().href] = new Date().toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h12"
   })
  }, delay + 5);
  return `:host::after {
   content: "${date}";
   white-space: nowrap;
  }`',
 "https://pilot.parts/taskbar/tray/clock/?layout" => 'https://pilot.parts/taskbar/tray/clock/layout.css',
 "https://pilot.parts/taskbar/tray/layout.css" => ':host {
   position: relative;
   display: flex;
   flex-flow: row nowrap;
   gap: 3px;
   box-sizing: border-box;
   height: 100%;
   margin: 0;
   user-select: none;
   padding: 3px 4px 3px;
   text-align: left;
   background: #c3c3c3;
   box-shadow: inset -1px -1px white, inset 1px 1px #7a7a7a;
  }',
 "https://pilot.parts/taskbar/tray/manifest.uri" => 'https://pilot.parts/taskbar/tray/factory-reset/ https://pilot.parts/taskbar/tray/fullscreen/ https://pilot.parts/taskbar/tray/clock/',
 "https://pilot.parts/taskbar/tray/?layout" => 'https://pilot.parts/taskbar/tray/layout.css',
 "https://pilot.parts/taskbar/tray/?manifest" => 'https://pilot.parts/taskbar/tray/manifest.uri',
 "https://pilot.parts/taskbar/?layout" => 'https://pilot.parts/taskbar/layout.css',
 "https://pilot.parts/taskbar/?manifest" => 'https://pilot.parts/taskbar/manifest.uri',
 "https://pilot.parts/taskbar/?onpointerdown" => 'https://pilot.parts/taskbar/onpointerdown.js',
 "https://pilot.parts/taskbar/onpointerdown.js?selected" => 'https://pilot.parts/taskbar/selected.txt',
 "https://pilot.parts/taskbar/onpointerdown.js?constructor" => 'https://pilot.parts/taskbar/onpointerdown.c.js',
 "https://pilot.parts/taskbar/onpointerdown.c.js" => '
  return `e => {
   ${"" + selected !== "-1" ? `_["${selected.headerOf().href}"] = "-1"` : ``}
  }`',
 "https://pilot.parts/taskbar/tray/factory-reset/layout.css" => '
  :host {
   width: 16px;
   height: 16px;
   cursor: pointer;
  }
  :host::before {
   content: "🧼";
   font-size: 16px;
   line-height: 16px;
  }',
 "https://pilot.parts/taskbar/tray/factory-reset/?layout" => 'https://pilot.parts/taskbar/tray/factory-reset/layout.css',
 "https://pilot.parts/taskbar/tray/factory-reset/?onclick" => 'https://pilot.parts/taskbar/start-menu/restart-server/onclick.js',
 "https://pilot.parts/taskbar/tray/fullscreen/layout.css" => '
  :host {
   width: 16px;
   height: 16px;
   cursor: pointer;
  }
  :host::before {
   content: "⛶";
   font-size: 16px;
   line-height: 16px;
  }',
 "https://pilot.parts/taskbar/tray/fullscreen/onclick.js" => '()=>document.documentElement.requestFullscreen()',
 "https://pilot.parts/taskbar/tray/fullscreen/?layout" => 'https://pilot.parts/taskbar/tray/fullscreen/layout.css',
 "https://pilot.parts/taskbar/tray/fullscreen/?onclick" => 'https://pilot.parts/taskbar/tray/fullscreen/onclick.js',
 "https://pilot.parts/tasks.uri" => 'https://pilot.parts/programs/welcome/task/',
 "https://pilot.parts/tasks.uri?fx" => 'https://pilot.parts/tasks.fx.uri',
 "https://pilot.parts/tasks.fx.uri" => 'https://pilot.parts/taskbar/manifest.uri https://pilot.parts/programs/locate/task/index.txt https://pilot.parts/programs/relate/task/index.txt https://pilot.parts/programs/debate/task/index.txt https://pilot.parts/programs/welcome/task/index.txt https://pilot.parts/programs/answer/task/index.txt https://pilot.parts/programs/invite/task/index.txt',
 "https://pilot.parts/windows.uri" => 'https://pilot.parts/programs/welcome/window/',
 "https://pilot.parts/windows.uri?fx" => 'https://pilot.parts/windows-fx.uri',
 "https://pilot.parts/windows-fx.uri" => 'https://pilot.parts/manifest.uri',
 "https://pilot.parts/icons/application-json-icon/layout.css?layout" => 'https://pilot.parts/icons/layout.js',
 "https://pilot.parts/icons/application-json-icon/layout.css?constructor" => 'https://pilot.parts/icons/application-json-icon/layout.css.c.js',
 "https://pilot.parts/icons/application-json-icon/layout.css.c.js" => 'return layout([220, 220, 255], \'\u{1F4C4}\', \'json\', [1/7, 1/16, 1/8])',
 "https://pilot.parts/icons/application-json-icon/?layout" => 'https://pilot.parts/icons/application-json-icon/layout.css',
 "https://pilot.parts/icons/application-wasm-icon/layout.css?layout" => 'https://pilot.parts/icons/layout.js',
 "https://pilot.parts/icons/application-wasm-icon/layout.css?constructor" => 'https://pilot.parts/icons/application-wasm-icon/layout.css.c.js',
 "https://pilot.parts/icons/application-wasm-icon/layout.css.c.js" => 'return layout([0, 0, 0, 0], \'\u{1F4E6}\')',
 "https://pilot.parts/icons/application-wasm-icon/?layout" => 'https://pilot.parts/icons/application-wasm-icon/layout.css',
 "https://pilot.parts/icons/folder-icon/layout.css" => '
  :host {
   --size: 16px;
   width: var(--size);
   height: var(--size);
   font-size: var(--size);
   line-height: var(--size);
  }
  :host::before {
   content: \'📁\';
  }',
 "https://pilot.parts/icons/folder-icon/?layout" => 'https://pilot.parts/icons/folder-icon/layout.css',
 "https://pilot.parts/icons/protocol-icon/layout.css" => '
  :host {
   --size: 16px;
   width: var(--size);
   height: var(--size);
   font-size: var(--size);
   line-height: var(--size);
  }
  :host::before {
   content: \'⭄\';
  }',
 "https://pilot.parts/icons/protocol-icon/?layout" => 'https://pilot.parts/icons/protocol-icon/layout.css',
 "https://pilot.parts/icons/image-png-icon/layout.css?layout" => 'https://pilot.parts/icons/layout.js',
 "https://pilot.parts/icons/image-png-icon/layout.css?constructor" => 'https://pilot.parts/icons/image-png-icon/layout.css.c.js',
 "https://pilot.parts/icons/image-png-icon/layout.css.c.js" => 'return layout([255, 127, 0], \'\u{1F4C4}\', \'png\')',
 "https://pilot.parts/icons/image-png-icon/?layout" => 'https://pilot.parts/icons/image-png-icon/layout.css',
 "https://pilot.parts/icons/image-vnd-microsoft-icon-icon/layout.css?layout" => 'https://pilot.parts/icons/layout.js',
 "https://pilot.parts/icons/image-vnd-microsoft-icon-icon/layout.css?constructor" => 'https://pilot.parts/icons/image-vnd-microsoft-icon-icon/layout.css.c.js',
 "https://pilot.parts/icons/image-vnd-microsoft-icon-icon/layout.css.c.js" => 'return layout([127, 127, 127, 0.25], \'\u{1F4C4}\', \'ico\', [0.1, 0.1, 0.1])',
 "https://pilot.parts/icons/image-vnd-microsoft-icon-icon/?layout" => 'https://pilot.parts/icons/image-vnd-microsoft-icon-icon/layout.css',
 "https://pilot.parts/icons/physical-drink-stopper-icon/?layout" => "https://pilot.parts/icons/physical-drink-stopper-icon/layout.css",
 "https://pilot.parts/icons/physical-drink-stopper-icon/layout.css.c.js" => 'return layout([127, 127, 127, 0.25], \'🍾\', undefined, [0.1, 0.1, 0.1])',
 "https://pilot.parts/icons/physical-drink-stopper-icon/layout.css?layout" => 'https://pilot.parts/icons/layout.js',
 "https://pilot.parts/icons/physical-drink-stopper-icon/layout.css?constructor" => 'https://pilot.parts/icons/physical-drink-stopper-icon/layout.css.c.js',
 "https://pilot.parts/icons/physical-toy-icon/?layout" => "https://pilot.parts/icons/physical-toy-icon/layout.css",
 "https://pilot.parts/icons/physical-toy-icon/layout.css.c.js" => 'return layout([255, 127, 127, 0.25], \'🎈\', undefined, [0.1, 0.1, 0.1])',
 "https://pilot.parts/icons/physical-toy-icon/layout.css?layout" => 'https://pilot.parts/icons/layout.js',
 "https://pilot.parts/icons/physical-toy-icon/layout.css?constructor" => 'https://pilot.parts/icons/physical-toy-icon/layout.css.c.js',
 "https://pilot.parts/icons/physical-car-part-icon/?layout" => "https://pilot.parts/icons/physical-car-part-icon/layout.css",
 "https://pilot.parts/icons/physical-car-part-icon/layout.css.c.js" => 'return layout([255, 127, 127, 0.25], \'🚘\', undefined, [0.1, 0.1, 0.1])',
 "https://pilot.parts/icons/physical-car-part-icon/layout.css?layout" => 'https://pilot.parts/icons/layout.js',
 "https://pilot.parts/icons/physical-car-part-icon/layout.css?constructor" => 'https://pilot.parts/icons/physical-car-part-icon/layout.css.c.js',
 "https://pilot.parts/icons/physical-blemish-icon/?layout" => "https://pilot.parts/icons/physical-blemish-icon/layout.css",
 "https://pilot.parts/icons/physical-blemish-icon/layout.css.c.js" => 'return layout([255, 127, 127, 0.25], \'🌋\', undefined, [0.1, 0.1, 0.1])',
 "https://pilot.parts/icons/physical-blemish-icon/layout.css?layout" => 'https://pilot.parts/icons/layout.js',
 "https://pilot.parts/icons/physical-blemish-icon/layout.css?constructor" => 'https://pilot.parts/icons/physical-blemish-icon/layout.css.c.js',
 "https://pilot.parts/icons/kireji-icon/layout.css" => '
  :host {
   --size: 16px;
   width: var(--size);
   height: var(--size);
   font-size: var(--size);
   line-height: var(--size);
  }
  :host::before {
   content: \'🔗\';
  }',
 "https://pilot.parts/icons/kireji-icon/?layout" => 'https://pilot.parts/icons/kireji-icon/layout.css',
 "https://pilot.parts/icons/layout.js" => '
  ([bgr, bgg, bgb, bga = 0.8], c, ext, [r = 0, g = 0, b = 0, a = 1] = []) => {
   return `
    :host {
     --rgb-bg: rgba(${bgr}, ${bgg}, ${bgb}, ${bga});
     --rgb: ${r}, ${g}, ${b};
     --character: \'${c}\';
     --size: 16px;
     --unit: calc(var(--size) / 16);
     color: rgba(var(--rgb), ${a});
     position: relative;
     width: var(--size);
     height: var(--size);
    }
    :host::before,
    :host::after {
     border-radius: calc(var(--size) / 6);
    }
    :host::before {
     content: var(--character);
     font-size: var(--size);
     line-height: var(--size);
    }
    :host::after {
     box-shadow: 0 0 0 var(--unit) rgba(var(--rgb), ${a/2});
     background: var(--rgb-bg);
     position: absolute;
     bottom: var(--unit);
     right: 0;${ext ? `
     content: \'${ext}\';` : ``}
     font: 400 calc(var(--size) / 3) / calc(var(--size) / 3) monospace;
     padding: var(--unit);
    }
   `
  }',
 "https://pilot.parts/icons/domain-icon/layout.css" => '
  :host {
   --size: 16px;
   width: var(--size);
   height: var(--size);
   font-size: var(--size);
   line-height: var(--size);
  }
  :host::before {
   content: \'🗄\';
  }',
 "https://pilot.parts/icons/domain-icon/?layout" => 'https://pilot.parts/icons/domain-icon/layout.css',
 "https://pilot.parts/icons/text-css-icon/layout.css?layout" => 'https://pilot.parts/icons/layout.js',
 "https://pilot.parts/icons/text-css-icon/layout.css?constructor" => 'https://pilot.parts/icons/text-css-icon/layout.css.c.js',
 "https://pilot.parts/icons/text-css-icon/layout.css.c.js" => 'return layout([0, 255, 255], \'\u{1F4C4}\', \'css\')',
 "https://pilot.parts/icons/text-css-icon/?layout" => 'https://pilot.parts/icons/text-css-icon/layout.css',
 "https://pilot.parts/icons/text-html-icon/layout.css?layout" => 'https://pilot.parts/icons/layout.js',
 "https://pilot.parts/icons/text-html-icon/layout.css?constructor" => 'https://pilot.parts/icons/text-html-icon/layout.css.c.js',
 "https://pilot.parts/icons/text-html-icon/layout.css.c.js" => 'return layout([255, 255, 255], \'\u{1F4C4}\', \'html\')',
 "https://pilot.parts/icons/text-html-icon/?layout" => 'https://pilot.parts/icons/text-html-icon/layout.css',
 "https://pilot.parts/icons/text-javascript-icon/layout.css?layout" => 'https://pilot.parts/icons/layout.js',
 "https://pilot.parts/icons/text-javascript-icon/layout.css?constructor" => 'https://pilot.parts/icons/text-javascript-icon/layout.css.c.js',
 "https://pilot.parts/icons/text-javascript-icon/layout.css.c.js" => 'return layout([255, 127, 127, 0.7], \'\u{1F4C4}\', \'js\', [0.4])',
 "https://pilot.parts/icons/text-javascript-icon/?layout" => 'https://pilot.parts/icons/text-javascript-icon/layout.css',
 "https://pilot.parts/icons/text-plain-icon/layout.css" => '
  :host {
   --size: 16px;
   width: var(--size);
   height: var(--size) }
  :host::before {
   content: \'📄\';
   font-size: var(--size);
   line-height: var(--size)
  }',
 "https://pilot.parts/icons/text-plain-icon/?layout" => 'https://pilot.parts/icons/text-plain-icon/layout.css',
 "https://pilot.parts/icons/text-uri-list-icon/layout.css" => '
  :host {
   --rgba: rgba(0, 0, 0, 0.8);
   --character: \'📄\';
   --size: 16px;
   color: #ffff3f;
   position: relative;
   width: 16px;
   height: 16px;
  }
  :host::before,
  :host::after {
   border-radius: calc(var(--size) / 6);
  }
  :host::before {
   content: var(--character);
   font-size: var(--size);
   line-height: var(--size);
  }
  :host::after {
   box-shadow: 0 0 0 calc(var(--size) / 16) #ffff3f;
   background: var(--rgba);
   position: absolute;
   bottom: 0;
   right: 0;
   content: \'uri\';
   font: 400 calc(var(--size) / 3) / calc(var(--size) / 3) monospace;
   padding: calc(var(--size) / 16);
  }',
 "https://pilot.parts/icons/text-uri-list-icon/layout.cs?layout" => 'https://pilot.parts/icons/layout.js',
 "https://pilot.parts/icons/text-uri-list-icon/layout.css?constructor" => 'https://pilot.parts/icons/text-uri-list-icon/layout.css.c.js',
 "https://pilot.parts/icons/text-uri-list-icon/layout.css.c.js" => 'return layout([0, 0, 0], "\u{1F4C4}", "uri", [1, 1, 0.3])',
 "https://pilot.parts/icons/text-uri-list-icon/?layout" => 'https://pilot.parts/icons/text-uri-list-icon/layout.css',
 "https://pilot.parts/letters/capital-f/layout.css" => '
  :host::before {
   content: "F"
  }',
 "https://pilot.parts/letters/capital-f/?layout" => 'https://pilot.parts/letters/capital-f/layout.css',
 "https://pilot.parts/letters/lowercase-e/layout.css" => ':host::before {
   content: "e"
  }',
 "https://pilot.parts/letters/lowercase-e/?layout" => 'https://pilot.parts/letters/lowercase-e/layout.css',
 "https://pilot.parts/letters/lowercase-i/layout.css" => ':host::before {
   content: "i"
  }',
 "https://pilot.parts/letters/lowercase-i/?layout" => 'https://pilot.parts/letters/lowercase-i/layout.css',
 "https://pilot.parts/letters/lowercase-l/layout.css" => ':host::before {
   content: "l"
  }',
 "https://pilot.parts/letters/lowercase-l/?layout" => 'https://pilot.parts/letters/lowercase-l/layout.css',
 "https://pilot.parts/start-menu/open-fx.uri" => 'https://pilot.parts/taskbar/start-button/layout.css https://pilot.parts/taskbar/selected.txt https://pilot.parts/manifest.uri https://pilot.parts/taskbar/start-button/onpointerdown.js',
 "https://pilot.parts/start-menu/open.txt" => '0',
 "https://pilot.parts/start-menu/open.txt?fx" => 'https://pilot.parts/start-menu/open-fx.uri',
 "https://pilot.parts/start-menu/open.txt?selected" => 'https://pilot.parts/taskbar/selected.txt',
 "https://pilot.parts/start-menu/open.txt?constructor" => 'https://pilot.parts/start-menu/open.txt.c.js',
 "https://pilot.parts/start-menu/open.txt.c.js" => 'return ("" + selected) ==="0" ? "1" : "0"',/*
Locate */
 "https://pilot.parts/programs/locate/task/datum.txt" => 'https://pilot.parts/programs/locate/task/',
 "https://pilot.parts/programs/locate/task/index.txt?datum" => 'https://pilot.parts/programs/locate/task/datum.txt',
 "https://pilot.parts/programs/locate/task/index.txt?fx" => 'https://pilot.parts/programs/locate/task/index/fx.uri',
 "https://pilot.parts/programs/locate/task/index.txt?tasks" => 'https://pilot.parts/tasks.uri',
 "https://pilot.parts/programs/locate/task/index.txt?constructor" => 'https://pilot.parts/programs/locate/task/index.txt.c.js',
 "https://pilot.parts/programs/locate/task/index.txt.c.js" => 'return ""+(""+tasks).split(" ").indexOf(""+datum) + 1',
 "https://pilot.parts/programs/locate/task/index/fx.uri" => 'https://pilot.parts/programs/locate/window/active.txt',
 "https://pilot.parts/programs/locate/task/layout.css?open" => 'https://pilot.parts/programs/locate/window/active.txt',
 "https://pilot.parts/programs/locate/task/layout.css?constructor" => 'https://pilot.parts/programs/locate/task/layout.css.c.js',
 "https://pilot.parts/programs/locate/task/layout.css.c.js" => 'return `
  :host {
   position: relative;
   height: 100%;
   margin: 0;
   width: 160px;
   display: flex;
   flex-flow: row nowrap;
   gap: 3px;
   border: none;${("" + open) === "1" ? `
   font: bold 11px sans-serif;` : ""}
   box-sizing: border-box;
   padding: ${("" + open) === "0" ? 3 : 4}px 2px 2px;
   text-align: left;
   box-shadow: ${("" + open) === "0" ? "inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb" : "inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a"}
  }
  :host(:focus)::after {
   border: 1px dotted black;
   content: "";
   position: absolute;
   margin: 3px;
   left: 0;
   right: 0;
   top: 0;
   bottom: 0;
   pointer-events: none;
  }${("" + open) === "1" ? `
  :host > * {
   z-index: 3
  }
  :host::before {
   content: "";
   position: absolute;
   margin: 2px;
   border-top: 1px solid white;
   left: 0;
   right: 0;
   top: 0;
   bottom: 0;
   background-image:
    linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white),
    linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white);
   background-size: 2px 2px;background-position: 0 0, 1px 1px;
  }` : ``}
  app-icon {
   width: 16px;
   height: 16px;
  }`',
 "https://pilot.parts/programs/locate/task/manifest.uri" => 'https://pilot.parts/icons/folder-icon/ https://pilot.parts/programs/locate/app-label/',
 "https://pilot.parts/programs/locate/task/manifest.uri?open" => 'https://pilot.parts/programs/locate/window/active.txt',
 "https://pilot.parts/programs/locate/task/onpointerdown.js?minimized" => 'https://pilot.parts/programs/locate/window/minimized.txt',
 "https://pilot.parts/programs/locate/task/onpointerdown.js?active" => 'https://pilot.parts/programs/locate/window/active.txt',
 "https://pilot.parts/programs/locate/task/onpointerdown.js?task" => 'https://pilot.parts/programs/locate/task/',
 "https://pilot.parts/programs/locate/task/onpointerdown.js?window" => 'https://pilot.parts/programs/locate/window/',
 "https://pilot.parts/programs/locate/task/onpointerdown.js?core" => 'https://pilot.parts/programs/relate/task/onpointerdown.js',
 "https://pilot.parts/programs/locate/task/open/fx.uri" => 'https://pilot.parts/programs/locate/task/layout.css https://pilot.parts/taskbar/selected.txt https://pilot.parts/programs/locate/window/layout.css https://pilot.parts/programs/locate/task/onpointerdown.js',
 "https://pilot.parts/programs/locate/task/?layout" => 'https://pilot.parts/programs/locate/task/layout.css',
 "https://pilot.parts/programs/locate/task/?manifest" => 'https://pilot.parts/programs/locate/task/manifest.uri',
 "https://pilot.parts/programs/locate/task/?onpointerdown" => 'https://pilot.parts/programs/locate/task/onpointerdown.js',
 "https://pilot.parts/programs/locate/app-label/layout.css?address" => 'https://pilot.parts/programs/locate/window/address.uri',
 "https://pilot.parts/programs/locate/app-label/layout.css?constructor" => 'https://pilot.parts/programs/locate/app-label/layout.css.c.js',
 "https://pilot.parts/programs/locate/app-label/layout.css.c.js" => 'return `
  :host {
   margin: 0;
   height: 16px;
   vertical-align: center;
   text-overflow: ellipsis;
   overflow: clip;
  }
  :host::after {
   content: "Locate - ${address}";
   white-space: nowrap;
  }`',
 "https://pilot.parts/programs/locate/app-label/?layout" => 'https://pilot.parts/programs/locate/app-label/layout.css',
 "https://pilot.parts/programs/locate/start-menu-item/app-label/layout.css" => ':host::after {
    height: 24px;
    content: "Locate";
   }',
 "https://pilot.parts/programs/locate/start-menu-item/app-label/?layout" => 'https://pilot.parts/programs/locate/start-menu-item/app-label/layout.css',
 "https://pilot.parts/programs/locate/start-menu-item/layout.css" => '
   :host {
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 4px 0 }
   :host(:hover) {
    background: #00007f;
    color: white }
   folder-icon {
    width: 24px;
    height: 24px;
    margin: 0 10px;
    --size: 24px;
   }',
 "https://pilot.parts/programs/locate/start-menu-item/manifest.uri" => 'https://pilot.parts/icons/folder-icon/ https://pilot.parts/programs/locate/start-menu-item/app-label/',
 "https://pilot.parts/programs/locate/start-menu-item/?layout" => 'https://pilot.parts/programs/locate/start-menu-item/layout.css',
 "https://pilot.parts/programs/locate/start-menu-item/?manifest" => 'https://pilot.parts/programs/locate/start-menu-item/manifest.uri',
 "https://pilot.parts/programs/locate/start-menu-item/?onclick" => 'https://pilot.parts/programs/locate/task/onpointerdown.js',
 "https://pilot.parts/programs/locate/window/active.txt" => '0',
 "https://pilot.parts/programs/locate/window/active.txt?fx" => 'https://pilot.parts/programs/locate/task/open/fx.uri',
 "https://pilot.parts/programs/locate/window/active.txt?index" => 'https://pilot.parts/programs/locate/task/index.txt',
 "https://pilot.parts/programs/locate/window/active.txt?minimized" => 'https://pilot.parts/programs/locate/window/minimized.txt',
 "https://pilot.parts/programs/locate/window/active.txt?selected" => 'https://pilot.parts/taskbar/selected.txt',
 "https://pilot.parts/programs/locate/window/active.txt?constructor" => 'https://pilot.parts/programs/locate/window/active.txt.c.js',
 "https://pilot.parts/programs/locate/window/active.txt.c.js" => 'return ("" + minimized) === "1" ? "0" : ("" + selected) === ("" + index) ? "1" : "0"',
 "https://pilot.parts/programs/locate/window/controls/exit-button/down-fx.uri" => 'https://pilot.parts/programs/locate/window/controls/exit-button/layout.css',
 "https://pilot.parts/programs/locate/window/controls/exit-button/down.txt" => '0',
 "https://pilot.parts/programs/locate/window/controls/exit-button/down.txt?fx" => 'https://pilot.parts/programs/locate/window/controls/exit-button/down-fx.uri',
 "https://pilot.parts/programs/locate/window/controls/exit-button/layout.css?down" => 'https://pilot.parts/programs/locate/window/controls/exit-button/down.txt',
 "https://pilot.parts/programs/locate/window/controls/exit-button/layout.css?constructor" => 'https://pilot.parts/programs/locate/window/controls/exit-button/layout.css.c.js',
 "https://pilot.parts/programs/locate/window/controls/exit-button/layout.css.c.js" => 'return `
    :host {
     position: relative;
     width: 16px;
     height: 14px;
     background: #c3c3c3;
     margin-left: 2px;
     box-shadow: ${(""+down) === \'1\' ? \'inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a\' : \'inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb\'}
    }
    :host::before, :host::after {
     --color: black;
     content: "";
     display: block;
     position: absolute;
     width: 8px;
     height: 7px;
     left: 4px;
     top: 3px;
     background: linear-gradient(to top left, transparent 0%, transparent calc(50% - 1px), var(--color) calc(50% - 1px), var(--color) calc(50% + 1px),  transparent calc(50% + 1px),  transparent 100%), linear-gradient(to top right,  transparent 0%,  transparent calc(50% - 1px), var(--color) calc(50% - 1px), var(--color) calc(50% + 1px),  transparent calc(50% + 1px),  transparent 100%);
    }
    :host(:hover)::before {
     --color: blue
    }`',
 "https://pilot.parts/programs/locate/window/controls/exit-button/onclick.js?constructor" => 'https://core.parts/behaviors/window-close.c.js',
 "https://pilot.parts/programs/locate/window/controls/exit-button/onclick.js?window" => 'https://pilot.parts/programs/locate/window/',
 "https://pilot.parts/programs/locate/window/controls/exit-button/onclick.js?task" => 'https://pilot.parts/programs/locate/task/',
 "https://pilot.parts/programs/locate/window/controls/exit-button/onpointerdown.js" => 'e => { e.stopPropagation(); _[\'https://pilot.parts/programs/locate/window/controls/exit-button/down.txt\'] = \'1\'; _[\'https://core.parts/behaviors/release/src.uri\'] = \'https://pilot.parts/programs/locate/window/controls/exit-button/release.js\'
    }',
 "https://pilot.parts/programs/locate/window/controls/exit-button/release.js" => 'e => { _[\'https://pilot.parts/programs/locate/window/controls/exit-button/down.txt\'] = \'0\'
    }',
 "https://pilot.parts/programs/locate/window/controls/exit-button/?layout" => 'https://pilot.parts/programs/locate/window/controls/exit-button/layout.css',
 "https://pilot.parts/programs/locate/window/controls/exit-button/?onclick" => 'https://pilot.parts/programs/locate/window/controls/exit-button/onclick.js',
 "https://pilot.parts/programs/locate/window/controls/exit-button/?onpointerdown" => 'https://pilot.parts/programs/locate/window/controls/exit-button/onpointerdown.js',
 "https://pilot.parts/programs/locate/window/controls/maximize-button/down-fx.uri" => 'https://pilot.parts/programs/locate/window/controls/maximize-button/layout.css',
 "https://pilot.parts/programs/locate/window/controls/maximize-button/down.txt" => '0',
 "https://pilot.parts/programs/locate/window/controls/maximize-button/down.txt?fx" => 'https://pilot.parts/programs/locate/window/controls/maximize-button/down-fx.uri',
 "https://pilot.parts/programs/locate/window/controls/maximize-button/layout.css?down" => 'https://pilot.parts/programs/locate/window/controls/maximize-button/down.txt',
 "https://pilot.parts/programs/locate/window/controls/maximize-button/layout.css?constructor" => 'https://pilot.parts/programs/locate/window/controls/maximize-button/layout.css.c.js',
 "https://pilot.parts/programs/locate/window/controls/maximize-button/layout.css.c.js" => 'return `:host {
    position: relative;
    width: 16px;
    height: 14px;
    background: #c3c3c3;
    box-shadow: ${(\'\'+down) === \'1\' ? \'inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a\' : \'inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb\'}
   }
   :host::before {
    --color: black;
    display: block;
    position: absolute;
    content: \'\';
    width: 9px;
    height: 9px;
    top: 2px;
    left: 3px;
    box-shadow: inset 0 2px var(--color), inset 0 0 0 1px var(--color)
   }
   :host(:hover)::before {
    --color: blue }`',
 "https://pilot.parts/programs/locate/window/controls/maximize-button/manifest.uri" => '',
 "https://pilot.parts/programs/locate/window/controls/maximize-button/onclick.js" => '
   () => {
    _[\'https://pilot.parts/programs/locate/window/maximized.txt\'] = \'1\'
   }',
 "https://pilot.parts/programs/locate/window/controls/maximize-button/onpointerdown.js" => 'e => { e.stopPropagation(); _[\'https://pilot.parts/programs/locate/window/controls/maximize-button/down.txt\'] = \'1\'; _[\'https://core.parts/behaviors/release/src.uri\'] = \'https://pilot.parts/programs/locate/window/controls/maximize-button/release.js\'
   }',
 "https://pilot.parts/programs/locate/window/controls/maximize-button/release.js" => 'e => { _[\'https://pilot.parts/programs/locate/window/controls/maximize-button/down.txt\'] = \'0\'
   }',
 "https://pilot.parts/programs/locate/window/controls/maximize-button/?layout" => 'https://pilot.parts/programs/locate/window/controls/maximize-button/layout.css',
 "https://pilot.parts/programs/locate/window/controls/maximize-button/?manifest" => 'https://pilot.parts/programs/locate/window/controls/maximize-button/manifest.uri',
 "https://pilot.parts/programs/locate/window/controls/maximize-button/?onclick" => 'https://pilot.parts/programs/locate/window/controls/maximize-button/onclick.js',
 "https://pilot.parts/programs/locate/window/controls/maximize-button/?onpointerdown" => 'https://pilot.parts/programs/locate/window/controls/maximize-button/onpointerdown.js',
 "https://pilot.parts/programs/locate/window/controls/minimize-button/down-fx.uri" => 'https://pilot.parts/programs/locate/window/controls/minimize-button/layout.css',
 "https://pilot.parts/programs/locate/window/controls/minimize-button/down.txt" => '0',
 "https://pilot.parts/programs/locate/window/controls/minimize-button/down.txt?fx" => 'https://pilot.parts/programs/locate/window/controls/minimize-button/down-fx.uri',
 "https://pilot.parts/programs/locate/window/controls/minimize-button/layout.css?down" => 'https://pilot.parts/programs/locate/window/controls/minimize-button/down.txt',
 "https://pilot.parts/programs/locate/window/controls/minimize-button/layout.css?constructor" => 'https://pilot.parts/programs/locate/window/controls/minimize-button/layout.css.c.js',
 "https://pilot.parts/programs/locate/window/controls/minimize-button/layout.css.c.js" => 'return `
  :host {
   position: relative;
   width: 16px;
   height: 14px;
   background: #c3c3c3;
   box-shadow: ${(""+down) === \'1\' ? \'inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a\' : \'inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb\'}
  }
  :host::before {
   --color: black;
   display: block;
   position: absolute;
   content: "";
   width: 6px;
   height: 2px;
   background: var(--color);
   top: 9px;
   left: 4px }
  :host(:hover)::before {
   --color: blue
  }`',
 "https://pilot.parts/programs/locate/window/controls/minimize-button/onclick.js" => '()=>{_[\'https://pilot.parts/programs/locate/window/minimized.txt\'] = \'1\'
  }',
 "https://pilot.parts/programs/locate/window/controls/minimize-button/onpointerdown.js" => 'e => { e.stopPropagation(); _[\'https://pilot.parts/programs/locate/window/controls/minimize-button/down.txt\'] = \'1\'; _[\'https://core.parts/behaviors/release/src.uri\'] = \'https://pilot.parts/programs/locate/window/controls/minimize-button/release.js\'
  }',
 "https://pilot.parts/programs/locate/window/controls/minimize-button/release.js" => 'e => { _[\'https://pilot.parts/programs/locate/window/controls/minimize-button/down.txt\'] = \'0\'
  }',
 "https://pilot.parts/programs/locate/window/controls/minimize-button/?layout" => 'https://pilot.parts/programs/locate/window/controls/minimize-button/layout.css',
 "https://pilot.parts/programs/locate/window/controls/minimize-button/?onclick" => 'https://pilot.parts/programs/locate/window/controls/minimize-button/onclick.js',
 "https://pilot.parts/programs/locate/window/controls/minimize-button/?onpointerdown" => 'https://pilot.parts/programs/locate/window/controls/minimize-button/onpointerdown.js',
 "https://pilot.parts/programs/locate/window/controls/restore-button/down-fx.uri" => 'https://pilot.parts/programs/locate/window/controls/restore-button/layout.css',
 "https://pilot.parts/programs/locate/window/controls/restore-button/down.txt" => '0',
 "https://pilot.parts/programs/locate/window/controls/restore-button/down.txt?fx" => 'https://pilot.parts/programs/locate/window/controls/restore-button/down-fx.uri',
 "https://pilot.parts/programs/locate/window/controls/restore-button/layout.css?down" => 'https://pilot.parts/programs/locate/window/controls/restore-button/down.txt',
 "https://pilot.parts/programs/locate/window/controls/restore-button/layout.css?constructor" => 'https://pilot.parts/programs/locate/window/controls/restore-button/layout.css.c.js',
 "https://pilot.parts/programs/locate/window/controls/restore-button/layout.css.c.js" => 'return `:host {
   position: relative;
   width: 16px;
   height: 14px;
   background: #c3c3c3;
   box-shadow: ${(""+down) === \'1\' ? \'inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a\' : \'inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb\'}
  }
  :host::before, :host::after {
   --color: black;
   display: block;
   position: absolute;
   content: "";
   width: 6px;
   height: 6px;
   top: 5px;
   left: 3px;
   box-shadow: inset 0 2px var(--color), inset 0 0 0 1px var(--color);
   background: #c3c3c3 }
  :host::before {
   top: 2px;
   left: 5px }
  :host(:hover)::before, :host(:hover)::after {
   --color: blue }`',
 "https://pilot.parts/programs/locate/window/controls/restore-button/onclick.js" => '()=>_[\'https://pilot.parts/programs/locate/window/maximized.txt\'] = \'0\'',
 "https://pilot.parts/programs/locate/window/controls/restore-button/onpointerdown.js" => 'e => { e.stopPropagation(); _[\'https://pilot.parts/programs/locate/window/controls/restore-button/down.txt\'] = \'1\'; _[\'https://core.parts/behaviors/release/src.uri\'] = \'https://pilot.parts/programs/locate/window/controls/restore-button/release.js\'
  }',
 "https://pilot.parts/programs/locate/window/controls/restore-button/release.js" => 'e => { _[\'https://pilot.parts/programs/locate/window/controls/restore-button/down.txt\'] = \'0\'
  }',
 "https://pilot.parts/programs/locate/window/controls/restore-button/?layout" => 'https://pilot.parts/programs/locate/window/controls/restore-button/layout.css',
 "https://pilot.parts/programs/locate/window/controls/restore-button/?onclick" => 'https://pilot.parts/programs/locate/window/controls/restore-button/onclick.js',
 "https://pilot.parts/programs/locate/window/controls/restore-button/?onpointerdown" => 'https://pilot.parts/programs/locate/window/controls/restore-button/onpointerdown.js',
 "https://pilot.parts/programs/locate/window/controls/layout.css" => '
  :host {
   display: flex;
   flex-flow: row nowrap
  }',
 "https://pilot.parts/programs/locate/window/controls/manifest.uri?maximized" => 'https://pilot.parts/programs/locate/window/maximized.txt',
 "https://pilot.parts/programs/locate/window/controls/manifest.uri?constructor" => 'https://pilot.parts/programs/locate/window/controls/manifest.uri.c.js',
 "https://pilot.parts/programs/locate/window/controls/manifest.uri.c.js" => 'return `https://pilot.parts/programs/locate/window/controls/minimize-button/ https://pilot.parts/programs/locate/window/controls/${(""+maximized) === \'1\' ? \'restore\' : \'maximize\'}-button/ https://pilot.parts/programs/locate/window/controls/exit-button/`',
 "https://pilot.parts/programs/locate/window/controls/?layout" => 'https://pilot.parts/programs/locate/window/controls/layout.css',
 "https://pilot.parts/programs/locate/window/controls/?manifest" => 'https://pilot.parts/programs/locate/window/controls/manifest.uri',
 "https://pilot.parts/programs/locate/window/layout.css?active" => 'https://pilot.parts/programs/locate/window/active.txt',
 "https://pilot.parts/programs/locate/window/layout.css?maximized" => 'https://pilot.parts/programs/locate/window/maximized.txt',
 "https://pilot.parts/programs/locate/window/layout.css?position" => 'https://pilot.parts/programs/locate/window/position.json',
 "https://pilot.parts/programs/locate/window/layout.css?constructor" => 'https://pilot.parts/programs/locate/window/layout.css.c.js',
 "https://pilot.parts/programs/locate/window/layout.css.c.js" => '
  const
   common = `
    position: absolute;
    display: flex;
    flex-flow: column nowrap;
    gap: 2px;
    background: #c3c3c3;
    box-sizing: border-box;`,
   titlebar = ("" + active) === "1" ? `title-bar {
    background: rgb(0, 0, 163);
   }` : ``;     
  if (("" + maximized) === "1") {
   return `
    :host {
     position: absolute;
     top: 0;
     left: 0;
     right: 0;
     bottom: 28px;
     padding: 2px;
     ${common};
    }
    ${titlebar}
   `
  } else {
   const { x = 0, y = 0, w = 0, h = 0 } = JSON.parse("" + position);
   return `
    :host {
     width: ${w}px;
     height: ${h}px;
     left: ${x}px;
     top: ${y}px;
     min-height: fit-content;
     padding: 4px;
     background: #c3c3c3;
     box-shadow:
      inset -1px -1px black,
      inset 1px 1px #c3c3c3,
      inset -2px -2px #7a7a7a,
      inset 2px 2px white,
      5px 7px 3px #0002;
     ${common};
    }
    ${titlebar}
   `
  }',
 "https://pilot.parts/programs/locate/window/manifest.uri?title" => 'https://pilot.parts/programs/locate/window/title-bar/',
 "https://pilot.parts/programs/locate/window/manifest.uri?tools" => 'https://pilot.parts/programs/locate/window/tool-bar/',
 "https://pilot.parts/programs/locate/window/manifest.uri?explorer" => 'https://pilot.parts/programs/locate/window/explorer-view/',
 "https://pilot.parts/programs/locate/window/manifest.uri?status" => 'https://pilot.parts/programs/locate/window/status/',
 "https://pilot.parts/programs/locate/window/manifest.uri?transform_path" => 'https://pilot.parts/programs/locate/window/transform/',
 "https://pilot.parts/programs/locate/window/manifest.uri?transform" => 'https://core.parts/components/transform/construct.js',
 "https://pilot.parts/programs/locate/window/manifest.uri?position" => 'https://pilot.parts/programs/locate/window/position.json',
 "https://pilot.parts/programs/locate/window/manifest.uri?constructor" => 'https://pilot.parts/programs/locate/window/manifest.uri.c.js',
 "https://pilot.parts/programs/locate/window/manifest.uri.c.js" => <<<JS
  const [title_url, tools_url, explorer_url, status_url, transform_url, position_url] = [title, tools, explorer, status, transform_path, position].map(x => x.headerOf().href)
  const transform_urls = transform(transform_url, position_url, "nesw", title_url);
  return [title_url, tools_url, explorer_url, status_url, transform_urls].join(" ")
  JS,
 "https://pilot.parts/programs/locate/window/maximized.txt" => '0',
 "https://pilot.parts/programs/locate/window/maximized.txt?fx" => 'https://pilot.parts/programs/locate/window/maximized/fx.uri',
 "https://pilot.parts/programs/locate/window/maximized/fx.uri" => 'https://pilot.parts/programs/locate/window/layout.css https://pilot.parts/programs/locate/window/controls/manifest.uri https://pilot.parts/programs/locate/window/title-bar/ondblclick.js',
 "https://pilot.parts/programs/locate/window/minimized.txt" => '0',
 "https://pilot.parts/programs/locate/window/minimized.txt?fx" => 'https://pilot.parts/programs/locate/window/minimized/fx.uri',
 "https://pilot.parts/programs/locate/window/minimized/fx.uri" => 'https://pilot.parts/manifest.uri https://pilot.parts/programs/locate/window/active.txt https://pilot.parts/programs/locate/task/onpointerdown.js',
 "https://pilot.parts/programs/locate/window/onfocus.js?active" => 'https://pilot.parts/programs/locate/window/active.txt',
 "https://pilot.parts/programs/locate/window/onfocus.js?window" => 'https://pilot.parts/programs/locate/window/',
 "https://pilot.parts/programs/locate/window/onfocus.js?core" => 'https://pilot.parts/programs/relate/window/onfocus.js',
 "https://pilot.parts/programs/locate/window/position.json" => '
  {
   "x": 136, "y": 118, "w": 412, "h": 245,
   "range": {
    "x": [-64, 512],
    "y": [-2, 256],
    "w": [96, 256],
    "h": [64, 128]
   }
  }',
 "https://pilot.parts/programs/locate/window/position.json?fx" => 'https://pilot.parts/programs/locate/window/position/fx.uri',
 "https://pilot.parts/programs/locate/window/position/fx.uri" => 'https://pilot.parts/programs/locate/window/layout.css',
 "https://pilot.parts/programs/locate/window/sort-order-fx.uri" => 'https://pilot.parts/programs/locate/window/explorer-view/files/manifest.uri https://pilot.parts/programs/locate/window/explorer-view/header/manifest.uri https://pilot.parts/programs/locate/window/explorer-view/header/manifest-fx.uri',
 "https://pilot.parts/programs/locate/window/sort_order.json" => '
  {
   "size": false,
   "type": true,
   "name": false
  }',
 "https://pilot.parts/programs/locate/window/sort_order.json?fx" => 'https://pilot.parts/programs/locate/window/sort-order-fx.uri',
 "https://pilot.parts/programs/locate/window/title-bar/layout.css" => '
  :host {
   background: #7f7f7f;
   color: white;
   display: flex;
   flex-flow: row nowrap;
   align-items: center;
   gap: 3px;
   height: 18px;
   padding: 0px 2px;
   box-sizing: border-box;
  }
  app-icon {
   width: 16px;
   height: 16px
  }',
 "https://pilot.parts/programs/locate/window/title-bar/manifest.uri" => 'https://pilot.parts/icons/folder-icon/ https://pilot.parts/programs/locate/app-label/ https://core.parts/flex-spacer/ https://pilot.parts/programs/locate/window/controls/',
 "https://pilot.parts/programs/locate/window/title-bar/ondblclick.js?maximized" => 'https://pilot.parts/programs/locate/window/maximized.txt',
 "https://pilot.parts/programs/locate/window/title-bar/ondblclick.js?constructor" => 'https://pilot.parts/programs/locate/window/title-bar/ondblclick.c.js',
 "https://pilot.parts/programs/locate/window/title-bar/ondblclick.c.js" => 'return `() => { _[\'https://pilot.parts/programs/locate/window/controls/${(""+maximized) === \'1\' ? \'restore\' : \'maximize\'}-button/onclick.js\']() }`',
 "https://pilot.parts/programs/locate/window/title-bar/?layout" => 'https://pilot.parts/programs/locate/window/title-bar/layout.css',
 "https://pilot.parts/programs/locate/window/title-bar/?manifest" => 'https://pilot.parts/programs/locate/window/title-bar/manifest.uri',
 "https://pilot.parts/programs/locate/window/title-bar/?ondblclick" => 'https://pilot.parts/programs/locate/window/title-bar/ondblclick.js',
 "https://pilot.parts/programs/locate/window/?layout" => 'https://pilot.parts/programs/locate/window/layout.css',
 "https://pilot.parts/programs/locate/window/?manifest" => 'https://pilot.parts/programs/locate/window/manifest.uri',
 "https://pilot.parts/programs/locate/window/?onfocus" => 'https://pilot.parts/programs/locate/window/onfocus.js',
 "https://pilot.parts/programs/locate/window/address-fx.uri" => 'https://pilot.parts/programs/locate/window/explorer-view/files/manifest.uri https://pilot.parts/programs/locate/app-label/layout.css',
 "https://pilot.parts/programs/locate/window/address.uri" => 'https://kireji.app/demo/',
 "https://pilot.parts/programs/locate/window/address.uri?fx" => 'https://pilot.parts/programs/locate/window/address-fx.uri',
 "https://pilot.parts/programs/locate/window/explorer-view/column-fx.uri" => 'https://pilot.parts/programs/locate/window/explorer-view/header/layout.css https://pilot.parts/programs/locate/window/explorer-view/files/layout.css',
 "https://pilot.parts/programs/locate/window/explorer-view/files/layout.css?name_width" => 'https://pilot.parts/programs/locate/window/explorer-view/header/name-button/position.json',
 "https://pilot.parts/programs/locate/window/explorer-view/files/layout.css?type_width" => 'https://pilot.parts/programs/locate/window/explorer-view/header/type-button/position.json',
 "https://pilot.parts/programs/locate/window/explorer-view/files/layout.css?size_width" => 'https://pilot.parts/programs/locate/window/explorer-view/header/size-button/position.json',
 "https://pilot.parts/programs/locate/window/explorer-view/files/layout.css?constructor" => 'https://pilot.parts/programs/locate/window/explorer-view/files/layout.css.c.js',
 "https://pilot.parts/programs/locate/window/explorer-view/files/layout.css.c.js" => 'return `
  :host {
   position: relative;
   display: grid;
   grid-template-columns: ${JSON.parse(""+name_width).w}px ${JSON.parse("" + type_width).w}px ${JSON.parse("" + size_width).w}px;
   grid-auto-rows: 18px;
   flex: 1 1;
   overflow: auto;
  }`',
 "https://pilot.parts/programs/locate/window/explorer-view/files/manifest.uri?address" => 'https://pilot.parts/programs/locate/window/address.uri',
 "https://pilot.parts/programs/locate/window/explorer-view/files/manifest.uri?cell" => 'https://core.parts/components/cell/construct.js',
 "https://pilot.parts/programs/locate/window/explorer-view/files/manifest.uri?click" => 'https://core.parts/components/click/construct.js',
 "https://pilot.parts/programs/locate/window/explorer-view/files/manifest.uri?fx" => 'https://pilot.parts/programs/locate/window/status/fx.uri',
 "https://pilot.parts/programs/locate/window/explorer-view/files/manifest.uri?header_json" => 'https://pilot.parts/programs/locate/window/explorer-view/header/list.json',
 "https://pilot.parts/programs/locate/window/explorer-view/files/manifest.uri?show_kireji" => 'https://pilot.parts/programs/locate/window/explorer-view/show_kireji.txt',
 "https://pilot.parts/programs/locate/window/explorer-view/files/manifest.uri?label_css" => 'https://pilot.parts/programs/locate/window/explorer-view/label_css.js',
 "https://pilot.parts/programs/locate/window/explorer-view/label_css.js" => 'x => `:host { overflow: clip; text-overflow: ellipsis; line-height: 18px } :host::before { content: "${x}" }`',
 "https://pilot.parts/programs/locate/window/explorer-view/files/manifest.uri?item_layout" => 'https://pilot.parts/programs/locate/window/explorer-view/item_layout.css',
 "https://pilot.parts/programs/locate/window/explorer-view/item_layout.css" => '
  :host {
   position: relative;
   display: flex;
   flex-flow: row nowrap;
   align-items: center;
   padding: 2px 0;
   overflow: clip;
   box-sizing: border-box;
   padding-right: 6px;
  }
  :host>:first-child {
   --size: 16px;
   margin-right: 4px
  }
  :host(:focus) {
   background: silver;
   width: min-content;
   background: #00007f;
   color: white;
   outline: 1px dotted black;
  }',
 "https://pilot.parts/programs/locate/window/explorer-view/files/manifest.uri?sort_order" => 'https://pilot.parts/programs/locate/window/sort_order.json',
 "https://pilot.parts/programs/locate/window/explorer-view/files/manifest.uri?constructor" => 'https://pilot.parts/programs/locate/window/explorer-view/files/manifest.uri.c.js',
 "https://pilot.parts/programs/locate/window/explorer-view/files/manifest.uri.c.js" => '
  const
   browse_url = "" + address, icon_urlbase = "https://pilot.parts/icons/", fileurlbase = υ.replace(/\/manifest.uri$/, "/file"), file_list = [], url_list = [], O = JSON.parse(sort_order), K = Object.keys(O), header = JSON.parse(header_json),
   file_urls = Object.keys(Δ).filter(url => (url !== browse_url) && url.startsWith(browse_url)).map(x => x.replace(browse_url, "").includes("/") ? x.slice(0, browse_url.length + x.replace(browse_url, "").indexOf("/") + 1) : x);
  file_urls.push(...file_urls.filter(x => x.includes("?") && x.split("?")[0] !== browse_url).map(x =>x.split("?")[0]));
  const filenames = [...new Set(file_urls)].map(url => [url, url.replace(browse_url, "")])
  let kireji_count = 0, folder_count = 0, file_count = 0;
  for (const [url, name, i] of filenames) {
   if (name.includes("?") && ("" + show_kireji === "0")) continue;
   const
    proxy = _[url],
    groups = proxy.headerOf().groups,
    row_type = url.match(/\?[\w\d_$]+$/)
    ? (kireji_count++, "kireji") : url.endsWith("/")
    ? (folder_count++, url.match(/[^:]\/$/)
       ? url.match(/^https:\/\/[\w\d]+\.[\w\d]{2,}\/$/)
       ? "domain" : "folder" :
         "protocol" )
    : (file_count++, groups.type),
    is_index = ["folder", "domain", "protocol"].includes(row_type),
    row_data = {
     ...groups,
     size: groups.size,
     entry_size: groups.entry_size,
     name,
     url,
     manifest: [],
     type: row_type,
     size_label: is_index ? "--" : groups.size + " byte" + (groups.size === 1 ? "" : "s")
    },
    item_url = fileurlbase + hash(url) + "-",
    label_url = item_url + "app-label/",
    icontag = row_data.type.replace(/[^a-zA-Z0-9]+/g, "-") + "-icon",
    icon_url = icon_urlbase + icontag + "/",
    item_manifest = icon_url + " " + label_url,
    focus_item_url = item_url + "onfocus.js",
    open_item_url = item_url + "open.js";
   
   _[focus_item_url] = `() => { [...nodePool["${item_url + "name/"}"]].find(x => x.isConnected).focus() }`
   _[open_item_url] = `() => { ${is_index ? `_["https://pilot.parts/programs/locate/window/address.uri"] = "${url + (row_data.type === "protocol" ? "/": "")}"` : `
    _["https://pilot.parts/programs/relate/window/address.uri"] = "${url + (row_data.type === "protocol" ? "/": "")}";
    _["https://pilot.parts/programs/relate/task/onpointerdown.js"]();
    [...nodePool["https://pilot.parts/programs/relate/window/"]].find(x => x.isConnected).focus()
   `} }`
   for (const key in header) {
    const keyurl = item_url + key + "/";
    _[keyurl + "?onfocus"] = focus_item_url
    row_data.manifest.push(keyurl)
    if (key === "name") {
     cell(label_url, label_css(["folder", "domain"].includes(row_data.type) ? name.slice(0, -1) : name))
     cell(keyurl, ""+item_layout, item_manifest)
     _[keyurl + "?oncontextmenu"] = keyurl + "oncontextmenu.js";
     _[keyurl + "oncontextmenu.js"] = `({ clientX: x, clientY: y }) =>{ _["https://pilot.parts/context-menu/position.json"] = JSON.stringify({ x, y }); _["https://pilot.parts/context-menu/open.txt"] = "1" }`
    } else {
     cell(keyurl, label_css(row_data[key + (key === "size" ? "_label" : "")]))
    }
    click(keyurl, undefined, open_item_url)
   }
   file_list.push(row_data)
  }
  _["https://pilot.parts/programs/locate/window/status/file_count.txt"] = file_count
  _["https://pilot.parts/programs/locate/window/status/folder_count.txt"] = folder_count
  _["https://pilot.parts/programs/locate/window/status/kireji_count.txt"] = kireji_count
  file_list.sort((a, b) => {
   const c = (((a[K[0]] > b[K[0]]) === O[K[0]]) ? 1 : (a[K[0]] === b[K[0]] ? (((a[K[1]] > b[K[1]]) === O[K[1]]) ? 1 : (a[K[1]] === b[K[1]] ? (((a[K[2]] > b[K[2]]) === O[K[2]]) ? 1 : (a[K[2]] === b[K[2]] ? 0 : -1)) : -1)) : -1))
   return c;
  })
  url_list.push(...file_list.map(({ manifest }) => manifest).flat())
  return url_list.join(" ")',
 "https://pilot.parts/programs/locate/window/explorer-view/files/?layout" => 'https://pilot.parts/programs/locate/window/explorer-view/files/layout.css',
 "https://pilot.parts/programs/locate/window/explorer-view/files/?manifest" => 'https://pilot.parts/programs/locate/window/explorer-view/files/manifest.uri',
 "https://pilot.parts/programs/locate/window/explorer-view/header/layout.css?name_width" => 'https://pilot.parts/programs/locate/window/explorer-view/header/name-button/position.json',
 "https://pilot.parts/programs/locate/window/explorer-view/header/layout.css?type_width" => 'https://pilot.parts/programs/locate/window/explorer-view/header/type-button/position.json',
 "https://pilot.parts/programs/locate/window/explorer-view/header/layout.css?size_width" => 'https://pilot.parts/programs/locate/window/explorer-view/header/size-button/position.json',
 "https://pilot.parts/programs/locate/window/explorer-view/header/layout.css?constructor" => 'https://pilot.parts/programs/locate/window/explorer-view/header/layout.css.c.js',
 "https://pilot.parts/programs/locate/window/explorer-view/header/layout.css.c.js" => 'return `:host {
   display: grid;
   width: 100%;
   grid-template-columns: ${JSON.parse(""+name_width).w}px ${JSON.parse("" + type_width).w}px ${JSON.parse("" + size_width).w}px 1fr;
  }`',
 "https://pilot.parts/programs/locate/window/explorer-view/header/manifest.uri?button" => 'https://core.parts/components/button/construct.js',
 "https://pilot.parts/programs/locate/window/explorer-view/header/manifest.uri?fx" => 'https://pilot.parts/programs/locate/window/explorer-view/header/manifest-fx.uri',
 "https://pilot.parts/programs/locate/window/explorer-view/header/manifest-fx.uri?sort_order" => 'https://pilot.parts/programs/locate/window/sort_order.json',
 "https://pilot.parts/programs/locate/window/explorer-view/header/manifest-fx.uri?constructor" => 'https://pilot.parts/programs/locate/window/explorer-view/header/manifest-fx.uri.c.js',
 "https://pilot.parts/programs/locate/window/explorer-view/header/manifest-fx.uri.c.js" => 'return Object.keys(JSON.parse(""+sort_order)).map(key => `https://pilot.parts/programs/locate/window/explorer-view/header/${key}-button/layout.css`).join(" ")',
 "https://pilot.parts/programs/locate/window/explorer-view/header/manifest.uri?headers" => 'https://pilot.parts/programs/locate/window/explorer-view/header/list.json',
 "https://pilot.parts/programs/locate/window/explorer-view/header/manifest.uri?item_layout" => 'https://pilot.parts/programs/locate/window/explorer-view/header/item_layout.css',
 "https://pilot.parts/programs/locate/window/explorer-view/header/item_layout.css" => '
  :host {
   position: relative;
   width: 100%;
   text-overflow: ellipsis;
   overflow: clip;
   white-space: nowrap;
   line-height: 18px;
  }
  :host::before {
   vertical-align: center;
   margin-left: 6px;
   width: calc(100% - 22px);
  }',
 "https://pilot.parts/programs/locate/window/explorer-view/header/manifest.uri?sort_order" => 'https://pilot.parts/programs/locate/window/sort_order.json',
 "https://pilot.parts/programs/locate/window/explorer-view/header/manifest.uri?constructor" => 'https://pilot.parts/programs/locate/window/explorer-view/header/manifest.uri.c.js',
 "https://pilot.parts/programs/locate/window/explorer-view/header/manifest.uri.c.js" => '
  const header_obj = JSON.parse("" + headers), urls = []
  const string_order = "" + sort_order, my_order = JSON.parse(string_order), first_key = Object.keys(my_order)[0], first_dir = my_order[first_key];
  Object.keys(header_obj).forEach((key, i, arr) => {
   button(
    urls[i] = "https://pilot.parts/programs/locate/window/explorer-view/header/" + key + "-button/",
    `${item_layout}
    :host::before {
     content: "${header_obj[key]}";
    }${first_key === key ? `
    :host::after {
     --size: 8px;
     position: absolute;
     right: 5px;
     top: 5px;
     width: var(--size);
     height: var(--size);
     content: "${ first_dir ? "▼" : "▲" }";
     font-size: var(--size);
     line-height: var(--size);
     text-align: center;
     vertical-align: center;
    }`: ``}`,
    `${urls[i]}resize/`,
    `() => {
     let order = ${string_order};
     const
      keys = Object.keys(order),
      key = "${key}",
      keyplace = keys.indexOf(key);
     if (keyplace !== 0) {
      keys.splice(keyplace, 1);
      keys.unshift(key);
      order = keys.reduce((o, k) => (o[k]=order[k],o), {})
     }
     order[key] = (keyplace !== 0) || !order[key];
     _["${sort_order.headerOf().href}"] = JSON.stringify(order)
    }`
   )
  })
  urls.push("https://pilot.parts/programs/locate/window/explorer-view/header/filler/")
  return urls.join(" ")',
 "https://pilot.parts/programs/locate/window/explorer-view/header/name-button/position.json" => '{ "w": 128, "range": { "w": [0] } }',
 "https://pilot.parts/programs/locate/window/explorer-view/header/name-button/position.json?fx" => 'https://pilot.parts/programs/locate/window/explorer-view/column-fx.uri',
 "https://pilot.parts/programs/locate/window/explorer-view/header/name-button/resize/?core" => 'https://pilot.parts/programs/locate/window/explorer-view/header/resize/',
 "https://pilot.parts/programs/locate/window/explorer-view/header/name-button/resize/?onpointerdown" => 'https://pilot.parts/programs/locate/window/explorer-view/header/name-button/resize/onpointerdown.js',
 "https://pilot.parts/programs/locate/window/explorer-view/header/name-button/resize/onpointerdown.js?core" => 'https://pilot.parts/programs/locate/window/explorer-view/header/resize/onpointerdown.js',
 "https://pilot.parts/programs/locate/window/explorer-view/header/name-button/resize/onpointerdown.js?position" => 'https://pilot.parts/programs/locate/window/explorer-view/header/name-button/position.json',
 "https://pilot.parts/programs/locate/window/explorer-view/header/type-button/position.json" => '{ "w": 64, "range": { "w": [0] } }',
 "https://pilot.parts/programs/locate/window/explorer-view/header/type-button/position.json?fx" => 'https://pilot.parts/programs/locate/window/explorer-view/column-fx.uri',
 "https://pilot.parts/programs/locate/window/explorer-view/header/type-button/resize/?core" => 'https://pilot.parts/programs/locate/window/explorer-view/header/resize/',
 "https://pilot.parts/programs/locate/window/explorer-view/header/type-button/resize/?onpointerdown" => 'https://pilot.parts/programs/locate/window/explorer-view/header/type-button/resize/onpointerdown.js',
 "https://pilot.parts/programs/locate/window/explorer-view/header/type-button/resize/onpointerdown.js?core" => 'https://pilot.parts/programs/locate/window/explorer-view/header/resize/onpointerdown.js',
 "https://pilot.parts/programs/locate/window/explorer-view/header/type-button/resize/onpointerdown.js?position" => 'https://pilot.parts/programs/locate/window/explorer-view/header/type-button/position.json',
 "https://pilot.parts/programs/locate/window/explorer-view/header/size-button/position.json" => '{ "w": 96, "range": { "w": [0] } }',
 "https://pilot.parts/programs/locate/window/explorer-view/header/size-button/position.json?fx" => 'https://pilot.parts/programs/locate/window/explorer-view/column-fx.uri',
 "https://pilot.parts/programs/locate/window/explorer-view/header/size-button/resize/?core" => 'https://pilot.parts/programs/locate/window/explorer-view/header/resize/',
 "https://pilot.parts/programs/locate/window/explorer-view/header/size-button/resize/?onpointerdown" => 'https://pilot.parts/programs/locate/window/explorer-view/header/size-button/resize/onpointerdown.js',
 "https://pilot.parts/programs/locate/window/explorer-view/header/size-button/resize/onpointerdown.js?core" => 'https://pilot.parts/programs/locate/window/explorer-view/header/resize/onpointerdown.js',
 "https://pilot.parts/programs/locate/window/explorer-view/header/size-button/resize/onpointerdown.js?position" => 'https://pilot.parts/programs/locate/window/explorer-view/header/size-button/position.json',
 "https://pilot.parts/programs/locate/window/explorer-view/header/filler/?layout" => 'https://pilot.parts/programs/locate/window/explorer-view/header/filler/layout.css',
 "https://pilot.parts/programs/locate/window/explorer-view/header/filler/layout.css" => ':host { background: #c3c3c3; box-shadow: inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb }',
 "https://pilot.parts/programs/locate/window/explorer-view/header/resize/onpointerdown.js?mode" => 'https://core.parts/behaviors/resize/right-.txt',
 "https://pilot.parts/programs/locate/window/explorer-view/header/resize/onpointerdown.js?core" => 'https://core.parts/behaviors/resize/onpointerdown.js',
 "https://pilot.parts/programs/locate/window/explorer-view/header/resize/onpointerdown.js?stop_propagation" => 'https://core.parts/const/one.txt',
 "https://pilot.parts/programs/locate/window/explorer-view/header/resize/onclick.js" => 'e => { e.stopPropagation() }',
 "https://pilot.parts/programs/locate/window/explorer-view/header/resize/?onclick" => 'https://pilot.parts/programs/locate/window/explorer-view/header/resize/onclick.js',
 "https://pilot.parts/programs/locate/window/explorer-view/header/resize/?layout" => 'https://pilot.parts/programs/locate/window/explorer-view/header/resize/layout.css',
 "https://pilot.parts/programs/locate/window/explorer-view/header/resize/layout.css" => '
  :host {
   z-index: 1;
   position: absolute;
   right: -4px;
   width: 8px;
   cursor: col-resize;
   top: 0;
   bottom: 0;
  }',
 "https://pilot.parts/programs/locate/window/explorer-view/header/?layout" => 'https://pilot.parts/programs/locate/window/explorer-view/header/layout.css',
 "https://pilot.parts/programs/locate/window/explorer-view/header/?manifest" => 'https://pilot.parts/programs/locate/window/explorer-view/header/manifest.uri',
 "https://pilot.parts/programs/locate/window/explorer-view/header/list.json" => '{"name":"Name","type":"Type","size":"Size"}',
 "https://pilot.parts/programs/locate/window/explorer-view/show_kireji.txt" => '0',
 "https://pilot.parts/programs/locate/window/explorer-view/show_kireji.txt?fx" => 'https://pilot.parts/programs/locate/window/explorer-view/show_kireji.txt.fx.uri',
 "https://pilot.parts/programs/locate/window/explorer-view/show_kireji.txt.fx.uri" => 'https://pilot.parts/programs/locate/window/explorer-view/files/manifest.uri https://pilot.parts/programs/locate/window/status/layout.css https://pilot.parts/programs/locate/window/tool-bar/manifest.uri https://pilot.parts/programs/locate/window/tool-bar/toggle-kireji/layout.css',
 "https://pilot.parts/programs/locate/window/explorer-view/layout.css" => '
  :host {
   position: relative;
   flex: 1 1;
   box-shadow: -0.5px -0.5px 0 0.5px black, 0 0 0 1px #dbdbdb, -0.5px -0.5px 0 1.5px #7a7a7a, 0 0 0 2px white;
   background: white;
   margin: 2px;
   display: grid;
   grid-template-rows: 18px 1fr;
   overflow: clip;
   height: 100%;
  }',
 "https://pilot.parts/programs/locate/window/explorer-view/manifest.uri" => 'https://pilot.parts/programs/locate/window/explorer-view/header/ https://pilot.parts/programs/locate/window/explorer-view/files/',
 "https://pilot.parts/programs/locate/window/explorer-view/?layout" => 'https://pilot.parts/programs/locate/window/explorer-view/layout.css',
 "https://pilot.parts/programs/locate/window/explorer-view/?manifest" => 'https://pilot.parts/programs/locate/window/explorer-view/manifest.uri',
 "https://pilot.parts/programs/locate/window/tool-bar/layout.css" => '
  :host {
   height: 18px;
   display: flex;
   flex-flow: row nowrap;
   gap: 4px;
   align-items: center;
   padding: 2px;
  }
  :host > * {
   box-shadow:
  }',
 "https://pilot.parts/programs/locate/window/tool-bar/manifest.uri?button" => 'https://core.parts/components/button/construct.js',
 "https://pilot.parts/programs/locate/window/tool-bar/manifest.uri?show_kireji" => 'https://pilot.parts/programs/locate/window/explorer-view/show_kireji.txt',
 "https://pilot.parts/programs/locate/window/tool-bar/manifest.uri?constructor" => 'https://pilot.parts/programs/locate/window/tool-bar/manifest.uri.c.js',
 "https://pilot.parts/programs/locate/window/tool-bar/manifest.uri.c.js" => '
  const
   common_css = ":host { cursor: pointer; --size: 16px; min-width: calc(var(--size) + 4px); padding: 2px; height: calc(var(--size) + 4px); font-size: var(--size); line-height: var(--size); display: flex; flex-flow: row nowrap } :host::before { content: \'\' } :host::after { padding: 0 2px; font-size: 11px }",
   common_url = "https://pilot.parts/programs/locate/window/tool-bar/";
  return [[
   common_url + "go-up/",
   common_css + ":host::before { content: \'📁\' } :host::after { content: \'Enclosing Folder\' }",
   "",
   `() => { const url = ("" + _["https://pilot.parts/programs/locate/window/address.uri"]).match(${/^.*?(?=[^/]*\/*$)/})[0]; _["https://pilot.parts/programs/locate/window/address.uri"] = url }`,
  ],[
   common_url + "toggle-kireji/",
   common_css + `:host::before { content: \'🔗\' } :host::after { content: \'${("" + show_kireji) === "0" ? "Show" : "Hide"} Kireji\' }`,
   "",
   `() => { _["https://pilot.parts/programs/locate/window/explorer-view/show_kireji.txt"] = (_["https://pilot.parts/programs/locate/window/explorer-view/show_kireji.txt"].toPrimitive() === "1") ? "0" : "1" }`,
  ]].map($ => { button(...$); return $[0] }).join(" ")',
 "https://pilot.parts/programs/locate/window/tool-bar/?layout" => 'https://pilot.parts/programs/locate/window/tool-bar/layout.css',
 "https://pilot.parts/programs/locate/window/tool-bar/?manifest" => 'https://pilot.parts/programs/locate/window/tool-bar/manifest.uri',
 "https://pilot.parts/programs/locate/window/status/layout.css?file_count" => 'https://pilot.parts/programs/locate/window/status/file_count.txt',
 "https://pilot.parts/programs/locate/window/status/layout.css?folder_count" => 'https://pilot.parts/programs/locate/window/status/folder_count.txt',
 "https://pilot.parts/programs/locate/window/status/layout.css?kireji_count" => 'https://pilot.parts/programs/locate/window/status/kireji_count.txt',
 "https://pilot.parts/programs/locate/window/status/layout.css?show_kireji" => 'https://pilot.parts/programs/locate/window/explorer-view/show_kireji.txt',
 "https://pilot.parts/programs/locate/window/status/layout.css?constructor" => 'https://pilot.parts/programs/locate/window/status/layout.css.c.js',
 "https://pilot.parts/programs/locate/window/status/layout.css.c.js" => '
   const
    num_files = parseInt("" + file_count),
    has_files = !!num_files,
    num_folders = parseInt("" + folder_count),
    has_folders = !!num_folders,
    do_kireji = ("" + show_kireji) === "1",
    num_kireji = do_kireji ? parseInt("" + kireji_count) : undefined,
    has_kireji = do_kireji ? !!num_kireji : undefined,
    status_items = [];
   if (has_folders) status_items.push(`${folder_count} folder${num_folders === 1 ? "" : "s"}`)
   if (has_files) status_items.push(`${file_count} file${num_files === 1 ? "" : "s"}`)
   if (has_kireji) status_items.push(`${kireji_count} kireji`)
   return `
    :host {
     padding: 0 3px;
     height: 17px;
     box-shadow: inset -1px -1px white, inset 1px 1px #7a7a7a;
     display: flex;
     flex-flow: row nowrap;
     align-items: center;
    }
    :host::after {
     content: "${status_items.join(", ")}"
    }
   `;',
 "https://pilot.parts/programs/locate/window/status/?layout" => 'https://pilot.parts/programs/locate/window/status/layout.css',
 "https://pilot.parts/programs/locate/window/status/file_count.txt" => '0',
 "https://pilot.parts/programs/locate/window/status/file_count.txt?fx" => 'https://pilot.parts/programs/locate/window/status/fx.uri',
 "https://pilot.parts/programs/locate/window/status/folder_count.txt" => '5',
 "https://pilot.parts/programs/locate/window/status/folder_count.txt?fx" => 'https://pilot.parts/programs/locate/window/status/fx.uri',
 "https://pilot.parts/programs/locate/window/status/fx.uri" => 'https://pilot.parts/programs/locate/window/status/layout.css',
 "https://pilot.parts/programs/locate/window/status/kireji_count.txt" => '0',
 "https://pilot.parts/programs/locate/window/status/kireji_count.txt?fx" => 'https://pilot.parts/programs/locate/window/status/fx.uri',/*
Relate */
 "https://pilot.parts/programs/relate/task/datum.txt" => 'https://pilot.parts/programs/relate/task/',
 "https://pilot.parts/programs/relate/task/index.txt?datum" => 'https://pilot.parts/programs/relate/task/datum.txt',
 "https://pilot.parts/programs/relate/task/index.txt?fx" => 'https://pilot.parts/programs/relate/task/index/fx.uri',
 "https://pilot.parts/programs/relate/task/index.txt?tasks" => 'https://pilot.parts/tasks.uri',
 "https://pilot.parts/programs/relate/task/index.txt?constructor" => 'https://pilot.parts/programs/locate/task/index.txt.c.js',
 "https://pilot.parts/programs/relate/task/index/fx.uri" => 'https://pilot.parts/programs/relate/window/active.txt',
 "https://pilot.parts/programs/relate/task/layout.css?open" => 'https://pilot.parts/programs/relate/window/active.txt',
 "https://pilot.parts/programs/relate/task/layout.css?constructor" => 'https://pilot.parts/programs/relate/task/layout.css.c.js',
 "https://pilot.parts/programs/relate/task/layout.css.c.js" => '
  return `
   :host {
    position: relative;
    height: 100%;
    margin: 0;
    width: 160px;
    display: flex;
    flex-flow: row nowrap;
    gap: 3px;
    border: none;${("" + open) === "1" ? `
    font: bold 11px sans-serif` : ``};
    box-sizing: border-box;
    padding: ${("" + open) === "0" ? 3 : 4}px 2px 2px;
    text-align: left;
    box-shadow: ${("" + open) === "0" ? "inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb" : "inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a"}
   }
   :host(:focus)::after {
    border: 1px dotted black;
    content: "";
    position: absolute;
    margin: 3px;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    pointer-events: none;
   }
   ${(""+open) === "1" ? `
   :host > * {
    z-index: 3
   }
   :host::before {
    content: "";
    position: absolute;
    margin: 2px;
    border-top: 1px solid white;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-image:linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white),linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white);background-size: 2px 2px;background-position: 0 0, 1px 1px;
   }` : ``}
   app-icon {
    width: 16px;
    height: 16px
   }
  `;',
 "https://pilot.parts/programs/relate/task/manifest.uri" => 'https://pilot.parts/programs/relate/app-icon/ https://pilot.parts/programs/relate/app-label/',
 "https://pilot.parts/programs/relate/task/manifest.uri?open" => 'https://pilot.parts/programs/relate/window/active.txt',
 "https://pilot.parts/programs/relate/task/onpointerdown.js?minimized" => 'https://pilot.parts/programs/relate/window/minimized.txt',
 "https://pilot.parts/programs/relate/task/onpointerdown.js?active" => 'https://pilot.parts/programs/relate/window/active.txt',
 "https://pilot.parts/programs/relate/task/onpointerdown.js?window" => 'https://pilot.parts/programs/relate/window/',
 "https://pilot.parts/programs/relate/task/onpointerdown.js?task" => 'https://pilot.parts/programs/relate/task/',
 "https://pilot.parts/programs/relate/task/onpointerdown.js?constructor" => 'https://pilot.parts/programs/relate/task/onpointerdown.c.js',
 "https://pilot.parts/programs/relate/task/onpointerdown.c.js" => '
  const
   is_minimized = ("" + minimized) === "1",
   is_inactive = ("" + active) === "0",
   minimized_url = minimized.headerOf().href,
   active_url = active.headerOf().href,
   window_url = window.headerOf().href,
   task_url = task.headerOf().href,
   put_task = `
    const
     tasks_uri = "https://pilot.parts/tasks.uri",
     tasks_string = _[tasks_uri].toPrimitive(),
     tasks = tasks_string ? tasks_string.split(" ") : [],
     own_task = "${task_url}";
    if (!tasks.includes(own_task)) {
     tasks.push(own_task)
     _[tasks_uri] = tasks.join(" ")
    }`,
   put_in_front = `
    const
     windows_uri = "https://pilot.parts/windows.uri",
     windows_string = _[windows_uri].toPrimitive(),
     windows = windows_string ? windows_string.split(" ") : [],
     own_window = "${window_url}";
    if (windows.at(-1) !== own_window) {
     const window_index = windows.indexOf(own_window);
     if (window_index !== -1) windows.splice(window_index, 1)
     windows.push(own_window)
     _[windows_uri] = windows.join(" ")
    }`;
  return `
   e => {
    e?.stopPropagation();
    ${put_task}
    ${ is_minimized ? `
    _["${minimized_url}"] = "0";
    _["${active_url}"] = "1";
    ${put_in_front}` : is_inactive ? `
    _["${active_url}"] = "1";
    ${put_in_front}` : `
    _["${active_url}"] = "0";
    _["${minimized_url}"] = "1";`}
   }
  `',
 "https://pilot.parts/programs/relate/task/open/fx.uri" => 'https://pilot.parts/programs/relate/task/layout.css https://pilot.parts/taskbar/selected.txt https://pilot.parts/programs/relate/window/layout.css https://pilot.parts/programs/relate/task/onpointerdown.js',
 "https://pilot.parts/programs/relate/task/?layout" => 'https://pilot.parts/programs/relate/task/layout.css',
 "https://pilot.parts/programs/relate/task/?manifest" => 'https://pilot.parts/programs/relate/task/manifest.uri',
 "https://pilot.parts/programs/relate/task/?onpointerdown" => 'https://pilot.parts/programs/relate/task/onpointerdown.js',
 "https://pilot.parts/programs/relate/app-icon/?layout" => 'https://pilot.parts/programs/relate/app-icon/layout.css',
 "https://pilot.parts/programs/relate/app-icon/layout.css" => '
  :host {
   --size: 16px;
   width: var(--size);
   height: var(--size);
   font-size: var(--size);
   line-height: var(--size);
  }
  :host::before {
   content: "🧬";
  }',
 "https://pilot.parts/programs/relate/app-label/layout.css?constructor" => 'https://pilot.parts/programs/relate/app-label/layout.css.c.js',
 "https://pilot.parts/programs/relate/app-label/layout.css?address" => 'https://pilot.parts/programs/relate/window/address.uri',
 "https://pilot.parts/programs/relate/app-label/layout.css.c.js" => '
  return `:host {
   margin: 0;
   height: 16px;
   vertical-align: center;
   text-overflow: ellipsis;
   overflow: clip;
  }
  :host::after {
   content: "Relate - ${address}";
   white-space: nowrap;
  }`',
 "https://pilot.parts/programs/relate/app-label/?layout" => 'https://pilot.parts/programs/relate/app-label/layout.css',
 "https://pilot.parts/programs/relate/start-menu-item/app-label/layout.css" => ':host::after {
   height: 24px;
   content: "Relate";
  }',
 "https://pilot.parts/programs/relate/start-menu-item/app-label/?layout" => 'https://pilot.parts/programs/relate/start-menu-item/app-label/layout.css',
 "https://pilot.parts/programs/relate/start-menu-item/layout.css" => '
  :host {
   position: relative;
   display: flex;
   flex-flow: row nowrap;
   align-items: center;
   padding: 4px 0 }
  :host(:hover) {
   background: #00007f;
   color: white }
  app-icon {
   width: 24px;
   height: 24px;
   margin: 0 10px;
   --size: 24px;
  }',
 "https://pilot.parts/programs/relate/start-menu-item/manifest.uri" => 'https://pilot.parts/programs/relate/app-icon/ https://pilot.parts/programs/relate/start-menu-item/app-label/',
 "https://pilot.parts/programs/relate/start-menu-item/?layout" => 'https://pilot.parts/programs/relate/start-menu-item/layout.css',
 "https://pilot.parts/programs/relate/start-menu-item/?manifest" => 'https://pilot.parts/programs/relate/start-menu-item/manifest.uri',
 "https://pilot.parts/programs/relate/start-menu-item/?onclick" => 'https://pilot.parts/programs/relate/task/onpointerdown.js',
 "https://pilot.parts/programs/relate/window/active.txt" => '0',
 "https://pilot.parts/programs/relate/window/active.txt?fx" => 'https://pilot.parts/programs/relate/task/open/fx.uri',
 "https://pilot.parts/programs/relate/window/active.txt?index" => 'https://pilot.parts/programs/relate/task/index.txt',
 "https://pilot.parts/programs/relate/window/active.txt?minimized" => 'https://pilot.parts/programs/relate/window/minimized.txt',
 "https://pilot.parts/programs/relate/window/active.txt?selected" => 'https://pilot.parts/taskbar/selected.txt',
 "https://pilot.parts/programs/relate/window/active.txt?constructor" => 'https://pilot.parts/programs/relate/window/active.txt.c.js',
 "https://pilot.parts/programs/relate/window/active.txt.c.js" => 'const active = ("" + minimized) === \'1\' ? \'0\' : ("" + selected) === ("" + index) ? \'1\' : \'0\'; return active;',
 "https://pilot.parts/programs/relate/window/controls/exit-button/down-fx.uri" => 'https://pilot.parts/programs/relate/window/controls/exit-button/layout.css',
 "https://pilot.parts/programs/relate/window/controls/exit-button/down.txt" => '0',
 "https://pilot.parts/programs/relate/window/controls/exit-button/down.txt?fx" => 'https://pilot.parts/programs/relate/window/controls/exit-button/down-fx.uri',
 "https://pilot.parts/programs/relate/window/controls/exit-button/layout.css?down" => 'https://pilot.parts/programs/relate/window/controls/exit-button/down.txt',
 "https://pilot.parts/programs/relate/window/controls/exit-button/layout.css?constructor" => 'https://pilot.parts/programs/relate/window/controls/exit-button/layout.css.c.js',
 "https://pilot.parts/programs/relate/window/controls/exit-button/layout.css.c.js" => 'return `
  :host {
   position: relative;
   width: 16px;
   height: 14px;
   background: #c3c3c3;
   margin-left: 2px;
   box-shadow: ${(""+down) === \'1\' ? \'inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a\' : \'inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb\'}
  }
  :host::before, :host::after {
   --color: black;
   content: "";
   display: block;
   position: absolute;
   width: 8px;
   height: 7px;
   left: 4px;
   top: 3px;
   background: linear-gradient(to top left, transparent 0%, transparent calc(50% - 1px), var(--color) calc(50% - 1px), var(--color) calc(50% + 1px),  transparent calc(50% + 1px),  transparent 100%), linear-gradient(to top right,  transparent 0%,  transparent calc(50% - 1px), var(--color) calc(50% - 1px), var(--color) calc(50% + 1px),  transparent calc(50% + 1px),  transparent 100%);
  }
  :host(:hover)::before {
   --color: blue
  }`',
 "https://pilot.parts/programs/relate/window/controls/exit-button/onclick.js?constructor" => 'https://core.parts/behaviors/window-close.c.js',
 "https://pilot.parts/programs/relate/window/controls/exit-button/onclick.js?window" => 'https://pilot.parts/programs/relate/window/',
 "https://pilot.parts/programs/relate/window/controls/exit-button/onclick.js?task" => 'https://pilot.parts/programs/relate/task/',
 "https://pilot.parts/programs/relate/window/controls/exit-button/onpointerdown.js" => 'e => { e.stopPropagation(); _[\'https://pilot.parts/programs/relate/window/controls/exit-button/down.txt\'] = \'1\'; _[\'https://core.parts/behaviors/release/src.uri\'] = \'https://pilot.parts/programs/relate/window/controls/exit-button/release.js\'
  }',
 "https://pilot.parts/programs/relate/window/controls/exit-button/release.js" => 'e => { _[\'https://pilot.parts/programs/relate/window/controls/exit-button/down.txt\'] = \'0\'
  }',
 "https://pilot.parts/programs/relate/window/controls/exit-button/?layout" => 'https://pilot.parts/programs/relate/window/controls/exit-button/layout.css',
 "https://pilot.parts/programs/relate/window/controls/exit-button/?onclick" => 'https://pilot.parts/programs/relate/window/controls/exit-button/onclick.js',
 "https://pilot.parts/programs/relate/window/controls/exit-button/?onpointerdown" => 'https://pilot.parts/programs/relate/window/controls/exit-button/onpointerdown.js',
 "https://pilot.parts/programs/relate/window/controls/maximize-button/down-fx.uri" => 'https://pilot.parts/programs/relate/window/controls/maximize-button/layout.css',
 "https://pilot.parts/programs/relate/window/controls/maximize-button/down.txt" => '0',
 "https://pilot.parts/programs/relate/window/controls/maximize-button/down.txt?fx" => 'https://pilot.parts/programs/relate/window/controls/maximize-button/down-fx.uri',
 "https://pilot.parts/programs/relate/window/controls/maximize-button/layout.css?down" => 'https://pilot.parts/programs/relate/window/controls/maximize-button/down.txt',
 "https://pilot.parts/programs/relate/window/controls/maximize-button/layout.css?constructor" => 'https://pilot.parts/programs/relate/window/controls/maximize-button/layout.css.c.js',
 "https://pilot.parts/programs/relate/window/controls/maximize-button/layout.css.c.js" => 'return `:host {
   position: relative;
   width: 16px;
   height: 14px;
   background: #c3c3c3;
   box-shadow: ${(""+down) === \'1\' ? \'inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a\' : \'inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb\'}
  }
  :host::before {
   --color: black;
   display: block;
   position: absolute;
   content: "";
   width: 9px;
   height: 9px;
   top: 2px;
   left: 3px;
   box-shadow: inset 0 2px var(--color), inset 0 0 0 1px var(--color) }
  :host(:hover)::before {
   --color: blue }`',
 "https://pilot.parts/programs/relate/window/controls/maximize-button/onclick.js" => '
  () => {
   _[\'https://pilot.parts/programs/relate/window/maximized.txt\'] = \'1\'
  }',
 "https://pilot.parts/programs/relate/window/controls/maximize-button/onpointerdown.js" => '
  e => {
   e.stopPropagation(); _[\'https://pilot.parts/programs/relate/window/controls/maximize-button/down.txt\'] = \'1\'
   _[\'https://core.parts/behaviors/release/src.uri\'] = \'https://pilot.parts/programs/relate/window/controls/maximize-button/release.js\'
  }',
 "https://pilot.parts/programs/relate/window/controls/maximize-button/release.js" => '
  e => {
   _[\'https://pilot.parts/programs/relate/window/controls/maximize-button/down.txt\'] = \'0\'
  }',
 "https://pilot.parts/programs/relate/window/controls/maximize-button/?layout" => 'https://pilot.parts/programs/relate/window/controls/maximize-button/layout.css',
 "https://pilot.parts/programs/relate/window/controls/maximize-button/?onclick" => 'https://pilot.parts/programs/relate/window/controls/maximize-button/onclick.js',
 "https://pilot.parts/programs/relate/window/controls/maximize-button/?onpointerdown" => 'https://pilot.parts/programs/relate/window/controls/maximize-button/onpointerdown.js',
 "https://pilot.parts/programs/relate/window/controls/minimize-button/down-fx.uri" => 'https://pilot.parts/programs/relate/window/controls/minimize-button/layout.css',
 "https://pilot.parts/programs/relate/window/controls/minimize-button/down.txt" => '0',
 "https://pilot.parts/programs/relate/window/controls/minimize-button/down.txt?fx" => 'https://pilot.parts/programs/relate/window/controls/minimize-button/down-fx.uri',
 "https://pilot.parts/programs/relate/window/controls/minimize-button/layout.css?down" => 'https://pilot.parts/programs/relate/window/controls/minimize-button/down.txt',
 "https://pilot.parts/programs/relate/window/controls/minimize-button/layout.css?constructor" => 'https://pilot.parts/programs/relate/window/controls/minimize-button/layout.css.c.js',
 "https://pilot.parts/programs/relate/window/controls/minimize-button/layout.css.c.js" => 'return `:host {
   position: relative;
   width: 16px;
   height: 14px;
   background: #c3c3c3;
   box-shadow: ${(""+down) === \'1\' ? \'inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a\' : \'inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb\'}
  }
  :host::before {
   --color: black;
   display: block;
   position: absolute;
   content: "";
   width: 6px;
   height: 2px;
   background: var(--color);
   top: 9px;
   left: 4px }
  :host(:hover)::before {
   --color: blue }`',
 "https://pilot.parts/programs/relate/window/controls/minimize-button/onclick.js" => '()=>{_[\'https://pilot.parts/programs/relate/window/minimized.txt\'] = \'1\'
  }',
 "https://pilot.parts/programs/relate/window/controls/minimize-button/onpointerdown.js" => 'e => { e.stopPropagation(); _[\'https://pilot.parts/programs/relate/window/controls/minimize-button/down.txt\'] = \'1\'; _[\'https://core.parts/behaviors/release/src.uri\'] = \'https://pilot.parts/programs/relate/window/controls/minimize-button/release.js\'
  }',
 "https://pilot.parts/programs/relate/window/controls/minimize-button/release.js" => 'e => { _[\'https://pilot.parts/programs/relate/window/controls/minimize-button/down.txt\'] = \'0\'
  }',
 "https://pilot.parts/programs/relate/window/controls/minimize-button/?layout" => 'https://pilot.parts/programs/relate/window/controls/minimize-button/layout.css',
 "https://pilot.parts/programs/relate/window/controls/minimize-button/?onclick" => 'https://pilot.parts/programs/relate/window/controls/minimize-button/onclick.js',
 "https://pilot.parts/programs/relate/window/controls/minimize-button/?onpointerdown" => 'https://pilot.parts/programs/relate/window/controls/minimize-button/onpointerdown.js',
 "https://pilot.parts/programs/relate/window/controls/restore-button/down-fx.uri" => 'https://pilot.parts/programs/relate/window/controls/restore-button/layout.css',
 "https://pilot.parts/programs/relate/window/controls/restore-button/down.txt" => '0',
 "https://pilot.parts/programs/relate/window/controls/restore-button/down.txt?fx" => 'https://pilot.parts/programs/relate/window/controls/restore-button/down-fx.uri',
 "https://pilot.parts/programs/relate/window/controls/restore-button/layout.css?down" => 'https://pilot.parts/programs/relate/window/controls/restore-button/down.txt',
 "https://pilot.parts/programs/relate/window/controls/restore-button/layout.css?constructor" => 'https://pilot.parts/programs/relate/window/controls/restore-button/layout.css.c.js',
 "https://pilot.parts/programs/relate/window/controls/restore-button/layout.css.c.js" => 'return `:host {
   position: relative;
   width: 16px;
   height: 14px;
   background: #c3c3c3;
   box-shadow: ${(""+down) === \'1\' ? \'inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a\' : \'inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb\'}
  }
  :host::before, :host::after {
   --color: black;
   display: block;
   position: absolute;
   content: "";
   width: 6px;
   height: 6px;
   top: 5px;
   left: 3px;
   box-shadow: inset 0 2px var(--color), inset 0 0 0 1px var(--color);
   background: #c3c3c3 }
  :host::before {
   top: 2px;
   left: 5px }
  :host(:hover)::before, :host(:hover)::after {
   --color: blue }`',
 "https://pilot.parts/programs/relate/window/controls/restore-button/onclick.js" => '()=>_[\'https://pilot.parts/programs/relate/window/maximized.txt\'] = \'0\'',
 "https://pilot.parts/programs/relate/window/controls/restore-button/onpointerdown.js" => 'e => { e.stopPropagation(); _[\'https://pilot.parts/programs/relate/window/controls/restore-button/down.txt\'] = \'1\'; _[\'https://core.parts/behaviors/release/src.uri\'] = \'https://pilot.parts/programs/relate/window/controls/restore-button/release.js\'
  }',
 "https://pilot.parts/programs/relate/window/controls/restore-button/release.js" => 'e => { _[\'https://pilot.parts/programs/relate/window/controls/restore-button/down.txt\'] = \'0\'
  }',
 "https://pilot.parts/programs/relate/window/controls/restore-button/?layout" => 'https://pilot.parts/programs/relate/window/controls/restore-button/layout.css',
 "https://pilot.parts/programs/relate/window/controls/restore-button/?onclick" => 'https://pilot.parts/programs/relate/window/controls/restore-button/onclick.js',
 "https://pilot.parts/programs/relate/window/controls/restore-button/?onpointerdown" => 'https://pilot.parts/programs/relate/window/controls/restore-button/onpointerdown.js',
 "https://pilot.parts/programs/relate/window/controls/layout.css" => '
  :host {
   display: flex;
   flex-flow: row nowrap
  }',
 "https://pilot.parts/programs/relate/window/controls/manifest.uri?maximized" => 'https://pilot.parts/programs/relate/window/maximized.txt',
 "https://pilot.parts/programs/relate/window/controls/manifest.uri?constructor" => 'https://pilot.parts/programs/relate/window/controls/manifest.uri.c.js',
 "https://pilot.parts/programs/relate/window/controls/manifest.uri.c.js" => 'return `https://pilot.parts/programs/relate/window/controls/minimize-button/ https://pilot.parts/programs/relate/window/controls/${(""+maximized) === \'1\' ? \'restore\' : \'maximize\'}-button/ https://pilot.parts/programs/relate/window/controls/exit-button/`',
 "https://pilot.parts/programs/relate/window/controls/?layout" => 'https://pilot.parts/programs/relate/window/controls/layout.css',
 "https://pilot.parts/programs/relate/window/controls/?manifest" => 'https://pilot.parts/programs/relate/window/controls/manifest.uri',
 "https://pilot.parts/programs/relate/window/layout.css?active" => 'https://pilot.parts/programs/relate/window/active.txt',
 "https://pilot.parts/programs/relate/window/layout.css?maximized" => 'https://pilot.parts/programs/relate/window/maximized.txt',
 "https://pilot.parts/programs/relate/window/layout.css?position" => 'https://pilot.parts/programs/relate/window/position.json',
 "https://pilot.parts/programs/relate/window/layout.css?constructor" => 'https://pilot.parts/programs/relate/window/layout.css.c.js',
 "https://pilot.parts/programs/relate/window/layout.css.c.js" => '
  const
   common = `
    position: absolute;
    display: flex;
    flex-flow: column nowrap;
    gap: 2px;
    background: #c3c3c3;
    box-sizing: border-box;`,
   titlebar = ("" + active) === "1" ? `title-bar {
    background: rgb(0, 0, 163);
   }` : ``;
  if (("" + maximized) === \'1\') {
   return `
    :host {
     position: absolute;
     top: 0;
     left: 0;
     right: 0;
     bottom: 28px;
     padding: 2px;
     ${common}
    }
    ${titlebar}`
  } else {
   const { x = 0, y = 0, w = 0, h = 0 } = JSON.parse("" + position);
   return `
    :host {
     width: ${w}px;
     height: ${h}px;
     left: ${x}px;
     top: ${y}px;
     min-height: fit-content;
     padding: 4px;
     background: #c3c3c3;
     box-shadow:
      inset -1px -1px black,
      inset 1px 1px #c3c3c3,
      inset -2px -2px #7a7a7a,
      inset 2px 2px white,
      5px 7px 3px #0002;
     ${common}
    }
    ${titlebar}`
  }',
 "https://pilot.parts/programs/relate/window/manifest.uri?title" => 'https://pilot.parts/programs/relate/window/title-bar/',
 "https://pilot.parts/programs/relate/window/manifest.uri?graph" => 'https://pilot.parts/programs/relate/window/graph/',
 "https://pilot.parts/programs/relate/window/manifest.uri?transform_path" => 'https://pilot.parts/programs/relate/window/transform/',
 "https://pilot.parts/programs/relate/window/manifest.uri?transform" => 'https://core.parts/components/transform/construct.js',
 "https://pilot.parts/programs/relate/window/manifest.uri?position" => 'https://pilot.parts/programs/relate/window/position.json',
 "https://pilot.parts/programs/relate/window/manifest.uri?constructor" => 'https://pilot.parts/programs/relate/window/manifest.uri.c.js',
 "https://pilot.parts/programs/relate/window/manifest.uri.c.js" => <<<JS
  const [title_url, graph_url, transform_url, position_url] = [title, graph, transform_path, position].map(x => x.headerOf().href)
  const transform_urls = transform(transform_url, position_url, "nesw", title_url);
  return [title_url, graph_url, transform_urls].join(" ")
  JS,
 "https://pilot.parts/programs/relate/window/maximized.txt" => '0',
 "https://pilot.parts/programs/relate/window/maximized.txt?fx" => 'https://pilot.parts/programs/relate/window/maximized/fx.uri',
 "https://pilot.parts/programs/relate/window/maximized/fx.uri" => 'https://pilot.parts/programs/relate/window/layout.css https://pilot.parts/programs/relate/window/controls/manifest.uri https://pilot.parts/programs/relate/window/title-bar/ondblclick.js',
 "https://pilot.parts/programs/relate/window/minimized.txt" => '0',
 "https://pilot.parts/programs/relate/window/minimized.txt?fx" => 'https://pilot.parts/programs/relate/window/minimized/fx.uri',
 "https://pilot.parts/programs/relate/window/minimized/fx.uri" => 'https://pilot.parts/manifest.uri https://pilot.parts/programs/relate/window/active.txt https://pilot.parts/programs/relate/task/onpointerdown.js',
 "https://pilot.parts/programs/relate/window/onfocus.js?active" => 'https://pilot.parts/programs/relate/window/active.txt',
 "https://pilot.parts/programs/relate/window/onfocus.js?window" => 'https://pilot.parts/programs/relate/window/',
 "https://pilot.parts/programs/relate/window/onfocus.js?constructor" => 'https://core.parts/behaviors/window-focus.c.js',
 "https://pilot.parts/programs/relate/window/position.json" => '
  {
   "x": 128,
   "y": 128,
   "w": 256,
   "h": 256,
   "range": {
    "x": [-64, 512],
    "y": [-2, 256],
    "w": [96, 256],
    "h": [64, 128]
   }
  }',
 "https://pilot.parts/programs/relate/window/position.json?fx" => 'https://pilot.parts/programs/relate/window/position/fx.uri',
 "https://pilot.parts/programs/relate/window/position/fx.uri" => 'https://pilot.parts/programs/relate/window/layout.css',
 "https://pilot.parts/programs/relate/window/title-bar/layout.css" => '
  :host {
   background: #7f7f7f;
   color: white;
   display: flex;
   flex-flow: row nowrap;
   align-items: center;
   gap: 3px;
   height: 18px;
   padding: 0px 2px;
   box-sizing: border-box;
  }
  app-icon {
   width: 16px;
   height: 16px;
  }',
 "https://pilot.parts/programs/relate/window/title-bar/manifest.uri" => 'https://pilot.parts/programs/relate/app-icon/ https://pilot.parts/programs/relate/app-label/ https://core.parts/flex-spacer/ https://pilot.parts/programs/relate/window/controls/',
 "https://pilot.parts/programs/relate/window/title-bar/ondblclick.js?maximized" => 'https://pilot.parts/programs/relate/window/maximized.txt',
 "https://pilot.parts/programs/relate/window/title-bar/ondblclick.js?constructor" => 'https://pilot.parts/programs/relate/window/title-bar/ondblclick.c.js',
 "https://pilot.parts/programs/relate/window/title-bar/ondblclick.c.js" => 'return `() => { _[\'https://pilot.parts/programs/relate/window/controls/${(""+maximized) === \'1\' ? \'restore\' : \'maximize\'}-button/onclick.js\']() }`',
 "https://pilot.parts/programs/relate/window/title-bar/?layout" => 'https://pilot.parts/programs/relate/window/title-bar/layout.css',
 "https://pilot.parts/programs/relate/window/title-bar/?manifest" => 'https://pilot.parts/programs/relate/window/title-bar/manifest.uri',
 "https://pilot.parts/programs/relate/window/title-bar/?ondblclick" => 'https://pilot.parts/programs/relate/window/title-bar/ondblclick.js',
 "https://pilot.parts/programs/relate/window/?layout" => 'https://pilot.parts/programs/relate/window/layout.css',
 "https://pilot.parts/programs/relate/window/?manifest" => 'https://pilot.parts/programs/relate/window/manifest.uri',
 "https://pilot.parts/programs/relate/window/?onfocus" => 'https://pilot.parts/programs/relate/window/onfocus.js',
 "https://pilot.parts/programs/relate/window/address.uri" => 'https://kireji.app/demo/hello.txt',
 "https://pilot.parts/programs/relate/window/address.uri?fx" => 'https://pilot.parts/programs/relate/window/readdress.uri',
 "https://pilot.parts/programs/relate/window/readdress.uri" => 'https://pilot.parts/programs/relate/window/graph/manifest.uri https://pilot.parts/programs/relate/app-label/layout.css',
 "https://pilot.parts/programs/relate/window/graph/?manifest" => 'https://pilot.parts/programs/relate/window/graph/manifest.uri',
 "https://pilot.parts/programs/relate/window/graph/?layout" => 'https://pilot.parts/programs/relate/window/graph/layout.css',
 "https://pilot.parts/programs/relate/window/graph/layout.css?white_grid" => 'https://core.parts/img/white-grid.png',
 "https://pilot.parts/programs/relate/window/graph/layout.css?blue_grid" => 'https://core.parts/img/blue-grid.png',
 "https://pilot.parts/programs/relate/window/graph/manifest.uri?address" => 'https://pilot.parts/programs/relate/window/address.uri',
 "https://pilot.parts/programs/relate/window/graph/manifest.uri?transform" => 'https://core.parts/components/transform/construct.js',
 "https://pilot.parts/programs/relate/window/graph/manifest.uri?constructor" => 'https://pilot.parts/programs/relate/window/graph/manifest.uri.c.js',
 "https://pilot.parts/programs/relate/window/graph/manifest.uri.c.js" => '
   const
    node_core_url = "https://pilot.parts/programs/relate/window/core-node/",
    wire_core_url = "https://pilot.parts/programs/relate/core-wire/",
    kireji_urls = new Set(),
    kireji_node_urls = new Set(),
    own_url = "" + address,
    graph_url = "https://pilot.parts/programs/relate/window/graph/";
   for (const url in Δ) {
    if (!url.match(/^[^?]*\?\w*$/)) continue
    if (!kireji_urls.has(url) && own_url === url.split("?")[0]) kireji_urls.add(Δ[url])
   }
   let own_node_url;
   const result_urls = [own_url /*, ...kireji_urls*/].map((address, index) => {
    const
     node_url = `${graph_url}${hash(own_url + " " + address + " node")}/node/`,
     transform_url = node_url + "transform/",
     position_url = `${node_url}position.json`;
    if (index) kireji_node_urls.add(node_url)
    else own_node_url = node_url
    _[`${node_url}?core`] = node_core_url
    _[`${node_url}?layout`] = `${node_url}layout.css`
    _[`${node_url}?onpointerdown`] = `${node_url}onpointerdown.js`
    _[`${node_url}?manifest`] = `${node_url}manifest.uri`
    _[`${node_url}layout.css?core`] = `${node_core_url}layout.css`
    _[`${node_url}layout.css?position`] = position_url
    _[`${node_url}layout.css?graph_position`] = `${graph_url}position.json`
    _[`${node_url}onpointerdown.js?core`] = `${node_core_url}onpointerdown.js`
    _[`${node_url}onpointerdown.js?position`] = position_url
    _[`${node_url}manifest.uri?core`] = `${node_core_url}manifest.uri`
    _[`${node_url}manifest.uri?node`] = node_url
    _[`${node_url}manifest.uri?proxy`] = address
    _[`${node_url}manifest.uri?word`] = address
    _[`${node_url}position.json?core`] = `${node_core_url}position.json`
    _[`${node_url}reposition.uri`] = `${node_url}layout.css`
    _[`${node_url}position.json?fx`] = `${node_url}reposition.uri`
    transform(transform_url, position_url, "ew")
    return node_url
   })/*.concat([...kireji_node_urls].map(node_url=>{
    const wire_url = `${graph_url}${hash(own_node_url + " " + node_url + " wire")}/wire/`;
    _[`${node_url}reposition.uri`] = `${node_url}layout.css ${wire_url}layout.css`
    _[`${wire_url}?core`] = wire_core_url
    _[`${wire_url}?layout`] = `${wire_url}layout.css`
    return wire_core_url;
   }))*/.join(" ")
    // _[`${own_node_url}reposition.uri`] = [`${own_node_url}layout.css`, ...[].map(wire_url => `${wire_url}layout.css`)]
   return result_urls',
 "https://pilot.parts/programs/relate/window/graph/?onpointerdown" => 'https://pilot.parts/programs/relate/window/graph/onpointerdown.js',
 "https://pilot.parts/programs/relate/window/graph/onpointerdown.js?core" => 'https://core.parts/behaviors/resize/onpointerdown.js',
 "https://pilot.parts/programs/relate/window/graph/onpointerdown.js?mode" => 'https://core.parts/behaviors/move.txt',
 "https://pilot.parts/programs/relate/window/graph/onpointerdown.js?position" => 'https://pilot.parts/programs/relate/window/graph/position.json',
 "https://pilot.parts/programs/relate/window/graph/position.json?fx" => 'https://pilot.parts/programs/relate/window/graph/reposition.uri',
 "https://pilot.parts/programs/relate/window/graph/reposition.uri" => 'https://pilot.parts/programs/relate/window/graph/layout.css',
 "https://pilot.parts/programs/relate/window/graph/position.json" => '{ "x": -82, "y": -91 }',
 "https://pilot.parts/programs/relate/window/graph/layout.css?position" => 'https://pilot.parts/programs/relate/window/graph/position.json',
 "https://pilot.parts/programs/relate/window/graph/layout.css?constructor" => 'https://pilot.parts/programs/relate/window/graph/layout.css.c.js',
 "https://pilot.parts/programs/relate/window/graph/layout.css.c.js" => '
   const { x = 0, y = 0 } = JSON.parse("" + position)
   return `
    :host {
     --size: 18px;
     --paper-color: #c3c3c3;;
     --focus-color: rgb(0, 0, 163);
     --graph-x: ${x}px;
     --graph-y: ${y}px;
     --white-grid: url("data:image/png;base64,${white_grid}");
     --blue-grid: url("data:image/png;base64,${blue_grid}");
     --halftone-a: black;
     --halftone-b: transparent;
     --halftone-size: 2px;
     --halftone:
      linear-gradient(
       45deg,
       var(--halftone-a) 25%,
       var(--halftone-b) 25%,
       var(--halftone-b) 75%,
       var(--halftone-a) 75%,
       var(--halftone-a)
      ) calc(50% + ${x}px) calc(50% + ${y}px) / var(--halftone-size) var(--halftone-size),
      linear-gradient(
       45deg,
       var(--halftone-a) 25%,
       var(--halftone-b) 25%,
       var(--halftone-b) 75%,
       var(--halftone-a) 75%,
       var(--halftone-a)
      ) calc(var(--halftone-size) / 2 + 50% + ${x}px) calc(var(--halftone-size) / 2 + 50% + ${y}px) / var(--halftone-size) var(--halftone-size);
     position: relative;
     flex: 1 1;
     box-shadow:
      -0.5px -0.5px 0 0.5px black,
      0 0 0 1px #dbdbdb,
      -0.5px -0.5px 0 1.5px #7a7a7a,
      0 0 0 2px white;
     background: var(--paper-color);
     margin: 2px;
     display: grid;
     overflow: clip;
     height: 100%;
     /* cursor: all-scroll */;
     background: var(--halftone);
     --halftone-size: calc(var(--size) / 8);
     --halftone-a: #334246ff;
     --halftone-b: #3342467f;
     cursor: url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" style="font-size: 32px; line-height: 32px"><text y="28">🥢</text></svg>\') 2 30, pointer;
    }
    :host > * {
     --size: inherit;
     --paper-color: inherit;
    }
   `',
 "https://pilot.parts/programs/relate/window/cathode/?core" => 'https://pilot.parts/programs/relate/window/electrode/',
 "https://pilot.parts/programs/relate/window/anode?core" => 'https://pilot.parts/programs/relate/window/electrode/',
 "https://pilot.parts/programs/relate/window/electrode/?layout" => 'https://pilot.parts/programs/relate/window/electrode/layout.css',
 "https://pilot.parts/programs/relate/window/electrode/layout.css" => '
   :host {
    --overlay: transparent;
    display: inline-block;
    width: var(--size);
    height: var(--size);
    background-image:
     linear-gradient(45deg, var(--overlay) 25%, transparent 25%, transparent 75%, var(--overlay) 75%, var(--overlay)),
     linear-gradient(45deg, var(--overlay) 25%, transparent 25%, transparent 75%, var(--overlay) 75%, var(--overlay));
    background-size: 2px 2px;
    background-position: 0 0, 1px 1px;
   }
   :host(:hover) {
    --overlay: yellow;
    cursor: url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" style="font-size: 32px; line-height: 32px"><text y="32">✍</text></svg>\') 1 30, pointer;
   }',
 "https://pilot.parts/programs/relate/window/core-node/onpointerdown.js?core" => 'https://core.parts/behaviors/resize/onpointerdown.js',
 "https://pilot.parts/programs/relate/window/core-node/onpointerdown.js?mode" => 'https://core.parts/behaviors/move.txt',
 "https://pilot.parts/programs/relate/window/core-node/onpointerdown.js?stop_propagation" => 'https://core.parts/const/one.txt',
 "https://pilot.parts/programs/relate/window/core-node/onpointerdown.js?should_focus" => 'https://core.parts/const/one.txt',
 "https://pilot.parts/programs/relate/window/core-node/manifest.uri?cell" => 'https://core.parts/components/cell/construct.js',
 "https://pilot.parts/programs/relate/window/core-node/manifest.uri?label_css" => 'https://pilot.parts/programs/locate/window/explorer-view/label_css.js',
 "https://pilot.parts/programs/relate/window/core-node/manifest.uri?item_layout" => 'https://pilot.parts/programs/locate/window/explorer-view/header/item_layout.css',
 "https://pilot.parts/programs/relate/window/core-node/manifest.uri?constructor" => 'https://pilot.parts/programs/relate/window/core-node/manifest.c.js',
 "https://pilot.parts/programs/relate/window/core-node/manifest.c.js" => '
   const
    { href, groups: { type } } = proxy.headerOf(),
    is_index = href.endsWith("/"),
    crumbs = href.replace(/^https:\/\//,"").split("/"),
    path_length = crumbs.length,
    file_crumb_index = path_length - (1 + is_index),
    path = crumbs.slice(0, file_crumb_index + is_index).join("/") + "/",
    filename = crumbs[file_crumb_index],
    common_label = `:host {
     margin: 0 calc(var(--size) / 8);
     line-height: inherit;
    }`,
    common_item = `:host {
     display: flex;
     flex-flow: row nowrap;
     height: var(--size);
     align-items: center;
     line-height: var(--size);
    }`,
    cathode_url = "https://pilot.parts/programs/relate/window/cathode/",
    anode_url = "https://pilot.parts/programs/relate/window/anode",
    node_url = node.headerOf().href,
    title_url = node_url + "title-bar/",
    icon_url = "https://pilot.parts/icons/" + type.replace(/[^a-zA-Z0-9]+/g, "-") + "-icon/",
    label_url = node_url + "title-bar/label/",
    path_url = node_url + "title-bar/path/",
    resize_left_url = node_url + "transform/left-/",
    resize_right_url = node_url + "transform/right-/",
    toggle_url = node_url + "collapse-button/",
    toggle_open_url = toggle_url + "open.txt",
    toggle_css_url = toggle_url + "layout.css",
    toggle_css_constructor_url = toggle_css_url + ".c.js";
   cell(label_url, `
   ${label_css(filename)}
   ${common_label}
   :host {
    margin-left: 0;
   }`);
   cell(toggle_url, toggle_css_url, undefined, true)
   _[toggle_css_url + "?is_open"] = toggle_open_url
   _[toggle_open_url] = "1"
   _[toggle_css_url + "?constructor"] = toggle_css_constructor_url
   _[toggle_css_constructor_url] = `return \`:host::before {
    content: "\${(""+is_open === "1") ? "▼" : "▲"}";
    cursor: pointer;
    width: var(--size);
    height: var(--size);
   }\``
   // click(toggle_url, undefined, open_item_url)
   cell(path_url, `
   ${label_css(path)}
   ${common_label}
   :host {
    font-weight: normal;
    flex: 1 1;
    margin-right: 0;
   }`);
   cell(title_url, `
   ${item_layout}
   ${common_item}
   :host {
    text-align: right;
    position: relative;
    box-sizing: border-box;
    justify-content: end;
    height: calc(1.5 * var(--size));
    padding: calc(var(--size) / 2);
    padding-bottom: 0;
    align-items: stretch;
    font-weight: bold;
   }
   :host > :nth-child(2) {
    --size: inherit;
   }`, [toggle_url, path_url, label_url, icon_url].join(" ") );
   const keys = new Set()
   for (const url in Δ) {
    if (!url.match(/^[^?]*\?\w*$/)) continue
    const [base, π] = url.split("?")
    if (keys.has(π)) continue;
    if (href === base) { keys.add(π) }
   }
   // _[]
   return [title_url, "https://pilot.parts/horizontal-line/", ...[...keys].map(kireji => {
    const
     cell_url = node_url + hash(`${href}?${kireji}`) + "/kireji/",
     label_url = cell_url + "label/";
    cell(label_url, `
     ${label_css(kireji)}
     ${common_label}
     :host {
      margin-left: 0;
      box-sizing: border-box;
      flex: 1 1;
     }`);
    cell(cell_url, `
     ${item_layout}
     ${common_item}`, cathode_url + " " + label_url);
    return cell_url
   }), anode_url, resize_left_url, resize_right_url].join(" ")',
 "https://pilot.parts/programs/relate/window/core-node/position.json?constructor" => 'https://pilot.parts/programs/relate/window/core-node/position.json.c.js',
 "https://pilot.parts/programs/relate/window/core-node/position.json.c.js" => 'return JSON.stringify({ w: 9 * 18, range: { w: [5 * 18] }, snap: { x: 9, y: 9 } })',
 "https://pilot.parts/programs/relate/window/core-node/layout.css?constructor" => 'https://pilot.parts/programs/relate/window/core-node/layout.css.c.js',
 "https://pilot.parts/programs/relate/window/core-node/layout.css.c.js" => '
   const { x = 0, y = 0, w = 0 } = JSON.parse("" + position), { x: graphX = 0, y: graphY = 0 } = JSON.parse("" + graph_position)
   return `
    :host {
     position: absolute;
     top: calc(50% + ${y}px + var(--graph-y));
     left: calc(50% + ${x}px + var(--graph-x));
     width: ${w}px;
     display: flex;
     flex-flow: column nowrap;
     background: #c3c3c3;
     padding-bottom: calc(var(--size) / 2);
     border-radius: calc(var(--size) / 8);
     box-shadow:
      0.5px 0,
      0 0.5px,
      0 -0.5px,
      -0.5px 0,
      inset 0.5px 0,
      inset 0 0.5px,
      inset 0 -0.5px,
      inset -0.5px 0;
    }
    anode- {
     position: absolute;
     right: calc(var(--size) / 2);
     /* top: 0; */
     top: calc(var(--size) / 2);
    }
    horizontal-line {
     margin: calc((var(--size) / 2) - 1px) 0;
    }
    :host(:focus) {
     outline: none;
     background-image: linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white), linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white);
     background-size: 2px 2px;
     background-position: 0 0, 1px 1px;
    }
    :host > title-bar {
     --bg: #7f7f7f;
    }
    :host(:focus) > title-bar {
     --bg: var(--focus-color);
    }
   `',/*
Debate */
 "https://pilot.parts/programs/debate/task/datum.txt" => 'https://pilot.parts/programs/debate/task/',
 "https://pilot.parts/programs/debate/task/index.txt?datum" => 'https://pilot.parts/programs/debate/task/datum.txt',
 "https://pilot.parts/programs/debate/task/index.txt?fx" => 'https://pilot.parts/programs/debate/task/index/fx.uri',
 "https://pilot.parts/programs/debate/task/index.txt?tasks" => 'https://pilot.parts/tasks.uri',
 "https://pilot.parts/programs/debate/task/index.txt?constructor" => 'https://pilot.parts/programs/locate/task/index.txt.c.js',
 "https://pilot.parts/programs/debate/task/index/fx.uri" => 'https://pilot.parts/programs/debate/window/active.txt',
 "https://pilot.parts/programs/debate/task/layout.css?open" => 'https://pilot.parts/programs/debate/window/active.txt',
 "https://pilot.parts/programs/debate/task/layout.css?constructor" => 'https://pilot.parts/programs/relate/task/layout.css.c.js',
 "https://pilot.parts/programs/debate/task/manifest.uri" => 'https://pilot.parts/programs/debate/app-icon/ https://pilot.parts/programs/debate/app-label/',
 "https://pilot.parts/programs/debate/task/manifest.uri?open" => 'https://pilot.parts/programs/debate/window/active.txt',
 "https://pilot.parts/programs/debate/task/onpointerdown.js?minimized" => 'https://pilot.parts/programs/debate/window/minimized.txt',
 "https://pilot.parts/programs/debate/task/onpointerdown.js?active" => 'https://pilot.parts/programs/debate/window/active.txt',
 "https://pilot.parts/programs/debate/task/onpointerdown.js?window" => 'https://pilot.parts/programs/debate/window/',
 "https://pilot.parts/programs/debate/task/onpointerdown.js?task" => 'https://pilot.parts/programs/debate/task/',
 "https://pilot.parts/programs/debate/task/onpointerdown.js?constructor" => 'https://pilot.parts/programs/relate/task/onpointerdown.c.js',
 "https://pilot.parts/programs/debate/task/open/fx.uri" => 'https://pilot.parts/programs/debate/task/layout.css https://pilot.parts/taskbar/selected.txt https://pilot.parts/programs/debate/window/layout.css https://pilot.parts/programs/debate/task/onpointerdown.js',
 "https://pilot.parts/programs/debate/task/?layout" => 'https://pilot.parts/programs/debate/task/layout.css',
 "https://pilot.parts/programs/debate/task/?manifest" => 'https://pilot.parts/programs/debate/task/manifest.uri',
 "https://pilot.parts/programs/debate/task/?onpointerdown" => 'https://pilot.parts/programs/debate/task/onpointerdown.js',
 "https://pilot.parts/programs/debate/app-icon/?layout" => 'https://pilot.parts/programs/debate/app-icon/layout.css',
 "https://pilot.parts/programs/debate/app-icon/layout.css" => '
  :host {
   --size: 16px;
   width: var(--size);
   height: var(--size);
   font-size: var(--size);
   line-height: var(--size);
  }
  :host::before {
   content: "💬";
  }',
 "https://pilot.parts/programs/debate/app-label/layout.css" => '
  return `:host {
   margin: 0;
   height: 16px;
   vertical-align: center;
   text-overflow: ellipsis;
   overflow: clip;
  }
  :host::after {
   content: "Debate";
   white-space: nowrap;
  }`',
 "https://pilot.parts/programs/debate/app-label/?layout" => 'https://pilot.parts/programs/debate/app-label/layout.css',
 "https://pilot.parts/programs/debate/start-menu-item/app-label/layout.css" => ':host::after {
   height: 24px;
   content: "Debate";
  }',
 "https://pilot.parts/programs/debate/start-menu-item/app-label/?layout" => 'https://pilot.parts/programs/debate/start-menu-item/app-label/layout.css',
 "https://pilot.parts/programs/debate/start-menu-item/layout.css" => '
  :host {
   position: relative;
   display: flex;
   flex-flow: row nowrap;
   align-items: center;
   padding: 4px 0 }
  :host(:hover) {
   background: #00007f;
   color: white }
  app-icon {
   width: 24px;
   height: 24px;
   margin: 0 10px;
   --size: 24px;
  }',
 "https://pilot.parts/programs/debate/start-menu-item/manifest.uri" => 'https://pilot.parts/programs/debate/app-icon/ https://pilot.parts/programs/debate/start-menu-item/app-label/',
 "https://pilot.parts/programs/debate/start-menu-item/?layout" => 'https://pilot.parts/programs/debate/start-menu-item/layout.css',
 "https://pilot.parts/programs/debate/start-menu-item/?manifest" => 'https://pilot.parts/programs/debate/start-menu-item/manifest.uri',
 "https://pilot.parts/programs/debate/start-menu-item/?onclick" => 'https://pilot.parts/programs/debate/task/onpointerdown.js',
 "https://pilot.parts/programs/debate/window/active.txt" => '0',
 "https://pilot.parts/programs/debate/window/active.txt?fx" => 'https://pilot.parts/programs/debate/task/open/fx.uri',
 "https://pilot.parts/programs/debate/window/active.txt?index" => 'https://pilot.parts/programs/debate/task/index.txt',
 "https://pilot.parts/programs/debate/window/active.txt?minimized" => 'https://pilot.parts/programs/debate/window/minimized.txt',
 "https://pilot.parts/programs/debate/window/active.txt?selected" => 'https://pilot.parts/taskbar/selected.txt',
 "https://pilot.parts/programs/debate/window/active.txt?constructor" => 'https://pilot.parts/programs/relate/window/active.txt.c.js',
 "https://pilot.parts/programs/debate/window/controls/exit-button/down-fx.uri" => 'https://pilot.parts/programs/debate/window/controls/exit-button/layout.css',
 "https://pilot.parts/programs/debate/window/controls/exit-button/down.txt" => '0',
 "https://pilot.parts/programs/debate/window/controls/exit-button/down.txt?fx" => 'https://pilot.parts/programs/debate/window/controls/exit-button/down-fx.uri',
 "https://pilot.parts/programs/debate/window/controls/exit-button/layout.css?down" => 'https://pilot.parts/programs/debate/window/controls/exit-button/down.txt',
 "https://pilot.parts/programs/debate/window/controls/exit-button/layout.css?constructor" => 'https://pilot.parts/programs/relate/window/controls/exit-button/layout.css.c.js',
 "https://pilot.parts/programs/debate/window/controls/exit-button/onclick.js?constructor" => 'https://core.parts/behaviors/window-close.c.js',
 "https://pilot.parts/programs/debate/window/controls/exit-button/onclick.js?window" => 'https://pilot.parts/programs/debate/window/',
 "https://pilot.parts/programs/debate/window/controls/exit-button/onclick.js?task" => 'https://pilot.parts/programs/debate/task/',
 "https://pilot.parts/programs/debate/window/controls/exit-button/onpointerdown.js" => 'e => { e.stopPropagation(); _[\'https://pilot.parts/programs/debate/window/controls/exit-button/down.txt\'] = \'1\'; _[\'https://core.parts/behaviors/release/src.uri\'] = \'https://pilot.parts/programs/debate/window/controls/exit-button/release.js\'
  }',
 "https://pilot.parts/programs/debate/window/controls/exit-button/release.js" => 'e => { _[\'https://pilot.parts/programs/debate/window/controls/exit-button/down.txt\'] = \'0\'
  }',
 "https://pilot.parts/programs/debate/window/controls/exit-button/?layout" => 'https://pilot.parts/programs/debate/window/controls/exit-button/layout.css',
 "https://pilot.parts/programs/debate/window/controls/exit-button/?onclick" => 'https://pilot.parts/programs/debate/window/controls/exit-button/onclick.js',
 "https://pilot.parts/programs/debate/window/controls/exit-button/?onpointerdown" => 'https://pilot.parts/programs/debate/window/controls/exit-button/onpointerdown.js',
 "https://pilot.parts/programs/debate/window/controls/maximize-button/down-fx.uri" => 'https://pilot.parts/programs/debate/window/controls/maximize-button/layout.css',
 "https://pilot.parts/programs/debate/window/controls/maximize-button/down.txt" => '0',
 "https://pilot.parts/programs/debate/window/controls/maximize-button/down.txt?fx" => 'https://pilot.parts/programs/debate/window/controls/maximize-button/down-fx.uri',
 "https://pilot.parts/programs/debate/window/controls/maximize-button/layout.css?down" => 'https://pilot.parts/programs/debate/window/controls/maximize-button/down.txt',
 "https://pilot.parts/programs/debate/window/controls/maximize-button/layout.css?constructor" => 'https://pilot.parts/programs/debate/window/controls/maximize-button/layout.css.c.js',
 "https://pilot.parts/programs/debate/window/controls/maximize-button/layout.css.c.js" => 'return `:host {
   position: relative;
   width: 16px;
   height: 14px;
   background: #c3c3c3;
   box-shadow: ${(""+down) === \'1\' ? \'inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a\' : \'inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb\'}
  }
  :host::before {
   --color: black;
   display: block;
   position: absolute;
   content: "";
   width: 9px;
   height: 9px;
   top: 2px;
   left: 3px;
   box-shadow: inset 0 2px var(--color), inset 0 0 0 1px var(--color) }
  :host(:hover)::before {
   --color: blue }`',
 "https://pilot.parts/programs/debate/window/controls/maximize-button/onclick.js" => '
  () => {
   _[\'https://pilot.parts/programs/debate/window/maximized.txt\'] = \'1\'
  }',
 "https://pilot.parts/programs/debate/window/controls/maximize-button/onpointerdown.js" => '
  e => {
   e.stopPropagation(); _[\'https://pilot.parts/programs/debate/window/controls/maximize-button/down.txt\'] = \'1\'
   _[\'https://core.parts/behaviors/release/src.uri\'] = \'https://pilot.parts/programs/debate/window/controls/maximize-button/release.js\'
  }',
 "https://pilot.parts/programs/debate/window/controls/maximize-button/release.js" => '
  e => {
   _[\'https://pilot.parts/programs/debate/window/controls/maximize-button/down.txt\'] = \'0\'
  }',
 "https://pilot.parts/programs/debate/window/controls/maximize-button/?layout" => 'https://pilot.parts/programs/debate/window/controls/maximize-button/layout.css',
 "https://pilot.parts/programs/debate/window/controls/maximize-button/?onclick" => 'https://pilot.parts/programs/debate/window/controls/maximize-button/onclick.js',
 "https://pilot.parts/programs/debate/window/controls/maximize-button/?onpointerdown" => 'https://pilot.parts/programs/debate/window/controls/maximize-button/onpointerdown.js',
 "https://pilot.parts/programs/debate/window/controls/minimize-button/down-fx.uri" => 'https://pilot.parts/programs/debate/window/controls/minimize-button/layout.css',
 "https://pilot.parts/programs/debate/window/controls/minimize-button/down.txt" => '0',
 "https://pilot.parts/programs/debate/window/controls/minimize-button/down.txt?fx" => 'https://pilot.parts/programs/debate/window/controls/minimize-button/down-fx.uri',
 "https://pilot.parts/programs/debate/window/controls/minimize-button/layout.css?down" => 'https://pilot.parts/programs/debate/window/controls/minimize-button/down.txt',
 "https://pilot.parts/programs/debate/window/controls/minimize-button/layout.css?constructor" => 'https://pilot.parts/programs/relate/window/controls/minimize-button/layout.css.c.js',
 "https://pilot.parts/programs/debate/window/controls/minimize-button/onclick.js" => '()=>{_[\'https://pilot.parts/programs/debate/window/minimized.txt\'] = \'1\'
  }',
 "https://pilot.parts/programs/debate/window/controls/minimize-button/onpointerdown.js" => 'e => { e.stopPropagation(); _[\'https://pilot.parts/programs/debate/window/controls/minimize-button/down.txt\'] = \'1\'; _[\'https://core.parts/behaviors/release/src.uri\'] = \'https://pilot.parts/programs/debate/window/controls/minimize-button/release.js\'
  }',
 "https://pilot.parts/programs/debate/window/controls/minimize-button/release.js" => 'e => { _[\'https://pilot.parts/programs/debate/window/controls/minimize-button/down.txt\'] = \'0\'
  }',
 "https://pilot.parts/programs/debate/window/controls/minimize-button/?layout" => 'https://pilot.parts/programs/debate/window/controls/minimize-button/layout.css',
 "https://pilot.parts/programs/debate/window/controls/minimize-button/?onclick" => 'https://pilot.parts/programs/debate/window/controls/minimize-button/onclick.js',
 "https://pilot.parts/programs/debate/window/controls/minimize-button/?onpointerdown" => 'https://pilot.parts/programs/debate/window/controls/minimize-button/onpointerdown.js',
 "https://pilot.parts/programs/debate/window/controls/restore-button/down-fx.uri" => 'https://pilot.parts/programs/debate/window/controls/restore-button/layout.css',
 "https://pilot.parts/programs/debate/window/controls/restore-button/down.txt" => '0',
 "https://pilot.parts/programs/debate/window/controls/restore-button/down.txt?fx" => 'https://pilot.parts/programs/debate/window/controls/restore-button/down-fx.uri',
 "https://pilot.parts/programs/debate/window/controls/restore-button/layout.css?down" => 'https://pilot.parts/programs/debate/window/controls/restore-button/down.txt',
 "https://pilot.parts/programs/debate/window/controls/restore-button/layout.css?constructor" => 'https://pilot.parts/programs/debate/window/controls/restore-button/layout.css.c.js',
 "https://pilot.parts/programs/debate/window/controls/restore-button/layout.css.c.js" => 'return `:host {
   position: relative;
   width: 16px;
   height: 14px;
   background: #c3c3c3;
   box-shadow: ${(""+down) === \'1\' ? \'inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a\' : \'inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb\'}
  }
  :host::before, :host::after {
   --color: black;
   display: block;
   position: absolute;
   content: "";
   width: 6px;
   height: 6px;
   top: 5px;
   left: 3px;
   box-shadow: inset 0 2px var(--color), inset 0 0 0 1px var(--color);
   background: #c3c3c3 }
  :host::before {
   top: 2px;
   left: 5px }
  :host(:hover)::before, :host(:hover)::after {
   --color: blue }`',
 "https://pilot.parts/programs/debate/window/controls/restore-button/onclick.js" => '()=>_[\'https://pilot.parts/programs/debate/window/maximized.txt\'] = \'0\'',
 "https://pilot.parts/programs/debate/window/controls/restore-button/onpointerdown.js" => 'e => { e.stopPropagation(); _[\'https://pilot.parts/programs/debate/window/controls/restore-button/down.txt\'] = \'1\'; _[\'https://core.parts/behaviors/release/src.uri\'] = \'https://pilot.parts/programs/debate/window/controls/restore-button/release.js\'
  }',
 "https://pilot.parts/programs/debate/window/controls/restore-button/release.js" => 'e => { _[\'https://pilot.parts/programs/debate/window/controls/restore-button/down.txt\'] = \'0\'
  }',
 "https://pilot.parts/programs/debate/window/controls/restore-button/?layout" => 'https://pilot.parts/programs/debate/window/controls/restore-button/layout.css',
 "https://pilot.parts/programs/debate/window/controls/restore-button/?onclick" => 'https://pilot.parts/programs/debate/window/controls/restore-button/onclick.js',
 "https://pilot.parts/programs/debate/window/controls/restore-button/?onpointerdown" => 'https://pilot.parts/programs/debate/window/controls/restore-button/onpointerdown.js',
 "https://pilot.parts/programs/debate/window/controls/layout.css" => '
  :host {
   display: flex;
   flex-flow: row nowrap
  }',
 "https://pilot.parts/programs/debate/window/controls/manifest.uri?maximized" => 'https://pilot.parts/programs/debate/window/maximized.txt',
 "https://pilot.parts/programs/debate/window/controls/manifest.uri?constructor" => 'https://pilot.parts/programs/debate/window/controls/manifest.uri.c.js',
 "https://pilot.parts/programs/debate/window/controls/manifest.uri.c.js" => 'return `https://pilot.parts/programs/debate/window/controls/minimize-button/ https://pilot.parts/programs/debate/window/controls/${(""+maximized) === \'1\' ? \'restore\' : \'maximize\'}-button/ https://pilot.parts/programs/debate/window/controls/exit-button/`',
 "https://pilot.parts/programs/debate/window/controls/?layout" => 'https://pilot.parts/programs/debate/window/controls/layout.css',
 "https://pilot.parts/programs/debate/window/controls/?manifest" => 'https://pilot.parts/programs/debate/window/controls/manifest.uri',
 "https://pilot.parts/programs/debate/window/layout.css?active" => 'https://pilot.parts/programs/debate/window/active.txt',
 "https://pilot.parts/programs/debate/window/layout.css?maximized" => 'https://pilot.parts/programs/debate/window/maximized.txt',
 "https://pilot.parts/programs/debate/window/layout.css?position" => 'https://pilot.parts/programs/debate/window/position.json',
 "https://pilot.parts/programs/debate/window/layout.css?constructor" => 'https://pilot.parts/programs/debate/window/layout.css.c.js',
 "https://pilot.parts/programs/debate/window/layout.css.c.js" => '
  const
   common = `
    position: absolute;
    display: flex;
    flex-flow: column nowrap;
    gap: 2px;
    background: #c3c3c3;
    box-sizing: border-box;`,
   titlebar = ("" + active) === "1" ? `title-bar {
    background: rgb(0, 0, 163);
   }` : ``;
  if (("" + maximized) === \'1\') {
   return `
    :host {
     position: absolute;
     top: 0;
     left: 0;
     right: 0;
     bottom: 28px;
     padding: 2px;
     ${common}
    }
    ${titlebar}`
  } else {
   const { x = 0, y = 0, w = 0, h = 0 } = JSON.parse("" + position);
   return `
    :host {
     width: ${w}px;
     height: ${h}px;
     left: ${x}px;
     top: ${y}px;
     min-height: fit-content;
     padding: 4px;
     background: #c3c3c3;
     box-shadow:
      inset -1px -1px black,
      inset 1px 1px #c3c3c3,
      inset -2px -2px #7a7a7a,
      inset 2px 2px white,
      5px 7px 3px #0002;
     ${common}
    }
    ${titlebar}`
  }',
 "https://pilot.parts/programs/debate/window/manifest.uri?title" => 'https://pilot.parts/programs/debate/window/title-bar/',
 "https://pilot.parts/programs/debate/window/manifest.uri?panel" => 'https://pilot.parts/programs/debate/window/panel/',
 "https://pilot.parts/programs/debate/window/manifest.uri?transform_path" => 'https://pilot.parts/programs/debate/window/transform/',
 "https://pilot.parts/programs/debate/window/manifest.uri?transform" => 'https://core.parts/components/transform/construct.js',
 "https://pilot.parts/programs/debate/window/manifest.uri?position" => 'https://pilot.parts/programs/debate/window/position.json',
 "https://pilot.parts/programs/debate/window/manifest.uri?constructor" => 'https://pilot.parts/programs/debate/window/manifest.uri.c.js',
 "https://pilot.parts/programs/debate/window/manifest.uri.c.js" => <<<JS
  const  [title_url, panel_url, transform_url, position_url] = [title, panel, transform_path, position].map(x => x.headerOf().href), transform_urls = transform(transform_url, position_url, "nesw", title_url);
  return [title_url, panel_url, transform_urls].join(" ")
  JS,
 "https://pilot.parts/programs/debate/connection/status.txt.c.js" => 'return "0"',
 "https://pilot.parts/programs/debate/connection/status.txt?constructor" => 'https://pilot.parts/programs/debate/connection/status.txt.c.js',
 "https://pilot.parts/programs/debate/connection/status.txt?fx" => 'https://pilot.parts/programs/debate/connection/onstatus.uri',
 "https://pilot.parts/programs/debate/connection/onstatus.uri" => 'https://pilot.parts/programs/debate/window/panel/status/layout.css',
 "https://pilot.parts/programs/debate/window/maximized.txt" => '0',
 "https://pilot.parts/programs/debate/window/maximized.txt?fx" => 'https://pilot.parts/programs/debate/window/maximized/fx.uri',
 "https://pilot.parts/programs/debate/window/maximized/fx.uri" => 'https://pilot.parts/programs/debate/window/layout.css https://pilot.parts/programs/debate/window/controls/manifest.uri https://pilot.parts/programs/debate/window/title-bar/ondblclick.js',
 "https://pilot.parts/programs/debate/window/minimized.txt" => '0',
 "https://pilot.parts/programs/debate/window/minimized.txt?fx" => 'https://pilot.parts/programs/debate/window/minimized/fx.uri',
 "https://pilot.parts/programs/debate/window/minimized/fx.uri" => 'https://pilot.parts/manifest.uri https://pilot.parts/programs/debate/window/active.txt https://pilot.parts/programs/debate/task/onpointerdown.js',
 "https://pilot.parts/programs/debate/window/onfocus.js?active" => 'https://pilot.parts/programs/debate/window/active.txt',
 "https://pilot.parts/programs/debate/window/onfocus.js?window" => 'https://pilot.parts/programs/debate/window/',
 "https://pilot.parts/programs/debate/window/onfocus.js?constructor" => 'https://core.parts/behaviors/window-focus.c.js',
 "https://pilot.parts/programs/debate/window/position.json" => '
  {
   "x": 64,
   "y": 128,
   "w": 300,
   "h": 450,
   "range": {
    "x": [-64, 512],
    "y": [-2, 256],
    "w": [96, 256],
    "h": [64, 128]
   }
  }',
 "https://pilot.parts/programs/debate/window/position.json?fx" => 'https://pilot.parts/programs/debate/window/position/fx.uri',
 "https://pilot.parts/programs/debate/window/position/fx.uri" => 'https://pilot.parts/programs/debate/window/layout.css',
 "https://pilot.parts/programs/debate/window/title-bar/layout.css" => '
  :host {
   background: #7f7f7f;
   color: white;
   display: flex;
   flex-flow: row nowrap;
   align-items: center;
   gap: 3px;
   height: 18px;
   padding: 0px 2px;
   box-sizing: border-box;
  }
  app-icon {
   width: 16px;
   height: 16px;
  }',
 "https://pilot.parts/programs/debate/window/title-bar/manifest.uri" => 'https://pilot.parts/programs/debate/app-icon/ https://pilot.parts/programs/debate/app-label/ https://core.parts/flex-spacer/ https://pilot.parts/programs/debate/window/controls/',
 "https://pilot.parts/programs/debate/window/title-bar/ondblclick.js?maximized" => 'https://pilot.parts/programs/debate/window/maximized.txt',
 "https://pilot.parts/programs/debate/window/title-bar/ondblclick.js?constructor" => 'https://pilot.parts/programs/debate/window/title-bar/ondblclick.c.js',
 "https://pilot.parts/programs/debate/window/title-bar/ondblclick.c.js" => 'return `() => { _[\'https://pilot.parts/programs/debate/window/controls/${(""+maximized) === \'1\' ? \'restore\' : \'maximize\'}-button/onclick.js\']() }`',
 "https://pilot.parts/programs/debate/window/title-bar/?layout" => 'https://pilot.parts/programs/debate/window/title-bar/layout.css',
 "https://pilot.parts/programs/debate/window/title-bar/?manifest" => 'https://pilot.parts/programs/debate/window/title-bar/manifest.uri',
 "https://pilot.parts/programs/debate/window/title-bar/?ondblclick" => 'https://pilot.parts/programs/debate/window/title-bar/ondblclick.js',
 "https://pilot.parts/programs/debate/window/?layout" => 'https://pilot.parts/programs/debate/window/layout.css',
 "https://pilot.parts/programs/debate/window/?manifest" => 'https://pilot.parts/programs/debate/window/manifest.uri',
 "https://pilot.parts/programs/debate/window/?onfocus" => 'https://pilot.parts/programs/debate/window/onfocus.js',
 "https://pilot.parts/programs/debate/window/panel/?manifest" => 'https://pilot.parts/programs/debate/window/panel/manifest.uri',
 "https://pilot.parts/programs/debate/window/panel/manifest.uri" => 'https://pilot.parts/programs/debate/window/panel/toolbar/ https://pilot.parts/programs/debate/window/panel/contacts/ https://pilot.parts/programs/debate/window/panel/status/',
 "https://pilot.parts/programs/debate/window/panel/?layout" => 'https://pilot.parts/programs/debate/window/panel/layout.css',
 "https://pilot.parts/programs/debate/window/panel/layout.css" => ':host { display: flex; flex-flow: column nowrap; flex: 1 1; gap: 2px; }',
 "https://pilot.parts/programs/debate/window/panel/toolbar/?manifest" => 'https://pilot.parts/programs/debate/window/panel/toolbar/manifest.uri',
 "https://pilot.parts/programs/debate/window/panel/toolbar/manifest.uri?constructor" => 'https://pilot.parts/programs/debate/window/panel/toolbar/manifest.uri.c.js',
 "https://pilot.parts/programs/debate/window/panel/toolbar/manifest.uri?button_url" => 'https://pilot.parts/programs/debate/window/panel/toolbar/',
 "https://pilot.parts/programs/debate/window/panel/toolbar/manifest.uri?button" => 'https://core.parts/components/button/construct.js',
 "https://pilot.parts/programs/debate/window/panel/toolbar/manifest.uri.c.js" => <<<JS
  return [[
   button_url.headerOf().href + "answer/",
   `:host { text-align: center; display: flex; flex-flow: column nowrap; width: 40px; box-sizing: border-box } :host::before { content: "👥"; font-size: 24px; line-height: 24px; } :host::after { content: "Answer" }`,
   "",
   `e => _["https://pilot.parts/programs/answer/task/onpointerdown.js"](e)`,
  ],[
   button_url.headerOf().href + "invite/",
   `:host { text-align: center; display: flex; flex-flow: column nowrap; width: 40px; box-sizing: border-box } :host::before { content: "👥"; font-size: 24px; line-height: 24px; } :host::after { content: "Place" }`,
   "",
   `e => _["https://pilot.parts/programs/invite/task/onpointerdown.js"](e)`,
  ]].map(config => { button(...config); return config[0] }).join(" ")
  JS,
 "https://pilot.parts/programs/debate/window/panel/toolbar/?layout" => 'https://pilot.parts/programs/debate/window/panel/toolbar/layout.css',
 "https://pilot.parts/programs/debate/window/panel/toolbar/layout.css" => ':host { display: flex; flex-flow: row nowrap; gap: 12px; height: 51px; padding: 6px; box-sizing: border-box; }',
 "https://pilot.parts/programs/debate/window/panel/contacts/?manifest" => 'https://pilot.parts/programs/debate/window/panel/contacts/manifest.uri',
 "https://pilot.parts/programs/debate/window/panel/contacts/manifest.uri" => 'https://pilot.parts/programs/debate/window/panel/contacts/online/ https://pilot.parts/programs/debate/window/panel/contacts/offline/',
 "https://pilot.parts/programs/debate/window/panel/contacts/?layout" => 'https://pilot.parts/programs/locate/window/explorer-view/layout.css',
 "https://pilot.parts/programs/debate/window/panel/status/?manifest" => 'https://pilot.parts/programs/debate/window/panel/status/manifest.uri',
 "https://pilot.parts/programs/debate/window/panel/status/manifest.uri" => '',
 "https://pilot.parts/programs/debate/window/panel/status/?layout" => 'https://pilot.parts/programs/debate/window/panel/status/layout.css',
 "https://pilot.parts/programs/debate/window/panel/status/layout.css?constructor" => 'https://pilot.parts/programs/debate/window/panel/status/layout.css.c.js',
 "https://pilot.parts/programs/debate/window/panel/status/layout.css?status" => 'https://pilot.parts/programs/debate/connection/status.txt',
 "https://pilot.parts/programs/debate/window/panel/status/layout.css.c.js" => '
  return `:host {
   padding: 0 3px;
   height: 17px;
   box-shadow: inset -1px -1px white, inset 1px 1px #7a7a7a;
   display: flex;
   flex-flow: row nowrap;
   align-items: center;
  }
  :host::after {
   content: "👤 ${"" + status === "1" ? "Online" : "Offline"}"
  }`',
 "https://pilot.parts/programs/debate/window/panel/contacts/online/?manifest" => 'https://pilot.parts/programs/debate/window/panel/contacts/online/manifest.uri',
 "https://pilot.parts/programs/debate/window/panel/contacts/online/manifest.uri" => '',
 "https://pilot.parts/programs/debate/window/panel/contacts/online/?layout" => 'https://pilot.parts/programs/debate/window/panel/contacts/online/layout.css',
 "https://pilot.parts/programs/debate/window/panel/contacts/online/layout.css" => ':host { display: flex; flex-flow: column nowrap } :host::before { content: "Online"; font-weight: 700 }',
 "https://pilot.parts/programs/debate/window/panel/contacts/offline/?manifest" => 'https://pilot.parts/programs/debate/window/panel/contacts/offline/manifest.uri',
 "https://pilot.parts/programs/debate/window/panel/contacts/offline/manifest.uri" => '',
 "https://pilot.parts/programs/debate/window/panel/contacts/offline/?layout" => 'https://pilot.parts/programs/debate/window/panel/contacts/offline/layout.css',
 "https://pilot.parts/programs/debate/window/panel/contacts/offline/layout.css" => ':host { display: flex; flex-flow: column nowrap } :host::before { content: "Offline"; font-weight: 700 }',

 /*
Welcome */
 "https://pilot.parts/programs/welcome/task/datum.txt" => 'https://pilot.parts/programs/welcome/task/',
 "https://pilot.parts/programs/welcome/task/index.txt" => '1',
 "https://pilot.parts/programs/welcome/task/index.txt?datum" => 'https://pilot.parts/programs/welcome/task/datum.txt',
 "https://pilot.parts/programs/welcome/task/index.txt?fx" => 'https://pilot.parts/programs/welcome/task/index/fx.uri',
 "https://pilot.parts/programs/welcome/task/index.txt?tasks" => 'https://pilot.parts/tasks.uri',
 "https://pilot.parts/programs/welcome/task/index.txt?constructor" => 'https://pilot.parts/programs/locate/task/index.txt.c.js',
 "https://pilot.parts/programs/welcome/task/index/fx.uri" => 'https://pilot.parts/programs/welcome/window/active.txt',
 "https://pilot.parts/programs/welcome/task/layout.css?open" => 'https://pilot.parts/programs/welcome/window/active.txt',
 "https://pilot.parts/programs/welcome/task/layout.css?constructor" => 'https://pilot.parts/programs/relate/task/layout.css.c.js',
 "https://pilot.parts/programs/welcome/task/manifest.uri" => 'https://pilot.parts/programs/welcome/app-icon/ https://pilot.parts/programs/welcome/app-label/',
 "https://pilot.parts/programs/welcome/task/manifest.uri?open" => 'https://pilot.parts/programs/welcome/window/active.txt',
 "https://pilot.parts/programs/welcome/task/onpointerdown.js?minimized" => 'https://pilot.parts/programs/welcome/window/minimized.txt',
 "https://pilot.parts/programs/welcome/task/onpointerdown.js?active" => 'https://pilot.parts/programs/welcome/window/active.txt',
 "https://pilot.parts/programs/welcome/task/onpointerdown.js?window" => 'https://pilot.parts/programs/welcome/window/',
 "https://pilot.parts/programs/welcome/task/onpointerdown.js?task" => 'https://pilot.parts/programs/welcome/task/',
 "https://pilot.parts/programs/welcome/task/onpointerdown.js?constructor" => 'https://pilot.parts/programs/relate/task/onpointerdown.c.js',
 "https://pilot.parts/programs/welcome/task/open/fx.uri" => 'https://pilot.parts/programs/welcome/task/layout.css https://pilot.parts/taskbar/selected.txt https://pilot.parts/programs/welcome/window/layout.css https://pilot.parts/programs/welcome/task/onpointerdown.js',
 "https://pilot.parts/programs/welcome/task/?layout" => 'https://pilot.parts/programs/welcome/task/layout.css',
 "https://pilot.parts/programs/welcome/task/?manifest" => 'https://pilot.parts/programs/welcome/task/manifest.uri',
 "https://pilot.parts/programs/welcome/task/?onpointerdown" => 'https://pilot.parts/programs/welcome/task/onpointerdown.js',
 "https://pilot.parts/programs/welcome/app-icon/?layout" => 'https://pilot.parts/programs/welcome/app-icon/layout.css',
 "https://pilot.parts/programs/welcome/app-icon/layout.css" => '
  :host {
   --size: 16px;
   width: var(--size);
   height: var(--size);
   font-size: var(--size);
   line-height: var(--size);
  }
  :host::before {
   content: "👋";
  }',
 "https://pilot.parts/programs/welcome/app-label/layout.css" => '
  return `:host {
   margin: 0;
   height: 16px;
   vertical-align: center;
   text-overflow: ellipsis;
   overflow: clip;
  }
  :host::after {
   content: "Welcome";
   white-space: nowrap;
  }`',
 "https://pilot.parts/programs/welcome/app-label/?layout" => 'https://pilot.parts/programs/welcome/app-label/layout.css',
 "https://pilot.parts/programs/welcome/start-menu-item/app-label/layout.css" => ':host::after {
   height: 24px;
   content: "Welcome";
  }',
 "https://pilot.parts/programs/welcome/start-menu-item/app-label/?layout" => 'https://pilot.parts/programs/welcome/start-menu-item/app-label/layout.css',
 "https://pilot.parts/programs/welcome/start-menu-item/layout.css" => '
  :host {
   position: relative;
   display: flex;
   flex-flow: row nowrap;
   align-items: center;
   padding: 4px 0 }
  :host(:hover) {
   background: #00007f;
   color: white }
  app-icon {
   width: 24px;
   height: 24px;
   margin: 0 10px;
   --size: 24px;
  }',
 "https://pilot.parts/programs/welcome/start-menu-item/manifest.uri" => 'https://pilot.parts/programs/welcome/app-icon/ https://pilot.parts/programs/welcome/start-menu-item/app-label/',
 "https://pilot.parts/programs/welcome/start-menu-item/?layout" => 'https://pilot.parts/programs/welcome/start-menu-item/layout.css',
 "https://pilot.parts/programs/welcome/start-menu-item/?manifest" => 'https://pilot.parts/programs/welcome/start-menu-item/manifest.uri',
 "https://pilot.parts/programs/welcome/start-menu-item/?onclick" => 'https://pilot.parts/programs/welcome/task/onpointerdown.js',
 "https://pilot.parts/programs/welcome/window/active.txt" => '1',
 "https://pilot.parts/programs/welcome/window/active.txt?fx" => 'https://pilot.parts/programs/welcome/task/open/fx.uri',
 "https://pilot.parts/programs/welcome/window/active.txt?index" => 'https://pilot.parts/programs/welcome/task/index.txt',
 "https://pilot.parts/programs/welcome/window/active.txt?minimized" => 'https://pilot.parts/programs/welcome/window/minimized.txt',
 "https://pilot.parts/programs/welcome/window/active.txt?selected" => 'https://pilot.parts/taskbar/selected.txt',
 "https://pilot.parts/programs/welcome/window/active.txt?constructor" => 'https://pilot.parts/programs/relate/window/active.txt.c.js',
 "https://pilot.parts/programs/welcome/window/controls/exit-button/down-fx.uri" => 'https://pilot.parts/programs/welcome/window/controls/exit-button/layout.css',
 "https://pilot.parts/programs/welcome/window/controls/exit-button/down.txt" => '0',
 "https://pilot.parts/programs/welcome/window/controls/exit-button/down.txt?fx" => 'https://pilot.parts/programs/welcome/window/controls/exit-button/down-fx.uri',
 "https://pilot.parts/programs/welcome/window/controls/exit-button/layout.css?down" => 'https://pilot.parts/programs/welcome/window/controls/exit-button/down.txt',
 "https://pilot.parts/programs/welcome/window/controls/exit-button/layout.css?constructor" => 'https://pilot.parts/programs/relate/window/controls/exit-button/layout.css.c.js',
 "https://pilot.parts/programs/welcome/window/controls/exit-button/onclick.js?constructor" => 'https://core.parts/behaviors/window-close.c.js',
 "https://pilot.parts/programs/welcome/window/controls/exit-button/onclick.js?window" => 'https://pilot.parts/programs/welcome/window/',
 "https://pilot.parts/programs/welcome/window/controls/exit-button/onclick.js?task" => 'https://pilot.parts/programs/welcome/task/',
 "https://pilot.parts/programs/welcome/window/controls/exit-button/onpointerdown.js" => 'e => { e.stopPropagation(); _[\'https://pilot.parts/programs/welcome/window/controls/exit-button/down.txt\'] = \'1\'; _[\'https://core.parts/behaviors/release/src.uri\'] = \'https://pilot.parts/programs/welcome/window/controls/exit-button/release.js\'
  }',
 "https://pilot.parts/programs/welcome/window/controls/exit-button/release.js" => 'e => { _[\'https://pilot.parts/programs/welcome/window/controls/exit-button/down.txt\'] = \'0\'
  }',
 "https://pilot.parts/programs/welcome/window/controls/exit-button/?layout" => 'https://pilot.parts/programs/welcome/window/controls/exit-button/layout.css',
 "https://pilot.parts/programs/welcome/window/controls/exit-button/?onclick" => 'https://pilot.parts/programs/welcome/window/controls/exit-button/onclick.js',
 "https://pilot.parts/programs/welcome/window/controls/exit-button/?onpointerdown" => 'https://pilot.parts/programs/welcome/window/controls/exit-button/onpointerdown.js',
 "https://pilot.parts/programs/welcome/window/controls/minimize-button/down-fx.uri" => 'https://pilot.parts/programs/welcome/window/controls/minimize-button/layout.css',
 "https://pilot.parts/programs/welcome/window/controls/minimize-button/down.txt" => '0',
 "https://pilot.parts/programs/welcome/window/controls/minimize-button/down.txt?fx" => 'https://pilot.parts/programs/welcome/window/controls/minimize-button/down-fx.uri',
 "https://pilot.parts/programs/welcome/window/controls/minimize-button/layout.css?down" => 'https://pilot.parts/programs/welcome/window/controls/minimize-button/down.txt',
 "https://pilot.parts/programs/welcome/window/controls/minimize-button/layout.css?constructor" => 'https://pilot.parts/programs/relate/window/controls/minimize-button/layout.css.c.js',
 "https://pilot.parts/programs/welcome/window/controls/minimize-button/onclick.js" => '()=>{_[\'https://pilot.parts/programs/welcome/window/minimized.txt\'] = \'1\'
  }',
 "https://pilot.parts/programs/welcome/window/controls/minimize-button/onpointerdown.js" => 'e => { e.stopPropagation(); _[\'https://pilot.parts/programs/welcome/window/controls/minimize-button/down.txt\'] = \'1\'; _[\'https://core.parts/behaviors/release/src.uri\'] = \'https://pilot.parts/programs/welcome/window/controls/minimize-button/release.js\'
  }',
 "https://pilot.parts/programs/welcome/window/controls/minimize-button/release.js" => 'e => { _[\'https://pilot.parts/programs/welcome/window/controls/minimize-button/down.txt\'] = \'0\'
  }',
 "https://pilot.parts/programs/welcome/window/controls/minimize-button/?layout" => 'https://pilot.parts/programs/welcome/window/controls/minimize-button/layout.css',
 "https://pilot.parts/programs/welcome/window/controls/minimize-button/?onclick" => 'https://pilot.parts/programs/welcome/window/controls/minimize-button/onclick.js',
 "https://pilot.parts/programs/welcome/window/controls/minimize-button/?onpointerdown" => 'https://pilot.parts/programs/welcome/window/controls/minimize-button/onpointerdown.js',
 "https://pilot.parts/programs/welcome/window/controls/layout.css" => '
  :host {
   display: flex;
   flex-flow: row nowrap
  }',
 "https://pilot.parts/programs/welcome/window/controls/manifest.uri" => 'https://pilot.parts/programs/welcome/window/controls/minimize-button/ https://pilot.parts/programs/welcome/window/controls/exit-button/',
 "https://pilot.parts/programs/welcome/window/controls/?layout" => 'https://pilot.parts/programs/welcome/window/controls/layout.css',
 "https://pilot.parts/programs/welcome/window/controls/?manifest" => 'https://pilot.parts/programs/welcome/window/controls/manifest.uri',
 "https://pilot.parts/programs/welcome/window/layout.css?active" => 'https://pilot.parts/programs/welcome/window/active.txt',
 "https://pilot.parts/programs/welcome/window/layout.css?position" => 'https://pilot.parts/programs/welcome/window/position.json',
 "https://pilot.parts/programs/welcome/window/layout.css?constructor" => 'https://pilot.parts/programs/welcome/window/layout.css.c.js',
 "https://pilot.parts/programs/welcome/window/layout.css.c.js" => '
  const
   common = `
    position: absolute;
    display: flex;
    flex-flow: column nowrap;
    gap: 2px;
    background: #c3c3c3;
    box-sizing: border-box;`,
   titlebar = ("" + active) === "1" ? `title-bar {
    background: rgb(0, 0, 163);
   }` : ``;
  const { x = 0, y = 0, w = 0, h = 0 } = JSON.parse("" + position);
  return `
   :host {
    width: ${w}px;
    height: ${h}px;
    left: ${x}px;
    top: ${y}px;
    min-height: fit-content;
    padding: 4px;
    background: #c3c3c3;
    box-shadow:
     inset -1px -1px black,
     inset 1px 1px #c3c3c3,
     inset -2px -2px #7a7a7a,
     inset 2px 2px white,
     5px 7px 3px #0002;
    ${common}
   }
   ${titlebar}`',
 "https://pilot.parts/programs/welcome/window/manifest.uri?title" => 'https://pilot.parts/programs/welcome/window/title-bar/',
 "https://pilot.parts/programs/welcome/window/manifest.uri?panel" => 'https://pilot.parts/programs/welcome/window/panel/',
 "https://pilot.parts/programs/welcome/window/manifest.uri?transform_path" => 'https://pilot.parts/programs/welcome/window/transform/',
 "https://pilot.parts/programs/welcome/window/manifest.uri?transform" => 'https://core.parts/components/transform/construct.js',
 "https://pilot.parts/programs/welcome/window/manifest.uri?position" => 'https://pilot.parts/programs/welcome/window/position.json',
 "https://pilot.parts/programs/welcome/window/manifest.uri?constructor" => 'https://pilot.parts/programs/welcome/window/manifest.uri.c.js',
 "https://pilot.parts/programs/welcome/window/manifest.uri.c.js" => <<<JS
  const [title_url, panel_url, transform_url, position_url] = [title, panel, transform_path, position].map(x => x.headerOf().href)
  const transform_urls = transform(transform_url, position_url, "", title_url);
  const urlSet = [title_url, panel_url]
  if (transform_urls) urlSet.push(transform_urls)
  return urlSet.join(" ")
  JS,
 "https://pilot.parts/programs/welcome/window/minimized.txt" => '0',
 "https://pilot.parts/programs/welcome/window/minimized.txt?fx" => 'https://pilot.parts/programs/welcome/window/minimized/fx.uri',
 "https://pilot.parts/programs/welcome/window/minimized/fx.uri" => 'https://pilot.parts/manifest.uri https://pilot.parts/programs/welcome/window/active.txt https://pilot.parts/programs/welcome/task/onpointerdown.js',
 "https://pilot.parts/programs/welcome/window/onfocus.js?active" => 'https://pilot.parts/programs/welcome/window/active.txt',
 "https://pilot.parts/programs/welcome/window/onfocus.js?window" => 'https://pilot.parts/programs/welcome/window/',
 "https://pilot.parts/programs/welcome/window/onfocus.js?constructor" => 'https://core.parts/behaviors/window-focus.c.js',
 "https://pilot.parts/programs/welcome/window/position.json" => '
  {
   "x": 32,
   "y": 24,
   "w": 492,
   "h": 229,
   "range": {
    "x": [-64, 512],
    "y": [-2, 256],
    "w": [96, 256],
    "h": [64, 128]
   }
  }',
 "https://pilot.parts/programs/welcome/window/position.json?fx" => 'https://pilot.parts/programs/welcome/window/position/fx.uri',
 "https://pilot.parts/programs/welcome/window/position/fx.uri" => 'https://pilot.parts/programs/welcome/window/layout.css',
 "https://pilot.parts/programs/welcome/window/title-bar/manifest.uri" => 'https://pilot.parts/programs/welcome/app-icon/ https://pilot.parts/programs/welcome/app-label/ https://core.parts/flex-spacer/ https://pilot.parts/programs/welcome/window/controls/',
 "https://pilot.parts/programs/welcome/window/title-bar/?layout" => 'https://pilot.parts/programs/invite/window/title-bar/layout.css',
 "https://pilot.parts/programs/welcome/window/title-bar/?manifest" => 'https://pilot.parts/programs/welcome/window/title-bar/manifest.uri',
 "https://pilot.parts/programs/welcome/window/?layout" => 'https://pilot.parts/programs/welcome/window/layout.css',
 "https://pilot.parts/programs/welcome/window/?manifest" => 'https://pilot.parts/programs/welcome/window/manifest.uri',
 "https://pilot.parts/programs/welcome/window/?onfocus" => 'https://pilot.parts/programs/welcome/window/onfocus.js',
 "https://pilot.parts/programs/welcome/window/panel/?layout" => 'https://pilot.parts/programs/welcome/window/panel/layout.css',
 "https://pilot.parts/programs/welcome/window/panel/layout.css" => '
  :host {
   height: 100%;
   display: grid;
   padding: 12px;
   gap: 12px;
   grid-template-columns: 1fr 100px;
   grid-template-rows: 24px 1fr;
   grid-template-areas:
    "head head"
    "tips btns";
  }
  heading- {
   grid-area: head;
  }',

 "https://pilot.parts/programs/welcome/window/panel/?manifest" => 'https://pilot.parts/programs/welcome/window/panel/manifest.uri',
 "https://pilot.parts/programs/welcome/window/panel/manifest.uri" => 'https://pilot.parts/programs/welcome/window/panel/heading/ https://pilot.parts/programs/welcome/window/panel/tip/ https://pilot.parts/programs/welcome/window/panel/menu/',
 "https://pilot.parts/programs/welcome/window/panel/heading/?layout" => 'https://pilot.parts/programs/welcome/window/panel/heading/layout.css',
 "https://pilot.parts/programs/welcome/window/panel/heading/layout.css" => ':host { display: flex; flex-flow: row nowrap; font-size: 24px; line-height: 24px; } :host::before { content: "Welcome to\00a0"; font-weight: 300; } :host::after { content: "Pilot"; font-weight: 700; }',
 "https://pilot.parts/programs/welcome/window/panel/tip/?layout" => 'https://pilot.parts/programs/welcome/window/panel/tip/layout.css',
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-0.txt" => 'No matter how much space a file takes up, an exact copy of that file takes up almost no space.',
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-1.txt" => '🔗 Kireji are files that describe other files.',
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-2.txt" => 'To change which programs open on start up, set the core how you want it and save. Pilot always boots into the last saved state.',
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-3.txt" => '🧬 Relate is a program that lets you modify any Pilot file using a node editor interface.',
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-4.txt" => 'Use 📁 Locate to browse all files on this virtual computer.',
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-5.txt" => 'Pilot is a website. 📁 Locate is the site map.',
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-6.txt" => 'This computer is a client. You can open as many different clients as you want.',
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-7.txt" => 'When the mind is enlightened, the spirit is freed and the body matters not.',
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-8.txt" => 'There is always a virtual computer running in the background called the server.',
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-9.txt" => 'On your device, there is one virtual computer running per website in the network.',
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-10.txt" => 'If you immediately know the candle light is fire, the meal was cooked long ago.',
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-11.txt" => 'To discard a client without saving, simply close the tab it is running in.',
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-12.txt" => 'When you perform a factory reset, it completely erases the core you\'ve made and re-downloads Pilot from the server.',
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-13.txt" => 'This website doesn\'t have a privacy policy, because it doesn\'t collect any information.',
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-14.txt" => 'You can establish your own peer-to-peer connections to socialize, stream multimedia, play multiplayer games, and keep files in sync across tabs, browsers, and devices.',
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-15.txt" => 'All in-network websites work offline after you visit any one of them just once.',
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-16.txt" => 'Pilot is bigger on the inside than it is on the outside. You downloaded about 200kb of code from the server.',
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-17.txt" => 'Lightning flashes, sparks shower, in one blink of your eyes you have missed seeing.',
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-18.txt" => 'You must complete the journey you began at Kheb. Only then will you be able to find your way to the Great Path.',
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-19.txt" => '🔗 Kireji are used to link files to constructors.',
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-20.txt" => 'In 📁 Locate, right click any file to download it.',
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-21.txt" => 'A \'constructor\' is a file used to generate another file.',
 "https://pilot.parts/programs/welcome/window/panel/tip/count.txt" => '22',
 "https://pilot.parts/programs/welcome/window/panel/tip/layout.css?constructor" => 'https://pilot.parts/programs/welcome/window/panel/tip/layout.css.c.js',
 "https://pilot.parts/programs/welcome/window/panel/tip/layout.css?tip_index" => 'https://pilot.parts/programs/welcome/window/panel/tip/index.txt',
 "https://pilot.parts/programs/welcome/window/panel/tip/index.txt" => '13',
 "https://pilot.parts/programs/welcome/window/panel/tip/index.txt?fx" => 'https://pilot.parts/programs/welcome/window/panel/tip/change.uri',
 "https://pilot.parts/programs/welcome/window/panel/tip/change.uri" => 'https://pilot.parts/programs/welcome/window/panel/tip/layout.css',
 "https://pilot.parts/programs/welcome/window/panel/tip/layout.css.c.js" => '
  return `:host {
   display: grid;
   grid-template-rows: 32px 1fr;
   grid-template-columns: 1fr;
   overflow: hidden;
   box-sizing: border-box;
   padding: 12px;
   background:
    radial-gradient(circle at center, rgb(255, 255, 65) 1px, transparent 0),
    radial-gradient(circle at center, rgb(255, 255, 65) 1px, transparent 0),
    white;
   background-size: 6px 6px;
   background-position: 0 0, 3px 3px;
   box-shadow: inset -1px -1px white, inset 1px 1px #7a7a7a;
  }
  :host::before {
   display: grid;
   content: "Did you know?";
   font-weight: 700;
  }
  :host::after {
   display: grid;
   content: "${_[`https://pilot.parts/programs/welcome/window/panel/tip/tip-${tip_index}.txt`]}";
   min-width: 0;
   white-space: wrap;
   overflow-y: auto;
  }`',
 "https://pilot.parts/programs/welcome/window/panel/menu/?layout" => 'https://pilot.parts/programs/invite/window/panel/menu/layout.css',
 "https://pilot.parts/programs/welcome/window/panel/menu/?manifest" => 'https://pilot.parts/programs/welcome/window/panel/menu/manifest.uri',
 "https://pilot.parts/programs/welcome/window/panel/menu/?core" => '',
 "https://pilot.parts/programs/welcome/window/panel/menu/manifest.uri?constructor" => 'https://pilot.parts/programs/welcome/window/panel/menu/manifest.uri.c.js',
 "https://pilot.parts/programs/welcome/window/panel/menu/manifest.uri?button" => 'https://core.parts/components/button/construct.js',
 "https://pilot.parts/programs/welcome/window/panel/menu/manifest.uri.c.js" => <<<JS
  const common_url = "https://pilot.parts/programs/locate/window/panel/menu/";
  return [[
   common_url + "next-tip/",
   ":host::before { content: \'Next Tip\'; width: 100%; }",
   "",
   `() => { _["https://pilot.parts/programs/welcome/window/panel/tip/index.txt"] = (parseInt("" + _["https://pilot.parts/programs/welcome/window/panel/tip/index.txt"]) + 1) % parseInt("" + _["https://pilot.parts/programs/welcome/window/panel/tip/count.txt"]) }`,
  ]].map(config => { button(...config); return config[0] }).join(" ")
 JS,/*
Place Call */
 "https://pilot.parts/programs/invite/task/datum.txt" => 'https://pilot.parts/programs/invite/task/',
 "https://pilot.parts/programs/invite/task/index.txt?datum" => 'https://pilot.parts/programs/invite/task/datum.txt',
 "https://pilot.parts/programs/invite/task/index.txt?fx" => 'https://pilot.parts/programs/invite/task/index/fx.uri',
 "https://pilot.parts/programs/invite/task/index.txt?tasks" => 'https://pilot.parts/tasks.uri',
 "https://pilot.parts/programs/invite/task/index.txt?constructor" => 'https://pilot.parts/programs/locate/task/index.txt.c.js',
 "https://pilot.parts/programs/invite/task/index/fx.uri" => 'https://pilot.parts/programs/invite/window/active.txt',
 "https://pilot.parts/programs/invite/task/layout.css?open" => 'https://pilot.parts/programs/invite/window/active.txt',
 "https://pilot.parts/programs/invite/task/layout.css?constructor" => 'https://pilot.parts/programs/relate/task/layout.css.c.js',
 "https://pilot.parts/programs/invite/task/manifest.uri" => 'https://pilot.parts/programs/invite/app-icon/ https://pilot.parts/programs/invite/app-label/',
 "https://pilot.parts/programs/invite/task/manifest.uri?open" => 'https://pilot.parts/programs/invite/window/active.txt',
 "https://pilot.parts/programs/invite/task/onpointerdown.js?minimized" => 'https://pilot.parts/programs/invite/window/minimized.txt',
 "https://pilot.parts/programs/invite/task/onpointerdown.js?active" => 'https://pilot.parts/programs/invite/window/active.txt',
 "https://pilot.parts/programs/invite/task/onpointerdown.js?window" => 'https://pilot.parts/programs/invite/window/',
 "https://pilot.parts/programs/invite/task/onpointerdown.js?task" => 'https://pilot.parts/programs/invite/task/',
 "https://pilot.parts/programs/invite/task/onpointerdown.js?constructor" => 'https://pilot.parts/programs/relate/task/onpointerdown.c.js',
 "https://pilot.parts/programs/invite/task/open/fx.uri" => 'https://pilot.parts/programs/invite/task/layout.css https://pilot.parts/taskbar/selected.txt https://pilot.parts/programs/invite/window/layout.css https://pilot.parts/programs/invite/task/onpointerdown.js',
 "https://pilot.parts/programs/invite/task/?layout" => 'https://pilot.parts/programs/invite/task/layout.css',
 "https://pilot.parts/programs/invite/task/?manifest" => 'https://pilot.parts/programs/invite/task/manifest.uri',
 "https://pilot.parts/programs/invite/task/?onpointerdown" => 'https://pilot.parts/programs/invite/task/onpointerdown.js',
 "https://pilot.parts/programs/invite/app-icon/?layout" => 'https://pilot.parts/programs/invite/app-icon/layout.css',
 "https://pilot.parts/programs/invite/app-icon/layout.css" => '
  :host {
   --size: 16px;
   width: var(--size);
   height: var(--size);
   font-size: var(--size);
   line-height: var(--size);
  }
  :host::before {
   content: "👥";
  }',
 "https://pilot.parts/programs/invite/app-label/layout.css" => '
  return `:host {
   margin: 0;
   height: 16px;
   vertical-align: center;
   text-overflow: ellipsis;
   overflow: clip;
  }
  :host::after {
   content: "Place Call";
   white-space: nowrap;
  }`',
 "https://pilot.parts/programs/invite/app-label/?layout" => 'https://pilot.parts/programs/invite/app-label/layout.css',
 "https://pilot.parts/programs/invite/window/active.txt" => '1',
 "https://pilot.parts/programs/invite/window/active.txt?fx" => 'https://pilot.parts/programs/invite/task/open/fx.uri',
 "https://pilot.parts/programs/invite/window/active.txt?index" => 'https://pilot.parts/programs/invite/task/index.txt',
 "https://pilot.parts/programs/invite/window/active.txt?minimized" => 'https://pilot.parts/programs/invite/window/minimized.txt',
 "https://pilot.parts/programs/invite/window/active.txt?selected" => 'https://pilot.parts/taskbar/selected.txt',
 "https://pilot.parts/programs/invite/window/active.txt?constructor" => 'https://pilot.parts/programs/relate/window/active.txt.c.js',
 "https://pilot.parts/programs/invite/window/controls/exit-button/down-fx.uri" => 'https://pilot.parts/programs/invite/window/controls/exit-button/layout.css',
 "https://pilot.parts/programs/invite/window/controls/exit-button/down.txt" => '0',
 "https://pilot.parts/programs/invite/window/controls/exit-button/down.txt?fx" => 'https://pilot.parts/programs/invite/window/controls/exit-button/down-fx.uri',
 "https://pilot.parts/programs/invite/window/controls/exit-button/layout.css?down" => 'https://pilot.parts/programs/invite/window/controls/exit-button/down.txt',
 "https://pilot.parts/programs/invite/window/controls/exit-button/layout.css?constructor" => 'https://pilot.parts/programs/relate/window/controls/exit-button/layout.css.c.js',
 "https://pilot.parts/programs/invite/window/controls/exit-button/onclick.js?constructor" => 'https://core.parts/behaviors/window-close.c.js',
 "https://pilot.parts/programs/invite/window/controls/exit-button/onclick.js?window" => 'https://pilot.parts/programs/invite/window/',
 "https://pilot.parts/programs/invite/window/controls/exit-button/onclick.js?task" => 'https://pilot.parts/programs/invite/task/',
 "https://pilot.parts/programs/invite/window/controls/exit-button/onpointerdown.js" => 'e => { e.stopPropagation(); _[\'https://pilot.parts/programs/invite/window/controls/exit-button/down.txt\'] = \'1\'; _[\'https://core.parts/behaviors/release/src.uri\'] = \'https://pilot.parts/programs/invite/window/controls/exit-button/release.js\'
  }',
 "https://pilot.parts/programs/invite/window/controls/exit-button/release.js" => 'e => { _[\'https://pilot.parts/programs/invite/window/controls/exit-button/down.txt\'] = \'0\'
  }',
 "https://pilot.parts/programs/invite/window/controls/exit-button/?layout" => 'https://pilot.parts/programs/invite/window/controls/exit-button/layout.css',
 "https://pilot.parts/programs/invite/window/controls/exit-button/?onclick" => 'https://pilot.parts/programs/invite/window/controls/exit-button/onclick.js',
 "https://pilot.parts/programs/invite/window/controls/exit-button/?onpointerdown" => 'https://pilot.parts/programs/invite/window/controls/exit-button/onpointerdown.js',
 "https://pilot.parts/programs/invite/window/controls/minimize-button/down-fx.uri" => 'https://pilot.parts/programs/invite/window/controls/minimize-button/layout.css',
 "https://pilot.parts/programs/invite/window/controls/minimize-button/down.txt" => '0',
 "https://pilot.parts/programs/invite/window/controls/minimize-button/down.txt?fx" => 'https://pilot.parts/programs/invite/window/controls/minimize-button/down-fx.uri',
 "https://pilot.parts/programs/invite/window/controls/minimize-button/layout.css?down" => 'https://pilot.parts/programs/invite/window/controls/minimize-button/down.txt',
 "https://pilot.parts/programs/invite/window/controls/minimize-button/layout.css?constructor" => 'https://pilot.parts/programs/relate/window/controls/minimize-button/layout.css.c.js',
 "https://pilot.parts/programs/invite/window/controls/minimize-button/onclick.js" => '()=>{_[\'https://pilot.parts/programs/invite/window/minimized.txt\'] = \'1\'
  }',
 "https://pilot.parts/programs/invite/window/controls/minimize-button/onpointerdown.js" => 'e => { e.stopPropagation(); _[\'https://pilot.parts/programs/invite/window/controls/minimize-button/down.txt\'] = \'1\'; _[\'https://core.parts/behaviors/release/src.uri\'] = \'https://pilot.parts/programs/invite/window/controls/minimize-button/release.js\'
  }',
 "https://pilot.parts/programs/invite/window/controls/minimize-button/release.js" => 'e => { _[\'https://pilot.parts/programs/invite/window/controls/minimize-button/down.txt\'] = \'0\'
  }',
 "https://pilot.parts/programs/invite/window/controls/minimize-button/?layout" => 'https://pilot.parts/programs/invite/window/controls/minimize-button/layout.css',
 "https://pilot.parts/programs/invite/window/controls/minimize-button/?onclick" => 'https://pilot.parts/programs/invite/window/controls/minimize-button/onclick.js',
 "https://pilot.parts/programs/invite/window/controls/minimize-button/?onpointerdown" => 'https://pilot.parts/programs/invite/window/controls/minimize-button/onpointerdown.js',
 "https://pilot.parts/programs/invite/window/controls/layout.css" => '
  :host {
   display: flex;
   flex-flow: row nowrap
  }',
 "https://pilot.parts/programs/invite/window/controls/manifest.uri" => 'https://pilot.parts/programs/invite/window/controls/minimize-button/ https://pilot.parts/programs/invite/window/controls/exit-button/',
 "https://pilot.parts/programs/invite/window/controls/?layout" => 'https://pilot.parts/programs/invite/window/controls/layout.css',
 "https://pilot.parts/programs/invite/window/controls/?manifest" => 'https://pilot.parts/programs/invite/window/controls/manifest.uri',
 "https://pilot.parts/programs/invite/window/layout.css?active" => 'https://pilot.parts/programs/invite/window/active.txt',
 "https://pilot.parts/programs/invite/window/layout.css?position" => 'https://pilot.parts/programs/invite/window/position.json',
 "https://pilot.parts/programs/invite/window/layout.css?constructor" => 'https://pilot.parts/programs/welcome/window/layout.css.c.js',
 "https://pilot.parts/programs/invite/window/manifest.uri?title" => 'https://pilot.parts/programs/invite/window/title-bar/',
 "https://pilot.parts/programs/invite/window/manifest.uri?panel" => 'https://pilot.parts/programs/invite/window/panel/',
 "https://pilot.parts/programs/invite/window/manifest.uri?transform_path" => 'https://pilot.parts/programs/invite/window/transform/',
 "https://pilot.parts/programs/invite/window/manifest.uri?transform" => 'https://core.parts/components/transform/construct.js',
 "https://pilot.parts/programs/invite/window/manifest.uri?position" => 'https://pilot.parts/programs/invite/window/position.json',
 "https://pilot.parts/programs/invite/window/manifest.uri?constructor" => 'https://pilot.parts/programs/invite/window/manifest.uri.c.js',
 "https://pilot.parts/programs/invite/window/manifest.uri.c.js" => <<<JS
  const [title_url, panel_url, transform_url, position_url] = [title, panel, transform_path, position].map(x => x.headerOf().href)
  const transform_urls = transform(transform_url, position_url, "", title_url);
  const urlSet = [title_url, panel_url]
  if (transform_urls) urlSet.push(transform_urls)
  return urlSet.join(" ")
  JS,
 "https://pilot.parts/programs/invite/window/minimized.txt" => '0',
 "https://pilot.parts/programs/invite/window/minimized.txt?fx" => 'https://pilot.parts/programs/invite/window/minimized/fx.uri',
 "https://pilot.parts/programs/invite/window/minimized/fx.uri" => 'https://pilot.parts/manifest.uri https://pilot.parts/programs/invite/window/active.txt https://pilot.parts/programs/invite/task/onpointerdown.js',
 "https://pilot.parts/programs/invite/window/onfocus.js?active" => 'https://pilot.parts/programs/invite/window/active.txt',
 "https://pilot.parts/programs/invite/window/onfocus.js?window" => 'https://pilot.parts/programs/invite/window/',
 "https://pilot.parts/programs/invite/window/onfocus.js?constructor" => 'https://core.parts/behaviors/window-focus.c.js',
 "https://pilot.parts/programs/invite/window/position.json" => '
  {
   "x": 32,
   "y": 24,
   "w": 492,
   "h": 229,
   "range": {
    "x": [-64, 512],
    "y": [-2, 256],
    "w": [96, 256],
    "h": [64, 128]
   }
  }',
 "https://pilot.parts/programs/invite/window/position.json?fx" => 'https://pilot.parts/programs/invite/window/position/fx.uri',
 "https://pilot.parts/programs/invite/window/position/fx.uri" => 'https://pilot.parts/programs/invite/window/layout.css',
 "https://pilot.parts/programs/invite/window/title-bar/layout.css" => '
  :host {
   background: #7f7f7f;
   color: white;
   display: flex;
   flex-flow: row nowrap;
   align-items: center;
   gap: 3px;
   height: 18px;
   flex: 0 0 18px;
   padding: 0px 2px;
   box-sizing: border-box;
  }
  app-icon {
   width: 16px;
   height: 16px;
  }',
 "https://pilot.parts/programs/invite/window/title-bar/manifest.uri" => 'https://pilot.parts/programs/invite/app-icon/ https://pilot.parts/programs/invite/app-label/ https://core.parts/flex-spacer/ https://pilot.parts/programs/invite/window/controls/',
 "https://pilot.parts/programs/invite/window/title-bar/?layout" => 'https://pilot.parts/programs/invite/window/title-bar/layout.css',
 "https://pilot.parts/programs/invite/window/title-bar/?manifest" => 'https://pilot.parts/programs/invite/window/title-bar/manifest.uri',
 "https://pilot.parts/programs/invite/window/?layout" => 'https://pilot.parts/programs/invite/window/layout.css',
 "https://pilot.parts/programs/invite/window/?manifest" => 'https://pilot.parts/programs/invite/window/manifest.uri',
 "https://pilot.parts/programs/invite/window/?onfocus" => 'https://pilot.parts/programs/invite/window/onfocus.js',
 "https://pilot.parts/programs/invite/window/panel/?layout" => 'https://pilot.parts/programs/invite/window/panel/layout.css',
 "https://pilot.parts/programs/invite/window/panel/layout.css" => '
  :host {
   height: 100%;
   display: grid;
   padding: 12px;
   gap: 12px;
   grid-template-columns: 1fr 100px;
   grid-template-rows: 24px 1fr;
   grid-template-areas:
    "head head"
    "call btns";
  }
  heading- {
   grid-area: head;
  }',
 "https://pilot.parts/programs/invite/connection/call.txt" => '',
 "https://pilot.parts/programs/invite/connection/call.txt?fx" => 'https://pilot.parts/programs/invite/connection/call.uri',
 "https://pilot.parts/programs/invite/connection/call.uri" => 'https://pilot.parts/programs/invite/window/panel/call/layout.css',
 "https://pilot.parts/programs/invite/window/panel/?manifest" => 'https://pilot.parts/programs/invite/window/panel/manifest.uri',
 "https://pilot.parts/programs/invite/window/panel/manifest.uri" => 'https://pilot.parts/programs/invite/window/panel/heading/ https://pilot.parts/programs/invite/window/panel/call/ https://pilot.parts/programs/invite/window/panel/menu/',
 "https://pilot.parts/programs/invite/window/panel/heading/?layout" => 'https://pilot.parts/programs/invite/window/panel/heading/layout.css',
 "https://pilot.parts/programs/invite/window/panel/heading/layout.css" => ':host { display: flex; flex-flow: row nowrap; font-size: 24px; line-height: 24px; } :host::before { content: "Place Call\00a0"; font-weight: 300; }',
 "https://pilot.parts/programs/invite/window/panel/menu/?layout" => 'https://pilot.parts/programs/invite/window/panel/menu/layout.css',
 "https://pilot.parts/programs/invite/window/panel/menu/?manifest" => 'https://pilot.parts/programs/invite/window/panel/menu/manifest.uri',
 "https://pilot.parts/programs/invite/window/panel/menu/?core" => '',
 "https://pilot.parts/programs/invite/window/panel/menu/layout.css" => ':host { display: flex; flex-flow: column nowrap; gap: 7px; } :host > * { height: 23px; padding: 3px; display: flex; flex-flow: row nowrap; text-align: center; }',
 "https://pilot.parts/programs/invite/window/panel/menu/manifest.uri?constructor" => 'https://pilot.parts/programs/invite/window/panel/menu/manifest.uri.c.js',
 "https://pilot.parts/programs/invite/window/panel/menu/manifest.uri?button" => 'https://core.parts/components/button/construct.js',
 "https://pilot.parts/programs/invite/window/panel/menu/manifest.uri?call" => 'https://pilot.parts/programs/invite/connection/call.txt',
 "https://pilot.parts/programs/invite/window/panel/menu/manifest.uri.c.js" => <<<JS
  const common_url = "https://pilot.parts/programs/invite/window/panel/menu/";
  const owner = new RTCPeerConnection()
  owner.onicecandidate = () => globalThis.offer = _[call.headerOf().href] = JSON.stringify(owner.localDescription)
  const channel = owner.createDataChannel("untitled")

  channel.onmessage = e => console.log(e.target.label + " message => " + JSON.stringify(e.data))
  channel.onclose = e => console.log(e.target.label + " closed!")
  channel.onopen = e => console.log(e.target.label + " opened!")

  owner.createOffer().then(o => owner.setLocalDescription(o))
  globalThis.answer = a => {
   owner.setRemoteDescription(a).catch(e => {
    if (owner.signalingState === "stable") return
    console.error(e)
   })
   return a
  }
  
  return [[
   common_url + "copy/",
   ":host::before { content: \'Copy Call\'; width: 100%; }",
   "",
    `() => { const str = ""+_["\${call.headerOf().href}"]; navigator.clipboard.writeText(str) }`,
  ],[
   common_url + "paste/",
   ":host::before { content: \'Paste Answer\'; width: 100%; }",
   "",
   `() => navigator.clipboard.readText().then(x => _["\${answer.headerOf().href}"] = x )`,
  ]].map(config => { button(...config); return config[0] }).join(" ")
  JS,
 "https://pilot.parts/programs/invite/window/panel/call/?layout" => 'https://pilot.parts/programs/invite/window/panel/call/layout.css',
 "https://pilot.parts/programs/invite/window/panel/call/layout.css?core" => 'https://pilot.parts/programs/answer/window/panel/answer/layout.css',
 "https://pilot.parts/programs/invite/window/panel/call/layout.css?data" => 'https://pilot.parts/programs/invite/connection/call.txt',/*
Answer Call */
 "https://pilot.parts/programs/answer/task/datum.txt" => 'https://pilot.parts/programs/answer/task/',
 "https://pilot.parts/programs/answer/task/index.txt?datum" => 'https://pilot.parts/programs/answer/task/datum.txt',
 "https://pilot.parts/programs/answer/task/index.txt?fx" => 'https://pilot.parts/programs/answer/task/index/fx.uri',
 "https://pilot.parts/programs/answer/task/index.txt?tasks" => 'https://pilot.parts/tasks.uri',
 "https://pilot.parts/programs/answer/task/index.txt?constructor" => 'https://pilot.parts/programs/locate/task/index.txt.c.js',
 "https://pilot.parts/programs/answer/task/index/fx.uri" => 'https://pilot.parts/programs/answer/window/active.txt',
 "https://pilot.parts/programs/answer/task/layout.css?open" => 'https://pilot.parts/programs/answer/window/active.txt',
 "https://pilot.parts/programs/answer/task/layout.css?constructor" => 'https://pilot.parts/programs/relate/task/layout.css.c.js',
 "https://pilot.parts/programs/answer/task/manifest.uri" => 'https://pilot.parts/programs/answer/app-icon/ https://pilot.parts/programs/answer/app-label/',
 "https://pilot.parts/programs/answer/task/manifest.uri?open" => 'https://pilot.parts/programs/answer/window/active.txt',
 "https://pilot.parts/programs/answer/task/onpointerdown.js?minimized" => 'https://pilot.parts/programs/answer/window/minimized.txt',
 "https://pilot.parts/programs/answer/task/onpointerdown.js?active" => 'https://pilot.parts/programs/answer/window/active.txt',
 "https://pilot.parts/programs/answer/task/onpointerdown.js?window" => 'https://pilot.parts/programs/answer/window/',
 "https://pilot.parts/programs/answer/task/onpointerdown.js?task" => 'https://pilot.parts/programs/answer/task/',
 "https://pilot.parts/programs/answer/task/onpointerdown.js?constructor" => 'https://pilot.parts/programs/relate/task/onpointerdown.c.js',
 "https://pilot.parts/programs/answer/task/open/fx.uri" => 'https://pilot.parts/programs/answer/task/layout.css https://pilot.parts/taskbar/selected.txt https://pilot.parts/programs/answer/window/layout.css https://pilot.parts/programs/answer/task/onpointerdown.js',
 "https://pilot.parts/programs/answer/task/?layout" => 'https://pilot.parts/programs/answer/task/layout.css',
 "https://pilot.parts/programs/answer/task/?manifest" => 'https://pilot.parts/programs/answer/task/manifest.uri',
 "https://pilot.parts/programs/answer/task/?onpointerdown" => 'https://pilot.parts/programs/answer/task/onpointerdown.js',
 "https://pilot.parts/programs/answer/app-icon/?layout" => 'https://pilot.parts/programs/answer/app-icon/layout.css',
 "https://pilot.parts/programs/answer/app-icon/layout.css" => '
  :host {
   --size: 16px;
   width: var(--size);
   height: var(--size);
   font-size: var(--size);
   line-height: var(--size);
  }
  :host::before {
   content: "👥";
  }',
 "https://pilot.parts/programs/answer/app-label/layout.css" => '
  return `:host {
   margin: 0;
   height: 16px;
   vertical-align: center;
   text-overflow: ellipsis;
   overflow: clip;
  }
  :host::after {
   content: "Answer Call";
   white-space: nowrap;
  }`',
 "https://pilot.parts/programs/answer/app-label/?layout" => 'https://pilot.parts/programs/answer/app-label/layout.css',
 "https://pilot.parts/programs/answer/window/active.txt" => '1',
 "https://pilot.parts/programs/answer/window/active.txt?fx" => 'https://pilot.parts/programs/answer/task/open/fx.uri',
 "https://pilot.parts/programs/answer/window/active.txt?index" => 'https://pilot.parts/programs/answer/task/index.txt',
 "https://pilot.parts/programs/answer/window/active.txt?minimized" => 'https://pilot.parts/programs/answer/window/minimized.txt',
 "https://pilot.parts/programs/answer/window/active.txt?selected" => 'https://pilot.parts/taskbar/selected.txt',
 "https://pilot.parts/programs/answer/window/active.txt?constructor" => 'https://pilot.parts/programs/relate/window/active.txt.c.js',
 "https://pilot.parts/programs/answer/window/controls/exit-button/down-fx.uri" => 'https://pilot.parts/programs/answer/window/controls/exit-button/layout.css',
 "https://pilot.parts/programs/answer/window/controls/exit-button/down.txt" => '0',
 "https://pilot.parts/programs/answer/window/controls/exit-button/down.txt?fx" => 'https://pilot.parts/programs/answer/window/controls/exit-button/down-fx.uri',
 "https://pilot.parts/programs/answer/window/controls/exit-button/layout.css?down" => 'https://pilot.parts/programs/answer/window/controls/exit-button/down.txt',
 "https://pilot.parts/programs/answer/window/controls/exit-button/layout.css?constructor" => 'https://pilot.parts/programs/relate/window/controls/exit-button/layout.css.c.js',
 "https://pilot.parts/programs/answer/window/controls/exit-button/onclick.js?constructor" => 'https://core.parts/behaviors/window-close.c.js',
 "https://pilot.parts/programs/answer/window/controls/exit-button/onclick.js?window" => 'https://pilot.parts/programs/answer/window/',
 "https://pilot.parts/programs/answer/window/controls/exit-button/onclick.js?task" => 'https://pilot.parts/programs/answer/task/',
 "https://pilot.parts/programs/answer/window/controls/exit-button/onpointerdown.js" => 'e => { e.stopPropagation(); _[\'https://pilot.parts/programs/answer/window/controls/exit-button/down.txt\'] = \'1\'; _[\'https://core.parts/behaviors/release/src.uri\'] = \'https://pilot.parts/programs/answer/window/controls/exit-button/release.js\'
  }',
 "https://pilot.parts/programs/answer/window/controls/exit-button/release.js" => 'e => { _[\'https://pilot.parts/programs/answer/window/controls/exit-button/down.txt\'] = \'0\'
  }',
 "https://pilot.parts/programs/answer/window/controls/exit-button/?layout" => 'https://pilot.parts/programs/answer/window/controls/exit-button/layout.css',
 "https://pilot.parts/programs/answer/window/controls/exit-button/?onclick" => 'https://pilot.parts/programs/answer/window/controls/exit-button/onclick.js',
 "https://pilot.parts/programs/answer/window/controls/exit-button/?onpointerdown" => 'https://pilot.parts/programs/answer/window/controls/exit-button/onpointerdown.js',
 "https://pilot.parts/programs/answer/window/controls/minimize-button/down-fx.uri" => 'https://pilot.parts/programs/answer/window/controls/minimize-button/layout.css',
 "https://pilot.parts/programs/answer/window/controls/minimize-button/down.txt" => '0',
 "https://pilot.parts/programs/answer/window/controls/minimize-button/down.txt?fx" => 'https://pilot.parts/programs/answer/window/controls/minimize-button/down-fx.uri',
 "https://pilot.parts/programs/answer/window/controls/minimize-button/layout.css?down" => 'https://pilot.parts/programs/answer/window/controls/minimize-button/down.txt',
 "https://pilot.parts/programs/answer/window/controls/minimize-button/layout.css?constructor" => 'https://pilot.parts/programs/relate/window/controls/minimize-button/layout.css.c.js',
 "https://pilot.parts/programs/answer/window/controls/minimize-button/onclick.js" => '()=>{_[\'https://pilot.parts/programs/answer/window/minimized.txt\'] = \'1\'
  }',
 "https://pilot.parts/programs/answer/window/controls/minimize-button/onpointerdown.js" => 'e => { e.stopPropagation(); _[\'https://pilot.parts/programs/answer/window/controls/minimize-button/down.txt\'] = \'1\'; _[\'https://core.parts/behaviors/release/src.uri\'] = \'https://pilot.parts/programs/answer/window/controls/minimize-button/release.js\'
  }',
 "https://pilot.parts/programs/answer/window/controls/minimize-button/release.js" => 'e => { _[\'https://pilot.parts/programs/answer/window/controls/minimize-button/down.txt\'] = \'0\'
  }',
 "https://pilot.parts/programs/answer/window/controls/minimize-button/?layout" => 'https://pilot.parts/programs/answer/window/controls/minimize-button/layout.css',
 "https://pilot.parts/programs/answer/window/controls/minimize-button/?onclick" => 'https://pilot.parts/programs/answer/window/controls/minimize-button/onclick.js',
 "https://pilot.parts/programs/answer/window/controls/minimize-button/?onpointerdown" => 'https://pilot.parts/programs/answer/window/controls/minimize-button/onpointerdown.js',
 "https://pilot.parts/programs/answer/window/controls/layout.css" => '
  :host {
   display: flex;
   flex-flow: row nowrap
  }',
 "https://pilot.parts/programs/answer/window/controls/manifest.uri" => 'https://pilot.parts/programs/answer/window/controls/minimize-button/ https://pilot.parts/programs/answer/window/controls/exit-button/',
 "https://pilot.parts/programs/answer/window/controls/?layout" => 'https://pilot.parts/programs/answer/window/controls/layout.css',
 "https://pilot.parts/programs/answer/window/controls/?manifest" => 'https://pilot.parts/programs/answer/window/controls/manifest.uri',
 "https://pilot.parts/programs/answer/window/layout.css?active" => 'https://pilot.parts/programs/answer/window/active.txt',
 "https://pilot.parts/programs/answer/window/layout.css?position" => 'https://pilot.parts/programs/answer/window/position.json',
 "https://pilot.parts/programs/answer/window/layout.css?constructor" => 'https://pilot.parts/programs/welcome/window/layout.css.c.js',
 "https://pilot.parts/programs/answer/window/manifest.uri?title" => 'https://pilot.parts/programs/answer/window/title-bar/',
 "https://pilot.parts/programs/answer/window/manifest.uri?panel" => 'https://pilot.parts/programs/answer/window/panel/',
 "https://pilot.parts/programs/answer/window/manifest.uri?transform_path" => 'https://pilot.parts/programs/answer/window/transform/',
 "https://pilot.parts/programs/answer/window/manifest.uri?transform" => 'https://core.parts/components/transform/construct.js',
 "https://pilot.parts/programs/answer/window/manifest.uri?position" => 'https://pilot.parts/programs/answer/window/position.json',
 "https://pilot.parts/programs/answer/window/manifest.uri?constructor" => 'https://pilot.parts/programs/answer/window/manifest.uri.c.js',
 "https://pilot.parts/programs/answer/window/manifest.uri.c.js" => <<<JS
  const [title_url, panel_url, transform_url, position_url] = [title, panel, transform_path, position].map(x => x.headerOf().href)
  const transform_urls = transform(transform_url, position_url, "", title_url);
  const urlSet = [title_url, panel_url]
  if (transform_urls) urlSet.push(transform_urls)
  return urlSet.join(" ")
  JS,
 "https://pilot.parts/programs/answer/window/minimized.txt" => '0',
 "https://pilot.parts/programs/answer/window/minimized.txt?fx" => 'https://pilot.parts/programs/answer/window/minimized/fx.uri',
 "https://pilot.parts/programs/answer/window/minimized/fx.uri" => 'https://pilot.parts/manifest.uri https://pilot.parts/programs/answer/window/active.txt https://pilot.parts/programs/answer/task/onpointerdown.js',
 "https://pilot.parts/programs/answer/window/onfocus.js?active" => 'https://pilot.parts/programs/answer/window/active.txt',
 "https://pilot.parts/programs/answer/window/onfocus.js?window" => 'https://pilot.parts/programs/answer/window/',
 "https://pilot.parts/programs/answer/window/onfocus.js?constructor" => 'https://core.parts/behaviors/window-focus.c.js',
 "https://pilot.parts/programs/answer/window/position.json" => '
  {
   "x": 72,
   "y": 44,
   "w": 350,
   "h": 250,
   "range": {
    "x": [-64, 512],
    "y": [-2, 256],
    "w": [96, 256],
    "h": [64, 128]
   }
  }',
 "https://pilot.parts/programs/answer/window/position.json?fx" => 'https://pilot.parts/programs/answer/window/position/fx.uri',
 "https://pilot.parts/programs/answer/window/position/fx.uri" => 'https://pilot.parts/programs/answer/window/layout.css',
 "https://pilot.parts/programs/answer/window/title-bar/manifest.uri" => 'https://pilot.parts/programs/answer/app-icon/ https://pilot.parts/programs/answer/app-label/ https://core.parts/flex-spacer/ https://pilot.parts/programs/answer/window/controls/',
 "https://pilot.parts/programs/answer/window/title-bar/?layout" => 'https://pilot.parts/programs/invite/window/title-bar/layout.css',
 "https://pilot.parts/programs/answer/window/title-bar/?manifest" => 'https://pilot.parts/programs/answer/window/title-bar/manifest.uri',
 "https://pilot.parts/programs/answer/window/?layout" => 'https://pilot.parts/programs/answer/window/layout.css',
 "https://pilot.parts/programs/answer/window/?manifest" => 'https://pilot.parts/programs/answer/window/manifest.uri',
 "https://pilot.parts/programs/answer/window/?onfocus" => 'https://pilot.parts/programs/answer/window/onfocus.js',
 "https://pilot.parts/programs/answer/window/panel/?layout" => 'https://pilot.parts/programs/answer/window/panel/layout.css',
 "https://pilot.parts/programs/answer/window/panel/layout.css" => '
  :host {
   height: 100%;
   display: grid;
   padding: 12px;
   gap: 12px;
   grid-template-columns: 1fr 100px;
   grid-template-rows: 24px 1fr;
   grid-template-areas:
    "head head"
    "answer btns";
  }
  heading- {
   grid-area: head;
  }',
 "https://pilot.parts/programs/answer/connection/call.txt" => '',
 "https://pilot.parts/programs/answer/connection/call.txt?fx" => 'https://pilot.parts/programs/answer/window/panel/call/change.uri',
 "https://pilot.parts/programs/answer/window/panel/call/change.uri" => 'https://pilot.parts/programs/answer/window/panel/call/layout.css https://pilot.parts/programs/answer/window/panel/menu/manifest.uri',
 "https://pilot.parts/programs/answer/connection/answer.txt" => '',
 "https://pilot.parts/programs/answer/connection/answered.txt" => '0',
 "https://pilot.parts/programs/answer/connection/answer.txt?fx" => 'https://pilot.parts/programs/answer/window/panel/answer/change.uri',
 "https://pilot.parts/programs/answer/window/panel/answer/change.uri" => 'https://pilot.parts/programs/answer/window/panel/answer/layout.css',
 "https://pilot.parts/programs/answer/window/panel/?manifest" => 'https://pilot.parts/programs/answer/window/panel/manifest.uri',
 "https://pilot.parts/programs/answer/window/panel/manifest.uri" => 'https://pilot.parts/programs/answer/window/panel/heading/ https://pilot.parts/programs/answer/window/panel/answer/ https://pilot.parts/programs/answer/window/panel/menu/',
 "https://pilot.parts/programs/answer/window/panel/heading/?layout" => 'https://pilot.parts/programs/answer/window/panel/heading/layout.css',
 "https://pilot.parts/programs/answer/window/panel/heading/layout.css" => ':host { display: flex; flex-flow: row nowrap; font-size: 24px; line-height: 24px; } :host::before { content: "Answer Call\00a0"; font-weight: 300; }',
 "https://pilot.parts/programs/answer/window/panel/menu/?layout" => 'https://pilot.parts/programs/invite/window/panel/menu/layout.css',
 "https://pilot.parts/programs/answer/window/panel/menu/?manifest" => 'https://pilot.parts/programs/answer/window/panel/menu/manifest.uri',
 "https://pilot.parts/programs/answer/window/panel/menu/?core" => '',
 "https://pilot.parts/programs/answer/window/panel/menu/manifest.uri?constructor" => 'https://pilot.parts/programs/answer/window/panel/menu/manifest.uri.c.js',
 "https://pilot.parts/programs/answer/window/panel/menu/manifest.uri?button" => 'https://core.parts/components/button/construct.js',
 "https://pilot.parts/programs/answer/window/panel/menu/manifest.uri?call" => 'https://pilot.parts/programs/answer/connection/call.txt',
 "https://pilot.parts/programs/answer/window/panel/menu/manifest.uri?answer" => 'https://pilot.parts/programs/answer/connection/answer.txt',
 "https://pilot.parts/programs/answer/window/panel/menu/manifest.uri?answered" => 'https://pilot.parts/programs/answer/connection/answered.txt',
 "https://pilot.parts/programs/answer/window/panel/menu/manifest.uri?pickup" => 'https://pilot.parts/programs/answer/connection/pickup.js',
 "https://pilot.parts/programs/answer/window/panel/menu/manifest.uri.c.js" => <<<JS
  const
   common_url = "https://pilot.parts/programs/answer/window/panel/menu/",
   buttons = [],
   call_string = "" + call;

  if (call_string) {
   if ("" + answered === "1") return;
   
   const remote = new RTCPeerConnection();
   remote.onicecandidate = () => _[answer.headerOf().href] = JSON.stringify(globalThis.answer?.(remote.localDescription))
   remote.ondatachannel = e => {
    e.channel.onmessage = e => console.log(e.target.label + " message => " + JSON.stringify(e.data))
    e.channel.onclose = e => console.log(e.target.label + " closed!")
    e.channel.onopen = e => console.log(e.target.label + " opened!")
   }
   remote.setRemoteDescription(JSON.parse(call_string)).then(() => remote.createAnswer().then(a => { remote.setLocalDescription(a); _[answered.headerOf().href] = "1" }))
   buttons.push([
    common_url + "copy/",
    ":host::before { content: \'Copy Answer\'; width: 100%; }",
    "",
    `() => { const x = ""+_["\${answer.headerOf().href}"]; navigator.clipboard.writeText(x) }`,
    // TODO: copy, paste and cut buttons. To instantiate one of these buttons, just set the core along with a single uri file pointing to the file that is being copied from, pasted to or cut.
   ])
  } else {
   buttons.push([
    common_url + "paste/",
    ":host::before { content: \'Paste Call\'; width: 100%; }",
    "",
    `() => navigator.clipboard.readText().then(x => _["\${call.headerOf().href}"] = x )`,
   ])
  }

  return buttons.map(config => { button(...config); return config[0] }).join(" ")
  JS,
 "https://pilot.parts/programs/answer/window/panel/answer/?layout" => 'https://pilot.parts/programs/answer/window/panel/answer/layout.css',
 "https://pilot.parts/programs/answer/window/panel/answer/layout.css.c.js" => 'return inset_layout + ` :host::before { content: \'${data}\'; min-width: 0; white-space: normal; }`',
 "https://pilot.parts/programs/answer/window/panel/answer/layout.css?constructor" => 'https://pilot.parts/programs/answer/window/panel/answer/layout.css.c.js',
 "https://pilot.parts/programs/answer/window/panel/answer/layout.css?inset_layout" => 'https://pilot.parts/programs/locate/window/explorer-view/layout.css',
 "https://pilot.parts/programs/answer/window/panel/answer/layout.css?data" => 'https://pilot.parts/programs/answer/connection/answer.txt'
];
eval('?>' . $Δ["https://core.parts/index.php"] . "<?php ");