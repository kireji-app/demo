const part = this
const inherit = new Proxy(part, {
 get: (_, p) => part[p] = part.parent[p]
})