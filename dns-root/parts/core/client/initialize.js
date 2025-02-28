

Object.assign(globalThis, {
 client: Object.assign(part, {
  requestedAppHost: root.isLocal ? localStorage.getItem("app") || localStorage.setItem("app", Framework.fallbackHost) : location.host
 }),
 element: (parent, tagname) => parent.appendChild(document.createElement(tagname)),
 spacer: parent => {
  const spacer = element(parent, "")
  spacer.setAttribute("class", "spacer")
  return spacer
 }
})
client.choice[root.primaryLayer] = client[client.requestedAppHost] ?? client[Framework.fallbackHost]
client.state[root.primaryLayer] = client.choice[root.primaryLayer].offset
await client.choice[root.primaryLayer].initialize()