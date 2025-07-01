const placeValues = new Map()

let cardinality = 1n

for (const subpart of mix) {
 placeValues.set(subpart, cardinality)
 cardinality *= subpart.cardinality
}

Object.defineProperties(mix, {
 placeValues: { value: placeValues },
 cardinality: { value: cardinality }
})