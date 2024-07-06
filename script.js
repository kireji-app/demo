;(globalThis.Columns = {
 "size.commit": {
  get() {
   return {
    "index.htm": "./host-size.number",
    "style.css": `./stat.css`
   }
  }
 },
 "tray.commit": {
  get() {
   return {
    "index.names": `tray.names`,
    "style.css": `data:,:host {
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
     }`
   }
  }
 },
 "line.commit": {
  get() {
   return {
    "style.css": `data:text/css,:host {
      display: flex;
      flex-flow: row nowrap;
      font-family: monospace;
      overflow: hidden;
      background: ${this["theme.color"]};
      color: white;
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
    "index.names": "data:text/names,line-number;line-content",
    "line-content.commit": `data:text/json,${JSON.stringify({
     "index.htm": `data:text/column,return this["content.txt"]`,
     "style.css": `data:text/css,:host {
       white-space: pre;
       padding-left: 0.5ch;
      }`
    })}`,
    "line-number.commit": `data:text/json,${JSON.stringify({
     "index.htm": `data:text/column,return "" + (isNaN(this["index.number"]) ? NaN : this["index.number"])`,
     "style.css": `data:text/css,:host {
       flex: 0 0 5ch;
       text-align: right;
       padding-right: 0.5ch;
       color: white;
       background: ${this["shade-theme.fn"]()};
      }`
    })}`,
    ".variants": `data:text/json,${JSON.stringify([
     [
      "one-line",
      ["line?index.number=data:text/json,0&content.txt=data:, // one line"]
     ],
     [
      "two-lines",
      [
       "line?index.number=data:text/json,0&content.txt=data:, /* two",
       "line?index.number=data:text/json,1&content.txt=data:,     lines */"
      ]
     ],
     [
      "three-lines",
      [
       "line?index.number=data:text/json,0&content.txt=data:, /* three",
       "line?index.number=data:text/json,1&content.txt=data:,     separate",
       "line?index.number=data:text/json,2&content.txt=data:,     lines */"
      ]
     ],
     [
      "validation",
      [
       "line",
       'line?index.number=data:text/json,"bad line number"',
       "line?content.txt=data:, // missing line number"
      ]
     ]
    ])}`
   }
  }
 },
 "clock.commit": {
  get() {
   return {
    "index.htm": `./time.txt`,
    ".variants": `data:text/json,${JSON.stringify([
     ["clock", ["clock"]],
     ["tray", ["tray"]],
     ["taskbar", ["taskbar"]]
    ])}`
   }
  }
 },
 "empty.commit": {
  get() {
   return {
    "index.names": "empty.names",
    "onresize.fn": `./capture-resize.fn`,
    "style.css": `./empty.css`,
    ".variants": `data:text/json,${JSON.stringify([
     [
      "Empty Variants Panel",
      ["variants?selected-commit.name=data:,fake-name-12345.fake"],
      { width: 150, height: 300 }
     ],
     [
      "Empty Property Chat",
      [
       "property-chat?selected-commit.name=data:,fake-name-12345.fake&item.rid=data:,fake-item"
      ],
      { width: 150, height: 300 }
     ]
    ])}`
   }
  }
 },
 "blank.commit": {
  get() {
   return {}
  }
 },
 "title.commit": {
  get() {
   return {
    "index.htm": `./title.htm`,
    "style.css": "title.css"
   }
  }
 },
 "search.commit": {
  get() {
   return {
    "index.names": "./search.names",
    "style.css": `data:text/css,:host { flex: 1 1; display: flex }`,
    "search-input.commit": `data:text/json,${JSON.stringify({
     "style.css": `data:text/css,:host { flex: 1 1; }`,
     "index.htm": `data:text/html,Search`
    })}`,
    "search-icon.commit": `data:text/json,${JSON.stringify({
     "index.htm": `data:text/html,🔍`
    })}`
   }
  }
 },
 "header.commit": {
  get() {
   return {
    "index.names": "./header.names",
    "style.css": `./header.css`,
    "title.css": `data:text/css,:host { font-size: 32px; font-weight: 500 }`
   }
  }
 },
 "memory.commit": {
  get() {
   return {
    "index.htm": "./host-memory.htm",
    "style.css": `./stat.css`
   }
  }
 },
 "status.commit": {
  get() {
   return {
    "index.names": `status.names`,
    "style.layout": `status.layout`,
    ".variants": `data:text/json,${JSON.stringify([["no-inputs", ["status"]]])}`
   }
  }
 },
 "version.commit": {
  get() {
   return {
    "index.htm": `./version.number`,
    "pill-icon-right.bool": `true.bool`,
    "style.css": `./stat.css`
   }
  }
 },
 "message.commit": {
  get() {
   return {
    "index.names": "./message.names",
    "style.css": `data:text/css,:host {
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    gap: 4px;
    max-width: 85 %;
    height: fit-content;
    flex: 0;
     ${this["author.txt"] === "User" ? `align-self: end;` : ``}
   } `
   }
  }
 },
 "sidebar.commit": {
  get() {
   return {
    "index.names": `sidebar.names`,
    "style.layout": `sidebar.layout`
   }
  }
 },
 "taskbar.commit": {
  get() {
   return {
    "height.number": `data:,28px`,
    "index.names": `./taskbar.names`,
    "style.css": `data:,:host { position: relative; width: 100 %; box - sizing: border - box; height: 100 %; margin: 0; display: flex; flex - flow: row nowrap; gap: 3px; height: 100 %; padding: 4px 2px 2px; background: #c3c3c3; box - shadow: inset 0 1px #c3c3c3, inset 0 2px white; } `
   }
  }
 },
 "desktop.commit": {
  get() {
   return {
    "style.css": `data:,:host{ background: #377f7f } `
   }
  }
 },
 "variants.commit": {
  get() {
   return {
    "title.txt": "data:,Variants",
    "index.names": `./variants.names`,
    "onscroll.fn": "./scroll-name-y.fn",
    "style.css": `data:text/css,:host {
     display: flex;
     flex-flow: row wrap;
     align-content: start;
     gap: 16px;
     padding: 16px;
     padding-top: 39px;
     overflow: hidden;
     position: relative;
     overflow-y: auto;
     align-items: start;
    }
    title- {
     position: absolute;
     top: 0;
     left: 0;
     right: 0;
    }`
   }
  }
 },
 "host-rid.commit": {
  get() {
   return {
    "index.htm": `${location.origin}/.rid`,
    "style.css": `./host-rid.css`
   }
  }
 },
 "error404.commit": {
  get() {
   return {
    "index.htm": `./error404.htm`,
    "style.css": `./error404.css`
   }
  }
 },
 "inspector.commit": {
  get() {
   return {
    "title.txt": "data:,Columns",
    "style.css": `data:,:host{display: flex; flex-flow: column nowrap; overflow-y: auto } :host(:focus){ box-shadow: inset 0 0 0 1px blue }`,
    "index.names": `inspector.names`,
    "onscroll.fn": "./scroll-name-y.fn",
    "tabindex.number": "data:text/json,1"
   }
  }
 },
 "empty-icon.commit": {
  get() {
   return {
    "index.htm": `data:text/html,∅`
   }
  }
 },
 "start-menu.commit": {
  get() {
   return {
    "style.css": `start-menu.css`,
    "index.names": `start-menu.names`
   }
  }
 },
 "core.parts.commit": {
  get() {
   return {
    "index.names": `./core.parts.names`,
    "style.css": `./core.parts.css`,
    "inspector-scroll-y.number": "data:text/json,0",
    "commit-explorer-scroll-y.number": "data:text/json,0",
    "variants-scroll-y.number": "data:text/json,0",
    "property-chat-box-scroll-y.number": "data:text/json,0",
    "inspector.bool": `true.bool`,
    "commit-explorer.bool": `true.bool`,
    "item.rid": `data:text/name,style.css`,
    "selected-commit.name": `data:text/name,Core`,
    "sidebar-open.bool": `true.bool`,
    ".variants": `data:text/json,${JSON.stringify([
     ["home", ["core.parts"], { width: 1024, height: 768 }],
     [
      "editing line",
      [
       "core.parts?commit-explorer.bool=false.bool&selected-commit.name=data:,line"
      ],
      { width: 1024, height: 768 }
     ]
    ])}`
   }
  }
 },
 "test-canvas.commit": {
  get() {
   return {
    "style.css": `./test-canvas.css`
   }
  }
 },
 "pilot.parts.commit": {
  get() {
   return {
    "style.css": `./os.css`,
    "index.names": `./os.names`
   }
  }
 },
 "flex-spacer.commit": {
  get() {
   return {
    "style.layout": `flex-spacer.layout`
   }
  }
 },
 "play-button.commit": {
  get() {
   return {
    "onclick.fn": `./toggle-play.fn`,
    "index.htm": "data:,▶",
    "style.css": `./stat.css`
   }
  }
 },
 "stat-layout.commit": {
  get() {
   return {
    "layout.css": "./stat.css"
   }
  }
 },
 "column-code.commit": {
  get() {
   return {
    "index.names": `./column-code.names`,
    "style.css": `./message-bubble.css`
   }
  }
 },
 "commit-list.commit": {
  get() {
   return {
    "style.css": `data:,:host {
     padding: 12px;
     display: flex;
     flex-flow: column;
     background: ${this["shade-theme.fn"](0.9)};
     font-size: 17px;
     font-weight: 200;
     border-radius: 12px;
    }`,
    "index.names": `./commit-list.names`
   }
  }
 },
 "reset-button.commit": {
  get() {
   return {
    "index.htm": `data:text/html,⟳`,
    "style.css": `unicode-button.css`,
    "onclick.fn": `./reset.fn`
   }
  }
 },
 "mini-browser.commit": {
  get() {
   return {
    "index.names": `./mini-browser.names`,
    "style.css": `./mini-browser.css`,
    ".variants": `data:text/json,${JSON.stringify([
     [
      "no-content",
      [
       "mini-browser?input.names=data:text/names,",
       `mini-browser?input.names=data:text/names,status`
      ]
     ]
    ])}`
   }
  }
 },
 "start-button.commit": {
  get() {
   return {
    "style.css": `start-button.css`,
    "index.htm": `data:,<icon-></icon->Start`,
    "onpointerdown.fn": `https://pilot.parts/toggle-start-menu.fn`,
    "tabindex.number": `1`
   }
  }
 },
 "ejaugust.com.commit": {
  get() {
   return {
    "index.names": `./portfolio.names`,
    "style.css": `./portfolio.css`,
    "onresize.fn": `./grid-snap.fn`,
    "selected-commit.name": `data:text/name,ejaugust.com`,
    "inspector.bool": `false.bool`,
    "commit-explorer.bool": `false.bool`,
    "item.rid": `data:,style.css`,
    "inspector-scroll-y.number": "data:text/json,0",
    "commit-explorer-scroll-y.number": "data:text/json,0",
    "variants-scroll-y.number": "data:text/json,0",
    "property-chat-box-scroll-y.number": "data:text/json,0",
    "sidebar-open.bool": `true.bool`
   }
  }
 },
 "status-layout.commit": {
  get() {
   return {
    "layout.css": `status.css`
   }
  }
 },
 "commit-editor.commit": {
  get() {
   return {
    "style.css": "./commit-editor.css",
    "index.names": `./commit-editor.names`
   }
  }
 },
 "property-chat.commit": {
  get() {
   return {
    "style.css": "./property-chat.css",
    "index.names": `./property-chat.names`,
    "title.txt": `data:,Property Chat`
   }
  }
 },
 "message-author.commit": {
  get() {
   return {
    "index.htm": "./author.txt",
    "style.css": `data:text/css,:host { color: #fffa; font-size: 0.85em; font-weight: 500; }`
   }
  }
 },
 "inspector-item.commit": {
  get() {
   return {
    "index.htm": `./item.htm`,
    "onclick.fn": `./select-item.fn`,
    "style.css": `./item.css`
   }
  }
 },
 "orenjinari.com.commit": {
  get() {
   return {
    "index.names": `./orenjinari.com.names`,
    "style.css": `./orenjinari.com.css`,
    "portfolio-scroll-y.number": "data:text/json,0",
    ".variants": `data:text/json,${JSON.stringify([
     ["Error 404 page", ["orenjinari.com"], { width: 1024, height: 768 }]
    ])}`
   }
  }
 },
 "message-content.commit": {
  get() {
   return {
    "index.htm": `./sanitize-msg.htm`,
    "style.css": `./message-bubble.css`
   }
  }
 },
 "commit-explorer.commit": {
  get() {
   return {
    "title.txt": "data:,Parts",
    "onscroll.fn": "./scroll-name-y.fn",
    "style.css": `data:,:host{
     display: flex;
     flex-flow: column nowrap;
     overflow-y: auto;
     background: ${this["shade-theme.fn"](0.7)};
    }
    :host(:focus){
     box-shadow: inset 0 0 0 1px blue;
    }
    commit-list {
     margin: 48px;
    }`,
    "index.names": this["packNames.fn"](["header", "commit-list"]),
    "tabindex.number": "data:text/json,1"
   }
  }
 },
 "inspector-button.commit": {
  get() {
   return {
    "index.htm": `data:text/html,i`,
    "style.css": `unicode-button.css`,
    "onclick.fn": `./toggle-inspector.fn`
   }
  }
 },
 "property-chat-box.commit": {
  get() {
   return {
    "style.css": "./property-chat-box.css",
    "onscroll.fn": "./scroll-name-y.fn",
    "index.names": `./property-chat-box.names`
   }
  }
 },
 "flex-spacer-layout.commit": {
  get() {
   return {
    "layout.css": `flex-spacer.css`
   }
  }
 },
 "menu-buttons-layout.commit": {
  get() {
   return {
    "layout.css": `menu-buttons.css`
   }
  }
 },
 "commit-list-item.commit": {
  get() {
   return {
    "index.htm": `./selected-commit.name`,
    "onclick.fn": `./select-commit.fn`,
    "style.css": `./commit-list-item.css`
   }
  }
 },
 "commit-explorer-button.commit": {
  get() {
   return {
    "index.htm": `data:text/html,☰`,
    "style.css": `unicode-button.css`,
    "onclick.fn": `./toggle-commit-explorer.fn`
   }
  }
 },

 "set.fn": {
  get() {
   return incomingCommit => {
    const workingTree = this["workingTree.commit"],
     commit = this[this["commit.name"]],
     delta = {}

    for (const name in incomingCommit) {
     if (
      incomingCommit[name] === workingTree[name] ||
      (!(name in workingTree) && incomingCommit[name] === commit[name])
     )
      continue

     if (incomingCommit[name] !== commit[name]) {
      if (incomingCommit[name] === undefined) {
       delete workingTree[name]
       delta[name] = commit[name]
      } else delta[name] = workingTree[name] = incomingCommit[name]
     } else if (workingTree[name]) {
      delete workingTree[name]
      if (commit[name]) delta[name] = commit[name]
      else {
       delete this[name]
      }
     }
    }

    if (!Object.keys(delta).length) return

    this["checkout-commit.fn"](delta, {
     author: "User",
     msg: "please make a change 😅🥵😳😭"
    })
    this["signal.fn"]()

    if (this === Host) {
     if (history._timeout) clearTimeout(history._timeout)

     history._timeout = setTimeout(
      () =>
       history.replaceState(
        {},
        null,
        location.origin + this["workingTree.search"]
       ),
      120
     )
    }
   }
  }
 },
 "log.fn": {
  get() {
   return (...args) => console.info(this["prefix.txt"], ...args)
  }
 },
 "boot.fn": {
  get() {
   return () => {
    globalThis.TAPE = ""
    globalThis.NODES = new Map()
    globalThis.BOOT_TIME = Date.now()
    globalThis.META = {
     author: "script.js",
     msg: "Define the initial Columns and call one of them to boot the page.",
     meta: { author: "User", msg: "🙏🏻 please render me a page!!!" }
    }
    globalThis.Core = Object.create(null, Columns)
    globalThis.Host = Core["branch.fn"](
     location.host.slice(location.host.startsWith("dev.") ? 4 : 0) +
      location.search,
     undefined,
     { author: "boot.fn", msg: "Ok, booting the page.", meta: META }
    )
    Host["install.fn"]()
   }
  }
 },
 "fetch.fn": {
  get() {
   return (url, event) => {
    const { host, pathname } = new URL(url)

    let repo = Core["branch.fn"](host.slice(host.startsWith("dev.") ? 4 : 0))

    const names = pathname.split("/")

    names.shift() // remove empty name before starting slash

    if (pathname.endsWith("/")) names.pop() // remove empty name after trailing slash

    for (const name of names) repo = repo["branch.fn"](name)

    event.respondWith(repo[".response"])
   }
  }
 },
 "reset.fn": {
  get() {
   return () => {
    location = location.origin
   }
  }
 },
 "signal.fn": {
  get() {
   return () => {
    if (this["server.bool"])
     throw new Error(
      "Server Error: signal called in server." + this["trace.txt"]
     )

    if (this[".stylesheet"] !== undefined)
     this[".stylesheet"].replaceSync(this["layout.css"])

    if (this[".node"] !== undefined) {
     const ownNode = this[".node"],
      { shadowRoot } = ownNode

     ownNode.setAttribute("rid", this[".rid"])

     layouts: {
      const rawCSS = this["style.css"],
       stylesheets = shadowRoot.adoptedStyleSheets,
       existingSheets = [...stylesheets],
       existingSheetReposet = existingSheets.map(sheet => sheet.repo)
      if (rawCSS !== undefined) {
       let singleSheet = existingSheets[0]
       if (existingSheetReposet.length !== 1 || singleSheet.repo) {
        for (const existingSheetRepo of existingSheetReposet) {
         existingSheetRepo?.["remove.fn"]()
         stylesheets.pop()
        }
        singleSheet = new CSSStyleSheet()
        stylesheets.push(singleSheet)
       }
       singleSheet.replaceSync(rawCSS)
      } else {
       const incomingSheetNames = this["style.layout"] ?? []

       let i = -1
       while (existingSheetReposet.length && incomingSheetNames.length) {
        i++
        const existingSheetRepo = existingSheetReposet.shift(),
         existingSheetName = existingSheetRepo?.[".name"],
         incomingSheetName = incomingSheetNames.shift()
        if (existingSheetName === incomingSheetName) continue
        const existingIndex = existingSheetReposet.findIndex(
         repo => repo[".name"] === incomingSheetName
        )
        let stylesheet
        if (existingIndex === -1) {
         stylesheet = new CSSStyleSheet()
         stylesheet.repo = this["branch.fn"](incomingSheetName, {
          [".stylesheet"]: {
           get() {
            return stylesheet
           },
           configurable: true
          }
         })
        } else {
         const stylesheetIndex = i + existingIndex + 1
         stylesheet = stylesheets[stylesheetIndex]
         stylesheets.splice(stylesheetIndex, 1)
         existingSheetReposet.splice(existingIndex, 1)
        }
        stylesheets.splice(i, 0, stylesheet)
        if (incomingSheetNames.some(name => name === existingSheetName)) {
         existingSheetReposet.unshift(existingSheetRepo)
         continue
        }
        stylesheets.splice(i + 1, 1)
       }
       if (existingSheetReposet.length)
        existingSheetReposet.forEach(() => stylesheets.pop())
       else if (incomingSheetNames.length)
        for (const incomingSheetName of incomingSheetNames) {
         const stylesheet = new CSSStyleSheet()
         stylesheet.repo = this["branch.fn"](incomingSheetName, {
          [".stylesheet"]: {
           get() {
            return stylesheet
           },
           configurable: true
          }
         })
         stylesheets.push(stylesheet)
        }
      }
     }

     children: {
      const innerHTML = this["index.htm"]
      if (innerHTML !== undefined) {
       if (shadowRoot.innerHTML != innerHTML) shadowRoot.innerHTML = innerHTML
      } else {
       const incomingRIDs = this["index.names"] ?? []

       if (!(incomingRIDs && Array.isArray(incomingRIDs)))
        throw new Error(
         `Cannot use .names file of type ${typeof incomingRIDs}.${
          this["trace.txt"]
         }`
        )

       const { children } = shadowRoot,
        max = 250

       let i = -1

       while (incomingRIDs.length) {
        i++

        if (i >= max) throw "∞ loop"

        const incomingRID = incomingRIDs.shift(),
         existingRID = children[i]?.repo[".rid"]

        if (!incomingRID)
         throw new Error(
          `Create Node failed. No name on node.\n\t${JSON.stringify(
           this["index.names"]
          )}${this["trace.txt"]}`
         )

        if (existingRID === incomingRID) continue

        const existingIndex = [...children].findIndex(
         (n, o) => o > i && n.repo[".rid"] === incomingRID
        )

        if (existingIndex !== -1) {
         shadowRoot.insertBefore(children[existingIndex], children[i])
         continue
        }

        const repo = this["branch.fn"](incomingRID),
         node = repo[".node"]

        if (!node)
         throw new Error(
          `Create Node Error: this repo doesn't have a node.${this["trace.txt"]}`
         )

        if (i !== -1 && i < children.length)
         shadowRoot.insertBefore(node, children[i])
        else shadowRoot.appendChild(node)

        node.callback?.()
       }

       while (children[i + 1]) children[i + 1].repo["remove.fn"]()
      }
     }

     this["forEach.fn"](repo => repo["signal.fn"]())
    }
   }
  }
 },
 "server.fn": {
  get() {
   return () => {
    onfetch = e => Host["fetch.fn"](e.request.url, e)
    onactivate = onmessage = e => clients.claim()
    oninstall = e => {
     globalThis.skipWaiting()
     e.waitUntil(
      fetch(location.origin)
       .then(index => index.text())
       .then(text => {
        globalThis.BOOTSTRAP = text.replace(
         `<link rel="manifest">`,
         `<link rel="manifest" href="${this["manifest.uri"]}"/>`
        )
        this["log.fn"]()
       })
     )
    }
   }
  }
 },
 "client.fn": {
  get() {
   return meta => {
    Promise.all([
     (async () => {
      const registration = await navigator.serviceWorker.register(
        location.origin + "/script.js"
       ),
       { waiting: w, installing: i, active: a } = registration
      if (!a)
       await new Promise(
        resolve =>
         ((w ?? i).onstatechange = ({ target: t }) =>
          t.state === "activated" ? resolve(t) : 0)
       )
      return registration
     })(),
     new Promise(resolve => (onload = resolve))
    ]).then(([registration]) => {
     if (location.host.startsWith("dev.")) {
      document.onvisibilitychange = () =>
       document.hidden || registration.update()
      window.onfocus = () => registration.update()
     }

     const manifest = document.querySelector('[rel="manifest"]'),
      original = !manifest.href,
      server = navigator.serviceWorker.controller,
      forceRefreshed = !server,
      begin = () => {
       globalThis.BOOTSTRAP = document.documentElement.outerHTML.replace(
        `<link rel="manifest">`,
        `<link rel="manifest" href="${this["manifest.uri"]}"/>`
       )

       this["log.fn"]()

       if (original) manifest.href = Host["manifest.uri"]

       Host["ownNode.fn"](document.body)
       Host["signal.fn"]()
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

     const outputs = {
       "original.bool": original,
       "force-refresh.bool": forceRefreshed
      },
      bootColumns = {}

     for (const filename in outputs) {
      const get = function () {
       return outputs[filename]
      }
      get.meta = {
       author: "client.fn",
       output: true,
       msg: `Add client-related boot details to the Host node.`,
       meta
      }
      bootColumns[filename] = {
       get,
       configurable: true,
       enumerable: true
      }
     }

     Object.defineProperties(this, bootColumns)

     if (forceRefreshed) {
      waiting = true
      registration.active.postMessage(1)
     } else begin()
    })
   }
  }
 },
 "branch.fn": {
  get() {
   return (rid, inputColumns, meta = null) => {
    if (rid === "Core") return Core

    if (rid === "Host") return Host

    const queryIndex = rid.indexOf("?"),
     name = queryIndex == -1 ? rid : rid.slice(0, queryIndex),
     search = queryIndex == -1 ? undefined : rid.slice(queryIndex + 1),
     exists = name + ".commit" in this,
     commitName = (exists ? name : "error404") + ".commit",
     commit = this[commitName],
     ignoreNames = this["ignore.names"],
     ignoreColumns = Object.fromEntries(
      ignoreNames.map(name => {
       const ignoreGet = function () {
         return Columns[name]?.get.apply(this)
        },
        ignoreColumn = { get: ignoreGet, configurable: true }

       ignoreGet.meta = {
        msg: `Set ${name} to behave like it does on Core.`,
        author: "branch.fn",
        ignore: true,
        meta
       }
       return [name, ignoreColumn]
      })
     ),
     workingTree = (search ? search.split("&") : []).reduce((attrs, param) => {
      const [name, href] = param.split(/=(.*)$/)
      attrs[name] = href
      return attrs
     }, {}),
     output = {
      ".name": [
       name,
       `Tell the object what name was used to create it and used to find it's commit. (${name})`
      ],
      "commit.name": [
       commitName,
       `Add the name of the commit that was ultimately used to make this object. (${commitName}).`
      ],
      "workingTree.commit": [
       workingTree,
       `Add the runtime working tree, which was created when the node was created. Based on search string "${search}".`
      ]
     },
     contextColumns = {}

    for (const filename in output) {
     const get = function () {
      return output[filename][0]
     }
     get.meta = {
      author: "branch.fn",
      output: true,
      msg:
       output[filename][1] ??
       "Add context about the branch operation that created this repo.",
      meta
     }
     contextColumns[filename] = {
      get,
      configurable: true,
      enumerable: true
     }
    }

    if (!exists)
     this["log.fn"]("No commit for " + name, {
      search,
      rid,
      self: this,
      commitName
     })

    const repo = Object.create(
     this,
     Object.assign({}, ignoreColumns, inputColumns, contextColumns)
    )

    repo["checkout-commit.fn"](commit, {
     author: "branch.fn",
     msg: `Check out the original commit for ${commitName}.`,
     meta
    })
    repo["checkout-commit.fn"](workingTree, {
     author: "branch.fn",
     msg: `Check out the working tree for ${this[".rid"]}`,
     meta
    })

    return repo
   }
  }
 },
 "remove.fn": {
  get() {
   return () => {
    if (this === Core) throw new Error(`can't remove Core.${this["trace.txt"]}`)

    this[".node"]?.remove()
   }
  }
 },
 "forEach.fn": {
  get() {
   return callback => {
    const { shadowRoot } = this[".node"] ?? {}

    if (!shadowRoot)
     throw Error(
      `called subsignal on a repo with no shadowRoot.${this["trace.txt"]}`
     )

    let index = 0

    for (const node of shadowRoot.children)
     if (node.repo) callback(node.repo, index++, "node")

    for (const sheet of shadowRoot.adoptedStyleSheets)
     if (sheet.repo) callback(sheet.repo, index++, "sheet")
   }
  }
 },
 "install.fn": {
  get() {
   return meta =>
    this[(this["server.bool"] ? "server" : "client") + ".fn"]({
     author: "install.fn",
     meta,
     msg: "Fine, we'll install the whole app."
    })
  }
 },
 "ownNode.fn": {
  get() {
   return incomingNode => {
    if (NODES.has(this)) {
     if (incomingNode)
      throw new Error(
       `Own Node Error: this repo already owns a node.${this["trace.txt"]}"`
      )

     return NODES.get(this)
    }

    console.log(this[".rid"], this[".name"], this["trace.txt"])
    const node = incomingNode ?? document.createElement(this[".tag"])

    NODES.set(this, node)

    node.repo = this
    node.onclick = this["onclick.fn"]
    node.onscroll = this["onscroll.fn"]
    node.onpointerdown = this["onpointerdown.fn"]

    if (this["tabindex.number"]) node.tabIndex = this["tabindex.number"]

    if (this["onresize.fn"] || this["onscroll.fn"]) {
     let timeout,
      scroll = !!this["onscroll.fn"]
     new ResizeObserver(e => {
      if (scroll) {
       scroll = false
       node.scrollTo(
        this[this[".name"] + "-scroll-x.number"] ?? 0,
        this[this[".name"] + "-scroll-y.number"] ?? 0
       )
      }

      if (timeout) clearTimeout(timeout)

      timeout = setTimeout(() => {
       this["onresize.fn"]?.(e[0])
      }, 75)
     }).observe(node)
    }
    try {
     node.attachShadow({ mode: "open" })
    } catch {
     throw new Error(
      `Error: can't attach shadow to ${this[".tag"]}.${this["trace.txt"]}`
     )
    }
    return node
   }
  }
 },
 "forChain.fn": {
  get() {
   return callback => {
    let repo = this,
     index = 0

    while (repo) {
     callback(repo, index++)
     repo = Object.getPrototypeOf(repo)
    }
   }
  }
 },
 "item-get.fn": {
  get() {
   return Object.getOwnPropertyDescriptor(
    Core["branch.fn"](this["selected-commit.name"], undefined, {
     author: "item-get.fn",
     msg: `Create a branch so that we can fetch ${this["item.rid"]} from ${this["selected-commit.name"]} as a repo.`
    }),
    this["item.rid"]
   ).get
  }
 },
 "grid-snap.fn": {
  get() {
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

    Object.assign(Core, {
     "tile-width.number": tileWidth,
     "tile-height.number": tileHeight
    })

    Host["signal.fn"]()
   }
  }
 },
 "packNames.fn": {
  get() {
   return names => {
    return (
     "data:text/names," +
     (names ?? [])
      .map(name =>
       name
        .replaceAll("%", "%25")
        .replaceAll("&", "%26")
        .replaceAll(this["name-delim.txt"], this["escaped-name-delim.txt"])
      )
      .join(this["name-delim.txt"])
    )
   }
  }
 },
 "unpackNames.fn": {
  get() {
   return href => {
    const datum = href?.slice(href.indexOf(",") + 1)
    return datum
     ? datum
        .split(this["name-delim.txt"])
        .map(escapedName =>
         escapedName
          .replaceAll(this["escaped-name-delim.txt"], this["name-delim.txt"])
          .replaceAll("%26", "&")
          .replaceAll("%25", "%")
        )
     : []
   }
  }
 },
 "reduceChain.fn": {
  get() {
   return (callback, value) => {
    this["forChain.fn"]((repo, index) => {
     value = callback(value, repo, index)
     repo = Object.getPrototypeOf(repo)
    })

    return value
   }
  }
 },
 "select-item.fn": {
  get() {
   return () => {
    Host["set.fn"]({ "item.rid": `data:text/name,${this["item.rid"]}` })
   }
  }
 },
 "literal-cell.fn": {
  get() {
   return (href, meta) => {
    const commaIndex = href.indexOf(","),
     datum = href.slice(commaIndex + 1),
     header = href.slice(5, commaIndex).split(";"),
     type = header.shift() || "text/plain",
     body =
      type === "text/json"
       ? JSON.parse(datum)
       : type === "text/names"
       ? datum
         ? this["unpackNames.fn"](href)
         : []
       : type === "text/name"
       ? datum || null
       : type === "text/column"
       ? (get => (
          (get.meta = {
           meta,
           author: "literal-cell.fn",
           href,
           msg: "Add the default datauri column."
          }),
          get.apply(this)
         ))(new Function(datum))
       : datum

    return body
   }
  }
 },
 "shade-theme.fn": {
  get() {
   return (addend = 0.1) =>
    "#" +
    this["theme.color"]
     .match(/[^#]{2}/g)
     .map(s =>
      Math.trunc(
       (1 - (1 - parseInt(s, 16) / 255) * (1 - addend)) * 255
      ).toString(16)
     )
     .join("")
  }
 },
 "select-commit.fn": {
  get() {
   return () => {
    Host["set.fn"]({
     "selected-commit.name": `data:text/name,${this["selected-commit.name"]}`,
     "commit-explorer.bool": `false.bool`
    })
   }
  }
 },
 "checkout-cell.fn": {
  get() {
   return href => {
    const cellType = href.startsWith("data:")
     ? "literal"
     : href.startsWith("https://")
     ? "absolute"
     : "relative"
    return this[cellType + "-cell.fn"](href)
   }
  }
 },
 "absolute-cell.fn": {
  get() {
   return (href, meta) => {
    const subpaths = href.slice(8).split("/"),
     host =
      subpaths.shift() +
      (Host[".rid"].split("?")[1] ? "?" + Host[".rid"].split("?")[1] : ""),
     subname = subpaths.pop()

    if (!subname)
     throw new RangeError(
      `Error: absolute cell reference must include a file name. Get reference to entire repo not yet supported.\n (adding ${href})${this["trace.txt"]}`
     )

    let nextMeta = { author: "absolute-cell.fn", msg: "", meta },
     repo = Core["branch.fn"](
      host.slice(host.startsWith("dev.") ? 4 : 0),
      undefined,
      nextMeta
     )

    for (const subpath of subpaths) {
     const prevMeta = nextMeta
     nextMeta = {
      author: prevMeta.author,
      meta: prevMeta,
      msg: `Seek ${subname} from subrepo ${subpath}.`
     }
     repo = repo["branch.fn"](subpath, undefined, nextMeta)
    }

    return repo[subname]
   }
  }
 },
 "relative-cell.fn": {
  get() {
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

    let repo = this

    for (let i = 0; i < levels; i++) {
     repo = Object.getPrototypeOf(repo)
     if (repo === null)
      throw new RangeError(
       `Error: relative reference to repo which is beyond Core ${href}.${this["trace.txt"]}`
      )
    }

    let result
    result = repo[subname]

    return result
   }
  }
 },
 "scroll-name-x.fn": {
  get() {
   return () => {
    Host["set.fn"]({
     [`${this[".name"]}-scroll-x.number`]: `data:text/json,${this["scroll-out-x.number"]}`
    })
   }
  }
 },
 "scroll-name-y.fn": {
  get() {
   return () => {
    Host["set.fn"]({
     [`${this[".name"]}-scroll-y.number`]: `data:text/json,${this["scroll-out-y.number"]}`
    })
   }
  }
 },
 "capture-resize.fn": {
  get() {
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
  }
 },
 "checkout-commit.fn": {
  get() {
   return (commit, meta) => {
    const description = {},
     self = this

    for (const name in commit) {
     const href = commit[name] ?? name,
      get = function () {
       return self["checkout-cell.fn"](href, {
        author: "unnamed child of checkout-commit.fn",
        msg: `Let ${this[".rid"]} fetch ${href} from ${self[".rid"]}.`,
        meta
       })
      }

     get.meta = {
      href,
      msg: `Check out ${name}, which forwards to ${href}.`,
      author: "checkout-commit.fn",
      meta
     }

     description[name] = { get, configurable: true, enumerable: true }
    }

    Object.defineProperties(this, description)
   }
  }
 },
 "toggle-inspector.fn": {
  get() {
   return () => {
    Host["set.fn"]({
     "inspector.bool": !Host["inspector.bool"] + ".bool"
    })
   }
  }
 },
 "toggle-start-menu.fn": {
  get() {
   return () =>
    Host["set.fn"]({
     "start-menu.bool": !Host["start-menu.bool"] + ".bool"
    })
  }
 },
 "toggle-commit-explorer.fn": {
  get() {
   return () => {
    Host["set.fn"]({
     "commit-explorer.bool": !Host["commit-explorer.bool"] + ".bool"
    })
   }
  }
 },

 "os.css": {
  get() {
   return `:host { position: fixed; top: 0; left: 0; width: 100%; box-sizing: border-box; height: 100%; margin: 0; display: grid; grid-template-rows: 1fr ${
    this["branch.fn"]("taskbar", undefined, {
     author: "os.css",
     msg: "I need to get the taskbar's height..."
    })["height.number"]
   }; font: 11px / 16px sans-serif; }`
  }
 },
 "item.css": {
  get() {
   return `:host {
     cursor: pointer;
     text-overflow: ellipsis;
     white-space: nowrap;
     overflow: hidden;
     min-height: 24px;
     line-height: 24px;
     ${this["ignore.bool"] ? "opacity: 25%;" : ""}
     ${
      this["output.bool"]
       ? `font-weight: 800;
     color: ${this["theme.color"]};
     background-color: #b74`
       : ""
     }
    }

    ${
     this["ignore.bool"]
      ? `:host::after {
     content: " = Core[k]";
    }`
      : ""
    }
    span {
     display: inline-block;
     width: 24px;
     height: 24px;
     font-size: 17px;
     line-height: 24px;
     text-align: center;
    }
    :host${Host["item.rid"] === this["item.rid"] ? "" : "(:hover)"} {
     background: ${this["shade-theme.fn"]()};
    }`
  }
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
    background: ${this["theme.color"]};
    padding-${this["pill-icon-right.bool"] ? "left" : "right"}: 12px;
   }`
  }
 },
 "title.css": {
  get() {
   return `:host {
    margin: 0;
    display: block;
    font-weight: 600;
    padding: 4px;
    text-transform: uppercase;
    color: white;
    background: ${this["theme.color"]};
   }`
  }
 },
 "empty.css": {
  get() {
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
    color: white;
    opacity: 25%;
   }`
  }
 },
 "status.css": {
  get() {
   return `:host {
    display: flex;
    flex-flow: row nowrap;
    background: ${this["shade-theme.fn"](0.2)};
   }`
  }
 },
 "header.css": {
  get() {
   return `:host {
    display: flex;
    flex-flow: row;
    padding: 32px;
    box-sizing: border-box;
    background: ${this["shade-theme.fn"](0.8)};
    color: ${this["theme.color"]};
   }`
  }
 },
 "host-rid.css": {
  get() {
   return this["stat.css"] + this["flex-spacer.css"]
  }
 },
 "error404.css": {
  get() {
   return `:host {
    background: tomato;
    box-sizing: border-box;
    border: 0.5px dashed #821;
   }`
  }
 },
 "portfolio.css": {
  get() {
   return `:host {
    --w: ${this["tile-width.number"] ?? 14}px;
    --h: ${this["tile-height.number"] ?? 14}px;
    box-sizing: border-box;
    gap: var(--h);
    padding: calc(var(--w) * 4.5) calc(var(--h) * 4.5);
    display: flex;
    flex-flow: row nowrap;
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
   core-parts,
   pilot-parts,
   orenjinari-com {
    position: relative;
    width: calc(var(--w) * 40);
    height: calc(var(--h) * 30);
    border-radius: 7px;
    overflow: hidden;
   }`
  }
 },
 "core.parts.css": {
  get() {
   return `:host {
    --system-ui: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font: 13px var(--system-ui);
    margin: 0;
    padding: 0;
    display: grid;
    grid-template:
     "${this["sidebar-open.bool"] ? "sbar " : ""}art" auto
     "${this["sidebar-open.bool"] ? "stat " : ""}stat" 32px / ${
    this["sidebar-open.bool"] ? `${this["sidebar-width.number"]}px ` : ""
   }1fr;
    }
    ${this["sidebar-open.bool"] ? "sidebar- { grid-area: sbar }" : ""}
    status- { grid-area: stat }
    commit-editor, commit-explorer { grid-area: art }`
  }
 },
 "start-menu.css": {
  get() {
   return `:host {
       position: relative;
       min-width: 164px;
       display: flex;
       flex-flow: column nowrap;
       position: absolute;
       left: 2px;
       bottom: calc(${
        this["branch.fn"]("taskbar", undefined, {
         author: "start-menu.css",
         msg: "Just need the height of the taskbar."
        })["height.number"]
       } - 4px);
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
  }
 },
 "background.css": {
  get() {
   return `:host { color: white; padding: 12px; background: ${this["theme.color"]} }`
  }
 },
 "flex-spacer.css": {
  get() {
   return `:host { flex: 1 1 }`
  }
 },
 "test-canvas.css": {
  get() {
   const { width, height } = this["size.json"] ?? { width: 640, height: 480 },
    standardHeight = Math.min(256, height),
    aspect = width / height,
    scale = standardHeight / height

   console.log("compute size here", {
    standardHeight,
    width,
    height,
    aspect,
    scale
   })

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
  }
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
  }
 },
 "menu-buttons.css": {
  get() {
   return `:host {
    display: flex;
    flex-flow: column nowrap;
    gap: 4px;
    padding: 4px;
    background: ${this["shade-theme.fn"]()};
   }`
  }
 },
 "mini-browser.css": {
  get() {
   const { width = 300, height = 150 } = this["size.json"] ?? {},
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
    height: ${standardHeight}px;
   }`
  }
 },
 "commit-editor.css": {
  get() {
   return `:host{
    overflow: hidden;
    display: grid;
    grid-template:
     "t${this["inspector.bool"] ? ` i` : ""}" 1fr
     "t${this["inspector.bool"] ? ` v` : ""}" 1fr / 1fr${
    this["inspector.bool"] ? ` ${this["inspector-width.number"]}px` : ""
   };
    height: 100%;
    background: ${this["shade-theme.fn"](0.4)};
   }
   variants- {
    grid-area: t;
   }
   inspector- {
    grid-area: i;
   }
   property-chat {
    grid-area: v;
   }`
  }
 },
 "property-chat.css": {
  get() {
   return `:host {
    background: ${this["theme.color"]};
    display: flex;
    flex-flow: column nowrap;
    overflow: hidden;
    position: relative;
    box-shadow: inset 0 20px 20px -20px #0007;
    justify-items:
   }`
  }
 },
 "orenjinari.com.css": {
  get() {
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
  }
 },
 "message-bubble.css": {
  get() {
   return `:host {
    position: relative;
    height: min-content;
    padding: 8px;
    min-height: 1em;
    border-radius: 16px;
    background: silver;
    color: ${this["theme.color"]};
   }
   line- {
    width: 100%;
   }`
  }
 },
 "unicode-button.css": {
  get() {
   return `:host { cursor: pointer; border-radius: 4px; line-height: 32px; width: 32px; font-size: 32px; aspect-ratio: 1 / 1; height: 32px; text-align: center; } :host(:hover) { background: ${this["theme.color"]}; color: white }`
  }
 },
 "property-chat-box.css": {
  get() {
   return `:host {
    background: ${this["theme.color"]};
    display: flex;
    flex-flow: column-reverse nowrap;
    padding: 16px;
    gap: 16px;
    overflow: hidden;
    overflow-y: auto;
    position: relative;
    box-shadow: inset 0 20px 20px -20px #0007;
    box-sizing: border-box;
    flex: 1 1;
   }`
  }
 },
 "commit-list-item.css": {
  get() {
   return `:host {
     cursor: pointer;
     text-overflow: ellipsis;
     white-space: nowrap;
     overflow: hidden;
     min-height: 24px;
     line-height: 24px;
     box-sizing: border-box;
     padding: 12px;
     border-radius: 8px;
    }
    :host${
     Host["selected-commit.name"] === this["selected-commit.name"]
      ? ""
      : "(:hover)"
    } {
     background: ${this["shade-theme.fn"](0.4)};
    }`
  }
 },

 "os.names": {
  get() {
   return [
    "desktop",
    "taskbar",
    ...(this["windows.names"] ?? []),
    ...(this["start-menu.bool"] ? [`start-menu`] : []),
    ...(this["context-menu.bool"] ? [`context-menu`] : [])
   ]
  }
 },
 "tray.names": {
  get() {
   return ["factory-reset", "fullscreen", "clock"]
  }
 },
 "zero.names": {
  get() {
   return []
  }
 },
 "empty.names": {
  get() {
   return ["empty-icon"]
  }
 },
 "status.names": {
  get() {
   return ["memory", "host-rid", "version"]
  }
 },
 "search.names": {
  get() {
   return ["search-icon", "search-input"]
  }
 },
 "header.names": {
  get() {
   return ["title", "search", "filters", "add"]
  }
 },
 "taskbar.names": {
  get() {
   return ["start-button", ...(this["apps.names"] ?? []), "flex-spacer", "tray"]
  }
 },
 "message.names": {
  get() {
   return ["message-author", this["msg.rid"] ?? "message-content"]
  }
 },
 "sidebar.names": {
  get() {
   return [
    "commit-explorer-button",
    ...(this["commit-explorer.bool"] ? [] : ["inspector-button"]),
    "flex-spacer",
    "reset-button"
   ]
  }
 },
 "variants.names": {
  get() {
   return [
    "title",
    `mini-browser?title.txt=data:,Default Form&input.names=${this[
     "packNames.fn"
    ]([
     (console.log(this["selected-commit.name"]), this["selected-commit.name"])
    ])}`,
    ...(Core["branch.fn"](this["selected-commit.name"])?.[".variants"]?.map(
     ([name, names, { width = 300, height = 150 } = {}]) =>
      `mini-browser?title.txt=data:,${name}&size.json=data:text/json,${JSON.stringify(
       {
        width,
        height
       }
      )}&input.names=${this["packNames.fn"](names)}`
    ) ?? [])
   ]
  }
 },
 "portfolio.names": {
  get() {
   return [
    `core.parts?${[
     "inspector.bool",
     "selected-commit.name",
     "commit-explorer.bool",
     "item.rid",
     "inspector-scroll-y.number",
     "commit-explorer-scroll-y.number",
     "variants-scroll-y.number",
     "property-chat-scroll-y.number",
     "sidebar-open.bool"
    ].join("&")}`,
    "pilot.parts",
    "orenjinari.com"
   ]
  }
 },
 "inspector.names": {
  get() {
   return [
    "title",
    ...Object.entries(
     Core["branch.fn"](this["selected-commit.name"])["property.columns"]
    ).map(
     ([n, { get }]) =>
      `inspector-item?item.rid=data:text/name,${n}${
       get.meta?.ignore ? `&ignore.bool=true.bool` : ""
      }${get.meta?.output ? `&output.bool=true.bool` : ""}`
    )
   ]
  }
 },
 "start-menu.names": {
  get() {
   return [
    "locate",
    "relate",
    "debate",
    "horizontal-line-1",
    "welcome",
    "horizontal-line-2",
    "save-computer",
    "restart-computer",
    "restart-server"
   ]
  }
 },
 "core.parts.names": {
  get() {
   return [
    this["commit-explorer.bool"] ? "commit-explorer" : "commit-editor",
    "status",
    ...(this["sidebar-open.bool"] ? ["sidebar"] : [])
   ]
  }
 },
 "column-code.names": {
  get() {
   const lines = this["property.columns"][this["source.rid"]].get
    .toString()
    .split(/\r\n|\r|\n/g)
   return lines.map(
    (line, index) =>
     `line?index.number=data:text/json,${index}&content.txt=data:,${line.replaceAll(
      `&`,
      `TEMP-AMPERSAND`
     )}`
   )
  }
 },
 "mini-browser.names": {
  get() {
   return ["title", `test-canvas?index.names=input.names`]
  }
 },
 "commit-editor.names": {
  get() {
   const name = this["selected-commit.name"]

   if (!name) return ["empty"]

   return [
    "variants",
    ...(this["inspector.bool"] ? ["inspector", "property-chat"] : [])
   ]
  }
 },
 "property-chat.names": {
  get() {
   return ["title", "property-chat-box"]
  }
 },
 "orenjinari.com.names": {
  get() {
   return [
    "nari-artwork",
    "nari-recent?index.number=data:text/json,0",
    "nari-recent?index.number=data:text/json,1",
    "nari-recent?index.number=data:text/json,2"
   ]
  }
 },
 "commit-list.names": {
  get() {
   const makeItem = name =>
     `commit-list-item?selected-commit.name=data:text/name,${name}`,
    columnEntries = Object.entries(Columns),
    reducer = (rids, [name]) => {
     if (name.endsWith(".commit")) rids.push(makeItem(name.slice(0, -7)))

     return rids
    }
   return columnEntries.reduce(reducer, [makeItem("Core")])
  }
 },
 "property-chat-box.names": {
  get() {
   const name = this["selected-commit.name"],
    repo = Core["branch.fn"](name, undefined, {
     author: "property-chat.names",
     msg: `Branch off to ${name} in order to inspect it.`
    }),
    itemName = this["item.rid"],
    columns = repo["property.columns"],
    column = columns[itemName]

   if (column) {
    const { get } = column

    let meta = get.meta ?? META,
     names = [
      `message?author.txt=data:,${meta.author}&msg.rid=data:text/name,column-code?source.rid=data:text/name,${itemName}`
     ]

    while (meta) {
     names.push(
      `message?author.txt=data:,${meta.author}&msg.txt=data:,${meta.msg}`
     )
     meta = meta.meta
    }

    return names
   } else {
    return ["empty"]
   }
  }
 },

 "version.number": {
  get() {
   return 57 / 1000
  }
 },
 "host-size.number": {
  get() {
   return Host[".rid"].length
  }
 },
 "host-memory.number": {
  get() {
   return ("https://" + Host[".rid"]).length / 20.48
  }
 },
 "scroll-out-x.number": {
  get() {
   return this[".node"].scrollLeft
  }
 },
 "scroll-out-y.number": {
  get() {
   return this[".node"].scrollTop
  }
 },
 "sidebar-width.number": {
  get() {
   return 42
  }
 },
 "branch-length.number": {
  get() {
   return this["reduceChain.fn"](k => k++, 0)
  }
 },
 "inspector-width.number": {
  get() {
   return 256
  }
 },

 "item.htm": {
  get() {
   return `<span>${this["item-icon.txt"]}</span>${this["item.rid"]}`
  }
 },
 "title.htm": {
  get() {
   return `${this["title.txt"] ?? "Untitled"}`
  }
 },
 "error404.htm": {
  get() {
   return `404`
  }
 },
 "bootstrap.htm": {
  get() {
   return BOOTSTRAP
  }
 },
 "host-memory.htm": {
  get() {
   return Math.trunc(this["host-memory.number"]) + " %"
  }
 },
 "sanitize-msg.htm": {
  get() {
   return this["msg.txt"]?.replaceAll("<", `&lt;`).replaceAll(">", `&gt;`)
  }
 },

 "time.txt": {
  get() {
   setTimeout(() => this["signal.fn"](), 60005 - (Date.now() % 60000))
   return new Date().toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h12"
   })
  }
 },
 "trace.txt": {
  get() {
   return this["reduceChain.fn"]((t, r) => t + `\n\tat ${r[".rid"]}`, "")
  }
 },
 "prefix.txt": {
  get() {
   return (
    (this["force-refresh.bool"]
     ? "FORCED-"
     : this["original.bool"]
     ? "HTTPS-"
     : "") +
    (this["server.bool"] ? "SERVER-" : "CLIENT-") +
    BOOT_TIME
   )
  }
 },
 "item-icon.txt": {
  get() {
   return (
    {
     fn: "ƒ",
     js: "📃",
     css: "📄",
     htm: "📄",
     txt: "📄",
     rid: "⎋",
     tag: "🏷",
     bool: "⏼",
     html: "📄",
     test: "🧪",
     color: "🌈",
     names: "🧒",
     layout: "🍱",
     number: "ℕ",
     commit: "🗃"
    }[this["item.extension"]] ?? "#"
   )
  }
 },
 "name-delim.txt": {
  get() {
   return ";"
  }
 },
 "meta-name-delim.txt": {
  get() {
   return "%25"
  }
 },
 "escaped-name-delim.txt": {
  get() {
   return "%3B"
  }
 },

 "true.bool": {
  get() {
   return true
  }
 },
 "false.bool": {
  get() {
   return false
  }
 },
 "isFile.bool": {
  get() {
   return this[".name"] in this
  }
 },
 "server.bool": {
  get() {
   return (
    typeof WorkerGlobalScope !== "undefined" &&
    self instanceof WorkerGlobalScope
   )
  }
 },

 "status.layout": {
  get() {
   return ["status-layout"]
  }
 },
 "sidebar.layout": {
  get() {
   return ["menu-buttons-layout"]
  }
 },
 "flex-spacer.layout": {
  get() {
   return ["flex-spacer-layout"]
  }
 },

 "theme.color": {
  get() {
   return `#333445`
  }
 },

 ".extension": {
  get() {
   return this["isFile.bool"] && this[".name"].split(".").at(-1)
  }
 },
 "item.extension": {
  get() {
   return this["item.rid"] in this && this["item.rid"].split(".").at(-1)
  }
 },

 "icon.png": {
  get() {
   return "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"
  }
 },
 "blue-grid.png": {
  get() {
   return "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"
  }
 },

 ".rid": {
  get() {
   return this[".name"] + (this === Core ? "" : this["workingTree.search"])
  }
 },

 ".tag": {
  get() {
   return this["toTag.fn"](this[".name"])
  }
 },

 "toTag.fn": {
  get() {
   return name => {
    name = name.replaceAll(/[^a-zA-Z0-9]+/g, "-")

    if (!name.includes("-")) name += "-"

    return name
   }
  }
 },

 ".name": {
  get() {
   return `Core`
  }
 },

 ".node": {
  get() {
   return this["ownNode.fn"]()
  }
 },

 "script.js": {
  get() {
   return `(globalThis.Columns = {${Object.entries(Columns).map(
    ([name, { get }]) => `\n "${name}": {\n  ${get}\n }`
   )}\n})["boot.fn"].get()()`
  }
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
      htm: "text/html; charset=UTF-8",
      html: "text/html; charset=UTF-8"
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
    body = encoder.encode(Core["bootstrap.htm"])
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

 "manifest.uri": {
  get() {
   return `https://${location.host}/manifest.json`
  }
 },

 "ignore.names": {
  get() {
   return [
    ".tag",
    ".variants",
    "index.htm",
    "style.css",
    "layout.css",
    "onclick.fn",
    ".stylesheet",
    "index.names",
    "onresize.fn",
    "style.layout",
    "tabindex.number",
    "onpointerdown.fn"
   ]
  }
 },

 "manifest.json": {
  get() {
   return JSON.stringify({
    name: Host[".name"].split(".")[0],
    short_name: Host[".name"],
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
 },

 "property.columns": {
  get() {
   return this["reduceChain.fn"]((columns, repo) => {
    const repoColumns = Object.getOwnPropertyDescriptors(repo)

    for (const filename in repoColumns)
     if (!(filename in columns)) columns[filename] = repoColumns[filename]

    return columns
   }, {})
  }
 },

 "workingTree.search": {
  get() {
   const search = Object.entries(this["workingTree.commit"])
    .map(e => e.join("="))
    .join("&")
   return search ? "?" + search : ""
  }
 }
})["boot.fn"].get()()
