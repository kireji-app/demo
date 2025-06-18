if (!(globalThis instanceof globalThis.Window))
 throw new Error("The worker bootstrap can only be run on the client window.")

globalThis.𝓌 ??= {}

𝓌.startupRegistration = 𝓌.registration = await nav.serviceWorker.getRegistration()

𝓌.registration ??= await nav.serviceWorker.register("/service.js")

if (!𝓌.registration.active) {
 await new Promise(resolve => {
  𝓌.incomingServiceWorker = 𝓌.registration.waiting ?? 𝓌.registration.installing
  𝓌.incomingServiceWorker.onstatechange = e => {
   if (e.target.state == "activated")
    resolve(e.target)
  }
 })
}

𝓌.controller = nav.serviceWorker.controller

𝓌.controller ??= await new Promise(resolve => {
 nav.serviceWorker.oncontrollerchange = resolve
 𝓌.registration.active.postMessage({ code: "claim" })
})

𝓌.channel = new BroadcastChannel("theme-reload")
𝓌.channel.onmessage = nav.serviceWorker.oncontrollerchange = () => location.reload()

const oldScript = document.body.querySelector("script")
const newScript = document.createElement("script")
newScript.setAttribute("src", "/service.js!")
oldScript.replaceWith(newScript)