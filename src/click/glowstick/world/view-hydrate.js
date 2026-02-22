world.element = Q("#world")
world.camera = Vector.multiply(world.position, -1)
world.viewedTriIndex = world.triIndex
world.viewedPosition = { ...world.position }