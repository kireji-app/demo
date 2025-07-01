const offsets = new Map()

let cardinality = 0n

for (const subpart of match) {
 offsets.set(subpart, cardinality)
 cardinality += subpart.cardinality
}

Object.defineProperties(match, {
 offsets: { value: offsets },
 cardinality: { value: cardinality },
 arm: { value: undefined, writable: true },
})