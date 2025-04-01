if (!globe.user) {
 globe.user = part

 user.fps = 1
 user.time = performance.now()
 user.meanFrameTime = 1000

 super({
  gpu: "gpu",
  agent: "agent",
  share: "share",
  hydration: "hydration",
  addressBar: "address-bar",
  serviceWorker: "service-worker",
 })
}