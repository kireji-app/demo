const part = this
const render = options => part.render(options)
const property = framework.Property[PROPERTY_ID]
const base = (...args) => part.super[property.niceName].call(...args)
const T = part.constructor
const now = performance.now()