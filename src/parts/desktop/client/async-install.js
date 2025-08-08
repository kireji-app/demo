await Promise.all([
 addressBar.promise,
 agent.promise,
 hotKeys.promise,
 worker.promise
])

// To preview FOUC
if (_.hangHydration && !production)
 hang(1000)

globalThis.onpopstate = () => {
 try {
  _.setRoute(location.href)
 } catch (e) {
  error(e)
  _.setRoute(`https://${location.host}/${_.version}/${_.landingHash}/`)
 }
}

if (location.pathname.endsWith("!"))
 desktop.update.finish()

onpopstate()
document.body.classList.remove("installing")
document.body.removeAttribute("inert")
client.hydrated = true

log(1, "Hydrated.")