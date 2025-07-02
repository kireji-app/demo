
if (facet.supported) {
 openLog(1, facet.title)
 if (facet.isAsync) {
  Object.defineProperty(facet, "promise", { value: facet.installAsync().then(() => { log(2, `${facet.title}: Facet installed asynchronously.`) }) })
  log(2, `Facet enqueued.`)
 } else {
  facet.installSync()
  log(2, `Facet installed synchronously.`)
 }
 closeLog(1)
} else log(1, `${facet.title} skipped: ${facet.error}`)