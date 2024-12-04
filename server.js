/*----------------------------------------------------------*\
 *  © 2013 - 2024 Eric Augustinowicz and Kristina Soriano.  *
 *  All Rights Reserved.                                    *
 *  0.54.12-release                                         *
\*----------------------------------------------------------*/

;(C = {
 "host-size.number": {
  get() {
   return HOST[".rid"].length
  },
 },
 "dev.bool": {
  get() {
   return location.host.startsWith("dev.")
  },
 },
 "sidebar-width.number": {
  get() {
   return 42
  },
 },
 "branch-length.number": {
  get() {
   let row = this,
    count = 0
   while (row) {
    count++
    row = Object.getPrototypeOf(row)
   }
   return count
  },
 },
 "scroll-y.number": {
  get() {
   return this[".node"].scrollTop
  },
 },

 "boot.fn": {
  get() {
   return () => {
    globalThis.TAPE = []
    globalThis.BOOT_TIME = Date.now()
    globalThis.NODES = new Map()
    globalThis.ROW = Object.create(null, Object.assign({ ...C }, C["default.columns"].get(), { ".rid": { value: "root" } }))
    if (!location.search)
     globalThis.history?.replaceState({}, null, location.origin + "/?inspector.bool=true.bool&selection.rid=data:," + location.host.slice(4 * location.host.startsWith("dev.")))
    globalThis.HOST = ROW["branch.fn"]("error" + location.search, {
     ".node": {
      get() {
       return this["auto.node"]
      },
      configurable: true,
     },
    })
    HOST["install.fn"]()
   }
  },
 },
 "fetch.fn": {
  get() {
   return (url, event) => {
    const { host, pathname } = new URL(url),
     names = ("error" + pathname).split("/")
    let row = ROW
    for (const name of names) row = row["branch.fn"](name)
    event.respondWith(row[".response"])
   }
  },
 },
 "install.fn": {
  get() {
   return this[(this["server.bool"] ? "server" : "client") + ".fn"]
  },
 },
 "ownNode.fn": {
  get() {
   return incomingNode => {
    if (NODES.has(this)) {
     if (incomingNode) throw new Error(`Own Node Error: this row already owns a node.\n\tNode Path: "${this[".path"]}"`)

     return NODES.get(this)
    }

    const node = incomingNode ?? document.createElement(this[".tag"])

    NODES.set(this, node)

    node.row = this
    node.onclick = this["onclick.fn"]
    node.onscroll = this["onscroll.fn"]
    node.onpointerdown = this["onpointerdown.fn"]

    const search = Object.entries(this["workingTree.commit"])
     .map(e => e.join("="))
     .join("&")

    if (!search) node.removeAttribute("data-search")
    else node.setAttribute("data-search", search)

    let timeout

    if (this["tabindex.number"]) node.tabIndex = this["tabindex.number"]

    if (this["onresize.fn"] || this["scroll.number"])
     new ResizeObserver(e => {
      if (timeout) clearTimeout(timeout)

      timeout = setTimeout(() => {
       this["onresize.fn"](e[0])
      }, 75)
     }).observe(node)

    try {
     node.attachShadow({ mode: "open" })
    } catch (e) {
     throw new Error(`Own Node Error: this native tag can't support a shadow DOM.\n\tNode Tag: <${this[".tag"]}>.\n\tNode Path: "${this[".path"]}"\n\tNative Error: ${e.message}`)
    }

    return node
   }
  },
 },
 "signal.fn": {
  get() {
   return () => {
    this["checkout.fn"]()

    if (this["server.bool"]) throw new Error("Server Error: signal called in server. " + this[".path"])

    if (this["view.stylesheet"] !== null) this["view.stylesheet"].replaceSync(this["layout.css"])

    if (this[".node"] === undefined) {
     throw "here " + this[".rid"]
    }
    if (this[".node"] !== null) {
     const { shadowRoot } = this[".node"]

     layouts: {
      const rawCSS = this[".css"],
       stylesheets = shadowRoot.adoptedStyleSheets,
       existingSheets = [...stylesheets],
       existingSheetRows = existingSheets.map(sheet => sheet.row)
      if (rawCSS !== null) {
       let singleSheet = existingSheets[0]
       if (existingSheetRows.length !== 1 || singleSheet.row) {
        for (const existingSheetRow of existingSheetRows) {
         existingSheetRow?.["remove.fn"]()
         stylesheets.pop()
        }
        singleSheet = new CSSStyleSheet()
        stylesheets.push(singleSheet)
       }
       singleSheet.replaceSync(rawCSS)
      } else {
       const incomingSheetNames = this[".layout"]
       let i = -1
       while (existingSheetRows.length && incomingSheetNames.length) {
        i++
        const existingSheetRow = existingSheetRows.shift(),
         existingSheetName = existingSheetRow?.[".name"],
         incomingSheetName = incomingSheetNames.shift()
        if (existingSheetName === incomingSheetName) continue
        const existingIndex = existingSheetRows.findIndex(row => row[".name"] === incomingSheetName)
        let stylesheet
        if (existingIndex === -1) {
         stylesheet = new CSSStyleSheet()
         stylesheet.row = this["branch.fn"](incomingSheetName, { ["view.stylesheet"]: { value: stylesheet, configurable: true } })
        } else {
         const stylesheetIndex = i + existingIndex + 1
         stylesheet = stylesheets[stylesheetIndex]
         stylesheets.splice(stylesheetIndex, 1)
         existingSheetRows.splice(existingIndex, 1)
        }
        stylesheets.splice(i, 0, stylesheet)
        if (incomingSheetNames.some(name => name === existingSheetName)) {
         existingSheetRows.unshift(existingSheetRow)
         continue
        }
        stylesheets.splice(i + 1, 1)
       }
       if (existingSheetRows.length) existingSheetRows.forEach(() => stylesheets.pop())
       else if (incomingSheetNames.length)
        for (const incomingSheetName of incomingSheetNames) {
         const stylesheet = new CSSStyleSheet()
         stylesheet.row = this["branch.fn"](incomingSheetName, { ["view.stylesheet"]: { value: stylesheet, configurable: true } })
         stylesheets.push(stylesheet)
        }
      }
     }

     children: {
      const innerHTML = this[".html"]
      if (innerHTML !== null) {
       if (shadowRoot.innerHTML != innerHTML) shadowRoot.innerHTML = innerHTML
      } else {
       const incomingRIDs = this[".children"],
        incomingManifest = incomingRIDs.join(" "),
        children = shadowRoot.children,
        existingNodes = [...children],
        existingRows = existingNodes.map(node => node.row),
        existingRIDs = existingRows.map(row => row[".rid"]),
        existingManifest = existingRIDs.join(" "),
        createNode = (name, index = -1) => {
         if (!name) throw new Error(`Create Node failed. No name on node.\n\t${JSON.stringify(this[".children"])}\n\ton [${this[".path"]}]`)
         const row = this["branch.fn"](name),
          node = row[".node"]

         if (node === null) throw new Error(`Create Node Error: this row doesn't have a node.\n\tRow Path: ${row[".path"]}`)

         if (index !== -1 && index < children.length) shadowRoot.insertBefore(node, children[index])
         else shadowRoot.appendChild(node)
         node.callback?.()
        },
        removeNode = (pop = false) => {
         const existingRow = existingRows[pop ? "pop" : "shift"](),
          existingNode = existingNodes[pop ? "pop" : "shift"]()
         existingNode.remove()
         existingRow["remove.fn"]()
         if (existingRow["count.int"] === 0) existingRow["remove.fn"]()
        }
       if (existingManifest !== incomingManifest) {
        let i = -1
        while (existingRIDs.length && incomingRIDs.length) {
         i++
         const incomingRID = incomingRIDs.shift(),
          existingRID = existingRIDs.shift()
         if (existingRID !== incomingRID) {
          console.log({ existingRID, incomingRID, i })
          removeNode()
          createNode(incomingRID, i)
         } else {
          existingRows.shift()
          existingNodes.shift()
         }
        }
        existingRIDs.forEach(() => removeNode(1))
        incomingRIDs.forEach((incomingRID, ii) => createNode(incomingRID, i + ii + 1))
       }
      }
     }
    }
    Object.values(this[".rows"]).forEach(row => row["signal.fn"]())
   }
  },
 },

 "server.fn": {
  get() {
   return () => {
    onfetch = e => HOST["fetch.fn"](e.request.url, e)
    onactivate = onmessage = e => clients.claim()
    oninstall = e => globalThis.skipWaiting()
   }
  },
 },
 "index.html": {
  get() {
   return `<!DOCTYPE html>
<link rel=manifest href="${this["manifest.uri"]}"
><meta name=robots content=noindex
><meta name=viewport content="width=device-width,initial-scale=1"
><meta name=copyright content="&copy; 2024 Eric Augustinowicz"
><script defer src="${location.origin}/server.js"
></script><style></style><!-- LOCAL INDEX -->`
  },
 },
 "log.fn": {
  get() {
   return (...args) => console.log(this["prefix.txt"], ...args)
  },
 },
 "client.fn": {
  get() {
   return () => {
    Promise.all([
     (async () => {
      const registration = await navigator.serviceWorker.register(location.origin + "/server.js"),
       { waiting: w, installing: i, active: a } = registration
      if (!a) await new Promise(resolve => ((w ?? i).onstatechange = ({ target: t }) => (t.state === "activated" ? resolve(t) : 0)))
      return registration
     })(),
     new Promise(resolve => (onload = resolve)),
    ]).then(([registration]) => {
     document.head.appendChild(document.createElement("style")).innerHTML = `html, body {
 overscroll-behavior-y: contain !important;
 overflow: clip;
 height: 100%;
 margin: 0;
 -webkit-user-select: none;
 -ms-user-select: none;
 user-select: none;
}`
     const manifest = document.querySelector('[rel="manifest"]'),
      original = !manifest.href,
      server = navigator.serviceWorker.controller,
      forceRefreshed = !server,
      begin = () => {
       this["log.fn"]()

       if (original) manifest.href = HOST["manifest.uri"]

       //let row = ROW["insert.fn"]("twist-base")["insert.fn"]('twist-layer')
       HOST["ownNode.fn"](document.body)
       ROW["signal.fn"]()

       /*
            const loop = () => requestAnimationFrame(() => {
             row = row["insert.fn"]('blank')
             if (row["branch-length.number"] > 100 || row[".path"].length > 2048) {
              row = row["remove.fn"]()
              ROW["signal.fn"]()
              return
             }
             ROW["signal.fn"]()
             loop()
            })
            loop()*/
      }

     let waiting

     navigator.serviceWorker.oncontrollerchange = () => {
      // can only be waiting if there was no controller yet until now
      if (waiting) {
       waiting = false
       begin()
       return
      }
      // can only get here if the controller has changed which can only happen if the server-side script changes.
      location.reload()
     }

     Object.defineProperties(this, {
      "original.bool": { value: original, configurable: true },
      "force-refresh.bool": { value: forceRefreshed, configurable: true },
      ".registration": { value: registration, configurable: true },
     })

     if (forceRefreshed) {
      waiting = true
      registration.active.postMessage(1)
     } else begin()
    })
   }
  },
 },
 "branch.fn": {
  get() {
   return (rid, inputColumns) => {
    if (rid in this[".rows"]) {
     if (inputColumns) {
      const oldRow = this[".rows"][rid]
      delete this[".rows"][rid]
      return oldRow["replaceWith.fn"](rid, inputColumns)
     }

     return this[".rows"][rid]
    }

    const [name, search] = rid.split("?"),
     exists = name + ".commit" in this,
     commitName = (exists ? name : "error404") + ".commit",
     commit = this[commitName],
     workingTree = (search ? search.split("&") : []).reduce((attrs, param) => {
      const [name, href] = param.split("=")
      attrs[name] = href
      return attrs
     }, {}),
     contextColumns = {
      "input.names": { value: Object.keys(inputColumns ?? {}), configurable: true },
      "instance.names": { value: Object.keys(commit), configurable: true },
      ".name": { value: name, configurable: true },
      ".rid": { value: rid, configurable: true },
      ".commit": { value: commit, configurable: true },
      "workingTree.commit": { value: workingTree, configurable: true },
     }

    // if (!exists)
    // console.warn('Warning: 404 on branch ' + name, this)

    const row = (this[".rows"][rid] = Object.create(this, Object.assign(this["default.columns"], inputColumns, contextColumns)))

    for (const name in workingTree) row["attributes.names"].add(name)

    row["checkout.fn"](commit)
    row["checkout.fn"](workingTree)

    return row
   }
  },
 },
 "checkout.fn": {
  get() {
   return commit => {
    const description = {}
    for (const name in commit) {
     const href = commit[name]
     if (href.startsWith("data:")) {
      const commaIndex = href.indexOf(","),
       datum = href.slice(commaIndex + 1),
       header = href.slice(5, commaIndex).split(";"),
       type = header.shift() || "text/plain",
       body = type === "text/json" ? JSON.parse(datum) : datum

      description[name] = {
       get() {
        return body
       },
       configurable: true,
      }
      continue
     }
     if (href.startsWith("https://")) {
      const subpaths = href.slice(8).split("/"),
       host = subpaths.shift() + (HOST[".rid"].split("?")[1] ? "?" + HOST[".rid"].split("?")[1] : ""),
       subname = subpaths.pop()

      if (!subname)
       throw new RangeError(`Error: absolute cell reference must include a file name. Get reference to entire row not yet supported. (on ${this[".path"]}, adding ${href})`)

      description[name] = {
       get() {
        let row = ROW["branch.fn"](host)

        for (const subpath of subpaths) row = row["branch.fn"](subpath)

        return row[subname]
       },
       configurable: true,
      }
      continue
     }
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
     description[name] = {
      get() {
       let row = this
       for (let i = 0; i < levels; i++) {
        row = Object.getPrototypeOf(row)
        if (row === null) throw new RangeError(`Error: relative reference to row which is beyond ROW ${href})`)
       }
       let result
       result = row[subname]
       return result
      },
      configurable: true,
     }
    }
    Object.defineProperties(this, description)
   }
  },
 },
 "donate.fn": {
  get() {
   return (child, parent, rid = child[".rid"]) => {
    delete this[".rows"][rid]
    parent[".rows"][rid] = child
    Object.setPrototypeOf(child, parent)
   }
  },
 },
 "insert.fn": {
  get() {
   return (rid, inputColumns) => {
    const row = this["branch.fn"](rid, inputColumns),
     rows = this[".rows"]
    for (const rid in rows) if (rows[rid] !== row) this["donate.fn"](rows[rid], row, rid)
    return row
   }
  },
 },
 "remove.fn": {
  get() {
   return () => {
    if (this === ROW) throw new Error("Error: Attempted to remove ROW.")
    const parent = Object.getPrototypeOf(this),
     rows = this[".rows"]
    delete parent[".rows"][this[".rid"]]
    for (const rid in rows) this["donate.fn"](rows[rid], parent, rid)
    return parent
   }
  },
 },
 "grid-snap.fn": {
  get() {
   return entry => {
    const {
      borderBoxSize: [{ blockSize: height, inlineSize: width }],
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

    Object.assign(ROW, {
     "tile-width.number": tileWidth,
     "tile-height.number": tileHeight,
    })

    ROW["signal.fn"]()
   }
  },
 },
 "makeToggle.fn": {
  get() {
   return name => clickEvent => {
    if (name in (this._toggles ??= {})) {
     this._toggles[name]["remove.fn"]()
     delete this._toggles[name]
    } else {
     this._toggles[name] = Object.getPrototypeOf(HOST)["insert.fn"](name)
    }

    ROW["signal.fn"]()
   }
  },
 },
 "replaceWith.fn": {
  get() {
   return (rid, inputColumns) => {
    if (this === ROW) return this["insert.fn"](rid, inputColumns)
    const parent = Object.getPrototypeOf(this),
     row = parent["branch.fn"](rid, inputColumns),
     rows = this[".rows"]
    delete parent[".rows"][this[".rid"]]
    for (const rid in rows) this["donate.fn"](rows[rid], row, rid)
    return row
   }
  },
 },

 ".response": {
  get() {
   const encoder = new TextEncoder()
   let body, type

   if (this["isFile.bool"]) {
    const extension = this[".extension"],
     string = this[this[".name"]]
    body = encoder.encode(string)
    type =
     {
      png: "image/png",
      js: "text/javascript; charset=UTF-8",
      css: "text/css; charset=UTF-8",
      html: "text/html; charset=UTF-8",
     }[extension] ?? "text/plain; charset=UTF-8"
    if (extension === "png") {
     const B = atob(string),
      k = B.length,
      A = new ArrayBuffer(k),
      I = new Uint8Array(A)
     for (var i = 0; i < k; i++) I[i] = B.charCodeAt(i)
     body = new Blob([I], { type })
    }
   } else {
    body = encoder.encode(this["index.html"])
    type = "text/html; charset=UTF-8"
   }
   return new Response(body, { headers: { "content-type": type, expires: "Sun, 20 Jul 1969 20:17:00 UTC", server: "kireji" } })
  },
 },

 ".extension": {
  get() {
   return (this["isFile.bool"] && this[".name"].split(".").at(-1)) || null
  },
 },
 "item.extension": {
  get() {
   return this["branch.fn"](this["item.rid"] + "?.node=.null")[".extension"]
  },
 },

 "scroll-self.fn": {
  get() {
   return () =>
    HOST["set.fn"]({
     [`${this[".name"]}-scroll.number`]: `data:text/json,${this["scroll-y.number"]}`,
    })
  },
 },
 "toggle-inspector.fn": {
  get() {
   return () =>
    HOST["set.fn"]({
     "inspector.bool": !HOST["inspector.bool"] + ".bool",
    })
  },
 },
 "update-server.fn": {
  get() {
   return () => {
    this[".registration"].update().catch(() => location.reload())
   }
  },
 },
 "toggle-start-menu.fn": {
  get() {
   return () =>
    HOST["set.fn"]({
     "start-menu.bool": !HOST["start-menu.bool"] + ".bool",
    })
  },
 },
 "goto.fn": {
  get() {
   return () =>
    HOST["set.fn"]({
     "selection.rid": `data:,${this["item.rid"]}`,
     ".host": `${this["item.rid"]}`,
    })
  },
 },

 "workingTree.search": {
  get() {
   const search = Object.entries(this["workingTree.commit"])
    .map(e => e.join("="))
    .join("&")
   return search ? "?" + search : ""
  },
 },

 "set.fn": {
  get() {
   return incomingCommit => {
    const workingTree = this["workingTree.commit"],
     commit = this[".commit"],
     delta = {}

    for (const name in incomingCommit)
     if (incomingCommit[name] !== commit[name]) {
      delta[name] = workingTree[name] = incomingCommit[name]
     } else if (workingTree[name]) {
      delete workingTree[name]
      delta[name] = commit[name]
     }

    if (!Object.keys(delta).length) return

    const oldRID = this[".rid"],
     search = this["workingTree.search"],
     newRID = this[".name"] + search,
     parentRows = Object.getPrototypeOf(this)[".rows"]

    if (workingTree[".host"]) {
     const host = workingTree[".host"]
     delete workingTree[".host"]
     const finalHost = this["dev.bool"] ? "dev." + host : host
     location.assign("https://" + finalHost + search)
     return
    }

    if (search) this[".node"].setAttribute("data-search", search)
    else this[".node"].removeAttribute("data-search")

    delete parentRows[oldRID]
    parentRows[newRID] = this
    Object.defineProperties(this, { ".rid": { value: newRID, configurable: true } })
    this["checkout.fn"](delta)
    this["signal.fn"]()

    if (this === HOST) {
     if (history._timeout) clearTimeout(history._timeout)

     history._timeout = setTimeout(
      () => {
       history.replaceState({}, null, location.origin + search)
      },
      /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ? 350 : 75,
     )
    }
   }
  },
 },
 ".null": {
  get() {
   return null
  },
 },
 "default.columns": {
  get() {
   return {
    ".css": { value: null, configurable: true },
    ".tag": { value: "tag-", configurable: true },
    ".html": { value: null, configurable: true },
    ".rows": { value: {}, configurable: true },
    ".node": { value: null, configurable: true },
    ".layout": { value: [], configurable: true },
    ".children": { value: [], configurable: true },
    "index.int": { value: -1, configurable: true },
    "layout.css": { value: "", configurable: true },
    "onclick.fn": { value: null, configurable: true },
    "onresize.fn": { value: null, configurable: true },
    "scroll.number": { value: 0, configurable: true },
    "tab-index.number": { value: null, configurable: true },
    "view.stylesheet": { value: null, configurable: true },
    "attributes.names": { value: new Set(), configurable: true },
    "onpointerdown.fn": { value: null, configurable: true },
   }
  },
 },

 ".name": {
  get() {
   return ``
  },
 },
 "host.rid": {
  get() {
   return HOST[".rid"]
  },
 },

 ".path": {
  get() {
   let row = this,
    rids = []
   while (row) {
    rids.unshift(row[".rid"])
    row = Object.getPrototypeOf(row)
   }
   return rids
  },
 },
 "manifest.uri": {
  get() {
   return `https://${this[".host"]}/manifest.json`
  },
 },
 "auto.node": {
  get() {
   return this["ownNode.fn"]()
  },
 },

 "size.commit": {
  get() {
   return { ".node": "./auto.node", ".html": "./host-size.number", ".css": `./stat.css` }
  },
 },
 "grey1.commit": {
  get() {
   return { "grey.color": `data:text/color,#344555` }
  },
 },
 "grey2.commit": {
  get() {
   return { "grey.color": `grey2.color` }
  },
 },
 "title-200.commit": {
  get() {
   return { ".node": `./auto.node`, ".html": `./title-200.html`, ".tag": `./name.tag` }
  },
 },
 "title-503.commit": {
  get() {
   return { ".node": `./auto.node`, ".html": `./title-503.html`, ".tag": `./name.tag` }
  },
 },
 "button.commit": {
  get() {
   return { ".node": `./auto.node`, ".tag": `./name.tag` }
  },
 },
 "preview.commit": {
  get() {
   return { ".node": `./auto.node`, ".tag": "./name.tag", ".css": "./preview.css", ".html": `./error.html` }
  },
 },
 "sidebar.commit": {
  get() {
   return { ".node": `./auto.node`, ".children": `sidebar.children`, ".tag": `./name.tag`, ".css": `sidebar.css` }
  },
 },

 "error404.commit": {
  get() {
   return { ".node": `./auto.node`, ".css": `./error404.css`, ".html": `./error404.html`, ".tag": `./name.tag` }
  },
 },
 "side-menu.commit": {
  get() {
   return { ".node": `./auto.node`, ".children": `menu-buttons.children`, ".tag": `./name.tag`, ".layout": `menu-buttons.layout` }
  },
 },
 "inspector.commit": {
  get() {
   return {
    "scroll.number": `./inspector-scroll.number`,
    "title-503.txt": "data:,maintenance",
    "title-200.txt": "data:,active",
    ".node": `./auto.node`,
    ".children": `inspector.children`,
    ".tag": `./name.tag`,
    "onscroll.fn": `./scroll-self.fn`,
    ".css": `data:,:host{display: flex; flex-flow: column nowrap; overflow-y: auto } title-503-, title-200- { margin: 0; padding: 4px; text-transform: uppercase; position: sticky; top: 0; background: inherit }`,
   }
  },
 },
 "error.commit": {
  get() {
   return {
    ".css": `./theme.css`,
    ".host": location.host,
    ".node": `./auto.node`,
    ".tag": `./name.tag`,
    "background.color": `grey.color`,
    ".children": `./error.children`,
    "sidebar-open.bool": `true.bool`,
   }
  },
 },
 "flex-spacer.commit": {
  get() {
   return { ".node": `./auto.node`, ".layout": `flex-spacer.layout`, ".tag": `./name.tag` }
  },
 },
 "inspector-item.commit": {
  get() {
   return {
    ".node": `./auto.node`,
    ".tag": `./name.tag`,
    ".html": `./item.rid`,
    "onclick.fn": `./goto.fn`,
    ".css": `./inspector-item.css`,
   }
  },
 },
 "open-inspector.commit": {
  get() {
   return { "inspector.bool": `true.bool` }
  },
 },
 "grey-background.commit": {
  get() {
   return { "background.color": `grey.color`, "layout.css": `background.css` }
  },
 },
 "inspector-button.commit": {
  get() {
   return { ".node": `./auto.node`, ".html": `data:text/html,☰`, ".css": `unicode-button.css`, ".tag": `./name.tag`, "onclick.fn": `./toggle-inspector.fn` }
  },
 },
 "update-server-button.commit": {
  get() {
   return { ".node": `./auto.node`, ".html": `data:text/html,↻`, ".css": `unicode-button.css`, ".tag": `./name.tag`, "onclick.fn": `./update-server.fn` }
  },
 },
 "lighten-background.commit": {
  get() {
   return { "background.color": `light-background.color` }
  },
 },
 "flex-spacer-layout.commit": {
  get() {
   return { "layout.css": `flex-spacer.css` }
  },
 },
 "menu-buttons-layout.commit": {
  get() {
   return { "layout.css": `menu-buttons.css` }
  },
 },

 "inspector.children": {
  get() {
   return [
    "title-200",
    ...[
     // active
     "fallback.cloud",
     // "orenjinari.com",
    ].map(name => `inspector-item?item.rid=data:,${name}&active.bool=true.bool`),
    "title-503",
    ...[
     // inactive
     "kireji.io",
     "core.parts",
     "ejaugust.com",
     "glowstick.click",
     //
    ].map(name => `inspector-item?item.rid=data:,${name}`),
   ]
  },
 },

 "icon.png": {
  get() {
   return "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"
  },
 },
 "blue-grid.png": {
  get() {
   return "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"
  },
 },
 "orenjinari-icon.png": {
  get() {
   return "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAACkVBMVEUAAADizaAXiiBYp1j/pgBfvGZlvGT+qBJnvGbD1Myj0adrwndevnJbuFo9hT7/pR/wnQDwsm3/r2H/oQD/qQAxgjBnvGZlvGPm3+b8+Pz/+/9GZk3c6urB//9hwGvvq2X/uV2brUtKgkiFqjE1gSPGox4dgBiszqOFxJPTuIyaun8zu2z5tWxuu2b3oACtrW5Lkmn/qTX/qQL/u23/nQDY18JXuFX+pQD60rGrvqqQwINCh0Hzoha9wq2luaVlimPw2ch6u3aVsJVos2E8gjs/qzaMe3Jpu2dnvGbuwptovGb8mQDr2s2frZSqu6r6tWuYsJgAchwgZz5hs2HyngDc29mOpIlywILW5te/sqaAn31HZWK5xLnqmwOcvZzw3Mxhrl+yvrDpmgD149iWrJZkqlOFoIOwvrA4djhgimAAcQC2wbZpq2nm6u3en1BOezkehm3l7fBbqVu92srBlWQATQDajQYkbSFrdXxgpWBvnW8rfQDBwb3fjQDJ6f/j2NPNhysAUACcxd5KhEKEaAAAAAC/z8//pwD/pQD/owBnvWb/qRv+qBX+pw//oABqwGn/pwVrvmb/uUxFjT4thyz/qSMSgg3+qAz/twUAfAT/sALn7NzJ7dDM48b+1rX/3bCX0ab0y6WR2aLrw52fyJyIzJqlyJnwwJe4wZOTsJPjv5JfxofTu4ayvIWJvX31tXvptXd4wHZZwnVxy3Bywm5un21llGpuyGlXv2hfvmhoo2hgyWdYvWdFvGdUyWZio2JmvmE6vWD3r17Jrl7Bqlz/vVZWlFblqlVWuFFVuFD+q1CNrU6rrUz7qEr/sElSs0hIk0b3p0Q/iD7cqTv+qC46iy0wgyetcxwAdAX/qwDvpwBCZYXdAAAAh3RSTlMABAQG/f7++vIJ/v7+/v7+/fz6+fj27N1MIRwUEgz+/v7+/v7+/v79/f39/f39/fz8/Pz7+/r5+Pb29vb29fT08/Px8fHq6efn5uXk4eDe2NTMyMfGxMTCwMC4uLeqp6amoqGbmZaUkX96dXRwb21sZ2NiYF5WU01KSjw7OjgvLiQjHx8bFxDcNMB7AAABjElEQVQoz2IgGzAyQWhmTClOKSkwLSkpiyxck+hnZxkjw5Ad4LQyDUk8c+uxKdNm7k9J33VJaVoWAxNconyKqCif9bWwqMn2fC7SSBIMGRcmq6jdiK4Imnk1HySOAKWBBttsfdwifQtQXcsgk7xQR+Hc9UnG/nkoMoUWRzs7O/QEWDpvzohFUp87v1N4anfvhPbp3ewiM5Lg4oDVzetjn9oOBCztHe0sIrPKgGJgifhJ5t0d7TDAPisEEhYMsp4dRr0w4Qk9LFdsGoDCQKl6wSP8HVAtvb19gprttQwMzXESDC2GZ7ROdXZPAIr3tHdu0LgsXNLEwFC5JELC+5b2svV9Pb3tPR38a1YrmhwKbQMa1Og4x+Gs8kGu5X3Tezourt3EKyA0uxgcNa2ui0xXsJ5YsLiv8/i6PXtVheaGQyOt6rwc10a2k0tXHeZh3XlaXn1HNQMTRCZnuxlb10Rebh42XVZ9q32piPBN2NzV1dV/YGJ//xbu3c7SSIEY3MXBwSEm5uElLu5eBEoSAKmkixTMdb7fAAAAAElFTkSuQmCC"
  },
 },

 "zero.children": {
  get() {
   return []
  },
 },
 "sidebar.children": {
  get() {
   return ["side-menu", ...(this["inspector.bool"] ? ["inspector"] : [])]
  },
 },
 "error.children": {
  get() {
   return ["preview", ...(this["sidebar-open.bool"] ? ["sidebar"] : [])]
  },
 },
 "menu-buttons.children": {
  get() {
   return ["inspector-button", "flex-spacer", "update-server-button"]
  },
 },

 "manifest.json": {
  get() {
   return JSON.stringify({
    name: HOST[".name"].split(".")[0],
    short_name: HOST[".name"],
    start_url: ".",
    display: "standalone",
    background_color: this["background.color"],
    description: "An expirimental app.",
    icons: [
     {
      src: "icon.png",
      sizes: "144x144",
      type: "image/png",
     },
    ],
   })
  },
 },

 "flex-spacer.layout": {
  get() {
   return ["flex-spacer-layout"]
  },
 },
 "menu-buttons.layout": {
  get() {
   return ["menu-buttons-layout"]
  },
 },
 "title-200.html": {
  get() {
   return `<b>${this["title-200.txt"] ?? "Untitled"}<b>`
  },
 },
 "title-503.html": {
  get() {
   return `<b>${this["title-503.txt"] ?? "Untitled"}<b>`
  },
 },
 "error.html": {
  get() {
   return `<h1>503</h1>
<span id=float>
 <span class=thin id=fn>${this["selection.rid"]}</span> is under construction.<br><br>
</span>`
  },
 },

 "server.js": {
  get() {
   return `/*----------------------------------------------------------*\\
 *  © 2013 - 2024 Eric Augustinowicz and Kristina Soriano.  *
 *  All Rights Reserved.                                    *
 *  0.54.11-release                                         *
\\*----------------------------------------------------------*/
(C = {${Object.entries(C).map(([name, { get }]) => `\n "${name}": {\n  ${get}\n }`)}\n})["boot.fn"].get()()`
  },
 },

 "time.txt": {
  get() {
   setTimeout(() => this["signal.fn"](), 60005 - (Date.now() % 60000))
   return new Date().toLocaleString("en-US", { hour: "numeric", minute: "numeric", hourCycle: "h12" })
  },
 },
 "prefix.txt": {
  get() {
   return (this["force-refresh.bool"] ? "FORCED-" : this["original.bool"] ? "HTTPS-" : "") + (this["server.bool"] ? "SERVER-" : "CLIENT-") + BOOT_TIME
  },
 },
 "item-icon.txt": {
  get() {
   return (
    { bool: "⏼", html: "📄", css: "📄", txt: "📄", color: "🌈", layout: "🍱", number: "ℕ", fn: "ƒ", rid: "⎋", tag: "🏷", js: "📃", children: "🧒", commit: "🗃" }[
     this["item.extension"]
    ] ?? "#"
   )
  },
 },

 "true.bool": {
  get() {
   return true
  },
 },
 "false.bool": {
  get() {
   return false
  },
 },
 "isFile.bool": {
  get() {
   return this[".name"] in this
  },
 },
 "server.bool": {
  get() {
   return typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope
  },
 },

 "error404.html": {
  get() {
   return `<b><i>404</i></b>`
  },
 },

 "grey.color": {
  get() {
   return `#336598`
  },
 },
 "grey2.color": {
  get() {
   return `#444444`
  },
 },
 "background.color": {
  get() {
   return `tomato`
  },
 },
 "light-background.color": {
  get() {
   return (
    "#" +
    this["background.color"]
     .match(/[^#]{2}/g)
     .map(s => Math.trunc((1 - (1 - parseInt(s, 16) / 255) * 0.5) * 255).toString(16))
     .join("")
   )
  },
 },

 "theme.css": {
  get() {
   return `:host {
 --system-ui: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
 font: 13px var(--system-ui);
 margin: 0;
 padding: 0;
 display: grid;
 grid-template:  "${this["sidebar-open.bool"] ? "sbar " : ""}art" 1fr / ${
    this["sidebar-open.bool"] ? `${this["inspector.bool"] ? "2" : ""}${this["sidebar-width.number"]}px ` : ""
   }1fr;} ${this["sidebar-open.bool"] ? "sidebar- { grid-area: sbar }" : ""} preview- { grid-area: art }`
  },
 },
 "os.css": {
  get() {
   return `:host { position: fixed; top: 0; left: 0; width: 100%; box-sizing: border-box; height: 100%; margin: 0; display: grid; grid-template-rows: 1fr ${
    this["branch.fn"]("taskbar")["height.number"]
   }; font: 11px / 16px sans-serif; }`
  },
 },
 "stat.css": {
  get() {
   return `:host {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    ${this["pill-icon-right.bool"] ? "text-align: right; " : ""}
    display: inline-block;
    line-height: 24px;
    padding: 3px;
    color: white;
    background: ${this["background.color"]};
    padding-${this["pill-icon-right.bool"] ? "left" : "right"}: 12px;
   }`
  },
 },
 "sidebar.css": {
  get() {
   return `:host { overflow: hidden; color: ${this["background.color"]}; background: ${this["light-background.color"]}; display: grid; grid-template: "b${
    this["inspector.bool"] ? " i" : ""
   }" 1fr / ${this["sidebar-width.number"]}px ${this["inspector.bool"] ? "1fr" : ""}; } side-menu { grid-area: b } ${
    this["inspector.bool"] ? `inspector- { grid-area: i; background: ${this["branch.fn"]("lighten-background")["light-background.color"]} }` : ""
   }`
  },
 },
 "error404.css": {
  get() {
   return `:host { background: magenta }`
  },
 },

 "preview.css": {
  get() {
   return `
   :host {
    display: block;
    --theme-rgb: 56, 182, 255;
    --theme: rgb(var(--theme-rgb));
    --color: #0a0d0d;
    color: var(--color);
    background: rgba(var(--theme-rgb), 0.15);
    overflow: clip;
    position: relative;
    pointer-events: none;
    box-sizing: border-box;
    padding: 15px;
    width: 100%;
    height: 100% - 
    font: 18px system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
   }

   h1,
   h2 {
    text-align: center;
    line-height: 100vh;
    height: 100vh;
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    margin: 0;
    padding: 0;
   }

   h1 {
    font-size: 25vw;
    color: rgba(var(--theme-rgb), 0.25);
   }

   iframe {
    border: none;
   }

   a,
   a:visited,
   a:hover,
   a:active {
    color: inherit;
    text-decoration: none;
    padding: 5px8px;
    border-radius: 30px;
   }

   a:hover {
    background: rgba(var(--theme-rgb), 0.25);
   }

   .thin {
    font-weight: 200;
   }

   #float {
    display: inline-block;
    line-height: 1em;
   }

   #host {
    font-weight: 600;
   }`
  },
 },
 "background.css": {
  get() {
   return `:host { color: white; padding: 12px; background: ${this["background.color"]} }`
  },
 },
 "flex-spacer.css": {
  get() {
   return `:host { flex: 1 1 }`
  },
 },
 "start-button.css": {
  get() {
   return `:host { flex: 0 0; position: relative; width: 100%; box-sizing: border-box; height: 100%; display: flex; flex-flow: row nowrap; gap: 3px; border: none; font: bold 11px / 16px sans-serif; box-sizing: border-box; padding: ${
    this["start-menu.bool"] ? 4 : 3
   }px 4px 2px; text-align: left; background: #c3c3c3; box-shadow: ${
    this["start-menu.bool"]
     ? `  inset -1px -1px white,  inset 1px 1px black,  inset -2px -2px #dbdbdb,  inset 2px 2px #7a7a7a`
     : `  inset -1px -1px black,  inset 1px 1px white,  inset -2px -2px #7a7a7a,  inset 2px 2px #dbdbdb`
   };}:host(:focus)::after { border: 1px dotted black; content: ""; position: absolute; margin: 3px; left: 0; right: 0; top: 0; bottom: 0; pointer-events: none;}icon- { width: 16px; height: 16px; background: url(data:image/png;base64,${
    this["icon.png"]
   }); background-size: 16px;}`
  },
 },
 "menu-buttons.css": {
  get() {
   return `:host { display: flex; flex-flow: column nowrap; gap: 4px; padding: 4px; }`
  },
 },
 "unicode-button.css": {
  get() {
   return `:host { cursor: pointer; border-radius: 4px; line-height: 32px; width: 32px; font-size: 32px; aspect-ratio: 1 / 1; height: 32px; text-align: center; } :host(:hover) { background: ${this["background.color"]}; color: white }`
  },
 },
 "inspector-item.css": {
  get() {
   return `:host {
     ${this["selection.rid"] === this["item.rid"] ? "" : "cursor: pointer;"}
     display: flex;
     text-overflow: ellipsis;
     white-space: nowrap;
     overflow: hidden;
     height: 24px;
     line-height: 24px;
     font-size: 13px;
    }
    :host::before {
     width: 24px;
     height: 24px;
     font-size: 18px;
     line-height: 24px;
     text-align: center;${
      this["active.bool"]
       ? `
     content: " ";
     background-image: url(data:image/png;base64,${this["orenjinari-icon.png"]});
     background-size: 24px 24px;`
       : `
     content: "⏾";`
     }
    }
    :host${this["selection.rid"] === this["item.rid"] ? "" : "(:hover)"} {
     color: white;
     background: ${this["background.color"]};
    }`
  },
 },

 "name.tag": {
  get() {
   return this[".name"].replaceAll(/[^a-zA-Z0-9]+/g, "-") + "-"
  },
 },
 "native.tag": {
  get() {
   if (!this[".name"] || !/^[a-zA-Z]+$/.test(this[".name"])) throw RangeError(`Error: name "${this[".name"]}" is not a native tagname.`)
   return this[".name"]
  },
 },
})["boot.fn"].get()()
