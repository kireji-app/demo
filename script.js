const LIB = {
 "hash.txt": ({ 𝑥 }) => 𝑥.hash,
 "host.txt": ({ 𝑥 }) => 𝑥.host,
 "href.txt": ({ 𝑥 }) => 𝑥.href,
 "path.txt": ({ 𝑥 }) => 𝑥.pathname,
 "query.txt": ({ 𝑥 }) => 𝑥.search,
 "time.number": ({ 𝓉 }) => 𝓉,
 "max-url.number": () => 2048,
 "theme.color": () => "#333445",
 "version.number": () => 65 / 1000,
 "index.uri": () => "header shelf part-list status",
 "style.css": ({ "theme.color": bg }) => `:host {
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
    "shelf" ${42 /* todo: get from shelf */}px
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
  }
   
  button {
   border: none;
   cursor: pointer;
  }`,
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
   "tag.txt": () => "search"
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
  "index.uri": () => Array(1000).fill("part-list-item").join(" "),
  onscroll() {
   return this.scrollNameY
  },
  "part-list-item": {
   name: {
    "content.txt"() {
     return "example part"
    }
   },
   size: {
    "content.txt"() {
     return "1234 ch"
    }
   },
   "index.uri": () => "name size",
   onclick() {
    return () => {
     const partName = this["part.name"]
     if (partName.endsWith("/")) {
      const computedPath = this["path.txt"] + partName
      this.goto({
       get "path.txt"() {
        return computedPath
       }
      })
     } else {
      console.warn("open " + partName + " now")
     }
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
   "content.txt": () => "TBD"
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
 static group(parent, delta, ospath = ["c:"]) {
  const partdefmap = Object.assign(
   Object.create(null),
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
  const group = {
   [Symbol.for("partdefmap")]: partdefmap,
   [Symbol.for("ospath")]: ospath,
   [Symbol.for("parent")]: parent
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
 static mutate(href) {
  this.url = new URL(href, this.url)
  this.𝑥.disrupt()
  // this.syncNode(document.body, this.root, "c:")
  this.syncAddressbar()
  // this.changes.clear()
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
 static getSubgroup(group, id) {
  if (id in group) {
   const subgroup = group[id].build().value
   return subgroup
  }
  console.warn('404: no subgroup "' + id + '" in group "' + group[Symbol.for("ospath")] + '".')
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
     const subgroup = this.getSubgroup(group, id)
     if (container.childNodes[i]) this.syncNode(container.childNodes[i], subgroup, id)
     else container.appendChild(this.syncNode(null, subgroup, id))
    })
    while (container.childNodes.length > value.length) container.childNodes[container.childNodes.length - 1].remove()
   }
  }

  return node
 }
 static syncAddressbar() {
  if (this.navigationBuffer) clearTimeout(this.navigationBuffer)
  if (!this.navigationAutoCapture) this.navigationAutoCapture = Date.now()
  else if (Date.now() - this.navigationAutoCapture > 1000) {
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
       return console.warn('404: no part "' + partname + '" in meta group "' + group[Symbol.for("ospath")] + '"', {
        group,
        request
       })
      }
      if (["𝓉", "𝑥"].includes(request)) return this.import(Part[request])
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
         return console.warn('404: no parent for group "' + group[Symbol.for("ospath")] + '".', request)
        }
       }
       while (path.length) {
        const groupname = path.shift()
        if (groupname in group) {
         group = this.import(group[groupname])
         continue
        }
        return console.warn(
         '404: no subgroup "' + groupname + '" in group "' + group[Symbol.for("ospath")] + '".',
         request
        )
       }
      }
      if (partname in group) return this.import(group[partname])

      return console.warn('404: no part "' + partname + '" in group "' + group[Symbol.for("ospath")] + '"', {
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
 Part.mutate(location)
 Part.tick(Date.now())
 /* Debug.
  const ƒ = (href, ƒ) => requestAnimationFrame(() => (Part.mutate(href), ƒ?.()), 1000),
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
