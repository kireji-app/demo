if (typeof PARTS !== "object")
 throw new RangeError(`match expected an arm object or null (got ${typeof PARTS} -> ${PARTS}) (${match.host})`)

match.keys = Object.keys(PARTS)
match.length = 0
match.offsets = {}
match.cardinality = 0n

for (const key in PARTS) {
 const index = match.length
 match.offsets[index] = match.offsets[key] = match.cardinality
 super({ [key]: ARMS[key] })
 match.cardinality += match[index].cardinality
}