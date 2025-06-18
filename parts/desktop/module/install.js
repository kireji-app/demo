
if (module.supported) {
 openLog(1, module.title)
 if (module.isAsync) {
  module.promise = module.installAsync().then(() => { log(2, `Module "${module.instancePath}" installed asynchronously.`), log(3, `Module install callback.`) })
  log(2, `Module enqueued.`)
 } else {
  module.installSync()
  log(2, `Module installed synchronously.`)
  module.promise = new Promise(x => x()).then(() => log(3, `Module install callback.`))
 }
 closeLog(1)
} else log(1, `${module.title} skipped: ${module.error}`)