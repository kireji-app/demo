const prototype = Object.getPrototypeOf(part)

if (prototype.constructor.framework !== T.framework)
 return prototype

return Object.getPrototypeOf(prototype)