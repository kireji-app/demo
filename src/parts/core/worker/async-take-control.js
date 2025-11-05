await logScope(1, 'Ensuring ServiceWorker Controller', async log => {

 if (!worker.registration) {

  log("Acquiring Registration.")

  const registration = await nav.serviceWorker.getRegistration()

  worker.define({
   startupRegistration: { value: registration },
   registration: { value: registration },
  })

  if (!worker.registration.active)
   throw 'Unexpected lack of existing service worker registration while installing worker facet in client.'

  worker.define({
   controller: { value: nav.serviceWorker.controller }
  })

  nav.serviceWorker.oncontrollerchange = () => location.reload()
 }

 worker.registration.onupdatefound = event => {

  const target = worker.registration.installing || worker.registration.waiting

  if (!production)
   target.postMessage({ code: "activate" })
 }

 if (!production)
  addEventListener("focus", () => {
   log("Checking for ServiceWorker updates.")
   worker.registration.update().catch((e) => warn(e))
  })
})