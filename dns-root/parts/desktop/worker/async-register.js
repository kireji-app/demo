worker.startupRegistration = worker.registration = await nav.serviceWorker.getRegistration()
worker.registration ??= await nav.serviceWorker.register("/serverless.js!")
if (!worker.registration.active) {
 await new Promise(resolve => {
  worker.incomingServiceWorker = worker.registration.waiting ?? worker.registration.installing
  worker.incomingServiceWorker.onstatechange = e => {
   if (e.target.state == "activated")
    resolve(e.target)
  }
 })
}
worker.controller = nav.serviceWorker.controller
worker.controller ??= await new Promise(resolve => {
 nav.serviceWorker.oncontrollerchange = resolve
 worker.registration.active.postMessage({ code: "claim" })
})
worker.channel = new BroadcastChannel("debug-reload")
worker.channel.onmessage = nav.serviceWorker.oncontrollerchange = () => location.reload()