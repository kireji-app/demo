const prototype = Object.getPrototypeOf(part)

if (prototype.constructor.framework !== part.constructor.framework)
 return prototype

return Object.getPrototypeOf(prototype)