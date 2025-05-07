if (environment === "worker") {
 worker.createLocalServer()
 return
}

// if (!production)
//  addEventListener("focus", () => {
//   log(0, 'Checking for updates.')
//   worker.registration.update().catch(worker.channel.onmessage)
//  })