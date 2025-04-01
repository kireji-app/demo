if (!globe.user) {
 globe.user = part

 user.fps = 1
 user.time = performance.now()
 user.meanFrameTime = 1000

 super({
  // Features.
  gpu: "gpu",
  agent: "agent",
  share: "share",
  hydration: "hydration",
  addressBar: "address-bar",
  serviceWorker: "service-worker",

  // Settings.
  colorMode: "color-mode",
  vintageMode: "vintage-mode",
  menu: "menu",
 })
}