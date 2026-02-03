/* Sort ascending by cardinality to optimize Route ID encoding:
 1. In mix parts, using the largest factor as the most significant digit
    prevents its large cardinality from being a multiplier for other factors.
 2. In match parts, placing larger arms at the end of the address space
    prevents their large cardinalities from being offsets for smaller arms. */
part.subparts.sort((a, b) => {
 /* Relational comparisons are used to avoid BigInt subtraction which
    would unnecessarily compute and store a third BigInt. */
 if (a.cardinality < b.cardinality) return -1
 if (a.cardinality > b.cardinality) return 1
 return 0
})

part.define({
 dirty: { value: false, writable: true },
 routeID: { value: -1n, writable: true },
 deltaRouteID: { value: 0n, writable: true },
 enabled: { value: false, writable: true },
 disabled: { value: true, writable: true },
 cardinality: { value: 1n, configurable: true },
 previousRouteID: { value: -1n, writable: true },
 wasEnabled: { value: false, writable: true },
 justEnabled: { value: false, writable: true },
 justDisabled: { value: false, writable: true },
 callbacks: { value: { add: {}, populate: {}, remove: {} } }
})