if (typeof PART_MANIFEST !== "object")
 throw new RangeError(`match expected a part manifest (got ${typeof PART_MANIFEST} -> ${PART_MANIFEST}) (${match.host})`)

match.offsets = new Map()
match.cardinality = 0n

base(PART_MANIFEST, arm => {
 match.offsets[arm.index] = match.offsets[arm.key] = match.cardinality
 match.cardinality += arm.cardinality
})