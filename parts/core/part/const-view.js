const inherit = new Proxy(part, {
 get: (_, p) => Object.defineProperty(part, p, {
  value: part[".."][p],
  writable: true
 })[p]
})