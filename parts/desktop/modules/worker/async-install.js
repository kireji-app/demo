if (environment === "worker")
 worker.createLocalServer()
else {

 if (!worker.registration) {
  worker.startupRegistration = worker.registration = await nav.serviceWorker.getRegistration()

  if (!worker.registration.active)
   throw 'Unexpected lack of existing service worker registration while installing worker module in window.'

  worker.controller = nav.serviceWorker.controller

  worker.channel = new BroadcastChannel("theme-reload")
  worker.channel.onmessage = nav.serviceWorker.oncontrollerchange = () => location.reload()
 }

 if (!production)
  addEventListener("focus", () => {
   log(0, 'Checking for updates.')
   worker.registration.update().catch(worker.channel.onmessage)
  })
}