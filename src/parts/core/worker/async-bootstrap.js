const registration = await nav.serviceWorker.register(`/${VERSION}/build.js`, {
 updateViaCache: "all",
 scope: `/${VERSION}/`
})

// Aggressively remove all old service workers.
const oldRegistrations = await nav.serviceWorker.getRegistrations()

await Promise.all(oldRegistrations.map(oldRegistration => {
 if (oldRegistration !== registration)
  oldRegistration.unregister()
}))

if (!registration.active) {
 await new Promise(resolve => {
  const incomingServiceWorker = registration.waiting ?? registration.installing

  incomingServiceWorker.onstatechange = event => {
   if (event.target.state == "activated")
    resolve(event.target)
  }
 })
}

nav.serviceWorker.controller ?? await new Promise(resolve => {
 nav.serviceWorker.oncontrollerchange = resolve
 registration.active.postMessage({ code: "claim" })
})

const oldScript = document.body.querySelector("script")
const newScript = document.createElement("script")

newScript.setAttribute("src", `/${VERSION}/build.js`)
newScript.setAttribute("defer", "")
oldScript.replaceWith(newScript)