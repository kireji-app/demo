/** Move the world, keeping the player in the center. */
world.element.style.setProperty("---x", world.position.x * -1)
world.element.style.setProperty("---y", world.position.y * -1)

/** The player character's pixels should be perfectly aligned to the world's pixels. Because art pixels are oversized compared to the actual screen pixel, snapping can cause a jittery viewing experience. By tweaking the user position, the world will always track smoothly (without snapping to the nearest pixel) and any jitter caused by pixel snapping occurs on the character avatar itself (which is less noticeable than the whole world jittering). */
user.element.style.setProperty("--t-x", world.position.x - Math.floor(world.position.x))
user.element.style.setProperty("--t-y", world.position.y - Math.floor(world.position.y))

// Highlight the path that the player is currently on.
Q("#world path.current").classList.remove("current")
Q(`#world path[data-index="${world.triIndex}"]`).classList.add("current")

// Move the single-pixel mark showing the player's position.
Q(`#world #player-marker`).setAttribute("x", Math.floor(world.position.x) * glowstick.pixelRatio)
Q(`#world #player-marker`).setAttribute("y", Math.floor(world.position.y) * glowstick.pixelRatio)