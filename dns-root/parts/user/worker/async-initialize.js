if (ENVIRONMENT === "worker") {
 worker.createLocalServer()
 return
}

await worker.registerAsync()

if (!IS_PRODUCTION)
 addEventListener("focus", () => {
  log(0, 'Checking for updates.')
  worker.registration.update().catch(worker.channel.onmessage)
 })