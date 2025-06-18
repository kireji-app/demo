
if (facet.supported) {
 openLog(1, facet.title)
 if (facet.isAsync) {
  facet.promise = facet.installAsync().then(() => { log(2, `Facet "${facet.instancePath}" installed asynchronously.`), log(3, `${facet.title} install callback.`) })
  log(2, `Facet enqueued.`)
 } else {
  facet.installSync()
  log(2, `Facet installed synchronously.`)
 }
 closeLog(1)
} else log(1, `${facet.title} skipped: ${facet.error}`)