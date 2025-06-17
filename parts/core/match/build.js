const offsets = new Map()

Object.defineProperties(match, {
 offsets: { value: offsets },
 cardinality: {
  value: match.subdomains.length ? match.subdomains.reduce((count, subdomain, index) => {
   const subpart = match[subdomain]

   offsets.set(subpart, count)
   offsets.set(index, count)
   offsets.set(subpart.key, count)

   return count + subpart.cardinality
  }, match.cardinality) : 1n
 },
 arm: { value: undefined, writable: true },
})