const cameraGoal = Vector.multiply(OrbitalLevels.arm.position, -1)
const epsilon = 0.00001
if (Math.abs(cameraGoal.x - OrbitalLevels.arm.camera.x) > epsilon || Math.abs(cameraGoal.z - OrbitalLevels.arm.camera.z) > epsilon) {
 const cameraSmoothing = Era.arm === Era.vintage ? 0 : 30 / Client.deltaTime
 OrbitalLevels.arm.camera = Vector.multiply(Vector.add(Vector.multiply(OrbitalLevels.arm.camera, cameraSmoothing), cameraGoal), 1 / (cameraSmoothing + 1))
 OrbitalLevels.arm.element.style.setProperty("--x", OrbitalLevels.arm.camera.x)
 OrbitalLevels.arm.element.style.setProperty("--z", OrbitalLevels.arm.camera.z)
 OrbitalLevels.arm.element.style.setProperty("--user-x", Math.floor(OrbitalLevels.arm.position.x))
 OrbitalLevels.arm.element.style.setProperty("--user-z", Math.floor(OrbitalLevels.arm.position.z))
 Q("ui->.debug").innerHTML = OrbitalLevels.arm["coords.html"]
}

OrbitalLevels.arm.element.style.setProperty("--angle", -OrbitalCamera.y.model + "deg")

if (OrbitalLevels.arm.viewedTriIndex !== OrbitalLevels.arm.triIndex) {

 // Highlight the path that the player is currently on.
 Q("world->svg path.current").classList.remove("current")
 Q(`world->svg path[data-index="${OrbitalLevels.arm.triIndex}"]`).classList.add("current")

 OrbitalLevels.arm.viewedTriIndex = OrbitalLevels.arm.triIndex
}

if (OrbitalLevels.arm.viewedPosition.x !== OrbitalLevels.arm.position.x || OrbitalLevels.arm.viewedPosition.z !== OrbitalLevels.arm.position.z) {

 // Move the single-pixel mark showing the player's position.
 Q(`world->svg #player-marker`).setAttribute("x", Math.floor(OrbitalLevels.arm.position.x))
 Q(`world->svg #player-marker`).setAttribute("y", Math.floor(OrbitalLevels.arm.position.z))

 OrbitalLevels.arm.viewedPosition = { ...OrbitalLevels.arm.position }
}