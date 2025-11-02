await Promise.all([
 addressBar.promise,
 agent.promise,
 hotKeys.promise,
 update.promise,
 worker.promise,
 stats.promise
])

// To preview FOUC
if (_.hangHydration > 0 && !production)
 hang(_.hangHydration)

const onpopstate = () => {
 try {
  _.setRoute(location.href)
 } catch (e) {
  error(e)
  _.setRoute(`https://${location.host}/${_.version}/${_.landingHash}/`)
 }
}

globalThis.addEventListener("popstate", onpopstate)
onpopstate()
document.body.classList.remove("installing")
document.body.removeAttribute("inert")
client.hydrated = true

log(0, "Starting Engine Loop")
_.frameRequest = requestAnimationFrame(() => _.distributeLoop())

log(1, "Hydrated.")