part.size = 1n
part.index = 0
part.state = Array(Framework.layerCount).fill(-1n)
part.parent = Array(Framework.layerCount).fill(PARENT)
part.root = PARENT ? PARENT.root : Array(Framework.layerCount).fill(part)
part.insert = (key, subpart, index, offset = 0n) => {
 if (!subpart) throw new TypeError('cannot insert undefined subpart into ' + part.host)
 if (typeof subpart === "string") {
  if (/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/g.test(subpart)) subpart += "." + part.host
  subpart = Framework.createPart(subpart, null, part)
 } else if (!(subpart instanceof Framework.BaseType)) throw new TypeError(`unexpected ${subpart.constructor?.name ?? typeof subpart} encountered as factor of ${part.host}`)
 if (key in part) console.warn(new TypeError(`duplicate key ${key} in ${part.host}`))
 subpart.offset = offset
 part[subpart.index = index] = subpart
 subpart.key = key
 part[key] = part[subpart.host] = subpart
 return subpart
}