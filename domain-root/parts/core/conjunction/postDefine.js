if (!Array.isArray(FACTORS))
 throw new RangeError(`conjunction expects array of factors (got ${typeof FACTORS}) (${part.host})`)

part.factors = FACTORS
part.size = FACTORS.reduceRight((divisors, factor, index) => {
 const subpart = part.insert(factor, index)
 Object.defineProperties(subpart, {
  conjunctionDivisor: { get() { return divisors[index] } },
  stateCache: { value: [...subpart.state], writable: true },
 })
 divisors.unshift(divisors[0] * subpart.size)
 return divisors
}, [1n]).shift()