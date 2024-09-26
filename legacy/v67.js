/* COPYRIGHT 2024 - Eric Augustinowicz
 * This project is under development.
 * It is designed and maintained by me.
 * All code and content is owned by me.
 * Do not copy or use it in any form.
 * Do not use - it is not ready for the public.
 * Thank you. */

Object.defineProperties(Node.prototype, {
 updateChild: {
  value(index, thing) {
   if (this.childNodes[index]) this.childNodes[index].update(thing)
   else {
   }
  }
 },
 update: {
  value(thing) {
   if (!(this instanceof Text)) {
    let container = this.shadowRoot ?? this
    style: {
     const { value: css, changed: cssChanged } = thing["style.css"]?.build() ?? {}
     if (cssChanged) {
      if (this === document.body) {
       let style = this.getElementById("#style")
       if (!css) {
        if (style) style.remove()
        break style
       }
       if (!style) {
        style = this.head.appendChild(this.createElement("style"))
        style.id = "style"
       }
       style.innerHTML = css.replaceAll(":host", "body")
       break style
      }
      let shadow = this.shadowRoot
      if (!css) {
       if (shadow) console.warn("handle dettaching a shadow here")
       break style
      }
      if (!shadow) {
       shadow = this.attachShadow({ mode: "open" })
      }
      container = shadow
      const sheet = (shadow.adoptedStyleSheets[0] ??= new CSSStyleSheet())
      sheet.replaceSync(css)
     }
    }
    const { value: attributes, changed: attributesChanged } = thing[".attributes"]?.build() ?? {}
    if (attributesChanged) {
     if (this.hasAttributes())
      for (const { name } of [...this.attributes]) if (!(attributes && name in attributes)) this.removeAttribute(name)
     if (attributes)
      for (const name in attributes)
       if (!this.hasAttribute(name) || this.getAttribute(name) !== attributes[name])
        this.setAttribute(name, attributes[name])
    }
   }
   content: {
    const { value, changed } = thing["content.txt"]?.build() ?? {}
    if (value) {
     if (changed) {
      if (this instanceof Text) this.nodeValue = value
      else container.textContent = value
     }
    } else {
     if (this instanceof Text) {
      if (changed) this.nodeValue = ""
      break content
     }
     const { value } = thing["index.children"]?.build() ?? {}
     if (value) {
      // todo: find a way to identify only those children who must change - an ad-hoc part per node?
      value.forEach((id, i) => {
       const index = id.indexOf("#"),
        thingname = index >= 0 ? id.slice(0, index) : id,
        hash = index >= 0 ? id.slice(index) : null
       if (!(thingname in thing))
        throw ReferenceError(`404: no "${thingname}" on "${thing[Symbol.for("path")].join("/")}".`)
       let subthing = thing[thingname].build().value
       if (hash) subthing = subthing[Symbol.for("fork")](hash)
       container.updateChild(i, subthing)
      })
      while (container.childNodes.length > value.length) container.childNodes[container.childNodes.length - 1].remove()
     }
    }
   }
   for (const eventname of thing[Symbol.for("events")]) {
    const { value: ƒ, changed } = thing[eventname].build() ?? {}
    if (changed) this[`on${eventname}`] = ƒ ? e => Engine.place.set(ƒ(e)) : null
   }
  }
 }
})
Object.defineProperties(History.prototype, {
 setAddress: {
  value() {
   delete this.navigationBuffer
   delete this.navigationAutoCapture
   this.replaceState({}, null, place.href)
  }
 },
 update: {
  value() {
   if (this.navigationBuffer) clearTimeout(this.navigationBuffer)
   if (!this.navigationAutoCapture) this.navigationAutoCapture = Date.now()
   else {
    if (Date.now() - this.navigationAutoCapture > 240) this.setAddress()
    else navigationBuffer = setTimeout(this.setAddress(), 120)
   }
  }
 }
})
Object.defineProperties(Document.prototype, {
 create: {
  value(tagName) {
   if (tagName === "#text") return this.createTextNode("")
   try {
    return this.createElement(tagName)
   } catch {
    console.warn(`Invalid tag "${tagName}". Defaulting to "div".`)
   }
   return this.createElement("div")
  }
 }
})
class Part {
 static changes = new Set()
 build() {
  this.servers.forEach(server => server.build())
  if (this.disruptors.size) {
   this.disruptors.clear()
   this.rebuild()
  }
  return [this.cache, Part.changes.has(this)]
 }
 import(part) {
  if (!this.servers.has(part)) {
   part.clients.add(this)
   this.servers.add(part)
  }
  return part.build().value
 }
 rebuild() {
  const value = this.action(this.argument)
  if (value === this.cache) this.clients.forEach(client => client.undisrupt(this))
  else {
   this.cache = value
   Part.changes.add(this)
  }
 }
 disrupt(disruptor = this) {
  this.disruptors.add(disruptor)
  this.clients.forEach(client => client.disrupt(this))
 }
 undisrupt(disruptor) {
  this.disruptors.delete(disruptor)
  this.clients.forEach(client => client.undisrupt(this))
 }
 constructor(name, action, parent = null) {
  this.name = name
  this.path = parent?.[Symbol.for("path")] ?? ""
  this.parent = parent
  this.action = action
  this.clients = new Set()
  this.servers = new Set()
  this.thingname = thing?.[Symbol.for("thingname")] ?? ""
  this.disruptors = new Set([this])
  this.argument = new Proxy(parent ?? {}, {
   get: (target, request) => {
    if (typeof request === "symbol") return this[request.description]
    const path = request.split("/")
    while (path.length) {
     const name = path.shift()
     if (name in target) target = this.import(target[name])
     else throw new RangeError(`no "${name}" on "${target[Symbol.for("path")]}" [as "${request}" on "${this.path}"]`)
    }
    return target
   }
  })
 }
}
class Engine {
 static part = new Part(
  "",
  () =>
   new Thing("", {
    "t:": {
     "client.number": () => Engine.time.data.client,
     "global.number": () => Engine.time.data.global,
     "origin.number": () => performance.timeOrigin
    },
    "u:": {
     "hash.txt": () => Engine.place.data.hash,
     "host.txt": () => Engine.place.data.host,
     "href.txt": () => Engine.place.data.href,
     "path.txt": () => Engine.place.data.pathname,
     "query.txt": () => Engine.place.data.search,
     "search.params": () => Engine.place.data.searchParams,
     ".record": ({ "search.params": S, [Symbol.for("cache")]: cache }) => {
      console.log("creating a new object...", cache)
      return Object.fromEntries(S.entries())
     },
     "max-place.number": () => 2048
    }
   })
 )
 static place = {
  set(record = {}) {
   const there = {
    string: () => new URL(record, this.data),
    object: () => {
     const there = new URL(this.data)
     for (const key in record) {
      const value = record[key]
      if (value === null) there.searchParams.delete(key)
      else {
       there.searchParams.set(key, value)
       there.searchParams.sort()
      }
     }
     return there
    }
   }[typeof record]()
   if (this.data.href !== there.href) {
    this.data = there
    const thing = this.part.build().value
    thing["hash.txt"].disrupt()
    thing["host.txt"].disrupt()
    thing["href.txt"].disrupt()
    thing["path.txt"].disrupt()
    thing["query.txt"].disrupt()
    thing["search.params"].disrupt()
    history.update()
   }
  }
 }
 static set time(dt) {
  this.data = dt
  const thing = this.part.build().value
  thing["client.number"].disrupt()
  thing["global.number"].disrupt()
  document.body.update(Space.part.build().value)
  Part.changes.clear()
  requestAnimationFrame(dt => this.set(dt))
 }
}
class Space {
 static part = new Thing("c:", {
  "nontag.regex": () => /[^a-zA-Z0-9]+/g,
  "theme.color": () => "#333445",
  "version.number": () => 67 / 1000,
  "tag.txt": ({ [Symbol.for("thingname")]: p, "nontag.regex": r }) => (r.test(p) ? p.replaceAll(r, "-") : p + "-"),
  "index.children": () => ["header", "shelf", "part-list", "status"],
  "style.css": ({ "c:/theme.color": bg, "shelf/height.number": height }) => `:host {
  --system-ui: system-ui, "Segoe UI", Roboto, Helvetica, Arial,
   sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  background: ${bg};
  font: 13px var(--system-ui);
  margin: 0;
  overflow: hidden;
  padding: 0;
  display: grid;
  color: white;
  grid-template: "header" auto "shelf" ${height}px "main" 1fr "status" 32px / 100%;
 }
 :host > ul {
  margin: 0;
  padding: 24px 52px;
  background: #ecebea;
  color: #333445;
  overflow-y: auto;
  font-size: 17px;
  font-weight: 400;
  font-family: Garamond, Georgia, "Times New Roman", serif;
 }
 :host > ul > li {
  position: relative;
  cursor: pointer;
  text-overflow: ellipsis;
  white-place: nowrap;
  overflow: hidden;
  line-height: 32px;
  box-sizing: border-box;
  justify-content: place-between;
  border-radius: 8px;
  display: flex;
  flex-flow: row;
  padding: 8px;
 }
 :host > ul > li > hr {
  border: none;
  border-bottom: 2.5px dotted #000a;
  flex: 1 1;
  margin: 10px 7px;
 }
 :host > ul > li:hover {
  color: #3334ee;
  font-weight: 600;
 }
 :host > ul > li:hover > hr {
  border-color: #3334ee;
 }`,
  header: {
   "tag.txt": () => "header",
   "style.css": () => `:host {
   justify-content: place-between;
   display: flex;
   flex-flow: row;
   font-size: 24px;
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
   "index.children": () => ["text", "search", "add-part"],
   text: {
    "content.txt": () => "Parts",
    "tag.txt": () => "#text"
   },
   search: {
    field: {
     "tag.txt": () => "input",
     ".attributes": ({ "c:/hash.txt": word }) => ({ type: "search", placeholder: "Search " + word }),
     "index.htm": () => "Search",
     focus: () => () => ({ f: 1 }),
     blur: () => () => ({ f: null })
    },
    "index.children": () => ["field"],
    "tag.txt": () => "search"
   },
   "add-part": {
    "tag.txt": () => "button",
    "content.txt": () => "＋ Create Part"
   }
  },
  shelf: {
   "index.children": () => ["back-button", "crumbs", "refresh-button"],
   "style.css": ({ "padding.number": n }) => `:host {
   display: flex;
   flex-flow: row;
   gap: 4px;
   padding: ${n}px;
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
    click: () => () => location.origin
   },
   "back-button": {
    "content.txt": () => "‹",
    "tag.txt": () => "button",
    click() {
     return () => console.warn("imagine back button here 🤗")
    }
   },
   crumbs: {
    "content.txt": ({ "c:/path.txt": p }) => p,
    "style.css": ({ "../height.number": h, "../padding.number": p }) => `:host {
    background: transparent;
    line-height: ${h - 2 * p}px;
    display: block;
    font-weight: 200;
    font-size: 24px;
   }`
   }
  },
  "part-list": {
   "tag.txt": () => "ul",
   "index.children": ({ "parts.entries": P }) => P.map(([name], i) => `part-list-item#${i.toString(36)}`),
   scroll() {
    return ({ target }) => ({ y: target.scrollTop ? target.scrollTop.toString(36) : null })
   },
   "parts.entries": ({ "c:": root }) => Object.entries(root),
   "part-list-item": {
    "index.children": () => ["name", "spacer", "index"],
    "part.entry": ({ "fork.txt": i, "../parts.entries": P }) => P[parseInt(i, 36)],
    "action.js": ({ "part.entry": [, { action }] }) => action.toString(),
    "tag.txt": () => "li",
    click:
     ({ "fork.txt": f, "c:/.record": { p = "" } }) =>
     () => ({ p: p + f }),
    index: {
     "content.txt": ({ "../fork.txt": i }) => parseInt(i, 36).toString(),
     "tag.txt": () => "#text"
    },
    spacer: {
     "tag.txt": () => "hr"
    },
    name: {
     "content.txt": ({ "../part.entry": [name] }) => name,
     "tag.txt": () => "#text"
    },
    size: {
     "content.txt": ({ "../action.js": js }) => `${js.length} ch`,
     "tag.txt": () => "#text"
    }
   }
  },
  status: {
   "tag.txt": () => "footer",
   "index.children": () => ["address-usage", "address", "version", "clock"],
   "style.css": () => `:host {
   display: flex;
   flex-flow: row;
   gap: 16px;
   padding: 0 16px;
   font-family: monospace;
   color: #fffa;
  }
  :host > * {
   text-overflow: ellipsis;
   white-place: nowrap;
   overflow: hidden;
   display: inline-block;
   line-height: 24px;
   padding: 4px;
  }
  clock- {
   text-align: right;
   flex: 0 0 13ch;
  }
  address- {
   flex: 1 1;
  }`,
   "address-usage": {
    "content.txt": ({ "c:/max-place.number": n, "c:/href.txt": s }) => Math.trunc((s.length * 1000) / n) / 10 + "%"
   },
   address: { "content.txt": ({ "c:/href.txt": h }) => h },
   version: { "content.txt": ({ "c:/version.number": n }) => n },
   clock: { "content.txt": ({ "t:": t }) => t }
  }
 })
}
class Thing {
 // TODO: refactor this. There is currently a dedicated Part per Thing. Remove the Thing middle man and put this behavior directly onto it's host Part.
 constructor(p, actions, parent) {
  const events = []
  this[""] = this
  this[".."] = parent
  this[URL.part.name] = URL.part
  this[Date.part.name] = Date.part
  this[Space.part.name] = Space.part
  this[Symbol.for("p")] = p
  this[Symbol.for("path")] = (parent[Symbol.for("path")] ?? "") + "/" + p
  this[Symbol.for("events")] = events
  this[Symbol.for("actions")] = actions
  this[Symbol.for("fork")] = f => {
   const pf = p + f
   if (pf in parent) return parent[pf].build().value
   const action = () => new Thing(pf, { ...actions, "fork.txt": () => f.slice(1) }, parent),
    part = (parent[pf] = new Part(pf, action, parent))
   return part.build().value
  }
  for (const [p, v] of Object.entries(actions)) {
   // todo: find a way to remove this array and the word "events" - which are node specific - from the Thing class which isn't.
   if (["click", "scroll", "focus", "blur", "pointerdown", "keydown"].includes(p)) events.push(p)
   this[p] = new Part(p, typeof v === "function" ? v : () => new Thing(p, v, this), this)
  }
 }
}

onload = () => {
 Engine.place.set(location.href)
 Engine.time.set(0, Date.now())
}
