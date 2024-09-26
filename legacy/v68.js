class Engine {
 static {
  const data = { time: 0, ticks: 0, delta: 0, href: location.href },
   disrupt = (a, b = a) => {
    a.#disruptors.add(b)
    a.#clients.forEach(c => disrupt(c, b))
   },
   undisrupt = (a, b = a) => {
    a.#disruptors.delete(b)
    a.#clients.forEach(c => undisrupt(c, b))
   },
   evaluate = o => {
    if (o.#type === "object") return o
    o.#servers.forEach(evaluate)
    if (o.#disruptors.size) {
     const value = o.#config ? o.#config(o.#argument, o.#cache, o.#disruptors) : undefined
     if (value === o.#cache) undisrupt(o)
     else {
      o.#cache = value
      changes.add(o)
     }
     o.#disruptors.clear()
    }
    return o.#cache
   },
   Part = (name, config, parent) => {
    const o = new Engine()
    let meta
    Object.defineProperties(o, {
     "": { get: () => o },
     ".": {
      get: () =>
       (meta ??= Part(
        ".",
        {
         "name.txt": () => name,
         ".config": () => config,
         "type.txt": () => type,
         "path.txt": () => path,
         "exists.bool": () => !!config
        },
        o
       ))
     },
     "..": { get: () => parent },
     "c:": { get: () => content },
     "e:": { get: () => engine }
    })
    const i = name.indexOf("#")
    if (i === -1) o.#name = name
    else {
     o.#name = name.slice(0, i)
     o["fork.txt"] = name.slice(i + 1)
    }
    o.#config = config
    o.#type = typeof config
    o.#path = (parent ? parent.#path + "/" : "") + name
    o.#clients = new Set()
    o.#servers = new Set()
    o.#disruptors = new Set([o])
    switch (o.#type) {
     case "string":
      throw "unhandled"
     case "object":
      for (const [name, config] of Object.entries(o.#config)) o[name] = Part(name, config, o)
      break
     case "function":
      if (o.#config.length)
       o.#argument = new Proxy(parent ?? content, {
        get: (part, request) => {
         const path = request.split("/")
         while (path.length) {
          const name = path.shift()
          part = part[name] ??= Part(name, undefined, part)
          if (!o.#servers.has(part)) {
           part.#clients.add(o)
           o.#servers.add(part)
          }
         }
         return evaluate(part)
        }
       })
      break
    }
    return o
   },
   changes = new Set(),
   engine = Part("e:", {
    "href.txt": () => data.href,
    "time.number": () => data.time,
    "delta.number": () => data.delta,
    "ticks.number": () => data.ticks,
    "timeOrigin.number": () => performance.timeOrigin
   }),
   content = Part("c:", {
    "tag.txt": () => "html",
    "content.txt": () => Date.now(),
    "child.nodes": () => ["head", "body"],
    head: {
     "tag.txt": () => "head",
     "child.nodes": () => ["style", "body"]
    },
    body: {
     "tag.txt": () => "body",
     "child.nodes": () => ["head", "body"]
    }
   }),
   tick = time => {
    data.delta = time - data.time
    data.time = time
    if (data.ticks > 1) throw "good"
    data.ticks++
    disrupt(engine["time.number"])
    disrupt(engine["ticks.number"])
    disrupt(engine["delta.number"])
    document.documentElement.partContent = content
    changes.clear()
    requestAnimationFrame(tick)
   },
   move = vector => {
    const url = new URL(data.href)
    if (typeof vector === "object") {
     for (const key in vector) {
      const value = vector[key]
      if (value === null) url.searchParams.delete(key)
      else {
       url.searchParams.set(key, value)
       url.searchParams.sort()
      }
     }
    }
    if (data.href !== url.href) {
     data.href = url.href
     disrupt(engine["href.txt"])
    }
   }
  Object.defineProperty(Node.prototype, "partContent", {
   set(o) {
    const part = (this.part ??= Part(
     ".node",
     $ => {
      if ($["content.txt/./exists.bool"]) {
       console.warn("setting content text now", $["content.txt"], this, part)
       this.body.textContent = $["content.txt"]
      } else if ($["child.nodes/./exists.bool"]) {
       console.warn("setting child nodes now")
      } else {
       console.log("setting empty node now")
      }
     },
     o
    ))
    evaluate(part)
   }
  })
  requestAnimationFrame(tick)
 }
 #name
 #config
 #type
 #path
 #cache
 #clients
 #servers
 #disruptors
 #argument
}

const old = {
 "nontag.regex": () => /[^a-zA-Z0-9]+/g,
 "theme.color": () => "#333445",
 "version.number": () => 68 / 1000,
 "tag.txt": ({ "./name.txt": p, "c:/nontag.regex": r }) => (r.test(p) ? p.replaceAll(r, "-") : p + "-"),
 "index.children": () => ["header", "shelf", "part-list", "status"],
 "style.css": ({ "theme.color": bg, "shelf/height.number": height }) => `:host {
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
 time: {
  "unix-timestamp.number": ({ "e:/time.number": a, "e:/timeOrigin.number": b }) => a + b
 },
 utils: {
  toPercent: () => x => Math.trunc(x * 1000) / 10 + "%"
 },
 place: {
  ".record": ({ "search.params": x }) => Object.fromEntries(x.entries()),
  "location.url": ({ "e:/href.txt": x }) => new URL(x),
  "pathname.txt": ({ "location.uri": { pathname: x } }) => x,
  "length.number": ({ "e:/href.txt": x }) => x.length,
  "search.params": ({ "location.uri": { searchParams: x } }) => x,
  "max-length.number": () => 2048,
  "memory-usage.number": ({ "length.number": a, "max-length.number": b }) => a / b
 },
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
    ".attributes": () => ({ type: "search", placeholder: "Search parts" }),
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
   click: () => () => console.warn("imagine back button here 🤗")
  },
  crumbs: {
   "content.txt": ({ "c:/place/pathname.txt": p }) => p,
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
  scroll:
   () =>
   ({ target }) => ({ y: target.scrollTop ? target.scrollTop.toString(36) : null }),
  "parts.entries": ({ "c:": content }) => Object.entries(content),
  "part-list-item": {
   "index.children": () => ["name", "spacer", "index"],
   "part.entry": ({ "fork.txt": i, "../parts.entries": P }) => P[parseInt(i, 36)],
   "action.js": ({ "part.entry": [, { action }] }) => action.toString(),
   "tag.txt": () => "li",
   click:
    ({ "fork.txt": f, "c:/place/.record": { p = "" } }) =>
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
  "address-usage": { "content.txt": ({ "c:/place/memory-usage.number": x, "c:/utils/toPercent": ƒ }) => ƒ(x) },
  address: { "content.txt": ({ "e:/href.txt": x }) => x },
  version: { "content.txt": ({ "c:/version.number": x }) => x },
  clock: { "content.txt": ({ "c:/time/unix-timestamp.number": x }) => x }
 }
}
