const part = this
const property = Property[PROPERTY_ID]
const recurse = (...args) => this[property.niceName].call(this, ...args)
const base = (...args) => prototype?.[property.niceName].call(this, ...args)
const hydrated = _.parts.core.client.hydrated
const pointer = _.parts.core.pointer
const setUndoPoint = () => _.parts.core.addressBar.setUndoPoint()