
logScope(1, facet.title, log => {
 if (facet.supported) {
  if (facet.isAsync) {
   if (environment !== "client")
    throw "Async Facets are only supported in the client environment."
   facet.define({
    promise: {
     value: GATE.promise
      .then(facetArray => facet.installAsync(facetArray))
      .then(() => log(`${facet.title}: Async facet installed.`))
    }
   })
   log(`Enqueued.`)
  } else {
   facet.installSync()
   log(`Installed.`)
  }
 } else log(`Skipped (${facet.error})`)
})