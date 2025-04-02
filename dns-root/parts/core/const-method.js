const part = this
const render = options => part.render(options)
const methodData = framework.methodData[METHOD_ID]
const base = part.super[methodData.niceName]
const T = part.constructor
const now = performance.now()