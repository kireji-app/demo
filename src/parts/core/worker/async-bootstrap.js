if (!(globalThis instanceof globalThis.Window))
 throw new Error("The worker bootstrap can only be run on the client window.")

globalThis.𝓌 ??= {}

𝓌.startupRegistration = 𝓌.registration = await nav.serviceWorker.getRegistration()

if (!𝓌.registration) {
 const oldRegistrations = await nav.serviceWorker.getRegistrations()
 await Promise.all(oldRegistrations.map(registration => registration.unregister()))
}

𝓌.registration ??= await nav.serviceWorker.register(`/${VERSION}/${CODENAME}.js`, { updateViaCache: "all", scope: `/${VERSION}/` })

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

const oldScript = document.body.querySelector("script")
const newScript = document.createElement("script")
newScript.setAttribute("src", `/${VERSION}/${CODENAME}.js`)
newScript.setAttribute("defer", "")
oldScript.replaceWith(newScript)