oninstall = e => globalThis.skipWaiting()
onactivate = e => {
 globalThis.clients.claim()
 registration.unregister()
}
