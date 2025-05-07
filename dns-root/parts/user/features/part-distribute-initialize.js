globe.features = this

super({
 addressBar: null,
 agent: null,
 fullscreen: null,
 gpu: null,
 hotKeys: null,
 hydration: null,
 service: null,
 share: null,
 worker: null,
})

for (const feature of features) {
 if (!feature.supported) {
  log(1, `${feature.instancePath} skipped. (${feature.error})`)
  continue
 }

 if (feature.isAsync) {
  if (environment !== "window")
   throw TypeError(`Asynchronous feature (${feature.instancePath}) is not allowed outside of the window environment.`)

  feature.installAsync().then(() => log(2, `${feature.instancePath} installed.`))
  log(1, `${feature.instancePath} enqueued.`)
 } else {
  feature.install()
  log(1, `${feature.instancePath} installed.`)
 }
}
