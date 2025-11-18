const placeValues = new Map()

let product = 1n

for (const factor of mix) {
 placeValues.set(factor, product)
 product *= factor.cardinality
}

mix.define({
 placeValues: { value: placeValues },
 cardinality: { value: product }
})