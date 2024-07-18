class Part {
 static 𝒳
 static changes = new Set()
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
  const group = this.root,
   node = document.body
  group.𝒳.disrupt()
  this.syncNode(node, group, "c:")
  address: {
   const { value, changed } = group["href.txt"].build()
   if (!changed) break address
   if (this.navigationBuffer) clearTimeout(this.navigationBuffer)
   this.navigationBuffer = setTimeout(() => history.replaceState({}, null, value), 120)
  }
  this.changes.clear()
 }
 static createNode(value) {
  if (value === "#text") return document.createTextNode("")
  try {
   return document.createElement(value)
  } catch (e) {
   console.warn(e)
  }
  return document.createElement("tag-name-error")
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
   const { value, changed } = group[".tag"]?.build() ?? {}
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

  content: {
   const { value, changed } = group["content.txt"]?.build() ?? {}
   if (value) {
    if (changed) {
     if (node instanceof Text) node.nodeValue = value
     else node.textContent = value
    }
    return node
   }
  }

  names: {
   if (node instanceof Text) break names
   const { value } = group["index.names"]?.build() ?? {}
   value.forEach((id, i) => {
    const subgroup = this.getSubgroup(group, id)
    if (node.childNodes[i]) this.syncNode(node.childNodes[i], subgroup, id)
    else node.appendChild(this.syncNode(null, subgroup, id))
   })
   while (node.childNodes.length > value.length) node.childNodes[node.childNodes.length - 1].remove()
  }

  return node
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
   "version.number": () => 64 / 1000,
   "index.uri": ({ 𝒳 }) => "a b",
   "index.names": ({ "index.uri": uri }) => uri.split(" "),
   a: {
    ".tag": () => "h1",
    "content.txt": () => "Welcome"
   },
   b: {
    ".tag": ({ "hash.txt": hash }) => (hash ? hash.slice(1) : "p"),
    "content.txt": ({ "href.txt": href }) => `You've found my website at ${href}.`
   },
   [Symbol.for("part")]: null
  })
 )
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
  let changed = false
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
    Part.changes.add(this)
    changed = true
   }
  }
  return { value: this.cache, changed }
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
 // Debug testing.
 {
  const testLocation = (href, ƒ) => setTimeout(() => (Part.mutate(href), ƒ?.()), 500),
   testLoop = () =>
    testLocation(`##text`, () =>
     testLocation(`#h1`, () =>
      testLocation(`#pre`, () =>
       testLocation(`#article`, () =>
        testLocation(`#subtitle`, () =>
         testLocation(`#i`, () =>
          testLocation(`#b`, () =>
           testLocation(`#u`, () => testLocation(`#input`, () => testLocation(`##h3`, () => testLoop())))
          )
         )
        )
       )
      )
     )
    )
  testLoop()
 }
}
