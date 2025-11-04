if (!facet.environments)
 throw new Error(`Facet ${facet.title} is missing an environments array (${facet.host}).`)

const environments = facet.environments.split("\n")

facet.define({
 isAsync: { value: "installAsync" in facet }
})

if (environments.includes(environment)) {
 facet.define({
  supported: { value: facet.checkSupport() }
 })
 if (!facet.supported)
  facet.define({
   error: { value: "support check failed" }
  })
} else facet.define({
 error: { value: "wrong environment" }
})