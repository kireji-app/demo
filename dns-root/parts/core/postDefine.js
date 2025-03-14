part.parent = PARENT
part.size = 1n
part.index = 0
part.state = [-1n, -1n]
Framework.register(part)
part.insert = (key, subpart, index, offset = 0n) => {
 if (!subpart) throw new TypeError('cannot insert undefined subpart into ' + part.host)
 if (typeof subpart === "string") {
  if (/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/g.test(subpart)) subpart += "." + part.host
  subpart = Framework.createPart(subpart, null, part)
 } else if (!(subpart instanceof Framework.BaseType)) throw new TypeError(`unexpected ${subpart.constructor?.name ?? typeof subpart} encountered as factor of ${part.host}`)
 if (key in part) console.warn(new TypeError(`duplicate key ${key} in ${part.host}`))
 subpart.key = key
 subpart.offset = offset
 part[key] = part[subpart.host] = part[subpart.index = index] = subpart
 return subpart
}
part.increment = async (LAYER, step = 1n) => await part.setLayer(LAYER, (part.state[LAYER] + step) % part.size)
part.decrement = async (LAYER, step = 1n) => await part.setLayer(LAYER, (part.state[LAYER] - step) % part.size)