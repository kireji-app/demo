const dates = []

for (const subpart of ejaugust)
 if (!isNaN(subpart.key))
  dates.push(subpart)

Object.defineProperties(date, {
 cardinality: { value: BigInt(dates.length) },
 dates: { value: dates },
 post: { value: null, writable: true }
})