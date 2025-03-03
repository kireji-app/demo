if (!navigator.serviceWorker) throw 'unhandled: no service worker'

const reg = await navigator.serviceWorker.getRegistration() ?? await navigator.serviceWorker.register("/" + Framework.clientScriptURL)
reg.active ?? await new Promise(r => ((reg.waiting ?? reg.installing).onstatechange = ({ target: t }) => t.state == "activated" && r(t)))
const worker = navigator.serviceWorker.controller || (await new Promise(r => ((navigator.serviceWorker.oncontrollerchange = r), worker.postMessage({ code: "claim" }))))
const channel = new BroadcastChannel("debug-reload")
channel.onmessage = navigator.serviceWorker.oncontrollerchange = () => location.reload()

document.querySelector('[rel="manifest"]').href = "manifest.json"
if (Framework.isDebug) addEventListener("focus", () => reg.update().catch(navigator.serviceWorker.onmessage))

Object.assign(globalThis, {
 worker,
 client: Object.assign(part, {
  requestedAppHost: Framework.isDebug ? await(await fetch("https://core.parts/debug.host")).text() : location.host,
  gpu: navigator.gpu && await(await navigator.gpu.requestAdapter()).requestDevice()
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