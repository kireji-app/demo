if (typeof PARTS !== "object")
 throw new RangeError(`mix expects a factor object or null (got ${typeof PARTS} -> ${PARTS}) (${mix.host})`)

mix.length = 0
mix.placeValues = new Map()
mix.factors = new Map()
mix.divisors = [1n]
mix.cardinality = Object.keys(PARTS).reduceRight((divisors, key, index) => {
 super({ [key]: PARTS[key] })
 mix.factors.set(key, mix[key])
 mix.factors.set(index, mix[key])
 Object.defineProperties(subpart, {
  mixedRadixPlaceValue: {
   get: () => divisors[index]
  },

 })
 divisors.unshift(divisors[0] * subpart.cardinality)
 return divisors
}, divisors).shift()

for (const factor of mix) {
 mix.placeValues[factor] = factor.index
}