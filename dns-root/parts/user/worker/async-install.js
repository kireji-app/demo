if (environment === "worker") {
 worker.createLocalServer()
 return
}

await worker.registerAsync()

// if (!production)
//  addEventListener("focus", () => {
//   log(0, 'Checking for updates.')
//   worker.registration.update().catch(worker.channel.onmessage)
//  })