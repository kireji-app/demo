function ƒ(𝑧) {
 /*
  var CACHE = {},
   CORE = new Proxy({}, new Proxy(𝑧, { get: (_, Γ) => eval(𝑧["https://core.parts/proxy/alpha.js"]) }))
  if (self instanceof (self.Window ?? class {})) CORE["https://core.parts/window.js"](true)
  else {
   onfetch = e => CORE["https://core.parts/serviceWorker/fetch.js"](e)
   oninstall = e => CORE["https://core.parts/serviceWorker/install.js"](e)
   onactivate = onmessage = e => CORE["https://core.parts/serviceWorker/activate.js"](e)
  }
 */

 const parts = {},
  core_origin = "core.parts"

 function create(origin) {
  if (origin in parts) return parts[origin]

  const part = (parts[origin] = {}),
   base = origin === core_origin ? null : "base." + origin in 𝑧 ? create("base." + origin) : parts[core_origin]

  Object.setPrototypeOf(part, base)

  const partnames = "partnames." + origin in 𝑧 ? 𝑧["partnames." + origin].split(/\s+/) : [],
   all_partnames = new Set(partnames),
   private = (part["#"] = {
    origin,
    base,
    partnames,
    get value() {
     return this.get()
    }
   })

  if (base) {
   for (const partname of base["#"].partnames) {
    if (all_partnames.has(partname))
     throw "part " + origin + " already has partname " + partname + " defined on base class " + base["#"].origin
    all_partnames.add(partname)
    if (partname + "." + origin in 𝑧) part[partname] = create(partname + "." + origin)
   }
  }
  for (const partname of partnames) part[partname] = create(partname + "." + origin)
  if (origin in 𝑧) private.get = (...stack) => 𝑧[origin]
  else {
   if ("alias" in part)
    private.get = (...stack) => {
     return create(part.alias["#"].get(...stack))["#"].get(origin, ...stack)
    }
   if ("constructor" in part) {
    const [header, body] = part.constructor["#"].get(origin).split(/;/),
     argument_partnames = header.split(" ")
    private.get = (...stack) => {
     const arguments = []
     for (const argument_partname of argument_partnames) {
      const argument_value = part[argument_partname]["#"].get(origin, ...stack)
      arguments.push(argument_value)
     }
     let final_body = body
     arguments.forEach((argument, i) => (final_body = final_body.replace("$" + i, argument)))
     return final_body
    }
   }
  }
  return part
 }

 console.log(create("core.parts"))
}
ƒ({
 "partnames.test.layouts.core.parts": "constructor color",
 "constructor.test.layouts.core.parts": "data:color;host { background: $0 }",
 "color.test.layouts.core.parts": "tomato",

 "partnames.core.parts": "partnames manifest layout type base",
 "partnames.partnames.core.parts": "constructor color",
 "partnames.manifest.core.parts": "constructor color",
 "partnames.layout.core.parts": "constructor color",
 "partnames.type.core.parts": "constructor color",
 "partnames.base.core.parts": "constructor color",
 "color.partnames.core.parts": "silver",
 "color.manifest.core.parts": "red",
 "color.layout.core.parts": "green",
 "color.type.core.parts": "blue",
 "color.base.core.parts": "yellow",
 "manifest.core.parts": "menu canvas",
 "alias.constructor.partnames.core.parts": "test.core.parts",
 "alias.constructor.manifest.core.parts": "test.core.parts",
 "alias.constructor.layout.core.parts": "test.core.parts",
 "alias.constructor.type.core.parts": "test.core.parts",
 "alias.constructor.base.core.parts": "test.core.parts",
 "partnames.constructor.partnames.core.parts": "alias",
 "partnames.constructor.manifest.core.parts": "alias",
 "partnames.constructor.layout.core.parts": "alias",
 "partnames.constructor.type.core.parts": "alias",
 "partnames.constructor.base.core.parts": "alias",
 "type.core.parts": "object",
 "type.partnames.core.parts": "names",
 "type.manifest.core.parts": "names",
 "type.layout.core.parts": "string",
 "type.type.core.parts": "string",
 "type.base.core.parts": "object",
 "base.core.parts": "core.parts"
})
