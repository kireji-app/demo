Object.assign(globalThis, {
 root: Object.assign(part, {
  primaryLayer: 0,
  stagingLayer: 1,
  environment: globalThis.constructor === globalThis.Window ? "desktop" : "worker",
  key: "root",
  isLocal: location.host.startsWith("localhost:"),
  resetStagingLayer: async () => {
   await root.setLayer(root.stagingLayer, root.state[root.primaryLayer])
  }
 })
})


root.choice[root.primaryLayer] = root[root.environment]
root.state[root.primaryLayer] = root.choice[root.primaryLayer].offset + root.choice[root.primaryLayer].state[root.primaryLayer]
await root.choice[root.primaryLayer].initialize()
