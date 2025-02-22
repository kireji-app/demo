part.size = 1n
part.index = 0
part.state = [-1n, -1n]
part.id = Core.parts.push(part) - 1
Object.assign(part, {
 host,
 insert(subpart, index, offset = 0n) {
  if (typeof subpart === "string") {
   if (/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/g.test(subpart)) subpart += "." + this.host
   subpart = Core.createPart(subpart)
  }
  if (!(subpart instanceof Core.BaseType))
   throw new TypeError(`unexpected ${typeof subpart} encountered as factor of ${this.host}\n${typeof subpart === "object" ? subpart.constructor.name : ""}`)
  if (subpart.host in this)
   throw new TypeError(`duplicate subpart ${subpart.host} in ${this.host}`)
  if (subpart.parent)
   throw new TypeError(`cannot parent constituent twice (parenting ${subpart.host} to ${this.host})`)
  subpart.parent = this
  subpart.offset = offset

  this[subpart.host] = this[subpart.index = index] = subpart
  return subpart
 },
 async increment(layer) {
  await this.setLayer(layer, (this.state[layer] + 1n) % this.size)
 },
 async decrement(layer) {
  await this.setLayer(layer, (this.state[layer] - 1n) % this.size)
 }
})