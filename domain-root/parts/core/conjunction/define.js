super()

if (!Array.isArray(FACTORS))
 throw new RangeError(`conjunction expects array of factors (got ${typeof FACTORS}) (${this.uid})`)

this.size = FACTORS.reduceRight((divisors, factor, i) => {
 const part = this.insertPart(factor)

 Object.defineProperties(part, {
  i: { get() { return i } },
  conjunctionDivisor: { get() { return divisors[i] } },
  stateCache: { value: part.state, writable: true },
  offset: { value: 0n },
 })

 divisors.unshift(divisors[0] * part.size)

 return divisors
}, [1n]).shift()