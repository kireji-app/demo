// Prepare the necessary facets before allowing interaction.


await addressBar.promise // Distributes the initial user route.
await agent.promise
await hotKeys.promise
await worker.promise

// To preview FOUC
if (_.hangHydration && !production)
 hang(1000)

globalThis.onpopstate = () => _.setRoute(location.href)
onpopstate()
document.body.removeAttribute("inert")
client.hydrated = true

log(1, "Hydrated.")