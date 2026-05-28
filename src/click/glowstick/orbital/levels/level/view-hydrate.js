orbitalLevel.element = Q("world-")
orbitalLevel.camera = Vector.multiply(walkable.position, -1)
orbitalLevel.viewedTriIndex = walkable.triIndex
orbitalLevel.viewedPosition = { ...walkable.position }