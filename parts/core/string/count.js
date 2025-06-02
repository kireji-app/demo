string.placeValues.set(SUBPART, string.fixedLengthCardinality)
string.placeValues.set(INDEX, string.fixedLengthCardinality)
string.placeValues.set(SUBPART.key, string.fixedLengthCardinality)
string.offsets.set(SUBPART, COUNT)
string.offsets.set(INDEX, COUNT)
string.offsets.set(SUBPART.key, COUNT)

Object.defineProperties(string, {
 fixedLengthCardinality: { value: string.fixedLengthCardinality * SUBPART.cardinality, configurable: true, writable: true }
})

return COUNT + string.fixedLengthCardinality