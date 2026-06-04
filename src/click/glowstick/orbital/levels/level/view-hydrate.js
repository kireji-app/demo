thisOrbitalLevel.element = Q("world-")
thisOrbitalLevel.camera = Vector.multiply(thisWalkable.position, -1)
thisOrbitalLevel.viewedTriIndex = thisWalkable.triIndex
thisOrbitalLevel.viewedPosition = { ...thisWalkable.position }