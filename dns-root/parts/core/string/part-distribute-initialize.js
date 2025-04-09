string.offsets = new Map()
string.placeValues = new Map()

let fixedLengthCardinality = 1n

if (!PART_MANIFEST)
 throw new StringError("No part manifest was provided.")

super(PART_MANIFEST, (cardinality, character, index, entries) => {
 const placeValue = fixedLengthCardinality
 string.placeValues.set(factor, placeValue)
 string.placeValues.set(index, placeValue)
 string.placeValues.set(factor.key, placeValue)
 string.offsets.set(character, cardinality)
 string.offsets.set(index, cardinality)
 string.offsets.set(character.key, cardinality)
 const newCardinality = cardinality + (fixedLengthCardinality *= character.cardinality)
 return CARDINALITY_CALLBACK(cardinality, character, index, entries)
}, 0n)