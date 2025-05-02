// Prepare the necessary features before allowing interaction.
await addressBar.promise // Distributes the initial user route.
await agent.promise

// Debug.
hang(10000)

document.body.removeAttribute("inert")
hydration.hydrated = true