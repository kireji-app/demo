const placeValues = new Map()

let product = 1n

for (const subpart of mix) {
 placeValues.set(subpart, product)
 product *= subpart.cardinality
}

mix.define({
 placeValues: { value: placeValues },
 cardinality: { value: product }
})