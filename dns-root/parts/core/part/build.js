Object.defineProperties(part, {
 enabled: { value: undefined, configurable: true, writable: true },
 disabled: { value: undefined, configurable: true, writable: true },
 dirty: { value: undefined, configurable: true, writable: true },
 wasEnabled: { value: undefined, configurable: true, writable: true },
 justDisabled: { value: undefined, configurable: true, writable: true },
 justEnabled: { value: undefined, configurable: true, writable: true },
 routeID: { value: -1n, configurable: true, writable: true },
 previousRouteID: { value: -1n, configurable: true, writable: true },
 deltaRouteID: { value: 0n, configurable: true, writable: true },
 cardinality: { value: 1n, configurable: true, writable: true },
 callbacks: {
  value: {
   add: new Set(),
   populate: new Set(),
   remove: new Set(),
  }
 }
})