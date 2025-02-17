super()

this.state = -1n
this.size = 1n

Object.defineProperties(this, {
 name: {
  get() {
   return this.constructor.name
  }
 },
 uid: {
  get() {
   return this.constructor.uid
  }
 },
 subdomain: {
  get() {
   return this.constructor.subdomain
  }
 },
 injectConstituentPart: {
  value(input) {
   let partOut

   if (typeof input === "string")
    partOut = Unit.define(input + (/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/g.test(input) ? "." + this.uid : ""))

   if (!(partOut instanceof Unit))
    throw new TypeError(`unexpected ${typeof partOut} encountered as factor of ${this.uid}`)

   if (partOut.uid in this)
    throw new TypeError(`duplicate part ${partOut.uid} in ${this.uid}`)

   if (partOut.parent)
    throw new TypeError(`cannot add the same constituent part twice (adding ${partOut.uid} to ${this.uid})`)

   partOut.parent = this
   this[partOut.uid] = partOut
   return partOut
  }
 },
 appendPart: {
  value(input) {
   const partOut = this.injectConstituentPart(input)
   this.push(partOut)
   return partOut
  }
 },
 insertPart: {
  value(input) {
   const partOut = this.injectConstituentPart(input)
   this.unshift(partOut)
   return partOut
  }
 }

})