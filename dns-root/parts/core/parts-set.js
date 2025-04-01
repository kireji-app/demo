part.key = "untitled"
part.index = 0
part.length = 0
part.enabled = false
part.routeID = -1n
part.cardinality = 1n
part.previousRouteID = -1n

const entries = Object.entries(PARTS)

if (entries.length > 1)
 throw 'CorePart.prototype.setParts() expects an object with at most one key ' + part.host

const key = entries[0].shift()
let subpart = entries[0].shift()

if (typeof subpart === "string") {

 if (/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/g.test(subpart)) {
  // Resolve relative host.
  subpart += "." + part.host
 }

 subpart = new Part(subpart, null, part)
} else if (!(subpart instanceof CorePart))
 throw new TypeError(`unexpected ${subpart.constructor?.name ?? typeof subpart} encountered as subpart of ${part.host}`)

if (key in part)
 throw new TypeError(`duplicate key ${key} in ${part.host}`)

part[subpart.key = key] = part[subpart.index = INDEX] = subpart
subpart.parent = part