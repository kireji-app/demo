Object.defineProperties(part, {
 cardinality: { value: BigInt(part.max) - BigInt(part.min), configurable: true, writable: true }
})