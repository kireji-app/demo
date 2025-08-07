// Prepare the necessary facets before allowing interaction.
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

if (location.pathname.endsWith("!")) {
 desktop.update.isUpgrading = true
 client.promise.then(() => {
  const model = JSON.parse(localStorage.getItem(location.pathname.split("/")[2].slice(0, -1)))
  if (!model) throw 'missing model'
  _.setRoute(`https://${location.host}${encodeRoute(_.modelToRouteID(model))}`)
  document.body.classList.remove("upgrading")
  desktop.update.isUpgrading &&= false
  localStorage.clear()
 })
} else document.body.classList.remove("installing")

onpopstate()

document.body.removeAttribute("inert")
client.hydrated = true

log(1, "Hydrated.")