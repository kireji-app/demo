var time = 0
var ticks = 0
var delta = 0
var href = location.href

const cache = {}

function heat(x, z = x) {
 // Indicates that the given path has changed in value since last draw.
 const y = ƒ(x)
 y.heaters.add(z)
 y.outputs.forEach(w => heat(w, z))
}

function cool(x, z = x) {
 // Indicates that the given path was re-evaluated and found to match it's cache.
 const y = ƒ(x)
 y.heaters.remove(z)
 y.outputs.forEach(w => cool(w, z))
}

function ƒ(x) {
 if (x in cache) return cache[x]
 if (x.endsWith("/")) return (cache[x] = ƒ(x.slice(0, -1)))
 const y = (cache[x] = {
  heaters: new Set(),
  inputs: new Set(),
  outputs: new Set(),
  children: new Set(),
  get value() {
   if (typeof y.data === "object") return y
   y.inputs.forEach(i => ƒ(i).value)
   if (y.heaters.size) {
    const value = y.data ? y.data(y.argument, y.cache, y.heaters) : undefined
    if (value === y.cache) cool(y)
    else {
     y.cache = value
     changes.add(y)
    }
    y.heaters.clear()
   }
   return y.cache
  },
  get argument() {
   return new Proxy(y.parent ?? content, {
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
  }
 })
 if (x.includes("/")) {
  const path = x.split("/")
  y.name = path.pop()
  y.parent = ƒ(path.join("/"))
  y.data = y.parent.data[y.name]
 } else if (x === "") {
  y.name = x
  y.parent = null
  y.data = data
 } else {
  y.name = x
  y.parent = ƒ("")
  y.data = data[x]
 }
 y.parent?.children.add(x)
 return y
}

function tick(t) {
 // Redraws the document every frame.
 delta = time - t
 time = t
 if (ticks) throw ticks
 ticks++
 heat("e:/time.number")
 heat("e:/ticks.number")
 heat("e:/delta.number")
 console.log(cache)
 // document.documentElement.partContent = content
 // changes.clear()
 requestAnimationFrame(tick)
}

function move(vector) {
 // Changes the uri based on a user action.
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
  heat("e:/href.txt")
 }
}

const data = {
 "e:": () => ({
  "href.txt": () => href,
  "time.number": () => time,
  "delta.number": () => delta,
  "ticks.number": () => ticks,
  "timeOrigin.number": () => performance.timeOrigin
 }),
 "c:": {
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
 }
}

requestAnimationFrame(tick)
