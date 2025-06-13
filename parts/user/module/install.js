openLog(1, 'Installing ' + module.title)
if (module.supported) {
 if (module.isAsync) {
  // if (environment !== "window")
  // throw TypeError(`Asynchronous module (${module.instancePath}) is not allowed outside of the window environment.`)

  module.promise = module.installAsync().then(() => { log(2, `Module "${module.instancePath}" installed asynchronously.`), log(3, `Module install callback.`) })
  log(2, `Module enqueued.`)
 } else {
  module.installSync()
  log(2, `Module installed synchronously.`)
  module.promise = new Promise(x => x()).then(() => log(3, `Module install callback.`))
 }
} else log(1, `Module didn't install: ${module.error}`)
closeLog(1)