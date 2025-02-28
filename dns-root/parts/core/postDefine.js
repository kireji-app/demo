part.size = 1n
part.index = 0
part.state = [-1n, -1n]
part.id = Framework.parts.push(part) - 1
part.framework = part.constructor.framework
part.host = part.framework.host
Object.assign(part, {
 insert(subpart, index, offset = 0n) {
  if (typeof subpart === "string") {
   if (/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/g.test(subpart)) subpart += "." + part.host
   subpart = Framework.createPart(subpart)
  }
  if (!(subpart instanceof Framework.BaseType))
   throw new TypeError(`unexpected ${subpart.constructor?.name ?? typeof subpart} encountered as factor of ${part.host}`)
  if (subpart.host in part)
   throw new TypeError(`duplicate subpart ${subpart.host} in ${part.host}`)
  if (subpart.parent)
   throw new TypeError(`cannot parent constituent twice (parenting ${subpart.host} to ${part.host})`)
  subpart.parent = part
  subpart.offset = offset

  part[subpart.host] = part[subpart.index = index] = subpart
  return subpart
 },
 async increment(LAYER, step = 1n) {
  await part.setLayer(LAYER, (part.state[LAYER] + step) % part.size)
 },
 async decrement(LAYER, step = 1n) {
  await part.setLayer(LAYER, (part.state[LAYER] - step) % part.size)
 }
})