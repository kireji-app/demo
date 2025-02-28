Object.assign(globalThis, {
 root: Object.assign(part, {
  environment: (globalThis.constructor === globalThis.Window ? "client" : "worker") + ".core.parts",
  primaryLayer: 0,
  stagingLayer: 1,
  debugHost: Framework.fallbackHost,
  isLocal: location.host.startsWith("localhost:"),
  isDebug: location.host.startsWith("localhost:") || location.host.endsWith(".vercel.app"),
  resetStagingLayer: async () => {
   await root.setLayer(root.stagingLayer, root.state[root.primaryLayer])
  }
 })
})

root.choice[root.primaryLayer] = root[root.environment]
root.state[root.primaryLayer] = root.choice[root.primaryLayer].offset + root.choice[root.primaryLayer].state[root.primaryLayer]
await root.choice[root.primaryLayer].initialize()