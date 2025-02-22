Object.assign(globalThis, {
 client: Object.assign(part, {
  requestedAppHost: location.host === "localhost:3000" ? Core.debugHost : location.host,
  fallbackAppHost: "fallback.cloud"
 }),
 element: (parent, tagname) => parent.appendChild(document.createElement(tagname)),
 spacer: parent => {
  const spacer = element(parent, "")
  spacer.setAttribute("class", "spacer")
  return spacer
 }
})
client.choice[root.primaryLayer] = client[client.requestedAppHost] ?? client[client.fallbackAppHost]
client.state[root.primaryLayer] = client.choice[root.primaryLayer].offset
await client.choice[root.primaryLayer].initialize()