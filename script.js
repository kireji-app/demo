const Core = {
 get "size.part"() {
  return {
   "index.htm": "./core-address-size.number",
   "style.css": `./stat.css`
  }
 },
 get "tray.part"() {
  return {
   "index.parts": `./tray.parts`,
   "style.css": `data:,:host {
    position: relative;
    display: flex;
    flex-flow: row;
    gap: 3px;
    box-sizing: border-box;
    height: 100%;
    margin: 0;
    user-select: none;
    padding: 3px 4px 3px;
    text-align: left;
    background: #c3c3c3;
    box-shadow: inset -1px -1px white, inset 1px 1px #7a7a7a;
   }`
  }
 },
 get "line.part"() {
  return {
   "style.css": `data:text/css,:host {
      display: flex;
      flex-flow: row;
      font-family: monospace;
      overflow: hidden;
      background: ${this["theme.color"]};
     }
     :host(:first-child) {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
     }
     :host(:last-child) {
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
     }
     :host(:first-child) > * {
      padding-top: 0.5ch;
     }
     :host(:last-child) > * {
      padding-bottom: 0.5ch;
     }`,
   "index.parts": `data:text/json,${JSON.stringify([
    { ".name": "data:,line-number" },
    { ".name": "data:,line-content" }
   ])}`,
   "line-content.part": `data:text/json,${JSON.stringify({
    "index.htm": `data:text/getter,return this["content.txt"]`,
    "style.css": `data:text/css,:host {
     white-space: pre;
     padding-left: 0.5ch;
    }`
   })}`,
   "line-number.part": `data:text/json,${JSON.stringify({
    "index.htm": `data:text/getter,return "" + (isNaN(this["index.number"]) ? NaN : this["index.number"])`,
    "style.css": `data:text/css,:host {
     flex: 0 0 5ch;
     text-align: right;
     padding-right: 0.5ch;
     background: ${this["shade-theme.fn"]()};
    }`
   })}`,
   ".examples": `data:text/json,${JSON.stringify({
    "bad-line-number": [{ ".name": "data:,line", "index.number": 'data:text/json,"bad line number"' }],
    "no-line-number": [{ ".name": "data:,line", "content.txt": "data:, // missing line number" }]
   })}`
  }
 },
 get "text.part"() {
  return {
   ".tag": "data:,#text",
   "index.htm": "./content.txt"
  }
 },
 get "clock.part"() {
  return {
   "index.htm": `./time.txt`,
   ".examples": `data:text/json,${JSON.stringify({
    clock: [{ ".name": "data:,clock" }],
    tray: [{ ".name": "data:,tray" }]
   })}`
  }
 },
 get "empty.part"() {
  return {
   "index.parts": "./empty.parts",
   "onresize.fn": `./capture-resize.fn`,
   "style.css": `./empty.css`
  }
 },
 get "blank.part"() {
  return {}
 },
 get "title.part"() {
  return {
   "index.htm": `./title.htm`,
   "style.css": "./title.css"
  }
 },
 get "shelf.part"() {
  return {
   "index.parts": `./shelf.parts`,
   "style.css": `./shelf.css`,
   "padding.number": `data:text/json,4`,
   "height.number": `data:text/json,42`
  }
 },
 get "search.part"() {
  return {
   ".tag": "data:,search",
   "style.css": `data:text/css,:host {
    position: relative;
    font-size: 16px;
   }
    
   :host::before {
    content: "🔍";
    position: absolute;
    left: 20px;
    top: 0;
    bottom: 0;
    width: 32px;
    line-height: 32px;
   }`,
   "index.parts": `data:text/json,${JSON.stringify([
    {
     ".name": "data:,blank",
     ".tag": "data:,input",
     ".attributes": `data:text/json,${JSON.stringify({ type: "search", placeholder: "Search parts" })}`,
     "style.css": `data:text/css,:host {
      padding-left: 48px;
      padding-right: 12px;
      background: ${this["shade-theme.fn"](0.2)};
      border-radius: 16px;
      height: 32px;
      border: none;
      color: white;
     }`,
     "index.htm": `data:text/html,Search`
    }
   ])}`
  }
 },
 get "header.part"() {
  return {
   "index.parts": "./header.parts",
   "style.css": `./header.css`,
   ".tag": "data:,h1",
   "title.css": `data:text/css,:host {
    font-size: 32px;
    font-weight: 500;
    line-height: 32px;
   }`
  }
 },
 get "status.part"() {
  return {
   "index.parts": `./status.parts`,
   "style.css": `./status.css`
  }
 },
 get "version.part"() {
  return {
   "index.htm": `./version.number`,
   "pill-icon-right.bool": `./true.bool`,
   "style.css": `./stat.css`
  }
 },
 get "taskbar.part"() {
  return {
   "height.number": `data:,28px`,
   "index.parts": `./taskbar.parts`,
   "style.css": `data:,:host { position: relative; width: 100 %; box - sizing: border - box; height: 100 %; margin: 0; display: flex; flex - flow: row; gap: 3px; height: 100 %; padding: 4px 2px 2px; background: #c3c3c3; box - shadow: inset 0 1px #c3c3c3, inset 0 2px white; } `
  }
 },
 get "desktop.part"() {
  return {
   "style.css": `data:,:host{ background: #377f7f } `
  }
 },
 get "error404.part"() {
  return {
   "index.htm": `./error404.htm`,
   "style.css": `./error404.css`
  }
 },
 get "add-part.part"() {
  return {
   ".tag": "data:,button",
   "index.htm": "data:text/html,＋ Create Part",
   "style.css": `data:text/css,:host {
    border-radius: 16px;
    line-height: 0px;
    vertical-align: baseline;
    display: inline-block;
    background: #3a4;
    height: 0px;
    padding: 16px;
    border: none;
   }`
  }
 },
 get "universal.part"() {
  return {
   "onclick.fn": "data:text/getter,",
   "onresize.fn": "data:text/getter,",
   "onscroll.fn": "data:text/getter,",
   "onpointerdown.fn": "data:text/getter,",

   ".tag": "./name.tag",
   ".node": "./auto.node",
   ".sheet": "./auto.sheet",
   ".examples": "data:text/getter,",
   ".attributes": "data:text/getter,",
   "style.css": "data:text/getter,",
   "index.htm": "data:text/getter,",
   "index.parts": "data:text/getter,"
  }
 },
 get "part-list.part"() {
  return {
   "style.css": `data:,:host {
     padding: 48px;
     padding-top: 16px;
     display: flex;
     flex-flow: column;
     background: ${this["shade-theme.fn"](0.9)};
     color: ${this["theme.color"]};
     overflow-y: auto;
     font-size: 17px;
     font-weight: 200;
    }`,
   "index.parts": `./part-list.parts`,
   "onscroll.fn": "./scroll-name-y.fn"
  }
 },
 get "empty-icon.part"() {
  return {
   "index.htm": `data:text/html,∅`
  }
 },
 get "start-menu.part"() {
  return {
   "style.css": `./start-menu.css`,
   "index.parts": `./start-menu.parts`
  }
 },
 get "core.parts.part"() {
  return {
   "host.name": "./.name",
   "index.parts": `./core.parts.parts`,
   "style.css": `./core.parts.css`,
   "part-list-scroll-y.number": "data:text/json,0",
   "example-viewer-scroll-y.number": "data:text/json,0",
   "selected-part.name": `data:text/getter,`,
   ".examples": `data:text/json,${JSON.stringify({
    "home-1024-768": [{ ".name": "data:,core.parts" }, { width: 1024, height: 768 }],
    "home-640-480": [{ ".name": "data:,core.parts" }, { width: 640, height: 480 }],
    "editing-line": [
     {
      ".name": "data:,core.parts",
      "selected-part.name": "data:,line"
     },
     { width: 1024, height: 768 }
    ]
   })}`
  }
 },
 get "test-canvas.part"() {
  return {
   "style.css": `./test-canvas.css`,
   "core.object": "data:text/getter,return this",
   ".attributes": `data:text/getter,return { id: this["title.txt"] }`
  }
 },
 get "pilot.parts.part"() {
  return {
   "host.name": "./.name",
   "style.css": `./os.css`,
   "index.parts": `./os.parts`,
   "start-menu.bool": "./false.bool"
  }
 },
 get "flex-spacer.part"() {
  return {
   "style.css": `./flex-spacer.css`
  }
 },
 get "play-button.part"() {
  return {
   "onclick.fn": `./toggle-play.fn`,
   "index.htm": "data:,▶",
   "style.css": `./stat.css`
  }
 },
 get "reset-button.part"() {
  return {
   "index.htm": `data:text/html,⟳`,
   "style.css": `./unicode-button.css`,
   "onclick.fn": `./reset.fn`
  }
 },
 get "mini-browser.part"() {
  return {
   "index.parts": `./mini-browser.parts`,
   "style.css": `./mini-browser.css`,
   "size.json": `data:text/json,{"width":640,"height":480}`
  }
 },
 get "start-button.part"() {
  return {
   "style.css": `./start-button.css`,
   "index.htm": `data:,<icon-></icon->Start`,
   "onpointerdown.fn": `https://pilot.parts/toggle-start-menu.fn`,
   ".attributes": `data:text/json,${JSON.stringify({ tabindex: 1 })}`
  }
 },
 get "ejaugust.com.part"() {
  return {
   "host.name": "./.name",
   "index.parts": `./portfolio.parts`,
   "style.css": `./portfolio.css`,
   "onresize.fn": `./grid-snap.fn`,
   "selected-part.name": `data:,ejaugust.com`,
   "part-list-scroll-y.number": "data:text/json,0",
   "example-viewer-scroll-y.number": "data:text/json,0"
  }
 },
 get "core-address.part"() {
  return {
   "index.htm": `./core-address.htm`,
   "style.css": `./core-address.css`
  }
 },
 get "part-list-item.part"() {
  return {
   "index.parts": `./part-list-item.parts`,
   "onclick.fn": `./select-part.fn`,
   "style.css": `./part-list-item.css`
  }
 },
 get "orenjinari.com.part"() {
  return {
   "host.name": "./.name",
   "index.parts": `./orenjinari.com.parts`,
   "style.css": `./orenjinari.com.css`,
   "portfolio-scroll-y.number": "data:text/json,0"
  }
 },
 get "example-viewer.part"() {
  return {
   "title.txt": "data:,Examples",
   "index.parts": `./example-viewer.parts`,
   "onscroll.fn": "./scroll-name-y.fn",
   "style.css": `./example-viewer.css`
  }
 },
 get "core-address-usage.part"() {
  return {
   "index.htm": "./core-address-usage.htm",
   "style.css": `./stat.css`
  }
 },
 get "back-button.part"() {
  return {
   "index.htm": `data:text/html,‹`,
   "style.css": `./unicode-button.css`,
   "onclick.fn": `./deselect-part.fn`
  }
 },

 get "set.fn"() {
  return metaPatch => {
   const patch = this["patch.part"],
    part = this[this[".name"] + ".part"],
    delta = {}

   for (const name in metaPatch) {
    if (metaPatch[name] === patch[name] || (!(name in patch) && metaPatch[name] === part[name])) continue
    if (metaPatch[name] !== part[name]) {
     if (metaPatch[name] === undefined) {
      delete patch[name]
      delta[name] = part[name]
     } else delta[name] = patch[name] = metaPatch[name]
    } else if (patch[name]) {
     delete patch[name]
     if (part[name]) delta[name] = part[name]
     else delete this[name]
    }
   }

   if (!Object.keys(delta).length) return

   Object.defineProperties(this, this["describe-part.fn"](delta))

   this["signal.fn"]()

   if (this === Core) {
    if (history._timeout) clearTimeout(history._timeout)
    history._timeout = setTimeout(() => history.replaceState({}, null, `https://dev.` + this["patch.uri"]), 120)
   }
  }
 },
 get "boot.fn"() {
  return () => {
   Object.setPrototypeOf(this, null)
   this["become.fn"](this["url2part.fn"](location))
   if (typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope) {
    oninstall = () => globalThis.skipWaiting()
    onactivate = onmessage = () => clients.claim()
    onfetch = e => e.respondWith(this["fetch.fn"](e.request.url))
   } else {
    if (location.pathname !== "/")
     throw new RangeError(`Boot does not support seeking yet.\n Location: ${location}\n Pathname: ${location.pathname}`)
    Promise.all([
     (async () => {
      const registration = await navigator.serviceWorker.register(location.origin + "/script.js"),
       { waiting: w, installing: i, active: a } = registration
      if (!a)
       await new Promise(
        resolve => ((w ?? i).onstatechange = ({ target: t }) => (t.state === "activated" ? resolve(t) : 0))
       )
      return registration
     })(),
     new Promise(resolve => (onload = resolve))
    ]).then(([registration]) => {
     if (location.host.startsWith("dev.")) {
      document.onvisibilitychange = () => document.hidden || registration.update()
      window.onfocus = () => registration.update()
     }

     const manifest = document.querySelector('[rel="manifest"]'),
      original = !manifest.href,
      server = navigator.serviceWorker.controller,
      forceRefreshed = !server,
      begin = () => {
       if (original) manifest.href = this["manifest.uri"]
       this["signal.fn"]()
      }

     let waiting

     navigator.serviceWorker.oncontrollerchange = () => {
      if (waiting) {
       waiting = false
       begin()
       return
      }

      location.reload()
     }

     if (forceRefreshed) {
      waiting = true
      registration.active.postMessage(1)
     } else begin()
    })
   }
  }
 },
 get "fetch.fn"() {
  return url => {
   const path = new URL(url).pathname
   if (path.includes("/", 1)) throw new RangeError(`Fetch event does not support directories yet.\n\tRequest: ${url}`)
   const object = this["branch.fn"](this["url2part.fn"](url))
   return object["respond.fn"](path.slice(1))
  }
 },
 get "reset.fn"() {
  return () => {
   location = location.origin
  }
 },
 get "signal.fn"() {
  return () => {
   const node = this[".node"]
   if (this["depth.number"] > 20) {
    console.error("too deep to send signal", this["trace.txt"])
    return
   } // debug only

   if (!node || node instanceof Text) {
    if (node.innerHTML != this["index.htm"]) node.innerHTML = this["index.htm"]
    return
   }

   if (this["index.htm"] === undefined) {
    const incomingParts = this["index.parts"] ?? []

    if (!(incomingParts && Array.isArray(incomingParts)))
     throw new Error(`Cannot use parts file of type ${typeof incomingParts}.\n${incomingParts}${this["trace.txt"]}`)

    const { childNodes } = node,
     max = 250

    let i = -1

    while (incomingParts.length) {
     i++

     if (i >= max) throw "∞ loop"

     const incomingPart = incomingParts.shift(),
      incomingURI = this["part2url.fn"](incomingPart),
      existingURI = childNodes[i]?.object["patch.uri"]

     if (!incomingPart) throw new Error(`No name on node.\n\t[${this["index.parts"]}].${this["trace.txt"]}`)

     if (incomingURI === existingURI) continue

     const existingIndex = [...childNodes].findIndex((n, o) => o > i && n.object["patch.uri"] === incomingURI)

     if (existingIndex !== -1) {
      node.insertBefore(childNodes[existingIndex], childNodes[i])
      continue
     }

     const object = this["branch.fn"](incomingPart),
      childNode = object[".node"]

     if (!node) throw new Error(`Create Node Error: this object doesn't have a node.${this["trace.txt"]}`)

     if (i !== -1 && i < childNodes.length) node.insertBefore(childNode, childNodes[i])
     else node.appendChild(childNode)

     childNode.callback?.()
    }

    while (childNodes[i + 1]) childNodes[i + 1].object["remove.fn"]()
   } else if (node.innerHTML != this["index.htm"]) node.innerHTML = this["index.htm"]

   this["forEach.fn"](object => object["signal.fn"]())

   const style = this["style.css"]

   if (style !== undefined) {
    const query = this["query.txt"]
    this[".sheet"].replaceSync(
     this["style.css"].replaceAll(/:host\(([^)]+)\)/g, query + "$1").replaceAll(":host", query)
    )
   }
  }
 },
 get "branch.fn"() {
  return part => {
   return Object.create(this)["become.fn"](part)
  }
 },
 get "become.fn"() {
  return patch => {
   const nameHREF = patch[".name"]

   if (!nameHREF)
    throw new Error(`Can't become an object without a .name in patch.\n${JSON.stringify(patch)}${this["trace.txt"]}`)

   const requestName = this["checkout-cell.fn"](nameHREF),
    finalName = (requestName + ".part" in this ? requestName : "error404") + ".part"

   return Object.defineProperties(this, {
    "patch.part": {
     get() {
      return patch
     }
    },
    ...this["describe-part.fn"](this["universal.part"]),
    ...this["describe-part.fn"](this[finalName]),
    ...this["describe-part.fn"](patch)
   })
  }
 },
 get "remove.fn"() {
  return () => {
   this["forEach.fn"](object => object["remove.fn"]())
   const { ".sheet": sheet, ".sheets": sheets } = this,
    index = sheets.findIndex(_ => _ === sheet)
   sheets.splice(index, 1)
   this[".node"].remove()
  }
 },
 get "forEach.fn"() {
  return callback => {
   for (const node of [...this[".node"].childNodes]) if (node.object) callback(node.object)
  }
 },
 get "forChain.fn"() {
  return callback => {
   let object = this,
    index = 0

   while (object) {
    callback(object, index++)
    if (object["core.object"] === object) break
    object = Object.getPrototypeOf(object)
   }
  }
 },
 get "url2part.fn"() {
  return url => {
   url = new URL(url)
   return Object.fromEntries([
    ...(url.searchParams?.entries() ?? []),
    [".name", `data:,${url.host.slice(url.host.startsWith("dev.") ? 4 : 0)}`]
   ])
  }
 },
 get "part2url.fn"() {
  return part => {
   let name

   if (typeof part === "string") {
    const inputname = part
    part = this[inputname + ".part"]
    if (!part) throw new RangeError("Missing part." + this["trace.txt"])
    name = ".name" in part ? this["checkout-cell.fn"](part[".name"]) : inputname
   } else {
    if (!(".name" in part))
     throw new Error(`Can't generate url of a part without .name in it.\n${JSON.stringify(part)}${this["trace.txt"]}`)
    name = this["checkout-cell.fn"](part[".name"])
   }

   let search = []

   for (const key in part) {
    if (key === ".name") continue
    search.push(key + (part[key] ? "=" + part[key] : ""))
   }

   return name + (search.length ? "?" + search.join("&") : "")
  }
 },
 get "grid-snap.fn"() {
  return entry => {
   const {
     borderBoxSize: [{ blockSize: height, inlineSize: width }]
    } = entry,
    tileSize = 14,
    trueTilesWide = width / tileSize,
    trueTilesHigh = height / tileSize,
    roundedTilesWide = Math.round(trueTilesWide),
    roundedTilesHigh = Math.round(trueTilesHigh),
    xFactor = trueTilesWide / roundedTilesWide,
    yFactor = trueTilesHigh / roundedTilesHigh,
    tileWidth = xFactor * tileSize,
    tileHeight = yFactor * tileSize

   Object.defineProperties(this, {
    "tile-width.number": {
     get() {
      return tileWidth
     },
     configurable: true
    },
    "tile-height.number": {
     get() {
      return tileHeight
     },
     configurable: true
    }
   })

   this["signal.fn"]()
  }
 },
 get "reduceChain.fn"() {
  return (callback, value) => {
   this["forChain.fn"]((object, index) => (value = callback(value, object, index)))
   return value
  }
 },
 get "shade-theme.fn"() {
  return (addend = 0.1) =>
   "#" +
   this["theme.color"]
    .match(/[^#]{2}/g)
    .map(s => Math.trunc((1 - (1 - parseInt(s, 16) / 255) * (1 - addend)) * 255).toString(16))
    .join("")
 },
 get "select-part.fn"() {
  return () => {
   this["core.object"]["set.fn"]({
    "selected-part.name": `data:,${this["selected-part.name"]}`
   })
  }
 },
 get "literal-cell.fn"() {
  return href => {
   const commaIndex = href.indexOf(","),
    datum = href.slice(commaIndex + 1),
    header = href.slice(5, commaIndex).split(";"),
    type = header.shift() || "text/plain",
    body = type === "text/json" ? JSON.parse(datum) : type === "text/getter" ? new Function(datum).apply(this) : datum

   return body
  }
 },
 get "checkout-cell.fn"() {
  return href => {
   const cellType = href.startsWith("data:") ? "literal" : href.startsWith("https://") ? "absolute" : "relative"
   return this[cellType + "-cell.fn"](href)
  }
 },
 get "absolute-cell.fn"() {
  return href => {
   const subpaths = href.slice(8).split("/"),
    key = subpaths.pop()

   if (!key)
    throw new RangeError(
     `Error: absolute cell reference must include a file name. Get reference to entire object not yet supported.\n (adding ${href})${this["trace.txt"]}`
    )

   let object = this["core.object"]

   for (const subpath of subpaths) object = object["branch.fn"]({ ".name": `data:,${subpath}` })

   return object[key]
  }
 },
 get "relative-cell.fn"() {
  return href => {
   let levels = 1,
    subname = href
   if (subname.startsWith("./")) {
    subname = subname.slice(2)
    levels = 0
   } else
    while (subname.startsWith("../")) {
     subname = subname.slice(3)
     levels++
    }
   const core = this["core.object"]
   let object = this
   for (let i = 0; i < levels; i++) {
    if (object === Core)
     throw new RangeError(`Error: reference to parent of Core is not currently supported. ${href}.${this["trace.txt"]}`)
    object = Object.getPrototypeOf(object)
   }
   return object[subname]
  }
 },
 get "scroll-name-x.fn"() {
  return () => {
   this["core.object"]["set.fn"]({
    [`${this[".name"]}-scroll-x.number`]: `data:text/json,${this["scroll-out-x.number"]}`
   })
  }
 },
 get "scroll-name-y.fn"() {
  return () => {
   this["core.object"]["set.fn"]({
    [`${this[".name"]}-scroll-y.number`]: `data:text/json,${this["scroll-out-y.number"]}`
   })
  }
 },
 get "describe-part.fn"() {
  return part => {
   const description = {},
    self = this

   for (const name in part) {
    const href = part[name]

    if (!href) throw new Error("missing href for part value." + this["trace.txt"])

    description[name] = {
     get() {
      return self["checkout-cell.fn"](href)
     },
     configurable: true,
     enumerable: true
    }
   }

   return description
  }
 },
 get "capture-resize.fn"() {
  return entry => {
   const {
    borderBoxSize: [{ blockSize, inlineSize }]
   } = entry

   Object.defineProperties(this, {
    "resize-width.number": {
     get() {
      return inlineSize
     },
     configurable: true
    },
    "resize-height.number": {
     get() {
      return blockSize
     },
     configurable: true
    }
   })

   this["signal.fn"]()
  }
 },
 get "toggle-start-menu.fn"() {
  return () =>
   this["core.object"]["set.fn"]({
    "start-menu.bool": "./" + !this["core.object"]["start-menu.bool"] + ".bool"
   })
 },
 get "deselect-part.fn"() {
  return () => {
   this["core.object"]["set.fn"]({ "selected-part.name": "data:text/getter," })
  }
 },

 get "os.css"() {
  return `:host {
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   box-sizing: border-box;
   height: 100%;
   margin: 0;
   display: grid;
   grid-template-rows: 1fr ${this["branch.fn"]({ ".name": "data:,taskbar" })["height.number"]};
   font: 11px / 16px sans-serif;
  }`
 },
 get "stat.css"() {
  return `:host {
   text-overflow: ellipsis;
   white-space: nowrap;
   overflow: hidden;
   ${this["pill-icon-right.bool"] ? "text-align: right;" : ""}
   display: inline-block;
   line-height: 24px;
   padding: 3px;
   background: ${this["theme.color"]};
   padding-${this["pill-icon-right.bool"] ? "left" : "right"}: 12px;
  }`
 },
 get "title.css"() {
  return `:host {
   margin: 0;
   display: block;
   font-weight: 600;
   padding: 4px;
   text-transform: uppercase;
   background: ${this["theme.color"]};
  }`
 },
 get "empty.css"() {
  return `:host {
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   font-size: ${this["resize-width.number"]}px;
   line-height: ${this["resize-height.number"]}px;
   text-align: center;
   background: ${this["theme.color"]};
   opacity: 25%;
  }`
 },
 get "shelf.css"() {
  return `:host {
   display: flex;
   flex-flow: row;
   gap: 4px;
   padding: ${this["padding.number"]}px;
   background: ${this["shade-theme.fn"]()};
  }`
 },
 get "status.css"() {
  return `:host {
   display: flex;
   flex-flow: row;
   background: ${this["shade-theme.fn"](0.2)};
  }`
 },
 get "header.css"() {
  return `:host {
   justify-content: space-between;
   display: flex;
   flex-flow: row;
   margin: 16px;
  }`
 },
 get "error404.css"() {
  return `:host {
   background: tomato;
   box-sizing: border-box;
   border: 0.5px dashed #821;
  }`
 },
 get "portfolio.css"() {
  return `:host {
   --w: ${this["tile-width.number"] ?? 14}px;
   --h: ${this["tile-height.number"] ?? 14}px;
   box-sizing: border-box;
   gap: var(--h);
   padding: calc(var(--w) * 4.5) calc(var(--h) * 4.5);
   display: flex;
   flex-flow: row;
   align-items: stretch;
   background: url(data:image/png;base64,${this["blue-grid.png"]}), #999AAB;
   background-size: calc(var(--w) * 10) calc(var(--h) * 10);
   transition: background-size 0.2s;
   transform: scale(50%)
  }
  :host::before {
   box-shadow: 2px 4px 10px #0005;
   border-radius: 14px;
   content: "";
   background: url(data:image/png;base64,${this["blue-grid.png"]}), white;
   background-size: inherit;
   position: absolute;
   left: calc(1.5 * var(--w));
   right: calc(1.5 * var(--w));
   top: calc(1.5 * var(--h));
   bottom: calc(1.5 * var(--h));
  }
  :host > core-parts,
  :host > pilot-parts,
  :host > orenjinari-com {
   position: relative;
   width: calc(var(--w) * 40);
   height: calc(var(--h) * 30);
   border-radius: 7px;
   overflow: hidden;
  }`
 },
 get "core.parts.css"() {
  const topRow = this["selected-part.name"]
   ? `"shelf" ${this[".node"].querySelector(`shelf-`).object["height.number"]}px`
   : ""
  return `:host {
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
   background: ${this["theme.color"]};
   font: 13px var(--system-ui);
   margin: 0;
   overflow: hidden;
   padding: 0;
   display: grid;
   color: white;
   grid-template:
    ${topRow}
    "main" 1fr
    ${this["selected-part.name"] ? `"status" 32px` : ``} / 100%;
   }
   ${this["selected-part.name"] ? `:host > shelf- { grid-area: shelf }` : ""}
   :host > status- {
    grid-area: status
   }

   :host > example-viewer,
   :host > part-explorer {
    grid-area: main;
   }`
 },
 get "start-menu.css"() {
  return `:host {
   position: relative;
   min-width: 164px;
   display: flex;
   flex-flow: column;
   position: absolute;
   left: 2px;
   bottom: calc(${this["branch.fn"]({ ".name": "data:,taskbar" })["height.number"]} - 4px);
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
  }`
 },
 get "flex-spacer.css"() {
  return `:host {
   flex: 1 1
  }`
 },
 get "test-canvas.css"() {
  const { width, height } = this["size.json"] ?? {},
   standardHeight = Math.min(256, height),
   aspect = width / height,
   scale = standardHeight / height

  return `:host {
   box-sizing: border-box;
   background: ${this["shade-theme.fn"](0.6)};
   position: absolute;
   width: ${width}px;
   height: ${height}px;
   transform-origin: top left;
   top: 23px;
   transform: scale(${scale});
  }`
 },
 get "start-button.css"() {
  const colors1 = ["white", "black"],
   colors2 = ["#dbdbdb", "#7a7a7a"]
  if (this["start-menu.bool"]) {
   colors1.reverse()
   colors2.reverse()
  }
  return `

  :host {
   flex: 0 0;
   position: relative;
   width: 100%;
   box-sizing: border-box;
   height: 100%;
   display: flex;
   flex-flow: row;
   gap: 3px;
   border: none;
   font: bold 11px / 16px sans-serif;
   box-sizing: border-box;
   padding: ${this["start-menu.bool"] ? 4 : 3}px 4px 2px;
   text-align: left;
   background: #c3c3c3;
   box-shadow:
    inset -1px -1px ${colors1.pop()},
    inset 1px 1px ${colors1.pop()},
    inset -2px -2px ${colors2.pop()},
    inset 2px 2px ${colors2.pop()};
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

  :host > icon- {
   width: 16px;
   height: 16px;
   background: url(data:image/png;base64,${this["icon.png"]});
   background-size: 16px;
  }`
 },
 get "mini-browser.css"() {
  const { width, height } = this["size.json"] ?? {},
   standardHeight = Math.min(256, height),
   aspect = width / height,
   scaledWidth = standardHeight * aspect

  return `:host {
   border-radius: 8px;
   display: flex;
   flex-flow: column;
   position: relative;
   overflow: clip;
   box-shadow:
    inset 0 0 0 1px ${this["theme.color"]},
    2px 4px 9px -2px ${this["theme.color"]};
   flex: 0 0 ${scaledWidth}px;
   height: ${standardHeight + 23}px;
  }`
 },
 get "core-address.css"() {
  return this["stat.css"] + this["flex-spacer.css"]
 },
 get "orenjinari.com.css"() {
  return `:host {
    display: grid;
    grid-template:
     "sp1 sp1 sp1 sp1 sp1" 1fr
     "sp2 art art art sp3" max(min(40%, 240px), 128px)
     "sp2 re1 re2 re3 sp3" max(min(20%, 96px), 36px)
     "sp2 sp4 sp4 sp4 sp3" 2fr / 1fr max(min(25%, 240px), 64px)  max(min(25%, 240px), 64px)  max(min(25%, 240px), 64px) 1fr;
    background: #dadbca;
    width: 100%;
    height: 100%;
    pad: 24px;
   }

   nari-artwork {
    grid-area: art;
   }

   nari-recent:nth-of-type(1) {
    grid-area: re1;
   }

   nari-recent:nth-of-type(2) {
    grid-area: re2;
   }

   nari-recent:nth-of-type(3) {
    grid-area: re3;
   }`
 },
 get "unicode-button.css"() {
  return `:host {
   cursor: pointer;
   border-radius: 4px;
   line-height: 32px;
   width: 32px;
   font-size: 32px;
   aspect-ratio: 1 / 1;
   height: 32px;
   text-align: center;
  }

  :host(:hover) {
   background: ${this["shade-theme.fn"](0.2)};
  }`
 },
 get "part-list-item.css"() {
  return `:host {
   position: relative;
   cursor: pointer;
   text-overflow: ellipsis;
   white-space: nowrap;
   overflow: hidden;
   line-height: 24px;
   box-sizing: border-box;
   justify-content: space-between;
   border-radius: 8px;
   flex: 0 0 40px;
   display: flex;
   padding: 8px;
  }

  :host${this["core.object"]["selected-part.name"] === this["selected-part.name"] ? "" : "(:hover)"} {
   background: ${this["shade-theme.fn"](0.3)};
  }`
 },
 get "example-viewer.css"() {
  return `:host {
   display: flex;
   flex-flow: row wrap;
   align-content: start;
   gap: 16px;
   padding: 16px;
   overflow: hidden;
   position: relative;
   overflow-y: auto;
   align-items: start;
   background: ${this["theme.color"]};
  }

  :host > title- {
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
  }`
 },

 get "os.parts"() {
  return [
   { ".name": "data:,desktop" },
   { ".name": "data:,taskbar" },
   ...(this["windows.parts"] ?? []),
   ...(this["start-menu.bool"] ? [{ ".name": `data:,start-menu` }] : []),
   ...(this["context-menu.bool"] ? [{ ".name": `data:,context-menu` }] : [])
  ]
 },
 get "tray.parts"() {
  return [{ ".name": "data:,factory-reset" }, { ".name": "data:,fullscreen" }, { ".name": "data:,clock" }]
 },
 get "empty.parts"() {
  return [{ ".name": "data:,empty-icon" }]
 },
 get "shelf.parts"() {
  return [
   { ".name": "data:,back-button" },
   {
    ".name": "data:,title",
    "title.txt": "./selected-part.name",
    "title.css": `data:text/css,:host {
     background: transparent;
     line-height: ${this["height.number"] - 2 * this["padding.number"]}px;
     display: block;
     font-weight: 200;
     font-size: 24px;
    }`
   },
   { ".name": "data:,flex-spacer" },
   { ".name": "data:,reset-button" }
  ]
 },
 get "status.parts"() {
  return [{ ".name": "data:,core-address-usage" }, { ".name": "data:,core-address" }, { ".name": "data:,version" }]
 },
 get "header.parts"() {
  return [
   { ".name": "data:,text", "content.txt": "data:,Parts" },
   { ".name": "data:,search" },
   { ".name": "data:,add-part" }
  ]
 },
 get "taskbar.parts"() {
  return [
   { ".name": "data:,start-button" },
   ...(this["apps.parts"] ?? []),
   { ".name": "data:,flex-spacer" },
   { ".name": "data:,tray" }
  ]
 },
 get "portfolio.parts"() {
  return [
   {
    ".name": "data:,core.parts",
    "selected-part.name": "selected-part.name",
    "part-list-scroll-y.number": "part-list-scroll-y.number",
    "example-viewer-scroll-y.number": "example-viewer-scroll-y.number"
   },
   { ".name": "data:text/name,pilot.parts" },
   { ".name": "data:text/name,orenjinari.com" }
  ]
 },
 get "part-list.parts"() {
  const makeItem = name => ({ ".name": "data:,part-list-item", "selected-part.name": `data:,${name}` }),
   propertyEntries = Object.entries(this["core.object"][".properties"]),
   reducer = (parts, [name]) => {
    if (name.endsWith(".part")) parts.push(makeItem(name.slice(0, -5)))

    return parts
   }
  return propertyEntries.reduce(reducer, [])
 },
 get "start-menu.parts"() {
  return [
   { ".name": "data:text/name,locate" },
   { ".name": "data:text/name,relate" },
   { ".name": "data:text/name,debate" },
   { ".name": "data:text/name,horizontal-line-1" },
   { ".name": "data:text/name,welcome" },
   { ".name": "data:text/name,horizontal-line-2" },
   { ".name": "data:text/name,save-computer" },
   { ".name": "data:text/name,restart-computer" },
   { ".name": "data:text/name,restart-server" }
  ]
 },
 get "core.parts.parts"() {
  return this["selected-part.name"]
   ? [{ ".name": "data:,shelf" }, { ".name": "data:,example-viewer" }, { ".name": "data:,status" }]
   : [{ ".name": "data:,header" }, { ".name": "data:,part-list" }]
 },
 get "mini-browser.parts"() {
  return [{ ".name": "data:,title" }, { ".name": "data:,test-canvas", "index.parts": "./input.parts" }]
 },
 get "part-list-item.parts"() {
  return [
   { ".name": `data:,text`, "content.txt": `data:,${this["selected-part.name"]}` },
   { ".name": "data:,flex-spacer" },
   {
    ".name": `data:,text`,
    "content.txt": `data:text/html,${this["part2url.fn"](this["selected-part.name"]).length}ch`
   }
  ]
 },
 get "example-viewer.parts"() {
  const selectedPart = { ".name": `data:,${this["selected-part.name"]}` },
   selectedObject = this["core.object"]["branch.fn"](selectedPart)

  return [
   {
    ".name": "data:,mini-browser",
    "title.txt": "data:,Default",
    "input.parts": `data:text/json,${JSON.stringify([selectedPart])}`
   },
   ...Object.entries(selectedObject[".examples"] ?? {}).map(([name, [part, size]]) => ({
    ".name": "data:,mini-browser",
    "title.txt": `data:,${name}`,
    ...(size ? { "size.json": `data:text/json,${JSON.stringify(size)}` } : {}),
    "input.parts": `data:text/json,${JSON.stringify([part])}`
   }))
  ]
 },
 get "orenjinari.com.parts"() {
  return [
   { ".name": "data:,nari-artwork" },
   { ".name": "data:,nari-recent", "index.number": "data:text/json,0" },
   { ".name": "data:,nari-recent", "index.number": "data:text/json,1" },
   { ".name": "data:,nari-recent", "index.number": "data:text/json,2" }
  ]
 },

 get "depth.number"() {
  return (Object.getPrototypeOf(this)?.["depth.number"] ?? 0) + 1
 },
 get "version.number"() {
  return 59 / 1000
 },
 get "scroll-out-x.number"() {
  return this[".node"].scrollLeft
 },
 get "scroll-out-y.number"() {
  return this[".node"].scrollTop
 },
 get "chain-length.number"() {
  return this["reduceChain.fn"](k => k++, 0)
 },
 get "core-address-size.number"() {
  return this["core.object"]["patch.uri"].length
 },
 get "core-address-usage.number"() {
  return ("https://" + this["core.object"]["patch.uri"]).length / 20.48
 },

 get "title.htm"() {
  return `${this["title.txt"] ?? "Untitled"}`
 },
 get "bootstrap.htm"() {
  return `<!DOCTYPE html>\n<meta name="robots" content="noindex">\n<link rel="manifest">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<style>\n html,\n body {\n  overscroll-behavior-y: contain !important;\n  overflow: clip;\n  height: 100%;\n  margin: 0;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n }\n</style>\n<script src="https://${this["host.name"]}/script.js"></script>`
 },
 get "error404.htm"() {
  return `404`
 },
 get "core-address.htm"() {
  return this["core.object"]["patch.uri"]
 },
 get "core-address-usage.htm"() {
  return Math.trunc(this["core-address-usage.number"]) + " %"
 },

 get "time.txt"() {
  setTimeout(() => this["signal.fn"](), 60005 - (Date.now() % 60000))
  return new Date().toLocaleString("en-US", {
   hour: "numeric",
   minute: "numeric",
   hourCycle: "h12"
  })
 },
 get "trace.txt"() {
  return this["reduceChain.fn"]((t, r) => t + `\n\tat ${r["patch.uri"]}`, "")
 },
 get "query.txt"() {
  const css = this["reduceChain.fn"](
   (t, r, i) => (
    t.unshift(
     r === this["core.object"]
      ? r[".node"].hasAttribute("id")
        ? "#" + r[".node"].getAttribute("id")
        : "body"
      : r[".tag"]
    ),
    t
   ),
   []
  ).join(" > ")
  return css
 },

 get "true.bool"() {
  return true
 },
 get "false.bool"() {
  return false
 },

 get "core.object"() {
  return Core
 },

 get ".sheets"() {
  return this["core.root"].adoptedStyleSheets
 },

 get "patch.uri"() {
  return this["part2url.fn"]("patch")
 },
 get "manifest.uri"() {
  return `https://${location.host}/manifest.json`
 },

 get "icon.png"() {
  return "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"
 },
 get "favicon.ico"() {
  return this["icon.png"]
 },
 get "blue-grid.png"() {
  return "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"
 },

 get ".properties"() {
  return Object.getOwnPropertyDescriptors(this)
 },
 get "deep.properties"() {
  return this["reduceChain.fn"]((allproperties, object) => {
   const objectProperties = object[".properties"]

   for (const filename in objectProperties)
    if (!(filename in allproperties)) allproperties[filename] = objectProperties[filename]

   return allproperties
  }, {})
 },

 get "core.root"() {
  return document
 },

 get "auto.node"() {
  let node

  if (this === Core) node = document.body
  else {
   const tag = this[".tag"]
   if (tag === "#text") node = document.createTextNode(this["index.htm"] ?? "")
   else node = document.createElement(tag)
  }

  Object.defineProperty(this, ".node", {
   get() {
    return node
   }
  })

  node.object = this
  node.onclick = this["onclick.fn"]
  node.onscroll = this["onscroll.fn"]
  node.onpointerdown = this["onpointerdown.fn"]

  for (const [name, value] of Object.entries(this[".attributes"] ?? {})) node.setAttribute(name, value)

  if (this["onresize.fn"] || this["onscroll.fn"]) {
   let scroll = !!this["onscroll.fn"]
   new ResizeObserver(e => {
    if (scroll) {
     scroll = false
     node.scrollTo(this[this[".name"] + "-scroll-x.number"] ?? 0, this[this[".name"] + "-scroll-y.number"] ?? 0)
    }

    let timeout = this["core.object"]["timeout.number"]
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => this["onresize.fn"]?.(e[0]), 75)
    Object.defineProperty(this["core.object"], "timeout.number", {
     get() {
      return timeout
     },
     configurable: true
    })
   }).observe(node)
  }
  return node
 },

 get "auto.sheet"() {
  const stylesheet = new CSSStyleSheet()

  Object.defineProperty(this, ".sheet", {
   get() {
    return stylesheet
   }
  })
  stylesheet.object = this
  this[".sheets"].push(stylesheet)
  return stylesheet
 },

 get "toTag.fn"() {
  return name => {
   name = name.replaceAll(/[^a-zA-Z0-9]+/g, "-")
   if (!name.includes("-")) name += "-"
   return name
  }
 },

 get "name.tag"() {
  if (!this[".name"]) console.warn("before creating the name?", this["selected-part.name"])
  return this["toTag.fn"](this[".name"])
 },

 get "script.js"() {
  const prefix = "const Core = {\n ",
   suffix = '\n}\nCore["boot.fn"]()\n',
   inside = Object.values(this["core.object"][".properties"])
    .map(_ => _.get)
    .join(",\n ")

  return prefix + inside + suffix
 },

 get "respond.fn"() {
  return filename => {
   const encoder = new TextEncoder()
   let body, type

   if (filename in this) {
    const extension = filename.split(".").at(-1),
     string = this[filename]
    body = encoder.encode(string)
    type =
     {
      ico: "image/ico",
      png: "image/png",
      js: "text/javascript; charset=UTF-8",
      css: "text/css; charset=UTF-8",
      htm: "text/html; charset=UTF-8",
      html: "text/html; charset=UTF-8"
     }[extension] ?? "text/plain; charset=UTF-8"
    if (extension === "png" || extension === "ico") {
     const B = atob(string),
      k = B.length,
      A = new ArrayBuffer(k),
      I = new Uint8Array(A)
     for (var i = 0; i < k; i++) I[i] = B.charCodeAt(i)
     body = new Blob([I], { type })
    }
   } else {
    body = encoder.encode(this["core.object"]["bootstrap.htm"])
    type = "text/html; charset=UTF-8"
   }
   return new Response(body, {
    headers: {
     "content-type": type,
     "expires": "Sun, 20 Jul 1969 20:17:00 UTC",
     "server": "kireji"
    }
   })
  }
 },

 get "theme.color"() {
  return `#333445`
 },

 get "manifest.json"() {
  return JSON.stringify({
   name: this["core.object"][".name"].split(".")[0],
   short_name: this["core.object"][".name"],
   start_url: ".",
   display: "standalone",
   background_color: this["theme.color"],
   theme_color: this["theme.color"],
   description: "An expirimental app.",
   icons: [
    {
     src: "icon.png",
     sizes: "144x144",
     type: "image/png"
    }
   ]
  })
 }
}
Core["boot.fn"]()
