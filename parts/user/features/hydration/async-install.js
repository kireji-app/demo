// Prepare the necessary features before allowing interaction.
await addressBar.promise // Distributes the initial user route.
await agent.promise
await hotKeys.promise
await worker.promise

// Simulate long init.
// hang(1000)

user.setRoute(addressBar.route)
document.body.removeAttribute("inert")
hydration.hydrated = true
log(1, "Hydrated.")