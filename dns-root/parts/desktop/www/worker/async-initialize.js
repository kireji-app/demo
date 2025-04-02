if (ENVIRONMENT === "worker") {
 worker.createLocalServer()
 return
}

await worker.registerAsync()

if (!IS_PRODUCTION)
 addEventListener("focus", () => worker.active.update().catch(worker.channel.onmessage))