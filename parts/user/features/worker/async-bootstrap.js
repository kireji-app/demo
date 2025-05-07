if (!(globalThis instanceof globalThis.Window))
 throw new PartError("The worker bootstrap can only be run on the client window.")

globalThis.worker ??= {}

worker.startupRegistration = worker.registration = await nav.serviceWorker.getRegistration()

worker.registration ??= await nav.serviceWorker.register("/service.js")

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

worker.channel = new BroadcastChannel("theme-reload")
worker.channel.onmessage = nav.serviceWorker.oncontrollerchange = () => location.reload()

const oldScript = document.body.querySelector("script")
const newScript = document.createElement("script")
newScript.setAttribute("src", "/service.js!")
oldScript.replaceWith(newScript)