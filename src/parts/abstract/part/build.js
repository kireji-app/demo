part.subpartKeys.sort((a, b) => Number(part[a].cardinality - part[b].cardinality))

part.define({
 dirty: { value: false, writable: true },
 routeID: { value: -1n, writable: true },
 deltaRouteID: { value: 0n, writable: true },
 enabled: { value: undefined, writable: true },
 disabled: { value: undefined, writable: true },
 cardinality: { value: 1n, configurable: true },
 previousRouteID: { value: -1n, writable: true },
 wasEnabled: { value: undefined, writable: true },
 justEnabled: { value: undefined, writable: true },
 justDisabled: { value: undefined, writable: true },
 callbacks: { value: { add: {}, populate: {}, remove: {} } }
})