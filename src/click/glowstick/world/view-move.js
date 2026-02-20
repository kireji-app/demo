world.element.style.setProperty("---x", world.x * -1)
world.element.style.setProperty("---y", world.y * -1)

/** The player character's pixels should be perfectly aligned to the world's pixels. Because art pixels are oversized compared to the actual screen pixel, snapping can cause a jittery viewing experience. By tweaking the user position, the world will always track smoothly (without snapping to the nearest pixel) and any jitter caused by pixel snapping occurs on the character avatar itself (which is less noticeable than the whole world jittering). */
user.element.style.setProperty("--t-x", world.x - Math.round(world.x))
user.element.style.setProperty("--t-y", world.y - Math.round(world.y))

Q("#world path.current").classList.remove("current")
Q(`#world path[data-index="${world.triangleIndex}"]`).classList.add("current")
Q(`#world #player-marker`).setAttribute("x", Math.round(world.x) * glowstick.pixelRatio)
Q(`#world #player-marker`).setAttribute("y", Math.round(world.y) * glowstick.pixelRatio)