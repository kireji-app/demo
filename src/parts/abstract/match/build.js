const offsets = new Map()

let sum = 0n

if (match.length === 0)
 sum = 1n
else for (const subpart of match) {
 offsets.set(subpart, sum)
 sum += subpart.cardinality
}

match.define({
 offsets: { value: offsets },
 cardinality: { value: sum },
 arm: { value: null, writable: true },
})