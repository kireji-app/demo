super()

if (!Array.isArray(FACTORS))
 throw new RangeError(`conjunction expects array of factors (got ${typeof FACTORS}) (${this.uid})`)

this.size = FACTORS.reduceRight((divisors, factor, i) => {
 const instance = this.insertInstance(factor)

 Object.defineProperties(instance, {
  i: { get() { return i } },
  conjunctionDivisor: { get() { return divisors[i] } },
  layerCache: { value: [...instance.layer], writable: true },
  offset: { value: 0n },
 })

 divisors.unshift(divisors[0] * instance.size)

 return divisors
}, [1n]).shift()