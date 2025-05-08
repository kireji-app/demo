openLog(1, feature.key)
if (feature.supported) {
 if (feature.isAsync) {
  if (environment !== "window")
   throw TypeError(`Asynchronous feature (${feature.instancePath}) is not allowed outside of the window environment.`)

  feature.promise = feature.installAsync().then(() => { log(2, `Feature installed asynchronously.`), log(3, `Feature install callback.`) })
  log(2, `Feature enqueued.`)
 } else {
  feature.installSync()
  log(2, `Feature installed synchronously.`)
  feature.promise = new Promise(x => x()).then(() => log(3, `Feature install callback.`))
 }
} else log(1, `Feature skipped: ${feature.error}`)
closeLog(1)