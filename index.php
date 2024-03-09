<? $Δ = [/*
- Deploy
 */
 "https://core.parts/deploy/php/index.php" => '<?
  $base = "https://core.parts/deploy/php";
  $Δ = array_merge($Δ, [
   "$base/strap.js" => $script = \'var causality = {}, onfetch = (Ω = new Proxy({}, new Proxy($1, { get: (Δ, Υ) => eval(Δ[V = "https://core.parts/proxy/alpha.js"]) })))["https://core.parts/file.js"]; onmessage = Ω["https://core.parts/client-to-server.js"]\',
   "$base/maintenance.txt" => "" . ($maintenance = true),
   "$base/version.txt" => "0.021",
   "$base/user.txt" => $user = $_SERVER["REMOTE_ADDR"],
   "$base/user.txt?fx" => "$base/username-fx.uri",
   "$base/users.json" => json_encode($users = ["eric house" => "35.138.226.122", "eric library" => "97.76.210.20", "jason" => "99.108.88.76"]),
   "$base/usernames.json" => json_encode(["35.138.226.122" => "eric house", "97.76.210.20" => "eric library", "99.108.88.76" => "jason"]),
   "$base/usernames.txt?fx" => "$base/username-fx.uri",
   "$base/registered.txt" => "" . ($registered = in_array($user, $users)),
   "$base/registered.txt?fx" => "$base/username-fx.uri",
   "$base/show_everything.txt" => "" . ($show_everything = $registered || !$maintenance)
  ]);
  if ($_SERVER["REQUEST_URI"] === "/everything.js" && $show_everything) {
   header("content-type:text/javascript");
   echo str_replace("$1", json_encode($Δ, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_LINE_TERMINATORS | JSON_PRETTY_PRINT), $script);
  } else {
   echo $Δ["$base/boilerplate.html"];
   echo $Δ["$base/" . ($show_everything ? "installer.html" : "maintenance.html")];
  }
  ?>',
 "https://core.parts/deploy/php/maintenance.html" => '$ > closed for maintenance',
 "https://core.parts/deploy/php/boilerplate.html" => '
  <!DOCTYPE html>
  <meta name=robots content=noindex>
  <style>
  body {
   background: #222334;
   color: white;
   font: bold 11px / 16px monospace;
   white-space: pre;
  }
  </style>',
 "https://core.parts/deploy/php/installer.html" => '
  <script>
   ((a, f) => a ? (a.addEventListener("message", _ => location.reload()), b => b ? f(b) : a.register(`https://${location.hostname}/everything.js`).then(({
    waiting: x,
    installing: y,
    active: z
   }) => {
    (x || y)?.addEventListener("statechange", ({
     target: t
    }) => t.state === "activated" ? f(t) : null);
    f(z)
   }))(a.controller) : console.error("!sw"))(navigator.serviceWorker, () => location.reload?.())
  </script>
  $ > core.parts
  $ > installing...',
 "https://core.parts/deploy/php/username.txt~" => '
  {
   return (""+registered === "1") ? JSON.parse(""+usernames)[user] : "guest";
  }',
 "https://core.parts/deploy/php/username-fx.uri" => 'https://core.parts/deploy/php/username.txt',
 "https://core.parts/deploy/php/username.txt?registered" => 'https://core.parts/registered.txt',
 "https://core.parts/deploy/php/username.txt?usernames" => 'https://core.parts/deploy/php/usernames.json',
 "https://core.parts/deploy/php/username.txt?user" => 'https://core.parts/user.txt',
 "https://core.parts/deploy/php/everything.php~" => '
  {
   console.warn("produce everything.php right now. it will need the conversion from json to php array...", "$Δ = [ $1 ]; eval(\"?>\" . $Δ[\"https://core.parts/deploy/php/index.php\"] . \"<?php \");");
  }',
 /*
- Core
 */
 "https://core.parts/?core" => 'https://core.parts/core-part/',
 "https://core.parts/?layout" => 'https://core.parts/layout.css',
 "https://core.parts/?manifest" => 'https://core.parts/os-95/manifest.uri',
 "https://core.parts/?onpointermove" => 'https://core.parts/onpointermove.js',
 "https://core.parts/?onpointerup" => 'https://core.parts/onpointerup.js',
 "https://core.parts/img/white-grid.png" => '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',
 "https://core.parts/img/blue-grid.png" => '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',
 "https://core.parts/apple-touch-icon.png" => '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',
 "https://core.parts/behaviors/grab/fx.uri" => 'https://core.parts/onpointermove.js https://core.parts/onpointerup.js',
 "https://core.parts/behaviors/grab/src.uri" => '',
 "https://core.parts/behaviors/grab/src.uri?fx" => 'https://core.parts/behaviors/grab/fx.uri',
 "https://core.parts/behaviors/release/fx.uri" => 'https://core.parts/onpointerup.js',
 "https://core.parts/behaviors/release/src.uri" => '',
 "https://core.parts/behaviors/release/src.uri?fx" => 'https://core.parts/behaviors/release/fx.uri',
 "https://core.parts/client-to-server.js" => '
  ({ data }) => {
   if (data === "restart") registration.unregister()
   else { Object.assign(Δ, data) }
  }',
 "https://core.parts/core-part/" => '
  <!DOCTYPE html>
  <script src="https://core.parts/everything.js"></script>
   <script>Ω["https://core.parts/element.js"]()</script>
  <meta name="viewport" content="width=device-width, initial-scale=0.5" />
  <style>
   html, body {
    overscroll-behavior-y: contain !important;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
   }
  </style>',
 "https://core.parts/core-part/layout.css" => '',
 "https://core.parts/core-part/manifest.uri" => '',
 "https://core.parts/core-part/?apply" => 'https://core.parts/proxy/beta/apply.js',
 "https://core.parts/core-part/?get" => 'https://core.parts/proxy/beta/get.js',
 "https://core.parts/core-part/?getOwnPropertyDescriptor" => 'https://core.parts/proxy/beta/getOwnPropertyDescriptor.js',
 "https://core.parts/core-part/?getPrototypeOf" => 'https://core.parts/proxy/beta/getPrototypeOf.js',
 "https://core.parts/core-part/?has" => 'https://core.parts/proxy/beta/has.js',
 "https://core.parts/core-part/?headerOf" => 'https://core.parts/proxy/beta/headerOf.js',
 "https://core.parts/core-part/?isExtensible" => 'https://core.parts/proxy/beta/isExtensible.js',
 "https://core.parts/core-part/?layout" => 'https://core.parts/core-part/layout.css',
 "https://core.parts/core-part/?manifest" => 'https://core.parts/core-part/manifest.uri',
 "https://core.parts/core-part/?ownKeys" => 'https://core.parts/proxy/beta/ownKeys.js',
 "https://core.parts/core-part/?query" => 'https://core.parts/proxy/beta/query.js',
 "https://core.parts/core-part/?rootsOf" => 'https://core.parts/proxy/beta/rootsOf.js',
 "https://core.parts/core-part/?set" => 'https://core.parts/proxy/beta/set.js',
 "https://core.parts/core-part/?toPrimitive" => 'https://core.parts/proxy/beta/toPrimitive.js',
 "https://core.parts/core-part/?toString" => 'https://core.parts/proxy/beta/toString.js',
 "https://core.parts/core-part/?valueOf" => 'https://core.parts/proxy/beta/valueOf.js',
 "https://core.parts/demo/hello.txt?mood" => 'https://core.parts/demo/mood.txt',
 "https://core.parts/demo/hello.txt?noun" => 'https://core.parts/demo/noun.txt',
 "https://core.parts/demo/hello.txt?past_phrasal_verb" => 'https://core.parts/demo/past_phrasal_verb.txt',
 "https://core.parts/demo/hello.txt?persons_name" => 'https://core.parts/demo/persons_name.txt',
 "https://core.parts/demo/hello.txt?time_interval" => 'https://core.parts/demo/time_interval.txt',
 "https://core.parts/demo/hello.txt?verb_ending_in_ing" => 'https://core.parts/demo/verb_ending_in_ing.txt',
 "https://core.parts/demo/hello.txt~" => '
  {
   return `Welcome to my ${noun}, ${persons_name}! I\'ve been ${verb_ending_in_ing} on it all ${time_interval}, so I\'m ${mood} you ${past_phrasal_verb}.`;
  }',
 "https://core.parts/demo/mood.txt" => 'glad',
 "https://core.parts/demo/noun.txt" => 'website',
 "https://core.parts/demo/past_phrasal_verb.txt:" => 'stopped by',
 "https://core.parts/demo/persons_name.txt" => 'stranger',
 "https://core.parts/demo/time_interval.txt" => 'day',
 "https://core.parts/demo/verb_ending_in_ing.txt:" => 'working',
 "https://core.parts/element.js" => '
  () => {
   globalThis.nodePool = { }
   const eventKireji = { onclick: 0, onpointerdown: 0, onpointerup: 0, onpointermove: 0, ondblclick: 0, onfocus: 0, layout: 1, manifest: 1, ondragstart: -1, oncontextmenu: -1 };
   Object.defineProperties(HTMLElement.prototype, {
    shadow: {
     get() { if (!this._shadow) this._shadow = this.attachShadow({ mode: "closed" }); return this._shadow }
    },
    layout: {
     get() { if (!this._layout) { this._layout = new CSSStyleSheet(); this.shadow.adoptedStyleSheets.push(this._layout) } return this._layout },
     set(v) { this.layout.replaceSync(v) }
    },
    manifest: {
     get() { return [...this.shadow.children].map(x => x.url) },
     set(v) {
      v = "" + v
      const O = this.manifest, N = v.split(" ").filter(x => x), C = this.shadow
      let o, n, i = -1;
      while (O.length && N.length) {
       i++
       if ((o = O.shift()) === (n = N.shift())) continue
       const u = O.findIndex(x => x === n)
       if (u === -1) this.install(n, i)
       else { C.insertBefore(C.children[i + u + 1], C.children[i]); O.splice(u, 1) }
       if (N.some(x => x === o)) O.unshift(o)
       else C.children[i + 1].remove();
      }
      if (N.includes("undefined")) throw N
      if (O.length) O.forEach(() => C.children[i + 1].remove())
      else if (N.length) N.forEach(x => this.install(x));
     }
    },
    install: {
     get() {
      return (url, index) => {
       if (!url || url === "undefined") throw "empty url"
       const node = (url in nodePool ? [...nodePool[url]].find(n => !n.isConnected) : undefined) ?? document.createElement(Ω[url].headerOf().groups.part);
       if (index === undefined || index >= this.shadow.children.length) this.shadow.appendChild(node); else this.shadow.insertBefore(node, this.shadow.children[index])
       if (node._url !== url) node.url = url; else node.repair();
      }
     }
    },
    repair: {
     get() {
      return () => {
       this["manifest"] = this.proxy["manifest"];
       [...this.shadow.children].forEach(child => child.repair())
      }
     }
    },
    proxy: {
     get() { if (!this._proxy) this._proxy = Ω[this.url]; return this._proxy }
    },
    url: {
     get() { if (!this._url) throw new ReferenceError("attempted to get url before it was defined."); return this._url },
     set(v) {
      if (this._url) throw new TypeError(`cannot change HTMLElement\'s url (is ${this._url}, tried to set to ${v})`);
      this.tabIndex = 0
      this._url = v
      if (!(v in nodePool)) nodePool[v] = new Set()
      nodePool[v].add(this)
      for (const kireji in eventKireji) {
       if (eventKireji[kireji] === -1) {
        this[kireji] = e => e.preventDefault()
       } else if (kireji in this.proxy) {
        this[kireji] = this.proxy[kireji]
        if (eventKireji[kireji]) {
         const url = this.proxy[kireji].headerOf().href;
         if (!(url in causality)) causality[url] = {}
         if (!(kireji in causality[url])) causality[url][kireji] = new Set()
         causality[url][kireji].add(this)
        }
       }
      }
     }
    }
   })
   onload = () => document.body.url = location.href;
  }',
 "https://core.parts/error-404/layout.css" => '
  :host {
   position: relative;
   width: 100%;
   box-sizing: border-box;
   height: 100%;
   margin: 0;
   background: magenta;
  }',
 "https://core.parts/error-404/?layout" => 'https://core.parts/error-404/layout.css',
 "https://core.parts/factory-reset-button/layout.css" => '
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
 "https://core.parts/factory-reset-button/?layout" => 'https://core.parts/factory-reset-button/layout.css',
 "https://core.parts/factory-reset-button/?onclick" => 'https://core.parts/os-95/taskbar-/start-menu/restart-server/onclick.js',
 "https://core.parts/favicon.ico" => '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',
 "https://core.parts/favicon.ico?src" => 'https://core.parts/apple-touch-icon.png',
 "https://core.parts/favicon.ico~" => '
  {
   return src[Symbol.toPrimitive]();
  }',
 "https://core.parts/file.js" => '
  event => {
   const
    direct = typeof event === "string",
    url = direct ? event : event.request.url;
   console.info("FileInfo: just fetched "+url+".");
   if (url === "https://core.parts/everything.js") return event.respondWith(new Response("var causality = {}, onfetch = (Ω = new Proxy({}, new Proxy(" + JSON.stringify(Δ) + \', { get: (Δ, Υ) => eval(Δ[V = "https://core.parts/proxy/alpha.js"]) })))["https://core.parts/file.js"]\', { headers: { "content-type": "application/json" } }))
   if (url.includes("&")) {
    if (!url.includes("?")) throw new TypeError(`bad format (ampersand with no query string) ${url}`)
    const [base, query] = url.split("?")
    query.split("&").forEach(subquery => {
     const
      url = base + "?" + subquery,
      proxy = Ω[url],
      { value, kireji, target } = proxy.headerOf().groups;
     Ω[target][kireji] = value
    })
    const response = new Response(new Int8Array([1]))
    return direct ? response : event.respondWith(response)
   }
   const proxy = Ω[url],
    { binary, type, value, kireji, target } = proxy.headerOf().groups;
   let string = "";
   if (value) {
    Ω[target][kireji] = value
    const response = new Response(new Int8Array([1]))
    return direct ? response : event.respondWith(response)
   }
   else {
    string = proxy.toPrimitive()
    if (kireji) {
     if (kireji === "onclick") {
      const fnurl = "" + Ω[url];
      if (fnurl) {
       const proxy = Ω[Ω[fnurl]],
        { value, kireji, target } = proxy.headerOf().groups
       if (!(value && kireji && target)) throw new TypeError(`bad format event handler chain (${url} => ${fnurl})`)
       Ω[target][kireji] = value
      }
      const response = new Response(new Int8Array([1]))
      return direct ? response : event.respondWith(response)
     } else {
      const response = Response.redirect(string, 307);
      return direct ? response : event.respondWith(response)
     }
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
 "https://core.parts/fullscreen-button/layout.css" => '
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
 "https://core.parts/fullscreen-button/onclick.js" => '()=>document.documentElement.requestFullscreen()',
 "https://core.parts/fullscreen-button/?layout" => 'https://core.parts/fullscreen-button/layout.css',
 "https://core.parts/fullscreen-button/?onclick" => 'https://core.parts/fullscreen-button/onclick.js',
 "https://core.parts/layout.css?height" => 'https://core.parts/os-95/taskbar-/css-height.txt',
 "https://core.parts/layout.css~" => '
  {
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
   `;
  }',
 "https://core.parts/onpointermove.js" => '
  () => {
  }',
 "https://core.parts/onpointermove.js?behavior" => 'https://core.parts/behaviors/grab/src.uri',
 "https://core.parts/onpointermove.js~" => '
  {
   return (""+behavior) ? (""+Ω[behavior]) : "( ) => { }";
  }',
 "https://core.parts/onpointerup.js" => 'e => { ;  }',
 "https://core.parts/onpointerup.js?grab" => 'https://core.parts/behaviors/grab/src.uri',
 "https://core.parts/onpointerup.js?release" => 'https://core.parts/behaviors/release/src.uri',
 "https://core.parts/onpointerup.js~" => '`e => { ${(""+grab) ? `Ω["https://core.parts/behaviors/grab/src.uri"] = ""` : ""}; ${(""+release) ? `Ω["${release}"](e); Ω["https://core.parts/behaviors/release/src.uri"] = ""` : ""} }`',
 "https://core.parts/os-95/desktop-/layout.css" => '
  :host {
   position: relative;
   width: 100%;
   box-sizing: border-box;
   height: 100%;
   margin: 0;
   background: #377f7f;
  }',
 "https://core.parts/os-95/desktop-/onfocus.js" => 'e => { [...nodePool["https://core.parts/os-95/desktop-/"]].find(x => x.isConnected).focus() }',
 "https://core.parts/os-95/desktop-/?layout" => 'https://core.parts/os-95/desktop-/layout.css',
 "https://core.parts/os-95/desktop-/?onfocus" => 'https://core.parts/os-95/desktop-/onfocus.js',
 "https://core.parts/os-95/horizontal-line/layout.css" => '
  :host {
   height: 2px;
   border-top: 1px solid #7f7f7f;
   border-bottom: 1px solid white;
   box-sizing: border-box;
   margin: 4px 0;
  }',
 "https://core.parts/os-95/horizontal-line/?layout" => 'https://core.parts/os-95/horizontal-line/layout.css',
 "https://core.parts/os-95/manifest.uri?windows" => 'https://core.parts/os-95/windows.uri',
 "https://core.parts/os-95/manifest.uri?start_menu" => 'https://core.parts/os/start-menu/open.txt',
 "https://core.parts/os-95/manifest.uri~" => '
  {
   const
    urls = ["https://core.parts/os-95/desktop-/"],
    list = ("" + windows).split(" ").forEach(url => {
     if (("" + Ω[url + "minimized.txt"]) === "0") urls.push(url)
    })
   urls.push("https://core.parts/os-95/taskbar-/");
   if (""+start_menu === "1") urls.push(
    "https://core.parts/os-95/taskbar-/start-menu/click-to-close/",
    "https://core.parts/os-95/taskbar-/start-menu/"
   );
   return urls.join(" ")
  }',
 /*
- File Browser
 */
 "https://core.parts/os-95/programs/file-browser/task-/datum.txt" => 'https://core.parts/os-95/programs/file-browser/window-/active.txt',
 "https://core.parts/os-95/programs/file-browser/task-/index.txt" => '1',
 "https://core.parts/os-95/programs/file-browser/task-/index.txt?datum" => 'https://core.parts/os-95/programs/file-browser/task-/datum.txt',
 "https://core.parts/os-95/programs/file-browser/task-/index.txt?fx" => 'https://core.parts/os-95/programs/file-browser/task-/index/fx.uri',
 "https://core.parts/os-95/programs/file-browser/task-/index.txt?order" => 'https://core.parts/os-95/taskbar-/selected/fx.uri',
 "https://core.parts/os-95/programs/file-browser/task-/index.txt~" => '""+(""+order).split(" ").indexOf(""+datum)',
 "https://core.parts/os-95/programs/file-browser/task-/index/fx.uri" => 'https://core.parts/os-95/programs/file-browser/window-/active.txt',
 "https://core.parts/os-95/programs/file-browser/task-/layout.css?open" => 'https://core.parts/os-95/programs/file-browser/window-/active.txt',
 "https://core.parts/os-95/programs/file-browser/task-/layout.css~" => '
   {
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
     }
    ;`
   }',
 "https://core.parts/os-95/programs/file-browser/task-/manifest.uri" => 'https://core.parts/os/icons/folder-icon/ https://core.parts/os-95/programs/file-browser/app-label/',
 "https://core.parts/os-95/programs/file-browser/task-/manifest.uri?open" => 'https://core.parts/os-95/programs/file-browser/window-/active.txt',
 "https://core.parts/os-95/programs/file-browser/task-/onfocus.js" => 'e => { const node = [...nodePool["https://core.parts/os-95/programs/file-browser/window-/"]].find(x => x.isConnected); node.focus() }',
 "https://core.parts/os-95/programs/file-browser/task-/open/fx.uri" => 'https://core.parts/os-95/programs/file-browser/task-/layout.css https://core.parts/os-95/taskbar-/selected.txt',
 "https://core.parts/os-95/programs/file-browser/task-/?layout" => 'https://core.parts/os-95/programs/file-browser/task-/layout.css',
 "https://core.parts/os-95/programs/file-browser/task-/?manifest" => 'https://core.parts/os-95/programs/file-browser/task-/manifest.uri',
 "https://core.parts/os-95/programs/file-browser/task-/?onfocus" => 'https://core.parts/os-95/programs/file-browser/task-/onfocus.js',
 "https://core.parts/os-95/programs/file-browser/app-label/layout.css?address" => 'https://core.parts/os-95/programs/file-browser/window-/address.uri',
 "https://core.parts/os-95/programs/file-browser/app-label/layout.css~" => '
   {
    return `
     :host {
      margin: 0;
      height: 16px;
      vertical-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
     }
     :host::after {
      content: "File Browser - ${address}";
      white-space: nowrap;
     }`;
   }',
 "https://core.parts/os-95/programs/file-browser/app-label/?layout" => 'https://core.parts/os-95/programs/file-browser/app-label/layout.css',
 "https://core.parts/os-95/programs/file-browser/item-height.txt" => '18',
 "https://core.parts/os-95/programs/file-browser/item-height.txt?fx" => '18',
 "https://core.parts/os-95/programs/file-browser/start-menu-item/app-label/layout.css" => ':host::after {
    height: 24px;
    content: "File Browser";
   }',
 "https://core.parts/os-95/programs/file-browser/start-menu-item/app-label/?layout" => 'https://core.parts/os-95/programs/file-browser/start-menu-item/app-label/layout.css',
 "https://core.parts/os-95/programs/file-browser/start-menu-item/layout.css" => '
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
 "https://core.parts/os-95/programs/file-browser/start-menu-item/manifest.uri" => 'https://core.parts/os/icons/folder-icon/ https://core.parts/os-95/programs/file-browser/start-menu-item/app-label/',
 "https://core.parts/os-95/programs/file-browser/start-menu-item/onfocus.js" => 'e => { [...nodePool["https://core.parts/os-95/programs/file-browser/window-/"]].find(x => x.isConnected).focus() }',
 "https://core.parts/os-95/programs/file-browser/start-menu-item/?layout" => 'https://core.parts/os-95/programs/file-browser/start-menu-item/layout.css',
 "https://core.parts/os-95/programs/file-browser/start-menu-item/?manifest" => 'https://core.parts/os-95/programs/file-browser/start-menu-item/manifest.uri',
 "https://core.parts/os-95/programs/file-browser/start-menu-item/?onfocus" => 'https://core.parts/os-95/programs/file-browser/start-menu-item/onfocus.js',
 "https://core.parts/os-95/programs/file-browser/window-/active.txt" => '0',
 "https://core.parts/os-95/programs/file-browser/window-/active.txt?fx" => 'https://core.parts/os-95/programs/file-browser/task-/open/fx.uri',
 "https://core.parts/os-95/programs/file-browser/window-/active.txt?index" => 'https://core.parts/os-95/programs/file-browser/task-/index.txt',
 "https://core.parts/os-95/programs/file-browser/window-/active.txt?minimized" => 'https://core.parts/os-95/programs/file-browser/window-/minimized.txt',
 "https://core.parts/os-95/programs/file-browser/window-/active.txt?selected" => 'https://core.parts/os-95/taskbar-/selected.txt',
 "https://core.parts/os-95/programs/file-browser/window-/active.txt~" => '("" + minimized) === "1" ? "0" : ("" + selected) === ("" + index) ? "1" : "0"',
 "https://core.parts/os-95/programs/file-browser/window-/address-fx.uri" => 'https://core.parts/os-95/programs/file-browser/window-/explorer-view/files-/manifest.uri https://core.parts/os-95/programs/file-browser/app-label/layout.css',
 "https://core.parts/os-95/programs/file-browser/window-/address.uri" => 'https://',
 "https://core.parts/os-95/programs/file-browser/window-/address.uri?fx" => 'https://core.parts/os-95/programs/file-browser/window-/address-fx.uri',
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/exit-button/layout.css" => '
  :host {
   position: relative;
   width: 16px;
   height: 14px;
   background: #c3c3c3;
   margin-left: 2px;
   box-shadow: inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb }
  :host::before, :host::after {
   --color: #7f7f7f;
   content: "";
   display: block;
   position: absolute;
   width: 8px;
   height: 7px;
   left: 4px;
   top: 3px;
   background: linear-gradient(to top left, transparent 0%, transparent calc(50% - 1px), var(--color) calc(50% - 1px), var(--color) calc(50% + 1px),  transparent calc(50% + 1px),  transparent 100%), linear-gradient(to top right,  transparent 0%,  transparent calc(50% - 1px), var(--color) calc(50% - 1px), var(--color) calc(50% + 1px),  transparent calc(50% + 1px),  transparent 100%) }
  :host::before {
   --color: white;
   left: 5px;
   top: 4px;
  }',
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/exit-button/?layout" => 'https://core.parts/os-95/programs/file-browser/window-/window-controls/exit-button/layout.css',
 "https://core.parts/os-95/programs/file-browser/window-/explorer-view/column-fx.uri" => 'https://core.parts/os-95/programs/file-browser/window-/explorer-view/header-/layout.css https://core.parts/os-95/programs/file-browser/window-/explorer-view/files-/layout.css',
 "https://core.parts/os-95/programs/file-browser/window-/explorer-view/files-/layout.css?name_width" => 'https://core.parts/os-95/programs/file-browser/window-/explorer-view/name_width.txt',
 "https://core.parts/os-95/programs/file-browser/window-/explorer-view/files-/layout.css?type_width" => 'https://core.parts/os-95/programs/file-browser/window-/explorer-view/type_width.txt',
 "https://core.parts/os-95/programs/file-browser/window-/explorer-view/files-/layout.css~" => '
  {
   return `
    :host {
     position: relative;
     display: grid;
     grid-template-columns: ${name_width}px ${type_width}px 1fr;
     grid-auto-rows: 18px;
     flex: 1 1;
     overflow: auto;
    }
   `;
  }',
 "https://core.parts/os-95/programs/file-browser/window-/explorer-view/files-/manifest.uri?address" => 'https://core.parts/os-95/programs/file-browser/window-/address.uri',
 "https://core.parts/os-95/programs/file-browser/window-/explorer-view/files-/manifest.uri?cell" => 'https://core.parts/templates/part.js',
 "https://core.parts/os-95/programs/file-browser/window-/explorer-view/files-/manifest.uri?click" => 'https://core.parts/templates/click.js',
 "https://core.parts/os-95/programs/file-browser/window-/explorer-view/files-/manifest.uri?fx" => 'https://core.parts/os-95/programs/file-browser/window-/status/fx.uri',
 "https://core.parts/os-95/programs/file-browser/window-/explorer-view/files-/manifest.uri?header_json" => 'https://core.parts/os-95/programs/file-browser/window-/explorer-view/headers.json',
 "https://core.parts/os-95/programs/file-browser/window-/explorer-view/files-/manifest.uri?sort_order" => 'https://core.parts/os-95/programs/file-browser/window-/sort_order.json',
 "https://core.parts/os-95/programs/file-browser/window-/explorer-view/files-/manifest.uri~" => '
  {
   const
    hash = (x, y = 0x811c9dc5, asString = true) => {
     var i, l;
     for (i = 0, l = x.length; i < l; i++) {
      y ^= x.charCodeAt(i);
      y += (y << 1) + (y << 4) + (y << 7) + (y << 8) + (y << 24);
     }
     return (y >>> 0).toString(36)
    },
    browse_url = "" + address, icon_urlbase = "https://core.parts/os/icons/", fileurlbase = υ.replace(/\/manifest.uri$/, "/file-"), constructor_end = /~+$/, file_list = [], url_list = [], O = JSON.parse(sort_order), K = Object.keys(O), header = JSON.parse(header_json),
    filenames = [...new Set(Object.keys(Δ).filter(url => (url !== browse_url) && url.startsWith(browse_url) /*&& !url.includes("?") && url.replace(constructor_end, "") !== browse_url*/).map(x => x.replace(browse_url, "").includes("/") ? x.slice(0, browse_url.length + x.replace(browse_url, "").indexOf("/") + 1).replace(/~+$/, "") : x.replace(/~+$/, "")))].map((url, i) => [url, url.replace(browse_url, ""), i])
   let constructor_count = 0, kireji_count = 0, folder_count = 0, file_count = 0;
   for (const [url, name, i] of filenames) {
    const
     proxy = Ω[url],
     groups = proxy.headerOf().groups,
     row_data = {
      ...groups,
      size: groups.size,
      entry_size: groups.entry_size,
      name,
      url,
      manifest: [],
      type: url.match(constructor_end)
       ? (constructor_count++, "constructor") : url.match(/\?[\w\d_$]+$/)
       ? (kireji_count++, "kireji") : url.endsWith("/")
       ? (folder_count++, url.match(/[^:]\/$/)
          ? url.match(/^https:\/\/[\w\d]+\.[\w\d]{2,}\/$/)
          ? "domain" : "folder" :
            "protocol" )
       : (file_count++, groups.type),
      size_label: groups.size + " byte" + (groups.size === 1 ? "" : "s")
     },
     is_index = ["folder", "domain", "protocol"].includes(row_data.type),
     item_url = fileurlbase + hash(url) + "-",
     label_url = item_url + "app-label/",
     icontag = row_data.type.replace(/[^a-zA-Z0-9]+/g, "-") + "-icon",
     icon_url = icon_urlbase + icontag + "/",
     label_css = x => `:host { overflow: hidden; text-overflow: ellipsis } :host::before { content: "${x}" }`,
     item_layout = `:host {
      position: relative;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      margin: 1px;
      padding: 2px 0;
      overflow: hidden;
      box-sizing: border-box;
      padding-right: 6px${is_index ? `;
      font-weight: bold;` : ``}
     }
     ${icontag} {
      --size: 16px;
      margin-right: 4px
     }
     :host(:focus) {
      background: silver;
      width: min-content;
      background: #00007f;
      color: white;
      outline: 1px dotted black;
     }`,
     item_manifest = icon_url + " " + label_url,
     focus_item_url = item_url + "focus.js",
     open_item_url = item_url + "open.js";
    
    Ω[focus_item_url] = `() => { [...nodePool["${item_url + "name-/"}"]].find(x => x.isConnected).focus() }`
    Ω[open_item_url] = `() => { ${is_index ? `Ω["https://core.parts/os-95/programs/file-browser/window-/address.uri"] = "${url + (row_data.type === "protocol" ? "/": "")}"` : `console.log("open ${name} now")`} }`

    for (const key in header) {
     const keyurl = item_url + key + "-/";
     row_data.manifest.push(keyurl)
     if (key === "name") {
      cell(label_url, label_css(["folder", "domain"].includes(row_data.type) ? name.slice(0, -1) : name))
      cell(keyurl, item_layout, item_manifest)
     } else {
      cell(keyurl, label_css(row_data[key + (key === "size" ? "_label" : "")]))
     }
     click(keyurl, focus_item_url, open_item_url)
    }
    file_list.push(row_data)
   }
   Ω["https://core.parts/os-95/programs/file-browser/window-/status/file_count.txt"] = file_count
   Ω["https://core.parts/os-95/programs/file-browser/window-/status/folder_count.txt"] = folder_count
   Ω["https://core.parts/os-95/programs/file-browser/window-/status/kireji_count.txt"] = kireji_count

   file_list.sort((a, b) => {
    const c = (((a[K[0]] > b[K[0]]) === O[K[0]]) ? 1 : (a[K[0]] === b[K[0]] ? (((a[K[1]] > b[K[1]]) === O[K[1]]) ? 1 : (a[K[1]] === b[K[1]] ? (((a[K[2]] > b[K[2]]) === O[K[2]]) ? 1 : (a[K[2]] === b[K[2]] ? 0 : -1)) : -1)) : -1))
    return c;
   })
   url_list.push(...file_list.map(({ manifest }) => manifest).flat())
   return url_list.join(" ")
  }',
 "https://core.parts/os-95/programs/file-browser/window-/explorer-view/files-/?layout" => 'https://core.parts/os-95/programs/file-browser/window-/explorer-view/files-/layout.css',
 "https://core.parts/os-95/programs/file-browser/window-/explorer-view/files-/?manifest" => 'https://core.parts/os-95/programs/file-browser/window-/explorer-view/files-/manifest.uri',
 "https://core.parts/os-95/programs/file-browser/window-/explorer-view/header-/layout.css?name_width" => 'https://core.parts/os-95/programs/file-browser/window-/explorer-view/name_width.txt',
 "https://core.parts/os-95/programs/file-browser/window-/explorer-view/header-/layout.css?type_width" => 'https://core.parts/os-95/programs/file-browser/window-/explorer-view/type_width.txt',
 "https://core.parts/os-95/programs/file-browser/window-/explorer-view/header-/layout.css~" => '`:host {
   display: grid;
   width: 100%;
   grid-template-columns: ${name_width}px ${type_width}px 1fr;
  }`',
 "https://core.parts/os-95/programs/file-browser/window-/explorer-view/header-/manifest.uri?button" => 'https://core.parts/templates/button.js',
 "https://core.parts/os-95/programs/file-browser/window-/explorer-view/header-/manifest.uri?fx" => 'https://core.parts/os-95/programs/file-browser/window-/explorer-view/header-/manifest-fx.uri',
 "https://core.parts/os-95/programs/file-browser/window-/explorer-view/header-/manifest-fx.uri?sort_order" => 'https://core.parts/os-95/programs/file-browser/window-/sort_order.json',
 "https://core.parts/os-95/programs/file-browser/window-/explorer-view/header-/manifest-fx.uri~" => '
  {
   return Object.keys(JSON.parse(""+sort_order)).map(key => `https://core.parts/os-95/programs/file-browser/window-/explorer-view/header-/${key}-button/layout.css`).join(" ");
  }',
 "https://core.parts/os-95/programs/file-browser/window-/explorer-view/header-/manifest.uri?headers" => 'https://core.parts/os-95/programs/file-browser/window-/explorer-view/headers.json',
 "https://core.parts/os-95/programs/file-browser/window-/explorer-view/header-/manifest.uri?item_layout" => 'https://core.parts/os-95/programs/file-browser/window-/explorer-view/header-/item_layout.css',
 "https://core.parts/os-95/programs/file-browser/window-/explorer-view/header-/item_layout.css" => '
  :host {
   display: flex;
   flex-flow: row nowrap;
   align-items: center;
   padding-left: 6px;
   padding-right: 16px;
   position: relative;
   width: 100%;
  }',
 "https://core.parts/os-95/programs/file-browser/window-/explorer-view/header-/manifest.uri?sort_order" => 'https://core.parts/os-95/programs/file-browser/window-/sort_order.json',
 "https://core.parts/os-95/programs/file-browser/window-/explorer-view/header-/manifest.uri~" => '
  {
   const header_obj = JSON.parse("" + headers), urls = []
   const string_order = "" + sort_order, my_order = JSON.parse(string_order), first_key = Object.keys(my_order)[0], first_dir = my_order[first_key];
   Object.keys(header_obj).forEach((key, i) => {
    button(
     urls[i] = "https://core.parts/os-95/programs/file-browser/window-/explorer-view/header-/" + key + "-button/",
     `${item_layout}
     :host::before {
      content: "${header_obj[key]}"
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
     i ? `https://core.parts/os-95/programs/file-browser/window-/resize-${key}-column/` : undefined,
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
      Ω["${sort_order.headerOf().href}"] = JSON.stringify(order)
     }`
    )
   })
   return urls.join(" ");
  }',
 "https://core.parts/os-95/programs/file-browser/window-/explorer-view/header-/?layout" => 'https://core.parts/os-95/programs/file-browser/window-/explorer-view/header-/layout.css',
 "https://core.parts/os-95/programs/file-browser/window-/explorer-view/header-/?manifest" => 'https://core.parts/os-95/programs/file-browser/window-/explorer-view/header-/manifest.uri',
 "https://core.parts/os-95/programs/file-browser/window-/explorer-view/headers.json" => '{"name":"Name","type":"Type","size":"Size"}',
 "https://core.parts/os-95/programs/file-browser/window-/explorer-view/layout.css" => '
  :host {
   position: relative;
   flex: 1 1;
   box-shadow: -0.5px -0.5px 0 0.5px black, 0 0 0 1px #dbdbdb, -0.5px -0.5px 0 1.5px #7a7a7a, 0 0 0 2px white;
   background: white;
   margin: 2px;
   display: grid;
   grid-template-rows: 18px 1fr;
   overflow: hidden;
   height: 100%;
  }',
 "https://core.parts/os-95/programs/file-browser/window-/explorer-view/manifest.uri" => 'https://core.parts/os-95/programs/file-browser/window-/explorer-view/header-/ https://core.parts/os-95/programs/file-browser/window-/explorer-view/files-/',
 "https://core.parts/os-95/programs/file-browser/window-/explorer-view/name_width.txt" => '128',
 "https://core.parts/os-95/programs/file-browser/window-/explorer-view/name_width.txt?fx" => 'https://core.parts/os-95/programs/file-browser/window-/explorer-view/column-fx.uri',
 "https://core.parts/os-95/programs/file-browser/window-/explorer-view/type_width.txt" => '64',
 "https://core.parts/os-95/programs/file-browser/window-/explorer-view/type_width.txt?fx" => 'https://core.parts/os-95/programs/file-browser/window-/explorer-view/column-fx.uri',
 "https://core.parts/os-95/programs/file-browser/window-/explorer-view/?layout" => 'https://core.parts/os-95/programs/file-browser/window-/explorer-view/layout.css',
 "https://core.parts/os-95/programs/file-browser/window-/explorer-view/?manifest" => 'https://core.parts/os-95/programs/file-browser/window-/explorer-view/manifest.uri',
 "https://core.parts/os-95/programs/file-browser/window-/grab.json" => '{"x":514.88671875,"y":328.80859375,"start":{"x":136.64453125,"y":118.046875,"w":377.390625,"h":212.2890625},"mode":"se-resize"}',
 "https://core.parts/os-95/programs/file-browser/window-/layout.css?maximized" => 'https://core.parts/os-95/programs/file-browser/window-/maximized.txt',
 "https://core.parts/os-95/programs/file-browser/window-/layout.css?position" => 'https://core.parts/os-95/programs/file-browser/window-/position.json',
 "https://core.parts/os-95/programs/file-browser/window-/layout.css~" => '
  {
   const common = `
      position: absolute;
      display: flex;
      flex-flow: column nowrap;
      gap: 2px; background: #c3c3c3;
      box-sizing: border-box;
     }
     :host(:focus) > title-bar {
      background: rgb(0, 0, 163)`;
      
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
    `
   } else {
    const { x, y, w, h } = JSON.parse("" + position);
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
       inset 2px 2px white;
      ${common};
     }
    `
   }
  }',
 "https://core.parts/os-95/programs/file-browser/window-/manifest.uri~" => '`https://core.parts/os-95/programs/file-browser/window-/title-bar/ https://core.parts/os-95/programs/file-browser/window-/menu-bar/ https://core.parts/os-95/programs/file-browser/window-/tool-bar/ https://core.parts/os-95/programs/file-browser/window-/explorer-view/ https://core.parts/os-95/programs/file-browser/window-/status-bar/ https://core.parts/os-95/programs/file-browser/window-/resize-/top-/ https://core.parts/os-95/programs/file-browser/window-/resize-/bottom-/ https://core.parts/os-95/programs/file-browser/window-/resize-/left-/ https://core.parts/os-95/programs/file-browser/window-/resize-/right-/ https://core.parts/os-95/programs/file-browser/window-/resize-/top-right/ https://core.parts/os-95/programs/file-browser/window-/resize-/bottom-right/ https://core.parts/os-95/programs/file-browser/window-/resize-/top-left/ https://core.parts/os-95/programs/file-browser/window-/resize-/bottom-left/`',
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/maximize-button/down-fx.uri" => 'https://core.parts/os-95/programs/file-browser/window-/window-controls/maximize-button/layout.css',
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/maximize-button/down.txt" => '0',
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/maximize-button/down.txt?fx" => 'https://core.parts/os-95/programs/file-browser/window-/window-controls/maximize-button/down-fx.uri',
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/maximize-button/layout.css?down" => 'https://core.parts/os-95/programs/file-browser/window-/window-controls/maximize-button/down.txt',
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/maximize-button/layout.css~" => '`:host {
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
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/maximize-button/manifest.uri" => '',
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/maximize-button/onclick.js" => '
  () => {
   Ω[\'https://core.parts/os-95/programs/file-browser/window-/maximized.txt\'] = \'1\'
  }',
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/maximize-button/onpointerdown.js" => 'e => { e.stopPropagation(); Ω[\'https://core.parts/os-95/programs/file-browser/window-/window-controls/maximize-button/down.txt\'] = \'1\'; Ω[\'https://core.parts/behaviors/release/src.uri\'] = \'https://core.parts/os-95/programs/file-browser/window-/window-controls/maximize-button/release.js\'
  }',
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/maximize-button/release.js" => 'e => { Ω[\'https://core.parts/os-95/programs/file-browser/window-/window-controls/maximize-button/down.txt\'] = \'0\'
  }',
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/maximize-button/?layout" => 'https://core.parts/os-95/programs/file-browser/window-/window-controls/maximize-button/layout.css',
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/maximize-button/?manifest" => 'https://core.parts/os-95/programs/file-browser/window-/window-controls/maximize-button/manifest.uri',
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/maximize-button/?onclick" => 'https://core.parts/os-95/programs/file-browser/window-/window-controls/maximize-button/onclick.js',
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/maximize-button/?onpointerdown" => 'https://core.parts/os-95/programs/file-browser/window-/window-controls/maximize-button/onpointerdown.js',
 "https://core.parts/os-95/programs/file-browser/window-/maximized.txt" => '0',
 "https://core.parts/os-95/programs/file-browser/window-/maximized.txt?fx" => 'https://core.parts/os-95/programs/file-browser/window-/maximized/fx.url',
 "https://core.parts/os-95/programs/file-browser/window-/maximized/fx.url" => 'https://core.parts/os-95/programs/file-browser/window-/layout.css https://core.parts/os-95/programs/file-browser/window-/window-controls/manifest.uri https://core.parts/os-95/programs/file-browser/window-/title-bar/ondblclick.js',
 "https://core.parts/os-95/programs/file-browser/window-/menu-bar/file-menu/layout.css" => '
  :host {
   display: flex;
   flex-flow: row nowrap;
  }
  capital-f {
   text-decoration: underline
  }',
 "https://core.parts/os-95/programs/file-browser/window-/menu-bar/file-menu/manifest.uri" => 'https://core.parts/os/letters/capital-f/ https://core.parts/os/letters/lowercase-i/ https://core.parts/os/letters/lowercase-l/ https://core.parts/os/letters/lowercase-e/',
 "https://core.parts/os-95/programs/file-browser/window-/menu-bar/file-menu/?layout" => 'https://core.parts/os-95/programs/file-browser/window-/menu-bar/file-menu/layout.css',
 "https://core.parts/os-95/programs/file-browser/window-/menu-bar/file-menu/?manifest" => 'https://core.parts/os-95/programs/file-browser/window-/menu-bar/file-menu/manifest.uri',
 "https://core.parts/os-95/programs/file-browser/window-/menu-bar/layout.css" => '
  :host {
   height: 18px;
   display: flex;
   flex-flow: row nowrap;
   gap: 16px;
   align-items: center;
   padding: 0 4px;
  }',
 "https://core.parts/os-95/programs/file-browser/window-/menu-bar/manifest.uri" => 'https://core.parts/os-95/programs/file-browser/window-/menu-bar/file-menu/',
 "https://core.parts/os-95/programs/file-browser/window-/menu-bar/?layout" => 'https://core.parts/os-95/programs/file-browser/window-/menu-bar/layout.css',
 "https://core.parts/os-95/programs/file-browser/window-/menu-bar/?manifest" => 'https://core.parts/os-95/programs/file-browser/window-/menu-bar/manifest.uri',
 "https://core.parts/os-95/programs/file-browser/window-/tool-bar/layout.css" => '
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
 "https://core.parts/os-95/programs/file-browser/window-/tool-bar/manifest.uri?button" => 'https://core.parts/templates/button.js',
 "https://core.parts/os-95/programs/file-browser/window-/tool-bar/manifest.uri~" => '
  {
   const
    common_css = ":host { cursor: pointer; --size: 16px; min-width: calc(var(--size) + 4px); padding: 2px; height: calc(var(--size) + 4px); font-size: var(--size); line-height: var(--size); display: flex; flex-flow: row nowrap } :host::before { content: \'\' }",
    common_url = "https://core.parts/os-95/programs/file-browser/window-/tool-bar/";

   return [[
    common_url + "go-up/",
    common_css + ":host::before { content: \'📁\' } :host::after { padding: 0 2px; font-size: 11px; content: \'Enclosing Folder\' }",
    "",
    `() => { const url = ("" + Ω["https://core.parts/os-95/programs/file-browser/window-/address.uri"]).match(${/^.*?(?=[^/]*\/*$)/})[0]; Ω["https://core.parts/os-95/programs/file-browser/window-/address.uri"] = url }`,
   ]].map($ => { button(...$); return $[0] }).join(" ");
  }',
 "https://core.parts/os-95/programs/file-browser/window-/tool-bar/?layout" => 'https://core.parts/os-95/programs/file-browser/window-/tool-bar/layout.css',
 "https://core.parts/os-95/programs/file-browser/window-/tool-bar/?manifest" => 'https://core.parts/os-95/programs/file-browser/window-/tool-bar/manifest.uri',
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/minimize-button/down-fx.uri" => 'https://core.parts/os-95/programs/file-browser/window-/window-controls/minimize-button/layout.css',
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/minimize-button/down.txt" => '0',
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/minimize-button/down.txt?fx" => 'https://core.parts/os-95/programs/file-browser/window-/window-controls/minimize-button/down-fx.uri',
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/minimize-button/layout.css?down" => 'https://core.parts/os-95/programs/file-browser/window-/window-controls/minimize-button/down.txt',
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/minimize-button/layout.css~" => '`:host {
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
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/minimize-button/onclick.js" => '()=>{Ω[\'https://core.parts/os-95/programs/file-browser/window-/minimized.txt\'] = \'1\'
  }',
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/minimize-button/onpointerdown.js" => 'e => { e.stopPropagation(); Ω[\'https://core.parts/os-95/programs/file-browser/window-/window-controls/minimize-button/down.txt\'] = \'1\'; Ω[\'https://core.parts/behaviors/release/src.uri\'] = \'https://core.parts/os-95/programs/file-browser/window-/window-controls/minimize-button/release.js\'
  }',
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/minimize-button/release.js" => 'e => { Ω[\'https://core.parts/os-95/programs/file-browser/window-/window-controls/minimize-button/down.txt\'] = \'0\'
  }',
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/minimize-button/?layout" => 'https://core.parts/os-95/programs/file-browser/window-/window-controls/minimize-button/layout.css',
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/minimize-button/?onclick" => 'https://core.parts/os-95/programs/file-browser/window-/window-controls/minimize-button/onclick.js',
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/minimize-button/?onpointerdown" => 'https://core.parts/os-95/programs/file-browser/window-/window-controls/minimize-button/onpointerdown.js',
 "https://core.parts/os-95/programs/file-browser/window-/minimized.txt" => '0',
 "https://core.parts/os-95/programs/file-browser/window-/minimized.txt?fx" => 'https://core.parts/os-95/programs/file-browser/window-/minimized/fx.url',
 "https://core.parts/os-95/programs/file-browser/window-/minimized/fx.url" => 'https://core.parts/os-95/manifest.uri https://core.parts/os-95/programs/file-browser/window-/active.txt',
 "https://core.parts/os-95/programs/file-browser/window-/onfocus.js?index" => 'https://core.parts/os-95/programs/file-browser/task-/index.txt',
 "https://core.parts/os-95/programs/file-browser/window-/onfocus.js?selected" => 'https://core.parts/os-95/taskbar-/selected.txt',
 "https://core.parts/os-95/programs/file-browser/window-/onfocus.js~" => '
  {
   return `
    () => {
     const
      program_uri = "https://core.parts/os-95/programs/file-browser/",
      windows_uri = "https://core.parts/os-95/windows.uri",
      window_uri = program_uri + "window-/",
      open = (""+Ω[windows_uri]).split(" ");
     if (open.at(-1) !== window_uri) {
      open.push(open.splice(open.indexOf(window_uri), 1)[0]);
      Ω[windows_uri] = open.join(" ")
     }
     ${(""+selected) === (""+index) ? "" : `Ω[\'${selected.headerOf().href}\'] = \'${""+index}\'`}
    }
   `
  }',
 "https://core.parts/os-95/programs/file-browser/window-/pointer-transform.js" => '
  ({ clientX: x, clientY: y }) => {
   const
    grabState = JSON.parse("" + Ω[\'https://core.parts/os-95/programs/file-browser/window-/grab.json\']),
    mousePosition = { x: Math.round(x), y: Math.round(y) };
   let deltaPosition, finalPosition;
   if (grabState.mode === \'move\') {
    deltaPosition = { x: grabState.start.x - grabState.x, y: grabState.start.y - grabState.y },
     finalPosition = { x: Math.max(0, deltaPosition.x + mousePosition.x), y: Math.max(0, deltaPosition.y + mousePosition.y) };
   }
   else if (grabState.mode === \'n-resize\') finalPosition = { y: Math.max(0, grabState.start.y - grabState.y + mousePosition.y), h: Math.max(64, grabState.start.h + (grabState.y - mousePosition.y)) }
   else if (grabState.mode === \'s-resize\') finalPosition = { h: Math.max(64, grabState.start.h - (grabState.y - mousePosition.y)) }
   else if (grabState.mode === \'e-resize\') finalPosition = { w: Math.max(64, grabState.start.w - (grabState.x - mousePosition.x)) }
   else if (grabState.mode === \'w-resize\') finalPosition = { x: Math.max(0, grabState.start.x - grabState.x) + mousePosition.x, w: Math.max(64, grabState.start.w + (grabState.x - mousePosition.x)) }
   else if (grabState.mode === \'ne-resize\') finalPosition = { y: Math.max(0, grabState.start.y - grabState.y + mousePosition.y), h: Math.max(64, grabState.start.h + (grabState.y - mousePosition.y)), w: Math.max(64, grabState.start.w - (grabState.x - mousePosition.x)) }
   else if (grabState.mode === \'se-resize\') finalPosition = { h: Math.max(64, grabState.start.h - (grabState.y - mousePosition.y)), w: Math.max(64, grabState.start.w - (grabState.x - mousePosition.x)) }
   else if (grabState.mode === \'nw-resize\') finalPosition = { y: Math.max(0, grabState.start.y - grabState.y + mousePosition.y), h: Math.max(64, grabState.start.h + (grabState.y - mousePosition.y)), x: Math.max(0, grabState.start.x - grabState.x) + mousePosition.x, w: Math.max(64, grabState.start.w + (grabState.x - mousePosition.x)) }
   else if (grabState.mode === \'sw-resize\') finalPosition = { h: Math.max(64, grabState.start.h - (grabState.y - mousePosition.y)), x: Math.max(0, grabState.start.x - grabState.x) + mousePosition.x, w: Math.max(64, grabState.start.w + (grabState.x - mousePosition.x)) }
   else throw new ReferenceError(\'No mode called \' + mode)
   Ω[\'https://core.parts/os-95/programs/file-browser/window-/position.json\'] = JSON.stringify({ ...grabState.start, ...finalPosition })
  }',
 "https://core.parts/os-95/programs/file-browser/window-/position.json" => '{"x":136.64453125,"y":118.046875,"w":412.50390625,"h":245.48046875}',
 "https://core.parts/os-95/programs/file-browser/window-/position.json?fx" => 'https://core.parts/os-95/programs/file-browser/window-/position/fx.uri',
 "https://core.parts/os-95/programs/file-browser/window-/position/fx.uri" => 'https://core.parts/os-95/programs/file-browser/window-/layout.css',
 "https://core.parts/os-95/programs/file-browser/window-/resize-/bottom-left/layout.css" => '
  :host {
   position: absolute;
   bottom: -2px;
   left: -2px;
   width: 6px;
   height: 6px;
   cursor: nesw-resize
  }',
 "https://core.parts/os-95/programs/file-browser/window-/resize-/bottom-left/onpointerdown.js~" => '`({ clientX: x, clientY: y }) => { const start = JSON.parse("" + Ω[\'https://core.parts/os-95/programs/file-browser/window-/position.json\']); Ω[\'https://core.parts/os-95/programs/file-browser/window-/grab.json\'] = JSON.stringify({ x, y, start, mode: \'sw-resize\' }); Ω[\'https://core.parts/behaviors/grab/src.uri\'] = \'https://core.parts/os-95/programs/file-browser/window-/pointer-transform.js\' }`',
 "https://core.parts/os-95/programs/file-browser/window-/resize-/bottom-left/?layout" => 'https://core.parts/os-95/programs/file-browser/window-/resize-/bottom-left/layout.css',
 "https://core.parts/os-95/programs/file-browser/window-/resize-/bottom-left/?onpointerdown" => 'https://core.parts/os-95/programs/file-browser/window-/resize-/bottom-left/onpointerdown.js',
 "https://core.parts/os-95/programs/file-browser/window-/resize-/bottom-right/layout.css" => '
  :host {
   position: absolute;
   bottom: -2px;
   right: -2px;
   width: 6px;
   height: 6px;
   cursor: nwse-resize
  }',
 "https://core.parts/os-95/programs/file-browser/window-/resize-/bottom-right/onpointerdown.js~" => '`({ clientX: x, clientY: y }) => { const start = JSON.parse("" + Ω[\'https://core.parts/os-95/programs/file-browser/window-/position.json\']); Ω[\'https://core.parts/os-95/programs/file-browser/window-/grab.json\'] = JSON.stringify({ x, y, start, mode: \'se-resize\' }); Ω[\'https://core.parts/behaviors/grab/src.uri\'] = \'https://core.parts/os-95/programs/file-browser/window-/pointer-transform.js\' }`',
 "https://core.parts/os-95/programs/file-browser/window-/resize-/bottom-right/?layout" => 'https://core.parts/os-95/programs/file-browser/window-/resize-/bottom-right/layout.css',
 "https://core.parts/os-95/programs/file-browser/window-/resize-/bottom-right/?onpointerdown" => 'https://core.parts/os-95/programs/file-browser/window-/resize-/bottom-right/onpointerdown.js',
 "https://core.parts/os-95/programs/file-browser/window-/resize-/bottom-/layout.css" => '
  :host {
   position: absolute;
   bottom: -2px;
   left: 4px;
   right: 4px;
   height: 6px;
   cursor: ns-resize
  }',
 "https://core.parts/os-95/programs/file-browser/window-/resize-/bottom-/onpointerdown.js~" => '`({ clientX: x, clientY: y }) => { const start = JSON.parse("" + Ω[\'https://core.parts/os-95/programs/file-browser/window-/position.json\']); Ω[\'https://core.parts/os-95/programs/file-browser/window-/grab.json\'] = JSON.stringify({ x, y, start, mode: \'s-resize\' }); Ω[\'https://core.parts/behaviors/grab/src.uri\'] = \'https://core.parts/os-95/programs/file-browser/window-/pointer-transform.js\' }`',
 "https://core.parts/os-95/programs/file-browser/window-/resize-/bottom-/?layout" => 'https://core.parts/os-95/programs/file-browser/window-/resize-/bottom-/layout.css',
 "https://core.parts/os-95/programs/file-browser/window-/resize-/bottom-/?onpointerdown" => 'https://core.parts/os-95/programs/file-browser/window-/resize-/bottom-/onpointerdown.js',
 "https://core.parts/os-95/programs/file-browser/window-/resize-/left-/layout.css" => '
  :host {
   position: absolute;
   bottom: 4px;
   left: -2px;
   top: 4px;
   width: 6px;
   cursor: ew-resize
  }',
 "https://core.parts/os-95/programs/file-browser/window-/resize-/left-/onpointerdown.js~" => '`({ clientX: x, clientY: y }) => { const start = JSON.parse("" + Ω[\'https://core.parts/os-95/programs/file-browser/window-/position.json\']); Ω[\'https://core.parts/os-95/programs/file-browser/window-/grab.json\'] = JSON.stringify({ x, y, start, mode: \'w-resize\' }); Ω[\'https://core.parts/behaviors/grab/src.uri\'] = \'https://core.parts/os-95/programs/file-browser/window-/pointer-transform.js\' }`',
 "https://core.parts/os-95/programs/file-browser/window-/resize-/left-/?layout" => 'https://core.parts/os-95/programs/file-browser/window-/resize-/left-/layout.css',
 "https://core.parts/os-95/programs/file-browser/window-/resize-/left-/?onpointerdown" => 'https://core.parts/os-95/programs/file-browser/window-/resize-/left-/onpointerdown.js',
 "https://core.parts/os-95/programs/file-browser/window-/resize-/right-/layout.css" => '
  :host {
   position: absolute;
   bottom: 4px;
   right: -2px;
   top: 4px;
   width: 6px;
   cursor: ew-resize
  }',
 "https://core.parts/os-95/programs/file-browser/window-/resize-/right-/onpointerdown.js~" => '`({ clientX: x, clientY: y }) => { const start = JSON.parse("" + Ω[\'https://core.parts/os-95/programs/file-browser/window-/position.json\']); Ω[\'https://core.parts/os-95/programs/file-browser/window-/grab.json\'] = JSON.stringify({ x, y, start, mode: \'e-resize\' }); Ω[\'https://core.parts/behaviors/grab/src.uri\'] = \'https://core.parts/os-95/programs/file-browser/window-/pointer-transform.js\' }`',
 "https://core.parts/os-95/programs/file-browser/window-/resize-/right-/?layout" => 'https://core.parts/os-95/programs/file-browser/window-/resize-/right-/layout.css',
 "https://core.parts/os-95/programs/file-browser/window-/resize-/right-/?onpointerdown" => 'https://core.parts/os-95/programs/file-browser/window-/resize-/right-/onpointerdown.js',
 "https://core.parts/os-95/programs/file-browser/window-/resize-/top-left/layout.css" => '
  :host {
   position: absolute;
   top: -2px;
   left: -2px;
   width: 6px;
   height: 6px;
   cursor: nwse-resize
  }',
 "https://core.parts/os-95/programs/file-browser/window-/resize-/top-left/onpointerdown.js~" => '`({ clientX: x, clientY: y }) => { const start = JSON.parse("" + Ω[\'https://core.parts/os-95/programs/file-browser/window-/position.json\']); Ω[\'https://core.parts/os-95/programs/file-browser/window-/grab.json\'] = JSON.stringify({ x, y, start, mode: \'nw-resize\' }); Ω[\'https://core.parts/behaviors/grab/src.uri\'] = \'https://core.parts/os-95/programs/file-browser/window-/pointer-transform.js\' }`',
 "https://core.parts/os-95/programs/file-browser/window-/resize-/top-left/?layout" => 'https://core.parts/os-95/programs/file-browser/window-/resize-/top-left/layout.css',
 "https://core.parts/os-95/programs/file-browser/window-/resize-/top-left/?onpointerdown" => 'https://core.parts/os-95/programs/file-browser/window-/resize-/top-left/onpointerdown.js',
 "https://core.parts/os-95/programs/file-browser/window-/resize-/top-right/layout.css" => '
  :host {
   position: absolute;
   top: -2px;
   right: -2px;
   width: 6px;
   height: 6px;
   cursor: nesw-resize
  }',
 "https://core.parts/os-95/programs/file-browser/window-/resize-/top-right/onpointerdown.js~" => '`({ clientX: x, clientY: y }) => { const start = JSON.parse("" + Ω[\'https://core.parts/os-95/programs/file-browser/window-/position.json\']); Ω[\'https://core.parts/os-95/programs/file-browser/window-/grab.json\'] = JSON.stringify({ x, y, start, mode: \'ne-resize\' }); Ω[\'https://core.parts/behaviors/grab/src.uri\'] = \'https://core.parts/os-95/programs/file-browser/window-/pointer-transform.js\' }`',
 "https://core.parts/os-95/programs/file-browser/window-/resize-/top-right/?layout" => 'https://core.parts/os-95/programs/file-browser/window-/resize-/top-right/layout.css',
 "https://core.parts/os-95/programs/file-browser/window-/resize-/top-right/?onpointerdown" => 'https://core.parts/os-95/programs/file-browser/window-/resize-/top-right/onpointerdown.js',
 "https://core.parts/os-95/programs/file-browser/window-/resize-/top-/layout.css" => '
  :host {
   position: absolute;
   top: -2px;
   left: 4px;
   right: 4px;
   height: 6px;
   cursor: ns-resize
  }',
 "https://core.parts/os-95/programs/file-browser/window-/resize-/top-/onpointerdown.js~" => '`({ clientX: x, clientY: y }) => { const start = JSON.parse("" + Ω[\'https://core.parts/os-95/programs/file-browser/window-/position.json\']); Ω[\'https://core.parts/os-95/programs/file-browser/window-/grab.json\'] = JSON.stringify({ x, y, start, mode: \'n-resize\' }); Ω[\'https://core.parts/behaviors/grab/src.uri\'] = \'https://core.parts/os-95/programs/file-browser/window-/pointer-transform.js\' }`',
 "https://core.parts/os-95/programs/file-browser/window-/resize-/top-/?layout" => 'https://core.parts/os-95/programs/file-browser/window-/resize-/top-/layout.css',
 "https://core.parts/os-95/programs/file-browser/window-/resize-/top-/?onpointerdown" => 'https://core.parts/os-95/programs/file-browser/window-/resize-/top-/onpointerdown.js',
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/restore-button/down-fx.uri" => 'https://core.parts/os-95/programs/file-browser/window-/window-controls/restore-button/layout.css',
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/restore-button/down.txt" => '0',
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/restore-button/down.txt?fx" => 'https://core.parts/os-95/programs/file-browser/window-/window-controls/restore-button/down-fx.uri',
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/restore-button/layout.css?down" => 'https://core.parts/os-95/programs/file-browser/window-/window-controls/restore-button/down.txt',
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/restore-button/layout.css~" => '`:host {
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
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/restore-button/onclick.js" => '()=>Ω[\'https://core.parts/os-95/programs/file-browser/window-/maximized.txt\'] = \'0\'',
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/restore-button/onpointerdown.js" => 'e => { e.stopPropagation(); Ω[\'https://core.parts/os-95/programs/file-browser/window-/window-controls/restore-button/down.txt\'] = \'1\'; Ω[\'https://core.parts/behaviors/release/src.uri\'] = \'https://core.parts/os-95/programs/file-browser/window-/window-controls/restore-button/release.js\'
  }',
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/restore-button/release.js" => 'e => { Ω[\'https://core.parts/os-95/programs/file-browser/window-/window-controls/restore-button/down.txt\'] = \'0\'
  }',
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/restore-button/?layout" => 'https://core.parts/os-95/programs/file-browser/window-/window-controls/restore-button/layout.css',
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/restore-button/?onclick" => 'https://core.parts/os-95/programs/file-browser/window-/window-controls/restore-button/onclick.js',
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/restore-button/?onpointerdown" => 'https://core.parts/os-95/programs/file-browser/window-/window-controls/restore-button/onpointerdown.js',
 "https://core.parts/os-95/programs/file-browser/window-/sort-order-fx.uri" => 'https://core.parts/os-95/programs/file-browser/window-/explorer-view/files-/manifest.uri https://core.parts/os-95/programs/file-browser/window-/explorer-view/header-/manifest.uri https://core.parts/os-95/programs/file-browser/window-/explorer-view/header-/manifest-fx.uri',
 "https://core.parts/os-95/programs/file-browser/window-/sort_order.json" => '
  {
   "size": false,
   "type": true,
   "name": false
  }',
 "https://core.parts/os-95/programs/file-browser/window-/sort_order.json?fx" => 'https://core.parts/os-95/programs/file-browser/window-/sort-order-fx.uri',
 "https://core.parts/os-95/programs/file-browser/window-/status-bar/layout.css?file_count" => 'https://core.parts/os-95/programs/file-browser/window-/status/file_count.txt',
 "https://core.parts/os-95/programs/file-browser/window-/status-bar/layout.css?folder_count" => 'https://core.parts/os-95/programs/file-browser/window-/status/folder_count.txt',
 "https://core.parts/os-95/programs/file-browser/window-/status-bar/layout.css?kireji_count" => 'https://core.parts/os-95/programs/file-browser/window-/status/kireji_count.txt',
 "https://core.parts/os-95/programs/file-browser/window-/status-bar/layout.css~" => '
  {
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
     content: "${folder_count} folder${""+folder_count === "1" ? "" : "s"}, ${file_count} file${""+file_count === "1" ? "" : "s"}, ${kireji_count} kireji"
    }
   `;
  }',
 "https://core.parts/os-95/programs/file-browser/window-/status-bar/?layout" => 'https://core.parts/os-95/programs/file-browser/window-/status-bar/layout.css',
 "https://core.parts/os-95/programs/file-browser/window-/status/file_count.txt" => '0',
 "https://core.parts/os-95/programs/file-browser/window-/status/file_count.txt?fx" => 'https://core.parts/os-95/programs/file-browser/window-/status/fx.uri',
 "https://core.parts/os-95/programs/file-browser/window-/status/folder_count.txt" => '5',
 "https://core.parts/os-95/programs/file-browser/window-/status/folder_count.txt?fx" => 'https://core.parts/os-95/programs/file-browser/window-/status/fx.uri',
 "https://core.parts/os-95/programs/file-browser/window-/status/fx.uri" => 'https://core.parts/os-95/programs/file-browser/window-/status-bar/layout.css',
 "https://core.parts/os-95/programs/file-browser/window-/status/kireji_count.txt" => '0',
 "https://core.parts/os-95/programs/file-browser/window-/status/kireji_count.txt?fx" => 'https://core.parts/os-95/programs/file-browser/window-/status/fx.uri',
 "https://core.parts/os-95/programs/file-browser/window-/title-bar/layout.css" => '
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
 "https://core.parts/os-95/programs/file-browser/window-/title-bar/manifest.uri" => 'https://core.parts/os/icons/folder-icon/ https://core.parts/os-95/programs/file-browser/app-label/  https://core.parts/flex-spacer/ https://core.parts/os-95/programs/file-browser/window-/window-controls/',
 "https://core.parts/os-95/programs/file-browser/window-/title-bar/ondblclick.js?maximized" => 'https://core.parts/os-95/programs/file-browser/window-/maximized.txt',
 "https://core.parts/os-95/programs/file-browser/window-/title-bar/ondblclick.js~" => '`() => { Ω[\'https://core.parts/os-95/programs/file-browser/window-/window-controls/${(""+maximized) === \'1\' ? \'restore\' : \'maximize\'}-button/onclick.js\']() }`',
 "https://core.parts/os-95/programs/file-browser/window-/title-bar/onpointerdown.js~" => '`({ clientX: x, clientY: y }) => { const start = JSON.parse("" + Ω[\'https://core.parts/os-95/programs/file-browser/window-/position.json\']); Ω[\'https://core.parts/os-95/programs/file-browser/window-/grab.json\'] = JSON.stringify({ x, y, start, mode: \'move\' }); Ω[\'https://core.parts/behaviors/grab/src.uri\'] = \'https://core.parts/os-95/programs/file-browser/window-/pointer-transform.js\' }`',
 "https://core.parts/os-95/programs/file-browser/window-/title-bar/?layout" => 'https://core.parts/os-95/programs/file-browser/window-/title-bar/layout.css',
 "https://core.parts/os-95/programs/file-browser/window-/title-bar/?manifest" => 'https://core.parts/os-95/programs/file-browser/window-/title-bar/manifest.uri',
 "https://core.parts/os-95/programs/file-browser/window-/title-bar/?ondblclick" => 'https://core.parts/os-95/programs/file-browser/window-/title-bar/ondblclick.js',
 "https://core.parts/os-95/programs/file-browser/window-/title-bar/?onpointerdown" => 'https://core.parts/os-95/programs/file-browser/window-/title-bar/onpointerdown.js',
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/layout.css" => '
  :host {
   display: flex;
   flex-flow: row nowrap
  }',
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/manifest.uri?maximized" => 'https://core.parts/os-95/programs/file-browser/window-/maximized.txt',
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/manifest.uri~" => '`https://core.parts/os-95/programs/file-browser/window-/window-controls/minimize-button/ https://core.parts/os-95/programs/file-browser/window-/window-controls/${(""+maximized) === \'1\' ? \'restore\' : \'maximize\'}-button/ https://core.parts/os-95/programs/file-browser/window-/window-controls/exit-button/`',
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/?layout" => 'https://core.parts/os-95/programs/file-browser/window-/window-controls/layout.css',
 "https://core.parts/os-95/programs/file-browser/window-/window-controls/?manifest" => 'https://core.parts/os-95/programs/file-browser/window-/window-controls/manifest.uri',
 "https://core.parts/os-95/programs/file-browser/window-/?layout" => 'https://core.parts/os-95/programs/file-browser/window-/layout.css',
 "https://core.parts/os-95/programs/file-browser/window-/?manifest" => 'https://core.parts/os-95/programs/file-browser/window-/manifest.uri',
 "https://core.parts/os-95/programs/file-browser/window-/?onfocus" => 'https://core.parts/os-95/programs/file-browser/window-/onfocus.js',
 /*
- Graph Editor
 */
 "https://core.parts/os-95/programs/graph-editor/app-icon/?layout" => 'https://core.parts/os-95/programs/graph-editor/app-icon/layout.css',
 "https://core.parts/os-95/programs/graph-editor/app-icon/layout.css" => '
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
 "https://core.parts/os-95/programs/graph-editor/app-label/layout.css" => '
  :host {
   margin: 0;
   height: 16px;
   vertical-align: center;
   text-overflow: ellipsis;
   overflow: hidden;
  }
  :host::after {
   content: "Graph Editor";
   white-space: nowrap;
  }',
 "https://core.parts/os-95/programs/graph-editor/app-label/layout.css~" => '
  {
   return `
    :host {
     margin: 0;
     height: 16px;
     vertical-align: center;
     text-overflow: ellipsis;
     overflow: hidden }
     :host::after {
     content: "Graph Editor";
     white-space: nowrap;
    }
   `;
  }',
 "https://core.parts/os-95/programs/graph-editor/app-label/?layout" => 'https://core.parts/os-95/programs/graph-editor/app-label/layout.css',
 "https://core.parts/os-95/programs/graph-editor/task-/datum.txt" => 'https://core.parts/os-95/programs/graph-editor/window-/active.txt',
 "https://core.parts/os-95/programs/graph-editor/task-/index.txt" => '3',
 "https://core.parts/os-95/programs/graph-editor/task-/index.txt?datum" => 'https://core.parts/os-95/programs/graph-editor/task-/datum.txt',
 "https://core.parts/os-95/programs/graph-editor/task-/index.txt?fx" => 'https://core.parts/os-95/programs/graph-editor/task-/index/fx.uri',
 "https://core.parts/os-95/programs/graph-editor/task-/index.txt?order" => 'https://core.parts/os-95/taskbar-/selected/fx.uri',
 "https://core.parts/os-95/programs/graph-editor/task-/index.txt~" => '""+(""+order).split(" ").indexOf(""+datum)',
 "https://core.parts/os-95/programs/graph-editor/task-/index/fx.uri" => 'https://core.parts/os-95/programs/graph-editor/window-/active.txt',
 "https://core.parts/os-95/programs/graph-editor/task-/layout.css?open" => 'https://core.parts/os-95/programs/graph-editor/window-/active.txt',
 "https://core.parts/os-95/programs/graph-editor/task-/layout.css~" => '
  {
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
   `;
  }',
 "https://core.parts/os-95/programs/graph-editor/task-/manifest.uri" => 'https://core.parts/os-95/programs/graph-editor/app-icon/ https://core.parts/os-95/programs/graph-editor/app-label/',
 "https://core.parts/os-95/programs/graph-editor/task-/manifest.uri?open" => 'https://core.parts/os-95/programs/graph-editor/window-/active.txt',
 "https://core.parts/os-95/programs/graph-editor/task-/onfocus.js" => 'e => { const node = [...nodePool["https://core.parts/os-95/programs/graph-editor/window-/"]].find(x => x.isConnected); node.focus() }',
 "https://core.parts/os-95/programs/graph-editor/task-/open/fx.uri" => 'https://core.parts/os-95/programs/graph-editor/task-/layout.css https://core.parts/os-95/taskbar-/selected.txt https://core.parts/os-95/programs/graph-editor/window-/title-bar/layout.css',
 "https://core.parts/os-95/programs/graph-editor/task-/?layout" => 'https://core.parts/os-95/programs/graph-editor/task-/layout.css',
 "https://core.parts/os-95/programs/graph-editor/task-/?manifest" => 'https://core.parts/os-95/programs/graph-editor/task-/manifest.uri',
 "https://core.parts/os-95/programs/graph-editor/task-/?onfocus" => 'https://core.parts/os-95/programs/graph-editor/task-/onfocus.js',
 "https://core.parts/os-95/programs/graph-editor/start-menu-item/app-label/layout.css" => ':host::after {
   height: 24px;
   content: "Graph Editor";
  }',
 "https://core.parts/os-95/programs/graph-editor/start-menu-item/app-label/?layout" => 'https://core.parts/os-95/programs/graph-editor/start-menu-item/app-label/layout.css',
 "https://core.parts/os-95/programs/graph-editor/start-menu-item/layout.css" => '
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
 "https://core.parts/os-95/programs/graph-editor/start-menu-item/manifest.uri" => 'https://core.parts/os-95/programs/graph-editor/app-icon/ https://core.parts/os-95/programs/graph-editor/start-menu-item/app-label/',
 "https://core.parts/os-95/programs/graph-editor/start-menu-item/onfocus.js" => 'e => { const node = [...nodePool["https://core.parts/os-95/programs/graph-editor/window-/"]].find(x => x.isConnected); node.focus() }',
 "https://core.parts/os-95/programs/graph-editor/start-menu-item/?layout" => 'https://core.parts/os-95/programs/graph-editor/start-menu-item/layout.css',
 "https://core.parts/os-95/programs/graph-editor/start-menu-item/?manifest" => 'https://core.parts/os-95/programs/graph-editor/start-menu-item/manifest.uri',
 "https://core.parts/os-95/programs/graph-editor/start-menu-item/?onfocus" => 'https://core.parts/os-95/programs/graph-editor/start-menu-item/onfocus.js',
 "https://core.parts/os-95/programs/graph-editor/window-/active.txt" => '0',
 "https://core.parts/os-95/programs/graph-editor/window-/active.txt?fx" => 'https://core.parts/os-95/programs/graph-editor/task-/open/fx.uri',
 "https://core.parts/os-95/programs/graph-editor/window-/active.txt?index" => 'https://core.parts/os-95/programs/graph-editor/task-/index.txt',
 "https://core.parts/os-95/programs/graph-editor/window-/active.txt?minimized" => 'https://core.parts/os-95/programs/graph-editor/window-/minimized.txt',
 "https://core.parts/os-95/programs/graph-editor/window-/active.txt?selected" => 'https://core.parts/os-95/taskbar-/selected.txt',
 "https://core.parts/os-95/programs/graph-editor/window-/active.txt~" => '("" + minimized) === \'1\' ? \'0\' : ("" + selected) === ("" + index) ? \'1\' : \'0\'',
 "https://core.parts/os-95/programs/graph-editor/window-/exit-button/layout.css" => '
  :host {
   position: relative;
   width: 16px;
   height: 14px;
   background: #c3c3c3;
   margin-left: 2px;
   box-shadow: inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb }
  :host::before, :host::after {
   --color: #7f7f7f;
   content: "";
   display: block;
   position: absolute;
   width: 8px;
   height: 7px;
   left: 4px;
   top: 3px;
   background: linear-gradient(to top left, transparent 0%, transparent calc(50% - 1px), var(--color) calc(50% - 1px), var(--color) calc(50% + 1px),  transparent calc(50% + 1px),  transparent 100%), linear-gradient(to top right,  transparent 0%,  transparent calc(50% - 1px), var(--color) calc(50% - 1px), var(--color) calc(50% + 1px),  transparent calc(50% + 1px),  transparent 100%) }
  :host::before {
   --color: white;
   left: 5px;
   top: 4px
  }',
 "https://core.parts/os-95/programs/graph-editor/window-/exit-button/?layout" => 'https://core.parts/os-95/programs/graph-editor/window-/exit-button/layout.css',
 "https://core.parts/os-95/programs/graph-editor/window-/graph-/?layout" => 'https://core.parts/os-95/programs/graph-editor/window-/graph-/layout.css',
 "https://core.parts/os-95/programs/graph-editor/window-/graph-/layout.css?icon" => 'https://core.parts/img/white-grid.png',
 "https://core.parts/os-95/programs/graph-editor/window-/graph-/layout.css~" => '
  {
   return `
    :host {
     position: relative;
     flex: 1 1;
     box-shadow:
      -0.5px -0.5px 0 0.5px black,
      0 0 0 1px #dbdbdb,
      -0.5px -0.5px 0 1.5px #7a7a7a,
      0 0 0 2px white;
     background: rgb(0, 49, 83);
     margin: 2px;
     display: grid;
     grid-template-rows: 18px 1fr;
     overflow: hidden;
     height: 100%;
     background-image: url("data:image/png;base64,${icon}");
     background-size: 128px;
     background-position: center center;
    }
   `
  }',

 "https://core.parts/os-95/programs/graph-editor/window-/grab.json" => '{"x":514.88671875,"y":328.80859375,"start":{"x":136.64453125,"y":118.046875,"w":377.390625,"h":212.2890625},"mode":"se-resize"}',
 "https://core.parts/os-95/programs/graph-editor/window-/layout.css?maximized" => 'https://core.parts/os-95/programs/graph-editor/window-/maximized.txt',
 "https://core.parts/os-95/programs/graph-editor/window-/layout.css?position" => 'https://core.parts/os-95/programs/graph-editor/window-/position.json',
 "https://core.parts/os-95/programs/graph-editor/window-/layout.css~" => '
  {
   const common = "position: absolute; display: flex; flex-flow: column nowrap; gap: 2px; background: #c3c3c3; box-sizing: border-box"
   if (("" + maximized) === \'1\') {
    return `:host { position: absolute; top: 0; left: 0; right: 0; bottom: 28px; padding: 2px; ${common} }`
   } else {
    const { x, y, w, h } = JSON.parse("" + position);
    return `:host { width: ${w}px; height: ${h}px; left: ${x}px; top: ${y}px; min-height: fit-content; padding: 4px; background: #c3c3c3; box-shadow: inset -1px -1px black, inset 1px 1px #c3c3c3, inset -2px -2px #7a7a7a, inset 2px 2px white; ${common} }`
   }
  }',
 "https://core.parts/os-95/programs/graph-editor/window-/manifest.uri~" => '`https://core.parts/os-95/programs/graph-editor/window-/title-bar/ https://core.parts/os-95/programs/graph-editor/window-/graph-/ https://core.parts/os-95/programs/graph-editor/window-/resize-/top-/ https://core.parts/os-95/programs/graph-editor/window-/resize-/bottom-/ https://core.parts/os-95/programs/graph-editor/window-/resize-/left-/ https://core.parts/os-95/programs/graph-editor/window-/resize-/right-/ https://core.parts/os-95/programs/graph-editor/window-/resize-/top-right/ https://core.parts/os-95/programs/graph-editor/window-/resize-/bottom-right/ https://core.parts/os-95/programs/graph-editor/window-/resize-/top-left/ https://core.parts/os-95/programs/graph-editor/window-/resize-/bottom-left/`',
 "https://core.parts/os-95/programs/graph-editor/window-/maximize-button/down-fx.uri" => 'https://core.parts/os-95/programs/graph-editor/window-/maximize-button/layout.css',
 "https://core.parts/os-95/programs/graph-editor/window-/maximize-button/down.txt" => '0',
 "https://core.parts/os-95/programs/graph-editor/window-/maximize-button/down.txt?fx" => 'https://core.parts/os-95/programs/graph-editor/window-/maximize-button/down-fx.uri',
 "https://core.parts/os-95/programs/graph-editor/window-/maximize-button/layout.css?down" => 'https://core.parts/os-95/programs/graph-editor/window-/maximize-button/down.txt',
 "https://core.parts/os-95/programs/graph-editor/window-/maximize-button/layout.css~" => '`:host {
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
 "https://core.parts/os-95/programs/graph-editor/window-/maximize-button/onclick.js" => '()=>{Ω[\'https://core.parts/os-95/programs/graph-editor/window-/maximized.txt\'] = \'1\'
  }',
 "https://core.parts/os-95/programs/graph-editor/window-/maximize-button/onpointerdown.js" => 'e => { e.stopPropagation(); Ω[\'https://core.parts/os-95/programs/graph-editor/window-/maximize-button/down.txt\'] = \'1\'; Ω[\'https://core.parts/behaviors/release/src.uri\'] = \'https://core.parts/os-95/programs/graph-editor/window-/maximize-button/release.js\'
  }',
 "https://core.parts/os-95/programs/graph-editor/window-/maximize-button/release.js" => 'e => { Ω[\'https://core.parts/os-95/programs/graph-editor/window-/maximize-button/down.txt\'] = \'0\'
  }',
 "https://core.parts/os-95/programs/graph-editor/window-/maximize-button/?layout" => 'https://core.parts/os-95/programs/graph-editor/window-/maximize-button/layout.css',
 "https://core.parts/os-95/programs/graph-editor/window-/maximize-button/?onclick" => 'https://core.parts/os-95/programs/graph-editor/window-/maximize-button/onclick.js',
 "https://core.parts/os-95/programs/graph-editor/window-/maximize-button/?onpointerdown" => 'https://core.parts/os-95/programs/graph-editor/window-/maximize-button/onpointerdown.js',
 "https://core.parts/os-95/programs/graph-editor/window-/maximized.txt" => '0',
 "https://core.parts/os-95/programs/graph-editor/window-/maximized.txt?fx" => 'https://core.parts/os-95/programs/graph-editor/window-/maximized/fx.url',
 "https://core.parts/os-95/programs/graph-editor/window-/maximized/fx.url" => 'https://core.parts/os-95/programs/graph-editor/window-/layout.css https://core.parts/os-95/programs/graph-editor/window-/window-controls/manifest.uri https://core.parts/os-95/programs/graph-editor/window-/title-bar/ondblclick.js',
 "https://core.parts/os-95/programs/graph-editor/window-/minimize-button/down-fx.uri" => 'https://core.parts/os-95/programs/graph-editor/window-/minimize-button/layout.css',
 "https://core.parts/os-95/programs/graph-editor/window-/minimize-button/down.txt" => '0',
 "https://core.parts/os-95/programs/graph-editor/window-/minimize-button/down.txt?fx" => 'https://core.parts/os-95/programs/graph-editor/window-/minimize-button/down-fx.uri',
 "https://core.parts/os-95/programs/graph-editor/window-/minimize-button/layout.css?down" => 'https://core.parts/os-95/programs/graph-editor/window-/minimize-button/down.txt',
 "https://core.parts/os-95/programs/graph-editor/window-/minimize-button/layout.css~" => '`:host {
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
 "https://core.parts/os-95/programs/graph-editor/window-/minimize-button/onclick.js" => '()=>{Ω[\'https://core.parts/os-95/programs/graph-editor/window-/minimized.txt\'] = \'1\'
  }',
 "https://core.parts/os-95/programs/graph-editor/window-/minimize-button/onpointerdown.js" => 'e => { e.stopPropagation(); Ω[\'https://core.parts/os-95/programs/graph-editor/window-/minimize-button/down.txt\'] = \'1\'; Ω[\'https://core.parts/behaviors/release/src.uri\'] = \'https://core.parts/os-95/programs/graph-editor/window-/minimize-button/release.js\'
  }',
 "https://core.parts/os-95/programs/graph-editor/window-/minimize-button/release.js" => 'e => { Ω[\'https://core.parts/os-95/programs/graph-editor/window-/minimize-button/down.txt\'] = \'0\'
  }',
 "https://core.parts/os-95/programs/graph-editor/window-/minimize-button/?layout" => 'https://core.parts/os-95/programs/graph-editor/window-/minimize-button/layout.css',
 "https://core.parts/os-95/programs/graph-editor/window-/minimize-button/?onclick" => 'https://core.parts/os-95/programs/graph-editor/window-/minimize-button/onclick.js',
 "https://core.parts/os-95/programs/graph-editor/window-/minimize-button/?onpointerdown" => 'https://core.parts/os-95/programs/graph-editor/window-/minimize-button/onpointerdown.js',
 "https://core.parts/os-95/programs/graph-editor/window-/minimized.txt" => '0',
 "https://core.parts/os-95/programs/graph-editor/window-/minimized.txt?fx" => 'https://core.parts/os-95/programs/graph-editor/window-/minimized/fx.url',
 "https://core.parts/os-95/programs/graph-editor/window-/minimized/fx.url" => 'https://core.parts/os-95/manifest.uri https://core.parts/os-95/programs/graph-editor/window-/active.txt',
 "https://core.parts/os-95/programs/graph-editor/window-/onfocus.js?index" => 'https://core.parts/os-95/programs/graph-editor/task-/index.txt',
 "https://core.parts/os-95/programs/graph-editor/window-/onfocus.js?selected" => 'https://core.parts/os-95/taskbar-/selected.txt',
 "https://core.parts/os-95/programs/graph-editor/window-/onfocus.js~" => '
  {
   return `
    () => {
     const
      program_uri = "https://core.parts/os-95/programs/graph-editor/",
      windows_uri = "https://core.parts/os-95/windows.uri",
      window_uri = program_uri + "window-/",
      open = (""+Ω[windows_uri]).split(" ");
     if (open.at(-1) !== window_uri) {
      open.push(open.splice(open.indexOf(window_uri), 1)[0]);
      Ω[windows_uri] = open.join(" ")
     }
     ${(""+selected) === (""+index) ? "" : `Ω[\'${selected.headerOf().href}\'] = \'${""+index}\'`}
    }
   `
  }',
 "https://core.parts/os-95/programs/graph-editor/window-/pointer-transform.js" => '
  ({ clientX: x, clientY: y }) => {
   const
    grabState = JSON.parse("" + Ω[\'https://core.parts/os-95/programs/graph-editor/window-/grab.json\']),
    mousePosition = { x: Math.round(x), y: Math.round(y) };
   let deltaPosition, finalPosition;
   if (grabState.mode === \'move\') {
    deltaPosition = { x: grabState.start.x - grabState.x, y: grabState.start.y - grabState.y },
     finalPosition = { x: Math.max(0, deltaPosition.x + mousePosition.x), y: Math.max(0, deltaPosition.y + mousePosition.y) };
   }
   else if (grabState.mode === \'n-resize\') finalPosition = { y: Math.max(0, grabState.start.y - grabState.y + mousePosition.y), h: Math.max(64, grabState.start.h + (grabState.y - mousePosition.y)) }
   else if (grabState.mode === \'s-resize\') finalPosition = { h: Math.max(64, grabState.start.h - (grabState.y - mousePosition.y)) }
   else if (grabState.mode === \'e-resize\') finalPosition = { w: Math.max(64, grabState.start.w - (grabState.x - mousePosition.x)) }
   else if (grabState.mode === \'w-resize\') finalPosition = { x: Math.max(0, grabState.start.x - grabState.x) + mousePosition.x, w: Math.max(64, grabState.start.w + (grabState.x - mousePosition.x)) }
   else if (grabState.mode === \'ne-resize\') finalPosition = { y: Math.max(0, grabState.start.y - grabState.y + mousePosition.y), h: Math.max(64, grabState.start.h + (grabState.y - mousePosition.y)), w: Math.max(64, grabState.start.w - (grabState.x - mousePosition.x)) }
   else if (grabState.mode === \'se-resize\') finalPosition = { h: Math.max(64, grabState.start.h - (grabState.y - mousePosition.y)), w: Math.max(64, grabState.start.w - (grabState.x - mousePosition.x)) }
   else if (grabState.mode === \'nw-resize\') finalPosition = { y: Math.max(0, grabState.start.y - grabState.y + mousePosition.y), h: Math.max(64, grabState.start.h + (grabState.y - mousePosition.y)), x: Math.max(0, grabState.start.x - grabState.x) + mousePosition.x, w: Math.max(64, grabState.start.w + (grabState.x - mousePosition.x)) }
   else if (grabState.mode === \'sw-resize\') finalPosition = { h: Math.max(64, grabState.start.h - (grabState.y - mousePosition.y)), x: Math.max(0, grabState.start.x - grabState.x) + mousePosition.x, w: Math.max(64, grabState.start.w + (grabState.x - mousePosition.x)) }
   else throw new ReferenceError(\'No mode called \' + mode)
   Ω[\'https://core.parts/os-95/programs/graph-editor/window-/position.json\'] = JSON.stringify({ ...grabState.start, ...finalPosition })
  }',
 "https://core.parts/os-95/programs/graph-editor/window-/position.json" => '{"x":128,"y":128,"w":256,"h":256}',
 "https://core.parts/os-95/programs/graph-editor/window-/position.json?fx" => 'https://core.parts/os-95/programs/graph-editor/window-/position/fx.uri',
 "https://core.parts/os-95/programs/graph-editor/window-/position/fx.uri" => 'https://core.parts/os-95/programs/graph-editor/window-/layout.css',
 "https://core.parts/os-95/programs/graph-editor/window-/resize-/bottom-left/layout.css" => '
  :host {
   position: absolute;
   bottom: -2px;
   left: -2px;
   width: 6px;
   height: 6px;
   cursor: nesw-resize
  }',
 "https://core.parts/os-95/programs/graph-editor/window-/resize-/bottom-left/onpointerdown.js~" => '`({ clientX: x, clientY: y }) => { const start = JSON.parse("" + Ω[\'https://core.parts/os-95/programs/graph-editor/window-/position.json\']); Ω[\'https://core.parts/os-95/programs/graph-editor/window-/grab.json\'] = JSON.stringify({ x, y, start, mode: \'sw-resize\' }); Ω[\'https://core.parts/behaviors/grab/src.uri\'] = \'https://core.parts/os-95/programs/graph-editor/window-/pointer-transform.js\' }`',
 "https://core.parts/os-95/programs/graph-editor/window-/resize-/bottom-left/?layout" => 'https://core.parts/os-95/programs/graph-editor/window-/resize-/bottom-left/layout.css',
 "https://core.parts/os-95/programs/graph-editor/window-/resize-/bottom-left/?onpointerdown" => 'https://core.parts/os-95/programs/graph-editor/window-/resize-/bottom-left/onpointerdown.js',
 "https://core.parts/os-95/programs/graph-editor/window-/resize-/bottom-right/layout.css" => '
  :host {
   position: absolute;
   bottom: -2px;
   right: -2px;
   width: 6px;
   height: 6px;
   cursor: nwse-resize
  }',
 "https://core.parts/os-95/programs/graph-editor/window-/resize-/bottom-right/onpointerdown.js~" => '`({ clientX: x, clientY: y }) => { const start = JSON.parse("" + Ω[\'https://core.parts/os-95/programs/graph-editor/window-/position.json\']); Ω[\'https://core.parts/os-95/programs/graph-editor/window-/grab.json\'] = JSON.stringify({ x, y, start, mode: \'se-resize\' }); Ω[\'https://core.parts/behaviors/grab/src.uri\'] = \'https://core.parts/os-95/programs/graph-editor/window-/pointer-transform.js\' }`',
 "https://core.parts/os-95/programs/graph-editor/window-/resize-/bottom-right/?layout" => 'https://core.parts/os-95/programs/graph-editor/window-/resize-/bottom-right/layout.css',
 "https://core.parts/os-95/programs/graph-editor/window-/resize-/bottom-right/?onpointerdown" => 'https://core.parts/os-95/programs/graph-editor/window-/resize-/bottom-right/onpointerdown.js',
 "https://core.parts/os-95/programs/graph-editor/window-/resize-/bottom-/layout.css" => '
  :host {
   position: absolute;
   bottom: -2px;
   left: 4px;
   right: 4px;
   height: 6px;
   cursor: ns-resize
  }',
 "https://core.parts/os-95/programs/graph-editor/window-/resize-/bottom-/onpointerdown.js~" => '`({ clientX: x, clientY: y }) => { const start = JSON.parse("" + Ω[\'https://core.parts/os-95/programs/graph-editor/window-/position.json\']); Ω[\'https://core.parts/os-95/programs/graph-editor/window-/grab.json\'] = JSON.stringify({ x, y, start, mode: \'s-resize\' }); Ω[\'https://core.parts/behaviors/grab/src.uri\'] = \'https://core.parts/os-95/programs/graph-editor/window-/pointer-transform.js\' }`',
 "https://core.parts/os-95/programs/graph-editor/window-/resize-/bottom-/?layout" => 'https://core.parts/os-95/programs/graph-editor/window-/resize-/bottom-/layout.css',
 "https://core.parts/os-95/programs/graph-editor/window-/resize-/bottom-/?onpointerdown" => 'https://core.parts/os-95/programs/graph-editor/window-/resize-/bottom-/onpointerdown.js',
 "https://core.parts/os-95/programs/graph-editor/window-/resize-/left-/layout.css" => '
  :host {
   position: absolute;
   bottom: 4px;
   left: -2px;
   top: 4px;
   width: 6px;
   cursor: ew-resize
  }',
 "https://core.parts/os-95/programs/graph-editor/window-/resize-/left-/onpointerdown.js~" => '`({ clientX: x, clientY: y }) => { const start = JSON.parse("" + Ω[\'https://core.parts/os-95/programs/graph-editor/window-/position.json\']); Ω[\'https://core.parts/os-95/programs/graph-editor/window-/grab.json\'] = JSON.stringify({ x, y, start, mode: \'w-resize\' }); Ω[\'https://core.parts/behaviors/grab/src.uri\'] = \'https://core.parts/os-95/programs/graph-editor/window-/pointer-transform.js\' }`',
 "https://core.parts/os-95/programs/graph-editor/window-/resize-/left-/?layout" => 'https://core.parts/os-95/programs/graph-editor/window-/resize-/left-/layout.css',
 "https://core.parts/os-95/programs/graph-editor/window-/resize-/left-/?onpointerdown" => 'https://core.parts/os-95/programs/graph-editor/window-/resize-/left-/onpointerdown.js',
 "https://core.parts/os-95/programs/graph-editor/window-/resize-/right-/layout.css" => '
  :host {
   position: absolute;
   bottom: 4px;
   right: -2px;
   top: 4px;
   width: 6px;
   cursor: ew-resize
  }',
 "https://core.parts/os-95/programs/graph-editor/window-/resize-/right-/onpointerdown.js~" => '`({ clientX: x, clientY: y }) => { const start = JSON.parse("" + Ω[\'https://core.parts/os-95/programs/graph-editor/window-/position.json\']); Ω[\'https://core.parts/os-95/programs/graph-editor/window-/grab.json\'] = JSON.stringify({ x, y, start, mode: \'e-resize\' }); Ω[\'https://core.parts/behaviors/grab/src.uri\'] = \'https://core.parts/os-95/programs/graph-editor/window-/pointer-transform.js\' }`',
 "https://core.parts/os-95/programs/graph-editor/window-/resize-/right-/?layout" => 'https://core.parts/os-95/programs/graph-editor/window-/resize-/right-/layout.css',
 "https://core.parts/os-95/programs/graph-editor/window-/resize-/right-/?onpointerdown" => 'https://core.parts/os-95/programs/graph-editor/window-/resize-/right-/onpointerdown.js',
 "https://core.parts/os-95/programs/graph-editor/window-/resize-/top-left/layout.css" => '
  :host {
   position: absolute;
   top: -2px;
   left: -2px;
   width: 6px;
   height: 6px;
   cursor: nwse-resize
  }',
 "https://core.parts/os-95/programs/graph-editor/window-/resize-/top-left/onpointerdown.js~" => '`({ clientX: x, clientY: y }) => { const start = JSON.parse("" + Ω[\'https://core.parts/os-95/programs/graph-editor/window-/position.json\']); Ω[\'https://core.parts/os-95/programs/graph-editor/window-/grab.json\'] = JSON.stringify({ x, y, start, mode: \'nw-resize\' }); Ω[\'https://core.parts/behaviors/grab/src.uri\'] = \'https://core.parts/os-95/programs/graph-editor/window-/pointer-transform.js\' }`',
 "https://core.parts/os-95/programs/graph-editor/window-/resize-/top-left/?layout" => 'https://core.parts/os-95/programs/graph-editor/window-/resize-/top-left/layout.css',
 "https://core.parts/os-95/programs/graph-editor/window-/resize-/top-left/?onpointerdown" => 'https://core.parts/os-95/programs/graph-editor/window-/resize-/top-left/onpointerdown.js',
 "https://core.parts/os-95/programs/graph-editor/window-/resize-/top-right/layout.css" => '
  :host {
   position: absolute;
   top: -2px;
   right: -2px;
   width: 6px;
   height: 6px;
   cursor: nesw-resize
  }',
 "https://core.parts/os-95/programs/graph-editor/window-/resize-/top-right/onpointerdown.js~" => '`({ clientX: x, clientY: y }) => { const start = JSON.parse("" + Ω[\'https://core.parts/os-95/programs/graph-editor/window-/position.json\']); Ω[\'https://core.parts/os-95/programs/graph-editor/window-/grab.json\'] = JSON.stringify({ x, y, start, mode: \'ne-resize\' }); Ω[\'https://core.parts/behaviors/grab/src.uri\'] = \'https://core.parts/os-95/programs/graph-editor/window-/pointer-transform.js\' }`',
 "https://core.parts/os-95/programs/graph-editor/window-/resize-/top-right/?layout" => 'https://core.parts/os-95/programs/graph-editor/window-/resize-/top-right/layout.css',
 "https://core.parts/os-95/programs/graph-editor/window-/resize-/top-right/?onpointerdown" => 'https://core.parts/os-95/programs/graph-editor/window-/resize-/top-right/onpointerdown.js',
 "https://core.parts/os-95/programs/graph-editor/window-/resize-/top-/layout.css" => '
  :host {
   position: absolute;
   top: -2px;
   left: 4px;
   right: 4px;
   height: 6px;
   cursor: ns-resize
  }',
 "https://core.parts/os-95/programs/graph-editor/window-/resize-/top-/onpointerdown.js~" => '`({ clientX: x, clientY: y }) => { const start = JSON.parse("" + Ω[\'https://core.parts/os-95/programs/graph-editor/window-/position.json\']); Ω[\'https://core.parts/os-95/programs/graph-editor/window-/grab.json\'] = JSON.stringify({ x, y, start, mode: \'n-resize\' }); Ω[\'https://core.parts/behaviors/grab/src.uri\'] = \'https://core.parts/os-95/programs/graph-editor/window-/pointer-transform.js\' }`',
 "https://core.parts/os-95/programs/graph-editor/window-/resize-/top-/?layout" => 'https://core.parts/os-95/programs/graph-editor/window-/resize-/top-/layout.css',
 "https://core.parts/os-95/programs/graph-editor/window-/resize-/top-/?onpointerdown" => 'https://core.parts/os-95/programs/graph-editor/window-/resize-/top-/onpointerdown.js',
 "https://core.parts/os-95/programs/graph-editor/window-/restore-button/down-fx.uri" => 'https://core.parts/os-95/programs/graph-editor/window-/restore-button/layout.css',
 "https://core.parts/os-95/programs/graph-editor/window-/restore-button/down.txt" => '0',
 "https://core.parts/os-95/programs/graph-editor/window-/restore-button/down.txt?fx" => 'https://core.parts/os-95/programs/graph-editor/window-/restore-button/down-fx.uri',
 "https://core.parts/os-95/programs/graph-editor/window-/restore-button/layout.css?down" => 'https://core.parts/os-95/programs/graph-editor/window-/restore-button/down.txt',
 "https://core.parts/os-95/programs/graph-editor/window-/restore-button/layout.css~" => '`:host {
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
 "https://core.parts/os-95/programs/graph-editor/window-/restore-button/onclick.js" => '()=>Ω[\'https://core.parts/os-95/programs/graph-editor/window-/maximized.txt\'] = \'0\'',
 "https://core.parts/os-95/programs/graph-editor/window-/restore-button/onpointerdown.js" => 'e => { e.stopPropagation(); Ω[\'https://core.parts/os-95/programs/graph-editor/window-/restore-button/down.txt\'] = \'1\'; Ω[\'https://core.parts/behaviors/release/src.uri\'] = \'https://core.parts/os-95/programs/graph-editor/window-/restore-button/release.js\'
  }',
 "https://core.parts/os-95/programs/graph-editor/window-/restore-button/release.js" => 'e => { Ω[\'https://core.parts/os-95/programs/graph-editor/window-/restore-button/down.txt\'] = \'0\'
  }',
 "https://core.parts/os-95/programs/graph-editor/window-/restore-button/?layout" => 'https://core.parts/os-95/programs/graph-editor/window-/restore-button/layout.css',
 "https://core.parts/os-95/programs/graph-editor/window-/restore-button/?onclick" => 'https://core.parts/os-95/programs/graph-editor/window-/restore-button/onclick.js',
 "https://core.parts/os-95/programs/graph-editor/window-/restore-button/?onpointerdown" => 'https://core.parts/os-95/programs/graph-editor/window-/restore-button/onpointerdown.js',
 "https://core.parts/os-95/programs/graph-editor/window-/title-bar/layout.css?focus" => 'https://core.parts/os-95/programs/graph-editor/window-/active.txt',
 "https://core.parts/os-95/programs/graph-editor/window-/title-bar/layout.css~" => '`:host {
   background: ${(""+focus) === \'1\' ? \'rgb(0, 0, 163)\' : \'#7f7f7f\'};
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
  }`',
 "https://core.parts/os-95/programs/graph-editor/window-/title-bar/manifest.uri" => 'https://core.parts/os-95/programs/graph-editor/app-icon/ https://core.parts/os-95/programs/graph-editor/app-label/  https://core.parts/flex-spacer/ https://core.parts/os-95/programs/graph-editor/window-/window-controls/',
 "https://core.parts/os-95/programs/graph-editor/window-/title-bar/ondblclick.js?maximized" => 'https://core.parts/os-95/programs/graph-editor/window-/maximized.txt',
 "https://core.parts/os-95/programs/graph-editor/window-/title-bar/ondblclick.js~" => '`() => { Ω[\'https://core.parts/os-95/programs/graph-editor/window-/${(""+maximized) === \'1\' ? \'restore\' : \'maximize\'}-button/onclick.js\']() }`',
 "https://core.parts/os-95/programs/graph-editor/window-/title-bar/onpointerdown.js~" => '`({ clientX: x, clientY: y }) => { const start = JSON.parse("" + Ω[\'https://core.parts/os-95/programs/graph-editor/window-/position.json\']); Ω[\'https://core.parts/os-95/programs/graph-editor/window-/grab.json\'] = JSON.stringify({ x, y, start, mode: \'move\' }); Ω[\'https://core.parts/behaviors/grab/src.uri\'] = \'https://core.parts/os-95/programs/graph-editor/window-/pointer-transform.js\' }`',
 "https://core.parts/os-95/programs/graph-editor/window-/title-bar/?layout" => 'https://core.parts/os-95/programs/graph-editor/window-/title-bar/layout.css',
 "https://core.parts/os-95/programs/graph-editor/window-/title-bar/?manifest" => 'https://core.parts/os-95/programs/graph-editor/window-/title-bar/manifest.uri',
 "https://core.parts/os-95/programs/graph-editor/window-/title-bar/?ondblclick" => 'https://core.parts/os-95/programs/graph-editor/window-/title-bar/ondblclick.js',
 "https://core.parts/os-95/programs/graph-editor/window-/title-bar/?onpointerdown" => 'https://core.parts/os-95/programs/graph-editor/window-/title-bar/onpointerdown.js',
 "https://core.parts/os-95/programs/graph-editor/window-/window-controls/layout.css" => '
  :host {
   display: flex;
   flex-flow: row nowrap
  }',
 "https://core.parts/os-95/programs/graph-editor/window-/window-controls/manifest.uri?maximized" => 'https://core.parts/os-95/programs/graph-editor/window-/maximized.txt',
 "https://core.parts/os-95/programs/graph-editor/window-/window-controls/manifest.uri~" => '`https://core.parts/os-95/programs/graph-editor/window-/minimize-button/ https://core.parts/os-95/programs/graph-editor/window-/${(""+maximized) === \'1\' ? \'restore\' : \'maximize\'}-button/ https://core.parts/os-95/programs/graph-editor/window-/exit-button/`',
 "https://core.parts/os-95/programs/graph-editor/window-/window-controls/?layout" => 'https://core.parts/os-95/programs/graph-editor/window-/window-controls/layout.css',
 "https://core.parts/os-95/programs/graph-editor/window-/window-controls/?manifest" => 'https://core.parts/os-95/programs/graph-editor/window-/window-controls/manifest.uri',
 "https://core.parts/os-95/programs/graph-editor/window-/?layout" => 'https://core.parts/os-95/programs/graph-editor/window-/layout.css',
 "https://core.parts/os-95/programs/graph-editor/window-/?manifest" => 'https://core.parts/os-95/programs/graph-editor/window-/manifest.uri',
 "https://core.parts/os-95/programs/graph-editor/window-/?onfocus" => 'https://core.parts/os-95/programs/graph-editor/window-/onfocus.js',
 /*
- OS-95
 */
 "https://core.parts/os-95/taskbar-/css-height.txt" => '28px',
 "https://core.parts/os-95/taskbar-/css-height/fx.uri" => 'https://core.parts/layout.css https://core.parts/os-95/taskbar-/start-menu/layout.css',
 "https://core.parts/os-95/taskbar-/layout.css" => '
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
 "https://core.parts/os-95/taskbar-/manifest.uri?running_apps" => 'https://core.parts/os-95/tasks.uri',
 "https://core.parts/os-95/taskbar-/manifest.uri~" => '`https://core.parts/os-95/taskbar-/start-button/ ${"" + running_apps ? running_apps + " " : ""}https://core.parts/flex-spacer/ https://core.parts/os-95/taskbar-/tray-/`',
 "https://core.parts/os-95/taskbar-/selected.txt" => '-1',
 "https://core.parts/os-95/taskbar-/selected.txt?fx" => 'https://core.parts/os-95/taskbar-/selected/fx.uri',
 "https://core.parts/os-95/taskbar-/selected.txt~" => '
  {
   let wasOn;
   const result = ""+(""+fx).split(" ").findIndex(x => {
    const
     src = caller,
     isX = x === src;
    wasOn = Δ[src] === "1";
    return (src && wasOn) ? isX : ("" + Ω[x] === "1");
   });

   return result;
  }',
 "https://core.parts/os-95/taskbar-/selected/fx.uri" => 'https://core.parts/os/start-menu/open.txt https://core.parts/os-95/programs/file-browser/window-/active.txt https://core.parts/os-95/programs/file-browser/window-/onfocus.js https://core.parts/os-95/programs/graph-editor/window-/active.txt',
 "https://core.parts/os-95/taskbar-/start-button/icon-/layout.css?icon" => 'https://core.parts/apple-touch-icon.png',
 "https://core.parts/os-95/taskbar-/start-button/icon-/layout.css~" => '`:host {
   position: relative;
   box-sizing: border-box;
   height: 100%;
   margin: 0;
   background: url(data:image/png;base64,${icon});
   background-size: 16px;
   width: 16px;
   height: 16px }`',
 "https://core.parts/os-95/taskbar-/start-button/icon-/?layout" => 'https://core.parts/os-95/taskbar-/start-button/icon-/layout.css',
 "https://core.parts/os-95/taskbar-/start-button/label-/layout.css" => '
  :host {
   position: relative;
   box-sizing: border-box;
   margin: 0;
   height: 16px }
  :host::before {
   content: "Start";
  }',
 "https://core.parts/os-95/taskbar-/start-button/label-/?layout" => 'https://core.parts/os-95/taskbar-/start-button/label-/layout.css',
 "https://core.parts/os-95/taskbar-/start-button/layout.css?open" => 'https://core.parts/os/start-menu/open.txt',
 "https://core.parts/os-95/taskbar-/start-button/layout.css~" => '
  {
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
   `
  }',
 "https://core.parts/os-95/taskbar-/start-button/manifest.uri" => 'https://core.parts/os-95/taskbar-/start-button/icon-/ https://core.parts/os-95/taskbar-/start-button/label-/',
 "https://core.parts/os-95/taskbar-/start-button/manifest.uri?open" => 'https://core.parts/os/start-menu/open.txt',
 "https://core.parts/os-95/taskbar-/start-button/onclick.js" => '
  () => {
   Ω["https://core.parts/os/start-menu/open.txt"] = "1";
  }',
 "https://core.parts/os-95/taskbar-/start-button/?layout" => 'https://core.parts/os-95/taskbar-/start-button/layout.css',
 "https://core.parts/os-95/taskbar-/start-button/?manifest" => 'https://core.parts/os-95/taskbar-/start-button/manifest.uri',
 "https://core.parts/os-95/taskbar-/start-button/?onclick" => 'https://core.parts/os-95/taskbar-/start-button/onclick.js',
 "https://core.parts/os-95/taskbar-/start-menu/click-to-close/layout.css" => '
  :host {
   position: fixed;
   display: block;
   left: 0;
   top: 0;
   bottom: 0;
   right: 0;
   content: "";
  }',
 "https://core.parts/os-95/taskbar-/start-menu/click-to-close/onclick.js" => '
  () => {
   Ω["https://core.parts/os/start-menu/open.txt"] = "0";
  }',
 "https://core.parts/os-95/taskbar-/start-menu/click-to-close/?layout" => 'https://core.parts/os-95/taskbar-/start-menu/click-to-close/layout.css',
 "https://core.parts/os-95/taskbar-/start-menu/click-to-close/?onclick" => 'https://core.parts/os-95/taskbar-/start-menu/click-to-close/onclick.js',
 "https://core.parts/os-95/taskbar-/start-menu/layout.css?height" => 'https://core.parts/os-95/taskbar-/css-height.txt',
 "https://core.parts/os-95/taskbar-/start-menu/layout.css~" => '`:host {
   position: relative;
   min-width: 164px;
   display: flex;
   flex-flow: column nowrap;
   position: absolute;
   left: 2px;
   bottom: calc(${height}
  - 4px);
   user-select: none;
   line-height: 18px;
   text-align: left;
   background: #c3c3c3;
   box-sizing: border-box;
   padding: 3px 3px 3px 24px;
   text-align: left;
   background: #c3c3c3;
   box-shadow: inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb }
  :host::after {
   pointer-events: none;
   display: block;
   content: "";
   position: absolute;
   left: 3px;
   top: 3px;
   bottom: 3px;
   background: #7f7f7f;
   width: 21px }`',
 "https://core.parts/os-95/taskbar-/start-menu/manifest.uri" => 'https://core.parts/os-95/programs/file-browser/start-menu-item/ https://core.parts/os-95/programs/graph-editor/start-menu-item/ https://core.parts/os-95/taskbar-/start-menu/network-folder/ https://core.parts/os-95/horizontal-line/ https://core.parts/os-95/taskbar-/start-menu/restart-server/ https://core.parts/os-95/taskbar-/start-menu/save-computer/ https://core.parts/os-95/taskbar-/start-menu/restart-computer/ https://core.parts/os-95/taskbar-/start-menu/save-computer-as/',
 "https://core.parts/os-95/taskbar-/start-menu/network-folder/app-icon/layout.css" => '
  :host {
   --size: 16px }
  :host::before {
   content: "🔭";
   font-size: var(--size);
   line-height: var(--size);
  }',
 "https://core.parts/os-95/taskbar-/start-menu/network-folder/app-icon/?layout" => 'https://core.parts/os-95/taskbar-/start-menu/network-folder/app-icon/layout.css',
 "https://core.parts/os-95/taskbar-/start-menu/network-folder/app-label/layout.css" => ':host::after {
   height: 24px;
   content: "Network";
  }',
 "https://core.parts/os-95/taskbar-/start-menu/network-folder/app-label/?layout" => 'https://core.parts/os-95/taskbar-/start-menu/network-folder/app-label/layout.css',
 "https://core.parts/os-95/taskbar-/start-menu/network-folder/layout.css" => '
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
 "https://core.parts/os-95/taskbar-/start-menu/network-folder/manifest.uri" => 'https://core.parts/os-95/taskbar-/start-menu/network-folder/app-icon/ https://core.parts/os-95/taskbar-/start-menu/network-folder/app-label/',
 "https://core.parts/os-95/taskbar-/start-menu/network-folder/?layout" => 'https://core.parts/os-95/taskbar-/start-menu/network-folder/layout.css',
 "https://core.parts/os-95/taskbar-/start-menu/network-folder/?manifest" => 'https://core.parts/os-95/taskbar-/start-menu/network-folder/manifest.uri',
 "https://core.parts/os-95/taskbar-/start-menu/restart-computer/app-icon/layout.css" => '
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
 "https://core.parts/os-95/taskbar-/start-menu/restart-computer/app-icon/?layout" => 'https://core.parts/os-95/taskbar-/start-menu/restart-computer/app-icon/layout.css',
 "https://core.parts/os-95/taskbar-/start-menu/restart-computer/app-label/layout.css" => ':host::after {
   height: 24px;
   content: "Boot > from localhost";
  }',
 "https://core.parts/os-95/taskbar-/start-menu/restart-computer/app-label/?layout" => 'https://core.parts/os-95/taskbar-/start-menu/restart-computer/app-label/layout.css',
 "https://core.parts/os-95/taskbar-/start-menu/restart-computer/layout.css" => '
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
 "https://core.parts/os-95/taskbar-/start-menu/restart-computer/manifest.uri" => 'https://core.parts/os-95/taskbar-/start-menu/restart-computer/app-icon/ https://core.parts/os-95/taskbar-/start-menu/restart-computer/app-label/',
 "https://core.parts/os-95/taskbar-/start-menu/restart-computer/onclick.js" => '
  () => {
   location.reload();
  }',
 "https://core.parts/os-95/taskbar-/start-menu/restart-computer/?layout" => 'https://core.parts/os-95/taskbar-/start-menu/restart-computer/layout.css',
 "https://core.parts/os-95/taskbar-/start-menu/restart-computer/?manifest" => 'https://core.parts/os-95/taskbar-/start-menu/restart-computer/manifest.uri',
 "https://core.parts/os-95/taskbar-/start-menu/restart-computer/?onclick" => 'https://core.parts/os-95/taskbar-/start-menu/restart-computer/onclick.js',
 "https://core.parts/os-95/taskbar-/start-menu/restart-server/app-icon/layout.css" => '
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
 "https://core.parts/os-95/taskbar-/start-menu/restart-server/app-icon/?layout" => 'https://core.parts/os-95/taskbar-/start-menu/restart-server/app-icon/layout.css',
 "https://core.parts/os-95/taskbar-/start-menu/restart-server/app-label/layout.css" => ':host::after {
   height: 24px;
   content: "Factory Reset";
  }',
 "https://core.parts/os-95/taskbar-/start-menu/restart-server/app-label/?layout" => 'https://core.parts/os-95/taskbar-/start-menu/restart-server/app-label/layout.css',
 "https://core.parts/os-95/taskbar-/start-menu/restart-server/layout.css" => '
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
 "https://core.parts/os-95/taskbar-/start-menu/restart-server/manifest.uri" => 'https://core.parts/os-95/taskbar-/start-menu/restart-server/app-icon/ https://core.parts/os-95/taskbar-/start-menu/restart-server/app-label/',
 "https://core.parts/os-95/taskbar-/start-menu/restart-server/onclick.js" => '
  () => {
   navigator.serviceWorker.controller.postMessage("restart");
   setTimeout(() => location.reload(), 1000);
  }',
 "https://core.parts/os-95/taskbar-/start-menu/restart-server/?layout" => 'https://core.parts/os-95/taskbar-/start-menu/restart-server/layout.css',
 "https://core.parts/os-95/taskbar-/start-menu/restart-server/?manifest" => 'https://core.parts/os-95/taskbar-/start-menu/restart-server/manifest.uri',
 "https://core.parts/os-95/taskbar-/start-menu/restart-server/?onclick" => 'https://core.parts/os-95/taskbar-/start-menu/restart-server/onclick.js',
 "https://core.parts/os-95/taskbar-/start-menu/save-computer-as/app-icon/?layout" => 'https://core.parts/os-95/taskbar-/start-menu/save-computer/app-icon/layout.css',
 "https://core.parts/os-95/taskbar-/start-menu/save-computer-as/app-label/layout.css" => ':host::after {
   height: 24px;
   content: "Save as ServiceWorker source";
  }',
 "https://core.parts/os-95/taskbar-/start-menu/save-computer-as/app-label/?layout" => 'https://core.parts/os-95/taskbar-/start-menu/save-computer-as/app-label/layout.css',
 "https://core.parts/os-95/taskbar-/start-menu/save-computer-as/layout.css" => '
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
 "https://core.parts/os-95/taskbar-/start-menu/save-computer-as/manifest.uri" => 'https://core.parts/os-95/taskbar-/start-menu/save-computer-as/app-icon/ https://core.parts/os-95/taskbar-/start-menu/save-computer-as/app-label/',
 "https://core.parts/os-95/taskbar-/start-menu/save-computer-as/onclick.js" => '
  () => {
   Ω["https://core.parts/os/start-menu/open.txt"] = "0"
   delete Δ["https://core.parts/os-95/taskbar-/tray-/clock-/date.txt"]
   delete Δ["https://core.parts/os-95/taskbar-/tray-/clock-/layout.css"]
   const
    a = document.createElement("a"),
    json = JSON.stringify(Object.keys(Δ).sort().reduce((temp_obj, key) => { temp_obj[key] = Δ[key]; return temp_obj }, {})).replace(/","/g,"\",\n  \"").replace(/^{/s, "{\n  ").replace(/}$/s, "\n}"),
    js = `var causality={},onfetch=(Ω=new Proxy({},new Proxy(${json},{get:(Δ,Υ)=>eval(Δ[V="https://core.parts/proxy/alpha.js"])})))["https://core.parts/file.js"];onmessage=Ω["https://core.parts/client-to-server.js"]`,
    ourl = URL.createObjectURL(new Blob([js], { type: "text/javascript" }));
    a.href = ourl
    a.download = "everything.js"
    document.body.appendChild(a)
   a.click();
    a.remove()
    URL.revokeObjectURL(ourl);
  }',
 "https://core.parts/os-95/taskbar-/start-menu/save-computer-as/?layout" => 'https://core.parts/os-95/taskbar-/start-menu/save-computer-as/layout.css',
 "https://core.parts/os-95/taskbar-/start-menu/save-computer-as/?manifest" => 'https://core.parts/os-95/taskbar-/start-menu/save-computer-as/manifest.uri',
 "https://core.parts/os-95/taskbar-/start-menu/save-computer-as/?onclick" => 'https://core.parts/os-95/taskbar-/start-menu/save-computer-as/onclick.js',
 "https://core.parts/os-95/taskbar-/start-menu/save-computer/app-icon/layout.css" => '
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
 "https://core.parts/os-95/taskbar-/start-menu/save-computer/app-icon/?layout" => 'https://core.parts/os-95/taskbar-/start-menu/save-computer/app-icon/layout.css',
 "https://core.parts/os-95/taskbar-/start-menu/save-computer/app-label/layout.css" => ':host::after {
   height: 24px;
   content: "Save to localhost";
  }',
 "https://core.parts/os-95/taskbar-/start-menu/save-computer/app-label/?layout" => 'https://core.parts/os-95/taskbar-/start-menu/save-computer/app-label/layout.css',
 "https://core.parts/os-95/taskbar-/start-menu/save-computer/layout.css" => '
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
 "https://core.parts/os-95/taskbar-/start-menu/save-computer/manifest.uri" => 'https://core.parts/os-95/taskbar-/start-menu/save-computer/app-icon/ https://core.parts/os-95/taskbar-/start-menu/save-computer/app-label/',
 "https://core.parts/os-95/taskbar-/start-menu/save-computer/onclick.js" => '
  () => {
   Ω["https://core.parts/os/start-menu/open.txt"] = "0"
   delete Δ["https://core.parts/os-95/taskbar-/tray-/clock-/date.txt"]
   delete Δ["https://core.parts/os-95/taskbar-/tray-/clock-/layout.css"]
   navigator.serviceWorker.controller.postMessage(Δ);
  }',
 "https://core.parts/os-95/taskbar-/start-menu/save-computer/?layout" => 'https://core.parts/os-95/taskbar-/start-menu/save-computer/layout.css',
 "https://core.parts/os-95/taskbar-/start-menu/save-computer/?manifest" => 'https://core.parts/os-95/taskbar-/start-menu/save-computer/manifest.uri',
 "https://core.parts/os-95/taskbar-/start-menu/save-computer/?onclick" => 'https://core.parts/os-95/taskbar-/start-menu/save-computer/onclick.js',
 "https://core.parts/os-95/taskbar-/start-menu/?layout" => 'https://core.parts/os-95/taskbar-/start-menu/layout.css',
 "https://core.parts/os-95/taskbar-/start-menu/?manifest" => 'https://core.parts/os-95/taskbar-/start-menu/manifest.uri',
 "https://core.parts/os-95/taskbar-/tray-/clock-/date.txt?fx" => 'https://core.parts/os-95/taskbar-/tray-/clock-/date/fx.uri',
 "https://core.parts/os-95/taskbar-/tray-/clock-/date.txt~" => 'new Date().toLocaleString("en-US", { hour: "numeric", minute: "numeric", hourCycle: "h12" })',
 "https://core.parts/os-95/taskbar-/tray-/clock-/date/fx.uri" => 'https://core.parts/os-95/taskbar-/tray-/clock-/layout.css',
 "https://core.parts/os-95/taskbar-/tray-/clock-/layout.css?date" => 'https://core.parts/os-95/taskbar-/tray-/clock-/date.txt',
 "https://core.parts/os-95/taskbar-/tray-/clock-/layout.css~" => '{ const minute = 1000 * 60, delay = minute - (Date.now() % minute);
  setTimeout(()=>{
  β.date = new Date().toLocaleString("en-US", {
   hour: "numeric", minute: "numeric", hourCycle: "h12" }) }, delay + 5);
  return `:host::after {
   content: "${date}";
   white-space: nowrap;
  }`}',
 "https://core.parts/os-95/taskbar-/tray-/clock-/?layout" => 'https://core.parts/os-95/taskbar-/tray-/clock-/layout.css',
 "https://core.parts/os-95/taskbar-/tray-/layout.css" => ':host {
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
 "https://core.parts/os-95/taskbar-/tray-/manifest.uri" => 'https://core.parts/factory-reset-button/ https://core.parts/fullscreen-button/ https://core.parts/os-95/taskbar-/tray-/clock-/',
 "https://core.parts/os-95/taskbar-/tray-/?layout" => 'https://core.parts/os-95/taskbar-/tray-/layout.css',
 "https://core.parts/os-95/taskbar-/tray-/?manifest" => 'https://core.parts/os-95/taskbar-/tray-/manifest.uri',
 "https://core.parts/os-95/taskbar-/?layout" => 'https://core.parts/os-95/taskbar-/layout.css',
 "https://core.parts/os-95/taskbar-/?manifest" => 'https://core.parts/os-95/taskbar-/manifest.uri',
 "https://core.parts/os-95/tasks.uri" => 'https://core.parts/os-95/programs/file-browser/task-/ https://core.parts/os-95/programs/graph-editor/task-/',
 "https://core.parts/os-95/windows.uri" => 'https://core.parts/os-95/programs/file-browser/window-/ https://core.parts/os-95/programs/graph-editor/window-/',
 "https://core.parts/os-95/windows.uri?fx" => 'https://core.parts/os-95/windows-fx.uri',
 "https://core.parts/os-95/windows-fx.uri" => 'https://core.parts/os-95/manifest.uri',
 "https://core.parts/os/icons/application-json-icon/layout.css?layout" => 'https://core.parts/os/icons/layout.js',
 "https://core.parts/os/icons/application-json-icon/layout.css~" => 'layout([220, 220, 255], \'\u{1F4C4}\', \'json\', [1/7, 1/16, 1/8])',
 "https://core.parts/os/icons/application-json-icon/?layout" => 'https://core.parts/os/icons/application-json-icon/layout.css',
 "https://core.parts/os/icons/application-wasm-icon/layout.css?layout" => 'https://core.parts/os/icons/layout.js',
 "https://core.parts/os/icons/application-wasm-icon/layout.css~" => 'layout([0, 0, 0, 0], \'\u{1F4E6}\')',
 "https://core.parts/os/icons/application-wasm-icon/?layout" => 'https://core.parts/os/icons/application-wasm-icon/layout.css',
 "https://core.parts/os/icons/folder-icon/layout.css" => '
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
 "https://core.parts/os/icons/folder-icon/?layout" => 'https://core.parts/os/icons/folder-icon/layout.css',
 "https://core.parts/os/icons/image-png-icon/layout.css?layout" => 'https://core.parts/os/icons/layout.js',
 "https://core.parts/os/icons/image-png-icon/layout.css~" => 'layout([255, 127, 0], \'\u{1F4C4}\', \'png\')',
 "https://core.parts/os/icons/image-png-icon/?layout" => 'https://core.parts/os/icons/image-png-icon/layout.css',
 "https://core.parts/os/icons/image-vnd-microsoft-icon-icon/layout.css?layout" => 'https://core.parts/os/icons/layout.js',
 "https://core.parts/os/icons/image-vnd-microsoft-icon-icon/layout.css~" => 'layout([127, 127, 127, 0.25], \'\u{1F4C4}\', \'ico\', [0.1, 0.1, 0.1])',
 "https://core.parts/os/icons/image-vnd-microsoft-icon-icon/?layout" => 'https://core.parts/os/icons/image-vnd-microsoft-icon-icon/layout.css',
 "https://core.parts/os/icons/kireji-icon/layout.css" => '
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
 "https://core.parts/os/icons/kireji-icon/?layout" => 'https://core.parts/os/icons/kireji-icon/layout.css',
 "https://core.parts/os/icons/layout.js" => '
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
 "https://core.parts/os/icons/domain-icon/layout.css" => '
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
 "https://core.parts/os/icons/domain-icon/?layout" => 'https://core.parts/os/icons/domain-icon/layout.css',
 "https://core.parts/os/icons/text-css-icon/layout.css?layout" => 'https://core.parts/os/icons/layout.js',
 "https://core.parts/os/icons/text-css-icon/layout.css~" => 'layout([0, 255, 255], \'\u{1F4C4}\', \'css\')',
 "https://core.parts/os/icons/text-css-icon/?layout" => 'https://core.parts/os/icons/text-css-icon/layout.css',
 "https://core.parts/os/icons/text-html-icon/layout.css?layout" => 'https://core.parts/os/icons/layout.js',
 "https://core.parts/os/icons/text-html-icon/layout.css~" => 'layout([255, 255, 255], \'\u{1F4C4}\', \'html\')',
 "https://core.parts/os/icons/text-html-icon/?layout" => 'https://core.parts/os/icons/text-html-icon/layout.css',
 "https://core.parts/os/icons/text-javascript-icon/layout.css?layout" => 'https://core.parts/os/icons/layout.js',
 "https://core.parts/os/icons/text-javascript-icon/layout.css~" => 'layout([255, 127, 127, 0.7], \'\u{1F4C4}\', \'js\', [0.4])',
 "https://core.parts/os/icons/text-javascript-icon/?layout" => 'https://core.parts/os/icons/text-javascript-icon/layout.css',
 "https://core.parts/os/icons/text-plain-icon/layout.css" => '
  :host {
   --size: 16px;
   width: var(--size);
   height: var(--size) }
  :host::before {
   content: \'📄\';
   font-size: var(--size);
   line-height: var(--size)
  }',
 "https://core.parts/os/icons/text-plain-icon/?layout" => 'https://core.parts/os/icons/text-plain-icon/layout.css',
 "https://core.parts/os/icons/text-uri-list-icon/layout.css" => '
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
 "https://core.parts/os/icons/text-uri-list-icon/layout.cs?layout" => 'https://core.parts/os/icons/layout.js',
 "https://core.parts/os/icons/text-uri-list-icon/layout.css~" => 'layout([0, 0, 0], "\u{1F4C4}", "uri", [1, 1, 0.3])',
 "https://core.parts/os/icons/text-uri-list-icon/?layout" => 'https://core.parts/os/icons/text-uri-list-icon/layout.css',
 "https://core.parts/os/letters/capital-f/layout.css" => '
  :host::before {
   content: "F"
  }',
 "https://core.parts/os/letters/capital-f/?layout" => 'https://core.parts/os/letters/capital-f/layout.css',
 "https://core.parts/os/letters/lowercase-e/layout.css" => ':host::before {
   content: "e"
  }',
 "https://core.parts/os/letters/lowercase-e/?layout" => 'https://core.parts/os/letters/lowercase-e/layout.css',
 "https://core.parts/os/letters/lowercase-i/layout.css" => ':host::before {
   content: "i"
  }',
 "https://core.parts/os/letters/lowercase-i/?layout" => 'https://core.parts/os/letters/lowercase-i/layout.css',
 "https://core.parts/os/letters/lowercase-l/layout.css" => ':host::before {
   content: "l"
  }',
 "https://core.parts/os/letters/lowercase-l/?layout" => 'https://core.parts/os/letters/lowercase-l/layout.css',
 "https://core.parts/os/start-menu/open-fx.uri" => 'https://core.parts/os-95/taskbar-/start-button/layout.css https://core.parts/os-95/taskbar-/selected.txt https://core.parts/os-95/manifest.uri',
 "https://core.parts/os/start-menu/open.txt" => '0',
 "https://core.parts/os/start-menu/open.txt?fx" => 'https://core.parts/os/start-menu/open-fx.uri',
 "https://core.parts/os/start-menu/open.txt?selected" => 'https://core.parts/os-95/taskbar-/selected.txt',
 "https://core.parts/os/start-menu/open.txt~" => '("" + selected) ==="0" ? "1" : "0"',
 /*
- Proxy
 */
 "https://core.parts/proxy/alpha.js" => '
  ({
   get:
    (_, υ) => {
     const
      regex = /^(?<protocol>[a-z+]+:\/\/?)(?:(?<host>[^\/]+?)(?:\/(?<path>(?:[^\s.~?\/]+?\/)*)(?:(?<part>[a-z][a-z0-9]*-[a-z0-9-]*)\/?|(?<filename>[^\s~?\/]*)\.(?<extension>(?<binary>png|ico|woff2|wasm)|[^\s.~?\/]+))|\/(?<index>(?:[^\s.~?\/]+?\/)*))(?:~{0,6}\?(?<kireji>[a-zA-Z][a-zA-Z0-9_]*)(?:=(?<value>-?[\d]*\.?[\d]*)(?<rest_kireji>&(?:[a-zA-Z][a-zA-Z0-9_]*=-?[\d]*\.?[\d]*)+)?$)?)?)?(?<rank>~{0,7})$/,
      Ψ = υ.match(regex)?.groups;

     if (!Ψ)
      throw new TypeError(\'bad request: \' + υ)

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
       uri: "text/uri-list"

      },
      true_extension = Ψ.value ? "js"
                       : (Ψ.rank.length) ? "js"
                       : (Ψ.index !== undefined || Ψ.part !== undefined) ? "html"
                       : (Ψ.kireji === undefined) ? Ψ.extension
                       : "uri";
     Object.defineProperties(Ψ, extras)
     if (Ψ.value)
      Ψ.target = υ.slice(0, - Ψ.kireji.length - (2 + Ψ.value.length))

     Ψ.type = types[true_extension] ?? "text/plain";
     let α, β;
     α = new Proxy(Proxy, {
      get: (_, π) => {
       if (π === Symbol.toPrimitive) π = \'toPrimitive\';
       const result = eval(`(${Δ[Δ[`${υ}?${π}`] ?? Δ[`${Δ[`${υ}?core`] ?? \'https://core.parts/core-part/\'}?${π}`]] ?? Δ[`https://core.parts/proxy/beta/${π}.js`]})`)
       return result

      }

     })

     return β = new Proxy(α, α)
    
    },
   set:
    (_, υ, δ) => {
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
         recursive_getfx(url, ("" + Ω[url].fx).split(\' \'), level + 1)

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
     extract(\'undefined\')
     recursive_getprio(υ)
     // TODO: Allow a script to set others?
     order.forEach(url => {
      const
       existing = Δ[url],
       imagination = Ω[url][Symbol.toPrimitive](\'imaginary\', υ);

      if (existing !== imagination) {
       payload[url] = Δ[url] = imagination
       // TODO: verify. For all fx of current url whose own url already passed through this callback,
       // imagine the fx\'s value again. maybe it changed? That would be a consistency issue.

      }

     })
     onset(payload)
     globalThis.coresetlock = false
    }
  }[Υ])',
 "https://core.parts/proxy/beta/apply.js" => '
  (_, __, A) => {
   return eval("" + α)(...A)
  }',
 "https://core.parts/proxy/beta/get.js" => '
  (_, π) => {
   if ([\'toPrimitive\', Symbol.toPrimitive, \'toString\', \'valueOf\', \'headerOf\', \'rootsOf\', \'query\'].includes(π)) return α[π]
   const url = Δ[`${υ}?${π}`] ?? Δ[`${Δ[`${υ}?core`] ?? \'https://core.parts/core-part/\'}?${π}`];
   return url ? Ω[url] : undefined
  }',
 "https://core.parts/proxy/beta/getOwnPropertyDescriptor.js" => '
  (_, π) => ({
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
  (_, π) => {
   return Δ[`${υ}?${π}`] !== undefined
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
   const keys = new Set()
   α.query(l => keys.add(l.kireji))
   return [...keys]
  }',
 "https://core.parts/proxy/beta/query.js" => '
  (ƒ = x => x) => {
   const roots = β.rootsOf()
   return Object.keys(Δ).reduce((o, url) => {
    const rootIndex = roots.findIndex(root => url.startsWith(root + \'?\'));
    if (rootIndex !== -1) {
     const root = roots[rootIndex],
      kireji = url.slice(root.length + 1)
     const item = { url, root, kireji, rootIndex }
     const result = ƒ(item)
     if (result) o.push(result)
    }
    return o
   }, [])
  }',
 "https://core.parts/proxy/beta/rootsOf.js" => '
  () => {
   const roots = [υ]
   let root = υ, key;
   while (root = Δ[key = root + \'?core\']) {
    if (roots.includes(root)) throw \'core loop\'
    roots.push(root);
    if (root === Υ) break;
   }
   if (!roots.includes(Υ)) roots.push(Υ)
   return roots;
  }',
 "https://core.parts/proxy/beta/set.js" => '
  (_, kireji, value) => {
   console.log("try to use the other method directly", { kireji, value, υ })
   return Ω[Ω[Ω[υ].query(l => l.kireji === kireji ? l.url : undefined)[0]]] = value
  }',
 "https://core.parts/proxy/beta/toPrimitive.js" => '
  (hint, caller) => {
   let url = υ, rank = Ψ.rank
   const
    getroots = () => {
     const roots = []
     let root = υ, key;
     while (root = Δ[key = root + \'?core\']) {
      if (roots.includes(root)) throw \'core loop\'
      roots.push(root);
     }
     return roots;
    },
    imaginary = hint === \'imaginary\';
   if (Δ[url] === undefined || imaginary) {
    while ((imaginary && url === υ) || Δ[url] === undefined && rank.length < 7) {
     rank += \'~\'
     url += \'~\';
    }
    if (Δ[url] === undefined) {
     for (const root of getroots()) {
      const value = Ω[root][Symbol.toPrimitive]()
      if (value !== undefined) return value
     }
     console.warn(new TypeError(\'possible fx with no constructor \' + url), { roots: getroots() })
     return
    }
    rank = rank.slice(0, -1)
    url = url.slice(0, -1)
    const Kireji = {}
    Ω[url].query(l => {
     if (l.kireji in Kireji && Kireji[l.kireji].rootIndex <= l.rootIndex) return;
     Kireji[l.kireji] = l
    })
    const primitive = eval(`({${Object.entries(Kireji).map(([kireji, { url }]) => `"${Ω[url]}":${kireji}`).join(\',\')}})=>${Ω[`${url}~`]}`)(Ω)
    if (typeof primitive !== \'string\') throw new TypeError(`output of ${url} must be a string (got ${typeof primitive})`)
    if (imaginary) return primitive
    Ω[url] = primitive
   }
   return Δ[υ]
  }',
 "https://core.parts/proxy/beta/toString.js" => '
  () => {
   return Δ[υ]
  }',
 "https://core.parts/proxy/beta/valueOf.js" => '
  () => {
   return Δ[υ]
  }',/*
- Templates
 */
 "https://core.parts/templates/button.js" => '
  (url, layout = "", manifest = "", onclickjs = `()=>{ console.log("button click ${url}") }`) => {
   let parts = ("" + Ω["https://core.parts/templates/button.json"]).replace(/\$1/g, url).replace(/\$2/, layout.replace(/\n/g, "\\\\n").replace(/"/g, \'\\\\"\')).replace(/\$3/, manifest).replace(/"\$4"/, JSON.stringify(""+onclickjs))
   Object.entries(JSON.parse(parts)).forEach(([url, value]) => Ω[url] = value)
  }',

 "https://core.parts/templates/button.json" => '
  {
   "$1layout.css~": "{ return `:host { background-color: #c3c3c3;${(``+down) === `1` ? `background-image: linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white), linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white); background-size: 2px 2px; background-position: 0 0, 1px 1px;`:``}; box-sizing: border-box; box-shadow: ${(``+down) === `1` ? `inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a` : `inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb`}} $2` }",
   "$1manifest.uri": "$3",
   "$1onclick.js": "$4",
   "$1?layout": "$1layout.css",
   "$1?manifest": "$1manifest.uri",
   "$1?onclick": "$1onclick.js",
   "$1layout.css?down": "$1down.txt",
   "$1?onpointerdown": "$1onpointerdown.js",
   "$1onpointerdown.js": "e => { e.stopPropagation(); Ω[\'$1down.txt\'] = \'1\'; Ω[\'https://core.parts/behaviors/release/src.uri\'] = \'$1release.js\' }","$1release.js":"e => { Ω[\'$1down.txt\'] = \'0\' }",
   "$1down.txt": "0",
   "$1down.txt?fx": "$1down-fx.uri",
   "$1down-fx.uri": "$1layout.css"
  }',
 "https://core.parts/templates/click.json" => '
  {
   "$1?onclick": "$1onclick.js",
   "$1onclick.js": "e => Ω[\'https://core.parts/templates/js/onclick.js\'](e, \'$2\',\'$3\')"
  }',

 "https://core.parts/templates/click.js" => '
  ($1, $2 = "https://core.parts/templates/defaults/single-click.js", $3 = "https://core.parts/templates/defaults/double-click.js") => {
   return Ω["https://core.parts/templates/instantiate.js"]("click", $1, $2, $3)
  }',

 "https://core.parts/templates/js/onclick.js" => '
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
     return Ω[$3](e)
    }
   }

   // Wait for double click.
   globalThis[key] = { url: e.target.url, timeout: setTimeout(() => delete globalThis[key], 500) }

   // Handle single click.
   return Ω[$2](e)
  }',

 "https://core.parts/templates/part.json" => '
  {
   "$1layout.css": "$2",
   "$1manifest.uri": "$3",
   "$1?layout": "$1layout.css",
   "$1?manifest": "$1manifest.uri"
  }',

 "https://core.parts/templates/instantiate.js" => '
  (template_name, ...$) => Object.assign(Δ, JSON.parse($.reduce(
   (x, $n, n) => x.replace(new RegExp("\\\\$" + (n+1), "g"), $n),
   "" + Ω[`https://core.parts/templates/${template_name}.json`]
  )))',

 "https://core.parts/templates/defaults/single-click.js" => '({ target }) => { console.log("single click", target) }',
 "https://core.parts/templates/defaults/double-click.js" => '({ target }) => { console.log("double click", target) }',
 "https://core.parts/templates/part.js" => '
  (url, layout = "", manifest = "", ...components) => {
   let parts = ("" + Ω[\'https://core.parts/templates/part.json\']).replace(/\$1/g, url).replace(/\$2/, layout.replace(/\n/g, "\\\\n").replace(/"/g, \'\\\\"\')).replace(/\$3/, manifest)

   for (const component in components)
    throw new RangeError(\'unhandled component\', { url, component, components })

   Object.assign(Δ, JSON.parse(parts))

  }',
 /*
- Research
 */
 "https://ejaugust.com/research/wasm/js/test.js" => 'WebAssembly.instantiateStreaming(onfetch("https://core.parts/wasm/test.wasm")).then(_ => console.log(_.instance.exports))',
 /*
- Websites
 */
 "https://ejaugust.com/research/wasm/test.wasm" => 'AGFzbQEAAAABBwFgA39/fwADAgEABQMBAAEHDgIDbWVtAgAEZmlsbAAACg0BCwAgACABIAL8CwALAAoEbmFtZQIDAQAA',
 "https://ejaugust.com/favicon.ico?src" => 'https://core.parts/apple-touch-icon.png',
 "https://kireji.app/favicon.ico?src" => 'https://core.parts/apple-touch-icon.png',
 "https://kireji.io/favicon.ico?src" => 'https://core.parts/apple-touch-icon.png',
 "https://orenjinari.com/favicon.ico?src" => 'https://core.parts/apple-touch-icon.png',
 "kireji://99.108.88.76/favicon.ico?src" => 'https://core.parts/apple-touch-icon.png',
 "kireji://97.76.210.20/favicon.ico?src" => 'https://core.parts/apple-touch-icon.png',
 "kireji://35.138.226.122/favicon.ico?src" => 'https://core.parts/apple-touch-icon.png',
 "https://ejaugust.com/favicon.ico~" => '
  {
   return src[Symbol.toPrimitive]()
  }',
 "https://kireji.app/favicon.ico~" => '
  {
   src[Symbol.toPrimitive]()
  }',
 "https://kireji.io/favicon.ico~" => '
  {
   src[Symbol.toPrimitive]()
  }',
 "https://orenjinari.com/favicon.ico~" => '
  {
   src[Symbol.toPrimitive]()
  }',
 "kireji://99.108.88.76/favicon.ico~" => '
  {
   src[Symbol.toPrimitive]()
  }',
 "kireji://97.76.210.20/favicon.ico~" => '
  {
   src[Symbol.toPrimitive]()
  }',
 "kireji://35.138.226.122/favicon.ico~" => '
  {
   src[Symbol.toPrimitive]()
  }'
];
eval('?>' . $Δ["https://core.parts/deploy/php/index.php"] . "<?php ");
