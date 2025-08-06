const max = BigInt(part.max)
const min = BigInt(part.min)

if (max < min)
 throw new RangeError(`Invalid range (min: ${min}, max: ${max}) (on ${part.host}).`)

Object.defineProperties(part, {
 cardinality: { value: (max - min) + 1n, configurable: true, writable: true }
})