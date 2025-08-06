if (!facet.environments)
 throw new Error(`Facet ${facet.title} is missing an environments array (${facet.host}).`)

const environments = facet.environments.split("\n")

Object.defineProperties(facet, {
 isAsync: { value: "installAsync" in facet, configurable: true, writable: true }
})

if (environments.includes(environment)) {
 Object.defineProperties(facet, {
  supported: { value: facet.checkSupport(), configurable: true, writable: true }
 })
 if (!facet.supported)
  Object.defineProperties(facet, {
   error: { value: "support check failed", configurable: true, writable: true }
  })
} else Object.defineProperties(facet, {
 error: { value: "wrong environment", configurable: true, writable: true }
})