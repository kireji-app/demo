const part = this
const render = options => this.render(options)
const property = Property[PROPERTY_ID]
const now = performance.now()
const isLeaf = this.host === host
const base = (...args) => prototype?.[property.niceName].call(this, ...args)