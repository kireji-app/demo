if (environment === "worker")
 worker.createLocalServer()
else {

 if (!worker.registration) {
  const registration = await nav.serviceWorker.getRegistration()
  Object.defineProperties(worker, {
   startupRegistration: { value: registration },
   registration: { value: registration },
  })

  if (!worker.registration.active)
   throw 'Unexpected lack of existing service worker registration while installing worker facet in window.'

  Object.defineProperties(worker, {
   controller: { value: nav.serviceWorker.controller },
   channel: { value: new BroadcastChannel("theme-reload") }
  })

  worker.channel.onmessage = nav.serviceWorker.oncontrollerchange = () => location.reload()
 }

 if (!production)
  addEventListener("focus", () => {
   log(0, 'Checking for updates.')
   worker.registration.update().catch(worker.channel.onmessage)
  })
}