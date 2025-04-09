match.offsets = new Map()

if (!PART_MANIFEST)
 throw new MatchError("No part manifest was provided.")

super(PART_MANIFEST, (cardinality, arm, index, entries) => {
 match.offsets.set(arm, cardinality)
 match.offsets.set(index, cardinality)
 match.offsets.set(arm.key, cardinality)
 return CARDINALITY_CALLBACK(cardinality + arm.cardinality, arm, index, entries)
}, 0n)