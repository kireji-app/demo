const cameraGoal = Vector.multiply(world.position, -1)

if (cameraGoal.x !== world.camera.x || cameraGoal.y !== world.camera.y) {
 const cameraSmoothingFactor = 6
 const cameraSmoothing = (cameraSmoothingFactor * 1000) / (client.deltaTime * 60)
 world.camera = Vector.multiply(Vector.add(Vector.multiply(world.camera, cameraSmoothing), cameraGoal), 1 / (cameraSmoothing + 1))
 world.element.style.setProperty("---x", world.camera.x)
 world.element.style.setProperty("---y", world.camera.y)
 const userOffset = Vector.add(Vector.floor(world.position), world.camera)
 user.element.style.setProperty("--t-x", userOffset.x)
 user.element.style.setProperty("--t-y", userOffset.y)
 user.element.style.setProperty("--anim-frame", Math.floor(user.walkPhase * 8))
}

if (world.viewedTriIndex !== world.triIndex) {

 // Highlight the path that the player is currently on.
 Q("#world path.current").classList.remove("current")
 Q(`#world path[data-index="${world.triIndex}"]`).classList.add("current")

 world.viewedTriIndex = world.triIndex
}

if (world.viewedPosition.x !== world.position.x || world.viewedPosition.y !== world.position.y) {

 // Move the single-pixel mark showing the player's position.
 Q(`#world #player-marker`).setAttribute("x", Math.floor(world.position.x) * glowstick.pixelRatio)
 Q(`#world #player-marker`).setAttribute("y", Math.floor(world.position.y) * glowstick.pixelRatio)

 world.viewedPosition = { ...world.position }
}