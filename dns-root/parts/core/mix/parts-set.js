if (typeof PARTS !== "object")
 throw new RangeError(`mix expects a factor object or null (got ${typeof PARTS} -> ${PARTS}) (${part.host})`)

part.length = 0
part.cardinality = Object.keys(PARTS).reduceRight((divisors, key, index) => {
 super({ [key]: PARTS[key] })
 Object.defineProperty(subpart, "mixedRadixPlaceValue", { get: () => divisors[index] })
 divisors.unshift(divisors[0] * subpart.cardinality)
 return divisors
}, [1n]).shift()