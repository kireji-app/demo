const LIB = {
 "hash.txt": ({ 𝑥 }) => 𝑥.hash,
 "host.txt": ({ 𝑥 }) => 𝑥.host,
 "href.txt": ({ 𝑥 }) => 𝑥.href,
 "path.txt": ({ 𝑥 }) => 𝑥.pathname,
 "query.txt": ({ 𝑥 }) => 𝑥.search,
 "time.number": ({ 𝓉 }) => 𝓉,
 "fork-data.txt": () => "",
 "max-url.number": () => 2048,
 "theme.color": () => "#333445",
 "version.number": () => 66 / 1000,
 "index.uri": () => "header shelf part-list status",
 "style.css": ({ "theme.color": bg, "shelf/height.number": height }) => `:host {
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
   background: ${bg};
   font: 13px var(--system-ui);
   margin: 0;
   overflow: hidden;
   padding: 0;
   display: grid;
   color: white;
   grid-template:
    "header" auto
    "shelf" ${height}px
    "main" 1fr
    "status" 32px / 100%;
  }

  :host > h1 {
   grid-area: header;
  }

  :host > shelf- {
   grid-area: shelf;
  }

  :host > part-list {
   grid-area: main;
  }

  :host > status- {
   grid-area: status;
  }`,
 makeNameScroll() {
  return (groupname, direction = "y") =>
   ({ target }) => {
    scroll = target.scrollTop
    Part.patch𝑥({ [`${groupname}-${direction}`]: scroll })
   }
 },
 makeNameFocus() {
  return (groupname, focus) => () => Part.patch𝑥({ [groupname + "-focus"]: focus })
 },
 header: {
  "tag.txt": () => "h1",
  "style.css": () => `:host {
   justify-content: space-between;
   display: flex;
   flex-flow: row;
   margin: 16px;
   flex: 0 0 min-content;
  }
  :host > search {
   position: relative;
   font-size: 16px;
  }
  :host > search::before {
   content: "🔍";
   position: absolute;
   left: 20px;
   top: 0;
   bottom: 0;
   width: 32px;
   line-height: 32px;
  }
  :host > search > input {
   padding-left: 48px;
   padding-right: 12px;
   background: #5b5c6a;
   border-radius: 16px;
   height: 32px;
   border: none;
   color: white;
  }
  :host > button {
   border: none;
   cursor: pointer;
   border-radius: 16px;
   line-height: 0px;
   vertical-align: baseline;
   display: inline-block;
   background: #3a4;
   height: 0px;
   padding: 16px;
   border: none;
  }`,
  "index.uri": () => "text search add-part",
  text: {
   "content.txt": () => "Parts",
   "tag.txt": () => "#text"
  },
  search: {
   field: {
    "tag.txt": () => "input",
    ".attributes": ({ "hash.txt": word }) => ({ type: "search", placeholder: "Search " + word }),
    "index.htm": () => "Search"
   },
   "index.uri": () => "field",
   "tag.txt": () => "search",
   onfocus: ({ [Symbol.for("groupname")]: name, makeNameFocus }) => makeNameFocus(name, true),
   onblur: ({ [Symbol.for("groupname")]: name, makeNameFocus }) => makeNameFocus(name, false)
  },
  "add-part": {
   "tag.txt": () => "button",
   "content.txt": () => "＋ Create Part"
  }
 },
 shelf: {
  "index.uri": ({ "path.txt": path }) => `${path === "/" ? "" : "back-button "}crumbs refresh-button`,
  "style.css": ({ "padding.number": pad }) => `:host {
    display: flex;
    flex-flow: row;
    gap: 4px;
    padding: ${pad}px;
    background: silver; /* todo: screen theme */
   }

   :host > button {
    border: none;
    cursor: pointer;
    border-radius: 4px;
    line-height: 32px;
    width: 32px;
    font-size: 32px;
    aspect-ratio: 1 / 1;
    height: 32px;
    text-align: center;
   }

   :host > button:hover {
    background: charcoal;
   }

   :host > crumbs- {
    flex: 1 1;
   }`,
  "padding.number": () => 4,
  "height.number": () => 42,
  "refresh-button": {
   "content.txt": () => "⟳",
   "tag.txt": () => "button",
   onclick() {
    return () => {
     location = location.origin
    }
   }
  },
  "back-button": {
   "content.txt": () => "‹",
   "tag.txt": () => "button",
   onclick() {
    return () => {
     const computedPath = this["path.txt"].split("/").slice(0, -2).join("/") + "/"
     this.goto({
      get "path.txt"() {
       return computedPath
      }
     })
    }
   }
  },
  crumbs: {
   "content.txt"() {
    return this["path.txt"]
   },
   "style.css"() {
    return `:host {
     background: transparent;
     line-height: ${this["height.number"] - 2 * this["padding.number"]}px;
     display: block;
     font-weight: 200;
     font-size: 24px;
    }`
   }
  }
 },
 "part-list": {
  "style.css"() {
   return `:host {
    padding: 16px 48px;
    display: flex;
    flex-flow: column;
    background: #eaeaec;
    color: #333445;
    overflow-y: auto;
    font-size: 17px;
    font-weight: 200;
   }`
  },
  "index.uri": ({ "c:": test }) =>
   Object.keys(test)
    .map(partname => `part-list-item#${partname}`)
    .join(" "),
  onscroll() {
   return this.makeNameScroll(this[Symbol.for("groupname")])
  },
  "part-list-item": {
   "name.txt": ({ "fork-data.txt": data }) => data,
   name: { "content.txt": ({ "name.txt": name }) => name },
   size: { "content.txt": () => "1234 ch" },
   "index.uri": () => "name size",
   onclick() {
    return () => {
     if (this["name.txt"].endsWith("/")) Part.patch𝑥({ path: this["path.txt"] + this["name.txt"] })
     else Part.patch𝑥({ part: this["name.txt"] })
    }
   },
   "style.css"() {
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
    :host(:hover) {
     background: #bbb; /* screen theme 0.8 */
    }`
   }
  }
 },
 status: {
  "index.uri": () => "address-usage address version clock",
  "style.css"() {
   return `:host {
    display: flex;
    flex-flow: row;
    gap: 16px;
    padding: 0 16px;
   }
   :host > * {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
    line-height: 24px;
    padding: 3px;
   }
   clock- {
    font-family: monospace;
    text-align: right;
    flex: 0 0 13ch;
   }
   address- {
    flex: 1 1;
   }`
  },
  "address-usage": {
   "content.txt": ({ "max-url.number": max, "href.txt": href }) => Math.trunc((href.length * 1000) / max) / 10 + "%"
  },
  address: {
   "content.txt": ({ "href.txt": h }) => h
  },
  version: {
   "content.txt": ({ "version.number": v }) => v
  },
  clock: {
   "content.txt": ({ "time.number": t }) => t
  }
 },
 [Symbol.for("part")]: null
}
class Part {
 static changes = new Set()
 static group(parent, delta, ospath = ["c:"], record) {
  const partdefmap = Object.assign(
   {},
   parent?.[Symbol.for("partdefmap")] ?? {},
   {
    "index.uri"() {},
    "style.css"() {},
    "tag.txt"() {
     const name = this[Symbol.for("groupname")].replaceAll(/[^a-zA-Z0-9]+/g, "-")
     return name.includes("-") ? name : name + "-"
    },
    "index.children"({ "index.uri": uri }) {
     return uri ? uri.split(" ") : []
    }
   },
   delta
  )
  if (record) {
   console.warn("impliment record here", record)
  }
  const group = {
   // todo: put these onto a meta group, just like we do with parts.
   [Symbol.for("ospath")]: ospath,
   [Symbol.for("parent")]: parent,
   [Symbol.for("groupname")]: ospath.at(-1),
   [Symbol.for("partdefmap")]: partdefmap,
   [Symbol.for("fork")](data) {
    if (Symbol.for(data) in this) return this[Symbol.for(data)]
    console.warn("forking", data)
    return (this[Symbol.for(data)] = Part.group(group, { ...delta, "fork-data.txt": () => data.slice(1) }, [
     ...ospath,
     data
    ]))
   }
  }
  for (const partname in partdefmap) {
   if (typeof partname === "symbol") continue
   const partdef = partdefmap[partname],
    action = typeof partdef === "function" ? partdef : () => Part.group(group, partdef, [...ospath, partname]),
    part = (group[partname] = new Part(partname, action, group))
   if (typeof partdef === "object") partdef[Symbol.for("part")] = part
  }
  return group
 }
 static set𝑥(href) {
  this.url = new URL(href, this.url)
  this.𝑥.disrupt()
  this.syncAddressbar()
 }
 static patch𝑥(record) {
  for (const key in record) {
   this.url.searchParams.set(key, record[key])
   this.url.searchParams.sort()
  }

  // todo: find out why some things don't update without this line
  this.url = new URL(this.url)

  this.𝑥.disrupt()
  this.syncAddressbar()
 }
 static tick() {
  Part.now = Date.now()
  Part.𝓉.disrupt()
  Part.syncNode(document.body, Part.root, "c:")
  Part.changes.clear()
  requestAnimationFrame(Part.tick)
 }
 static setAddressbar() {
  delete this.navigationBuffer
  delete this.navigationAutoCapture
  history.replaceState({}, null, this.url.href)
 }
 static createNode(value) {
  if (value === "#text") return document.createTextNode("")
  try {
   if (!value) throw "no value"
   return document.createElement(value)
  } catch {
   // console.warn('Invalid tag name "' + value + '".')
  }
  return document.createElement("invalid-tag")
 }
 static syncNode(node, group, id) {
  tag: {
   const { value, changed } = group["tag.txt"]?.build() ?? {}
   if (node) {
    if (changed && node !== document.body) {
     const newNode = this.createNode(value)
     node.replaceWith(newNode)
     node = newNode
    }
    break tag
   }
   node = this.createNode(value)
   node._id = id
  }

  let container = node.shadowRoot ?? node

  style: {
   if (node instanceof Text) break style
   const { value, changed } = group["style.css"]?.build() ?? {}
   if (changed) {
    if (node === document.body) {
     let style = document.getElementById("#style")
     if (!value) {
      if (style) style.remove()
      break style
     }
     if (!style) {
      style = document.head.appendChild(document.createElement("style"))
      style.id = "style"
     }
     style.innerHTML = value.replaceAll(":host", "body")
     break style
    }
    let shadow = node.shadowRoot
    if (!value) {
     if (shadow) console.warn("handle dettaching a shadow here...")
     break style
    }
    if (!shadow) {
     shadow = node.attachShadow({ mode: "open" })
    }
    container = shadow
    const sheet = (shadow.adoptedStyleSheets[0] ??= new CSSStyleSheet())
    sheet.replaceSync(value)
   }
  }

  attributes: {
   if (node instanceof Text) break attributes
   const { value, changed } = group[".attributes"]?.build() ?? {}
   if (changed) {
    if (node.hasAttributes())
     for (const { name } of [...node.attributes]) if (!(value && name in value)) node.removeAttribute(name)
    if (!value) break attributes
    for (const name in value) {
     if (node.hasAttribute(name) && node.getAttribute(name) === name[value]) continue
     node.setAttribute(name, value[name])
    }
   }
  }

  content: {
   const { value, changed } = group["content.txt"]?.build() ?? {}
   if (value) {
    if (changed) {
     if (node instanceof Text) node.nodeValue = value
     else container.textContent = value
    }
    return node
   }
  }

  children: {
   if (node instanceof Text) break children
   const { value } = group["index.children"]?.build() ?? {}
   if (value) {
    value.forEach((id, i) => {
     const index = id.indexOf("#"),
      groupname = index >= 0 ? id.slice(0, index) : id,
      hash = index >= 0 ? id.slice(index) : null
     if (!(groupname in group))
      return console.warn(`404: no subgroup "${groupname}" in group "${group[Symbol.for("ospath")].join("/")}".`, {
       group,
       groupname
      })
     let subgroup = group[groupname].build().value
     if (hash) subgroup = subgroup[Symbol.for("fork")](hash)
     if (container.childNodes[i]) this.syncNode(container.childNodes[i], subgroup, groupname)
     else container.appendChild(this.syncNode(null, subgroup, groupname))
    })
    while (container.childNodes.length > value.length) container.childNodes[container.childNodes.length - 1].remove()
   }
  }

  events: {
   for (const eventname of ["click", "scroll", "focus", "blur", "pointerdown", "keydown"]) {
    const { value, changed } = group["on" + eventname]?.build() ?? {}
    if (changed) node["on" + eventname] = value
   }
  }

  return node
 }
 static syncAddressbar() {
  if (this.navigationBuffer) clearTimeout(this.navigationBuffer)
  if (!this.navigationAutoCapture) this.navigationAutoCapture = Date.now()
  else if (Date.now() - this.navigationAutoCapture > 240) {
   this.setAddressbar()
   return
  }
  this.navigationBuffer = setTimeout(() => this.setAddressbar(), 120)
 }
 static 𝑥 = new Part("𝑥", () => Part.url)
 static 𝓉 = new Part("𝓉", () => Part.now)
 static core = new Part("core", () => Part.group(null, LIB))
 static root = Part.core.build().value
 constructor(partname, action, group = null) {
  this.partname = partname
  this.action = action
  this.group = group
  this.clients = new Set()
  this.servers = new Set()
  this.disruptors = new Set([this])
 }
 get meta() {
  const { partname, group } = this,
   groupPath = group?.[Symbol.for("ospath")] ?? []
  Object.defineProperty(this, "meta", {
   value: Part.group(
    group,
    {
     groupname() {
      return groupPath.at(-1)
     },
     partname() {
      return partname
     },
     ospath() {
      return groupPath
     },
     partpath() {
      return [...groupPath, partname]
     }
    },
    [...groupPath, Symbol.for("meta")]
   )
  })
  return this.meta
 }
 build() {
  if (this.servers.size)
   [...this.servers].forEach(part => {
    if (part.disruptors.size) part.build()
   })

  if (this.disruptors.size) {
   this.disruptors.clear()
   const thisArg = new Proxy(this.group ?? Object.create(null), {
     get: (group, request) => {
      if (typeof request === "symbol") {
       const partname = request.description
       group = this.meta
       if (partname in group) return this.import(group[partname])
       return console.warn(`404: no part "${partname}" in meta group "${group[Symbol.for("ospath")].join("/")}".`, {
        group,
        request
       })
      }
      if (["𝓉", "𝑥"].includes(request)) return this.import(Part[request])
      if (request === "c:") return this.import(Part.core)
      const path = request.split("/"),
       partname = path.pop()
      if (path.length) {
       if (path[0] === "https:") {
        path.shift()
        path.shift()
        return console.warn("503: not handling web paths yet.", request)
       } else if (path[0] === "c:") {
        path.shift()
        group = this.import(Part.core)
       } else {
        while (path[0] === "..") {
         const parentGroup = group[Symbol.for("parent")]
         if (parentGroup) {
          path.shift()
          group = this.import(parentGroup[Symbol.for("part")])
          continue
         }
         return console.warn(`404: no parent for group "${group[Symbol.for("ospath")]}".`, { request })
        }
       }
       while (path.length) {
        const groupname = path.shift()
        if (groupname in group) {
         group = this.import(group[groupname])
         continue
        }
        return console.warn(`404: no subgroup "${groupname}" in group "${group[Symbol.for("ospath")].join("/")}".`, {
         group,
         request
        })
       }
      }
      if (partname in group) return this.import(group[partname])

      return console.warn(`404: no part "${partname}" in group "${group[Symbol.for("ospath")].join("/")}".`, {
       group,
       request
      })
     }
    }),
    value = this.action.call(thisArg, thisArg)
   if (value === this.cache) {
    this.clients.forEach(client => client.undisrupt(this))
   } else {
    this.cache = value
    Part.changes.add(this)
   }
  }
  return {
   value: this.cache,
   changed: Part.changes.has(this)
  }
 }
 import(part) {
  if (!this.servers.has(part)) {
   // This one is critical.
   part.clients.add(this)
   this.servers.add(part)
  }
  return part.build().value
 }
 disrupt(disruptor = this) {
  this.disruptors.add(disruptor)
  this.clients.forEach(client => client.disrupt(this))
 }
 undisrupt(disruptor) {
  this.disruptors.delete(disruptor)
  this.clients.forEach(client => client.undisrupt(this))
 }
}
onload = () => {
 Part.set𝑥(location)
 Part.tick(Date.now())
 /* Debug.
  const ƒ = (href, ƒ) => requestAnimationFrame(() => (Part.set𝑥(href), ƒ?.()), 1000),
   testLoop = () =>
    ƒ(`##text`, () =>
     ƒ(`#h1`, () =>
      ƒ(`#pre`, () =>
       ƒ(`#article`, () =>
        ƒ(`#subtitle`, () =>
         ƒ(`#head`, () =>
          ƒ(`#html`, () =>
           ƒ(`#body`, () =>
            ƒ(`#!DOCTYPE`, () =>
             ƒ(`#i`, () => ƒ(`#b`, () => ƒ(`#u`, () => ƒ(`#input`, () => ƒ(`##h3`, () => testLoop())))))
            )
           )
          )
         )
        )
       )
      )
     )
    )
  testLoop()
 */
}
