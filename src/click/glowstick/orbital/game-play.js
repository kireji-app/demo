document.body.classList.remove("paused")

// You MUST request pointer lock **before** toggling fullscreen because the fullscreen request will "consume" the transient user gesture activation that enables the security system to accept the pointer lock request.
orbitalGame.onscreenContext.canvas.requestPointerLock()
_.parts.core.agent.toggleFullscreen(true)