const part = this
const render = options => part.render(options)
const methodData = framework.MethodData[METHOD_ID]
const base = (...args) => part.super[methodData.niceName].call(...args)
const T = part.constructor
const now = performance.now()