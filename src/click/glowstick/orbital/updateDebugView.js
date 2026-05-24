const cameraGoal = Vector.multiply(orbitalLevel.position, -1)
const epsilon = 0.00001
if (Math.abs(cameraGoal.x - orbitalLevel.camera.x) > epsilon || Math.abs(cameraGoal.y - orbitalLevel.camera.y) > epsilon) {
 const cameraSmoothing = _.parts.desktop.era.arm === _.parts.desktop.era.vintage ? 0 : 30 / client.deltaTime
 orbitalLevel.camera = Vector.multiply(Vector.add(Vector.multiply(orbitalLevel.camera, cameraSmoothing), cameraGoal), 1 / (cameraSmoothing + 1))
 orbitalLevel.element.style.setProperty("--x", orbitalLevel.camera.x)
 orbitalLevel.element.style.setProperty("--y", orbitalLevel.camera.y)
 orbitalLevel.element.style.setProperty("--user-x", Math.floor(orbitalLevel.position.x))
 orbitalLevel.element.style.setProperty("--user-y", Math.floor(orbitalLevel.position.y))
 Q("ui->.debug").innerHTML = orbitalLevel["coords.html"]
}

orbitalLevel.element.style.setProperty("--angle", -orbitalCamera.y.model + "deg")

if (orbitalLevel.viewedTriIndex !== orbitalLevel.triIndex) {

 // Highlight the path that the player is currently on.
 Q("world->svg path.current").classList.remove("current")
 Q(`world->svg path[data-index="${orbitalLevel.triIndex}"]`).classList.add("current")

 orbitalLevel.viewedTriIndex = orbitalLevel.triIndex
}

if (orbitalLevel.viewedPosition.x !== orbitalLevel.position.x || orbitalLevel.viewedPosition.y !== orbitalLevel.position.y) {

 // Move the single-pixel mark showing the player's position.
 Q(`world->svg #player-marker`).setAttribute("x", Math.floor(orbitalLevel.position.x))
 Q(`world->svg #player-marker`).setAttribute("y", Math.floor(orbitalLevel.position.y))

 orbitalLevel.viewedPosition = { ...orbitalLevel.position }
}