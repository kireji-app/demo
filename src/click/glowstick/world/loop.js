const cameraGoal = Vector.multiply(GlowstickWorld.position, -1)
const epsilon = 0.00001
if (Math.abs(cameraGoal.x - GlowstickWorld.camera.x) > epsilon || Math.abs(cameraGoal.z - GlowstickWorld.camera.z) > epsilon) {
 const cameraSmoothing = Era.arm === Era.vintage ? 0 : 300 / Client.deltaTime
 GlowstickWorld.camera = Vector.multiply(Vector.add(Vector.multiply(GlowstickWorld.camera, cameraSmoothing), cameraGoal), 1 / (cameraSmoothing + 1))
 GlowstickWorld.element.style.setProperty("--x", GlowstickWorld.camera.x)
 GlowstickWorld.element.style.setProperty("--z", GlowstickWorld.camera.z)
 GlowstickWorld.element.style.setProperty("--user-x", Math.floor(GlowstickWorld.position.x))
 GlowstickWorld.element.style.setProperty("--user-z", Math.floor(GlowstickWorld.position.z))
 GlowstickUser.element.style.setProperty("--anim-frame", Math.floor(GlowstickUser.walkPhase * 8))
 Q("ui->.debug").innerHTML = GlowstickWorld["coords.html"]
}

if (GlowstickWorld.viewedTriIndex !== GlowstickWorld.triIndex) {

 // Highlight the path that the player is currently on.
 Q("world->svg path.current").classList.remove("current")
 Q(`world->svg path[data-index="${GlowstickWorld.triIndex}"]`).classList.add("current")

 GlowstickWorld.viewedTriIndex = GlowstickWorld.triIndex
}

if (GlowstickWorld.viewedPosition.x !== GlowstickWorld.position.x || GlowstickWorld.viewedPosition.z !== GlowstickWorld.position.z) {

 // Move the single-pixel mark showing the player's position.
 Q(`world->svg #player-marker`).setAttribute("x", Math.floor(GlowstickWorld.position.x))
 Q(`world->svg #player-marker`).setAttribute("y", Math.floor(GlowstickWorld.position.z))

 GlowstickWorld.viewedPosition = { ...GlowstickWorld.position }
}