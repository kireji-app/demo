const part = this
const render = options => this.render(options)
const property = Property[PROPERTY_ID]
const now = performance.now()
const isLeaf = this.host === host
const basePropertyOwner = (() => { let o = this.prototype; while (o && !Object.hasOwn(o, property.key)) o = o.prototype; return o })()
const basePropertyDescriptor = basePropertyOwner ? Object.getOwnPropertyDescriptor(basePropertyOwner, property.key) : null
const getBasePropertyValue = basePropertyDescriptor ? (d => "value" in d ? () => d.value : "get" in d ? () => d.get.call(this) : () => undefined)(basePropertyDescriptor) : () => undefined
const base = (...args) => prototype?.[property.niceName].call(this, ...args)