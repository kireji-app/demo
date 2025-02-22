super()

this.layer = [-1n]
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
 injectConstituent: {
  value(input) {
   let instance

   if (typeof input === "string")
    instance = Build.instance(input + (/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/g.test(input) ? "." + this.uid : ""))

   if (!(instance instanceof Build.type([Build.baseUID])))
    throw new TypeError(`unexpected ${typeof instance} encountered as factor of ${this.uid}\n${typeof instance === "object" ? instance.constructor.name : ""}`)

   if (instance.uid in this)
    throw new TypeError(`duplicate instance ${instance.uid} in ${this.uid}`)

   if (instance.parent)
    throw new TypeError(`cannot add the same constituent twice (adding ${instance.uid} to ${this.uid})`)

   instance.parent = this
   this[instance.uid] = instance
   return instance
  }
 },
 appendInstance: {
  value(input) {
   const instance = this.injectConstituent(input)
   this.push(instance)
   return instance
  }
 },
 insertInstance: {
  value(input) {
   const instance = this.injectConstituent(input)
   this.unshift(instance)
   return instance
  }
 },
 stagedState: {
  set(state) {
   Build.resetStagingLayer()
   this.setLayer(Build.stagingLayer, state)
  },
  get() {
   return this.layer[Build.stagingLayer]
  }
 }
})