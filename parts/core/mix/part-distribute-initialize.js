mix.placeValues = new Map()


if (!PART_MANIFEST)
 throw new MixError("No part manifest was provided.")

super(PART_MANIFEST, (cardinality, factor, index, entries) => {
 const placeValue = cardinality
 mix.placeValues.set(factor, placeValue)
 mix.placeValues.set(index, placeValue)
 mix.placeValues.set(factor.key, placeValue)
 return CARDINALITY_CALLBACK(cardinality * factor.cardinality, factor, index, entries)
}, 1n)