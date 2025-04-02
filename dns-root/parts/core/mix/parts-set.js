mix.placeValues = new Map()

base(PART_MANIFEST, (cardinality, factor, index, entries) => {
 const placeValue = mix.cardinality
 const newCardinality = cardinality * factor.cardinality
 mix.placeValues.set(factor, placeValue)
 mix.placeValues.set(index, placeValue)
 mix.placeValues.set(factor.key, placeValue)

 if (CARDINALITY_CALLBACK) {
  if (typeof CARDINALITY_CALLBACK !== "function")
   throw "Set Parts Error: bad cardinality callback type: " + typeof CARDINALITY_CALLBACK

  return CARDINALITY_CALLBACK?.(newCardinality, factor, index, entries)
 }

 return newCardinality
})