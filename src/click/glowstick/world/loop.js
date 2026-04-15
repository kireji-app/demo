const cameraGoal = Vector.multiply(world.position, -1)
const epsilon = 0.00001
if (Math.abs(cameraGoal.x - world.camera.x) > epsilon || Math.abs(cameraGoal.y - world.camera.y) > epsilon) {
 const cameraSmoothing = _.parts.desktop.era.arm === _.parts.desktop.era.vintage ? 0 : 300 / client.deltaTime
 world.camera = Vector.multiply(Vector.add(Vector.multiply(world.camera, cameraSmoothing), cameraGoal), 1 / (cameraSmoothing + 1))
 world.element.style.setProperty("--x", world.camera.x)
 world.element.style.setProperty("--y", world.camera.y)
 world.element.style.setProperty("--user-x", Math.floor(world.position.x))
 world.element.style.setProperty("--user-y", Math.floor(world.position.y))
 user.element.style.setProperty("--anim-frame", Math.floor(user.walkPhase * 8))
 Q("ui->.debug").innerHTML = world["coords.html"]
}

if (world.viewedTriIndex !== world.triIndex) {

 // Highlight the path that the player is currently on.
 Q("world->svg path.current").classList.remove("current")
 Q(`world->svg path[data-index="${world.triIndex}"]`).classList.add("current")

 world.viewedTriIndex = world.triIndex
}

if (world.viewedPosition.x !== world.position.x || world.viewedPosition.y !== world.position.y) {

 // Move the single-pixel mark showing the player's position.
 Q(`world->svg #player-marker`).setAttribute("x", Math.floor(world.position.x))
 Q(`world->svg #player-marker`).setAttribute("y", Math.floor(world.position.y))

 world.viewedPosition = { ...world.position }
}