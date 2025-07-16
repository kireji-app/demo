const offsets = new Map()

let sum = 0n

for (const subpart of match) {
 offsets.set(subpart, sum)
 sum += subpart.cardinality
}

Object.defineProperties(match, {
 offsets: { value: offsets },
 cardinality: { value: sum },
 arm: { value: undefined, writable: true },
})