class Part {
 static 𝒳
 static navigationBuffer
 static willRender = new Set()
 static group(prototype, config, ospath = ["c:"]) {
  const group = Object.create(prototype)
  for (const partname in config) {
   if (typeof partname === "symbol") continue
   const partdef = config[partname],
    action = typeof partdef === "function" ? partdef : () => Part.group(group, partdef, [...ospath, partname]),
    part = (group[partname] = new Part(partname, action, group))
   if (typeof partdef === "object") partdef[Symbol.for("part")] = part
  }
  group[Symbol.for("ospath")] = ospath
  return group
 }
 static mutate(𝒳ʹ) {
  this.𝒳 = new URL(𝒳ʹ, this.𝒳)
  this.root.𝒳.disrupt()
  this.root["index.html"].reflect($ => {
   document.body.innerHTML = $
  })
  this.root["href.txt"].reflect($ => {
   if (this.navigationBuffer) clearTimeout(this.navigationBuffer)
   this.navigationBuffer = setTimeout(() => history.replaceState({}, null, $), 120)
  })
  this.willRender.clear()
 }
 static core = new Part("core", () =>
  Part.group(null, {
   𝒳() {
    // This is the only Part that makes an outside reference - to 𝒳
    const { hash, host, href, pathname: path, search: query } = Part.𝒳
    return { hash, host, href, path, query }
   },
   "hash.txt": ({ 𝒳 }) => 𝒳.hash,
   "host.txt": ({ 𝒳 }) => 𝒳.host,
   "href.txt": ({ 𝒳 }) => 𝒳.href,
   "path.txt": ({ 𝒳 }) => 𝒳.path,
   "query.txt": ({ 𝒳 }) => 𝒳.query,
   "index.html"() {
    return `<h1>hello ${this["host.txt"]}!</h1>${this["codes/index.html"]}`
   },
   codes: {
    "index.html"() {
     return [this["href.html"], this["ospath.html"], this["partpath.html"]].join("<br>")
    },
    "href.html"() {
     return `<code>${this["href.txt"]}</code>`
    },
    "ospath.html"() {
     return `<code>${this[Symbol.for("ospath")].join("/")}</code>`
    },
    "partpath.html"() {
     return `<code>${this[Symbol.for("partpath")].join("/")}</code>`
    }
   },
   [Symbol.for("part")]: null
  })
 )
 static root = Part.core.build()
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
  if (this.disruptors.size) {
   this.disruptors.clear()
   if (!this.group) {
    console.log("no group here...", this)
   }
   const thisArg = new Proxy(this.group ?? {}, {
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
         const parentGroup = Object.getPrototypeOf(group)
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
    Part.willRender.add(this)
   }
  }
  return this.cache
 }
 import(part) {
  if (!this.servers.has(part)) {
   // This one is critical.
   part.clients.add(this)
   this.servers.add(part)
  }
  return part.build()
 }
 reflect(render) {
  const value = this.build()
  if (Part.willRender.has(this)) render(value)
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
 // Debug testing.
 {
  const testLocation = (href, ƒ) => setTimeout(() => (Part.mutate(href), ƒ?.()), 2000),
   testLoop = () =>
    testLocation(`../`, () =>
     testLocation(`${location.origin}/users/?inspector.bool=true.bool&other.test=123.json`, () =>
      testLocation(`${location.origin}/users/part/?other.test=456.json#dislikes`, () =>
       testLocation(`#saved`, () => testLocation(`#home`, () => testLocation(`?other.test=789.json`, () => testLoop())))
      )
     )
    )
  testLoop()
 }
}
