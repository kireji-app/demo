await logScope(1, 'Ensuring ServiceWorker Controller', async log => {

 if (!worker.registration) {

  log("Acquiring Registration.")

  const registration = await nav.serviceWorker.getRegistration()

  worker.define({
   registration: { value: registration },
  })

  if (!worker.registration.active)
   throw 'Unexpected lack of existing service worker registration while installing worker facet in client.'

  worker.define({
   controller: { value: nav.serviceWorker.controller }
  })

  if (!production) {
   /* In development builds, we reset to the landing hash every time we rebuild
    the service worker, to avoid edge cases where the latest development has a
    different part arrangement from the original. */
   nav.serviceWorker.oncontrollerchange = () =>
    location.assign(location.origin + `/${_.version}/${_.landingHash}/`)
  }
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