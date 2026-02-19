/** The player character's pixels should be perfectly aligned to the world's pixels. Because art pixels are oversized compared to the actual screen pixel, snapping can cause a jittery viewing experience. By tweaking the user position, the world will always track smoothly (without snapping to the nearest pixel) and any jitter caused by pixel snapping occurs on the character avatar itself (which is less noticeable than the whole world jittering). */
const tweakUserPosition = {
 x: user.x - Math.round(user.x),
 y: user.y - Math.round(user.y)
}

world.element.style.setProperty("---x", user.x * -1)
world.element.style.setProperty("---y", user.y * -1)
user.element.style.setProperty("--t-x", tweakUserPosition.x)
user.element.style.setProperty("--t-y", tweakUserPosition.y)