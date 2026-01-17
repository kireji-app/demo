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
   nav.serviceWorker.oncontrollerchange = () => {
    if (_.resetLocalState) {
     /* Reset to the landing hash on service worker update (useful during
        development that changes the part arrangement frequently. */
     location.assign(location.origin + `/${_.version}/${_.landingHash}/`)
    } else location.reload()
   }
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
   worker.registration.update().catch(registrationError => warn(registrationError))
  })
})