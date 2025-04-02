if (part.enabled)
 throw "setting the parts of an enabled part is current not supported"

part.length = 0
part.routeID = part.previousRouteID = -1n
part.cardinality = INITIAL_CARDINALITY

Object.entries(PART_MANIFEST).forEach(([key, subpart], index, entries) => {

 if (key in part)
  throw new TypeError(`duplicate key ${key} in ${part.host}`)

 if (typeof subpart === "string") {
  if (/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/g.test(subpart)) {
   // Resolve relative host.
   subpart += "." + part.host
  }
  PART_MANIFEST[key] = entries[index][1] = subpart = new Part(subpart)
 } else if (!(subpart instanceof CorePart))
  throw new TypeError(`unexpected ${subpart.constructor?.name ?? typeof subpart} encountered as subpart of ${part.host}`)

 part[subpart.key = key] = part[subpart.index = index] = subpart
 subpart.parent = part
 if (CARDINALITY_CALLBACK) {
  if (typeof CARDINALITY_CALLBACK !== "function")
   throw "setParts error: cardinality callback must be a function (got " + typeof CARDINALITY_CALLBACK + ")."

  part.cardinality = CARDINALITY_CALLBACK?.(part.cardinality, subpart, index, entries)
 }
})