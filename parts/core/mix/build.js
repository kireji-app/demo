const placeValues = new Map()

Object.defineProperties(mix, {
 placeValues: { value: placeValues },
 cardinality: {
  value: mix.subdomains.reduce((count, subdomain, index) => {
   const subpart = mix[subdomain]

   placeValues.set(subpart, count)
   placeValues.set(index, count)
   placeValues.set(subpart.key, count)

   return count * subpart.cardinality
  }, mix.cardinality)
 }
})