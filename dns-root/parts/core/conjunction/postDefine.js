part.setFactors = factors => {
 if (typeof factors !== "object")
  throw new RangeError(`conjunction expects a factor object or null (got ${typeof factors} -> ${factors}) (${part.host})`)

 part.length = 0
 part.factors = factors
 part.size = Object.keys(factors).reduceRight((divisors, key, index) => {
  const factor = factors[key]
  const subpart = part.insert(key, factor, index)
  Object.defineProperties(subpart, {
   conjunctionDivisor: { get() { return divisors[index] }, configurable: true },
   stateCache: { value: [...subpart.state], configurable: true }
  })
  divisors.unshift(divisors[0] * subpart.size)
  return divisors
 }, [1n]).shift()
}

if (FACTORS !== null)
 part.setFactors(FACTORS)