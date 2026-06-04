GlowstickWorld.element = Q("world-")
GlowstickWorld.camera = Vector.multiply(GlowstickWorld.position, -1)
GlowstickWorld.viewedTriIndex = GlowstickWorld.triIndex
GlowstickWorld.viewedPosition = { ...GlowstickWorld.position }