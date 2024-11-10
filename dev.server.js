// TODO: Lock the interface from interaction from the moment the hash changes to when the document is set.
function boot() {
 async function client() {
  var time = performance.now(),
   averageFrameTime = 1000,
   framerate = 0,
   frameRequest,
   pausedAction

  const IS_MAC = navigator.userAgent.indexOf("Mac") > -1,
   VERSION = 86 / 1000,
   DEFAULT_HASH = "#.htaccess",
   EMPTY_HASH = "#empty",
   throttle = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ? 350 : 75,
   swContainer = navigator.serviceWorker,
   swReg = await swContainer.register(location.origin + "/" + (/^dev\./.test(location.host) ? "dev." : "") + "server.js"),
   swActive = swReg.active ?? (await new Promise(r => ((swReg.waiting ?? swReg.installing).onstatechange = ({ target: t }) => t.state == "activated" && r(t)))),
   setLocation = () => {
    if (pausedAction) {
     clearTimeout(pausedAction)
     pausedAction = undefined
    }
    pausedAction = setTimeout(() => {
     pausedAction = undefined
     if (hash === location.hash) return
     history.timestamp = performance.now()
     if (!location.hash && hash === DEFAULT_HASH) history.replaceState({}, null, hash)
     else history.pushState({}, null, hash)
    }, throttle - time + history.timestamp)
   },
   error = () => {
    throw document.hash + ": no transition to " + hash
   },
   setDocument = () => {
    // TODO: Use indexing here...
    switch (document.hash) {
     case EMPTY_HASH:
      switch (hash) {
       case "#.htaccess":
       case "#dev.server.js":
       case "#index.php":
       case "#server.js":
       case "#nothing":
        document.querySelector("head>style").innerHTML = `html, body {
         background: linear-gradient(45deg, rgb(66,138,186) 0%, rgb(88,163,201) 47%, rgb(106,186,223) 100%);
         overflow: hidden;
         height: 100vh;
         width: 100vw;
         margin: 0;
        }
        body {
         font-family: Arial, sans-serif;
         color: white;
         box-sizing: border-box;
         padding: 16px;
         --system-ui:
          system-ui,
          "Segoe UI",
          Roboto,
          Helvetica,
          Arial,
          sans-serif,
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol";
         font: 13px var(--system-ui);
        }
        #file-list {
         list-style-type: none;
         padding: 0;
         margin-top: 16px;
         border-radius: 3px;
         overflow: hidden;
         box-shadow: 2px 8px 16px #00208007;
         display: flex;
         gap: 1px;
         flex-flow: column;
        }
        #file-list li {
         background: #adf6;
         padding: 15px;
         font-size: 16px;
         font-weight: 200;
         border-radius: 1.5px;
         color: #246;
        }
        .file-icon {
         margin-right: 10px;
         font-size: 20px;
        }
        #file-list li[data-selected="true"] {
         background: #2466;
         color: white;
        }`
        const onclickAttr = `event.stopPropagation();globalThis.hash='#'+this.getAttribute('data-href')`,
         selectAttr = ` data-selected="true"`,
         file = hash.slice(1),
         list = [".htaccess", "dev.server.js", "server.js", "index.php", "empty"].map(
          href => `<li onclick="${onclickAttr}" data-href="${href}"${file === href ? selectAttr : ""}><span class="file-icon">📄</span>${href}</li>`,
         )
        document.body.setAttribute("data-href", "nothing")
        document.body.setAttribute("onclick", onclickAttr)
        document.body.innerHTML = `<h1 id="header">File Explorer</h1><ul id="file-list">${list.join("")}</ul>`
        globalThis.fileNodes = [...document.querySelectorAll("#file-list>li")].reduce((memory, node) => ((memory[node.getAttribute("data-href")] = node), memory), {})
        globalThis.selectedNode = fileNodes[file]
        break
       default:
        error()
      }
      break
     case "#.htaccess":
     case "#dev.server.js":
     case "#index.php":
     case "#server.js":
     case "#nothing":
      switch (hash) {
       case "#.htaccess":
       case "#dev.server.js":
       case "#index.php":
       case "#server.js":
       case "#nothing":
        globalThis.selectedNode?.removeAttribute("data-selected")
        globalThis.selectedNode = globalThis.fileNodes[hash.slice(1)]
        globalThis.selectedNode?.setAttribute("data-selected", "true")
        break
       case EMPTY_HASH:
        document.querySelector("head>style").innerHTML = document.body.innerHTML = ``
        document.body.removeAttribute("data-href")
        document.body.removeAttribute("onclick")
        break
       default:
        error()
      }
      break
     default:
      error()
    }
    document.hash = document.title = hash
   },
   loop = now => {
    averageFrameTime += (now - time - averageFrameTime) / 20
    framerate = Math.round(1000 / averageFrameTime)
    time = now
    if (location.hash !== hash) setLocation()
    if (document.hash !== hash) setDocument()
    frameRequest = requestAnimationFrame(loop)
   }

  swContainer.controller || (await new Promise(r => ((swContainer.oncontrollerchange = r), swActive.postMessage({ code: 0 }))))
  swContainer.oncontrollerchange = swContainer.onmessage = () => location.reload()
  onfocus = () => swReg.update().catch(() => location.reload())
  onblur = () => (contextKeysDown = shifts = 0)
  onhashchange = () => {
   if (frameRequest) cancelAnimationFrame(frameRequest)
   history.lastSetTime = performance.now()
   hash = location.hash || DEFAULT_HASH
   loop(performance.now())
  }
  var contextKeysDown = 0,
   shifts = 0
  onkeydown = e => {
   if (IS_MAC) {
    if (e.key === "Meta") contextKeysDown++
   } else if (e.key === "Control") contextKeysDown++
   if (e.key === "Shift") shifts++
   if (contextKeysDown === 1 && !shifts && e.key === "z") history.back()
   if (contextKeysDown === 1 && !shifts && e.key === "y") history.forward()
   if (contextKeysDown === 1 && shifts && e.key === "z") history.forward()
   e.preventDefault()
  }
  onkeyup = e => {
   if (IS_MAC) {
    if (e.key === "Meta") contextKeysDown = Math.max(0, contextKeysDown - 1)
   } else if (e.key === "Control") contextKeysDown = Math.max(0, contextKeysDown - 1)
   if (e.key === "Shift") shifts = Math.max(0, shifts - 1)
   e.preventDefault()
  }
  document.querySelector('[rel="manifest"]').href = location.origin + "/manifest.json"
  document.hash = document.title = globalThis.hash = EMPTY_HASH
  onhashchange()
 }
 if (this.constructor === this.Window) client()
 else {
  const cache = {} // TODO: use built-in cache?
  onfetch = e => {
   // debug = /^dev\./.test(location.host)
   // const url = debug ? "https://" + e.request.url.slice(12) : e.request.url
   const { pathname } = new URL(e.request.url),
    cacheKey = pathname
   if (!(cacheKey in cache)) {
    let body, type
    switch (pathname) {
     // Reproduce real server files.
     case "/.htaccess":
      type = "text/plain"
      body = `AddCharset utf-8 .js
 ErrorDocument 404 /index.php
 ErrorDocument 403 /index.php
 Options -Indexes`
      break
     case "/index.php":
      body = `<!DOCTYPE html
  ><link rel=manifest
  ><meta name=robots content=noindex
  ><meta name=viewport content="width=device-width,initial-scale=1"
  ><meta name=copyright content="&copy; 2024 Eric Augustinowicz"
  ><script defer src="https://<?=$_SERVER['HTTP_HOST']."/".(in_array($_SERVER['REMOTE_ADDR'],['173.168.55.24'])?'dev.':'')?>server.js"
  ></script><style></style><!-- REMOTE INDEX -->`
      type = "text/html"
     case "/server.js":
     case "/dev.server.js":
      body = `${boot}\nboot()\n`
      type = "text/javascript; charset=UTF-8"
      break

     // Define virtual local files.
     case "/client.js":
      body = `(${client})()`
      type = "text/javascript; charset=UTF-8"
      break
     case "/manifest.json":
      body = JSON.stringify(
       {
        name: location.host.split(".").join(" "),
        short_name: location.host,
        start_url: ".",
        display: "standalone",
        background_color: "#336598",
        description: "An expirimental app.",
        icons: [
         {
          src: "favicon.svg",
          sizes: "144x144",
          type: "image/svg+xml",
         },
        ],
       },
       /*{
       name: "Untitled Application",
       short_name: "Untitled",
       start_url: ".",
       display: "standalone",
       theme_color: "#336598",
       background_color: "#333445",
       description: "A kireji app.",
       display_override: ["window-controls-overlay"],
       icons: [
        {
         src: "favicon.svg",
         sixes: "144x144",
         type: "image/svg+xml",
        },
        {
         src: "favicon.svg",
         sixes: "any",
         type: "image/svg+xml",
        },
        {
         src: "/android-chrome-192x192.png",
         sixes: "192x192",
         type: "image/svg+xml",
        },
        {
         src: "/android-chrome-512x512.png",
         sixes: "512x512",
         type: "image/svg+xml",
        },
       ],
       categories: ["entertainment", "games", "utilities"],
       protocol_handlers: [
        {
         protocol: "web+Part",
         url: "/Part?pathname=%s",
        },
       ],
       shortcuts: [
        {
         name: "New Item...",
         short_name: "New...",
         icons: [
          {
           src: "favicon.svg",
           sixes: "any",
           type: "image/svg+xml",
          },
         ],
         url: "/new",
         description: "This is just a placeholder/hint for future development.",
        },
       ],
       screenshots: [
        {
         src: "desktop-screenshot.svg",
         sixes: "640x480",
         type: "image/svg+xml",
         form_factor: "wide",
         label: "This is a placeholder for the image of the app.",
        },
        {
         src: "mobile-screenshot.svg",
         sixes: "640x360",
         type: "image/svg+xml",
         form_factor: "narrow",
         label: "This is a placeholder for the image of the app.",
        },
       ],
      }*/
      )
      type = "application/json; charset=UTf-8"
      break
     case "/favicon.svg":
     case "/favicon.ico":
     case "/apple-touch-icon.png":
     case "/mobile-screenshot.svg":
     case "/desktop-screenshot.svg":
     case "/android-chrome-192x192.png":
     case "/android-chrome-512x512.png":
      type = "image/svg+xml"
      body = `<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
   svg { background: white }
   path { stroke: #333445 }
   @media (prefers-color-scheme = dark) {
    svg { background: #333445 }
    path { stroke: white }
   }
  </style>
  <path d="M8 11C9.10457 11 10 10.1046 10 9C10 7.89543 9.10457 7 8 7C6.89543 7 6 7.89543 6 9C6 10.1046 6.89543 11 8 11Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M6.56055 21C12.1305 8.89998 16.7605 6.77998 22.0005 14.63" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M18 3H6C3.79086 3 2 4.79086 2 7V17C2 19.2091 3.79086 21 6 21H18C20.2091 21 22 19.2091 22 17V7C22 4.79086 20.2091 3 18 3Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`
      break
     default:
      body = `<!DOCTYPE html
 ><link rel=manifest href="${location.origin}/manifest.json"
 ><meta name=robots content=noindex
 ><meta name=viewport content="width=device-width,initial-scale=1"
 ><meta name=copyright content="&copy; 2024 Eric Augustinowicz"
 ><script defer src="${location.origin}/client.js"
 ></script><style></style><!-- LOCAL INDEX -->`
      type = "text/html"
    }
    cache[cacheKey] = new Response(body, {
     headers: {
      "content-type": type,
      expires: "Sun, 20 Jul 1969 20:17:00 UTC",
      server: "kireji",
     },
    })
   }
   e.respondWith(cache[cacheKey].clone())
  }
  oninstall = e => skipWaiting()
  onactivate = e => clients.claim()
  onmessage = e => [onactivate, () => registration.unregister().then(() => e.source.postMessage({ code: 0 })), () => console.warn("TODO: local save", e.data)][e.data.code]()
 }
}
boot()
