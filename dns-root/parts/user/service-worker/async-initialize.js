serviceWorker.startupRegistration = serviceWorker.registration = await nav.serviceWorker.getRegistration()
serviceWorker.registration ??= await nav.serviceWorker.register("/portable.js?raw")
if (!serviceWorker.registration.active) {
 await new Promise(resolve => {
  serviceWorker.incomingServiceWorker = serviceWorker.registration.waiting ?? serviceWorker.registration.installing
  serviceWorker.incomingServiceWorker.onstatechange = event => {
   if (event.target.state == "activated")
    resolve(event.target)
  }
 })
}
serviceWorker.controller = nav.serviceWorker.controller
serviceWorker.controller ??= await new Promise(resolve => {
 nav.serviceWorker.oncontrollerchange = resolve
 serviceWorker.registration.active.postMessage({ code: "claim" })
})
serviceWorker.channel = new BroadcastChannel("debug-reload")
serviceWorker.channel.onmessage = nav.serviceWorker.oncontrollerchange = () => location.reload()
serviceWorker.manifestLink = document.querySelector('link[rel="manifest"]')
serviceWorker.manifestLink.href = "/manifest.json?raw"

if (!Framework.isProduction)
 addEventListener("focus", () => serviceWorker.active.update().catch(serviceWorker.channel.onmessage))